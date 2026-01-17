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
import jobImage from "../../../public/images/jobImage.jpg";

const AppliedJobs = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 9;

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
          `${import.meta.env.VITE_BASE_URL}/applicant/${userData._id}`
        );

        console.log("API Response:", response.data);

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

  // Calculate pagination values
  const totalJobs = appliedJobs.length;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = appliedJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        if (totalPages > 4) {
          pageNumbers.push("...");
          pageNumbers.push(totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        if (totalPages > 4) {
          pageNumbers.push("...");
        }
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

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
              {/* FIXED: wrap attributes in an <a> tag */}
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
                    Track all the jobs you've applied for in one place
                  </p>
                  {totalJobs > 0 && (
                    <p className="text-muted small">
                      Showing {indexOfFirstJob + 1}-
                      {Math.min(indexOfLastJob, totalJobs)} of {totalJobs}{" "}
                      applied jobs
                    </p>
                  )}
                </div>

                {error ? (
                  <div className="alert alert-warning">{error}</div>
                ) : appliedJobs.length > 0 ? (
                  <>
                    <div className="row justify-content-center">
                      {currentJobs.map((job) => {
                        const jobTitle =
                          job.jobTitle ||
                          job.title ||
                          job.jobrole ||
                          "Job Title";
                        const companyName =
                          job.companyName || job.company || "Company Name";
                        const location =
                          job.location ||
                          job.city ||
                          "Location not specified";
                        const jobType = job.jobType || job.type || "Full Time";
                        const salaryFrom =
                          job.salaryFrom ||
                          job.salary?.min ||
                          job.salary?.from ||
                          "0";
                        const salaryTo =
                          job.salaryTo ||
                          job.salary?.max ||
                          job.salary?.to ||
                          "0";
                        const subject =
                          job.subject || job.category || job.jobCategory || "";
                        const postedDate =
                          job.createdAt ||
                          job.appliedDate ||
                          job.postedDate ||
                          new Date();
                        const jobId = job.jobId || job._id;

                        return (
                          <div
                            key={job._id}
                            className="col-12 col-sm-6 col-lg-4 col-xl-4 mb-15 mb-md-30"
                          >
                            <article className="featured-category-box border border-secondary pt-20">
                              <span className="tag">{jobType}</span>
                              <div className="img-holder">
                                <img
                                  src={job.companyLogo || jobImage}
                                  width="78"
                                  height="78"
                                  alt={companyName}
                                  onError={(e) => {
                                    e.target.src = jobImage;
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
                                      src={job.employerProfilePic || jobImage}
                                      width="40"
                                      height="40"
                                      alt="Employer"
                                      style={{ objectFit: "cover" }}
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = jobImage;
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                              <div className="textbox">
                                <strong className="h6 mb-0">
                                  {companyName}
                                </strong>
                                <address className="location pt-0">
                                  <IoLocationOutline className="icon icon-map-pin" />
                                  <span className="text">{location}</span>
                                </address>
                                <strong className="h6 text-primary mb-0">
                                  {jobTitle}
                                </strong>
                                <span className="subtitle">
                                  {subject || "No category"}
                                </span>
                                <hr />
                                <div className="job-info">
                                  <span className="amount">
                                    <strong>
                                      {salaryFrom && salaryTo
                                        ? `₹${salaryFrom} - ₹${salaryTo}`
                                        : "Salary not specified"}
                                    </strong>
                                    {salaryFrom && salaryTo && (
                                      <span className="period">/month</span>
                                    )}
                                  </span>
                                  <span className="subtext">
                                    <b className="text-primary">Posted:</b>{" "}
                                    {new Date(postedDate).toLocaleDateString(
                                      "en-GB"
                                    )}
                                  </span>
                                </div>
                                <Link
                                  to={`/job-details/${jobId}`}
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
                        );
                      })}
                    </div>

                    {/* Pagination - only show if more than 9 jobs */}
                    {totalPages > 1 && (
                      <div className="pagination-block pt-20 pt-lg-30 pt-xl-50 pb-0">
                        <div className="container d-flex align-items-center justify-content-center">
                          <ul className="pagination">
                            {/* Previous button */}
                            <li
                              className={`page-item ${
                                currentPage === 1 ? "disabled" : ""
                              }`}
                            >
                              <a
                                className="page-link"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handlePageChange(currentPage - 1);
                                }}
                              >
                                <FaArrowLeft className="icon-arrow-left1" />
                              </a>
                            </li>

                            {/* Page numbers */}
                            {getPageNumbers().map((pageNum, index) =>
                              pageNum === "..." ? (
                                <li
                                  key={`ellipsis-${index}`}
                                  className="page-item disabled"
                                >
                                  <span className="page-link">...</span>
                                </li>
                              ) : (
                                <li
                                  key={pageNum}
                                  className={`page-item ${
                                    currentPage === pageNum ? "active" : ""
                                  }`}
                                >
                                  <a
                                    className="page-link"
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handlePageChange(pageNum);
                                    }}
                                  >
                                    {pageNum}
                                  </a>
                                </li>
                              )
                            )}

                            {/* Next button */}
                            <li
                              className={`page-item ${
                                currentPage === totalPages ? "disabled" : ""
                              }`}
                            >
                              <a
                                className="page-link"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handlePageChange(currentPage + 1);
                                }}
                              >
                                <FaArrowRight className="icon-arrow-right" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
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

          .pagination .page-link {
            cursor: pointer;
          }

          .pagination .page-item.disabled .page-link {
            cursor: not-allowed;
          }

          /* Consistent card layout */
          .featured-category-box .textbox {
            display: flex;
            flex-direction: column;
            padding: 15px;
          }

          .featured-category-box .textbox .h6 {
            margin-bottom: 8px !important;
          }

          .featured-category-box .location {
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 5px;
          }

          .subtitle {
            display: block;
            color: #6c757d;
            font-size: 0.9rem;
            margin-bottom: 12px;
            min-height: 22px;
            line-height: 1.4;
          }

          .featured-category-box hr {
            margin: 12px 0;
            border-color: #e0e0e0;
          }

          .job-info {
            min-height: 70px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-bottom: 15px;
          }

          .job-info .amount {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }

          .job-info .amount strong {
            font-weight: 600;
            color: #000;
            font-size: 1rem;
            line-height: 1.3;
          }

          .job-info .amount .period {
            font-size: 0.85rem;
            color: #6c757d;
            font-weight: normal;
          }

          .job-info .subtext {
            display: block;
            font-size: 0.875rem;
            color: #6c757d;
            margin-top: auto;
          }

          .featured-category-box .btn {
            margin-top: auto;
            width: 100%;
          }

          @media (max-width: 768px) {
            .job-info {
              min-height: 65px;
            }
          }
        `}
      </style>
    </>
  );
};

export default AppliedJobs;
