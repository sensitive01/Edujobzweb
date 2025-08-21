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
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getEmployeeDetails } from "../../api/services/projectServices";
import axios from "axios";

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [employerData, setEmployerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    matchingJobs: 0,
    appliedJobs: 0,
    shortlistedJobs: 0,
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
        setEmployerData(data);

        let appliedCount = 0;
        let shortlistedCount = 0;
        let matchingCount = 0;

        try {
          // Fetch applied jobs with better error handling
          const appliedResponse = await axios.get(
            `https://edujobzbackend.onrender.com/applicant/${userData._id}`
          );
          appliedCount = appliedResponse.data?.length || 0;
        } catch (appliedError) {
          console.log(
            "No applied jobs found or error fetching applied jobs:",
            appliedError
          );
          // Don't set error state for this, just keep count as 0
        }

        try {
          // Fetch shortlisted jobs with better error handling
          const shortlistedResponse = await axios.get(
            `https://edujobzbackend.onrender.com/fetchshorlitstedjobsemployee/${userData._id}`
          );
          shortlistedCount = shortlistedResponse.data?.length || 0;
        } catch (shortlistedError) {
          console.log(
            "No shortlisted jobs found or error fetching shortlisted jobs:",
            shortlistedError
          );
          // Don't set error state for this, just keep count as 0
        }

        try {
          // Fetch all jobs (for matching jobs count)
          const allJobsResponse = await axios.get(
            "https://edujobzbackend.onrender.com/employer/fetchjobs"
          );
          matchingCount =
            allJobsResponse.data?.filter((job) => job.isActive)?.length || 0;
        } catch (jobsError) {
          console.log("Error fetching jobs:", jobsError);
          // Keep matchingCount as 0
        }

        // Determine if user is new (no applied jobs and no shortlisted jobs)
        setIsNewUser(appliedCount === 0 && shortlistedCount === 0);

        setStats({
          matchingJobs: matchingCount,
          appliedJobs: appliedCount,
          shortlistedJobs: shortlistedCount,
        });
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

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

    const percentage = Math.round(
      (completedFields / fieldsToCheck.length) * 100
    );
    return percentage;
  };

  // New User Welcome Component
  const NewUserWelcome = () => (
    <div className="jobplugin__dashboard-block">
      <div
        className="alert alert-info border border-primary"
        style={{ borderRadius: "10px", padding: "20px", marginBottom: "20px" }}
      >
        <h4 className="text-primary mb-3">
          <FaHeart className="me-2" />
          Welcome to EduJobz, {employerData?.firstName}!
        </h4>
        <p className="mb-3">
          Great to have you on board! Your profile is{" "}
          {calculateProfileCompletion(employerData)}% complete. Here's how you
          can get started:
        </p>
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="card border-primary">
              <div className="card-body text-center">
                <FaEdit className="text-primary mb-2" size={30} />
                <h6>Complete Your Profile</h6>
                <p className="small">Add more details to attract employers</p>
                <Link
                  to={`/employee/edit/${employerData?._id}`}
                  className="btn btn-primary btn-sm"
                >
                  Update Profile
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card border-success">
              <div className="card-body text-center">
                <FaSearch className="text-success mb-2" size={30} />
                <h6>Browse Jobs</h6>
                <p className="small">
                  Explore {stats.matchingJobs} available opportunities
                </p>
                <Link to="/jobs" className="btn btn-success btn-sm">
                  View Jobs
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card border-warning">
              <div className="card-body text-center">
                <FaBriefcase className="text-warning mb-2" size={30} />
                <h6>Apply for Jobs</h6>
                <p className="small">
                  Start applying to positions that match your skills
                </p>
                <Link to="/jobs" className="btn btn-warning btn-sm">
                  Start Applying
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Empty State Component for Stats
  const EmptyStateMessage = ({ type, count }) => {
    const messages = {
      appliedJobs: {
        title: "No Applied Jobs Yet",
        message:
          "Start browsing and applying to positions that match your skills!",
        actionText: "Browse Jobs",
        actionLink: "/jobs",
      },
      shortlistedJobs: {
        title: "No Shortlisted Jobs",
        message:
          "Save interesting positions for later by clicking the heart icon!",
        actionText: "Find Jobs to Shortlist",
        actionLink: "/jobs",
      },
      matchingJobs: {
        title: "No Matching Jobs Found",
        message: "Complete your profile to get better matches!",
        actionText: "Complete Profile",
        actionLink: `/employee/edit/${employerData?._id}`,
      },
    };

    if (count > 0) return null;

    const config = messages[type];
    if (!config) return null;

    return (
      <div className="mt-auto">
        <small
          className="text-muted d-block mb-2"
          style={{ fontSize: "0.75rem", lineHeight: "1.2" }}
        >
          {config.message}
        </small>
        <Link
          to={config.actionLink}
          className="btn btn-outline-primary btn-sm w-100"
          style={{ fontSize: "0.75rem" }}
        >
          {config.actionText}
        </Link>
      </div>
    );
  };

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
      <div className="subvisual-block subvisual-theme-1 bg-white d-flex pt-60 pt-md-90 text-white"></div>
      <main className="jobplugin__main">
        <div className="jobplugin__main-holder">
          <div className="jobplugin__container">
            <div className="jobplugin__settings">
              {isMobile && (
                <a
                  href="#"
                  className="jobplugin__settings-opener jobplugin__text-primary hover:bg-secondary hover:jobplugin__text-white bg-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    setSidebarOpen(!sidebarOpen);
                  }}
                >
                  <span className="fa fa-bars"></span>
                </a>
              )}

              <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
              />

              <div className="jobplugin__dashboard">
                {/* Profile Block */}
                <div className="jobplugin__profile">
                  <div className="jobplugin__profile-intro border border-dark shadow">
                    <div className="jobplugin__profile-intro__left">
                      <div className="jobplugin__profile-intro__image border-primary">
                        <div className="jobplugin__profile-intro__avatar">
                          <img
                            src={
                              employerData.userProfilePic ||
                              "images/img-profile.jpg"
                            }
                            alt={`${employerData.firstName} ${employerData.lastName}`}
                          />
                        </div>
                        <Link
                          to={`/employee/edit/${employerData._id}`}
                          className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                        >
                          <span className="rj-icon rj-edit-text"></span>
                        </Link>
                      </div>
                      <div className="jobplugin__profile-intro__Textbox">
                        <div className="jobplugin__profile-intro__info mb-0">
                          <h1 className="h5">
                            {employerData.firstName} {employerData.lastName}
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
                    <button
                      onClick={handleLogout}
                      className="jobplugin__button border-dark shadow bg-primary hover:jobplugin__bg-secondary small"
                    >
                      <FaPowerOff /> &nbsp; Logout
                    </button>
                  </div>
                </div>

                {/* Show welcome message for new users */}
                {isNewUser && <NewUserWelcome />}

                {/* Stats Dashboard Block */}
                <div className="jobplugin__dashboard-block">
                  <div className="container-fluid">
                    <div className="row g-4">
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div
                          className="jobplugin__dashboard-stats jobplugin__border-primary h-100 p-4"
                          style={{ minHeight: "200px" }}
                        >
                          <i className="jobplugin__dashboard-tooltip bg-light-sky">
                            <span className="jobplugin__text-primary rj-icon rj-info"></span>
                          </i>
                          <span className="jobplugin__dashboard-stats__subtitle d-block mb-3">
                            Profile Score
                          </span>
                          <strong
                            className="jobplugin__dashboard-stats__number text-primary d-block mb-2"
                            style={{ fontSize: "2.5rem" }}
                          >
                            {calculateProfileCompletion(employerData)}%
                          </strong>
                          <p className="text-muted small mb-3">
                            (Based on input data)
                          </p>
                          {calculateProfileCompletion(employerData) < 80 && (
                            <div className="mt-auto">
                              <Link
                                to={`/employee/edit/${employerData._id}`}
                                className="btn btn-outline-primary btn-sm w-100"
                              >
                                Complete Profile
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div
                          className="jobplugin__dashboard-stats h-100 p-4"
                          style={{
                            minHeight: "200px",
                            border: "1px solid #dee2e6",
                            borderRadius: "8px",
                          }}
                        >
                          <i className="jobplugin__dashboard-tooltip bg-light-sky">
                            <span className="jobplugin__text-primary rj-icon rj-info"></span>
                          </i>
                          <span className="jobplugin__dashboard-stats__subtitle d-block mb-3">
                            Matching Jobs
                          </span>
                          <strong
                            className="jobplugin__dashboard-stats__number text-primary d-block mb-2"
                            style={{ fontSize: "2.5rem" }}
                          >
                            {stats.matchingJobs}
                          </strong>
                          <p className="text-muted small mb-3">
                            (Currently active)
                          </p>
                          <EmptyStateMessage
                            type="matchingJobs"
                            count={stats.matchingJobs}
                          />
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div
                          className="jobplugin__dashboard-stats h-100 p-4"
                          style={{
                            minHeight: "200px",
                            border: "1px solid #dee2e6",
                            borderRadius: "8px",
                          }}
                        >
                          <i className="jobplugin__dashboard-tooltip bg-light-sky">
                            <span className="jobplugin__text-primary rj-icon rj-info"></span>
                          </i>
                          <span className="jobplugin__dashboard-stats__subtitle d-block mb-3">
                            Applied Jobs
                          </span>
                          <strong
                            className="jobplugin__dashboard-stats__number text-primary d-block mb-2"
                            style={{ fontSize: "2.5rem" }}
                          >
                            {stats.appliedJobs}
                          </strong>
                          <p className="text-muted small mb-3">
                            {stats.appliedJobs === 0
                              ? "(Get started!)"
                              : "(Total applied)"}
                          </p>
                          <EmptyStateMessage
                            type="appliedJobs"
                            count={stats.appliedJobs}
                          />
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div
                          className="jobplugin__dashboard-stats h-100 p-4"
                          style={{
                            minHeight: "200px",
                            border: "1px solid #dee2e6",
                            borderRadius: "8px",
                          }}
                        >
                          <i className="jobplugin__dashboard-tooltip bg-light-sky">
                            <span className="jobplugin__text-primary rj-icon rj-info"></span>
                          </i>
                          <span className="jobplugin__dashboard-stats__subtitle d-block mb-3">
                            Shortlisted Jobs
                          </span>
                          <strong
                            className="jobplugin__dashboard-stats__number text-primary d-block mb-2"
                            style={{ fontSize: "2.5rem" }}
                          >
                            {stats.shortlistedJobs}
                          </strong>
                          <p className="text-muted small mb-3">
                            {stats.shortlistedJobs === 0
                              ? "(Save favorites!)"
                              : "(Saved jobs)"}
                          </p>
                          <EmptyStateMessage
                            type="shortlistedJobs"
                            count={stats.shortlistedJobs}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Tips for New Users */}
                {isNewUser && (
                  <div className="jobplugin__dashboard-block">
                    <div className="card border-info">
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
      </main>
    </>
  );
};

export default UserDashboard;
