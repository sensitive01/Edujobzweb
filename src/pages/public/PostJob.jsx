import React, { useState } from 'react';
import { postJob } from '../../api/services/projectServices';
import { useNavigate } from 'react-router-dom';
const PostJob = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    description: '',
    category: '',
    salaryFrom: '',
    salaryTo: '',
    salaryType: '',
    jobType: '',
    experienceLevel: '',
    educationLevel: '',
    openings: '',
    locationTypes: [],
    location: '',
    isRemote: false,
    skills: [],
    benefits: '',
    contactEmail: '',
    contactPhone: '',
    companyUrl: '',
    applicationInstructions: '',
    deadline: '',
    priority: '',
    status: 'Active'
  });

  const [skillsInput, setSkillsInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSkillsChange = (e) => {
    setSkillsInput(e.target.value);
  };

  const addSkill = () => {
    if (skillsInput.trim() && !formData.skills.includes(skillsInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillsInput.trim()]
      }));
      setSkillsInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const employid = localStorage.getItem('employid');
    if(!employid){
      alert('unable to create the job, Please login first');
      navigate('/login');
      setLoading(false);
        return;
    }
    try {
      await postJob(formData);
      setSuccess(true);
      setFormData({
        companyName: '',
        jobTitle: '',
        description: '',
        category: '',
        salaryFrom: '',
        salaryTo: '',
        salaryType: '',
        jobType: '',
        experienceLevel: '',
        educationLevel: '',
        openings: '',
        locationTypes: [],
        location: '',
        isRemote: false,
        skills: [],
        benefits: '',
        contactEmail: '',
        contactPhone: '',
        companyUrl: '',
        applicationInstructions: '',
        deadline: '',
        priority: '',
        status: 'Active'
      });
      navigate('/job-vacancies');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Sub Visual of the page */}
      <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 pt-lg-150 pb-30 text-white">
        <div className="container position-relative text-center">
          <div className="row">
            <div className="col-12">
              <div className="subvisual-textbox">
                <h1 className="text-primary mb-0">Post a Job Vacancy for FREE</h1>
                <p>Feel free to get in touch with us. Need Help?</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="jobplugin__main">
        <div className="jobplugin__main-holder">
          <span className="jobplugin__pattern default-right"></span>
          <span className="jobplugin__pattern default-left"></span>
          <div className="jobplugin__visual-pattern">
            <img src="images/visual-pattern.png" alt="Image Description" />
          </div>
          <br />
          <div className="jobplugin__container">
            {/* User Box */}
            <div className="jobplugin__userbox bg-light shadow">
              <span className="jobplugin__userbox-bar jobplugin__bg-primary"></span>
              <h1 className="text-secondary h3">Job Details</h1>

              {/* Success message */}
              {success && (
                <div className="alert alert-success">
                  Job posted successfully!
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              {/* User Box Form */}
              <form onSubmit={handleSubmit}>
                <div className="jobplugin__form">
                  {/* Company Name */}
                  <label htmlFor="companyName">&nbsp;&nbsp;Company Name</label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        style={{ padding: '5px 30px' }}
                        className="form-control"
                        placeholder="Company Name"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Job Title */}
                  <label htmlFor="jobTitle">&nbsp;&nbsp;Job Title</label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <input
                        type="text"
                        name="jobTitle"
                        className="form-control"
                        style={{ padding: '5px 30px' }}
                        placeholder="Job Title"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Job Description */}
                  <label htmlFor="description">&nbsp;&nbsp;Job Description</label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <textarea
                        rows="5"
                        name="description"
                        className="form-control"
                        placeholder="Detailed job description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                  </div>

                  {/* Category */}
                  <label htmlFor="category">&nbsp;&nbsp;Category</label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <select
                        name='category'
                        className="form-control"
                        value={formData.category}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Category Type</option>
                        <option value="IT">IT</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Finance">Finance</option>
                        <option value="Education">Education</option>
                      </select>
                    </div>
                  </div>

                  {/* Job Type */}
                  <label htmlFor="jobType">&nbsp;&nbsp;Job Type</label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <select
                        name="jobType"
                        className="form-control"
                        value={formData.jobType}
                        onChange={handleChange}
                        required
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

                  {/* Experience Level */}
                  <label htmlFor="experienceLevel">&nbsp;&nbsp;Experience Level</label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <select
                        name="experienceLevel"
                        className="form-control"
                        value={formData.experienceLevel}
                        onChange={handleChange}
                      >
                        <option value="">Select Experience Level</option>
                        <option value="Entry Level">Entry Level</option>
                        <option value="Mid Level">Mid Level</option>
                        <option value="Senior Level">Senior Level</option>
                        <option value="Executive">Executive</option>
                      </select>
                    </div>
                  </div>

                  {/* Education Level */}
                  <label htmlFor="educationLevel">&nbsp;&nbsp;Education Level</label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <select
                        name="educationLevel"
                        className="form-control"
                        value={formData.educationLevel}
                        onChange={handleChange}
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

                  {/* Salary Information */}
                  <label>&nbsp;&nbsp;Salary Information</label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <input
                        type="text"
                        name="salaryFrom"
                        className="form-control"
                        style={{ padding: '5px 30px' }}
                        placeholder="From"
                        value={formData.salaryFrom}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="jobplugin__form-field">
                      <input
                        type="text"
                        name="salaryTo"
                        className="form-control"
                        style={{ padding: '5px 30px' }}
                        placeholder="To"
                        value={formData.salaryTo}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="jobplugin__form-field">
                      <select
                        name="salaryType"
                        className="form-control"
                        value={formData.salaryType}
                        onChange={handleChange}
                      >
                        <option value="">Type</option>
                        <option value="Monthly">Per Monthly</option>
                        <option value="Yearly">LPA</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Openings */}
                  <label htmlFor="openings">&nbsp;&nbsp;Number of Openings</label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <input
                        type="text"
                        name="openings"
                        className="form-control"
                        style={{ padding: '5px 30px' }}
                        placeholder="Number of positions available"
                        value={formData.openings}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Location Information */}
                  <label>&nbsp;&nbsp;Location Information</label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <input
                        type="text"
                        name="location"
                        className="form-control"
                        style={{ padding: '5px 30px' }}
                        placeholder="Location (e.g., City, State)"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="jobplugin__form-field">
                      <label>
                        <input
                          type="checkbox"
                          name="isRemote"
                          checked={formData.isRemote}
                          onChange={handleChange}
                        /> Remote Work Available
                      </label>
                    </div>
                  </div>

                  {/* Skills */}
                  <label htmlFor="skills">&nbsp;&nbsp;Required Skills</label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <div className="skills-input-container">
                        <input
                          type="text"
                          value={skillsInput}
                          onChange={handleSkillsChange}
                          className="form-control"
                          style={{ padding: '5px 30px' }}
                          placeholder="Add skills (press Enter or click Add)"
                        />
                        <button
                          type="button"
                          className="btn btn-sm btn-primary ml-2"
                          onClick={addSkill}
                        >
                          Add
                        </button>
                      </div>
                      <div className="skills-tags mt-2">
                        {formData.skills.map((skill, index) => (
                          <span key={index} className="skill-tag">
                            {skill}
                            <button
                              type="button"
                              className="skill-remove"
                              onClick={() => removeSkill(skill)}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <label htmlFor="benefits">&nbsp;&nbsp;Benefits</label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <textarea
                        rows="3"
                        name="benefits"
                        className="form-control"
                        placeholder="Describe benefits offered"
                        value={formData.benefits}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <label>&nbsp;&nbsp;Contact Information</label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <input
                        type="email"
                        name="contactEmail"
                        className="form-control"
                        style={{ padding: '5px 30px' }}
                        placeholder="Contact Email"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="jobplugin__form-field">
                      <input
                        type="text"
                        name="contactPhone"
                        className="form-control"
                        style={{ padding: '5px 30px' }}
                        placeholder="Contact Phone"
                        value={formData.contactPhone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Company URL */}
                  <label htmlFor="companyUrl">&nbsp;&nbsp;Company Website</label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <input
                        type="url"
                        name="companyUrl"
                        className="form-control"
                        style={{ padding: '5px 30px' }}
                        placeholder="Company Website URL"
                        value={formData.companyUrl}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Application Instructions */}
                  <label htmlFor="applicationInstructions">&nbsp;&nbsp;Application Instructions</label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <textarea
                        rows="3"
                        name="applicationInstructions"
                        className="form-control"
                        placeholder="How should candidates apply?"
                        value={formData.applicationInstructions}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>

                  {/* Deadline */}
                  <label htmlFor="deadline">&nbsp;&nbsp;Application Deadline</label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <input
                        type="date"
                        name="deadline"
                        className="form-control"
                        style={{ padding: '5px 30px' }}
                        value={formData.deadline}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Priority */}
                  <label htmlFor="priority">&nbsp;&nbsp;Priority</label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <select
                        name="priority"
                        className="form-control"
                        value={formData.priority}
                        onChange={handleChange}
                      >
                        <option value="">Select Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </div>

                  {/* Status */}
                  <label htmlFor="status">&nbsp;&nbsp;Status</label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <select
                        name="status"
                        className="form-control"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Draft">Draft</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="jobplugin__userbox-button">
                  <button
                    type="submit"
                    className="jobplugin__button large jobplugin__bg-primary hover:jobplugin__bg-secondary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <i className="icon icon-spinner spinner" style={{ fontSize: '14px' }}></i>
                        &nbsp;Posting Job...
                      </>
                    ) : (
                      <>
                        <i className="icon icon-check-circle text-primary" style={{ fontSize: '14px' }}></i>
                        &nbsp;Post Job
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <br />
        </div>
      </main>

      {/* Add some CSS for the skills tags */}
      <style jsx>{`
        .skills-input-container {
          display: flex;
          align-items: center;
        }
        
        .skills-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }
        
        .skill-tag {
          background-color: #e0e0e0;
          padding: 3px 8px;
          border-radius: 4px;
          display: flex;
          align-items: center;
        }
        
        .skill-remove {
          background: none;
          border: none;
          cursor: pointer;
          margin-left: 5px;
          color: #666;
        }
        
        .skill-remove:hover {
          color: #f00;
        }
      `}</style>
    </div>
  );
};


export default PostJob;