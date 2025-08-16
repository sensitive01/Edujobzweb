import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaUpload, FaTrash, FaEdit, FaLink, FaFilePdf, FaChevronDown, FaPlay, FaStop } from 'react-icons/fa';
import { getEmployeeDetails, updateEmployeeProfile } from '../../api/services/projectServices';
import axios from 'axios';

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
    coverLetterFile: { url: '', name: '' },
    profileVideo: { url: '', name: '', thumbnail: '' },
    introductionAudio: { url: '', name: '', duration: 0 }
  });
  const [initialData, setInitialData] = useState(null); // To track initial form state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetterFile, setCoverLetterFile] = useState(null);
  const [profileVideoFile, setProfileVideoFile] = useState(null);
  const [introAudioFile, setIntroAudioFile] = useState(null);
  const [uploading, setUploading] = useState({
    profileImage: false,
    resume: false,
    coverLetter: false,
    video: false,
    audio: false
  });
  const [uploadProgress, setUploadProgress] = useState({ video: 0, audio: 0 });
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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(null);
  const videoRef = useRef(null);

  // Check if form data has changed compared to initial data
  const isFormDirty = initialData && JSON.stringify(employeeData) !== JSON.stringify(initialData);

  // Input styles converted to inline styles
  const inputStyle = {
    height: '36px',
    padding: '6px 12px',
    lineHeight: '1.5',
    borderRadius: '10px'
  };

  const textareaStyle = {
    height: 'auto',
    minHeight: '100px'
  };

  const selectStyle = {
    height: '36px',
    padding: '2px 12px'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          navigate('/login');
          return;
        }
        const data = await getEmployeeDetails(id, token);

        const formattedData = {
          ...data,
          profileImage: data.userProfilePic || '',
          resume: data.resume ? { ...data.resume } : { url: '', name: '' },
          coverLetterFile: data.coverLetterFile ? { ...data.coverLetterFile } : { url: '', name: '' },
          profileVideo: data.profileVideo ? { ...data.profileVideo } : { url: '', name: '', thumbnail: '' },
          introductionAudio: data.introductionAudio ? { ...data.introductionAudio } : { url: '', name: '', duration: 0 },
          skills: data.skills || [],
          languages: data.languages || [],
          gradeLevels: data.gradeLevels || [],
          education: data.education || [],
          workExperience: data.workExperience || []
        };

        setEmployeeData(formattedData);
        setInitialData(formattedData);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch employee data');
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (e, arrayName) => {
    const { value } = e.target;
    setEmployeeData(prev => ({
      ...prev,
      [arrayName]: value.split(',').map(item => item.trim())
    }));
  };

  const handleAddSkill = () => {
    if (newSkill && !employeeData.skills.includes(newSkill)) {
      setEmployeeData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEmployeeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleAddLanguage = () => {
    if (newLanguage && !employeeData.languages.includes(newLanguage)) {
      setEmployeeData(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage]
      }));
      setNewLanguage('');
    }
  };

  const handleRemoveLanguage = (languageToRemove) => {
    setEmployeeData(prev => ({
      ...prev,
      languages: prev.languages.filter(language => language !== languageToRemove)
    }));
  };

  const handleAddGradeLevel = () => {
    if (newGradeLevel && !employeeData.gradeLevels.includes(newGradeLevel)) {
      setEmployeeData(prev => ({
        ...prev,
        gradeLevels: [...prev.gradeLevels, newGradeLevel]
      }));
      setNewGradeLevel('');
    }
  };

  const handleRemoveGradeLevel = (gradeToRemove) => {
    setEmployeeData(prev => ({
      ...prev,
      gradeLevels: prev.gradeLevels.filter(grade => grade !== gradeToRemove)
    }));
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
    }
  };

  const handleRemoveEducation = (indexToRemove) => {
    setEmployeeData(prev => ({
      ...prev,
      education: prev.education.filter((_, index) => index !== indexToRemove)
    }));
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
    }
  };

  const handleRemoveExperience = (indexToRemove) => {
    setEmployeeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, index) => index !== indexToRemove)
    }));
  };

  //   const handleProfilePicChange = async (e) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const file = e.target.files[0];

  //     // Client-side validation
  //     if (!file.type.match('image.*')) {
  //       setError('Please select an image file (JPEG, PNG)');
  //       return;
  //     }
  //     if (file.size > 10 * 1024 * 1024) { // Match backend limit (10MB)
  //       setError('Image size should be less than 10MB');
  //       return;
  //     }

  //     // Show preview while uploading
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       setEmployeeData(prev => ({
  //         ...prev,
  //         profileImage: event.target.result
  //       }));
  //     };
  //     reader.readAsDataURL(file);

  //     try {
  //       const token = localStorage.getItem('authToken');
  //       if (!token) {
  //         navigate('/login');
  //         return;
  //       }

  //       const formData = new FormData();
  //       formData.append('file', file);

  //       setUploading(prev => ({ ...prev, profileImage: true }));
  //       setError(null);

  //       // Make sure this matches your backend route exactly
  //       const response = await axios.put(
  //         `https://edujobzbackend.onrender.com/uploadfile/${id}`,
  //         formData,
  //         {
  //           params: {
  //             fileType: 'profileImage'
  //           },
  //           headers: {
  //             'Content-Type': 'multipart/form-data',
  //             'Authorization': `Bearer ${token}`
  //           }
  //         }
  //       );

  //       if (response.data && response.data.file && response.data.file.url) {
  //         setEmployeeData(prev => ({
  //           ...prev,
  //           profileImage: response.data.file.url,
  //           userProfilePic: response.data.file.url
  //         }));
  //       } else {
  //         throw new Error('Invalid response from server');
  //       }
  //     } catch (err) {
  //       console.error('Upload error:', err);
  //       setError(err.response?.data?.message || 
  //                err.message || 
  //                'Failed to upload image. Please try again.');
  //     } finally {
  //       setUploading(prev => ({ ...prev, profileImage: false }));
  //     }
  //   }
  // };
  // Resume Upload Handler

  const handleProfilePicChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Clear any previous errors
      setError(null);

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type.toLowerCase())) {
        setError('Invalid Image format - kindly upload JPG, JPEG or PNG format images only');
        e.target.value = ''; // Reset file input
        return;
      }

      // Validate file size (10MB limit)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        setError('Image size should be less than 10MB');
        e.target.value = ''; // Reset file input
        return;
      }

      // Show preview while uploading
      const reader = new FileReader();
      reader.onload = (event) => {
        setEmployeeData(prev => ({
          ...prev,
          profileImage: event.target.result
        }));
      };
      reader.readAsDataURL(file);

      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          navigate('/login');
          return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setUploading(prev => ({ ...prev, profileImage: true }));

        const response = await axios.put(
          `https://edujobzbackend.onrender.com/uploadfile/${id}`,
          formData,
          {
            params: {
              fileType: 'profileImage'
            },
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (response.data?.file?.url) {
          setEmployeeData(prev => ({
            ...prev,
            profileImage: response.data.file.url,
            userProfilePic: response.data.file.url
          }));
        } else {
          throw new Error('Invalid response from server');
        }
      } catch (err) {
        console.error('Upload error:', err);
        setError(err.response?.data?.message ||
          err.message ||
          'Failed to upload image. Please try again.');
        // Revert to previous image if upload fails
        setEmployeeData(prev => ({
          ...prev,
          profileImage: initialData?.profileImage || initialData?.userProfilePic || ''
        }));
        e.target.value = ''; // Reset file input
      } finally {
        setUploading(prev => ({ ...prev, profileImage: false }));
      }
    }
  };


  const handleResumeChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.match('application/pdf')) {
        setError('Please select a PDF file for resume');
        return;
      }
      setResumeFile(file);

      try {
        const token = localStorage.getItem('authToken');
        const formData = new FormData();
        formData.append('file', file);

        setUploading(prev => ({ ...prev, resume: true }));

        const response = await axios.put(
          `https://edujobzbackend.onrender.com/uploadfile/${id}?fileType=resume`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            }
          }
        );

        setEmployeeData(prev => ({
          ...prev,
          resume: {
            name: response.data.file.name,
            url: response.data.file.url
          }
        }));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to upload resume');
      } finally {
        setUploading(prev => ({ ...prev, resume: false }));
      }
    }
  };

  // Cover Letter Upload Handler
  const handleCoverLetterChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.match('application/pdf')) {
        setError('Please select a PDF file for cover letter');
        return;
      }
      setCoverLetterFile(file);

      try {
        const token = localStorage.getItem('authToken');
        const formData = new FormData();
        formData.append('file', file);

        setUploading(prev => ({ ...prev, coverLetter: true }));

        const response = await axios.put(
          `https://edujobzbackend.onrender.com/uploadfile/${id}?fileType=coverLetter`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            }
          }
        );

        setEmployeeData(prev => ({
          ...prev,
          coverLetterFile: {
            name: response.data.file.name,
            url: response.data.file.url
          }
        }));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to upload cover letter');
      } finally {
        setUploading(prev => ({ ...prev, coverLetter: false }));
      }
    }
  };
  const handleProfileVideoChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.match('video.*')) {
        setError('Please select a video file');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError('Video size should be less than 10MB');
        return;
      }

      setProfileVideoFile(file);

      try {
        const token = localStorage.getItem('authToken');
        const formData = new FormData();
        formData.append('file', file);

        setUploading(prev => ({ ...prev, video: true }));
        setUploadProgress(prev => ({ ...prev, video: 0 }));

        const response = await axios.put(
          `https://edujobzbackend.onrender.com/uploadprofilevideo/${id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`,
              'fileType': 'profileVideo'
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(prev => ({ ...prev, video: percentCompleted }));
            }
          }
        );

        setEmployeeData(prev => ({
          ...prev,
          profileVideo: {
            name: file.name,
            url: response.data.file.url,
            thumbnail: response.data.file.thumbnail || ''
          }
        }));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to upload video');
      } finally {
        setUploading(prev => ({ ...prev, video: false }));
        setUploadProgress(prev => ({ ...prev, video: 0 }));
      }
    }
  };

  const handleIntroAudioChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.match('audio.*')) {
        setError('Please select an audio file');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError('Audio size should be less than 10MB');
        return;
      }

      setIntroAudioFile(file);

      try {
        const token = localStorage.getItem('authToken');
        const formData = new FormData();
        formData.append('file', file);

        const audio = new Audio();
        audio.src = URL.createObjectURL(file);
        audio.onloadedmetadata = () => {
          setEmployeeData(prev => ({
            ...prev,
            introductionAudio: {
              ...prev.introductionAudio,
              duration: Math.round(audio.duration)
            }
          }));
          URL.revokeObjectURL(audio.src);
        };

        setUploading(prev => ({ ...prev, audio: true }));
        setUploadProgress(prev => ({ ...prev, audio: 0 }));

        const response = await axios.put(
          `https://edujobzbackend.onrender.com/uploadintroaudio/${id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`,
              'fileType': 'audio'
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(prev => ({ ...prev, audio: percentCompleted }));
            }
          }
        );

        setEmployeeData(prev => ({
          ...prev,
          introductionAudio: {
            name: file.name,
            url: response.data.employee.introductionAudio.url,
            duration: prev.introductionAudio.duration || 0
          }
        }));

        e.target.value = '';
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to upload audio');
      } finally {
        setUploading(prev => ({ ...prev, audio: false }));
        setUploadProgress(prev => ({ ...prev, audio: 0 }));
      }
    }
  };

  const toggleAudioPlayback = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play()
          .then(() => setIsAudioPlaying(true))
          .catch(e => setError('Failed to play audio: ' + e.message));
      } else {
        audioRef.current.pause();
        setIsAudioPlaying(false);
      }
    }
  };

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
          .then(() => setIsVideoPlaying(true))
          .catch(e => setError('Failed to play video: ' + e.message));
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormDirty) {
      setError('No changes detected in form fields');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      // Only submit form data, not files (files are handled separately)
      await updateEmployeeProfile(id, employeeData, token);
      navigate('/employee-profile', { state: { success: 'Profile updated successfully' } });
    } catch (err) {
      setError(err.message || 'Failed to update profile');
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
                    {/* <label
                      htmlFor="profilePicUpload"
                      className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                    >
                      {uploading.profileImage ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      ) : (
                        <FaUpload />
                      )}
                      <input
                        type="file"
                        id="profilePicUpload"
                        className="d-none"
                        onChange={handleProfilePicChange}
                        accept="image/*"
                        disabled={uploading.profileImage}
                      />
                    </label> */}

                    <label
                      htmlFor="profilePicUpload"
                      className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                    >
                      {uploading.profileImage ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      ) : (
                        <FaUpload />
                      )}
                      <input
                        type="file"
                        id="profilePicUpload"
                        className="d-none"
                        onChange={handleProfilePicChange}
                        accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                        disabled={uploading.profileImage}
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
                    onClick={() => navigate(`/employee-profile`)}
                    className="jobplugin__button jobplugin__bg-white jobplugin__border-primary hover:jobplugin__bg-white small text-black"
                  >
                    <FaArrowLeft /> &nbsp; Back to Profile
                  </button>
                  <button
                    type="submit"
                    form="profileForm"
                    disabled={!isFormDirty}
                    className="jobplugin__button border-dark shadow bg-primary hover:jobplugin__bg-secondary small"
                  >
                    <FaSave /> &nbsp; Save Changes
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
                            style={inputStyle}
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
                            style={inputStyle}
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
                            style={inputStyle}
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
                            style={inputStyle}
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
                            style={inputStyle}
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
                            style={inputStyle}
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
                              disabled={uploading.resume}
                              style={inputStyle}
                            />
                            {uploading.resume && (
                              <span className="input-group-text">
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                              </span>
                            )}
                          </div>
                          {employeeData.resume?.name && (
                            <small className="text-muted">Current: {employeeData.resume.name}</small>
                          )}
                        </div>
                        <div className="form-group mb-3">
                          <label>Cover Letter (PDF)</label>
                          <div className="input-group">
                            <input
                              type="file"
                              className="form-control"
                              onChange={handleCoverLetterChange}
                              accept="application/pdf"
                              disabled={uploading.coverLetter}
                              style={inputStyle}
                            />
                            {uploading.coverLetter && (
                              <span className="input-group-text">
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                              </span>
                            )}
                          </div>
                          {employeeData.coverLetterFile?.name && (
                            <small className="text-muted">Current: {employeeData.coverLetterFile.name}</small>
                          )}
                        </div>

                        <div className="form-group mb-3">
                          <label>Profile Video (Max 10MB)</label>
                          <div className="input-group">
                            <input
                              type="file"
                              className="form-control"
                              onChange={handleProfileVideoChange}
                              accept="video/*"
                              disabled={uploading.video}
                              style={inputStyle}
                            />
                            {uploading.video && (
                              <span className="input-group-text">
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                              </span>
                            )}
                          </div>
                          {uploadProgress.video > 0 && uploadProgress.video < 100 && (
                            <div className="progress mt-2">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: `${uploadProgress.video}%` }}
                                aria-valuenow={uploadProgress.video}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                {uploadProgress.video}%
                              </div>
                            </div>
                          )}
                          {employeeData.profileVideo?.url && (
                            <div className="mt-2">
                              <small className="text-muted">Current: {employeeData.profileVideo.name}</small>
                              <div className="video-preview mt-2 position-relative">
                                <video
                                  ref={videoRef}
                                  src={employeeData.profileVideo.url}
                                  controls={false}
                                  className="w-100 rounded"
                                  style={{ maxHeight: '300px' }}
                                  onEnded={() => setIsVideoPlaying(false)}
                                  onPause={() => setIsVideoPlaying(false)}
                                />
                                <button
                                  className="position-absolute top-50 start-50 translate-middle rounded-circle"
                                  style={{ width: '40px', height: '40px', border: 'none' }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleVideoPlayback();
                                  }}
                                  disabled={!employeeData.profileVideo?.url}
                                >
                                  {isVideoPlaying ? <FaStop /> : <FaPlay />}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="form-group">
                          <label>Introduction Audio (Max 10MB)</label>
                          <div className="input-group">
                            <input
                              type="file"
                              className="form-control"
                              onChange={handleIntroAudioChange}
                              accept="audio/*"
                              disabled={uploading.audio}
                              style={inputStyle}
                            />
                            {uploading.audio && (
                              <span className="input-group-text">
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                              </span>
                            )}
                          </div>
                          {uploadProgress.audio > 0 && uploadProgress.audio < 100 && (
                            <div className="progress mt-2">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: `${uploadProgress.audio}%` }}
                                aria-valuenow={uploadProgress.audio}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                {uploadProgress.audio}%
                              </div>
                            </div>
                          )}
                          {employeeData.introductionAudio?.url && (
                            <div className="mt-2">
                              <small className="text-muted">Current: {employeeData.introductionAudio.name}</small>
                              <div className="audio-preview mt-2 d-flex align-items-center bg-light p-2 rounded">
                                <button
                                  style={{ width: '40px', height: '40px', border: 'none' }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleAudioPlayback();
                                  }}
                                  disabled={!employeeData.introductionAudio?.url}
                                >
                                  {isAudioPlaying ? <FaStop /> : <FaPlay />}
                                </button>
                                <span className="text-muted">
                                  Duration: {Math.floor(employeeData.introductionAudio.duration / 60)}:
                                  {(employeeData.introductionAudio.duration % 60).toString().padStart(2, '0')}
                                </span>
                                <audio
                                  ref={audioRef}
                                  src={employeeData.introductionAudio.url}
                                  onEnded={() => setIsAudioPlaying(false)}
                                  onPause={() => setIsAudioPlaying(false)}
                                  hidden
                                />
                              </div>
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
                            style={inputStyle}
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
                              style={selectStyle}
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
                            style={inputStyle}
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
                              style={selectStyle}
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
                            style={inputStyle}
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
                            style={inputStyle}
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
                            style={textareaStyle}
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
                              style={inputStyle}
                            />
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleAddSkill}
                              style={{ marginLeft: '-6px', fontSize: '15px', height: '0px' }}
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
                              style={inputStyle}
                            />
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleAddLanguage}
                              style={{ marginLeft: '-6px', fontSize: '15px', height: '0px' }}
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
                              style={inputStyle}
                            />
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleAddGradeLevel}
                              style={{ marginLeft: '-6px', fontSize: '15px', height: '0px' }}
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
                        <h2 className="h4">Address</h2>
                      </div>
                      <div className="jobplugin__profile-block__body">
                        <div className="row g-3">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Address Line 1</label>
                              <input
                                type="text"
                                className="form-control"
                                name="addressLine1"
                                value={employeeData.addressLine1 || ''}
                                onChange={handleChange}
                                placeholder="Street address, P.O. box"
                                style={inputStyle}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Address Line 2</label>
                              <input
                                type="text"
                                className="form-control"
                                name="addressLine2"
                                value={employeeData.addressLine2 || ''}
                                onChange={handleChange}
                                placeholder="Apartment, suite, unit"
                                style={inputStyle}
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label>City</label>
                              <input
                                type="text"
                                className="form-control"
                                name="city"
                                value={employeeData.city || ''}
                                onChange={handleChange}
                                style={inputStyle}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>State</label>
                              <input
                                type="text"
                                className="form-control"
                                name="state"
                                value={employeeData.state || ''}
                                onChange={handleChange}
                                style={inputStyle}
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label>PIN Code</label>
                              <input
                                type="text"
                                className="form-control"
                                name="pincode"
                                value={employeeData.pincode || ''}
                                onChange={handleChange}
                                pattern="[0-9]{6}"
                                title="6-digit PIN code"
                                style={inputStyle}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Preferred Location</label>
                              <input
                                type="text"
                                className="form-control"
                                name="preferredLocation"
                                value={employeeData.preferredLocation || ''}
                                onChange={handleChange}
                                placeholder="Preferred work location"
                                style={inputStyle}
                              />
                            </div>
                          </div>
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
                                onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                                placeholder="Degree/Certificate"
                                style={inputStyle}
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Institution</label>
                              <input
                                type="text"
                                className="form-control"
                                value={newEducation.institution}
                                onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                                placeholder="School/University"
                                style={inputStyle}
                              />
                            </div>
                            <div className="col-md-4">
                              <label className="form-label">Type</label>
                              <div className="position-relative">
                                <select
                                  className="form-control"
                                  value={newEducation.type}
                                  onChange={(e) => setNewEducation({ ...newEducation, type: e.target.value })}
                                  style={selectStyle}
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
                                onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
                                style={inputStyle}
                              />
                            </div>
                            <div className="col-md-4">
                              <label className="form-label">End Date</label>
                              <input
                                type="date"
                                className="form-control"
                                value={newEducation.endDate}
                                onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
                                style={inputStyle}
                              />
                            </div>
                            <div className="col-12 mt-4">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleAddEducation}
                                style={{ marginLeft: '-6px', fontSize: '15px' }}
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
                                onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                                placeholder="Job Title"
                                style={inputStyle}
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Company</label>
                              <input
                                type="text"
                                className="form-control"
                                value={newExperience.company}
                                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                                placeholder="Company Name"
                                style={inputStyle}
                              />
                            </div>
                            <div className="col-md-4">
                              <label className="form-label">Employment Type</label>
                              <div className="position-relative">
                                <select
                                  className="form-control"
                                  value={newExperience.employmentType}
                                  onChange={(e) => setNewExperience({ ...newExperience, employmentType: e.target.value })}
                                  style={selectStyle}
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
                                onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                                style={inputStyle}
                              />
                            </div>
                            <div className="col-md-4">
                              <label className="form-label">End Date</label>
                              <input
                                type="date"
                                className="form-control"
                                value={newExperience.endDate}
                                onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                                style={inputStyle}
                              />
                            </div>
                            <div className="col-12">
                              <label className="form-label">Description</label>
                              <textarea
                                className="form-control"
                                rows="3"
                                value={newExperience.description}
                                onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                                placeholder="Describe your responsibilities and achievements"
                                style={textareaStyle}
                              />
                            </div>
                            <div className="col-12 mt-4">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleAddExperience}
                                style={{ marginLeft: '-6px', fontSize: '15px' }}
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