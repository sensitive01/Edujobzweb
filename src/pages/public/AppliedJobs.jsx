import React, { useState, useEffect } from "react";
import {
  FaCog,
  FaChevronRight,
  FaCheckCircle,
  FaArrowLeft,
  FaArrowRight,
  FaSearch,
} from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { GiBriefcase } from "react-icons/gi";
import Sidebar from "../../components/layout/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";

const AppliedJobs = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (!userData || !userData._id) {
          setAppliedJobs([]);
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://api.edprofio.com/applicant/${userData._id}`
        );

        if (response.data) {
          setAppliedJobs(response.data);
        } else {
          setAppliedJobs([]);
        }
      } catch (err) {
        if (err.response?.data?.message === "No applied jobs found") {
          setAppliedJobs([]);
        } else {
          console.error("Error fetching applied jobs:", err);
          setError(
            err.response?.data?.message ||
              err.message ||
              "Failed to fetch applied jobs"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
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
                  <h2 className="h5">Applied Jobs</h2>
                  <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                  <p className="jobplugin__settings-head__text">
                    Your job applications will appear here
                  </p>
                </div>

                {error ? (
                  <div className="alert alert-warning">{error}</div>
                ) : appliedJobs.length > 0 ? (
                  <>
                    <div className="row justify-content-center">
                      {appliedJobs.map((job) => (
                        <div
                          key={job._id}
                          className="col-12 col-sm-6 col-lg-4 col-xl-4 mb-15 mb-md-30"
                        >
                          <article className="featured-category-box border border-secondary pt-20">
                            <span className="tag">
                              {job.jobType || "Full Time"}
                            </span>
                            <div className="img-holder">
                              <img
                                src={
                                  job.companyLogo ||
                                  "images/default-company-logo.jpg"
                                }
                                width="78"
                                height="78"
                                alt={job.companyName}
                                onError={(e) => {
                                  e.target.src =
                                    "images/default-company-logo.jpg";
                                }}
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
                                      e.target.src =
                                        "/images/default-profile-pic.jpg";
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
                                  {job.location || "Location not specified"}
                                </span>
                              </address>
                              <strong className="h6 text-primary mb-0">
                                {job.title || "Job Title"}
                              </strong>
                              <span className="subtitle">
                                {job.subject || "Subject"}
                              </span>
                              <hr />
                              <div className="job-info">
                                <span className="amount">
                                  <strong>
                                    {job.salary
                                      ? `₹${job.salary.min || "0"} - ₹${
                                          job.salary.max || "0"
                                        }`
                                      : "Salary not specified"}
                                  </strong>
                                  /month
                                </span>
                                <span className="subtext">
                                  <b className="text-primary">Posted:</b>{" "}
                                  {new Date(job.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <Link
                                to={`/job-details/${job._id}`}
                                className="btn btn-dark-yellow btn-sm"
                              >
                                <span className="btn-text">
                                  <FaCheckCircle className="text-secondary me-1" />
                                  View Details
                                  <FaChevronRight className="icon-chevron-right" />
                                </span>
                              </Link>
                            </div>
                          </article>
                        </div>
                      ))}
                    </div>

                    <div className="pagination-block pt-20 pt-lg-30 pt-xl-50 pb-0">
                      <div className="container d-flex align-items-center justify-content-center">
                        <ul className="pagination">
                          <li className="page-item disabled">
                            <a className="page-link" href="#">
                              <FaArrowLeft className="icon-arrow-left1" />
                            </a>
                          </li>
                          <li className="page-item active">
                            <a className="page-link" href="#">
                              1
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              2
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              3
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              <FaArrowRight className="icon-arrow-right" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="empty-state text-center py-5 px-3">
                    <div className="empty-state-icon mb-4">
                      <GiBriefcase size={80} className="text-light-sky" />
                    </div>
                    <h3 className="text-secondary mb-3">No Applied Jobs Yet</h3>
                    <p className="text-muted mb-4 px-md-5 mx-md-5">
                      You haven't applied to any jobs yet. Browse available
                      positions and apply to get started!
                    </p>
                    <div className="d-flex justify-content-center gap-3">
                      <Link to="/jobs" className="btn btn-primary">
                        <FaSearch className="me-2" />
                        Browse Jobs
                      </Link>
                      {!localStorage.getItem("userData") && (
                        <Link to="/login" className="btn btn-outline-primary">
                          Sign In to Apply
                        </Link>
                      )}
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

export default AppliedJobs;
