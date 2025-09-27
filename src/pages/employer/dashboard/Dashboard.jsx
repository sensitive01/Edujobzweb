const handleSearchCandidates = () => {
  navigate("/employer/search");
};

const handlePostJob = () => {
  navigate("/employer/post-jobs");
};

// Navigation handlers for profile actions
const handleEditInfo = () => {
  navigate("/employer/profile");
};

const handleChangePassword = () => {
  const modal = new Modal(passwordModalRef.current);
  modal.show();
};

const handleSendMessage = () => {
  navigate("/employer/messages");
};

// Navigation handlers for overview cards
const handleAppliedCandidates = () => {
  navigate("/employer/applied-candidates");
};

const handleShortlistedCandidates = () => {
  navigate("/employer/shortlisted-candidates");
};

const handleRejectedCandidates = () => {
  navigate("#");
};

const handlePendingCandidates = () => {
  navigate("/employer/applied-candidates");
};

// Password change handlers
const handlePasswordChange = (e) => {
  const { name, value } = e.target;
  setPasswordData((prev) => ({
    ...prev,
    [name]: value,
  }));
  setPasswordError(null);
};

const togglePasswordVisibility = (field) => {
  setShowPasswords((prev) => ({
    ...prev,
    [field]: !prev[field],
  }));
};

const handlePasswordSubmit = async (e) => {
  e.preventDefault();

  // Validate passwords
  if (
    !passwordData.currentPassword ||
    !passwordData.newPassword ||
    !passwordData.confirmPassword
  ) {
    setPasswordError("All password fields are required");
    return;
  }

  if (passwordData.newPassword !== passwordData.confirmPassword) {
    setPasswordError("New password and confirm password do not match");
    return;
  }

  if (passwordData.newPassword.length < 6) {
    setPasswordError("New password must be at least 6 characters long");
    return;
  }

  setIsChangingPassword(true);
  setPasswordError(null);

  try {
    const token = localStorage.getItem("employerToken");

    const response = await fetch(
      `https://api.edprofio.com/employer/changeMyPassword/${employerData._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Password change failed");
    }

    // Reset password form
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    // Close modal
    const modal = Modal.getInstance(passwordModalRef.current);
    modal.hide();

    alert("Password changed successfully!");
  } catch (err) {
    console.error("Password change error:", err);
    setPasswordError(err.message);
  } finally {
    setIsChangingPassword(false);
  }
};
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import EmployerHeader from "../EmployerHeader";
import EmployerFooter from "../EmployerFooter";
import { getEmployerDashboardData } from "../../../api/services/projectServices";
import defaultImage from "../../../../public/images/jobImage.jpg";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalJobs: 0,
    activeJobs: 0,
    appliedCount: 0,
    interviewScheduledCount: 0,
    shortlistedCount: 0,
    rejectedCount: 0,
    pendingCount: 0,
  });
  const [employerData, setEmployerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const passwordModalRef = useRef(null);
  const navigate = useNavigate();
  const storedEmployerData = JSON.parse(localStorage.getItem("employerData"));

  // Navigation handlers - MOVED BEFORE LOADING CHECKS
  const handleSearchCandidates = () => {
    navigate("/employer/search");
  };

  const handlePostJob = () => {
    navigate("/employer/post-jobs");
  };

  // Navigation handlers for profile actions
  const handleEditInfo = () => {
    navigate("/employer/profile");
  };

  const handleChangePassword = () => {
    const modal = new Modal(passwordModalRef.current);
    modal.show();
  };

  const handleSendMessage = () => {
    navigate("/employer/messages");
  };

  // Navigation handlers for overview cards
  const handleAppliedCandidates = () => {
    navigate("/employer/applied-candidates");
  };

  const handleShortlistedCandidates = () => {
    navigate("/employer/shortlisted-candidates");
  };

  const handleRejectedCandidates = () => {
    navigate("#");
  };

  const handlePendingCandidates = () => {
    navigate("/employer/applied-candidates");
  };

  // Password change handlers
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPasswordError(null);
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setPasswordError("All password fields are required");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New password and confirm password do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters long");
      return;
    }

    setIsChangingPassword(true);
    setPasswordError(null);

    try {
      const token = localStorage.getItem("employerToken");

      const response = await fetch(
        `https://api.edprofio.com/employer/changeMyPassword/${employerData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Password change failed");
      }

      // Reset password form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Close modal
      const modal = Modal.getInstance(passwordModalRef.current);
      modal.hide();

      toast.success("Password changed successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.error("Password change error:", err);
      setPasswordError(err.message);

      toast.error(`Password change failed: ${err.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("employerToken");

        if (!token || !storedEmployerData?._id) {
          navigate("/employer/login");
          return;
        }

        // Fetch employer details from API
        const employerResponse = await fetch(
          `https://api.edprofio.com/employer/fetchemployer/${storedEmployerData._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!employerResponse.ok) {
          throw new Error("Failed to fetch employer details");
        }

        const employerApiData = await employerResponse.json();
        setEmployerData(employerApiData);

        // Fetch dashboard data
        const dashboardResponse = await getEmployerDashboardData(
          storedEmployerData._id
        );
        if (dashboardResponse.status === 200) {
          setDashboardData(dashboardResponse.data.counts);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    // Add CSS for hover effects
    const style = document.createElement("style");
    style.textContent = `
      .clickable-card {
        cursor: pointer;
        transition: all 0.3s ease;
        border: 1px solid #e9ecef;
      }
      
      .clickable-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border-color: #007bff;
      }
      
      .clickable-overview-card {
        cursor: pointer;
        transition: all 0.3s ease;
        background-color: #f8f9fa !important;
      }
      
      .clickable-overview-card:hover {
        background-color: #e9ecef !important;
        transform: translateY(-1px);
      }
      
      .card-link {
        text-decoration: none;
        color: inherit;
      }
      
      .card-link:hover {
        color: inherit;
        text-decoration: none;
      }
      
      .stat-number {
        transition: color 0.3s ease;
      }
      
      .clickable-card:hover .stat-number {
        color: #007bff !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (!storedEmployerData || !storedEmployerData._id) {
    navigate("/employer/login");
    return null;
  }

  if (loading) {
    return (
      <>
        <EmployerHeader />
        <div className="content">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading dashboard...</p>
          </div>
        </div>
        <EmployerFooter />
      </>
    );
  }

  if (error) {
    return (
      <>
        <EmployerHeader />
        <div className="content">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Error!</h4>
            <p>{error}</p>
            <hr />
            <button
              className="btn btn-outline-danger"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
        <EmployerFooter />
      </>
    );
  }

  if (!employerData) {
    return (
      <>
        <EmployerHeader />
        <div className="content">
          <div className="alert alert-warning" role="alert">
            No employer data found. Please contact support.
          </div>
        </div>
        <EmployerFooter />
      </>
    );
  }

  return (
    <>
      <EmployerHeader />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="content">
        {/* Main Layout */}
        <div className="row">
          {/* Left Side - Profile Card */}
          <div className="col-lg-4 col-md-12 mb-4">
            <div className="card" style={{ minHeight: "calc(100vh - 200px)" }}>
              {/* Header with gradient background */}
              <div className="card-header p-0">
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ffd700 100%)",
                    height: "120px",
                    position: "relative",
                  }}
                >
                  <div
                    className="position-absolute"
                    style={{
                      bottom: "-30px",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <div className="avatar avatar-xxl border border-4 border-white bg-white rounded-circle">
                      <img
                        src={employerData.userProfilePic || defaultImage}
                        className="rounded-circle"
                        alt="profile"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.target.src = defaultImage;
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="card-body pt-5 text-center">
                <h4 className="mb-1">
                  {employerData.schoolName || "Sample Bangalore School"}
                </h4>
                <div className="mb-3">
                  <span className="badge bg-primary me-2">CBSE</span>
                  <span className="badge bg-secondary">School</span>
                </div>

                {/* Profile Details */}
                <div className="text-start mt-4">
                  <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <div className="d-flex align-items-center">
                      <i className="ti ti-id me-2 text-muted"></i>
                      <small className="text-muted">Client ID</small>
                    </div>
                    <small className="fw-medium">
                      {employerData._id?.slice(-12) || "N/A"}
                    </small>
                  </div>

                  <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <div className="d-flex align-items-center">
                      <i className="ti ti-user-shield me-2 text-muted"></i>
                      <small className="text-muted">Admin</small>
                    </div>
                    <small className="fw-medium">
                      {employerData.firstName && employerData.lastName
                        ? `${employerData.firstName} ${employerData.lastName}`
                        : "Admin User"}
                    </small>
                  </div>

                  <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <div className="d-flex align-items-center">
                      <i className="ti ti-calendar me-2 text-muted"></i>
                      <small className="text-muted">Registered On</small>
                    </div>
                    <small className="fw-medium">
                      {employerData.createdAt
                        ? new Date(employerData.createdAt).toLocaleDateString()
                        : new Date().toLocaleDateString()}
                    </small>
                  </div>

                  <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <div className="d-flex align-items-center">
                      <i className="ti ti-phone me-2 text-muted"></i>
                      <small className="text-muted">Phone</small>
                    </div>
                    <small className="fw-medium">
                      {employerData.userMobile || "Not provided"}
                    </small>
                  </div>

                  <div className="d-flex justify-content-between align-items-center py-2">
                    <div className="d-flex align-items-center">
                      <i className="ti ti-mail me-2 text-muted"></i>
                      <small className="text-muted">Email</small>
                    </div>
                    <small className="fw-medium text-primary">
                      {employerData.userEmail || "Not provided"}
                    </small>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 d-grid gap-2">
                  <button className="btn btn-dark" onClick={handleEditInfo}>
                    <i className="ti ti-edit me-2"></i>Edit Info
                  </button>
                  <button
                    onClick={handleSearchCandidates}
                    className="btn btn-primary"
                  >
                    <i className="ti ti-search me-2"></i>Search Candidates
                  </button>
                  <button
                    onClick={handlePostJob}
                    className="btn btn-warning text-white"
                  >
                    <i className="ti ti-plus me-2"></i>Post Job
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={handleChangePassword}
                  >
                    <i className="ti ti-lock me-2"></i>Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Candidates Overview and Statistics */}
          <div className="col-lg-8 col-md-12">
            {/* Candidates Overview */}
            <div className="card mb-4">
              <div className="card-body">
                <div className="row align-items-center mb-4">
                  <div className="col-md-8">
                    <div className="mb-3 mb-md-0">
                      <h4 className="mb-1">
                        Candidates (for current active positions only)
                      </h4>
                      <p>
                        Overview of candidate applications and their current
                        status
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-center justify-content-md-end">
                      <h6>Active Job Posts: {dashboardData.activeJobs}</h6>
                    </div>
                  </div>
                </div>
                <div className="border rounded">
                  <div className="row gx-0">
                    <div
                      className="col-md col-sm-6 border-end clickable-overview-card"
                      onClick={handleAppliedCandidates}
                    >
                      <div className="p-3">
                        <span className="fw-medium mb-1 d-block">
                          Applied Candidates
                        </span>
                        <div className="d-flex align-items-center justify-content-between">
                          <h5 className="text-primary stat-number">
                            {dashboardData.appliedCount}
                          </h5>
                          <span className="badge badge-primary d-inline-flex align-items-center">
                            <i className="ti ti-user-plus me-1"></i>
                            Total
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-md col-sm-6 border-end clickable-overview-card"
                      onClick={handleShortlistedCandidates}
                    >
                      <div className="p-3">
                        <span className="fw-medium mb-1 d-block">
                          Shortlisted Candidates
                        </span>
                        <div className="d-flex align-items-center justify-content-between">
                          <h5 className="text-success stat-number">
                            {dashboardData.shortlistedCount}
                          </h5>
                          <span className="badge badge-success d-inline-flex align-items-center">
                            <i className="ti ti-user-check me-1"></i>
                            Selected
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-md col-sm-6 border-end clickable-overview-card"
                      onClick={handleRejectedCandidates}
                    >
                      <div className="p-3">
                        <span className="fw-medium mb-1 d-block">
                          Rejected Candidates
                        </span>
                        <div className="d-flex align-items-center justify-content-between">
                          <h5 className="text-danger stat-number">
                            {dashboardData.rejectedCount}
                          </h5>
                          <span className="badge badge-danger d-inline-flex align-items-center">
                            <i className="ti ti-user-x me-1"></i>
                            Not Selected
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-md col-sm-6 clickable-overview-card"
                      onClick={handlePendingCandidates}
                    >
                      <div className="p-3">
                        <span className="fw-medium mb-1 d-block">
                          Pending for Review
                        </span>
                        <div className="d-flex align-items-center justify-content-between">
                          <h5 className="text-warning stat-number">
                            {dashboardData.pendingCount}
                          </h5>
                          <span className="badge badge-warning d-inline-flex align-items-center">
                            <i className="ti ti-clock me-1"></i>
                            Awaiting
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="row">
              <div className="col-xl-3 col-lg-6 col-sm-6 d-flex mb-3">
                <div
                  className="card flex-fill clickable-card"
                  onClick={() => navigate("/employer/post-jobs")}
                >
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="avatar avatar-lg bg-primary mb-3">
                        <i className="ti ti-briefcase fs-20"></i>
                      </span>
                      <span className="badge bg-success fw-normal mb-3 fs-12">
                        {dashboardData.activeJobs > 0 ? "+" : ""}
                        {dashboardData.activeJobs}
                      </span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h1 className="mb-2 stat-number">
                          {dashboardData.totalJobs}
                        </h1>
                        <p className="fs-14 mb-0">Total Jobs Posted</p>
                      </div>
                      <i className="ti ti-arrow-up-right fs-18 text-muted"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-lg-6 col-sm-6 d-flex mb-3">
                <div
                  className="card flex-fill clickable-card"
                  onClick={() => navigate("/employer/post-jobs")}
                >
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="avatar avatar-lg bg-success mb-3">
                        <i className="ti ti-user-search fs-20"></i>
                      </span>
                      <span className="badge bg-info fw-normal mb-3 fs-12">
                        Active
                      </span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h1 className="mb-2 stat-number">
                          {dashboardData.activeJobs}
                        </h1>
                        <p className="fs-14 mb-0">Hiring Active Jobs</p>
                      </div>
                      <i className="ti ti-arrow-up-right fs-18 text-muted"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-lg-6 col-sm-6 d-flex mb-3">
                <div
                  className="card flex-fill clickable-card"
                  onClick={() => navigate("/employer/post-jobs")}
                >
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="avatar avatar-lg bg-warning mb-3">
                        <i className="ti ti-calendar-event fs-20"></i>
                      </span>
                      <span className="badge bg-warning fw-normal mb-3 fs-12">
                        Scheduled
                      </span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h1 className="mb-2 stat-number">
                          {dashboardData.interviewScheduledCount}
                        </h1>
                        <p className="fs-14 mb-0">Upcoming Interviews</p>
                      </div>
                      <i className="ti ti-arrow-up-right fs-18 text-muted"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-lg-6 col-sm-6 d-flex mb-3">
                <div
                  className="card flex-fill clickable-card"
                  onClick={() => navigate("/employer/plans-grid")}
                >
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="avatar avatar-lg bg-info mb-3">
                        <i className="ti ti-crown fs-20"></i>
                      </span>
                      <span className="badge bg-info fw-normal mb-3 fs-12">
                        Premium
                      </span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h1 className="mb-2 stat-number">30</h1>
                        <p className="fs-14 mb-0">Plan Validity (Days)</p>
                      </div>
                      <i className="ti ti-arrow-up-right fs-18 text-muted"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <div
        className="modal fade"
        id="changePasswordModal"
        ref={passwordModalRef}
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Change Password</h4>
              <button
                type="button"
                className="btn-close custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-x"></i>
              </button>
            </div>
            <form onSubmit={handlePasswordSubmit}>
              <div className="modal-body">
                {passwordError && (
                  <div className="alert alert-danger">{passwordError}</div>
                )}

                <div className="mb-3">
                  <label className="form-label">
                    Current Password <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      className="form-control"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => togglePasswordVisibility("current")}
                    >
                      <i
                        className={`ti ${
                          showPasswords.current ? "ti-eye-off" : "ti-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    New Password <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      className="form-control"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                      placeholder="Enter new password"
                      minLength="6"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => togglePasswordVisibility("new")}
                    >
                      <i
                        className={`ti ${
                          showPasswords.new ? "ti-eye-off" : "ti-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                  <small className="text-muted">
                    Password must be at least 6 characters long
                  </small>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Confirm New Password <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      className="form-control"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => togglePasswordVisibility("confirm")}
                    >
                      <i
                        className={`ti ${
                          showPasswords.confirm ? "ti-eye-off" : "ti-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-light border me-2"
                  data-bs-dismiss="modal"
                  disabled={isChangingPassword}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-danger"
                  disabled={isChangingPassword}
                >
                  {isChangingPassword ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-1"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Changing Password...
                    </>
                  ) : (
                    <>
                      <i className="ti ti-lock me-1"></i>
                      Change Password
                    </>
                  )}
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

export default Dashboard;
