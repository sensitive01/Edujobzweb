import React, { useEffect, useState } from "react";
import { FaCog, FaTimes, FaUsers, FaSuitcase } from "react-icons/fa";
import { FaSquarePen } from "react-icons/fa6";
import { IoDocumentText, IoChevronDown } from "react-icons/io5";
import Sidebar from "../../components/layout/Sidebar";

const API_URL = import.meta.env.VITE_BASE_URL;

const defaultCategories = [
  {
    title: "Teaching Jobs",
    iconBlue: "/images/img_20.png",
    iconWhite: "/images/img_20_white.png",
    lucideIcon: null,
    apiCategoryMatch: "Education",
  },
  {
    title: "Leadership and Administration",
    iconBlue: "/images/leadership.png",
    iconWhite: "/images/leadership1.png",
    lucideIcon: null,
    apiCategoryMatch: "Leadership",
  },
  {
    title: "Support and Student Welfare",
    iconBlue: "/images/img_25.png",
    iconWhite: "/images/img_25_white.png",
    lucideIcon: null,
    apiCategoryMatch: "Support",
  },
  {
    title: "Extracurricular Activities",
    iconBlue: "/images/img_22.png",
    iconWhite: "/images/img_22_white.png",
    lucideIcon: null,
    apiCategoryMatch: "Extracurricular",
  },
  {
    title: "Curriculum and Content Development",
    iconBlue: "/images/img_23.png",
    iconWhite: "/images/img_23_white.png",
    lucideIcon: null,
    apiCategoryMatch: "Curriculum",
  },
  {
    title: "EdTech and Digital Learning",
    iconBlue: "/images/img_24.png",
    iconWhite: "/images/img_24_white.png",
    lucideIcon: null,
    apiCategoryMatch: "IT",
  },
  {
    title: "Special Education and Inclusive Learning",
    iconBlue: "/images/special.png",
    iconWhite: "/images/special1.png",
    lucideIcon: null,
    apiCategoryMatch: "Special Education",
  },
  {
    title: "Non-Teaching Staffs",
    iconBlue: null,
    iconWhite: null,
    lucideIcon: FaUsers,
    apiCategoryMatch: "Non-Teaching",
  },
  {
    title: "Training and Development",
    iconBlue: null,
    iconWhite: null,
    lucideIcon: FaSquarePen,
    apiCategoryMatch: "Training",
  },
  {
    title: "Research and Policy Development",
    iconBlue: null,
    iconWhite: null,
    lucideIcon: IoDocumentText,
    apiCategoryMatch: "Research",
  },
  {
    title: "Other Specialized Roles",
    iconBlue: null,
    iconWhite: null,
    lucideIcon: FaSuitcase,
    apiCategoryMatch: "Marketing",
  },
];

const JobAlert = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobAlerts, setJobAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    salaryFrom: "",
    salaryTo: "",
    location: "",
    workType: "work_from_home",
    experience: "",
    jobCategories: [], // Array for multiple categories
  });

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    fetchJobAlerts();
  }, []);

  const fetchJobAlerts = async () => {
    try {
      const response = await fetch(`${API_URL}/get-job-alerts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setJobAlerts(data.jobAlerts || []);
      }
    } catch (error) {
      console.error("Error fetching job alerts:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (categoryMatch) => {
    setFormData((prev) => ({
      ...prev,
      jobCategories: prev.jobCategories.includes(categoryMatch)
        ? prev.jobCategories.filter((cat) => cat !== categoryMatch)
        : [...prev.jobCategories, categoryMatch],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.jobCategories.length === 0) {
      alert("Please select at least one job category.");
      return;
    }

    setLoading(true);

    try {
      const submitData = {
        ...formData,
        salaryRange: `${formData.salaryFrom} - ${formData.salaryTo}`,
      };

      const response = await fetch(`${API_URL}/add-job-alert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        // Reset form and close modal
        setFormData({
          salaryFrom: "",
          salaryTo: "",
          location: "",
          workType: "work_from_home",
          experience: "",
          jobCategories: [],
        });
        setIsModalOpen(false);
        setShowCategoryDropdown(false);

        // Refresh job alerts
        await fetchJobAlerts();

        alert("Job alert added successfully!");
      } else {
        alert("Failed to add job alert. Please try again.");
      }
    } catch (error) {
      console.error("Error adding job alert:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowCategoryDropdown(false);
    // Reset form when closing
    setFormData({
      salaryFrom: "",
      salaryTo: "",
      location: "",
      workType: "work_from_home",
      experience: "",
      jobCategories: [],
    });
  };

  const getSelectedCategoriesText = () => {
    if (formData.jobCategories.length === 0) {
      return "Select job categories...";
    }
    if (formData.jobCategories.length === 1) {
      const category = defaultCategories.find(
        (cat) => cat.apiCategoryMatch === formData.jobCategories[0]
      );
      return category ? category.title : formData.jobCategories[0];
    }
    return `${formData.jobCategories.length} categories selected`;
  };

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
                  <strong className="jobplugin__settings-card__subtitle text-large">
                    Job Alerts
                  </strong>
                  <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                  <p>
                    Jobs matching your requirement will display here as per your
                    request
                  </p>
                </div>
                <div className="jobplugin__settings-card">
                  <header className="jobplugin__settings-card__head">
                    <h3 className="h6">Matching Jobs</h3>
                    <button
                      onClick={openModal}
                      className="jobplugin__button jobplugin__bg-white jobplugin__border-primary small hover:jobplugin__bg-white"
                      style={{ color: "black" }}
                    >
                      Add a Job Alert
                    </button>
                  </header>
                  <div className="jobplugin__settings-card__body">
                    <ul className="jobplugin__settings-card__infolist">
                      {jobAlerts.length > 0 ? (
                        jobAlerts.map((alert, index) => (
                          <li key={index}>
                            <p>
                              {alert.jobCategory} - {alert.location} -{" "}
                              {alert.salaryRange}
                            </p>
                          </li>
                        ))
                      ) : (
                        <li>
                          <p>No Matching Jobs Found</p>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              width: "100%",
              maxWidth: "600px",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "24px 24px 0 24px",
                borderBottom: "1px solid #e5e7eb",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "#1f2937",
                    paddingBottom: "16px",
                  }}
                >
                  Create Job Alert
                </h2>
                <button
                  onClick={closeModal}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "20px",
                    cursor: "pointer",
                    color: "#6b7280",
                    padding: "8px",
                    borderRadius: "6px",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#f3f4f6")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "0 24px 24px 24px" }}>
              <form onSubmit={handleSubmit}>
                {/* Salary Range Row */}
                <div style={{ marginBottom: "20px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "500",
                      color: "#374151",
                      fontSize: "14px",
                    }}
                  >
                    Salary Range *
                  </label>
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <input
                        type="number"
                        name="salaryFrom"
                        value={formData.salaryFrom}
                        onChange={handleInputChange}
                        placeholder="From (₹)"
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          border: "1px solid #d1d5db",
                          borderRadius: "8px",
                          fontSize: "14px",
                          transition: "border-color 0.2s",
                          outline: "none",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#3b82f6")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                        required
                      />
                    </div>
                    <span style={{ color: "#6b7280", fontWeight: "500" }}>
                      to
                    </span>
                    <div style={{ flex: 1 }}>
                      <input
                        type="number"
                        name="salaryTo"
                        value={formData.salaryTo}
                        onChange={handleInputChange}
                        placeholder="To (₹)"
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          border: "1px solid #d1d5db",
                          borderRadius: "8px",
                          fontSize: "14px",
                          transition: "border-color 0.2s",
                          outline: "none",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#3b82f6")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Location and Work Type Row */}
                <div
                  style={{ display: "flex", gap: "16px", marginBottom: "20px" }}
                >
                  <div style={{ flex: 1 }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontWeight: "500",
                        color: "#374151",
                        fontSize: "14px",
                      }}
                    >
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Mumbai, Delhi, Remote"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "14px",
                        transition: "border-color 0.2s",
                        outline: "none",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                      onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                      required
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontWeight: "500",
                        color: "#374151",
                        fontSize: "14px",
                      }}
                    >
                      Work Type *
                    </label>
                    <select
                      name="workType"
                      value={formData.workType}
                      onChange={handleInputChange}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "14px",
                        backgroundColor: "white",
                        outline: "none",
                      }}
                      required
                    >
                      <option value="work_from_home">Work From Home</option>
                      <option value="work_from_office">Work From Office</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>

                {/* Experience */}
                <div style={{ marginBottom: "20px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "500",
                      color: "#374151",
                      fontSize: "14px",
                    }}
                  >
                    Experience *
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="e.g., 2-5 years, Fresher, 10+ years"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      fontSize: "14px",
                      transition: "border-color 0.2s",
                      outline: "none",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                    onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                    required
                  />
                </div>

                {/* Job Categories Dropdown */}
                <div style={{ marginBottom: "24px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "500",
                      color: "#374151",
                      fontSize: "14px",
                    }}
                  >
                    Job Categories *
                  </label>
                  <div style={{ position: "relative" }}>
                    <button
                      type="button"
                      onClick={() =>
                        setShowCategoryDropdown(!showCategoryDropdown)
                      }
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "14px",
                        backgroundColor: "white",
                        textAlign: "left",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                        outline: "none",
                      }}
                    >
                      <span
                        style={{
                          color:
                            formData.jobCategories.length === 0
                              ? "#9ca3af"
                              : "#374151",
                        }}
                      >
                        {getSelectedCategoriesText()}
                      </span>
                      <IoChevronDown
                        style={{
                          transform: showCategoryDropdown
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          transition: "transform 0.2s",
                        }}
                      />
                    </button>

                    {showCategoryDropdown && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          right: 0,
                          backgroundColor: "white",
                          border: "1px solid #d1d5db",
                          borderRadius: "8px",
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                          zIndex: 1000,
                          maxHeight: "300px",
                          overflowY: "auto",
                          marginTop: "4px",
                        }}
                      >
                        {defaultCategories.map((category, index) => (
                          <label
                            key={index}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "12px 16px",
                              cursor: "pointer",
                              borderBottom:
                                index < defaultCategories.length - 1
                                  ? "1px solid #f3f4f6"
                                  : "none",
                            }}
                            onMouseEnter={(e) =>
                              (e.target.style.backgroundColor = "#f9fafb")
                            }
                            onMouseLeave={(e) =>
                              (e.target.style.backgroundColor = "white")
                            }
                          >
                            <input
                              type="checkbox"
                              checked={formData.jobCategories.includes(
                                category.apiCategoryMatch
                              )}
                              onChange={() =>
                                handleCategoryChange(category.apiCategoryMatch)
                              }
                              style={{
                                marginRight: "12px",
                                width: "16px",
                                height: "16px",
                                cursor: "pointer",
                              }}
                            />
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                              }}
                            >
                              {category.iconBlue && (
                                <img
                                  src={category.iconBlue}
                                  alt=""
                                  style={{ width: "20px", height: "20px" }}
                                />
                              )}
                              {category.lucideIcon && (
                                <category.lucideIcon
                                  size={20}
                                  color="#6b7280"
                                />
                              )}
                              <span
                                style={{ fontSize: "14px", color: "#374151" }}
                              >
                                {category.title}
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  {formData.jobCategories.length > 0 && (
                    <div
                      style={{
                        marginTop: "8px",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                      }}
                    >
                      {formData.jobCategories.map((categoryMatch) => {
                        const category = defaultCategories.find(
                          (cat) => cat.apiCategoryMatch === categoryMatch
                        );
                        return (
                          <span
                            key={categoryMatch}
                            style={{
                              backgroundColor: "#eff6ff",
                              color: "#1d4ed8",
                              padding: "4px 8px",
                              borderRadius: "4px",
                              fontSize: "12px",
                              fontWeight: "500",
                            }}
                          >
                            {category ? category.title : categoryMatch}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Form Actions */}
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    justifyContent: "flex-end",
                    paddingTop: "16px",
                    borderTop: "1px solid #e5e7eb",
                  }}
                >
                  <button
                    type="button"
                    onClick={closeModal}
                    style={{
                      padding: "12px 24px",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      backgroundColor: "white",
                      color: "#374151",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#f9fafb")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "white")
                    }
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: "12px 24px",
                      border: "none",
                      borderRadius: "8px",
                      backgroundColor: loading ? "#9ca3af" : "#3b82f6",
                      color: "white",
                      cursor: loading ? "not-allowed" : "pointer",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) e.target.style.backgroundColor = "#2563eb";
                    }}
                    onMouseLeave={(e) => {
                      if (!loading) e.target.style.backgroundColor = "#3b82f6";
                    }}
                  >
                    {loading ? "Creating Alert..." : "Create Job Alert"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobAlert;
