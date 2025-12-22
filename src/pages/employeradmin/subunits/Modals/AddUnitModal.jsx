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

const AddUnitModal = ({ show, onClose, onSave }) => {
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL || "https://api.edprofio.com";
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

  // Error Modal State
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorDetails, setErrorDetails] = useState({
    title: "",
    message: "",
    details: "",
    stack: ""
  });

  // Duplicate check state
  const [emailExists, setEmailExists] = useState(false);
  const [phoneExists, setPhoneExists] = useState(false);
  const [existingEmails, setExistingEmails] = useState([]);
  const [existingPhones, setExistingPhones] = useState([]);

  // OTP functionality state
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // Get organization ID from localStorage
  const employerAdminData = JSON.parse(localStorage.getItem("EmployerAdminData")) || {};
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

  // Capture console errors globally
  useEffect(() => {
    const originalConsoleError = console.error;
    
    console.error = (...args) => {
      // Call original console.error
      originalConsoleError.apply(console, args);
      
      // Show error in popup
      const errorMessage = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      
      setErrorDetails({
        title: "Console Error",
        message: errorMessage,
        details: errorMessage,
        stack: new Error().stack || ""
      });
      setShowErrorModal(true);
      toast.error(`Console Error: ${errorMessage.substring(0, 100)}...`);
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  // Mock data for existing emails and phone numbers
  useEffect(() => {
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

  // Function to display error in popup
  const displayError = (title, message, error = null) => {
    console.log(`${title}:`, message, error);
    
    let errorDetailsObj = {
      title: title,
      message: message,
      details: "",
      stack: ""
    };

    if (error) {
      if (error.response) {
        errorDetailsObj.details = JSON.stringify({
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
          headers: error.response.headers
        }, null, 2);
      } else if (error.request) {
        errorDetailsObj.details = JSON.stringify({
          message: "No response received from server",
          request: error.request
        }, null, 2);
      } else {
        errorDetailsObj.details = error.message || String(error);
      }
      
      errorDetailsObj.stack = error.stack || "";
    }

    setErrorDetails(errorDetailsObj);
    setShowErrorModal(true);
    toast.error(message);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "userEmail") {
      const exists = existingEmails.includes(value);
      setEmailExists(exists);
      // Reset OTP state when email changes
      if (isOtpSent || isOtpVerified) {
        setIsOtpSent(false);
        setIsOtpVerified(false);
        setOtp("");
        setOtpError("");
        setOtpSuccess("");
      }
    }
    if (name === "userMobile") {
      const cleanPhone = value.replace(/\D/g, "");
      const exists = existingPhones.includes(cleanPhone);
      setPhoneExists(exists);
    }
  };

  // Send OTP to backend
  const sendOtp = async () => {
    if (!formData.userEmail) {
      setOtpError("Please enter your email address first");
      toast.error("Please enter your email address first");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.userEmail)) {
      setOtpError("Please enter a valid email address");
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSendingOtp(true);
    setOtpError("");
    setOtpSuccess("");

    try {
      const response = await axios.post(
        `${VITE_BASE_URL}/employer/sendemailotp`,
        {
          userEmail: formData.userEmail,
        },
        {
          validateStatus: function (status) {
            return status === 200 || status === 401;
          },
        }
      );

      if (response.status === 200) {
        setIsOtpSent(true);
        setOtpSuccess("OTP sent to your email successfully");
        setOtpError("");
        toast.success("OTP sent to your email successfully");
      } else if (response.status === 401) {
        const errorMsg = response.data.message || response.data.error || "User already exists";
        setOtpError(errorMsg);
        toast.error(errorMsg);
      } else {
        const errorMsg = response.data.error || "Failed to send OTP";
        setOtpError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (error) {
      const errorMsg = "Network error. Please try again.";
      setOtpError(errorMsg);
      toast.error(errorMsg);
      displayError("OTP Send Error", errorMsg, error);
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Verify OTP with backend
  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setOtpError("Please enter a 6-digit OTP");
      toast.error("Please enter a 6-digit OTP");
      return;
    }

    setIsVerifyingOtp(true);
    setOtpError("");
    setOtpSuccess("");

    try {
      const response = await axios.post(
        `${VITE_BASE_URL}/employer/verifyemailotp`,
        {
          userEmail: formData.userEmail,
          otp,
        }
      );

      if (response.status === 200) {
        setIsOtpVerified(true);
        setOtpSuccess("Email verified successfully!");
        setOtpError("");
        toast.success("Email verified successfully!");
      } else {
        const errorMsg = response.data.error || "Invalid OTP";
        setOtpError(errorMsg);
        setIsOtpVerified(false);
        toast.error(errorMsg);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Verification failed";
      setOtpError(errorMsg);
      setIsOtpVerified(false);
      toast.error(errorMsg);
      displayError("OTP Verification Error", errorMsg, error);
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleNext = () => {
    try {
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
        const errorMsg = "Please fill all required fields";
        setError(errorMsg);
        displayError("Validation Error", errorMsg);
        return;
      }

      // Check if email is provided and OTP is verified
      if (formData.userEmail && !isOtpVerified) {
        const errorMsg = "Please verify your email with OTP";
        setError(errorMsg);
        toast.error(errorMsg);
        return;
      }

      if (phoneExists) {
        const errorMsg = "Phone number is already registered";
        setError(errorMsg);
        displayError("Duplicate Error", errorMsg);
        return;
      }

      if (emailExists) {
        const errorMsg = "Email is already registered";
        setError(errorMsg);
        displayError("Duplicate Error", errorMsg);
        return;
      }

      setError(null);
      setActiveTab("address");
    } catch (err) {
      displayError("Navigation Error", "Error moving to next step", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate address fields
      if (
        !formData.address ||
        !formData.country ||
        !formData.state ||
        !formData.city ||
        !formData.pincode
      ) {
        const errorMsg = "Please fill all address fields";
        setError(errorMsg);
        displayError("Validation Error", errorMsg);
        setIsSubmitting(false);
        return;
      }

      // Validate OTP verification if email is provided
      if (formData.userEmail && !isOtpVerified) {
        const errorMsg = "Please verify your email with OTP";
        setError(errorMsg);
        toast.error(errorMsg);
        setIsSubmitting(false);
        return;
      }

      if (phoneExists) {
        const errorMsg = "Phone number is already registered";
        setError(errorMsg);
        displayError("Duplicate Error", errorMsg);
        setIsSubmitting(false);
        return;
      }

      if (emailExists) {
        const errorMsg = "Email is already registered";
        setError(errorMsg);
        displayError("Duplicate Error", errorMsg);
        setIsSubmitting(false);
        return;
      }

      const token = localStorage.getItem("EmployerAdminToken");
      
      const payload = {
        ...formData,
        fullAddress: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.country} - ${formData.pincode}`,
      };
      
      console.log("Submitting form data:", payload);
      
      const response = await axios.post(
        `${VITE_BASE_URL}/employeradmin/createemployer`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Employer created successfully:", response.data);
      toast.success("Unit created successfully!");

      if (typeof onSave === "function") {
        const savedData = response.data.data || response.data;
        const completeData = {
          ...savedData,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          pincode: formData.pincode,
          fullAddress: payload.fullAddress
        };
        onSave(completeData);
      }

      // Reset form
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
      setOtpError("");
      setOtpSuccess("");

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      console.log("Error creating employer:", err);
      
      let errorMsg = "Failed to create unit. Please try again.";
      
      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          errorMsg = err.response.data;
        } else if (err.response.data.message) {
          errorMsg = err.response.data.message;
        } else if (err.response.data.error) {
          errorMsg = err.response.data.error;
        }
      }
      
      setError(errorMsg);
      displayError("API Error", errorMsg, err);
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
                                    try {
                                      if (e.target.files && e.target.files[0]) {
                                        setFormData((prev) => ({
                                          ...prev,
                                          userProfilePic: URL.createObjectURL(
                                            e.target.files[0]
                                          ),
                                        }));
                                      }
                                    } catch (err) {
                                      displayError("File Upload Error", "Failed to upload profile picture", err);
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
                      
                      {/* Email with OTP Verification */}
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Email Address</label>
                          <div className="input-group">
                            <input
                              type="email"
                              name="userEmail"
                              value={formData.userEmail}
                              onChange={handleChange}
                              className={`form-control border-end-0 ${
                                emailExists ? "is-invalid" : ""
                              }`}
                              placeholder="Enter email address"
                              disabled={isOtpSent}
                            />
                            <span className="input-group-text border-start-0">
                              <i className="ti ti-mail"></i>
                            </span>
                            {emailExists && (
                              <div className="invalid-feedback">
                                Email already registered
                              </div>
                            )}
                          </div>
                          
                          {/* OTP Input and Buttons */}
                          {formData.userEmail && (
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
                                  disabled={
                                    isSendingOtp ||
                                    !formData.userEmail ||
                                    emailExists
                                  }
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
                          
                          {/* OTP Status Messages */}
                          {formData.userEmail && (
                            <>
                              {isOtpSent && !isOtpVerified && !otpError && !otpSuccess && (
                                <small className="text-muted d-block mt-1">
                                  OTP sent to your email
                                </small>
                              )}
                              {isOtpVerified && (
                                <small className="text-success d-block mt-1">
                                  <i className="ti ti-circle-check me-1"></i>
                                  Email verified successfully!
                                </small>
                              )}
                              {otpError && (
                                <small className="text-danger d-block mt-1">
                                  <i className="ti ti-alert-circle me-1"></i>
                                  {otpError}
                                </small>
                              )}
                            </>
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
                      disabled={
                        isSubmitting || 
                        phoneExists || 
                        emailExists ||
                        (formData.userEmail && !isOtpVerified)
                      }
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
                            placeholder="Enter street address"
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
                            <option value="">Select Country</option>
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
                            placeholder="Enter state"
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
                            placeholder="Enter city"
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
                            placeholder="Enter pincode"
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
                        phoneExists || 
                        emailExists ||
                        (formData.userEmail && !isOtpVerified)
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

      {/* Error Details Modal */}
      {showErrorModal && (
        <div
          className="modal fade show"
          style={{ 
            display: "block", 
            backgroundColor: "rgba(0,0,0,0.7)",
            zIndex: 9999 
          }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">
                  <i className="ti ti-alert-circle me-2"></i>
                  {errorDetails.title}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowErrorModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="alert alert-danger">
                  <h6 className="fw-bold">Error Message:</h6>
                  <p className="mb-0">{errorDetails.message}</p>
                </div>
                
                {errorDetails.details && (
                  <div className="mt-3">
                    <h6 className="fw-bold">Error Details:</h6>
                    <pre 
                      style={{ 
                        backgroundColor: "#f8f9fa", 
                        padding: "15px", 
                        borderRadius: "5px",
                        maxHeight: "200px",
                        overflow: "auto",
                        fontSize: "12px"
                      }}
                    >
                      {errorDetails.details}
                    </pre>
                  </div>
                )}
                
                {errorDetails.stack && (
                  <div className="mt-3">
                    <h6 className="fw-bold">Stack Trace:</h6>
                    <pre 
                      style={{ 
                        backgroundColor: "#f8f9fa", 
                        padding: "15px", 
                        borderRadius: "5px",
                        maxHeight: "200px",
                        overflow: "auto",
                        fontSize: "11px"
                      }}
                    >
                      {errorDetails.stack}
                    </pre>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `Error: ${errorDetails.title}\n\nMessage: ${errorDetails.message}\n\nDetails: ${errorDetails.details}\n\nStack: ${errorDetails.stack}`
                    );
                    toast.success("Error details copied to clipboard!");
                  }}
                >
                  <i className="ti ti-copy me-1"></i>
                  Copy Error
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setShowErrorModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
        theme="light"
      />
    </>
  );
};

export default AddUnitModal;