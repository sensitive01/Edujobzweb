import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBriefcase,
  FaUsers,
  FaGraduationCap,
  FaUniversity,
  FaUserCircle,
  FaSignOutAlt,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaChalkboardTeacher,
  FaSchool,
  FaBook,
  FaLaptop,
  FaChild,
  FaMapMarkerAlt,
  FaUserTie,
  FaSuitcase,
} from "react-icons/fa";
import { useLoginCleanup } from "../../hooks/useLoginCleanup";
import { FaSquarePen } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { getHeaderStaticsData } from "../../api/services/projectServices";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [userProfilePic, setUserProfilePic] = useState(null);
  const [showJobsMenu, setShowJobsMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("employerTypes");
  const [categoryCounts, setCategoryCounts] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const jobsMenuRef = useRef(null);

  // Use the login cleanup hook
  useLoginCleanup();

  const employerTypes = [
    { name: "Schools", icon: <FaSchool />, count: "15420 Jobs" },
    {
      name: "Coaching Institute",
      icon: <FaChalkboardTeacher />,
      count: "8750 Jobs",
    },
    { name: "Pre-Schools", icon: <FaChild />, count: "5280 Jobs" },
    { name: "EdTech Companies", icon: <FaLaptop />, count: "3640 Jobs" },
    {
      name: "College / Universities",
      icon: <FaUniversity />,
      count: "12890 Jobs",
    },
    { name: "Training Centers", icon: <FaBook />, count: "4320 Jobs" },
  ];

  const jobCategories = [
    {
      name: "Teaching Jobs",
      icon: <FaChalkboardTeacher />,
    },
    {
      name: "Leadership and Administration",
      icon: <FaUniversity />,
    },
    {
      name: "Support and Student Welfare",
      icon: <FaChild />,
    },
    {
      name: "Extracurricular Activities",
      icon: <FaBook />,
    },
    {
      name: "Curriculum and Content Development",
      icon: <FaSchool />,
    },
    {
      name: "EdTech and Digital Learning",
      icon: <FaLaptop />,
    },
    {
      name: "Special Education and Inclusive Learning",
      icon: <FaChalkboardTeacher />,
    },
    { name: "Non-Teaching Staffs", icon: <FaUsers /> },
    {
      name: "Training and Development",
      icon: <FaSquarePen />,
    },
    {
      name: "Research and Policy Development",
      icon: <IoDocumentText />,
    },
    {
      name: "Other Specialized Roles",
      icon: <FaSuitcase />,
    },
  ];

  const locations = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Pune",
    "Kolkata",
    "Ahmedabad",
  ];

  const designations = [
    "Principal",
    "Vice Principal",
    "Subject Teacher",
    "Assistant Teacher",
    "Academic Coordinator",
    "Lab Assistant",
    "Librarian",
    "Counselor",
  ];

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        // Check for userProfilePic or profileImage
        const profilePic =
          parsedUserData.userProfilePic || parsedUserData.profileImage;
        setUserProfilePic(profilePic);
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    }
  }, [location]);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const userType = localStorage.getItem("userType");

    // Only set as logged in if we have both token and user type
    setIsLoggedIn(!!authToken && !!userType);
  }, [location]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Close jobs menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (jobsMenuRef.current && !jobsMenuRef.current.contains(event.target)) {
        setShowJobsMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch category counts from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHeaderStaticsData();
        if (response.status===200) {
          // Convert array to object for easy lookup
          const countsMap = {};
          response.data.data.forEach((item) => {
            countsMap[item.category] = item.count;
          });
          setCategoryCounts(countsMap);
        }
      } catch (error) {
        console.error("Error fetching header statistics:", error);
      }
    };
    fetchData();
  }, []);

  // Helper function to get count for a category
  const getCategoryCount = (categoryName) => {
    const count = categoryCounts[categoryName] || 0;
    return `${count} Job${count !== 1 ? "s" : ""}`;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setOpenDropdown(null);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleProfileClick = () => {
    const userType = localStorage.getItem("userType");
    if (userType === "employee") {
      navigate("/dashboard");
    } else {
      navigate("/employer/dashboard");
    }
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("employerToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("userType");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
    setIsMenuOpen(false);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
    setShowJobsMenu(false);
  };

  const handleAccountClick = () => {
    if (isLoggedIn) {
      handleProfileClick();
    } else {
      handleLogin();
    }
  };

  const ProfilePicture = ({ size = "24px", className = "" }) => {
    if (userProfilePic) {
      return (
        <img
          src={userProfilePic}
          alt="Profile"
          className={className}
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #fff",
          }}
          onError={(e) => {
            // Fallback to avatar if image fails to load
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "inline-block";
          }}
        />
      );
    }

    // Default avatar when no profile picture
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: "#ffa500",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: parseInt(size) * 0.6 + "px",
          fontWeight: "bold",
          border: "2px solid #fff",
        }}
      >
        {/* You can use initials or a default icon */}
        <FaUserCircle style={{ fontSize: parseInt(size) * 0.8 + "px" }} />
      </div>
    );
  };

  return (
    <>
      <header
        className="header header-theme-9 bg-secondary"
        style={{ padding: "8px 0px" }}
      >
        <div className="container" style={{ maxWidth: "1440px" }}>
          <strong className="logo">
            <Link to="/">
              <img
                className="normal-logo"
                src="/images/logo.png"
                width="175"
                height="43"
                alt="Job Circle"
              />
              <img
                className="sticky-logo"
                src="/images/logo.png"
                width="175"
                height="43"
                alt="Job Circle"
              />
            </Link>
          </strong>

          <div className="main-nav">
            <button
              className="nav-opener d-flex d-lg-none"
              onClick={toggleMenu}
              aria-label="Toggle navigation"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "5px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "30px",
                height: "30px",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "20px",
                  height: "2px",
                  backgroundColor: "#fff",
                  margin: "2px 0",
                  transition: "0.3s",
                }}
              ></span>
              <span
                style={{
                  display: "block",
                  width: "20px",
                  height: "2px",
                  backgroundColor: "#fff",
                  margin: "2px 0",
                  transition: "0.3s",
                }}
              ></span>
              <span
                style={{
                  display: "block",
                  width: "20px",
                  height: "2px",
                  backgroundColor: "#fff",
                  margin: "2px 0",
                  transition: "0.3s",
                }}
              ></span>
            </button>

            {/* Desktop Navigation */}
            <div className="nav-drop d-none d-lg-block">
              <ul className="navigation">
                <li style={{ padding: "0px 15px" }}>
                  <Link to="/" onClick={handleLinkClick}>
                    <FaHome /> &nbsp; Home
                  </Link>
                </li>

                <li
                  style={{ padding: "0px 15px", position: "relative" }}
                  ref={jobsMenuRef}
                >
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowJobsMenu(!showJobsMenu);
                    }}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FaBriefcase /> &nbsp; Jobs &nbsp;
                    <FaChevronDown style={{ fontSize: "10px" }} />
                  </a>

                  {/* Jobs Mega Menu with 4 Tabs */}
                  {showJobsMenu && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "-100px",
                        width: "550px",
                        backgroundColor: "#fff",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                        borderRadius: "8px",
                        zIndex: 1000,
                        marginTop: "10px",
                        overflow: "hidden",
                      }}
                    >
                      {/* Tab Headers */}
                      <div
                        style={{
                          display: "flex",
                          borderBottom: "2px solid #f0f0f0",
                          backgroundColor: "#f8f9fa",
                        }}
                      >
                        <button
                          onClick={() => setActiveTab("employerTypes")}
                          style={{
                            flex: 1,
                            padding: "15px 10px",
                            border: "none",
                            background:
                              activeTab === "employerTypes"
                                ? "#fff"
                                : "transparent",
                            color:
                              activeTab === "employerTypes"
                                ? "#063970"
                                : "#666",
                            fontSize: "11px",
                            fontWeight:
                              activeTab === "employerTypes" ? "600" : "400",
                            cursor: "pointer",
                            borderBottom:
                              activeTab === "employerTypes"
                                ? "3px solid #ffa500"
                                : "none",
                            transition: "all 0.3s",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Employer Type
                        </button>
                        <button
                          onClick={() => setActiveTab("categories")}
                          style={{
                            flex: 1,
                            padding: "15px 10px",
                            border: "none",
                            background:
                              activeTab === "categories"
                                ? "#fff"
                                : "transparent",
                            color:
                              activeTab === "categories" ? "#063970" : "#666",
                            fontSize: "11px",
                            fontWeight:
                              activeTab === "categories" ? "600" : "400",
                            cursor: "pointer",
                            borderBottom:
                              activeTab === "categories"
                                ? "3px solid #ffa500"
                                : "none",
                            transition: "all 0.3s",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Categories
                        </button>
                        <button
                          onClick={() => setActiveTab("locations")}
                          style={{
                            flex: 1,
                            padding: "15px 10px",
                            border: "none",
                            background:
                              activeTab === "locations"
                                ? "#fff"
                                : "transparent",
                            color:
                              activeTab === "locations" ? "#063970" : "#666",
                            fontSize: "11px",
                            fontWeight:
                              activeTab === "locations" ? "600" : "400",
                            cursor: "pointer",
                            borderBottom:
                              activeTab === "locations"
                                ? "3px solid #ffa500"
                                : "none",
                            transition: "all 0.3s",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Locations
                        </button>
                        <button
                          onClick={() => setActiveTab("designations")}
                          style={{
                            flex: 1,
                            padding: "15px 10px",
                            border: "none",
                            background:
                              activeTab === "designations"
                                ? "#fff"
                                : "transparent",
                            color:
                              activeTab === "designations" ? "#063970" : "#666",
                            fontSize: "11px",
                            fontWeight:
                              activeTab === "designations" ? "600" : "400",
                            cursor: "pointer",
                            borderBottom:
                              activeTab === "designations"
                                ? "3px solid #ffa500"
                                : "none",
                            transition: "all 0.3s",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Designations
                        </button>
                      </div>

                      {/* Tab Content */}
                      <div
                        style={{
                          padding: "20px",
                          maxHeight: "350px",
                          overflowY: "auto",
                        }}
                      >
                        {activeTab === "employerTypes" && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "6px",
                            }}
                          >
                            {employerTypes.map((employer, index) => (
                              <Link
                                key={index}
                                to={`/job-vacancies?employerType=${employer.name}`}
                                onClick={handleLinkClick}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "10px 12px",
                                  textDecoration: "none",
                                  color: "#333",
                                  fontSize: "13px",
                                  borderRadius: "4px",
                                  transition: "all 0.2s",
                                  border: "1px solid transparent",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "#f8f9fa";
                                  e.currentTarget.style.borderColor = "#063970";
                                  e.currentTarget.style.transform =
                                    "translateX(5px)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "transparent";
                                  e.currentTarget.style.borderColor =
                                    "transparent";
                                  e.currentTarget.style.transform =
                                    "translateX(0)";
                                }}
                              >
                                <span
                                  style={{
                                    color: "#063970",
                                    marginRight: "10px",
                                    fontSize: "16px",
                                  }}
                                >
                                  {employer.icon}
                                </span>
                                <div style={{ flex: 1 }}>
                                  <div
                                    style={{
                                      fontWeight: "500",
                                      marginBottom: "1px",
                                    }}
                                  >
                                    {employer.name}
                                  </div>
                                  <div
                                    style={{ fontSize: "11px", color: "#999" }}
                                  >
                                    {employer.count}
                                  </div>
                                </div>
                                <FaChevronDown
                                  style={{
                                    fontSize: "10px",
                                    color: "#999",
                                    transform: "rotate(-90deg)",
                                  }}
                                />
                              </Link>
                            ))}
                          </div>
                        )}
                        {/* Categories Tab */}
                        {activeTab === "categories" && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "6px",
                            }}
                          >
                            {jobCategories.map((category, index) => (
                              <Link
                                key={index}
                                to={`/job-vacancies?category=${category.name}`}
                                onClick={handleLinkClick}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "8px 12px",
                                  textDecoration: "none",
                                  color: "#333",
                                  fontSize: "13px",
                                  borderRadius: "4px",
                                  transition: "all 0.2s",
                                  border: "1px solid transparent",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "#f8f9fa";
                                  e.currentTarget.style.borderColor = "#ffa500";
                                  e.currentTarget.style.transform =
                                    "translateX(5px)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "transparent";
                                  e.currentTarget.style.borderColor =
                                    "transparent";
                                  e.currentTarget.style.transform =
                                    "translateX(0)";
                                }}
                              >
                                <span
                                  style={{
                                    color: "#ffa500",
                                    marginRight: "10px",
                                    fontSize: "16px",
                                  }}
                                >
                                  {category.icon}
                                </span>
                                <div style={{ flex: 1 }}>
                                  <div
                                    style={{
                                      fontWeight: "500",
                                      marginBottom: "1px",
                                    }}
                                  >
                                    {category.name}
                                  </div>
                                  <div
                                    style={{ fontSize: "11px", color: "#999" }}
                                  >
                                    {getCategoryCount(category.name)}
                                  </div>
                                </div>
                                <FaChevronDown
                                  style={{
                                    fontSize: "10px",
                                    color: "#999",
                                    transform: "rotate(-90deg)",
                                  }}
                                />
                              </Link>
                            ))}
                          </div>
                        )}

                        {/* Locations Tab */}
                        {activeTab === "locations" && (
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr",
                              gap: "8px",
                            }}
                          >
                            {locations.map((location, index) => (
                              <Link
                                key={index}
                                to={`/job-vacancies?location=${location}`}
                                onClick={handleLinkClick}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "8px 12px",
                                  textDecoration: "none",
                                  color: "#333",
                                  fontSize: "13px",
                                  borderRadius: "4px",
                                  transition: "all 0.2s",
                                  border: "1px solid #e0e0e0",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "#ffa500";
                                  e.currentTarget.style.borderColor = "#ffa500";
                                  e.currentTarget.style.color = "#fff";
                                  e.currentTarget.querySelector(
                                    "svg"
                                  ).style.color = "#fff";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "transparent";
                                  e.currentTarget.style.borderColor = "#e0e0e0";
                                  e.currentTarget.style.color = "#333";
                                  e.currentTarget.querySelector(
                                    "svg"
                                  ).style.color = "#ffa500";
                                }}
                              >
                                <FaMapMarkerAlt
                                  style={{
                                    color: "#ffa500",
                                    marginRight: "8px",
                                    fontSize: "12px",
                                    transition: "color 0.2s",
                                  }}
                                />
                                <span style={{ fontWeight: "500" }}>
                                  {location}
                                </span>
                              </Link>
                            ))}
                          </div>
                        )}

                        {/* Designations Tab */}
                        {activeTab === "designations" && (
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr",
                              gap: "8px",
                            }}
                          >
                            {designations.map((designation, index) => (
                              <Link
                                key={index}
                                to={`/job-vacancies?designation=${designation}`}
                                onClick={handleLinkClick}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "8px 12px",
                                  textDecoration: "none",
                                  color: "#333",
                                  fontSize: "13px",
                                  borderRadius: "4px",
                                  transition: "all 0.2s",
                                  border: "1px solid #e0e0e0",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "#063970";
                                  e.currentTarget.style.borderColor = "#063970";
                                  e.currentTarget.style.color = "#fff";
                                  e.currentTarget.querySelector(
                                    "svg"
                                  ).style.color = "#ffa500";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "transparent";
                                  e.currentTarget.style.borderColor = "#e0e0e0";
                                  e.currentTarget.style.color = "#333";
                                  e.currentTarget.querySelector(
                                    "svg"
                                  ).style.color = "#ffa500";
                                }}
                              >
                                <FaUserTie
                                  style={{
                                    color: "#ffa500",
                                    marginRight: "8px",
                                    fontSize: "12px",
                                    transition: "color 0.2s",
                                  }}
                                />
                                <span style={{ fontWeight: "500" }}>
                                  {designation}
                                </span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* View All Jobs Button */}
                      <div
                        style={{
                          padding: "15px 20px",
                          textAlign: "center",
                          borderTop: "1px solid #f0f0f0",
                          backgroundColor: "#f8f9fa",
                        }}
                      >
                        <Link
                          to="/job-vacancies"
                          onClick={handleLinkClick}
                          style={{
                            display: "inline-block",
                            padding: "8px 25px",
                            backgroundColor: "#063970",
                            color: "#fff",
                            textDecoration: "none",
                            borderRadius: "20px",
                            fontSize: "13px",
                            fontWeight: "500",
                            transition: "all 0.3s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#ffa500";
                            e.currentTarget.style.transform = "scale(1.05)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#063970";
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        >
                          View All Jobs
                        </Link>
                      </div>
                    </div>
                  )}
                </li>

                <li style={{ padding: "0px 15px" }} className="dropdown">
                  <a
                    className="dropdown-toggle"
                    href="#"
                    role="button"
                    id="employerDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaUniversity /> &nbsp; Enterprises
                  </a>

                  <ul
                    className="dropdown-menu"
                    aria-labelledby="employerDropdown"
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/employer-admin/login"
                        onClick={handleLinkClick}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Login / Signup
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="dropdown-item"
                        to="/subscription-plan"
                        onClick={handleLinkClick}
                      >
                        Plan & Subscription
                      </Link>
                    </li>
                  </ul>
                </li>
                <li style={{ padding: "0px 15px" }} className="dropdown">
                  <a
                    className="dropdown-toggle"
                    href="#"
                    role="button"
                    id="employerDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaUniversity /> &nbsp; Employer
                  </a>

                  <ul
                    className="dropdown-menu"
                    aria-labelledby="employerDropdown"
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/employer/login"
                        onClick={handleLinkClick}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Login / Signup
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/employer"
                        onClick={handleLinkClick}
                      >
                        Employer
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="dropdown-item"
                        to="/subscription-plan"
                        onClick={handleLinkClick}
                      >
                        Plan & Subscription
                      </Link>
                    </li>
                  </ul>
                </li>

                <li style={{ padding: "0px 15px" }} className="dropdown">
                  <a
                    className="dropdown-toggle"
                    href="#"
                    role="button"
                    id="aboutDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaGraduationCap /> &nbsp; About Us
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="aboutDropdown">
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/about-us"
                        onClick={handleLinkClick}
                      >
                        About EdProfio
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/careers"
                        onClick={handleLinkClick}
                      >
                        Careers
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/blogs"
                        onClick={handleLinkClick}
                      >
                        Blogs / Press Release
                      </Link>
                    </li>
                  </ul>
                </li>

                <li style={{ padding: "0px 10px" }}>
                  <Link
                    className="btn btn-white btn-sm"
                    to="/post-job"
                    onClick={handleLinkClick}
                  >
                    <span className="btn-text text-secondary">
                      <i
                        className="icon icon-briefcase3"
                        style={{ fontSize: "14px" }}
                      ></i>{" "}
                      &nbsp; Post Jobs FREE
                    </span>
                  </Link>
                </li>

                <li style={{ padding: "0px 5px" }} className="text-login">
                  <button
                    onClick={handleAccountClick}
                    style={{
                      backgroundColor: "#063970",
                      color: "#fff",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 12px",
                      gap: "6px",
                      fontSize: "16px",
                      fontFamily: "poppins, sans-serif",
                      fontWeight: "400",
                      cursor: "pointer",
                    }}
                  >
                    {isLoggedIn ? (
                      <>
                        <ProfilePicture size="20px" />
                        My Account
                      </>
                    ) : (
                      <>
                        <i
                          className="icon icon-users"
                          style={{ fontSize: "14px", color: "#fff" }}
                        ></i>
                        Candidate Login
                      </>
                    )}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div
          className="mobile-nav-overlay d-lg-none"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
            display: "block",
          }}
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Navigation Menu */}
      <div
        className={`mobile-nav-menu d-lg-none ${isMenuOpen ? "open" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          right: isMenuOpen ? 0 : "-100%",
          width: "280px",
          height: "100vh",
          backgroundColor: "#063970",
          zIndex: 1000,
          transition: "right 0.3s ease-in-out",
          overflowY: "auto",
          paddingTop: "20px",
        }}
      >
        {/* Close button */}
        <button
          onClick={toggleMenu}
          style={{
            position: "absolute",
            top: "15px",
            left: "15px",
            background: "none",
            border: "none",
            color: "#ffa500",
            fontSize: "24px",
            cursor: "pointer",
            padding: "5px",
          }}
        >
          <FaTimes />
        </button>

        {/* Mobile Navigation Items */}
        <div style={{ padding: "50px 0 20px 0" }}>
          {/* Home */}
          <div style={{ marginBottom: "8px" }}>
            <Link
              to="/"
              onClick={handleLinkClick}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 20px",
                color: "#fff",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: "400",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <FaHome style={{ marginRight: "12px", fontSize: "16px" }} />
              Home
            </Link>
          </div>

          {/* Jobs */}
          <div style={{ marginBottom: "8px" }}>
            <Link
              to="/job-vacancies"
              onClick={handleLinkClick}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 20px",
                color: "#fff",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: "400",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <FaBriefcase style={{ marginRight: "12px", fontSize: "16px" }} />
              Jobs
            </Link>
          </div>

          {/* Employer Dropdown */}
          <div style={{ marginBottom: "8px" }}>
            <button
              onClick={() => toggleDropdown("employer")}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 20px",
                color: "#ff9800",
                background: "none",
                border: "none",
                fontSize: "16px",
                fontWeight: "400",
                cursor: "pointer",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaUniversity
                  style={{ marginRight: "12px", fontSize: "16px" }}
                />
                Employer
              </div>
              {openDropdown === "employer" ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </button>

            {openDropdown === "employer" && (
              <div style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
                <Link
                  to="/employer/login"
                  onClick={handleLinkClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    padding: "12px 20px 12px 52px",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "14px",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    backgroundColor: "#ffa500",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#ff8c00")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#ffa500")
                  }
                >
                  Login / Signup
                </Link>
                <Link
                  to="/dashboard"
                  onClick={handleLinkClick}
                  style={{
                    display: "block",
                    padding: "12px 20px 12px 52px",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "14px",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#ffa500")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  Dashboard
                </Link>
                <Link
                  to="/employer"
                  onClick={handleLinkClick}
                  style={{
                    display: "block",
                    padding: "12px 20px 12px 52px",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "14px",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#ffa500")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  Employer
                </Link>
                <Link
                  to="/subscription-plan"
                  onClick={handleLinkClick}
                  style={{
                    display: "block",
                    padding: "12px 20px 12px 52px",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "14px",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#ffa500")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  Plan & Subscription
                </Link>
              </div>
            )}
          </div>

          {/* Candidates Dropdown */}
          <div style={{ marginBottom: "8px" }}>
            <button
              onClick={() => toggleDropdown("candidates")}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 20px",
                color: "#fff",
                background: "none",
                border: "none",
                fontSize: "16px",
                fontWeight: "400",
                cursor: "pointer",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaUsers style={{ marginRight: "12px", fontSize: "16px" }} />
                Candidates
              </div>
              {openDropdown === "candidates" ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </button>

            {openDropdown === "candidates" && (
              <div style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
                {!isLoggedIn && (
                  <Link
                    to="/employee-registration"
                    onClick={handleLinkClick}
                    style={{
                      display: "block",
                      padding: "12px 20px 12px 52px",
                      color: "#fff",
                      textDecoration: "none",
                      fontSize: "14px",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#ffa500")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    }
                  >
                    Login / Signup
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  onClick={handleLinkClick}
                  style={{
                    display: "block",
                    padding: "12px 20px 12px 52px",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "14px",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#ffa500")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  Dashboard
                </Link>
                <Link
                  to="/job-vacancies"
                  onClick={handleLinkClick}
                  style={{
                    display: "block",
                    padding: "12px 20px 12px 52px",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "14px",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#ffa500")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  Jobs
                </Link>
              </div>
            )}
          </div>

          {/* About Us Dropdown */}
          <div style={{ marginBottom: "8px" }}>
            <button
              onClick={() => toggleDropdown("about")}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 20px",
                color: "#fff",
                background: "none",
                border: "none",
                fontSize: "16px",
                fontWeight: "400",
                cursor: "pointer",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaGraduationCap
                  style={{ marginRight: "12px", fontSize: "16px" }}
                />
                About Us
              </div>
              {openDropdown === "about" ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {openDropdown === "about" && (
              <div style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
                <Link
                  to="/about-us"
                  onClick={handleLinkClick}
                  style={{
                    display: "block",
                    padding: "12px 20px 12px 52px",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "14px",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#ffa500")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  About EdProfio
                </Link>
                <Link
                  to="/careers"
                  onClick={handleLinkClick}
                  style={{
                    display: "block",
                    padding: "12px 20px 12px 52px",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "14px",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#ffa500")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  Careers
                </Link>
                <Link
                  to="/blogs"
                  onClick={handleLinkClick}
                  style={{
                    display: "block",
                    padding: "12px 20px 12px 52px",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "14px",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#ffa500")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  Blogs / Press Release
                </Link>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div
            style={{
              padding: "20px",
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Link
              to="/job-vacancies"
              onClick={handleLinkClick}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px 20px",
                backgroundColor: "#fff",
                color: "#063970",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: "500",
                borderRadius: "25px",
                marginBottom: "12px",
                border: "none",
              }}
            >
              <i
                className="icon icon-user"
                style={{ fontSize: "14px", marginRight: "8px" }}
              ></i>
              Apply Now
            </Link>

            <Link
              to="/post-job"
              onClick={handleLinkClick}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px 20px",
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "#fff",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: "500",
                borderRadius: "25px",
                marginBottom: "20px",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              <i
                className="icon icon-briefcase3"
                style={{ fontSize: "14px", marginRight: "8px" }}
              ></i>
              Post Jobs FREE
            </Link>

            <button
              onClick={isLoggedIn ? handleProfileClick : handleLogin}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px 20px",
                backgroundColor: "transparent",
                color: "#fff",
                border: "none",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                paddingTop: "20px",
              }}
            >
              {isLoggedIn ? (
                <>
                  <ProfilePicture size="24px" />
                  <span style={{ marginLeft: "8px" }}>My Account</span>
                </>
              ) : (
                <>
                  <i
                    className="icon icon-users"
                    style={{ fontSize: "16px", marginRight: "8px" }}
                  ></i>
                  Login
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
