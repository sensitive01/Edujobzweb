import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const userType = localStorage.getItem("userType");
    setIsLoggedIn(!!authToken && !!userType);

    // Fetch categories from API (similar to HomePage)
    fetchCategories();
  }, [location]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/employer/fetchjobs`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch job data");
      }
      const data = await response.json();

      // Extract unique categories from API data
      const uniqueCategories = [
        ...new Set(data.map((job) => job.category)),
      ].filter(Boolean);
      // setCategories(uniqueCategories);
      setCategories([
        "Education",
        "IT",
        "Marketing",
        "Leadership",
        "Support",
        "Non-Teaching",
      ]);
    } catch (err) {
      console.error("Error fetching categories:", err);
      // Fallback to default categories if API fails
      setCategories([
        "Education",
        "IT",
        "Marketing",
        "Leadership",
        "Support",
        "Non-Teaching",
      ]);
    }
  };

  const handleCategoryClick = (category) => {
    // Navigate to job vacancies with category filter
    navigate(`/job-vacancies?category=${encodeURIComponent(category)}`);
    // Reload the page
    window.location.reload();
  };

  const handleLinkClick = (path) => {
    // Navigate to the path and then reload
    navigate(path);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  // Default categories as fallback
  const defaultCategories = [
    "Education",
    "IT",
    "Marketing",
    "Leadership",
    "Support",
    "Non-Teaching",
    "Training",
    "Research",
  ];

  // Use API categories if available, otherwise use default categories
  const displayCategories =
    categories.length > 0 ? categories : defaultCategories;

  return (
    <footer
      className="footer footer-theme-9 bg-secondary"
      style={{ paddingTop: "80px" }}
    >
      <div className="container">
        <div className="wrap_footer">
          <div className="subscription">
            <div className="text-holder">
              <strong
                className="title text-primary"
                style={{ fontSize: "36px" }}
              >
                Let's Keep in Touch!
              </strong>
              <p>Subscribe to keep up with news and exciting updates.</p>
            </div>
            <form className="subscription-form">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email address...."
              />
              <button className="btn btn-primary " type="submit">
                <span className="btn-text">Subscribe</span>
              </button>
            </form>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-3">
              <div className="contact_info_holder">
                <div className="footer-logo">
                  <img src="/images/logo.png" alt="logo" />
                </div>
                <ul className="contact-info-list">
                  <li>
                    <strong
                      className="left-title text-primary"
                      style={{ width: "120px" }}
                    >
                      <i className="icon icon-email"></i> &nbsp; Email:
                    </strong>
                    <span className="sub-text">
                      <a href="mailto:support@edprofio.com">
                        support@edprofio.com
                      </a>
                    </span>
                  </li>
                  <li>
                    <strong
                      className="left-title text-primary"
                      style={{ width: "120px" }}
                    >
                      <i className="icon icon-phone"></i> &nbsp; Phone:
                    </strong>
                    <span className="sub-text">
                      <a href="tel:">(+91) 7022913737</a>
                    </span>
                  </li>
                  <li>
                    <strong
                      className="left-title text-primary"
                      style={{ width: "120px" }}
                    >
                      <i className="icon icon-map-pin"></i> &nbsp; Location:
                    </strong>
                    <span className="sub-text">
                      Bangalore, Karnataka, India
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-5">
              <div className="footer-links-holder">
                <div className="row">
                  <div className="col-5">
                    <strong className="h5 text-primary">Quick Links</strong>
                    <ul className="footer-links">
                      <li>
                        <Link
                          to="/job-vacancies"
                          onClick={(e) => {
                            e.preventDefault();
                            handleLinkClick("/job-vacancies");
                          }}
                        >
                          Browse Jobs
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/candidates"
                          onClick={(e) => {
                            e.preventDefault();
                            handleLinkClick("/candidates");
                          }}
                        >
                          Browse Candidates
                        </Link>
                      </li>
                      {isLoggedIn ? (
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={(e) => {
                              e.preventDefault();
                              handleLinkClick("/dashboard");
                            }}
                          >
                            Candidate Dashboard
                          </Link>
                        </li>
                      ) : (
                        <li>
                          <Link
                            to="/login"
                            onClick={(e) => {
                              e.preventDefault();
                              handleLinkClick("/login");
                            }}
                          >
                            Candidate Login
                          </Link>
                        </li>
                      )}

                      {isLoggedIn ? (
                        <li>
                          <Link
                            to="/job-alerts"
                            onClick={(e) => {
                              e.preventDefault();
                              handleLinkClick("/job-alerts");
                            }}
                          >
                            Job Alerts
                          </Link>
                        </li>
                      ) : (
                        <li>
                          <Link
                            to="/login"
                            onClick={(e) => {
                              e.preventDefault();
                              handleLinkClick("/login");
                            }}
                          >
                            Job Alerts
                          </Link>
                        </li>
                      )}

                      {isLoggedIn ? (
                        <li>
                          <Link
                            to="/saved-jobs"
                            onClick={(e) => {
                              e.preventDefault();
                              handleLinkClick("/saved-jobs");
                            }}
                          >
                            My Bookmarks
                          </Link>
                        </li>
                      ) : (
                        <li>
                          <Link
                            to="/login"
                            onClick={(e) => {
                              e.preventDefault();
                              handleLinkClick("/login");
                            }}
                          >
                            My Bookmarks
                          </Link>
                        </li>
                      )}
                       <li>
                          <Link
                            to="/login"
                            onClick={(e) => {
                              e.preventDefault();
                              handleLinkClick("/privacy-policy");
                            }}
                          >
                            Privacy Policy
                          </Link>
                        </li>
                    </ul>
                  </div>
                  <div className="col-7">
                    <strong className="h5 text-primary">Categories</strong>
                    <ul className="footer-links">
                      {displayCategories.slice(0, 7).map((category, index) => (
                        <li key={index}>
                          <Link
                            to="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleCategoryClick(category);
                            }}
                            className="text-capitalize"
                          >
                            {category} Jobs
                          </Link>
                        </li>
                      ))}
                      {displayCategories.length > 7 && (
                        <li>
                          <Link
                            to="/job-vacancies"
                            onClick={(e) => {
                              e.preventDefault();
                              handleLinkClick("/job-vacancies");
                            }}
                          >
                            View All Categories
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 mt-30 mt-lg-0 col-lg-4">
              <div
                className="finder bg-white border border-primary shadow"
                style={{ border: "1px solid #fff" }}
              >
                <strong className="h3 text-dark">Let Employers Find You</strong>
                <p align="justify" className="text-secondary">
                  Advertise your jobs to millions of candidates and search 15.8
                  million CVs through EdProfio.
                </p>
                {isLoggedIn ? (
                  <Link
                    className="btn_upload bg-light-sky border border-secondary"
                    to="/dashboard"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick("/dashboard");
                    }}
                  >
                    <i className="icon icon-upload-cloud"></i>
                    <span className="text">Upload Your CV</span>
                  </Link>
                ) : (
                  <Link
                    className="btn_upload bg-light-sky border border-secondary"
                    to="/login"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick("/login");
                    }}
                  >
                    <i className="icon icon-upload-cloud"></i>
                    <span className="text">Upload Your CV</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="bottom-footer">
            <p>
              Copyright © 2025{" "}
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick("/");
                }}
              >
                EdProfio
              </Link>
              . All Rights Reserved. Powered by{" "}
              <a
                href="https://sensitive.co.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sensitive Technologies
              </a>
              .
            </p>
            <ul className="social_links">
              <li>
                <a href="#">
                  <i className="icon icon-facebook"></i>
                  <span className="text">Facebook</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon icon-youtube"></i>
                  <span className="text">Youtube</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon icon-instagram"></i>
                  <span className="text">Instagram</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon icon-linkedin"></i>
                  <span className="text">Linked In</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
