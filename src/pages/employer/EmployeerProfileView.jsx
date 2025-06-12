import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployerHeader from './EmployerHeader';
import EmployerFooter from './EmployerFooter';

const EmployeerProfileView = () => {
    const [schoolData, setSchoolData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchSchoolDetails = async () => {
            try {
                const token = localStorage.getItem('employerToken');
                const employerData = JSON.parse(localStorage.getItem('employerData'));
                if (!token) {
                    // Handle unauthorized access
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
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSchoolDetails();
    }, [navigate]);

    if (loading) {
        return <div>Loading school details...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!schoolData) {
        return <div>No school data found</div>;
    }

    return (
        <>
            <EmployerHeader />
            {/* <div className="page-wrapper"> */}
            <div className="content">
                {/* Breadcrumb */}
                <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                    <div className="my-auto mb-2">
                        <h6 className="fw-medium d-inline-flex align-items-center mb-3 mb-sm-0">
                            <a href="/employees">
                                <i className="ti ti-arrow-left me-2"></i>School Details
                            </a>
                        </h6>
                    </div>
                    <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
                        <div className="mb-2">
                            <a href="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#edit_project">
                                <i className="ti ti-edit me-1"></i>Edit School
                            </a>
                            <a href="#" data-bs-toggle="modal" data-bs-target="#add_bank_satutory" className="btn btn-secondary align-items-center">
                                <i className="ti ti-circle-plus me-2"></i>Bank & Statutory
                            </a>
                        </div>
                        <div className="head-icons ms-2">
                            <a href="javascript:void(0);" className="" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Collapse" id="collapse-header">
                                <i className="ti ti-chevrons-up"></i>
                            </a>
                        </div>
                    </div>
                </div>
                {/* /Breadcrumb */}

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
                                            <i className="ti ti-discount-check-filled text-success ms-1"></i>
                                        </h5>
                                        <span className="badge badge-soft-secondary fw-medium me-2">
                                            <i className="ti ti-point-filled me-1"></i> {schoolData.board || 'CBSE'}
                                        </span>
                                        <span className="badge badge-soft-secondary fw-medium me-2">
                                            <i className="ti ti-point-filled me-1"></i> {schoolData.institutionType || 'School'}
                                        </span>
                                        <span className="badge badge-soft-secondary fw-medium">
                                            <i className="ti ti-point-filled me-1"></i> {schoolData.employerType || 'Company'}
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
                                        <div className="d-flex align-items-center justify-content-between">
                                            <span className="d-inline-flex align-items-center">
                                                <i className="ti ti-calendar-check me-2"></i>
                                                Admin User
                                            </span>
                                            <div className="d-flex align-items-center">
                                                <span className="avatar avatar-sm avatar-rounded me-2">
                                                    <img src={schoolData.userProfilePic || "assets/img/profiles/avatar-12.jpg"} alt="Img" />
                                                </span>
                                                <p className="text-gray-9 mb-0">{schoolData.firstName} {schoolData.lastName}</p>
                                            </div>
                                        </div>
                                        <div className="row gx-2 mt-3">
                                            <div className="col-6">
                                                <div>
                                                    <a href="#" className="btn btn-dark w-100" data-bs-toggle="modal" data-bs-target="#edit_employee">
                                                        <i className="ti ti-edit me-1"></i>Edit Info
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div>
                                                    <a href="#" className="btn btn-primary w-100">
                                                        <i className="ti ti-message-heart me-1"></i>Message
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 border-bottom">
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <h6>Basic information</h6>
                                        <a href="javascript:void(0);" className="btn btn-icon btn-sm" data-bs-toggle="modal" data-bs-target="#edit_employee">
                                            <i className="ti ti-edit"></i>
                                        </a>
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
                                        <a href="javascript:void(0);" className="text-info d-inline-flex align-items-center">
                                            <span className="__cf_email__" data-cfemail={schoolData.userEmail}>
                                                {schoolData.userEmail}
                                            </span>
                                            <i className="ti ti-copy text-dark ms-2"></i>
                                        </a>
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

                    {/* Rest of your existing code for the right side content */}
                    <div className="col-xl-8">
                        {/* Keep all your existing accordion and tab content here */}
                        {/* You can populate other sections with schoolData as needed */}
                    </div>
                </div>
            </div>

            {/* All your existing modals can remain the same */}
            {/* Edit School Modal */}
            <div className="modal fade" id="edit_employee">
                {/* Modal content */}
            </div>

            {/* Other modals... */}
            {/* </div> */}
            <EmployerFooter />
        </>
    );
};

export default EmployeerProfileView;