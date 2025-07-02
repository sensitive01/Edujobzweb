import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaUpload, FaTrash, FaEdit, FaLink, FaFilePdf, FaChevronDown } from 'react-icons/fa';
import { getEmployeeDetails, updateEmployeeProfile, uploadEmployeeFile } from '../../api/services/projectServices';

const EmployeeerEditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState({
    userName: '',
    userEmail: '',
    userMobile: '',
    profileImage: '',
    gender: '',
    dob: '',
    maritalStatus: '',
    totalExperience: '',
    expectedSalary: '',
    specialization: '',
    profilesummary: '',
    coverLetter: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    preferredLocation: '',
    linkedin: '',
    github: '',
    portfolio: '',
    skills: [],
    languages: [],
    gradeLevels: [],
    education: [],
    workExperience: [],
    resume: { url: '', name: '' },
    coverLetterFile: { url: '', name: '' }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetterFile, setCoverLetterFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newGradeLevel, setNewGradeLevel] = useState('');
  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    type: '',
    startDate: '',
    endDate: ''
  });
  const [newExperience, setNewExperience] = useState({
    position: '',
    company: '',
    employmentType: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          navigate('/login');
          return;
        }
        const data = await getEmployeeDetails(id, token);
        setEmployeeData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch employee data');
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData(prev => ({
      ...prev,
      [name]: value
    }));
    setIsFormDirty(true);
  };

  const handleArrayChange = (e, arrayName) => {
    const { value } = e.target;
    setEmployeeData(prev => ({
      ...prev,
      [arrayName]: value.split(',').map(item => item.trim())
    }));
    setIsFormDirty(true);
  };

  const handleAddSkill = () => {
    if (newSkill && !employeeData.skills.includes(newSkill)) {
      setEmployeeData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
      setNewSkill('');
      setIsFormDirty(true);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEmployeeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
    setIsFormDirty(true);
  };

  const handleAddLanguage = () => {
    if (newLanguage && !employeeData.languages.includes(newLanguage)) {
      setEmployeeData(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage]
      }));
      setNewLanguage('');
      setIsFormDirty(true);
    }
  };

  const handleRemoveLanguage = (languageToRemove) => {
    setEmployeeData(prev => ({
      ...prev,
      languages: prev.languages.filter(language => language !== languageToRemove)
    }));
    setIsFormDirty(true);
  };

  const handleAddGradeLevel = () => {
    if (newGradeLevel && !employeeData.gradeLevels.includes(newGradeLevel)) {
      setEmployeeData(prev => ({
        ...prev,
        gradeLevels: [...prev.gradeLevels, newGradeLevel]
      }));
      setNewGradeLevel('');
      setIsFormDirty(true);
    }
  };

  const handleRemoveGradeLevel = (gradeToRemove) => {
    setEmployeeData(prev => ({
      ...prev,
      gradeLevels: prev.gradeLevels.filter(grade => grade !== gradeToRemove)
    }));
    setIsFormDirty(true);
  };

  const handleAddEducation = () => {
    if (newEducation.degree && newEducation.institution) {
      setEmployeeData(prev => ({
        ...prev,
        education: [...prev.education, newEducation]
      }));
      setNewEducation({
        degree: '',
        institution: '',
        type: '',
        startDate: '',
        endDate: ''
      });
      setIsFormDirty(true);
    }
  };

  const handleRemoveEducation = (indexToRemove) => {
    setEmployeeData(prev => ({
      ...prev,
      education: prev.education.filter((_, index) => index !== indexToRemove)
    }));
    setIsFormDirty(true);
  };

  const handleAddExperience = () => {
    if (newExperience.position && newExperience.company) {
      setEmployeeData(prev => ({
        ...prev,
        workExperience: [...prev.workExperience, newExperience]
      }));
      setNewExperience({
        position: '',
        company: '',
        employmentType: '',
        startDate: '',
        endDate: '',
        description: ''
      });
      setIsFormDirty(true);
    }
  };

  const handleRemoveExperience = (indexToRemove) => {
    setEmployeeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, index) => index !== indexToRemove)
    }));
    setIsFormDirty(true);
  };

  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.match('image.*')) {
        setError('Please select an image file');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setError('Image size should be less than 2MB');
        return;
      }
      
      setProfilePicFile(file);
      setIsFormDirty(true);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setEmployeeData(prev => ({
          ...prev,
          profileImage: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.match('application/pdf')) {
        setError('Please select a PDF file for resume');
        return;
      }
      setResumeFile(file);
      setIsFormDirty(true);
      
      setEmployeeData(prev => ({
        ...prev,
        resume: {
          ...prev.resume,
          name: file.name
        }
      }));
    }
  };

  const handleCoverLetterChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.match('application/pdf')) {
        setError('Please select a PDF file for cover letter');
        return;
      }
      setCoverLetterFile(file);
      setIsFormDirty(true);
      
      setEmployeeData(prev => ({
        ...prev,
        coverLetterFile: {
          ...prev.coverLetterFile,
          name: file.name
        }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormDirty) {
      setError('No changes detected');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      setUploading(true);

      // First upload files if changed
      if (profilePicFile) {
        const profileFormData = new FormData();
        profileFormData.append('file', profilePicFile);
        const updatedProfile = await uploadEmployeeFile(id, profileFormData, 'profile', token);
        setEmployeeData(prev => ({ ...prev, ...updatedProfile }));
      }

      if (resumeFile) {
        const resumeFormData = new FormData();
        resumeFormData.append('file', resumeFile);
        const updatedResume = await uploadEmployeeFile(id, resumeFormData, 'resume', token);
        setEmployeeData(prev => ({ ...prev, resume: updatedResume.resume }));
      }

      if (coverLetterFile) {
        const coverFormData = new FormData();
        coverFormData.append('file', coverLetterFile);
        const updatedCover = await uploadEmployeeFile(id, coverFormData, 'coverLetter', token);
        setEmployeeData(prev => ({ ...prev, coverLetterFile: updatedCover.coverLetterFile }));
      }

      // Then update other details
      await updateEmployeeProfile(id, employeeData, token);
      navigate('/dashboard', { state: { success: 'Profile updated successfully' } });
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">Loading...</div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
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
                        src={employeeData.profileImage || employeeData.userProfilePic || 'images/img-profile.jpg'}
                        alt={employeeData.userName}
                      />
                    </div>
                    <label
                      htmlFor="profilePicUpload"
                      className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                    >
                      <FaUpload />
                      <input 
                        type="file" 
                        id="profilePicUpload" 
                        className="d-none" 
                        onChange={handleProfilePicChange}
                        accept="image/*"
                      />
                    </label>
                  </div>
                  <div className="jobplugin__profile-intro__Textbox">
                    <div className="jobplugin__profile-intro__info mb-0">
                      <h1 className="h5">{employeeData.userName}</h1>
                    </div>
                    <address className="jobplugin__profile-intro__address">
                      {employeeData.currentCity || employeeData.city || 'Location not specified'}
                    </address>
                    {employeeData.specialization && (
                      <div className="jobplugin__profile-intro__specialization">
                        {employeeData.specialization}
                      </div>
                    )}
                  </div>
                </div>
                <div className="jobplugin__profile-intro__right">
                  <button 
                    onClick={() => navigate(`/employee/details/${id}`)}
                    className="jobplugin__button jobplugin__bg-white jobplugin__border-primary hover:jobplugin__bg-white small text-black"
                  >
                    <FaArrowLeft /> &nbsp; Back to Profile
                  </button>
                  <button
                    type="submit"
                    form="profileForm"
                    disabled={uploading || !isFormDirty}
                    className="jobplugin__button border-dark shadow bg-primary hover:jobplugin__bg-secondary small"
                  >
                    {uploading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave /> &nbsp; Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>

              <form id="profileForm" onSubmit={handleSubmit}>
                <div className="jobplugin__profile-container">
                  <aside className="jobplugin__profile-aside">
                    <div className="jobplugin__profile-box border border-dark shadow">
                      <div className="jobplugin__profile-box__head">
                        <div className="jobplugin__profile-box__heading">
                          <h2 className="h5">Contact Info</h2>
                          <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                        </div>
                      </div>
                      <div className="jobplugin__profile-box__body">
                        <div className="form-group mb-3">
                          <label>Full Name*</label>
                          <input
                            type="text"
                            className="form-control"
                            name="userName"
                            value={employeeData.userName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Email*</label>
                          <input
                            type="email"
                            className="form-control"
                            name="userEmail"
                            value={employeeData.userEmail}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Phone</label>
                          <input
                            type="tel"
                            className="form-control"
                            name="userMobile"
                            value={employeeData.userMobile || ''}
                            onChange={handleChange}
                            pattern="[0-9]{10}"
                            title="Please enter a 10-digit mobile number"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>LinkedIn</label>
                          <input
                            type="url"
                            className="form-control"
                            name="linkedin"
                            value={employeeData.linkedin || ''}
                            onChange={handleChange}
                            placeholder="https://linkedin.com/in/yourprofile"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>GitHub</label>
                          <input
                            type="url"
                            className="form-control"
                            name="github"
                            value={employeeData.github || ''}
                            onChange={handleChange}
                            placeholder="https://github.com/yourusername"
                          />
                        </div>
                        <div className="form-group">
                          <label>Portfolio</label>
                          <input
                            type="url"
                            className="form-control"
                            name="portfolio"
                            value={employeeData.portfolio || ''}
                            onChange={handleChange}
                            placeholder="https://yourportfolio.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="jobplugin__profile-box border border-dark shadow">
                      <div className="jobplugin__profile-box__head">
                        <div className="jobplugin__profile-box__heading">
                          <h2 className="h5">Documents</h2>
                          <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                        </div>
                      </div>
                      <div className="jobplugin__profile-box__body">
                        <div className="form-group mb-3">
                          <label>Resume (PDF)</label>
                          <div className="input-group">
                            <input
                              type="file"
                              className="form-control"
                              onChange={handleResumeChange}
                              accept="application/pdf"
                            />
                          </div>
                          {employeeData.resume?.name && (
                            <small className="text-muted">Current: {employeeData.resume.name}</small>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Cover Letter (PDF)</label>
                          <div className="input-group">
                            <input
                              type="file"
                              className="form-control"
                              onChange={handleCoverLetterChange}
                              accept="application/pdf"
                            />
                          </div>
                          {employeeData.coverLetterFile?.name && (
                            <small className="text-muted">Current: {employeeData.coverLetterFile.name}</small>
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
                      </div>
                      <div className="jobplugin__profile-box__body">
                        <div className="form-group mb-3">
                          <label>Specialization</label>
                          <input
                            type="text"
                            className="form-control"
                            name="specialization"
                            value={employeeData.specialization || ''}
                            onChange={handleChange}
                            placeholder="Your area of expertise"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Gender</label>
                          <div className="position-relative">
                            <select
                              className="form-control"
                              name="gender"
                              value={employeeData.gender || ''}
                              onChange={handleChange}
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                            <FaChevronDown className="position-absolute end-0 top-50 translate-middle-y me-3" />
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <label>Date of Birth</label>
                          <input
                            type="date"
                            className="form-control"
                            name="dob"
                            value={employeeData.dob || ''}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Marital Status</label>
                          <div className="position-relative">
                            <select
                              className="form-control"
                              name="maritalStatus"
                              value={employeeData.maritalStatus || ''}
                              onChange={handleChange}
                            >
                              <option value="">Select Status</option>
                              <option value="Single">Single</option>
                              <option value="Married">Married</option>
                              <option value="Divorced">Divorced</option>
                              <option value="Widowed">Widowed</option>
                            </select>
                            <FaChevronDown className="position-absolute end-0 top-50 translate-middle-y me-3" />
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <label>Total Experience</label>
                          <input
                            type="text"
                            className="form-control"
                            name="totalExperience"
                            value={employeeData.totalExperience || ''}
                            onChange={handleChange}
                            placeholder="e.g., 5 years or Fresher"
                          />
                        </div>
                        <div className="form-group">
                          <label>Expected Salary (₹)</label>
                          <input
                            type="number"
                            className="form-control"
                            name="expectedSalary"
                            value={employeeData.expectedSalary || ''}
                            onChange={handleChange}
                            placeholder="Expected salary in INR"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="jobplugin__profile-box border border-dark shadow">
                      <div className="jobplugin__profile-box__head">
                        <div className="jobplugin__profile-box__heading">
                          <h2 className="h5">Address</h2>
                          <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                        </div>
                      </div>
                      <div className="jobplugin__profile-box__body">
                        <div className="form-group mb-3">
                          <label>Address Line 1</label>
                          <input
                            type="text"
                            className="form-control"
                            name="addressLine1"
                            value={employeeData.addressLine1 || ''}
                            onChange={handleChange}
                            placeholder="Street address, P.O. box, company name"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Address Line 2</label>
                          <input
                            type="text"
                            className="form-control"
                            name="addressLine2"
                            value={employeeData.addressLine2 || ''}
                            onChange={handleChange}
                            placeholder="Apartment, suite, unit, building, floor, etc."
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>City</label>
                          <input
                            type="text"
                            className="form-control"
                            name="city"
                            value={employeeData.city || ''}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>State</label>
                          <input
                            type="text"
                            className="form-control"
                            name="state"
                            value={employeeData.state || ''}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>PIN Code</label>
                          <input
                            type="text"
                            className="form-control"
                            name="pincode"
                            value={employeeData.pincode || ''}
                            onChange={handleChange}
                            pattern="[0-9]{6}"
                            title="6-digit PIN code"
                          />
                        </div>
                        <div className="form-group">
                          <label>Preferred Location</label>
                          <input
                            type="text"
                            className="form-control"
                            name="preferredLocation"
                            value={employeeData.preferredLocation || ''}
                            onChange={handleChange}
                            placeholder="Preferred work location if different"
                          />
                        </div>
                      </div>
                    </div>
                  </aside>

                  <div className="jobplugin__profile-content border border-dark shadow">
                    <div className="jobplugin__profile-block">
                      <div className="jobplugin__profile-block__header">
                        <h2 className="h4">Profile Summary</h2>
                      </div>
                      <div className="jobplugin__profile-block__body">
                        <div className="form-group">
                          <textarea
                            className="form-control"
                            name="profilesummary"
                            rows="5"
                            value={employeeData.profilesummary || employeeData.coverLetter || ''}
                            onChange={handleChange}
                            placeholder="Write a brief summary about yourself and your career objectives"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="jobplugin__profile-block">
                      <div className="jobplugin__profile-block__header">
                        <h2 className="h4">Skills</h2>
                      </div>
                      <div className="jobplugin__profile-block__body">
                        <div className="form-group mb-3">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              value={newSkill}
                              onChange={(e) => setNewSkill(e.target.value)}
                              placeholder="Add a new skill"
                            />
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleAddSkill}
                            >
                              Add
                            </button>
                          </div>
                        </div>
                        <div className="jobplugin__profile-box__skills">
                          {employeeData.skills?.map((skill, index) => (
                            <span key={index} className="jobplugin__profile-box__skill-tag">
                              {skill}
                              <button
                                type="button"
                                className="btn btn-sm p-0 ms-2 text-white"
                                onClick={() => handleRemoveSkill(skill)}
                              >
                                <FaTrash size={10} />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="jobplugin__profile-block">
                      <div className="jobplugin__profile-block__header">
                        <h2 className="h4">Languages</h2>
                      </div>
                      <div className="jobplugin__profile-block__body">
                        <div className="form-group mb-3">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              value={newLanguage}
                              onChange={(e) => setNewLanguage(e.target.value)}
                              placeholder="Add a new language"
                            />
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleAddLanguage}
                            >
                              Add
                            </button>
                          </div>
                        </div>
                        <div className="jobplugin__profile-box__skills">
                          {employeeData.languages?.map((language, index) => (
                            <span key={index} className="jobplugin__profile-box__skill-tag">
                              {language}
                              <button
                                type="button"
                                className="btn btn-sm p-0 ms-2 text-white"
                                onClick={() => handleRemoveLanguage(language)}
                              >
                                <FaTrash size={10} />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="jobplugin__profile-block">
                      <div className="jobplugin__profile-block__header">
                        <h2 className="h4">Grade Levels</h2>
                      </div>
                      <div className="jobplugin__profile-block__body">
                        <div className="form-group mb-3">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              value={newGradeLevel}
                              onChange={(e) => setNewGradeLevel(e.target.value)}
                              placeholder="Add a grade level (e.g., Class 1, Class 2)"
                            />
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleAddGradeLevel}
                            >
                              Add
                            </button>
                          </div>
                        </div>
                        <div className="jobplugin__profile-box__skills">
                          {employeeData.gradeLevels?.map((grade, index) => (
                            <span key={index} className="jobplugin__profile-box__skill-tag">
                              {grade}
                              <button
                                type="button"
                                className="btn btn-sm p-0 ms-2 text-white"
                                onClick={() => handleRemoveGradeLevel(grade)}
                              >
                                <FaTrash size={10} />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="jobplugin__profile-block">
                      <div className="jobplugin__profile-block__header">
                        <h2 className="h4">Education</h2>
                      </div>
                      <div className="jobplugin__profile-block__body">
                        <div className="form-group mb-4">
                          <div className="row g-3">
                            <div className="col-md-6">
                              <label className="form-label">Degree</label>
                              <input
                                type="text"
                                className="form-control"
                                value={newEducation.degree}
                                onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                                placeholder="Degree/Certificate"
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Institution</label>
                              <input
                                type="text"
                                className="form-control"
                                value={newEducation.institution}
                                onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
                                placeholder="School/University"
                              />
                            </div>
                            <div className="col-md-4">
                              <label className="form-label">Type</label>
                              <div className="position-relative">
                                <select
                                  className="form-control"
                                  value={newEducation.type}
                                  onChange={(e) => setNewEducation({...newEducation, type: e.target.value})}
                                >
                                  <option value="">Select Type</option>
                                  <option value="Full-time">Full-time</option>
                                  <option value="Part-time">Part-time</option>
                                  <option value="Distance">Distance</option>
                                </select>
                                <FaChevronDown className="position-absolute end-0 top-50 translate-middle-y me-3" />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <label className="form-label">Start Date</label>
                              <input
                                type="date"
                                className="form-control"
                                value={newEducation.startDate}
                                onChange={(e) => setNewEducation({...newEducation, startDate: e.target.value})}
                              />
                            </div>
                            <div className="col-md-4">
                              <label className="form-label">End Date</label>
                              <input
                                type="date"
                                className="form-control"
                                value={newEducation.endDate}
                                onChange={(e) => setNewEducation({...newEducation, endDate: e.target.value})}
                              />
                            </div>
                            <div className="col-12">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleAddEducation}
                              >
                                Add Education
                              </button>
                            </div>
                          </div>
                        </div>
                        {employeeData.education?.map((edu, index) => (
                          <div key={index} className="jobplugin__profile-block__textarea mb-4">
                            <div className="jobplugin__profile-block__textbox">
                              <div className="d-flex justify-content-between align-items-start">
                                <div>
                                  <h3 className="h5">{edu.degree}</h3>
                                  <p>{edu.institution}</p>
                                  <p>{edu.type} | {edu.startDate} - {edu.endDate || 'Present'}</p>
                                </div>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleRemoveEducation(index)}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="jobplugin__profile-block">
                      <div className="jobplugin__profile-block__header">
                        <h2 className="h4">Work Experience</h2>
                      </div>
                      <div className="jobplugin__profile-block__body">
                        <div className="form-group mb-4">
                          <div className="row g-3">
                            <div className="col-md-6">
                              <label className="form-label">Position</label>
                              <input
                                type="text"
                                className="form-control"
                                value={newExperience.position}
                                onChange={(e) => setNewExperience({...newExperience, position: e.target.value})}
                                placeholder="Job Title"
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Company</label>
                              <input
                                type="text"
                                className="form-control"
                                value={newExperience.company}
                                onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                                placeholder="Company Name"
                              />
                            </div>
                            <div className="col-md-4">
                              <label className="form-label">Employment Type</label>
                              <div className="position-relative">
                                <select
                                  className="form-control"
                                  value={newExperience.employmentType}
                                  onChange={(e) => setNewExperience({...newExperience, employmentType: e.target.value})}
                                >
                                  <option value="">Select Type</option>
                                  <option value="Full-time">Full-time</option>
                                  <option value="Part-time">Part-time</option>
                                  <option value="Contract">Contract</option>
                                  <option value="Internship">Internship</option>
                                  <option value="Freelance">Freelance</option>
                                </select>
                                <FaChevronDown className="position-absolute end-0 top-50 translate-middle-y me-3" />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <label className="form-label">Start Date</label>
                              <input
                                type="date"
                                className="form-control"
                                value={newExperience.startDate}
                                onChange={(e) => setNewExperience({...newExperience, startDate: e.target.value})}
                              />
                            </div>
                            <div className="col-md-4">
                              <label className="form-label">End Date</label>
                              <input
                                type="date"
                                className="form-control"
                                value={newExperience.endDate}
                                onChange={(e) => setNewExperience({...newExperience, endDate: e.target.value})}
                              />
                            </div>
                            <div className="col-12">
                              <label className="form-label">Description</label>
                              <textarea
                                className="form-control"
                                rows="3"
                                value={newExperience.description}
                                onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                                placeholder="Describe your responsibilities and achievements"
                              />
                            </div>
                            <div className="col-12">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleAddExperience}
                              >
                                Add Experience
                              </button>
                            </div>
                          </div>
                        </div>
                        {employeeData.workExperience?.map((exp, index) => (
                          <div key={index} className="jobplugin__profile-block__textarea mb-4">
                            <div className="jobplugin__profile-block__textbox">
                              <div className="d-flex justify-content-between align-items-start">
                                <div>
                                  <h3 className="h5">{exp.position}</h3>
                                  <p>{exp.company}</p>
                                  <p>{exp.employmentType} | {exp.startDate} - {exp.endDate || 'Present'}</p>
                                  {exp.description && (
                                    <p className="mt-2">{exp.description}</p>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleRemoveExperience(index)}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default EmployeeerEditProfile;