import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'bootstrap'; // Import Bootstrap's Modal
import EmployerHeader from './EmployerHeader';
import EmployerFooter from './EmployerFooter';

const EmployeerProfileView = () => {
    const [schoolData, setSchoolData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editData, setEditData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [profilePic, setProfilePic] = useState(null);
    const [profilePicPreview, setProfilePicPreview] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const modalRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSchoolDetails = async () => {
            try {
                const token = localStorage.getItem('employerToken');
                const employerData = JSON.parse(localStorage.getItem('employerData'));
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await fetch(
                    `https://edujobzbackend.onrender.com/employer/fetchemployer/${employerData._id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch school details');
                }

                const data = await response.json();
                setSchoolData(data);
                setEditData({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    userEmail: data.userEmail,
                    userMobile: data.userMobile,
                    address: data.address,
                    state: data.state,
                    pincode: data.pincode,
                    city: data.city,
                    schoolName: data.schoolName,
                    website: data.website,
                    board: data.board,
                    institutionType: data.institutionType
                });
                setProfilePicPreview(data.userProfilePic);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSchoolDetails();
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(file);
            // Create a preview URL for the image
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadProfilePicture = async () => {
        if (!profilePic) return null;

        const token = localStorage.getItem('employerToken');
        const employerData = JSON.parse(localStorage.getItem('employerData'));

        const formData = new FormData();
        formData.append('file', profilePic); // The actual file
        formData.append('fileType', 'profile'); // Explicitly set fileType

        try {
            const response = await fetch(
                `https://edujobzbackend.onrender.com/employer/uploadprofilepic/${employerData._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`
                        // Don't set Content-Type - let browser set it with boundary
                    },
                    body: formData
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Upload failed');
            }

            const data = await response.json();
            return data.file.url;
        } catch (err) {
            console.error('Upload error details:', {
                error: err.message,
                request: {
                    url: `https://edujobzbackend.onrender.com/employer/uploadprofilepic/${employerData._id}`,
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: formData
                }
            });
            throw new Error(`Upload failed: ${err.message}`);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('employerToken');
            const employerData = JSON.parse(localStorage.getItem('employerData'));

            // Upload profile picture if changed
            let newProfilePicUrl = schoolData.userProfilePic;
            if (profilePic) {
                try {
                    console.log('Starting profile picture upload...');
                    newProfilePicUrl = await uploadProfilePicture();
                    console.log('Upload successful, new URL:', newProfilePicUrl);
                } catch (uploadError) {
                    console.error('Profile picture upload failed:', {
                        error: uploadError.message,
                        stack: uploadError.stack,
                        fileInfo: {
                            name: profilePic.name,
                            size: profilePic.size,
                            type: profilePic.type
                        }
                    });
                    // Continue with other updates even if profile pic fails
                    alert('Profile picture update failed, but other changes will be saved. Error: ' + uploadError.message);
                }
            }

            // Update other profile data
            console.log('Updating profile data...');
            const updateResponse = await fetch(
                `https://edujobzbackend.onrender.com/employer/updateemployer/${employerData._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        ...editData,
                        ...(newProfilePicUrl && { userProfilePic: newProfilePicUrl })
                    })
                }
            );

            if (!updateResponse.ok) {
                const errorData = await updateResponse.json().catch(() => ({}));
                throw new Error(errorData.message || 'Profile update failed');
            }

            const updatedData = await updateResponse.json();
            setSchoolData(updatedData);

            // Close modal
            const modal = Modal.getInstance(modalRef.current);
            modal.hide();

            alert('Profile updated successfully!');
        } catch (err) {
            console.error('Profile update error:', {
                error: err.message,
                stack: err.stack,
                timestamp: new Date().toISOString()
            });
            alert(`Error: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Function to show the modal
    const showModal = () => {
        const modal = new Modal(modalRef.current);
        modal.show();
    };

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!schoolData) {
        return <div className="alert alert-warning">No school data found</div>;
    }

    return (
        <>
            <EmployerHeader />
            <div className="content">
                <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                    <div className="my-auto mb-2">
                        <h6 className="fw-medium d-inline-flex align-items-center mb-3 mb-sm-0">
                            <a href="#">
                                <i className="ti ti-arrow-left me-2"></i>School Details
                            </a>
                        </h6>
                    </div>
                    <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
                        <div className="mb-2">
                            <button
                                className="btn btn-warning"
                                onClick={showModal}
                            >
                                <i className="ti ti-edit me-1"></i>Edit School
                            </button>
                            <button
                                className="btn btn-secondary align-items-center ms-2"
                            >
                                <i className="ti ti-circle-plus me-2"></i>Bank & Statutory
                            </button>
                        </div>

                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-4 theiaStickySidebar">
                        <div className="card card-bg-1">
                            <div className="card-body p-0">
                                <span className="avatar avatar-xl avatar-rounded border border-2 border-white m-auto d-flex mb-2" style={{
                                    width: "100px",
                                    height: "100px",
                                    overflow: "hidden",
                                }}>
                                    <img src={schoolData.userProfilePic || "assets/img/users/user-13.jpg"} className="w-auto h-auto" alt="Img" />
                                </span>
                                <div className="text-center px-3 pb-3 border-bottom">
                                    <div className="mb-3">
                                        <h5 className="d-flex align-items-center justify-content-center mb-1">
                                            {schoolData.schoolName}
                                        </h5>
                                        <span className="badge badge-soft-secondary fw-medium me-2">
                                            <i className="ti ti-point-filled me-1"></i> {schoolData.board || 'CBSE'}
                                        </span>
                                        <span className="badge badge-soft-secondary fw-medium me-2">
                                            <i className="ti ti-point-filled me-1"></i> {schoolData.institutionType || 'School'}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                            <span className="d-inline-flex align-items-center">
                                                <i className="ti ti-id me-2"></i>
                                                Client ID
                                            </span>
                                            <p className="text-dark">{schoolData._id}</p>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                            <span className="d-inline-flex align-items-center">
                                                <i className="ti ti-star me-2"></i>
                                                Admin
                                            </span>
                                            <p className="text-dark">{schoolData.firstName} {schoolData.lastName}</p>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                            <span className="d-inline-flex align-items-center">
                                                <i className="ti ti-calendar-check me-2"></i>
                                                Registered On
                                            </span>
                                            <p className="text-dark">{new Date(schoolData.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className="row gx-2 mt-3">
                                            <div className="col-6">
                                                <button
                                                    className="btn btn-dark w-100"
                                                    onClick={showModal}
                                                >
                                                    <i className="ti ti-edit me-1"></i>Edit Info
                                                </button>
                                            </div>
                                            <div className="col-6">
                                                <button
                                                    className="btn btn-warning w-100"
                                                >
                                                    <i className="ti ti-message-heart me-1"></i>Message
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 border-bottom">
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <h6>Basic information</h6>
                                        <button
                                            className="btn btn-icon btn-sm"
                                            onClick={showModal}
                                        >
                                            <i className="ti ti-edit"></i>
                                        </button>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <span className="d-inline-flex align-items-center">
                                            <i className="ti ti-phone me-2"></i>
                                            Phone
                                        </span>
                                        <p className="text-dark">{schoolData.userMobile}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <span className="d-inline-flex align-items-center">
                                            <i className="ti ti-mail-check me-2"></i>
                                            Email
                                        </span>
                                        <span className="text-info d-inline-flex align-items-center">
                                            {schoolData.userEmail}
                                        </span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <span className="d-inline-flex align-items-center">
                                            <i className="ti ti-map-pin-check me-2"></i>
                                            Address
                                        </span>
                                        <p className="text-dark text-end">
                                            {schoolData.address}, <br />
                                            {schoolData.city}, {schoolData.state}, {schoolData.pincode}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-8">
                        {/* Other content can go here */}
                    </div>
                </div>
            </div>

            {/* Edit School Modal */}
            <div className="modal fade" id="editModal" ref={modalRef} tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="d-flex align-items-center">
                                <h4 className="modal-title me-2">Edit Employer</h4>
                                <span>Employer ID : {schoolData?._id}</span>
                            </div>
                            <button
                                type="button"
                                className="btn-close custom-btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <i className="ti ti-x"></i>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body pb-0">
                                <div className="row">
                                    {/* Profile Picture Upload */}
                                    <div className="col-12 mb-4">
                                        <div className="d-flex flex-column align-items-center">
                                            <div className="position-relative mb-3">
                                                <img
                                                    src={profilePicPreview || "assets/img/users/user-13.jpg"}
                                                    className="rounded-circle border border-3 border-primary"
                                                    alt="Profile"
                                                    style={{
                                                        width: "120px",
                                                        height: "120px",
                                                        objectFit: "cover"
                                                    }}
                                                />
                                                <label
                                                    htmlFor="profilePicUpload"
                                                    className="btn btn-sm btn-icon btn-primary position-absolute rounded-circle"
                                                    style={{
                                                        bottom: "10px",
                                                        right: "10px",
                                                        width: "32px",
                                                        height: "32px"
                                                    }}
                                                >
                                                    <i className="ti ti-camera"></i>
                                                    <input
                                                        type="file"
                                                        id="profilePicUpload"
                                                        className="d-none"
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                    />
                                                </label>
                                            </div>
                                            <div className="text-center">
                                                <p className="mb-1">Click on the camera icon to change profile picture</p>
                                                <small className="text-muted">Allowed JPG, GIF or PNG. Max size 2MB</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">First Name <span className="text-danger"> *</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="firstName"
                                                value={editData.firstName || ''}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Last Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="lastName"
                                                value={editData.lastName || ''}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Email <span className="text-danger"> *</span></label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="userEmail"
                                                value={editData.userEmail || ''}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Phone Number <span className="text-danger"> *</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="userMobile"
                                                value={editData.userMobile || ''}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">School Name<span className="text-danger"> *</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="schoolName"
                                                value={editData.schoolName || ''}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Website</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="website"
                                                value={editData.website || ''}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Board</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="board"
                                                value={editData.board || ''}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Institution Type</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="institutionType"
                                                value={editData.institutionType || ''}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Address <span className="text-danger"> *</span></label>
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                name="address"
                                                value={editData.address || ''}
                                                onChange={handleInputChange}
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label">City <span className="text-danger"> *</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="city"
                                                value={editData.city || ''}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label">State <span className="text-danger"> *</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="state"
                                                value={editData.state || ''}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label">Pincode <span className="text-danger"> *</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="pincode"
                                                value={editData.pincode || ''}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-outline-light border me-2"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                            Saving...
                                        </>
                                    ) : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <EmployerFooter />
        </>
    );
};

export default EmployeerProfileView;
