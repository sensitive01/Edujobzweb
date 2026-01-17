import React, { useState, useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import {
  FaArrowLeft,
  FaPowerOff,
  FaShare,
  FaEdit,
  FaPlus,
  FaTrash,
  FaSearch,
  FaBriefcase,
  FaHeart,
  FaCog,
  FaClock,
  FaTimes,
  FaCalendarAlt,
  FaFileAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getEmployeeDetails } from "../../api/services/projectServices";
import axios from "axios";

const UserDashboard = () => {
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [employerData, setEmployerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    matchingJobs: 0,
    appliedJobs: 0,
    shortlistedJobs: 0,
    pendingJob: 0,
  });
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();

  // Check if the current viewport is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Fetch employer data and stats
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const userData = JSON.parse(localStorage.getItem("userData"));

        if (!token || !userData) {
          navigate("/login");
          return;
        }

        // Fetch employer data
        const data = await getEmployeeDetails(userData._id, token);
        console.log("userData", data);
        setEmployerData(data);

        let appliedCount = 0;
        let shortlistedCount = 0;
        let matchingCount = 0;
        let rejectedCount = 0;
        let pendingJob = 0;

        try {
          const appliedResponse = await axios.get(
            `${VITE_BASE_URL}/applicant/${userData._id}`,
          );
          appliedCount = appliedResponse.data?.length || 0;
        } catch (appliedError) {
          console.log(
            "No applied jobs found or error fetching applied jobs:",
            appliedError,
          );
        }

        try {
          const shortlistedResponse = await axios.get(
            `${VITE_BASE_URL}/fetchshorlitstedjobsemployee/${userData._id}`,
          );
          shortlistedCount = shortlistedResponse.data?.length || 0;
        } catch (shortlistedError) {
          console.log(
            "No shortlisted jobs found or error fetching shortlisted jobs:",
            shortlistedError,
          );
        }
        try {
          const pendingResponse = await axios.get(
            `${VITE_BASE_URL}/pendingJobs/${userData._id}`,
          );
          pendingJob = pendingResponse.data?.length || 0;
        } catch (err) {
          console.log(
            "No pending jobs found or error fetching pending jobs:",
            err,
          );
        }
        try {
          const rejectedResponse = await axios.get(
            `${VITE_BASE_URL}/getrejectedjob/${userData._id}`,
          );
          rejectedCount = rejectedResponse.data?.length || 0;
        } catch (rejectedCounterr) {
          console.log(
            "No rejected jobs found or error fetching rejected jobs:",
            rejectedCounterr,
          );
        }

        try {
          const allJobsResponse = await axios.get(
            `${VITE_BASE_URL}/employer/fetchjobs`,
          );
          matchingCount =
            allJobsResponse.data?.filter((job) => job.isActive)?.length || 0;
        } catch (jobsError) {
          console.log("Error fetching jobs:", jobsError);
        }

        setIsNewUser(appliedCount === 0 && shortlistedCount === 0);

        setStats({
          matchingJobs: matchingCount,
          appliedJobs: appliedCount,
          shortlistedJobs: shortlistedCount,
          pendingJob: pendingJob,
          rejectedJob: rejectedCount,
        });
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleResumeBuilder = () => {
    navigate("/resume-builder");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const calculateProfileCompletion = (data) => {
    if (!data) return 0;

    const fieldsToCheck = [
      "firstName",
      "lastName",
      "userProfilePic",
      "userMobile",
      "userEmail",
      "institutionName",
      "institutionType",
      "board",
      "website",
      "address",
      "city",
      "state",
      "pincode",
    ];

    let completedFields = 0;

    fieldsToCheck.forEach((field) => {
      if (data[field] && data[field].toString().trim() !== "") {
        completedFields++;
      }
    });

    return Math.round((completedFields / fieldsToCheck.length) * 100);
  };

  const WelcomeMessage = () => (
    <div
      className="jobplugin__dashboard-block"
      style={{ marginBottom: "40px" }}
    >
      <div
        className="alert alert-info border border-dark shadow"
        style={{
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "20px",
          borderWidth: "2px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h4 className="text-primary mb-3">
          <FaHeart className="me-2" />
          Welcome to EdProfio, {employerData?.userName}!
        </h4>
        <p className="mb-3">
          Nice progress! Your profile is{" "}
          {calculateProfileCompletion(employerData)}% complete. Finalize your
          information to improve recruiter reach and discover the best job
          matches:
        </p>
        <div className="row align-items-stretch">
          <div className="col-md-4 mb-3 d-flex">
            <div
              className="card border-primary w-100 d-flex flex-column"
              style={{ borderWidth: "2px" }}
            >
              <div className="card-body text-center d-flex flex-column">
                <FaEdit className="text-primary mb-2" size={30} />
                <h6>Complete Your Profile</h6>
                <div className="mb-2">
                  <h4 className="text-primary fw-bold">
                    {calculateProfileCompletion(employerData)}%
                  </h4>
                  <small className="text-muted">Completed</small>
                </div>
                <p className="small flex-grow-1">
                  Update your details to improve matching accuracy and hiring
                  potential
                </p>
                <div className="mt-auto">
                  <Link
                    to={`/employee/edit/${employerData?._id}`}
                    className="btn btn-primary btn-sm w-100"
                  >
                    Update Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3 d-flex">
            <div
              className="card border-success w-100 d-flex flex-column"
              style={{ borderWidth: "2px" }}
            >
              <div className="card-body text-center d-flex flex-column">
                <FaSearch className="text-success mb-2" size={30} />
                <h6>Browse Jobs</h6>
                <div className="mb-2">
                  <h4 className="text-success fw-bold">{stats.matchingJobs}</h4>
                  <small className="text-muted">Opportunities Waiting</small>
                </div>
                <p className="small flex-grow-1">
                  Discover roles and take the next step in your career.
                </p>
                <div className="mt-auto">
                  <Link
                    to="/job-vacancies"
                    className="btn btn-success btn-sm w-100"
                  >
                    View Jobs
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3 d-flex">
            <div
              className="card border-warning w-100 d-flex flex-column"
              style={{ borderWidth: "2px" }}
            >
              <div className="card-body text-center d-flex flex-column">
                <FaCalendarAlt className="text-warning mb-2" size={30} />
                <h6>Browse Events</h6>
                <div className="mb-2">
                  <h4 className="text-warning fw-bold">
                    {stats.upcomingEvents || 0}
                  </h4>
                  <small className="text-muted">Events Available</small>
                </div>
                <p className="small flex-grow-1">
                  New events will appear here once scheduled
                </p>
                <div className="mt-auto">
                  <Link to="/events" className="btn btn-warning btn-sm w-100">
                    View Events
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading your dashboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4">
        <h5>Oops! Something went wrong</h5>
        <p>{error}</p>
        <button
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!employerData) {
    return (
      <div className="alert alert-warning m-4">
        <h5>Profile Not Found</h5>
        <p>We couldn't find your profile data. Please try logging in again.</p>
        <button
          className="btn btn-primary me-2"
          onClick={() => navigate("/login")}
        >
          Login Again
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 text-white"></div>

      <main className="jobplugin__main">
        {/* Mobile Menu Button - Better Styled */}
        {isMobile && !sidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="mobile-menu-btn"
            aria-label="Open Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}

        {/* Overlay for mobile when sidebar is open */}
        {isMobile && sidebarOpen && (
          <div onClick={closeSidebar} className="sidebar-overlay" />
        )}

        <div className="jobplugin__main-holder">
          <div className="jobplugin__container">
            <div className="jobplugin__settings">
              {/* Settings Nav Opener - Desktop Only */}
              {!isMobile && (
                <a
                  href="#"
                  className="jobplugin__settings-opener jobplugin__text-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSidebar();
                  }}
                >
                  <FaCog className="rj-icon rj-settings" />
                </a>
              )}

              <Sidebar
                isOpen={sidebarOpen}
                onClose={closeSidebar}
                isMobile={isMobile}
              />

              <div className="jobplugin__settings-content">
                <div className="jobplugin__dashboard">
                  {/* Profile Block */}
                  <div className="jobplugin__profile">
                    <div
                      className="jobplugin__profile-intro border border-dark shadow"
                      style={{ borderWidth: "2px" }}
                    >
                      <div className="jobplugin__profile-intro__left">
                        <div
                          className="jobplugin__profile-intro__image"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            width: "150px",
                            height: "150px",
                            margin: "0 auto",
                          }}
                        >
                          {/* Profile Avatar */}
                          <div
                            className="jobplugin__profile-intro__avatar"
                            style={{
                              width: "140px",
                              height: "140px",
                              borderRadius: "50%",
                              border: "4px solid #ffc107",
                              overflow: "hidden",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: "#f8f9fa",
                            }}
                          >
                            <img
                              src={
                                employerData.userProfilePic ||
                                "images/img-profile.jpg"
                              }
                              alt={`${employerData.firstName} ${employerData.lastName}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>

                          {/* Edit Icon Button */}
                          <Link
                            to={`/employee/edit/${employerData._id}`}
                            style={{
                              position: "absolute",
                              bottom: "5px",
                              right: "5px",
                              width: "35px",
                              height: "35px",
                              backgroundColor: "white",
                              borderRadius: "50%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              border: "2px solid #007bff",
                              color: "#007bff",
                              textDecoration: "none",
                              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                              zIndex: 2,
                              transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "#007bff";
                              e.currentTarget.style.color = "white";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "white";
                              e.currentTarget.style.color = "#007bff";
                            }}
                          >
                            <FaEdit size={16} />
                          </Link>
                        </div>

                        <div
                          className="jobplugin__profile-intro__Textbox"
                          style={{ marginLeft: "30px" }}
                        >
                          <div className="jobplugin__profile-intro__info mb-0">
                            <h1 className="h5">
                              {employerData.userName} {employerData.lastName}
                            </h1>
                            <span className="jobplugin__article-toprated">
                              {isNewUser ? "New Member" : "Verified Employee"}
                            </span>
                          </div>
                          <address className="jobplugin__profile-intro__address">
                            {employerData.city || "Location not specified"}
                          </address>
                        </div>
                      </div>

                      {/* Buttons for Resume Builder and Logout */}
                      <div
                        className="jobplugin__profile-buttons"
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <button
                          onClick={handleResumeBuilder}
                          className="jobplugin__button border-dark shadow bg-success hover:jobplugin__bg-success-dark small"
                        >
                          <FaFileAlt /> &nbsp; Resume Builder
                        </button>
                        <button
                          onClick={handleLogout}
                          className="jobplugin__button border-dark shadow bg-primary hover:jobplugin__bg-secondary small"
                        >
                          <FaPowerOff /> &nbsp; Logout
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Welcome message */}
                  <WelcomeMessage />

                  {/* Stats Dashboard */}
                  <div
                    className="jobplugin__dashboard-block"
                    style={{ marginTop: "30px", paddingTop: "20px" }}
                  >
                    <div className="container-fluid">
                      <div className="row g-4 m-6">
                        {/* Applied Jobs Card */}
                        <div className="col-lg-3 col-md-6">
                          <div
                            className="card bg-white border-2 h-100 shadow-sm"
                            style={{
                              borderRadius: "16px",
                              borderColor: "grey",
                              transition: "all 0.3s ease",
                              cursor: "pointer",
                              position: "relative",
                              zIndex: 10,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform =
                                "translateY(-4px)";
                              e.currentTarget.style.boxShadow =
                                "0 8px 25px rgba(0,0,0,0.12)";
                              e.currentTarget.style.zIndex = "20";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "translateY(0)";
                              e.currentTarget.style.boxShadow =
                                "0 2px 8px rgba(0,0,0,0.06)";
                              e.currentTarget.style.zIndex = "10";
                            }}
                          >
                            <div className="card-body p-4 text-center">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6
                                  className="text-muted fw-semibold mb-0"
                                  style={{ fontSize: "13px" }}
                                >
                                  Applied Jobs
                                </h6>
                                <div
                                  className="bg-light rounded-circle d-flex align-items-center justify-content-center"
                                  style={{ width: "26px", height: "26px" }}
                                >
                                  <FaBriefcase
                                    className="text-info"
                                    style={{ fontSize: "16px" }}
                                  />
                                </div>
                              </div>
                              <div className="mb-3">
                                <h1
                                  className="text-info fw-bold mb-1"
                                  style={{
                                    fontSize: "2.8rem",
                                    lineHeight: "1",
                                  }}
                                >
                                  {stats.appliedJobs}
                                </h1>
                                <p
                                  className="text-muted mb-0"
                                  style={{ fontSize: "12px" }}
                                >
                                  Total applied
                                </p>
                              </div>
                              <Link
                                to="/applied-jobs"
                                className="btn btn-info fw-semibold px-4 py-2"
                                style={{
                                  borderRadius: "12px",
                                  fontSize: "13px",
                                  minHeight: "38px",
                                }}
                              >
                                View Applied
                              </Link>
                            </div>
                          </div>
                        </div>

                        {/* Shortlisted Jobs Card */}
                        <div className="col-lg-3 col-md-6">
                          <div
                            className="card bg-white border-2 h-100 shadow-sm"
                            style={{
                              borderRadius: "16px",
                              borderColor: "grey",
                              transition: "all 0.3s ease",
                              cursor: "pointer",
                              position: "relative",
                              zIndex: 10,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform =
                                "translateY(-4px)";
                              e.currentTarget.style.boxShadow =
                                "0 8px 25px rgba(0,0,0,0.12)";
                              e.currentTarget.style.zIndex = "20";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "translateY(0)";
                              e.currentTarget.style.boxShadow =
                                "0 2px 8px rgba(0,0,0,0.06)";
                              e.currentTarget.style.zIndex = "10";
                            }}
                          >
                            <div className="card-body p-4 text-center">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6
                                  className="text-muted fw-semibold mb-0"
                                  style={{ fontSize: "13px" }}
                                >
                                  Shortlisted
                                </h6>
                                <div
                                  className="bg-light rounded-circle d-flex align-items-center justify-content-center"
                                  style={{ width: "26px", height: "26px" }}
                                >
                                  <FaHeart
                                    className="text-danger"
                                    style={{ fontSize: "16px" }}
                                  />
                                </div>
                              </div>
                              <div className="mb-3">
                                <h1
                                  className="text-danger fw-bold mb-1"
                                  style={{
                                    fontSize: "2.8rem",
                                    lineHeight: "1",
                                  }}
                                >
                                  {stats.shortlistedJobs}
                                </h1>
                                <p
                                  className="text-muted mb-0"
                                  style={{ fontSize: "12px" }}
                                >
                                  Saved jobs
                                </p>
                              </div>
                              <Link
                                to="/shortlisted"
                                className="btn btn-danger fw-semibold px-4 py-2"
                                style={{
                                  borderRadius: "12px",
                                  fontSize: "13px",
                                  minHeight: "38px",
                                }}
                              >
                                View Shotlisted
                              </Link>
                            </div>
                          </div>
                        </div>

                        {/* Pending Jobs Card */}
                        <div className="col-lg-3 col-md-6">
                          <div
                            className="card bg-white border-2 h-100 shadow-sm"
                            style={{
                              borderRadius: "16px",
                              borderColor: "grey",
                              transition: "all 0.3s ease",
                              cursor: "pointer",
                              position: "relative",
                              zIndex: 10,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform =
                                "translateY(-4px)";
                              e.currentTarget.style.boxShadow =
                                "0 8px 25px rgba(0,0,0,0.12)";
                              e.currentTarget.style.zIndex = "20";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "translateY(0)";
                              e.currentTarget.style.boxShadow =
                                "0 2px 8px rgba(0,0,0,0.06)";
                              e.currentTarget.style.zIndex = "10";
                            }}
                          >
                            <div className="card-body p-4 text-center">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6
                                  className="text-muted fw-semibold mb-0"
                                  style={{ fontSize: "13px" }}
                                >
                                  Pending
                                </h6>
                                <div
                                  className="bg-light rounded-circle d-flex align-items-center justify-content-center"
                                  style={{ width: "26px", height: "26px" }}
                                >
                                  <FaClock
                                    className="text-warning"
                                    style={{ fontSize: "16px" }}
                                  />
                                </div>
                              </div>
                              <div className="mb-3">
                                <h1
                                  className="text-warning fw-bold mb-1"
                                  style={{
                                    fontSize: "2.8rem",
                                    lineHeight: "1",
                                  }}
                                >
                                  {stats.pendingJob || 0}
                                </h1>
                                <p
                                  className="text-muted mb-0"
                                  style={{ fontSize: "12px" }}
                                >
                                  Under review
                                </p>
                              </div>
                              <Link
                                to="/pending-applications"
                                className="btn btn-warning fw-semibold px-4 py-2"
                                style={{
                                  borderRadius: "12px",
                                  fontSize: "13px",
                                  minHeight: "38px",
                                }}
                              >
                                View Pending
                              </Link>
                            </div>
                          </div>
                        </div>

                        {/* Rejected Jobs Card */}
                        <div className="col-lg-3 col-md-6">
                          <div
                            className="card bg-white border-2 h-100 shadow-sm"
                            style={{
                              borderRadius: "16px",
                              borderColor: "grey",
                              transition: "all 0.3s ease",
                              cursor: "pointer",
                              position: "relative",
                              zIndex: 10,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform =
                                "translateY(-4px)";
                              e.currentTarget.style.boxShadow =
                                "0 8px 25px rgba(0,0,0,0.12)";
                              e.currentTarget.style.zIndex = "20";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "translateY(0)";
                              e.currentTarget.style.boxShadow =
                                "0 2px 8px rgba(0,0,0,0.06)";
                              e.currentTarget.style.zIndex = "10";
                            }}
                          >
                            <div className="card-body p-4 text-center">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6
                                  className="text-muted fw-semibold mb-0"
                                  style={{ fontSize: "13px" }}
                                >
                                  Rejected
                                </h6>
                                <div
                                  className="bg-light rounded-circle d-flex align-items-center justify-content-center"
                                  style={{ width: "26px", height: "26px" }}
                                >
                                  <FaTimes
                                    className="text-secondary"
                                    style={{ fontSize: "16px" }}
                                  />
                                </div>
                              </div>
                              <div className="mb-3">
                                <h1
                                  className="text-secondary fw-bold mb-1"
                                  style={{
                                    fontSize: "2.8rem",
                                    lineHeight: "1",
                                  }}
                                >
                                  {stats.rejectedJob || 0}
                                </h1>
                                <p
                                  className="text-muted mb-0"
                                  style={{ fontSize: "12px" }}
                                >
                                  Not selected
                                </p>
                              </div>
                              <Link
                                to="/rejected-applications"
                                className="btn btn-secondary fw-semibold px-4 py-2"
                                style={{
                                  borderRadius: "12px",
                                  fontSize: "13px",
                                  minHeight: "38px",
                                }}
                              >
                                View Rejected
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {isNewUser && (
                    <div className="jobplugin__dashboard-block">
                      <div
                        className="card border-info"
                        style={{ borderWidth: "2px" }}
                      >
                        <div className="card-header bg-info text-white">
                          <h5 className="mb-0">💡 Quick Tips to Get Started</h5>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-6">
                              <ul className="list-unstyled">
                                <li className="mb-2">
                                  ✅ Complete your profile to attract employers
                                </li>
                                <li className="mb-2">
                                  🔍 Use filters to find relevant job
                                  opportunities
                                </li>
                                <li className="mb-2">
                                  💾 Shortlist jobs you're interested in
                                </li>
                              </ul>
                            </div>
                            <div className="col-md-6">
                              <ul className="list-unstyled">
                                <li className="mb-2">
                                  📝 Customize your applications for each job
                                </li>
                                <li className="mb-2">
                                  🔔 Set up job alerts for new opportunities
                                </li>
                                <li className="mb-2">
                                  📊 Track your application status here
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        /* Mobile Menu Button - Custom Styled */
        .mobile-menu-btn {
          position: fixed;
          top: 75px;
          left: 15px;
          z-index: 1100;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          padding: 12px;
          box-shadow: 0 4px 15px rgba(30, 58, 138, 0.4);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mobile-menu-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(30, 58, 138, 0.5);
          background: linear-gradient(135deg, #1e40af 0%, #60a5fa 100%);
        }

        .mobile-menu-btn:active {
          transform: translateY(0);
        }

        .mobile-menu-btn span {
          width: 26px;
          height: 3px;
          background-color: white;
          border-radius: 3px;
          transition: all 0.3s ease;
        }

        .mobile-menu-btn:hover span {
          width: 30px;
        }

        .mobile-menu-btn span:nth-child(1) {
          width: 26px;
        }

        .mobile-menu-btn span:nth-child(2) {
          width: 22px;
        }

        .mobile-menu-btn span:nth-child(3) {
          width: 18px;
        }

        /* Sidebar Overlay */
        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6);
          z-index: 998;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Mobile responsive styles */
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: flex;
          }

          .jobplugin__settings-opener {
            display: none !important;
          }

          .jobplugin__profile-intro {
            flex-direction: column;
            text-align: center;
            padding: 20px 15px;
          }

          .jobplugin__profile-intro__left {
            flex-direction: column;
            align-items: center;
            width: 100%;
            margin-bottom: 15px;
          }

          .jobplugin__profile-intro__Textbox {
            margin-top: 15px;
            margin-left: 0 !important;
          }

          .jobplugin__profile-buttons {
            justify-content: center;
            width: 100%;
            margin-top: 15px;
          }

          .jobplugin__profile-buttons button {
            font-size: 12px;
            padding: 8px 12px;
          }

          .jobplugin__dashboard-block .row.g-4 {
            margin: 0;
          }

          .jobplugin__dashboard-block .col-lg-3 {
            padding: 0 10px;
            margin-bottom: 15px;
          }

          .card-body {
            padding: 1rem !important;
          }

          .card-body h1 {
            font-size: 2rem !important;
          }

          /* Welcome message cards */
          .alert-info .row .col-md-4 {
            margin-bottom: 15px;
          }

          .alert-info .card {
            margin-bottom: 10px;
          }
        }

        @media (min-width: 769px) {
          .mobile-menu-btn {
            display: none;
          }
        }

        /* Ensure smooth transitions */
        * {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </>
  );
};

export default UserDashboard;
