import React, { useState, useEffect } from "react";
import axios from "axios";
import { editJob } from "../../../api/services/projectServices";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./richStyle.css";

const EditJobModal = ({ jobId, onClose, onJobUpdated }) => {
    const [activeTab, setActiveTab] = useState("basic-info");
    const [formData, setFormData] = useState({
        companyName: "",
        jobTitle: "",
        description: "",
        category: "",
        salaryFrom: "",
        salaryTo: "",
        salaryType: "month",
        jobType: "Full-time",
        experienceLevel: "",
        educationLevel: "",
        openings: "",
        locationTypes: [],
        location: "",
        isRemote: false,
        skills: [],
        benefits: "",
        contactEmail: "",
        contactPhone: "",
        companyUrl: "",
        applicationInstructions: "",
        deadline: "",
        priority: "",
    });

    const [newSkill, setNewSkill] = useState("");
    const [newLocationType, setNewLocationType] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch job details when modal opens
    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const token = localStorage.getItem("employerToken");
                const response = await axios.get(
                    `https://api.edprofio.com/employer/viewjobs/${jobId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const jobData = response.data;
                setFormData({
                    companyName: jobData.companyName || "",
                    jobTitle: jobData.jobTitle || "",
                    description: jobData.description || "",
                    category: jobData.category || "",
                    salaryFrom: jobData.salaryFrom || "",
                    salaryTo: jobData.salaryTo || "",
                    salaryType: jobData.salaryType || "month",
                    jobType: jobData.jobType || "Full-time",
                    experienceLevel: jobData.experienceLevel || "",
                    educationLevel: jobData.educationLevel || "",
                    openings: jobData.openings || "",
                    locationTypes: jobData.locationTypes || [],
                    location: jobData.location || "",
                    isRemote: jobData.isRemote || false,
                    skills: jobData.skills || [],
                    benefits: jobData.benefits || "",
                    contactEmail: jobData.contactEmail || "",
                    contactPhone: jobData.contactPhone || "",
                    companyUrl: jobData.companyUrl || "",
                    applicationInstructions: jobData.applicationInstructions || "",
                    deadline: jobData.deadline ? jobData.deadline.split("T")[0] : "",
                    priority: jobData.priority || "",
                });
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching job details:", error);
                alert("Failed to load job details");
                onClose();
            }
        };

        fetchJobDetails();
    }, [jobId, onClose]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleAddSkill = (skill) => {
        if (skill && !formData.skills.includes(skill)) {
            setFormData((prev) => ({
                ...prev,
                skills: [...prev.skills, skill],
            }));
            setNewSkill("");
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.filter((skill) => skill !== skillToRemove),
        }));
    };

    const handleAddLocationType = (type) => {
        if (type && !formData.locationTypes.includes(type)) {
            setFormData((prev) => ({
                ...prev,
                locationTypes: [...prev.locationTypes, type],
            }));
            setNewLocationType("");
        }
    };

    const handleRemoveLocationType = (typeToRemove) => {
        setFormData((prev) => ({
            ...prev,
            locationTypes: prev.locationTypes.filter((type) => type !== typeToRemove),
        }));
    };

    // Rich text editor configuration
    const quillModules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            ["link"],
            ["clean"],
        ],
    };

    const quillFormats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "bullet",
        "indent",
        "link",
    ];

    const handleRichChange = (field) => (content) => {
        setFormData((prev) => ({ ...prev, [field]: content }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const token = localStorage.getItem("employerToken");

            const payload = {
                ...formData,
                deadline: formData.deadline
                    ? new Date(formData.deadline).toISOString()
                    : null,
            };

            const response = await editJob(jobId, payload);

            onJobUpdated(response.data);
            toast.success('Job updated successfully!');
            onClose();
        } catch (error) {
            console.error("Error updating job:", error);
            toast.error("Failed to update job. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div
                className="modal fade show"
                style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-body text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mt-3">Loading job details...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Edit Job</h4>
                        <button
                            type="button"
                            className="btn-close custom-btn-close"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            <X />
                        </button>
                    </div>

                    <div className="modal-body pb-0">
                        <div className="row">
                            <div className="contact-grids-tab pt-0">
                                <ul className="nav nav-underline" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className={`nav-link ${activeTab === "basic-info" ? "active" : ""
                                                }`}
                                            onClick={() => setActiveTab("basic-info")}
                                        >
                                            Basic Information
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className={`nav-link ${activeTab === "address" ? "active" : ""
                                                }`}
                                            onClick={() => setActiveTab("address")}
                                        >
                                            Location
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            <div className="tab-content" id="myTabContent">
                                {activeTab === "basic-info" && (
                                    <div className="tab-pane fade show active">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Company Name <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="companyName"
                                                        value={formData.companyName}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Job Title <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="jobTitle"
                                                        value={formData.jobTitle}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Job Description{" "}
                                                        <span className="text-danger">*</span>
                                                    </label>
                                                    <div className="quill-wrapper">
                                                        <ReactQuill
                                                            theme="snow"
                                                            value={formData.description}
                                                            onChange={handleRichChange("description")}
                                                            modules={quillModules}
                                                            formats={quillFormats}
                                                            placeholder="Detailed job description"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Category <span className="text-danger">*</span>
                                                    </label>
                                                    <select
                                                        className="form-select"
                                                        name="category"
                                                        value={formData.category}
                                                        onChange={handleInputChange}
                                                        required
                                                    >
                                                        <option value="">Select Category</option>
                                                        <option value="IT">IT</option>
                                                        <option value="Marketing">Marketing</option>
                                                        <option value="Finance">Finance</option>
                                                        <option value="Education">Education</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Job Type</label>
                                                    <select
                                                        className="form-select"
                                                        name="jobType"
                                                        value={formData.jobType}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">Select Job Type</option>
                                                        <option value="Full-time">Full-time</option>
                                                        <option value="Part-time">Part-time</option>
                                                        <option value="Contract">Contract</option>
                                                        <option value="Internship">Internship</option>
                                                        <option value="Temporary">Temporary</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Experience Level</label>
                                                    <select
                                                        className="form-select"
                                                        name="experienceLevel"
                                                        value={formData.experienceLevel}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">Select Experience Level</option>
                                                        <option value="Entry Level">Entry Level</option>
                                                        <option value="Mid Level">Mid Level</option>
                                                        <option value="Senior Level">Senior Level</option>
                                                        <option value="Executive">Executive</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Education Level</label>
                                                    <select
                                                        className="form-select"
                                                        name="educationLevel"
                                                        value={formData.educationLevel}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">Select Education Level</option>
                                                        <option value="High School">High School</option>
                                                        <option value="Diploma">Diploma</option>
                                                        <option value="Bachelor's">Bachelor's</option>
                                                        <option value="Master's">Master's</option>
                                                        <option value="PhD">PhD</option>
                                                        <option value="None">None</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Salary From <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="salaryFrom"
                                                        value={formData.salaryFrom}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Salary To <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="salaryTo"
                                                        value={formData.salaryTo}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">Salary Type</label>
                                                    <select
                                                        className="form-select"
                                                        name="salaryType"
                                                        value={formData.salaryType}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">Type</option>
                                                        <option value="Monthly">Per Monthly</option>
                                                        <option value="Yearly">LPA</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Number of Openings
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="openings"
                                                        value={formData.openings}
                                                        onChange={handleInputChange}
                                                        min="1"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Application Deadline
                                                    </label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        name="deadline"
                                                        value={formData.deadline}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Skills</label>
                                                    <div className="d-flex align-items-center">
                                                        <input
                                                            type="text"
                                                            className="form-control me-2"
                                                            placeholder="Add skill and press Enter"
                                                            value={newSkill}
                                                            onChange={(e) => setNewSkill(e.target.value)}
                                                            onKeyPress={(e) => {
                                                                if (e.key === "Enter") {
                                                                    e.preventDefault();
                                                                    handleAddSkill(newSkill);
                                                                }
                                                            }}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary"
                                                            onClick={() => handleAddSkill(newSkill)}
                                                        >
                                                            Add
                                                        </button>
                                                    </div>
                                                    <div className="mt-2">
                                                        {formData.skills.map((skill, index) => (
                                                            <span
                                                                key={index}
                                                                className="badge bg-light me-1 mb-1"
                                                            >
                                                                {skill}
                                                                <button
                                                                    type="button"
                                                                    className="btn-close btn-close-white ms-1"
                                                                    onClick={() => handleRemoveSkill(skill)}
                                                                    style={{ fontSize: "0.5rem" }}
                                                                />
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Contact Email</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        name="contactEmail"
                                                        value={formData.contactEmail}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Contact Phone</label>
                                                    <input
                                                        type="tel"
                                                        className="form-control"
                                                        name="contactPhone"
                                                        value={formData.contactPhone}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Company Website</label>
                                                    <input
                                                        type="url"
                                                        className="form-control"
                                                        name="companyUrl"
                                                        value={formData.companyUrl}
                                                        onChange={handleInputChange}
                                                        placeholder="https://example.com"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Benefits</label>
                                                    <div className="quill-wrapper">
                                                        <ReactQuill
                                                            theme="snow"
                                                            value={formData.benefits}
                                                            onChange={handleRichChange("benefits")}
                                                            modules={quillModules}
                                                            formats={quillFormats}
                                                            placeholder="Describe any benefits or perks"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Application Instructions
                                                    </label>
                                                    <div className="quill-wrapper">
                                                        <ReactQuill
                                                            theme="snow"
                                                            value={formData.applicationInstructions}
                                                            onChange={handleRichChange("applicationInstructions")}
                                                            modules={quillModules}
                                                            formats={quillFormats}
                                                            placeholder="Special instructions for applicants"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "address" && (
                                    <div className="tab-pane fade show active">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Location <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="location"
                                                        value={formData.location}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter job location (e.g., Bangalore, Karnataka)"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Location Types</label>
                                                    <div className="d-flex align-items-center">
                                                        <input
                                                            type="text"
                                                            className="form-control me-2"
                                                            placeholder="Add location type and press Enter"
                                                            value={newLocationType}
                                                            onChange={(e) =>
                                                                setNewLocationType(e.target.value)
                                                            }
                                                            onKeyPress={(e) => {
                                                                if (e.key === "Enter") {
                                                                    e.preventDefault();
                                                                    handleAddLocationType(newLocationType);
                                                                }
                                                            }}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary"
                                                            onClick={() =>
                                                                handleAddLocationType(newLocationType)
                                                            }
                                                        >
                                                            Add
                                                        </button>
                                                    </div>
                                                    <div className="mt-2">
                                                        {formData.locationTypes.map((type, index) => (
                                                            <span
                                                                key={index}
                                                                className="badge bg-light me-1 mb-1"
                                                            >
                                                                {type}
                                                                <button
                                                                    type="button"
                                                                    className="btn-close btn-close-white ms-1"
                                                                    onClick={() => handleRemoveLocationType(type)}
                                                                    style={{ fontSize: "0.5rem" }}
                                                                />
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <div className="form-check form-switch">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="remoteCheck"
                                                            name="isRemote"
                                                            checked={formData.isRemote || false}
                                                            onChange={handleInputChange}
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="remoteCheck"
                                                        >
                                                            This is a Remote Job
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-light me-2"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={
                                activeTab === "basic-info"
                                    ? () => setActiveTab("address")
                                    : handleSubmit
                            }
                        >
                            {activeTab === "basic-info" ? "Save & Next" : "Update Job"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditJobModal;
