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

  // Navigation handlers
  const handleSearchCandidates = () => {
    navigate("/employer/search");
  };

  const handlePostJob = () => {
    navigate("/employer/post-jobs");
  };

  const handleEditInfo = () => {
    navigate("/employer/profile");
  };

  const handleChangePassword = () => {
    const modal = new Modal(passwordModalRef.current);
    modal.show();
  };

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

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

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
        <div className="card mb-4">
          <div className="card-body d-flex align-items-center justify-content-between flex-wrap pb-1">
            <div className="d-flex align-items-center mb-3">
              <span className="avatar avatar-xl flex-shrink-0">
                <img
                  src={employerData.userProfilePic || defaultImage}
                  className="rounded-circle"
                  alt="img"
                  onError={(e) => {
                    e.target.src = defaultImage;
                  }}
                />
              </span>
              <div className="ms-3">
                <h3 className="mb-2">
                {employerData.schoolName || "School"}{" "}
                  <a
                    href="javascript:void(0);"
                    className="edit-icon"
                    onClick={handleEditInfo}
                  >
                    <i className="ti ti-edit fs-14"></i>
                  </a>
                </h3>
                <p>
                  You have{" "}
                  <span className="text-primary text-decoration-underline">
                    {dashboardData.appliedCount}
                  </span>{" "}
                  Total Applications &{" "}
                  <span className="text-primary text-decoration-underline">
                    {dashboardData.pendingCount}
                  </span>{" "}
                  Pending Reviews
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center flex-wrap mb-1">
              <button
                onClick={handleSearchCandidates}
                className="btn btn-primary btn-md me-2 mb-2"
              >
                <i className="ti ti-search me-1"></i>Search Candidates
              </button>
              <button
                onClick={handlePostJob}
                className="btn btn-secondary btn-md me-2 mb-2"
              >
                <i className="ti ti-plus me-1"></i>Post Job
              </button>
            </div>
          </div>
        </div>
        {/* Main Layout Row */}
        <div className="row">
          {/* Left Column - Profile Card */}
          <div className="col-lg-4">
            <div className="card" style={{ minHeight: "calc(100vh - 200px)" }}>
              {/* Gradient Header */}
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

              {/* Profile Info */}
              <div className="card-body pt-5 text-center">
                <h4 className="mb-1">
                  {employerData.schoolName || "Sample School"}
                </h4>
                <div className="mb-3">
                  <span className="badge bg-primary me-2">
                    {employerData.board || "CBSE"}
                  </span>
                  <span className="badge bg-secondary">
                    {employerData.institutionType || "School"}
                  </span>
                </div>

                {/* Profile Details */}
                <div className="text-start mt-4">
                  
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
                      <i className="ti ti-phone me-2 text-muted"></i>
                      <small className="text-muted">Phone</small>
                    </div>
                    <small className="fw-medium">
                      {employerData.userMobile || "Not provided"}
                    </small>
                  </div>

                  <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
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
                    className="btn btn-danger"
                    onClick={handleChangePassword}
                  >
                    <i className="ti ti-lock me-2"></i>Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Dashboard Content */}
          <div className="col-lg-8">
            {/* Welcome Card - Your Original Layout */}

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
                      <h6>Active Jobs: {dashboardData.activeJobs}</h6>
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
                            <i className="ti ti-user-plus me-1"></i>Total
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
                            <i className="ti ti-user-check me-1"></i>Selected
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
                            <i className="ti ti-user-x me-1"></i>Not Selected
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
                            <i className="ti ti-clock me-1"></i>Awaiting
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
              <div className="col-xl-3 col-sm-6 d-flex mb-3">
                <div
                  className="card flex-fill clickable-card"
                  onClick={() => navigate("/employer/post-jobs")}
                >
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="avatar avatar-md bg-primary mb-3">
                        <i className="ti ti-briefcase fs-16"></i>
                      </span>
                      <span className="badge bg-success fw-normal mb-3">
                        {dashboardData.activeJobs > 0 ? "+" : ""}
                        {dashboardData.activeJobs}
                      </span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h2 className="mb-1 stat-number">
                          {dashboardData.totalJobs}
                        </h2>
                        <p className="fs-13">Total Jobs Posted</p>
                      </div>
                      <i className="ti ti-arrow-up-right fs-16 text-muted"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6 d-flex mb-3">
                <div
                  className="card flex-fill clickable-card"
                  onClick={() => navigate("/employer/post-jobs")}
                >
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="avatar avatar-md bg-success mb-3">
                        <i className="ti ti-user-search fs-16"></i>
                      </span>
                      <span className="badge bg-info fw-normal mb-3">
                        Active
                      </span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h2 className="mb-1 stat-number">
                          {dashboardData.activeJobs}
                        </h2>
                        <p className="fs-13">Hiring Active Jobs</p>
                      </div>
                      <i className="ti ti-arrow-up-right fs-16 text-muted"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6 d-flex mb-3">
                <div
                  className="card flex-fill clickable-card"
                  onClick={() => navigate("/employer/post-jobs")}
                >
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="avatar avatar-md bg-warning mb-3">
                        <i className="ti ti-calendar-event fs-16"></i>
                      </span>
                      <span className="badge bg-warning fw-normal mb-3">
                        Scheduled
                      </span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h2 className="mb-1 stat-number">
                          {dashboardData.interviewScheduledCount}
                        </h2>
                        <p className="fs-13">Upcoming Interviews</p>
                      </div>
                      <i className="ti ti-arrow-up-right fs-16 text-muted"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6 d-flex mb-3">
                <div
                  className="card flex-fill clickable-card"
                  onClick={() => navigate("/employer/plans-grid")}
                >
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="avatar avatar-md bg-info mb-3">
                        <i className="ti ti-crown fs-16"></i>
                      </span>
                      <span className="badge bg-info fw-normal mb-3">
                        Premium
                      </span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h2 className="mb-1 stat-number">30</h2>
                        <p className="fs-13">Plan Validity (Days)</p>
                      </div>
                      <i className="ti ti-arrow-up-right fs-16 text-muted"></i>
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
