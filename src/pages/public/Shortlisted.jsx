import React, { useState, useEffect } from "react";
import { FaCog, FaChevronRight, FaBookmark, FaSearch } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { GiArchiveRegister } from "react-icons/gi";
import Sidebar from "../../components/layout/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";

import appleIcon from "../../assets/employer/assets/img/icons/apple.svg";

// Helper component for job logo
const JobLogo = ({ src, alt, title }) => {
  const [imgError, setImgError] = useState(false);

  // Array of professional colors
  const colors = [
    "#4e73df",
    "#1cc88a",
    "#36b9cc",
    "#f6c23e",
    "#e74a3b",
    "#6610f2",
    "#fd7e14",
    "#20c997",
    "#5a5c69",
    "#007bff",
  ];

  const getColor = (str) => {
    if (!str) return colors[0];
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const letter = title ? title.charAt(0).toUpperCase() : "J";

  if (!src || imgError) {
    return (
      <div
        style={{
          width: "78px",
          height: "78px",
          backgroundColor: getColor(title),
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "32px",
          fontWeight: "bold",
          borderRadius: "8px",
        }}
      >
        {letter}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width="78"
      height="78"
      onError={() => setImgError(true)}
      style={{
        borderRadius: "8px",
        objectFit: "contain",
        backgroundColor: "white",
      }}
    />
  );
};

const ShortlistedJobs = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [shortlistedJobs, setShortlistedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const fetchShortlistedJobs = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (!userData || !userData._id) {
          setShortlistedJobs([]);
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/fetchshorlitstedjobsemployee/${userData._id}`,
        );

        if (response.data) {
          setShortlistedJobs(response.data);
        } else {
          setShortlistedJobs([]);
        }
      } catch (err) {
        if (err.response?.data?.message === "No shortlisted jobs found") {
          setShortlistedJobs([]);
        } else {
          console.error("Error fetching shortlisted jobs:", err);
          setError(
            err.response?.data?.message ||
              err.message ||
              "Failed to fetch shortlisted jobs",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchShortlistedJobs();
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 text-white"></div>

      <main className="jobplugin__main">
        <div className="jobplugin__main-holder">
          <div className="jobplugin__container">
            <div className="jobplugin__settings">
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
              <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

              <div className="jobplugin__settings-content">
                <div className="jobplugin__settings-head">
                  <h2 className="h5">Shortlisted Jobs</h2>
                  <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                  <p className="jobplugin__settings-head__text">
                    Jobs where you've passed the first screening
                  </p>
                </div>

                {error ? (
                  <div className="alert alert-warning">{error}</div>
                ) : shortlistedJobs.length > 0 ? (
                  <>
                    <div className="row justify-content-center">
                      {shortlistedJobs.map((job) => {
                        // Find the application for the current user
                        const userApplication = job.applications.find(
                          (app) =>
                            app.applicantId ===
                            JSON.parse(localStorage.getItem("userData"))._id,
                        );

                        return (
                          <div
                            key={job._id}
                            className="col-12 col-sm-6 col-lg-4 col-xl-4 mb-15 mb-md-30"
                          >
                            <article className="featured-category-box border border-secondary pt-20">
                              <span className="tag">
                                {job.jobType || "Full Time"}
                              </span>
                              <div className="img-holder">
                                <JobLogo
                                  src={job.companyLogo}
                                  alt={job.companyName}
                                  title={job.jobTitle}
                                />
                                {job.employerProfilePic && (
                                  <div
                                    style={{
                                      position: "absolute",
                                      bottom: "0px",
                                      right: "0px",
                                      width: "100%",
                                      height: "100%",
                                      borderRadius: "50%",
                                      border: "2px solid white",
                                      overflow: "hidden",
                                      backgroundColor: "white",
                                    }}
                                  >
                                    <img
                                      src={job.employerProfilePic}
                                      width="40"
                                      height="40"
                                      alt="Employer"
                                      style={{ objectFit: "cover" }}
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = appleIcon;
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                              <div className="textbox">
                                <strong className="h6 mb-0">
                                  {job.companyName}
                                </strong>
                                <address className="location pt-0">
                                  <IoLocationOutline className="icon icon-map-pin" />
                                  <span className="text">
                                    {job.isRemote ? "Remote" : job.location}
                                    {job.isRemote && job.location
                                      ? ` (${job.location})`
                                      : ""}
                                  </span>
                                </address>
                                <strong className="h6 text-primary mb-0">
                                  {job.jobTitle}
                                </strong>
                                <span className="subtitle">{job.category}</span>
                                <hr />
                                <div className="job-info">
                                  <span className="amount">
                                    <strong>
                                      {job.salaryFrom && job.salaryTo
                                        ? `₹${job.salaryFrom} - ₹${job.salaryTo}`
                                        : "Salary not specified"}
                                    </strong>{" "}
                                    / {job.salaryType || "month"}
                                  </span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                  <Link
                                    to={`/job-details/${job._id}`}
                                    className="btn btn-dark-yellow btn-sm"
                                  >
                                    <span className="btn-text">
                                      <span className="text">View Details</span>
                                      <FaChevronRight className="icon-chevron-right" />
                                    </span>
                                  </Link>
                                  <div className="badge bg-success rounded-pill px-3 py-2">
                                    {userApplication?.employapplicantstatus ||
                                      "Unknown status"}
                                  </div>
                                </div>
                              </div>
                            </article>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="empty-state text-center py-5 px-3">
                    <div className="empty-state-icon mb-4">
                      <GiArchiveRegister size={80} className="text-light-sky" />
                    </div>
                    <h3 className="text-secondary mb-3">
                      No Shortlisted Jobs Yet
                    </h3>
                    <p className="text-muted mb-4 px-md-5 mx-md-5">
                      When your job applications progress beyond the initial
                      stage, they will appear here.
                    </p>
                    <div className="d-flex justify-content-center gap-3">
                      <Link to="/job-vacancies" className="btn btn-primary">
                        <FaSearch className="me-2" />
                        Browse Jobs
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <style>
        {`
        .img-holder {
  position: relative;
  width: 78px;
  height: 78px;
  margin: 0 auto 15px;
}

.employer-profile-pic {
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.employer-profile-pic:hover {
  transform: scale(1.1);
}
        `}
      </style>
    </>
  );
};

export default ShortlistedJobs;
