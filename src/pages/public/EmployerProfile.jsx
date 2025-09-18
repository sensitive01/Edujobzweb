import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaPowerOff,
  FaEdit,
  FaLink,
  FaFilePdf,
  FaKey,
  FaTimes,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  getEmployeeDetails,
  changePassword,
} from "../../api/services/projectServices";

const EmployeProfile = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const userData = JSON.parse(localStorage.getItem("userData"));

        if (!token || !userData) {
          navigate("/login");
          return;
        }

        const data = await getEmployeeDetails(userData._id, token);
        setEmployeeData(data);
      } catch (err) {
        setError(err.message || "Failed to fetch employee data");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPasswordError("");
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setPasswordError("All fields are required");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New password and confirm password do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters long");
      return;
    }

    try {
      setPasswordLoading(true);
      const token = localStorage.getItem("authToken");
      const userData = JSON.parse(localStorage.getItem("userData"));

      await changePassword({
        userId: userData._id,
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      // Success - close modal and show success message
      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      alert("Password changed successfully!");
    } catch (err) {
      setPasswordError(err.message || "Failed to change password");
    } finally {
      setPasswordLoading(false);
    }
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordError("");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Present";
    const [month, year] = dateString.split("/");
    return `${month}/${year}`;
  };

  const formatDOB = (dobString) => {
    if (!dobString) return "Not specified";
    const [day, month, year] = dobString.split("/");
    return `${day}/${month}/${year}`;
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!employeeData) {
    return <div className="alert alert-info">No employee data found</div>;
  }

  return (
    <>
      <div className="subvisual-block subvisual-theme-1 bg-light d-flex pt-60 pt-md-90 text-white"></div>
      <main className="jobplugin__main bg-light">
        <div className="jobplugin__main-holder">
          <div className="jobplugin__container">
            <div className="jobplugin__profile">
              <div className="jobplugin__profile-intro border border-dark shadow">
                <div className="jobplugin__profile-intro__left">
                  <div className="jobplugin__profile-intro__image border-primary">
                    <div className="jobplugin__profile-intro__avatar">
                      <img
                        src={
                          employeeData.userProfilePic ||
                          employeeData.profileImage ||
                          "images/img-profile.jpg"
                        }
                        alt={employeeData.userName}
                      />
                    </div>
                    <Link
                      to={`/employee/edit/${employeeData._id}`}
                      className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                    >
                      <FaEdit />
                    </Link>
                  </div>
                  <div className="jobplugin__profile-intro__Textbox">
                    <div className="jobplugin__profile-intro__info mb-0">
                      <h1 className="h5">{employeeData.userName}</h1>
                      {employeeData.isVerified && (
                        <span className="jobplugin__article-toprated">
                          Verified
                        </span>
                      )}
                    </div>
                    <address className="jobplugin__profile-intro__address">
                      {employeeData.currentCity ||
                        employeeData.city ||
                        "Location not specified"}
                    </address>
                    {employeeData.specialization && (
                      <div className="jobplugin__profile-intro__specialization">
                        {employeeData.specialization}
                      </div>
                    )}
                  </div>
                </div>
                <div className="jobplugin__profile-intro__right">
                  <Link
                    to="/dashboard"
                    className="jobplugin__button jobplugin__bg-white jobplugin__border-primary hover:jobplugin__bg-white small text-black"
                  >
                    <FaArrowLeft /> &nbsp; Back to Dashboard
                  </Link>
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="jobplugin__button border-dark shadow bg-warning hover:jobplugin__bg-warning-dark small"
                  >
                    <FaKey /> &nbsp; Change Password
                  </button>
                  <button
                    onClick={handleLogout}
                    className="jobplugin__button border-dark shadow bg-primary hover:jobplugin__bg-secondary small"
                  >
                    <FaPowerOff /> &nbsp; Logout
                  </button>
                </div>
              </div>

              {/* Password Change Modal */}
              {showPasswordModal && (
                <div
                  className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                  style={{ zIndex: 1050, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                  <div
                    className="bg-white shadow-lg"
                    style={{
                      maxWidth: "380px",
                      width: "90%",
                      borderRadius: "8px",
                    }}
                  >
                    {/* Modal Header */}
                    <div className="px-3 py-3 border-bottom d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 fw-bold">Change Password</h5>
                      <button
                        type="button"
                        className="border-0 bg-transparent"
                        onClick={closePasswordModal}
                        style={{ cursor: "pointer" }}
                      >
                        <FaTimes />
                      </button>
                    </div>

                    {/* Modal Body */}
                    <div className="px-3 py-3">
                      <form onSubmit={handlePasswordSubmit}>
                        <div className="mb-3">
                          <label
                            htmlFor="currentPassword"
                            className="form-label mb-1"
                            style={{ fontSize: "14px" }}
                          >
                            Current Password
                          </label>
                          <input
                            type="password"
                            className="form-control form-control-sm"
                            id="currentPassword"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            style={{ borderRadius: "6px", padding: "8px 12px" }}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            htmlFor="newPassword"
                            className="form-label mb-1"
                            style={{ fontSize: "14px" }}
                          >
                            New Password
                          </label>
                          <input
                            type="password"
                            className="form-control form-control-sm"
                            id="newPassword"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            minLength="6"
                            style={{ borderRadius: "6px", padding: "8px 12px" }}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            htmlFor="confirmPassword"
                            className="form-label mb-1"
                            style={{ fontSize: "14px" }}
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            className="form-control form-control-sm"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            style={{ borderRadius: "6px", padding: "8px 12px" }}
                            required
                          />
                        </div>

                        {passwordError && (
                          <div
                            className="alert alert-danger py-2 mb-3"
                            style={{ fontSize: "13px" }}
                          >
                            {passwordError}
                          </div>
                        )}

                        {/* Modal Footer */}
                        <div className="d-flex gap-2 justify-content-end">
                          <button
                            type="button"
                            className="btn btn-sm btn-secondary"
                            onClick={closePasswordModal}
                            disabled={passwordLoading}
                            style={{ padding: "6px 16px" }}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="btn btn-sm btn-primary"
                            disabled={passwordLoading}
                            style={{ padding: "6px 16px" }}
                          >
                            {passwordLoading ? "Changing..." : "Change"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              <div className="jobplugin__profile-container">
                <aside className="jobplugin__profile-aside">
                  <div className="jobplugin__profile-box border border-dark shadow">
                    <div className="jobplugin__profile-box__head">
                      <div className="jobplugin__profile-box__heading">
                        <h2 className="h5">Contact Info</h2>
                        <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                      </div>
                      <div className="jobplugin__profile-box__buttons">
                        <Link
                          to={`/employee/edit/${employeeData._id}`}
                          className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                        >
                          <FaEdit />
                        </Link>
                      </div>
                    </div>
                    <div className="jobplugin__profile-box__body">
                      <ul className="jobplugin__profile-box__links">
                        <li>
                          <span className="jobplugin__profile-box__links-text">
                            <strong>Phone:</strong>{" "}
                            {employeeData.userMobile || "Not provided"}
                          </span>
                        </li>
                        <li>
                          <span className="jobplugin__profile-box__links-text">
                            <strong>Email:</strong> {employeeData.userEmail}
                          </span>
                        </li>
                        {employeeData.linkedin && (
                          <li>
                            <a
                              href={employeeData.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:jobplugin__bg-primary hover:jobplugin__text-white"
                            >
                              <FaLink /> &nbsp; LinkedIn Profile
                            </a>
                          </li>
                        )}
                        {employeeData.github && (
                          <li>
                            <a
                              href={employeeData.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:jobplugin__bg-primary hover:jobplugin__text-white"
                            >
                              <FaLink /> &nbsp; GitHub Profile
                            </a>
                          </li>
                        )}
                        {employeeData.portfolio && (
                          <li>
                            <a
                              href={employeeData.portfolio}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:jobplugin__bg-primary hover:jobplugin__text-white"
                            >
                              <FaLink /> &nbsp; Portfolio Website
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="jobplugin__profile-box border border-dark shadow">
                    <div className="jobplugin__profile-box__head">
                      <div className="jobplugin__profile-box__heading">
                        <h2 className="h5">Media Profile</h2>
                        <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                      </div>
                      <div className="jobplugin__profile-box__buttons">
                        <Link
                          to={`/employee/edit/${employeeData._id}`}
                          className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                        >
                          <FaEdit />
                        </Link>
                      </div>
                    </div>
                    <div className="jobplugin__profile-box__body">
                      {/* Audio Profile Section */}
                      <div className="mb-4">
                        <h6 className="fw-medium mb-3">Audio Introduction</h6>
                        {employeeData.introductionAudio?.url ? (
                          <div>
                            <div className="d-flex align-items-center mb-2">
                              <div className="flex-grow">
                                <p className="mb-0">
                                  {employeeData.introductionAudio.name}
                                </p>
                                <small className="text-muted">
                                  Duration:{" "}
                                  {formatDuration(
                                    employeeData.introductionAudio.duration
                                  )}
                                </small>
                              </div>
                            </div>
                            <audio controls className="w-100 mt-2">
                              <source
                                src={employeeData.introductionAudio.url}
                                type="audio/mpeg"
                              />
                              Your browser does not support the audio element.
                            </audio>
                          </div>
                        ) : (
                          <div className="bg-light rounded-lg p-3 text-center text-muted">
                            No audio introduction available
                          </div>
                        )}
                      </div>

                      {/* Video Profile Section - Improved */}
                      <div>
                        <h6 className="fw-medium mb-3">Video Profile</h6>
                        {employeeData.profileVideo?.url ? (
                          <div className="rounded-lg overflow-hidden">
                            <div className="p-3">
                              <div className="d-flex align-items-center mb-2">
                                <div className="flex-grow">
                                  <p className="mb-0">
                                    {employeeData.profileVideo.name}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="ratio ratio-16x9">
                              <video
                                controls
                                className="w-100"
                                poster={
                                  employeeData.profileVideo.thumbnail ||
                                  employeeData.profileImage ||
                                  "images/img-profile.jpg"
                                }
                              >
                                <source
                                  src={employeeData.profileVideo.url}
                                  type="video/mp4"
                                />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-light rounded-lg p-3 text-center text-muted">
                            <div className="ratio ratio-16x9">
                              <img
                                src={
                                  employeeData.profileImage ||
                                  "images/img-profile.jpg"
                                }
                                alt="Profile"
                                className="img-fluid"
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                            <p className="mt-2 mb-0">
                              No video profile available
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="jobplugin__profile-box border border-dark shadow">
                    <div className="jobplugin__profile-box__head">
                      <div className="jobplugin__profile-box__heading">
                        <h2 className="h5">Personal Details</h2>
                        <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                      </div>
                      <div className="jobplugin__profile-box__buttons">
                        <Link
                          to={`/employee/edit/${employeeData._id}`}
                          className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                        >
                          <FaEdit />
                        </Link>
                      </div>
                    </div>
                    <div className="jobplugin__profile-box__body">
                      <div className="jobplugin__profile-box__list-textbox">
                        <p>
                          <strong>Gender:</strong>{" "}
                          {employeeData.gender || "Not specified"}
                        </p>
                        <p>
                          <strong>Date of Birth:</strong>{" "}
                          {formatDOB(employeeData.dob)}
                        </p>
                        <p>
                          <strong>Marital Status:</strong>{" "}
                          {employeeData.maritalStatus || "Not specified"}
                        </p>
                        <p>
                          <strong>Total Experience:</strong>{" "}
                          {employeeData.totalExperience || "Not specified"}
                        </p>
                        {employeeData.expectedSalary && (
                          <p>
                            <strong>Expected Salary:</strong> ₹
                            {employeeData.expectedSalary.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="jobplugin__profile-box border border-dark shadow">
                    <div className="jobplugin__profile-box__head">
                      <div className="jobplugin__profile-box__heading">
                        <h2 className="h5">Address</h2>
                        <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                      </div>
                      <div className="jobplugin__profile-box__buttons">
                        <Link
                          to={`/employee/edit/${employeeData._id}`}
                          className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                        >
                          <FaEdit />
                        </Link>
                      </div>
                    </div>
                    <div className="jobplugin__profile-box__body">
                      <div className="jobplugin__profile-box__list-textbox">
                        <p>
                          {employeeData.addressLine1 || "Address not specified"}
                        </p>
                        {employeeData.addressLine2 && (
                          <p>{employeeData.addressLine2}</p>
                        )}
                        <p>
                          {employeeData.city || ""}, {employeeData.state || ""}
                        </p>
                        <p>PIN: {employeeData.pincode || ""}</p>
                        {employeeData.preferredLocation && (
                          <p>
                            <strong>Preferred Location:</strong>{" "}
                            {employeeData.preferredLocation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {employeeData.gradeLevels?.length > 0 && (
                    <div className="jobplugin__profile-box border border-dark shadow">
                      <div className="jobplugin__profile-box__head">
                        <div className="jobplugin__profile-box__heading">
                          <h2 className="h5">Grade Levels</h2>
                          <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                        </div>
                        <div className="jobplugin__profile-box__buttons">
                          <Link
                            to={`/employee/edit/${employeeData._id}`}
                            className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                          >
                            <FaEdit />
                          </Link>
                        </div>
                      </div>
                      <div className="jobplugin__profile-box__body">
                        <div className="jobplugin__profile-box__skills">
                          {employeeData.gradeLevels.map((grade, index) => (
                            <span
                              key={index}
                              className="jobplugin__profile-box__skill-tag"
                            >
                              {grade}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </aside>

                <div className="jobplugin__profile-content border border-dark shadow">
                  <div className="jobplugin__profile-block">
                    <div className="jobplugin__profile-block__header">
                      <h2 className="h4">Profile Summary</h2>
                      <Link
                        to={`/employee/edit/${employeeData._id}`}
                        className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                      >
                        <FaEdit />
                      </Link>
                    </div>
                    <div className="jobplugin__profile-block__body">
                      <div className="jobplugin__profile-block__textarea">
                        <div className="jobplugin__profile-block__textbox">
                          <p>
                            {employeeData.profilesummary ||
                              employeeData.coverLetter ||
                              "No profile summary available."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="jobplugin__profile-block">
                    <div className="jobplugin__profile-block__header">
                      <h2 className="h4">Education</h2>
                      <Link
                        to={`/employee/edit/${employeeData._id}`}
                        className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                      >
                        <FaEdit />
                      </Link>
                    </div>
                    <div className="jobplugin__profile-block__body">
                      {employeeData.education?.length > 0 ? (
                        employeeData.education.map((edu, index) => (
                          <div
                            key={index}
                            className="jobplugin__profile-block__textarea mb-4"
                          >
                            <div className="jobplugin__profile-block__textbox">
                              <h3 className="h5">{edu.degree}</h3>
                              <p>{edu.institution}</p>
                              <p>
                                {edu.type} | {formatDate(edu.startDate)} -{" "}
                                {formatDate(edu.endDate)}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="jobplugin__profile-block__textarea">
                          <div className="jobplugin__profile-block__textbox">
                            <p>No education details added yet.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="jobplugin__profile-block">
                    <div className="jobplugin__profile-block__header">
                      <h2 className="h4">Work Experience</h2>
                      <Link
                        to={`/employee/edit/${employeeData._id}`}
                        className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                      >
                        <FaEdit />
                      </Link>
                    </div>
                    <div className="jobplugin__profile-block__body">
                      {employeeData.workExperience?.length > 0 ? (
                        employeeData.workExperience.map((exp, index) => (
                          <div
                            key={index}
                            className="jobplugin__profile-block__textarea mb-4"
                          >
                            <div className="jobplugin__profile-block__textbox">
                              <h3 className="h5">{exp.position}</h3>
                              <p>{exp.company}</p>
                              <p>
                                {exp.employmentType} |{" "}
                                {formatDate(exp.startDate)} -{" "}
                                {formatDate(exp.endDate)}
                              </p>
                              {exp.description && (
                                <p className="mt-2">{exp.description}</p>
                              )}
                            </div>
                          </div>
                        ))
                      ) : employeeData.totalExperience === "Fresher" ? (
                        <div className="jobplugin__profile-block__textarea">
                          <div className="jobplugin__profile-block__textbox">
                            <p>Fresher (No work experience)</p>
                          </div>
                        </div>
                      ) : (
                        <div className="jobplugin__profile-block__textarea">
                          <div className="jobplugin__profile-block__textbox">
                            <p>No work experience added yet.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="jobplugin__profile-block">
                    <div className="jobplugin__profile-block__header">
                      <h2 className="h4">Documents</h2>
                      <Link
                        to={`/employee/edit/${employeeData._id}`}
                        className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                      >
                        <FaEdit />
                      </Link>
                    </div>
                    <div className="jobplugin__profile-block__body">
                      <div className="jobplugin__profile-block__textarea">
                        <div className="jobplugin__profile-block__textbox">
                          {employeeData.resume?.url ? (
                            <p className="flex items-center">
                              <span className="font-semibold mr-2">
                                Resume:
                              </span>
                              <a
                                href={employeeData.resume.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center hover:text-primary"
                              >
                                <FaFilePdf className="mr-2" />
                                {employeeData.resume.name || "Download Resume"}
                              </a>
                            </p>
                          ) : (
                            <p>No resume uploaded yet.</p>
                          )}

                          {employeeData.coverLetterFile?.url ? (
                            <p className="flex items-center mt-2">
                              <span className="font-semibold mr-2">
                                Cover Letter:
                              </span>
                              <a
                                href={employeeData.coverLetterFile.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center hover:text-primary"
                              >
                                <FaFilePdf className="mr-2" />
                                {employeeData.coverLetterFile.name ||
                                  "Download Cover Letter"}
                              </a>
                            </p>
                          ) : (
                            <p>No resume cover letter uploaded yet.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="jobplugin__profile-block">
                    <div className="jobplugin__profile-block__header">
                      <h2 className="h4">Skills</h2>
                      <Link
                        to={`/employee/edit/${employeeData._id}`}
                        className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                      >
                        <FaEdit />
                      </Link>
                    </div>
                    <div className="jobplugin__profile-block__body">
                      {employeeData.skills?.length > 0 ? (
                        <ul className="jobplugin__settings-card__tags">
                          {employeeData.skills.map((skill, index) => (
                            <li key={index}>
                              <a
                                className="hover:jobplugin__bg-primary hover:jobplugin__text-white hover:jobplugin__border-primary"
                                href="#"
                              >
                                {skill}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="jobplugin__profile-block__textarea">
                          <div className="jobplugin__profile-block__textbox">
                            <p>No skills added yet</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="jobplugin__profile-block">
                    <div className="jobplugin__profile-block__header">
                      <h2 className="h4">Languages</h2>
                      <Link
                        to={`/employee/edit/${employeeData._id}`}
                        className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                      >
                        <FaEdit />
                      </Link>
                    </div>
                    <div className="jobplugin__profile-block__body">
                      {employeeData.languages?.length > 0 ? (
                        <div className="jobplugin__profile-block__textarea">
                          <div className="jobplugin__profile-block__textbox">
                            <div className="jobplugin__profile-box__skills">
                              {employeeData.languages.map((language, index) => (
                                <span
                                  key={index}
                                  className="jobplugin__profile-box__skill-tag"
                                >
                                  {language}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="jobplugin__profile-block__textarea">
                          <div className="jobplugin__profile-block__textbox">
                            <p>No languages added yet</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default EmployeProfile;
