import React, { useState, useEffect } from "react";
import { FaCog, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Sidebar from "../../components/layout/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";

const CertificatesTrainings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const certificatesPerPage = 9;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSidebarOpen]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (!userData || !userData._id) {
          setCertificates([]);
          setLoading(false);
          return;
        }
        const response = await axios.get(
          `https://api.edprofio.com/applicant/${userData._id}/certificates`
        );
        if (response.data) {
          setCertificates(response.data);
        } else {
          setCertificates([]);
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch certificates"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  // Pagination
  const totalCertificates = certificates.length;
  const totalPages = Math.ceil(totalCertificates / certificatesPerPage);
  const indexOfLastCert = currentPage * certificatesPerPage;
  const indexOfFirstCert = indexOfLastCert - certificatesPerPage;
  const currentCertificates = certificates.slice(indexOfFirstCert, indexOfLastCert);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pageNumbers.push(i);
        if (totalPages > 4) {
          pageNumbers.push("...");
          pageNumbers.push(totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        if (totalPages > 4) pageNumbers.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++)
          pageNumbers.push(i);
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
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 text-white"></div>

      {/* Sidebar open button */}
      <a
        href="#"
        className="jobplugin__settings-opener jobplugin__text-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
        onClick={(e) => {
          e.preventDefault();
          toggleSidebar();
        }}
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: 1001,
          padding: "12px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          backgroundColor: "white",
          border: "1px solid #e0e0e0",
        }}
      >
        <FaCog className="rj-icon rj-settings" />
      </a>

      {/* Sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 999,
          }}
        />
      )}

      {/* Sidebar component */}
      <div style={{ position: "relative", zIndex: 1002, marginLeft: "28px" }}>
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      </div>

      <main
        className="jobplugin__main"
        style={{
          paddingLeft: isSidebarOpen ? 300 : 0,
          transition: "padding-left 0.3s ease",
          minHeight: "100vh",
        }}
      >
        <div className="jobplugin__main-holder">
          <div className="jobplugin__container">
            <div className="jobplugin__settings-content">
              <div className="jobplugin__settings-head">
                <h2 className="h5">Certificates and Training</h2>
                <span className="jobplugin__settings-head__bar jobplugin__bg-warning"></span>
                <p className="jobplugin__settings-head__text">
                  Your obtained certificates and completed trainings.
                </p>
                {totalCertificates > 0 && (
                  <p className="text-muted small">
                    Showing {indexOfFirstCert + 1}-
                    {Math.min(indexOfLastCert, totalCertificates)} of{" "}
                    {totalCertificates} certificates
                  </p>
                )}
              </div>

              {error ? (
                <div className="alert alert-warning">{error}</div>
              ) : certificates.length > 0 ? (
                <>
                  <div className="row justify-content-center">
                    {currentCertificates.map((cert) => (
                      <div
                        key={cert._id}
                        className="col-12 col-sm-6 col-lg-4 col-xl-4 mb-15 mb-md-30"
                      >
                        <article className="featured-category-box border border-warning pt-20">
                          <div className="img-holder text-center mb-3">
                            <img
                              src={cert.certificateImage || "/images/default-certificate.jpg"}
                              alt={cert.title}
                              width="120"
                              height="90"
                              onError={(e) => {
                                e.target.src = "/images/default-certificate.jpg";
                              }}
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <div className="textbox text-center px-3">
                            <strong className="h6 mb-1">{cert.title || "Certificate Title"}</strong>
                            <p className="mb-0">{cert.issuer || "Issued by Unknown"}</p>
                            <small className="text-muted">
                              Issued on: {cert.issuedDate ? new Date(cert.issuedDate).toLocaleDateString() : "N/A"}
                            </small>
                            <div className="mt-3">
                              <Link
                                to={`/certificate-details/${cert._id}`}
                                className="btn btn-warning btn-sm"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                        </article>
                      </div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="pagination-block pt-20 pt-lg-30 pt-xl-50 pb-0">
                      <div className="container d-flex align-items-center justify-content-center">
                        <ul className="pagination">
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
                              <FaArrowLeft />
                            </a>
                          </li>
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
                              <FaArrowRight />
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
                    <FaCog size={80} className="text-warning" />
                  </div>
                  <h3 className="text-secondary mb-3">No Certificates</h3>
                  <p className="text-muted">
                    You currently do not have any certificates or trainings added.
                  </p>
                  <Link to="/trainings" className="btn btn-warning">
                    Browse Trainings
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <style>
        {`
          .img-holder {
            position: relative;
            margin: 0 auto;
          }
          .pagination .page-link {
            cursor: pointer;
          }
          .pagination .page-item.disabled .page-link {
            cursor: not-allowed;
          }
          .border-warning {
            border-color: #ffc107 !important;
          }
          .featured-category-box:hover {
            border-color: #ffb300 !important;
            box-shadow: 0 4px 12px rgba(255, 193, 7, 0.2);
          }
          .empty-state-icon svg {
            color: #ffc107;
          }
        `}
      </style>
    </>
  );
};

export default CertificatesTrainings;
