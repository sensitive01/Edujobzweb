// import React, { useState } from 'react';
// import axios from 'axios';
// import AddPositionsModal from './AddPositionsModal';
// import AddAccessModal from './AddAccessModal';
// import EditAccessModal from './EditAccessModal';
// import AccessModal from './AccessModal';
// import EditStageModal from './EditStageModal';
// import AddStageModal from './AddStageModal ';
// import AddUserModal from './AddUserModal';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';

// const AddUnitModal = ({ show, onClose }) => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('basic-info');
//   const [showPositionsModal, setShowPositionsModal] = useState(false);
//   const [showAccessModal, setShowAccessModal] = useState(false);
//   const [showAddAccessModal, setShowAddAccessModal] = useState(false);
//   const [showEditAccessModal, setShowEditAccessModal] = useState(false);
//   const [showStageModal, setShowStageModal] = useState(false);
//   const [showEditStageModal, setShowEditStageModal] = useState(false);
//   const [showAddUserModal, setShowAddUserModal] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState(null);

//   // OTP Verification State
//   const [otp, setOtp] = useState('');
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [isOtpVerified, setIsOtpVerified] = useState(false);
//   const [otpError, setOtpError] = useState('');
//   const [isSendingOtp, setIsSendingOtp] = useState(false);
//   const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

//   // Get organization ID from localStorage
//   const employerAdminData = JSON.parse(localStorage.getItem('EmployerAdminData')) || '{}';
//   const organizationid = employerAdminData._id || '';

//   const [formData, setFormData] = useState({
//     schoolName: '',
//     firstName: '',
//     lastName: '',
//     address: '',
//     organizationid: organizationid,
//     city: '',
//     state: '',
//     pincode: '',
//     institutionName: '',
//     board: '',
//     institutionType: '',
//     website: '',
//     userEmail: '',
//     userMobile: '',
//     userPassword: '',
//     userProfilePic: '',
//     employerType: '',
//     country: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Send OTP to backend
//   const sendOtp = async () => {
//     if (!formData.userEmail) {
//       setOtpError('Please enter your email address first');
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.userEmail)) {
//       setOtpError('Please enter a valid email address');
//       return;
//     }

//     setIsSendingOtp(true);
//     setOtpError('');

//     try {
//       const response = await axios.post('https://edujobemailverification.onrender.com/api/send-otp', {
//         email: formData.userEmail
//       });

//       if (response.data.success) {
//         setIsOtpSent(true);
//         setOtpError('');
//       } else {
//         setOtpError(response.data.error || 'Failed to send OTP');
//       }
//     } catch (error) {
//       setOtpError(error.response?.data?.error || 'Failed to send OTP');
//     } finally {
//       setIsSendingOtp(false);
//     }
//   };

//   // Verify OTP with backend
//   const verifyOtp = async () => {
//     if (!otp || otp.length !== 6) {
//       setOtpError('Please enter a 6-digit OTP');
//       return;
//     }

//     setIsVerifyingOtp(true);
//     setOtpError('');

//     try {
//       const response = await axios.post('https://edujobemailverification.onrender.com/api/verify-otp', {
//         email: formData.userEmail,
//         otp
//       });

//       if (response.data.success) {
//         setIsOtpVerified(true);
//         setOtpError('');
//       } else {
//         setOtpError(response.data.error || 'Invalid OTP');
//         setIsOtpVerified(false);
//       }
//     } catch (error) {
//       setOtpError(error.response?.data?.error || 'Verification failed');
//       setIsOtpVerified(false);
//     } finally {
//       setIsVerifyingOtp(false);
//     }
//   };

//   const handleNext = () => {
//     // Validate required fields in basic info before proceeding
//     if (
//       !formData.schoolName ||
//       !formData.firstName ||
//       !formData.lastName ||
//       !formData.institutionName ||
//       !formData.board ||
//       !formData.institutionType ||
//       !formData.userMobile ||
//       !formData.userPassword ||
//       !formData.employerType
//     ) {
//       setError('Please fill all required fields');
//       return;
//     }

//     // If email is provided, require OTP verification
//     if (formData.userEmail && !isOtpVerified) {
//       setError('Please verify your email with OTP');
//       return;
//     }

//     setError(null);
//     setActiveTab('address');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(null);

//     // Validate address fields
//     if (
//       !formData.address ||
//       !formData.country ||
//       !formData.state ||
//       !formData.city ||
//       !formData.pincode
//     ) {
//       setError('Please fill all address fields');
//       setIsSubmitting(false);
//       return;
//     }

//     // If email is provided, require OTP verification
//     if (formData.userEmail && !isOtpVerified) {
//       setError('Please verify your email with OTP');
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const token = localStorage.getItem('EmployerAdminToken');
//       const response = await axios.post('https://api.edprofio.com/employeradmin/createemployer', formData, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       console.log('Employer created successfully:', response.data);
//       toast.success('Unit created successfully!');

//       // Call the onSave prop with the response data
//       if (typeof onSave === 'function') {
//         onSave(response.data.data);
//       }

//       // Reset form data
//       setFormData({
//         schoolName: '',
//         firstName: '',
//         lastName: '',
//         address: '',
//         organizationid: organizationid,
//         city: '',
//         state: '',
//         pincode: '',
//         institutionName: '',
//         board: '',
//         institutionType: '',
//         website: '',
//         userEmail: '',
//         userMobile: '',
//         userPassword: '',
//         userProfilePic: '',
//         employerType: '',
//         country: ''
//       });

//       // Reset OTP state
//       setOtp('');
//       setIsOtpSent(false);
//       setIsOtpVerified(false);

//       // Close modal after a short delay to allow toast to show
//       setTimeout(() => {
//         onClose();
//       }, 1000);

//     } catch (err) {
//       console.error('Error creating employer:', err);
//       setError(err.response?.data?.message || 'Failed to create unit. Please try again.');
//       toast.error('Failed to create unit. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!show) {
//     return null;
//   }

//   return (
//     <>
//       <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
//         <div className="modal-dialog modal-dialog-centered modal-lg">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h4 className="modal-title">Add New Unit</h4>
//               <button
//                 type="button"
//                 className="btn-close custom-btn-close"
//                 onClick={onClose}
//                 aria-label="Close"
//               >
//                 <i className="ti ti-x"></i>
//               </button>
//             </div>

//             <form onSubmit={handleSubmit}>
//               <div className="contact-grids-tab">
//                 <ul className="nav nav-underline" id="myTab" role="tablist">
//                   <li className="nav-item" role="presentation">
//                     <button
//                       className={`nav-link ${activeTab === 'basic-info' ? 'active' : ''}`}
//                       onClick={() => setActiveTab('basic-info')}
//                       type="button"
//                     >
//                       Basic Information
//                     </button>
//                   </li>
//                   <li className="nav-item" role="presentation">
//                     <button
//                       className={`nav-link ${activeTab === 'address' ? 'active' : ''}`}
//                       onClick={() => setActiveTab('address')}
//                       type="button"
//                     >
//                       Address
//                     </button>
//                   </li>
//                 </ul>
//               </div>

//               {error && (
//                 <div className="alert alert-danger mx-3 mt-3">
//                   {error}
//                 </div>
//               )}

//               <div className="tab-content" id="myTabContent">
//                 {/* Basic Info Tab */}
//                 <div className={`tab-pane fade ${activeTab === 'basic-info' ? 'show active' : ''}`}>
//                   <div className="modal-body pb-0">
//                     <div className="row">
//                       <div className="col-md-12">
//                         <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
//                           {formData.userProfilePic ? (
//                             <img
//                               src={formData.userProfilePic}
//                               alt="Profile Preview"
//                               className="avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0"
//                               style={{ objectFit: 'cover' }}
//                             />
//                           ) : (
//                             <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
//                               <i className="ti ti-photo text-gray-2 fs-16"></i>
//                             </div>
//                           )}
//                           <div className="profile-upload">
//                             <div className="mb-2">
//                               <h6 className="mb-1">Upload Profile Image</h6>
//                               <p className="fs-12">Image should be below 4 mb</p>
//                             </div>
//                             <div className="profile-uploader d-flex align-items-center">
//                               <div className="drag-upload-btn btn btn-sm btn-primary me-2">
//                                 Upload
//                                 <input
//                                   type="file"
//                                   className="form-control image-sign"
//                                   onChange={(e) => {
//                                     if (e.target.files && e.target.files[0]) {
//                                       setFormData(prev => ({
//                                         ...prev,
//                                         userProfilePic: URL.createObjectURL(e.target.files[0])
//                                       }));
//                                     }
//                                   }}
//                                 />
//                               </div>
//                               <button
//                                 type="button"
//                                 className="btn btn-light btn-sm"
//                                 onClick={() => setFormData(prev => ({ ...prev, userProfilePic: '' }))}
//                               >
//                                 Cancel
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">School Name <span className="text-danger">*</span></label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             name="schoolName"
//                             value={formData.schoolName}
//                             onChange={handleChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">First Name <span className="text-danger">*</span></label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             name="firstName"
//                             value={formData.firstName}
//                             onChange={handleChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Last Name <span className="text-danger">*</span></label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             name="lastName"
//                             value={formData.lastName}
//                             onChange={handleChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Institution Name <span className="text-danger">*</span></label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             name="institutionName"
//                             value={formData.institutionName}
//                             onChange={handleChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Board <span className="text-danger">*</span></label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             name="board"
//                             value={formData.board}
//                             onChange={handleChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Institution Type <span className="text-danger">*</span></label>
//                           <select
//                             className="form-select"
//                             name="institutionType"
//                             value={formData.institutionType}
//                             onChange={handleChange}
//                             required
//                           >
//                             <option value="">Select</option>
//                             <option value="School">School</option>
//                             <option value="College">College</option>
//                             <option value="University">University</option>
//                             <option value="Coaching">Coaching</option>
//                           </select>
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Email</label>
//                           <input
//                             type="email"
//                             className="form-control"
//                             name="userEmail"
//                             value={formData.userEmail}
//                             onChange={handleChange}
//                             disabled={isOtpSent}
//                           />
//                           {formData.userEmail && (
//                             <div className="d-flex align-items-center mt-2">
//                               <input
//                                 type="text"
//                                 placeholder="Enter OTP"
//                                 value={otp}
//                                 onChange={(e) => setOtp(e.target.value)}
//                                 className="form-control me-2"
//                                 style={{ width: '150px' }}
//                                 disabled={!isOtpSent}
//                                 maxLength="6"
//                               />
//                               {!isOtpSent ? (
//                                 <button
//                                   type="button"
//                                   onClick={sendOtp}
//                                   className="btn btn-outline-primary"
//                                   disabled={isSendingOtp || !formData.userEmail}
//                                 >
//                                   {isSendingOtp ? 'Sending...' : 'Send OTP'}
//                                 </button>
//                               ) : (
//                                 <button
//                                   type="button"
//                                   onClick={verifyOtp}
//                                   className={`btn ${isOtpVerified ? 'btn-success' : 'btn-primary'}`}
//                                   disabled={isVerifyingOtp || isOtpVerified}
//                                 >
//                                   {isVerifyingOtp ? 'Verifying...' : isOtpVerified ? 'Verified' : 'Verify'}
//                                 </button>
//                               )}
//                             </div>
//                           )}
//                           {isOtpSent && !isOtpVerified && (
//                             <small className="text-muted">OTP sent to your email</small>
//                           )}
//                           {isOtpVerified && (
//                             <small className="text-success">Email verified successfully!</small>
//                           )}
//                           {otpError && (
//                             <div className="text-danger small mt-1">{otpError}</div>
//                           )}
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Mobile Number <span className="text-danger">*</span></label>
//                           <input
//                             type="tel"
//                             className="form-control"
//                             name="userMobile"
//                             value={formData.userMobile}
//                             onChange={handleChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Password <span className="text-danger">*</span></label>
//                           <input
//                             type="password"
//                             className="form-control"
//                             name="userPassword"
//                             value={formData.userPassword}
//                             onChange={handleChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Website</label>
//                           <input
//                             type="url"
//                             className="form-control"
//                             name="website"
//                             value={formData.website}
//                             onChange={handleChange}
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Employer Type <span className="text-danger">*</span></label>
//                           <select
//                             className="form-select"
//                             name="employerType"
//                             value={formData.employerType}
//                             onChange={handleChange}
//                             required
//                           >
//                             <option value="">Select</option>
//                             <option value="Admin">Admin</option>
//                             <option value="Teacher">Teacher</option>
//                             <option value="Staff">Staff</option>
//                           </select>
//                         </div>
//                       </div>
//                       <div className="col-md-6 d-flex justify-content-between align-items-center mb-2">
//                         <label className="col-form-label p-0">Positions <span className="text-danger">*</span></label>
//                         <button
//                           type="button"
//                           className="add-new text-primary"
//                           onClick={() => setShowPositionsModal(true)}
//                           style={{ border: 'none', backgroundColor: 'white' }}
//                         >
//                           <i className="ti ti-plus text-primary me-1"></i>Add New
//                         </button>
//                       </div>
//                       <div className="col-md-12 d-flex justify-content-between align-items-center mb-2">
//                         <label className="col-form-label p-0">User <span className="text-danger">*</span></label>
//                         <button
//                           type="button"
//                           className="add-new text-primary"
//                           onClick={() => setShowAddUserModal(true)}
//                           style={{ border: 'none', backgroundColor: 'white' }}
//                         >
//                           <i className="ti ti-plus text-primary me-1"></i>Add New
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="modal-footer">
//                     <button type="button" className="btn btn-light me-2" onClick={onClose} disabled={isSubmitting}>
//                       Cancel
//                     </button>
//                     <button
//                       type="button"
//                       className="btn btn-primary"
//                       onClick={handleNext}
//                       disabled={isSubmitting}
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>

//                 {/* Address Tab */}
//                 <div className={`tab-pane fade ${activeTab === 'address' ? 'show active' : ''}`}>
//                   <div className="modal-body pb-0">
//                     <div className="row">
//                       <div className="col-md-12">
//                         <div className="mb-3">
//                           <label className="form-label">Address <span className="text-danger">*</span></label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             name="address"
//                             value={formData.address}
//                             onChange={handleChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Country <span className="text-danger">*</span></label>
//                           <select
//                             className="form-select"
//                             name="country"
//                             value={formData.country}
//                             onChange={handleChange}
//                             required
//                           >
//                             <option value="">Select</option>
//                             <option value="USA">USA</option>
//                             <option value="India">India</option>
//                             <option value="UK">UK</option>
//                             <option value="Canada">Canada</option>
//                           </select>
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">State <span className="text-danger">*</span></label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             name="state"
//                             value={formData.state}
//                             onChange={handleChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">City <span className="text-danger">*</span></label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             name="city"
//                             value={formData.city}
//                             onChange={handleChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Pincode <span className="text-danger">*</span></label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             name="pincode"
//                             value={formData.pincode}
//                             onChange={handleChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="modal-footer">
//                     <button type="button" className="btn btn-light me-2" onClick={onClose} disabled={isSubmitting}>
//                       Cancel
//                     </button>
//                     <button type="submit" className="btn btn-primary" disabled={isSubmitting || (formData.userEmail && !isOtpVerified)}>
//                       {isSubmitting ? 'Saving...' : 'Save'}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       <AddPositionsModal
//         show={showPositionsModal}
//         onClose={() => setShowPositionsModal(false)}
//         onAddAccess={() => {
//           setShowPositionsModal(false);
//           setShowAddAccessModal(true);
//         }}
//       />
//       <AddAccessModal
//         show={showAddAccessModal}
//         onClose={() => setShowAddAccessModal(false)}
//         onAddStage={() => {
//           setShowAddAccessModal(false);
//           setShowStageModal(true);
//         }}
//         onEditStage={() => {
//           setShowAddAccessModal(false);
//           setShowEditStageModal(true);
//         }}
//       />

//       <EditAccessModal
//         show={showEditAccessModal}
//         onClose={() => setShowEditAccessModal(false)}
//         onAddStage={() => {
//           setShowEditAccessModal(false);
//           setShowStageModal(true);
//         }}
//         onEditStage={() => {
//           setShowEditAccessModal(false);
//           setShowEditStageModal(true);
//         }}
//       />

//       <AccessModal
//         show={showAccessModal}
//         onClose={() => setShowAccessModal(false)}
//       />

//       <AddStageModal
//         show={showStageModal}
//         onClose={() => setShowStageModal(false)}
//       />

//       <EditStageModal
//         show={showEditStageModal}
//         onClose={() => setShowEditStageModal(false)}
//       />

//       <AddUserModal
//         show={showAddUserModal}
//         onClose={() => setShowAddUserModal(false)}
//         onAddPositions={() => {
//           setShowAddUserModal(false);
//           setShowPositionsModal(true);
//         }}
//       />
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </>
//   );
// };

// export default AddUnitModal;

import React, { useState, useEffect } from "react";
import axios from "axios";
import AddPositionsModal from "./AddPositionsModal";
import AddAccessModal from "./AddAccessModal";
import EditAccessModal from "./EditAccessModal";
import AccessModal from "./AccessModal";
import EditStageModal from "./EditStageModal";
import AddStageModal from "./AddStageModal ";
import AddUserModal from "./AddUserModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddUnitModal = ({ show, onClose }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic-info");
  const [showPositionsModal, setShowPositionsModal] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [showAddAccessModal, setShowAddAccessModal] = useState(false);
  const [showEditAccessModal, setShowEditAccessModal] = useState(false);
  const [showStageModal, setShowStageModal] = useState(false);
  const [showEditStageModal, setShowEditStageModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // OTP Verification State
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // Duplicate check state
  const [emailExists, setEmailExists] = useState(false);
  const [phoneExists, setPhoneExists] = useState(false);
  const [existingEmails, setExistingEmails] = useState([]);
  const [existingPhones, setExistingPhones] = useState([]);

  // Get organization ID from localStorage
  const employerAdminData =
    JSON.parse(localStorage.getItem("EmployerAdminData")) || "{}";
  const organizationid = employerAdminData._id || "";

  const [formData, setFormData] = useState({
    schoolName: "",
    firstName: "",
    lastName: "",
    address: "",
    organizationid: organizationid,
    city: "",
    state: "",
    pincode: "",
    institutionName: "",
    board: "",
    institutionType: "",
    website: "",
    userEmail: "",
    userMobile: "",
    userPassword: "",
    userProfilePic: "",
    employerType: "",
    country: "",
  });

  // Mock data for existing emails and phone numbers
  useEffect(() => {
    // In a real app, you would fetch this from your backend
    const mockExistingData = {
      emails: [
        "existing1@example.com",
        "existing2@example.com",
        "admin@school.com",
      ],
      phones: ["9876543210", "1234567890", "5555555555"],
    };
    setExistingEmails(mockExistingData.emails);
    setExistingPhones(mockExistingData.phones);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Check for email duplication
    if (name === "userEmail") {
      const exists = existingEmails.includes(value);
      setEmailExists(exists);
      if (exists) {
        setIsOtpSent(false);
        setIsOtpVerified(false);
        setOtp("");
      }
    }
    if (name === "userMobile") {
      // Remove any non-digit characters before checking
      const cleanPhone = value.replace(/\D/g, "");
      const exists = existingPhones.includes(cleanPhone);
      setPhoneExists(exists);
    }
  };

  // Send OTP to backend
  const sendOtp = async () => {
    if (!formData.userEmail) {
      setOtpError("Please enter your email address first");
      return;
    }

    if (emailExists) {
      setOtpError("This email is already registered");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.userEmail)) {
      setOtpError("Please enter a valid email address");
      return;
    }

    setIsSendingOtp(true);
    setOtpError("");

    try {
      const response = await axios.post(
        "https://edujobemailverification.onrender.com/api/send-otp",
        {
          email: formData.userEmail,
        }
      );

      if (response.data.success) {
        setIsOtpSent(true);
        setOtpError("");
      } else {
        setOtpError(response.data.error || "Failed to send OTP");
      }
    } catch (error) {
      setOtpError(error.response?.data?.error || "Failed to send OTP");
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Verify OTP with backend
  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setOtpError("Please enter a 6-digit OTP");
      return;
    }

    setIsVerifyingOtp(true);
    setOtpError("");

    try {
      const response = await axios.post(
        "https://edujobemailverification.onrender.com/api/verify-otp",
        {
          email: formData.userEmail,
          otp,
        }
      );

      if (response.data.success) {
        setIsOtpVerified(true);
        setOtpError("");
      } else {
        setOtpError(response.data.error || "Invalid OTP");
        setIsOtpVerified(false);
      }
    } catch (error) {
      setOtpError(error.response?.data?.error || "Verification failed");
      setIsOtpVerified(false);
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleNext = () => {
    // Validate required fields in basic info before proceeding
    if (
      !formData.schoolName ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.institutionName ||
      !formData.board ||
      !formData.institutionType ||
      !formData.userMobile ||
      !formData.userPassword ||
      !formData.employerType
    ) {
      setError("Please fill all required fields");
      return;
    }

    // Check for phone number duplication
    if (phoneExists) {
      setError("Phone number is already registered");
      return;
    }

    // If email is provided, require OTP verification
    if (formData.userEmail && !isOtpVerified) {
      setError("Please verify your email with OTP");
      return;
    }

    setError(null);
    setActiveTab("address");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validate address fields
    if (
      !formData.address ||
      !formData.country ||
      !formData.state ||
      !formData.city ||
      !formData.pincode
    ) {
      setError("Please fill all address fields");
      setIsSubmitting(false);
      return;
    }

    // Check for phone number duplication
    if (phoneExists) {
      setError("Phone number is already registered");
      setIsSubmitting(false);
      return;
    }

    // If email is provided, require OTP verification
    if (formData.userEmail && !isOtpVerified) {
      setError("Please verify your email with OTP");
      setIsSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem("EmployerAdminToken");
      const response = await axios.post(
        "https://api.edprofio.com/employeradmin/createemployer",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Employer created successfully:", response.data);
      toast.success("Unit created successfully!");

      // Call the onSave prop with the response data
      if (typeof onSave === "function") {
        onSave(response.data.data);
      }

      // Reset form data
      setFormData({
        schoolName: "",
        firstName: "",
        lastName: "",
        address: "",
        organizationid: organizationid,
        city: "",
        state: "",
        pincode: "",
        institutionName: "",
        board: "",
        institutionType: "",
        website: "",
        userEmail: "",
        userMobile: "",
        userPassword: "",
        userProfilePic: "",
        employerType: "",
        country: "",
      });

      // Reset OTP state
      setOtp("");
      setIsOtpSent(false);
      setIsOtpVerified(false);

      // Close modal after a short delay to allow toast to show
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      console.error("Error creating employer:", err);
      setError(
        err.response?.data?.message ||
          "Failed to create unit. Please try again."
      );
      toast.error("Failed to create unit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add New Unit</h4>
              <button
                type="button"
                className="btn-close custom-btn-close"
                onClick={onClose}
                aria-label="Close"
              >
                <i className="ti ti-x"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="contact-grids-tab">
                <ul className="nav nav-underline" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${
                        activeTab === "basic-info" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("basic-info")}
                      type="button"
                    >
                      Basic Information
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${
                        activeTab === "address" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("address")}
                      type="button"
                    >
                      Address
                    </button>
                  </li>
                </ul>
              </div>

              {error && (
                <div className="alert alert-danger mx-3 mt-3">{error}</div>
              )}

              <div className="tab-content" id="myTabContent">
                {/* Basic Info Tab */}
                <div
                  className={`tab-pane fade ${
                    activeTab === "basic-info" ? "show active" : ""
                  }`}
                >
                  <div className="modal-body pb-0">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
                          {formData.userProfilePic ? (
                            <img
                              src={formData.userProfilePic}
                              alt="Profile Preview"
                              className="avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0"
                              style={{ objectFit: "cover" }}
                            />
                          ) : (
                            <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                              <i className="ti ti-photo text-gray-2 fs-16"></i>
                            </div>
                          )}
                          <div className="profile-upload">
                            <div className="mb-2">
                              <h6 className="mb-1">Upload Profile Image</h6>
                              <p className="fs-12">
                                Image should be below 4 mb
                              </p>
                            </div>
                            <div className="profile-uploader d-flex align-items-center">
                              <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                                Upload
                                <input
                                  type="file"
                                  className="form-control image-sign"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      setFormData((prev) => ({
                                        ...prev,
                                        userProfilePic: URL.createObjectURL(
                                          e.target.files[0]
                                        ),
                                      }));
                                    }
                                  }}
                                />
                              </div>
                              <button
                                type="button"
                                className="btn btn-light btn-sm"
                                onClick={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    userProfilePic: "",
                                  }))
                                }
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            School Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="schoolName"
                            value={formData.schoolName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            First Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Last Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Institution Name{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="institutionName"
                            value={formData.institutionName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Board <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="board"
                            value={formData.board}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Institution Type{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-select"
                            name="institutionType"
                            value={formData.institutionType}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select</option>
                            <option value="School">School</option>
                            <option value="College">College</option>
                            <option value="University">University</option>
                            <option value="Coaching">Coaching</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            name="userEmail"
                            value={formData.userEmail}
                            onChange={handleChange}
                            disabled={isOtpSent}
                          />
                          {emailExists && (
                            <div className="text-danger small mt-1">
                              Email already registered
                            </div>
                          )}
                          {formData.userEmail && !emailExists && (
                            <div className="d-flex align-items-center mt-2">
                              <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="form-control me-2"
                                style={{ width: "150px" }}
                                disabled={!isOtpSent}
                                maxLength="6"
                              />
                              {!isOtpSent ? (
                                <button
                                  type="button"
                                  onClick={sendOtp}
                                  className="btn btn-outline-primary"
                                  disabled={isSendingOtp || !formData.userEmail}
                                >
                                  {isSendingOtp ? "Sending..." : "Send OTP"}
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={verifyOtp}
                                  className={`btn ${
                                    isOtpVerified
                                      ? "btn-success"
                                      : "btn-primary"
                                  }`}
                                  disabled={isVerifyingOtp || isOtpVerified}
                                >
                                  {isVerifyingOtp
                                    ? "Verifying..."
                                    : isOtpVerified
                                    ? "Verified"
                                    : "Verify"}
                                </button>
                              )}
                            </div>
                          )}
                          {isOtpSent && !isOtpVerified && (
                            <small className="text-muted">
                              OTP sent to your email
                            </small>
                          )}
                          {isOtpVerified && (
                            <small className="text-success">
                              Email verified successfully!
                            </small>
                          )}
                          {otpError && (
                            <div className="text-danger small mt-1">
                              {otpError}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Mobile Number <span className="text-danger">*</span>
                          </label>
                          <input
                            type="tel"
                            className={`form-control ${
                              phoneExists ? "is-invalid" : ""
                            }`}
                            name="userMobile"
                            value={formData.userMobile}
                            onChange={handleChange}
                            required
                          />
                          {phoneExists && (
                            <div className="invalid-feedback">
                              Phone number already registered
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Password <span className="text-danger">*</span>
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            name="userPassword"
                            value={formData.userPassword}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Website</label>
                          <input
                            type="url"
                            className="form-control"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Employer Type <span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-select"
                            name="employerType"
                            value={formData.employerType}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select</option>
                            <option value="Admin">Admin</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Staff">Staff</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6 d-flex justify-content-between align-items-center mb-2">
                        <label className="col-form-label p-0">
                          Positions <span className="text-danger">*</span>
                        </label>
                        <button
                          type="button"
                          className="add-new text-primary"
                          onClick={() => setShowPositionsModal(true)}
                          style={{ border: "none", backgroundColor: "white" }}
                        >
                          <i className="ti ti-plus text-primary me-1"></i>Add
                          New
                        </button>
                      </div>
                      <div className="col-md-12 d-flex justify-content-between align-items-center mb-2">
                        <label className="col-form-label p-0">
                          User <span className="text-danger">*</span>
                        </label>
                        <button
                          type="button"
                          className="add-new text-primary"
                          onClick={() => setShowAddUserModal(true)}
                          style={{ border: "none", backgroundColor: "white" }}
                        >
                          <i className="ti ti-plus text-primary me-1"></i>Add
                          New
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-light me-2"
                      onClick={onClose}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleNext}
                      disabled={isSubmitting || phoneExists}
                    >
                      Next
                    </button>
                  </div>
                </div>

                {/* Address Tab */}
                <div
                  className={`tab-pane fade ${
                    activeTab === "address" ? "show active" : ""
                  }`}
                >
                  <div className="modal-body pb-0">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Address <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Country <span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-select"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select</option>
                            <option value="USA">USA</option>
                            <option value="India">India</option>
                            <option value="UK">UK</option>
                            <option value="Canada">Canada</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            State <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            City <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Pincode <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-light me-2"
                      onClick={onClose}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={
                        isSubmitting ||
                        (formData.userEmail && !isOtpVerified) ||
                        phoneExists
                      }
                    >
                      {isSubmitting ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <AddPositionsModal
        show={showPositionsModal}
        onClose={() => setShowPositionsModal(false)}
        onAddAccess={() => {
          setShowPositionsModal(false);
          setShowAddAccessModal(true);
        }}
      />
      <AddAccessModal
        show={showAddAccessModal}
        onClose={() => setShowAddAccessModal(false)}
        onAddStage={() => {
          setShowAddAccessModal(false);
          setShowStageModal(true);
        }}
        onEditStage={() => {
          setShowAddAccessModal(false);
          setShowEditStageModal(true);
        }}
      />

      <EditAccessModal
        show={showEditAccessModal}
        onClose={() => setShowEditAccessModal(false)}
        onAddStage={() => {
          setShowEditAccessModal(false);
          setShowStageModal(true);
        }}
        onEditStage={() => {
          setShowEditAccessModal(false);
          setShowEditStageModal(true);
        }}
      />

      <AccessModal
        show={showAccessModal}
        onClose={() => setShowAccessModal(false)}
      />

      <AddStageModal
        show={showStageModal}
        onClose={() => setShowStageModal(false)}
      />

      <EditStageModal
        show={showEditStageModal}
        onClose={() => setShowEditStageModal(false)}
      />

      <AddUserModal
        show={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onAddPositions={() => {
          setShowAddUserModal(false);
          setShowPositionsModal(true);
        }}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default AddUnitModal;
