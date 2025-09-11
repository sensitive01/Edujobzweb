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
        console.log("userData", data);
        setEmployerData(data);

        let appliedCount = 0;
        let shortlistedCount = 0;
        let matchingCount = 0;

        try {
          // Fetch applied jobs with better error handling
          const appliedResponse = await axios.get(
            `https://api.edprofio.com/applicant/${userData._id}`
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
            `https://api.edprofio.com/fetchshorlitstedjobsemployee/${userData._id}`
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
            "https://api.edprofio.com/employer/fetchjobs"
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

  // Welcome Component for All Users
  const WelcomeMessage = () => (
    <div className="jobplugin__dashboard-block">
      <div
        className="alert alert-info border border-dark shadow"
        style={{
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "20px",
          borderWidth: "2px",
        }}
      >
        <h4 className="text-primary mb-3">
          <FaHeart className="me-2" />
          Welcome to EdProfio, {employerData?.userName}!
        </h4>
        <p className="mb-3">
          Great to have you on board! Your profile is{" "}
          {calculateProfileCompletion(employerData)}% complete. Here's how you
          can get started:
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
                <p className="small flex-grow-1">
                  Add more details to attract employers
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
                <p className="small flex-grow-1">
                  Explore {stats.matchingJobs} available opportunities
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
                <FaBriefcase className="text-warning mb-2" size={30} />
                <h6>Apply for Jobs</h6>
                <p className="small flex-grow-1">
                  Start applying to positions that match your skills
                </p>
                <div className="mt-auto">
                  <Link
                    to="/job-vacancies"
                    className="btn btn-warning btn-sm w-100"
                  >
                    Start Applying
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
                  <div
                    className="jobplugin__profile-intro border border-dark shadow"
                    style={{ borderWidth: "2px" }}
                  >
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
                    <button
                      onClick={handleLogout}
                      className="jobplugin__button border-dark shadow bg-primary hover:jobplugin__bg-secondary small"
                    >
                      <FaPowerOff /> &nbsp; Logout
                    </button>
                  </div>
                </div>

                {/* Show welcome message for all users */}
                <WelcomeMessage />

                {/* Stats Dashboard Block */}
                <div className="jobplugin__dashboard-block ">
                  <div className="container-fluid">
                    <div className="row g-4 m-6">
                      <div className="col-lg-3 col-md-6 ">
                        <div
                          className="card bg-white border-2 h-100 shadow-sm"
                          style={{
                            borderRadius: "16px",
                            borderColor: "grey",
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                            
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                              "translateY(-4px)";
                            e.currentTarget.style.boxShadow =
                              "0 8px 25px rgba(0,0,0,0.12)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                              "0 2px 8px rgba(0,0,0,0.06)";
                          }}
                        >
                          <div className="card-body p-4 text-center">
                            <div className="d-flex justify-content-between align-items-center mb-3" >
                              <h6
                                className="text-muted fw-semibold mb-0"
                                style={{ fontSize: "13px", }}
                              >
                                Profile Score
                              </h6>
                              <div
                                className="bg-light rounded-circle d-flex align-items-center justify-content-center"
                                style={{ width: "26px", height: "26px" }}
                              >
                                <i
                                  className="text-primary"
                                  style={{ fontSize: "20px" }}
                                >
                                  i
                                </i>
                              </div>
                            </div>
                            <div className="mb-3">
                              <h1
                                className="text-primary fw-bold mb-1"
                                style={{ fontSize: "2.8rem", lineHeight: "1" }}
                              >
                                {calculateProfileCompletion(employerData)}%
                              </h1>
                              <p
                                className="text-muted mb-0"
                                style={{ fontSize: "12px" }}
                              >
                                Based on input data
                              </p>
                            </div>
                            <Link
                              to={`/employee/edit/${employerData._id}`}
                              className="btn btn-primary fw-semibold px-4 py-2"
                              style={{
                                borderRadius: "12px",
                                fontSize: "13px",
                                minHeight: "38px",
                              }}
                            >
                              Complete Profile
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-6 ">
                        <div
                          className="card bg-white border-2 h-100 shadow-sm "
                          style={{
                            borderRadius: "16px",
                            borderColor: "grey",
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                              "translateY(-4px)";
                            e.currentTarget.style.boxShadow =
                              "0 8px 25px rgba(0,0,0,0.12)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                              "0 2px 8px rgba(0,0,0,0.06)";
                          }}
                        >
                          <div className="card-body p-4 text-center ">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <h6
                                className="text-muted fw-semibold mb-0"
                                style={{ fontSize: "13px" }}
                              >
                                Matching Jobs
                              </h6>
                              <div
                                className="bg-light rounded-circle d-flex align-items-center justify-content-center"
                                style={{ width: "26px", height: "26px" }}
                              >
                                <i
                                  className="text-primary"
                                  style={{ fontSize: "20px" }}
                                >
                                  i
                                </i>
                              </div>
                            </div>
                            <div className="mb-3">
                              <h1
                                className="text-warning fw-bold mb-1"
                                style={{ fontSize: "2.8rem", lineHeight: "1" }}
                              >
                                {stats.matchingJobs}
                              </h1>
                              <p
                                className="text-muted mb-0"
                                style={{ fontSize: "12px" }}
                              >
                                Currently active
                              </p>
                            </div>
                            <Link
                              to="/job-vacancies"
                              className="btn btn-success fw-semibold px-4 py-2"
                              style={{
                                borderRadius: "12px",
                                fontSize: "13px",
                                minHeight: "38px",
                              }}
                            >
                              Browse Jobs
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-6">
                        <div
                          className="card bg-white border-2 h-100 shadow-sm"
                          style={{
                            borderRadius: "16px",
                            borderColor: "grey",
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                              "translateY(-4px)";
                            e.currentTarget.style.boxShadow =
                              "0 8px 25px rgba(0,0,0,0.12)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                              "0 2px 8px rgba(0,0,0,0.06)";
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
                                <i
                                  className="text-primary"
                                  style={{ fontSize: "20px" }}
                                >
                                  i
                                </i>
                              </div>
                            </div>
                            <div className="mb-3">
                              <h1
                                className="text-info fw-bold mb-1"
                                style={{ fontSize: "2.8rem", lineHeight: "1" }}
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

                      <div className="col-lg-3 col-md-6">
                        <div
                          className="card bg-white border-2 h-100 shadow-sm"
                          style={{
                            borderRadius: "16px",
                            borderColor: "grey",
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                              "translateY(-4px)";
                            e.currentTarget.style.boxShadow =
                              "0 8px 25px rgba(0,0,0,0.12)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                              "0 2px 8px rgba(0,0,0,0.06)";
                          }}
                        >
                          <div className="card-body p-4 text-center">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <h6
                                className="text-muted fw-semibold mb-0"
                                style={{ fontSize: "13px" }}
                              >
                                Shortlisted Jobs
                              </h6>
                              <div
                                className="bg-light rounded-circle d-flex align-items-center justify-content-center"
                                style={{ width: "26px", height: "26px" }}
                              >
                                <i
                                  className="text-primary"
                                  style={{ fontSize: "20px" }}
                                >
                                  i
                                </i>
                              </div>
                            </div>
                            <div className="mb-3">
                              <h1
                                className="text-danger fw-bold mb-1"
                                style={{ fontSize: "2.8rem", lineHeight: "1" }}
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
                              View Saved
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Tips for New Users */}
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
      </main>
    </>
  );
};

export default UserDashboard;
