import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaUpload, FaTrash } from 'react-icons/fa';
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
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger d-flex justify-content-between align-items-center">
          {error}
          <button className="btn btn-sm btn-outline-danger" onClick={() => setError(null)}>
            &times;
          </button>
        </div>
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <main className="bg-light min-vh-100 py-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button 
            onClick={() => navigate(`/employee/details/${id}`)}
            className="btn btn-outline-secondary"
          >
            <FaArrowLeft className="me-1" /> Back to Profile
          </button>
          <h2 className="h4 mb-0">Edit Profile</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Left Column */}
            <div className="col-md-4 mb-4">
              <div className="card shadow mb-4">
                <div className="card-body text-center">
                  <div className="position-relative d-inline-block mb-3">
                    <img 
                      src={employeeData.profileImage || employeeData.userProfilePic || '/images/default-profile.png'} 
                      alt="Profile" 
                      className="rounded-circle"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                    <label 
                      htmlFor="profilePicUpload"
                      className="btn btn-primary btn-sm rounded-circle position-absolute bottom-0 end-0"
                      style={{ width: '32px', height: '32px' }}
                      title="Upload new photo"
                    >
                      <FaUpload size={12} />
                    </label>
                    <input 
                      type="file" 
                      id="profilePicUpload" 
                      className="d-none" 
                      onChange={handleProfilePicChange}
                      accept="image/*"
                    />
                  </div>
                  <h3 className="h5">{employeeData.userName}</h3>
                  {profilePicFile && (
                    <p className="text-muted small mt-2">New photo selected</p>
                  )}
                </div>
              </div>

              {/* Documents */}
              <div className="card shadow mb-4">
                <div className="card-header bg-white">
                  <h3 className="h5 mb-0">Documents</h3>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label htmlFor="resumeUpload" className="form-label">Resume (PDF)</label>
                    <div className="input-group">
                      <input 
                        type="file" 
                        className="form-control" 
                        id="resumeUpload" 
                        onChange={handleResumeChange}
                        accept="application/pdf"
                      />
                    </div>
                    {employeeData.resume?.name && (
                      <small className="text-muted">Current: {employeeData.resume.name}</small>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="coverLetterUpload" className="form-label">Cover Letter (PDF)</label>
                    <div className="input-group">
                      <input 
                        type="file" 
                        className="form-control" 
                        id="coverLetterUpload" 
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
            </div>

            {/* Right Column */}
            <div className="col-md-8">
              {/* Personal Information */}
              <div className="card shadow mb-4">
                <div className="card-header bg-white">
                  <h3 className="h5 mb-0">Personal Information</h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="userName" className="form-label">Full Name*</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="userName" 
                        name="userName"
                        value={employeeData.userName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="userEmail" className="form-label">Email*</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        id="userEmail" 
                        name="userEmail"
                        value={employeeData.userEmail}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="userMobile" className="form-label">Mobile</label>
                      <input 
                        type="tel" 
                        className="form-control" 
                        id="userMobile" 
                        name="userMobile"
                        value={employeeData.userMobile || ''}
                        onChange={handleChange}
                        pattern="[0-9]{10}"
                        title="Please enter a 10-digit mobile number"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="gender" className="form-label">Gender</label>
                      <select
                        className="form-select"
                        id="gender"
                        name="gender"
                        value={employeeData.gender || ''}
                        onChange={handleChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="dob" className="form-label">Date of Birth</label>
                      <input 
                        type="date" 
                        className="form-control" 
                        id="dob" 
                        name="dob"
                        value={employeeData.dob || ''}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="maritalStatus" className="form-label">Marital Status</label>
                      <select
                        className="form-select"
                        id="maritalStatus"
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
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="totalExperience" className="form-label">Total Experience</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="totalExperience" 
                        name="totalExperience"
                        value={employeeData.totalExperience || ''}
                        onChange={handleChange}
                        placeholder="e.g., 5 years or Fresher"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="expectedSalary" className="form-label">Expected Salary (₹)</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        id="expectedSalary" 
                        name="expectedSalary"
                        value={employeeData.expectedSalary || ''}
                        onChange={handleChange}
                        placeholder="Expected salary in INR"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="specialization" className="form-label">Specialization</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="specialization" 
                      name="specialization"
                      value={employeeData.specialization || ''}
                      onChange={handleChange}
                      placeholder="Your area of expertise"
                    />
                  </div>
                </div>
              </div>

              {/* Profile Summary */}
              <div className="card shadow mb-4">
                <div className="card-header bg-white">
                  <h3 className="h5 mb-0">Profile Summary</h3>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label htmlFor="profilesummary" className="form-label">Summary</label>
                    <textarea 
                      className="form-control" 
                      id="profilesummary" 
                      name="profilesummary"
                      rows="5"
                      value={employeeData.profilesummary || employeeData.coverLetter || ''}
                      onChange={handleChange}
                      placeholder="Write a brief summary about yourself and your career objectives"
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="card shadow mb-4">
                <div className="card-header bg-white">
                  <h3 className="h5 mb-0">Address Information</h3>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label htmlFor="addressLine1" className="form-label">Address Line 1</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="addressLine1" 
                      name="addressLine1"
                      value={employeeData.addressLine1 || ''}
                      onChange={handleChange}
                      placeholder="Street address, P.O. box, company name"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="addressLine2" className="form-label">Address Line 2</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="addressLine2" 
                      name="addressLine2"
                      value={employeeData.addressLine2 || ''}
                      onChange={handleChange}
                      placeholder="Apartment, suite, unit, building, floor, etc."
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label htmlFor="city" className="form-label">City</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="city" 
                        name="city"
                        value={employeeData.city || ''}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="state" className="form-label">State</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="state" 
                        name="state"
                        value={employeeData.state || ''}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="pincode" className="form-label">PIN Code</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="pincode" 
                        name="pincode"
                        value={employeeData.pincode || ''}
                        onChange={handleChange}
                        pattern="[0-9]{6}"
                        title="6-digit PIN code"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="preferredLocation" className="form-label">Preferred Location</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="preferredLocation" 
                      name="preferredLocation"
                      value={employeeData.preferredLocation || ''}
                      onChange={handleChange}
                      placeholder="Preferred work location if different"
                    />
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="card shadow mb-4">
                <div className="card-header bg-white">
                  <h3 className="h5 mb-0">Social Links</h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="linkedin" className="form-label">LinkedIn Profile</label>
                      <input 
                        type="url" 
                        className="form-control" 
                        id="linkedin" 
                        name="linkedin"
                        value={employeeData.linkedin || ''}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="github" className="form-label">GitHub Profile</label>
                      <input 
                        type="url" 
                        className="form-control" 
                        id="github" 
                        name="github"
                        value={employeeData.github || ''}
                        onChange={handleChange}
                        placeholder="https://github.com/yourusername"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="portfolio" className="form-label">Portfolio Website</label>
                    <input 
                      type="url" 
                      className="form-control" 
                      id="portfolio" 
                      name="portfolio"
                      value={employeeData.portfolio || ''}
                      onChange={handleChange}
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="card shadow mb-4">
                <div className="card-header bg-white">
                  <h3 className="h5 mb-0">Skills</h3>
                </div>
                <div className="card-body">
                  <div className="mb-3">
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
                  <div className="d-flex flex-wrap gap-2">
                    {employeeData.skills?.map((skill, index) => (
                      <div key={index} className="badge bg-primary d-flex align-items-center">
                        {skill}
                        <button 
                          type="button" 
                          className="btn btn-sm p-0 ms-2 text-white"
                          onClick={() => handleRemoveSkill(skill)}
                        >
                          <FaTrash size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="card shadow mb-4">
                <div className="card-header bg-white">
                  <h3 className="h5 mb-0">Languages</h3>
                </div>
                <div className="card-body">
                  <div className="mb-3">
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
                  <div className="d-flex flex-wrap gap-2">
                    {employeeData.languages?.map((language, index) => (
                      <div key={index} className="badge bg-primary d-flex align-items-center">
                        {language}
                        <button 
                          type="button" 
                          className="btn btn-sm p-0 ms-2 text-white"
                          onClick={() => handleRemoveLanguage(language)}
                        >
                          <FaTrash size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Grade Levels */}
              <div className="card shadow mb-4">
                <div className="card-header bg-white">
                  <h3 className="h5 mb-0">Grade Levels</h3>
                </div>
                <div className="card-body">
                  <div className="mb-3">
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
                  <div className="d-flex flex-wrap gap-2">
                    {employeeData.gradeLevels?.map((grade, index) => (
                      <div key={index} className="badge bg-primary d-flex align-items-center">
                        {grade}
                        <button 
                          type="button" 
                          className="btn btn-sm p-0 ms-2 text-white"
                          onClick={() => handleRemoveGradeLevel(grade)}
                        >
                          <FaTrash size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="card shadow mb-4">
                <div className="card-header bg-white">
                  <h3 className="h5 mb-0">Education</h3>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="degree" className="form-label">Degree</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="degree"
                          value={newEducation.degree}
                          onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                          placeholder="Degree/Certificate"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="institution" className="form-label">Institution</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="institution"
                          value={newEducation.institution}
                          onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
                          placeholder="School/University"
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="educationType" className="form-label">Type</label>
                        <select
                          className="form-select"
                          id="educationType"
                          value={newEducation.type}
                          onChange={(e) => setNewEducation({...newEducation, type: e.target.value})}
                        >
                          <option value="">Select Type</option>
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Distance">Distance</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="startDate" className="form-label">Start Date</label>
                        <input 
                          type="date" 
                          className="form-control" 
                          id="startDate"
                          value={newEducation.startDate}
                          onChange={(e) => setNewEducation({...newEducation, startDate: e.target.value})}
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="endDate" className="form-label">End Date</label>
                        <input 
                          type="date" 
                          className="form-control" 
                          id="endDate"
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
                  <div className="list-group">
                    {employeeData.education?.map((edu, index) => (
                      <div key={index} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h5 className="mb-1">{edu.degree}</h5>
                            <p className="mb-1">{edu.institution}</p>
                            <small>{edu.type} | {edu.startDate} - {edu.endDate || 'Present'}</small>
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
                    ))}
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              <div className="card shadow mb-4">
                <div className="card-header bg-white">
                  <h3 className="h5 mb-0">Work Experience</h3>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="position" className="form-label">Position</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="position"
                          value={newExperience.position}
                          onChange={(e) => setNewExperience({...newExperience, position: e.target.value})}
                          placeholder="Job Title"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="company" className="form-label">Company</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="company"
                          value={newExperience.company}
                          onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                          placeholder="Company Name"
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="employmentType" className="form-label">Employment Type</label>
                        <select
                          className="form-select"
                          id="employmentType"
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
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="expStartDate" className="form-label">Start Date</label>
                        <input 
                          type="date" 
                          className="form-control" 
                          id="expStartDate"
                          value={newExperience.startDate}
                          onChange={(e) => setNewExperience({...newExperience, startDate: e.target.value})}
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="expEndDate" className="form-label">End Date</label>
                        <input 
                          type="date" 
                          className="form-control" 
                          id="expEndDate"
                          value={newExperience.endDate}
                          onChange={(e) => setNewExperience({...newExperience, endDate: e.target.value})}
                        />
                      </div>
                      <div className="col-12">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea 
                          className="form-control" 
                          id="description"
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
                  <div className="list-group">
                    {employeeData.workExperience?.map((exp, index) => (
                      <div key={index} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h5 className="mb-1">{exp.position}</h5>
                            <p className="mb-1">{exp.company}</p>
                            <small>{exp.employmentType} | {exp.startDate} - {exp.endDate || 'Present'}</small>
                            {exp.description && (
                              <p className="mt-2 mb-0">{exp.description}</p>
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
                    ))}
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                {error && (
                  <div className="text-danger small">{error}</div>
                )}
                <button 
                  type="submit" 
                  className="btn btn-primary ms-auto"
                  disabled={uploading || !isFormDirty}
                >
                  {uploading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave className="me-1" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EmployeeerEditProfile;