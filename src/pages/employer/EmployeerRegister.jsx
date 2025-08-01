// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { registerSchool } from '../../api/services/projectServices';
// import { validationsEmployeer } from '../../utils/validationsEmployeer';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

// // Import images
// import logo from '../../assets/employer/assets/img/logo.svg';
// import bg1 from '../../assets/employer/assets/img/bg/bg-01.webp';
// import bg2 from '../../assets/employer/assets/img/bg/bg-02.png';
// import bg3 from '../../assets/employer/assets/img/bg/bg-03.webp';
// import authBg from '../../assets/employer/assets/img/bg/authentication-bg-01.webp';
// import facebookLogo from '../../assets/employer/assets/img/icons/facebook-logo.svg';
// import googleLogo from '../../assets/employer/assets/img/icons/google-logo.svg';
// import appleLogo from '../../assets/employer/assets/img/icons/apple-logo.svg';

// const EmployeeRegister = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     schoolName: '',
//     userEmail: '',
//     userMobile: '',
//     userPassword: '',
//     confirmPassword: '',
//     sendEmails: false,
//     agreeTerms: false
//   });
//   const [errors, setErrors] = useState({});
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [apiError, setApiError] = useState(null);
//   const [registrationSuccess, setRegistrationSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
    
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//     if (apiError) setApiError(null);
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setConfirmPasswordVisible(!confirmPasswordVisible);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setApiError(null);
//     setRegistrationSuccess(false);
    
//     const validationErrors = validationsEmployeer(formData);
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
    
//     if (!formData.agreeTerms) {
//       setApiError('You must agree to the terms and privacy policy');
//       return;
//     }

//     setIsSubmitting(true);
    
//     try {
//       const payload = {
//         schoolName: formData.schoolName,
//         userEmail: formData.userEmail,
//         userMobile: formData.userMobile,
//         userPassword: formData.userPassword,
//         sendEmails: formData.sendEmails
//       };
      
//       const response = await registerSchool(payload);
      
//       if (response.data && response.data.success) {
//         setRegistrationSuccess(true);
//         // Clear form on successful registration
//         setFormData({
//           schoolName: '',
//           userEmail: '',
//           userMobile: '',
//           userPassword: '',
//           confirmPassword: '',
//           sendEmails: false,
//           agreeTerms: false
//         });
//       } else {
//         setApiError(response.data.message || 'Registration failed. Please try again.');
//       }
//     } catch (err) {
//       console.error('Registration error:', err);
//       const errorMessage = err.response?.data?.message || 'An error occurred during registration';
//       setApiError(errorMessage);
      
//       if (err.response?.data?.errors) {
//         setErrors(err.response.data.errors);
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="bg-white">
//       {/* Main Wrapper */}
//       <div className="main-wrapper">
//         <div className="container-fuild">
//           <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
//             <div className="row">
//               <div className="col-lg-8">
//                 <div className="login-background position-relative d-lg-flex align-items-center justify-content-center d-none flex-wrap vh-100">
//                   <div className="bg-overlay-img">
//                     <img src={bg1} className="bg-1" alt="Background 1" />
//                     <img src={bg2} className="bg-2" alt="Background 2" />
//                     <img src={bg3} className="bg-3" alt="Background 3" />
//                   </div>
//                   <div className="authentication-card w-100">
//                     <div className="authen-overlay-item border w-100">
//                       <h1 className="text-white display-1" style={{ textAlign: 'center' }}>
//                         Empowering Schools through seamless Staff management.
//                       </h1>
//                       <div className="my-4 mx-auto authen-overlay-img">
//                         <img src={authBg} alt="Authentication Background" />
//                       </div>
//                       <div>
//                         <p className="text-white fs-20 fw-semibold text-center">
//                           Efficiently manage your workforce, streamline <br /> operations effortlessly.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-4 col-md-12 col-sm-12">
//                 <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
//                   <div className="col-lg-10 mx-auto vh-100">
//                     <form onSubmit={handleSubmit} className="vh-100" noValidate>
//                       <div className="vh-100 d-flex flex-column justify-content-between p-4 pb-0">
//                         <div className="mx-auto mb-4 text-center">
//                           <img src={logo} width="240px" className="img-fluid" alt="Logo" />
//                         </div>
//                         <div>
//                           {/* Success and Error Messages */}
//                           {registrationSuccess && (
//                             <div className="alert alert-success mb-3" role="alert">
//                               <div className="d-flex flex-column">
//                                 <span>Registration successful!</span>
//                                 <div className="mt-2">
//                                   <Link 
//                                     to="/employer/login" 
//                                     className="btn btn-sm btn-success"
//                                   >
//                                     Proceed to Login
//                                   </Link>
//                                 </div>
//                               </div>
//                             </div>
//                           )}
//                           {apiError && (
//                             <div className="alert alert-danger mb-3" role="alert">
//                               {apiError}
//                             </div>
//                           )}

//                           {!registrationSuccess ? (
//                             <>
//                               <div className="text-center mb-3">
//                                 <h2 className="mb-2">Sign Up</h2>
//                                 <p className="mb-0">Please enter your details to sign up</p>
//                               </div>
//                               <div className="mb-3">
//                                 <label className="form-label">School Name</label>
//                                 <div className="input-group">
//                                   <input
//                                     type="text"
//                                     name="schoolName"
//                                     value={formData.schoolName}
//                                     onChange={handleChange}
//                                     className={`form-control border-end-0 ${errors.schoolName ? 'is-invalid' : ''}`}
//                                     required
//                                   />
//                                   <span className="input-group-text border-start-0">
//                                     <i className="ti ti-school"></i>
//                                   </span>
//                                   {errors.schoolName && <div className="invalid-feedback">{errors.schoolName}</div>}
//                                 </div>
//                               </div>
//                               <div className="mb-3">
//                                 <label className="form-label">Email Address</label>
//                                 <div className="input-group">
//                                   <input
//                                     type="email"
//                                     name="userEmail"
//                                     value={formData.userEmail}
//                                     onChange={handleChange}
//                                     className={`form-control border-end-0 ${errors.userEmail ? 'is-invalid' : ''}`}
//                                     required
//                                   />
//                                   <span className="input-group-text border-start-0">
//                                     <i className="ti ti-mail"></i>
//                                   </span>
//                                   {errors.userEmail && <div className="invalid-feedback">{errors.userEmail}</div>}
//                                 </div>
//                               </div>
//                               <div className="mb-3">
//                                 <label className="form-label">Mobile Number</label>
//                                 <div className="input-group">
//                                   <input
//                                     type="tel"
//                                     name="userMobile"
//                                     value={formData.userMobile}
//                                     onChange={handleChange}
//                                     className={`form-control border-end-0 ${errors.userMobile ? 'is-invalid' : ''}`}
//                                     required
//                                     placeholder="Enter your 10-digit mobile number"
//                                   />
//                                   <span className="input-group-text border-start-0">
//                                     <i className="ti ti-phone"></i>
//                                   </span>
//                                   {errors.userMobile && <div className="invalid-feedback">{errors.userMobile}</div>}
//                                 </div>
//                               </div>
//                               <div className="mb-3">
//                                 <label className="form-label">Password</label>
//                                 <div className="pass-group" style={{ position: 'relative' }}>
//                                   <input
//                                     type={passwordVisible ? "text" : "password"}
//                                     name="userPassword"
//                                     value={formData.userPassword}
//                                     onChange={handleChange}
//                                     className={`form-control ${errors.userPassword ? 'is-invalid' : ''}`}
//                                     required
//                                     style={{ paddingRight: '40px' }}
//                                   />
//                                   <button
//                                     type="button"
//                                     onClick={togglePasswordVisibility}
//                                     style={{
//                                       position: 'absolute',
//                                       right: '10px',
//                                       top: '50%',
//                                       transform: 'translateY(-50%)',
//                                       background: 'none',
//                                       border: 'none',
//                                       cursor: 'pointer',
//                                       color: '#6c757d',
//                                       padding: '5px'
//                                     }}
//                                   >
//                                     {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//                                   </button>
//                                   {errors.userPassword && <div className="invalid-feedback">{errors.userPassword}</div>}
//                                 </div>
//                               </div>
//                               <div className="mb-3">
//                                 <label className="form-label">Confirm Password</label>
//                                 <div className="pass-group" style={{ position: 'relative' }}>
//                                   <input
//                                     type={confirmPasswordVisible ? "text" : "password"}
//                                     name="confirmPassword"
//                                     value={formData.confirmPassword}
//                                     onChange={handleChange}
//                                     className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
//                                     required
//                                     style={{ paddingRight: '40px' }}
//                                   />
//                                   <button
//                                     type="button"
//                                     onClick={toggleConfirmPasswordVisibility}
//                                     style={{
//                                       position: 'absolute',
//                                       right: '10px',
//                                       top: '50%',
//                                       transform: 'translateY(-50%)',
//                                       background: 'none',
//                                       border: 'none',
//                                       cursor: 'pointer',
//                                       color: '#6c757d',
//                                       padding: '5px'
//                                     }}
//                                   >
//                                     {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
//                                   </button>
//                                   {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
//                                 </div>
//                               </div>
//                               <div className="d-flex align-items-center justify-content-between mb-3">
//                                 <div className="d-flex align-items-center">
//                                   <div className="form-check form-check-md mb-0">
//                                     <input
//                                       className="form-check-input"
//                                       id="sendEmails"
//                                       type="checkbox"
//                                       name="sendEmails"
//                                       checked={formData.sendEmails}
//                                       onChange={handleChange}
//                                     />
//                                     <label htmlFor="sendEmails" className="form-check-label text-dark mt-0">
//                                       Send me helpful emails
//                                     </label>
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="d-flex align-items-center justify-content-between mb-3">
//                                 <div className="d-flex align-items-center">
//                                   <div className="form-check form-check-md mb-0">
//                                     <input
//                                       className="form-check-input"
//                                       id="agreeTerms"
//                                       type="checkbox"
//                                       name="agreeTerms"
//                                       checked={formData.agreeTerms}
//                                       onChange={handleChange}
//                                       required
//                                     />
//                                     <label htmlFor="agreeTerms" className="form-check-label text-dark mt-0">
//                                       Agree to <span className="text-primary">Terms & Privacy</span>
//                                     </label>
//                                   </div>
//                                 </div>
//                               </div>
//                               {errors.agreeTerms && <div className="text-danger mb-3">{errors.agreeTerms}</div>}
//                               <div className="mb-3">
//                                 <button 
//                                   type="submit" 
//                                   className="btn btn-primary w-100" 
//                                   disabled={!formData.agreeTerms || isSubmitting}
//                                 >
//                                   {isSubmitting ? (
//                                     <>
//                                       <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                                       Processing...
//                                     </>
//                                   ) : 'Sign Up'}
//                                 </button>
//                               </div>
//                             </>
//                           ) : (
//                             <div className="text-center">
//                               <h4 className="text-success mb-3">Registration Complete!</h4>
//                               <p className="mb-4">Your account has been successfully created.</p>
//                               <Link to="/employer/login" className="btn btn-primary">
//                                 Continue to Login
//                               </Link>
//                             </div>
//                           )}

//                           {!registrationSuccess && (
//                             <>
//                               <div className="text-center">
//                                 <h6 className="fw-normal text-dark mb-0">
//                                   Already have an account?
//                                   <Link to="/employer/login" className="hover-a">Sign In</Link>
//                                 </h6>
//                               </div>
//                               <div className="login-or">
//                                 <span className="span-or">Or</span>
//                               </div>
//                               <div className="mt-2">
//                                 <div className="d-flex align-items-center justify-content-center flex-wrap">
//                                   <div className="text-center me-2 flex-fill">
//                                     <button
//                                       type="button"
//                                       className="br-10 p-2 btn btn-info d-flex align-items-center justify-content-center"
//                                     >
//                                       <img
//                                         className="img-fluid m-1"
//                                         src={facebookLogo}
//                                         alt="Facebook"
//                                       />
//                                     </button>
//                                   </div>
//                                   <div className="text-center me-2 flex-fill">
//                                     <button
//                                       type="button"
//                                       className="br-10 p-2 btn btn-outline-light border d-flex align-items-center justify-content-center"
//                                     >
//                                       <img
//                                         className="img-fluid m-1"
//                                         src={googleLogo}
//                                         alt="Google"
//                                       />
//                                     </button>
//                                   </div>
//                                   <div className="text-center flex-fill">
//                                     <button
//                                       type="button"
//                                       className="bg-dark br-10 p-2 btn btn-dark d-flex align-items-center justify-content-center"
//                                     >
//                                       <img
//                                         className="img-fluid m-1"
//                                         src={appleLogo}
//                                         alt="Apple"
//                                       />
//                                     </button>
//                                   </div>
//                                 </div>
//                               </div>
//                             </>
//                           )}
//                         </div>
//                         <div className="mt-5 pb-4 text-center">
//                           <p className="mb-0 text-gray-9">Copyright &copy; 2025 - EduJobz</p>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeRegister;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerSchool } from '../../api/services/projectServices';
import { validationsEmployeer } from '../../utils/validationsEmployeer';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

// Import images
import logo from '../../assets/employer/assets/img/logo.svg';
import bg1 from '../../assets/employer/assets/img/bg/bg-01.webp';
import bg2 from '../../assets/employer/assets/img/bg/bg-02.png';
import bg3 from '../../assets/employer/assets/img/bg/bg-03.webp';
import authBg from '../../assets/employer/assets/img/bg/authentication-bg-01.webp';
import facebookLogo from '../../assets/employer/assets/img/icons/facebook-logo.svg';
import googleLogo from '../../assets/employer/assets/img/icons/google-logo.svg';
import appleLogo from '../../assets/employer/assets/img/icons/apple-logo.svg';

const EmployeeRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    schoolName: '',
    userEmail: '',
    userMobile: '',
    userPassword: '',
    confirmPassword: '',
    sendEmails: false,
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // State for OTP functionality
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (apiError) setApiError(null);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  // Send OTP to backend
  const sendOtp = async () => {
    if (!formData.userEmail) {
      setOtpError('Please enter your email address first');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.userEmail)) {
      setOtpError('Please enter a valid email address');
      return;
    }

    setIsSendingOtp(true);
    setOtpError('');

    try {
      const response = await axios.post('https://edujobemailverification.onrender.com/api/send-otp', {
        email: formData.userEmail
      });

      if (response.data.success) {
        setIsOtpSent(true);
        setOtpError('');
      } else {
        setOtpError(response.data.error || 'Failed to send OTP');
      }
    } catch (error) {
      setOtpError(error.response?.data?.error || 'Failed to send OTP');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Verify OTP with backend
  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setOtpError('Please enter a 6-digit OTP');
      return;
    }

    setIsVerifyingOtp(true);
    setOtpError('');

    try {
      const response = await axios.post('https://edujobemailverification.onrender.com/api/verify-otp', {
        email: formData.userEmail,
        otp
      });

      if (response.data.success) {
        setIsOtpVerified(true);
        setOtpError('');
      } else {
        setOtpError(response.data.error || 'Invalid OTP');
        setIsOtpVerified(false);
      }
    } catch (error) {
      setOtpError(error.response?.data?.error || 'Verification failed');
      setIsOtpVerified(false);
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setApiError(null);
  //   setRegistrationSuccess(false);
    
  //   // Validate OTP verification
  //   if (!isOtpVerified) {
  //     setApiError('Please verify your email with OTP');
  //     return;
  //   }

  //   const validationErrors = validationsEmployeer(formData);
  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //     return;
  //   }
    
  //   if (!formData.agreeTerms) {
  //     setApiError('You must agree to the terms and privacy policy');
  //     return;
  //   }

  //   setIsSubmitting(true);
    
  //   try {
  //     const payload = {
  //       schoolName: formData.schoolName,
  //       userEmail: formData.userEmail,
  //       userMobile: formData.userMobile,
  //       userPassword: formData.userPassword,
  //       sendEmails: formData.sendEmails
  //     };
      
  //     const response = await registerSchool(payload);
      
  //     if (response.data && response.data.success) {
  //       setRegistrationSuccess(true);
  //       // Clear form on successful registration
  //       setFormData({
  //         schoolName: '',
  //         userEmail: '',
  //         userMobile: '',
  //         userPassword: '',
  //         confirmPassword: '',
  //         sendEmails: false,
  //         agreeTerms: false
  //       });
  //     } else {
  //       setApiError(response.data.message || 'Registration failed. Please try again.');
  //     }
  //   } catch (err) {
  //     console.error('Registration error:', err);
  //     const errorMessage = err.response?.data?.message || 'An error occurred during registration';
  //     setApiError(errorMessage);
      
  //     if (err.response?.data?.errors) {
  //       setErrors(err.response.data.errors);
  //     }
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

const handleSubmit = async (e) => {
  e.preventDefault();
  setApiError(null);
  setRegistrationSuccess(false);
  
  // Validate OTP verification
  if (!isOtpVerified) {
    setApiError('Please verify your email with OTP');
    return;
  }

  const validationErrors = validationsEmployeer(formData);
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }
  
  if (!formData.agreeTerms) {
    setApiError('You must agree to the terms and privacy policy');
    return;
  }

  setIsSubmitting(true);
  
  try {
    const payload = {
      schoolName: formData.schoolName,
      userEmail: formData.userEmail,
      userMobile: formData.userMobile,
      userPassword: formData.userPassword,
      sendEmails: formData.sendEmails
    };
    
    const response = await registerSchool(payload);
    
    if (response.data && response.data.success) {
      setRegistrationSuccess(true);
      // Clear form on successful registration
      setFormData({
        schoolName: '',
        userEmail: '',
        userMobile: '',
        userPassword: '',
        confirmPassword: '',
        sendEmails: false,
        agreeTerms: false
      });
    } else {
      setApiError(response.data.message || 'Registration failed. Please try again.');
    }
  } catch (err) {
    console.error('Registration error:', err);
    const errorMessage = err.response?.data?.message || 'An error occurred during registration';
    
    // Handle duplicate email/mobile errors
    if (err.response?.data?.errors) {
      const errorData = err.response.data.errors;
      
      // Check for duplicate email error
      if (errorData.some(e => e.path === 'userEmail')) {
        setApiError('Email address is already registered');
        setErrors(prev => ({
          ...prev,
          userEmail: 'This email is already registered'
        }));
      }
      // Check for duplicate mobile error
      else if (errorData.some(e => e.path === 'userMobile')) {
        setApiError('Mobile number is already registered');
        setErrors(prev => ({
          ...prev,
          userMobile: 'This mobile number is already registered'
        }));
      } else {
        setApiError(errorMessage);
      }
    } 
    // Handle generic duplicate errors from error message
    else if (errorMessage.includes('already exists')) {
      if (errorMessage.includes('email')) {
        setApiError('Email address is already registered');
        setErrors(prev => ({
          ...prev,
          userEmail: 'This email is already registered'
        }));
      } else if (errorMessage.includes('mobile')) {
        setApiError('Mobile number is already registered');
        setErrors(prev => ({
          ...prev,
          userMobile: 'This mobile number is already registered'
        }));
      } else {
        setApiError(errorMessage);
      }
    } else {
      setApiError(errorMessage);
    }
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="bg-white">
      {/* Main Wrapper */}
      <div className="main-wrapper">
        <div className="container-fuild">
          <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
            <div className="row">
              <div className="col-lg-8">
                <div className="login-background position-relative d-lg-flex align-items-center justify-content-center d-none flex-wrap vh-100">
                  <div className="bg-overlay-img">
                    <img src={bg1} className="bg-1" alt="Background 1" />
                    <img src={bg2} className="bg-2" alt="Background 2" />
                    <img src={bg3} className="bg-3" alt="Background 3" />
                  </div>
                  <div className="authentication-card w-100">
                    <div className="authen-overlay-item border w-100">
                      <h1 className="text-white display-1" style={{ textAlign: 'center' }}>
                        Empowering Schools through seamless Staff management.
                      </h1>
                      <div className="my-4 mx-auto authen-overlay-img">
                        <img src={authBg} alt="Authentication Background" />
                      </div>
                      <div>
                        <p className="text-white fs-20 fw-semibold text-center">
                          Efficiently manage your workforce, streamline <br /> operations effortlessly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
                  <div className="col-lg-10 mx-auto vh-100">
                    <form onSubmit={handleSubmit} className="vh-100" noValidate>
                      <div className="vh-100 d-flex flex-column justify-content-between p-4 pb-0">
                        <div className="mx-auto mb-4 text-center">
                          <img src={logo} width="240px" className="img-fluid" alt="Logo" />
                        </div>
                        <div>
                          {/* Success and Error Messages */}
                          {registrationSuccess && (
                            <div className="alert alert-success mb-3" role="alert">
                              <div className="d-flex flex-column">
                                <span>Registration successful!</span>
                                <div className="mt-2">
                                  <Link 
                                    to="/employer/login" 
                                    className="btn btn-sm btn-success"
                                  >
                                    Proceed to Login
                                  </Link>
                                </div>
                              </div>
                            </div>
                          )}
                          {apiError && (
                            <div className="alert alert-danger mb-3" role="alert">
                              {apiError}
                            </div>
                          )}

                          {!registrationSuccess ? (
                            <>
                              <div className="text-center mb-3">
                                <h2 className="mb-2">Sign Up</h2>
                                <p className="mb-0">Please enter your details to sign up</p>
                              </div>
                              <div className="mb-3">
                                <label className="form-label">School Name</label>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    name="schoolName"
                                    value={formData.schoolName}
                                    onChange={handleChange}
                                    className={`form-control border-end-0 ${errors.schoolName ? 'is-invalid' : ''}`}
                                    required
                                  />
                                  <span className="input-group-text border-start-0">
                                    <i className="ti ti-school"></i>
                                  </span>
                                  {errors.schoolName && <div className="invalid-feedback">{errors.schoolName}</div>}
                                </div>
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Email Address</label>
                                <div className="input-group">
                                  <input
                                    type="email"
                                    name="userEmail"
                                    value={formData.userEmail}
                                    onChange={handleChange}
                                    className={`form-control border-end-0 ${errors.userEmail ? 'is-invalid' : ''}`}
                                    required
                                    disabled={isOtpSent}
                                  />
                                  <span className="input-group-text border-start-0">
                                    <i className="ti ti-mail"></i>
                                  </span>
                                  {errors.userEmail && <div className="invalid-feedback">{errors.userEmail}</div>}
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                  <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="form-control me-2"
                                    style={{ width: '150px' }}
                                    disabled={!isOtpSent}
                                    maxLength="6"
                                  />
                                  {!isOtpSent ? (
                                    <button
                                      type="button"
                                      onClick={sendOtp}
                                      className="btn btn-outline-primary"
                                      disabled={isSendingOtp || !formData.userEmail || errors.userEmail}
                                    >
                                      {isSendingOtp ? 'Sending...' : 'Send OTP'}
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={verifyOtp}
                                      className={`btn ${isOtpVerified ? 'btn-success' : 'btn-primary'}`}
                                      disabled={isVerifyingOtp || isOtpVerified}
                                    >
                                      {isVerifyingOtp ? 'Verifying...' : isOtpVerified ? 'Verified' : 'Verify'}
                                    </button>
                                  )}
                                </div>
                                {isOtpSent && !isOtpVerified && (
                                  <small className="text-muted">OTP sent to your email</small>
                                )}
                                {isOtpVerified && (
                                  <small className="text-success">Email verified successfully!</small>
                                )}
                                {otpError && (
                                  <div className="text-danger small mt-1">{otpError}</div>
                                )}
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Mobile Number</label>
                                <div className="input-group">
                                  <input
                                    type="tel"
                                    name="userMobile"
                                    value={formData.userMobile}
                                    onChange={handleChange}
                                    className={`form-control border-end-0 ${errors.userMobile ? 'is-invalid' : ''}`}
                                    required
                                    placeholder="Enter your 10-digit mobile number"
                                  />
                                  <span className="input-group-text border-start-0">
                                    <i className="ti ti-phone"></i>
                                  </span>
                                  {errors.userMobile && <div className="invalid-feedback">{errors.userMobile}</div>}
                                </div>
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Password</label>
                                <div className="pass-group" style={{ position: 'relative' }}>
                                  <input
                                    type={passwordVisible ? "text" : "password"}
                                    name="userPassword"
                                    value={formData.userPassword}
                                    onChange={handleChange}
                                    className={`form-control ${errors.userPassword ? 'is-invalid' : ''}`}
                                    required
                                    style={{ paddingRight: '40px' }}
                                  />
                                  <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    style={{
                                      position: 'absolute',
                                      right: '10px',
                                      top: '50%',
                                      transform: 'translateY(-50%)',
                                      background: 'none',
                                      border: 'none',
                                      cursor: 'pointer',
                                      color: '#6c757d',
                                      padding: '5px'
                                    }}
                                  >
                                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                  </button>
                                  {errors.userPassword && <div className="invalid-feedback">{errors.userPassword}</div>}
                                </div>
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Confirm Password</label>
                                <div className="pass-group" style={{ position: 'relative' }}>
                                  <input
                                    type={confirmPasswordVisible ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                    required
                                    style={{ paddingRight: '40px' }}
                                  />
                                  <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    style={{
                                      position: 'absolute',
                                      right: '10px',
                                      top: '50%',
                                      transform: 'translateY(-50%)',
                                      background: 'none',
                                      border: 'none',
                                      cursor: 'pointer',
                                      color: '#6c757d',
                                      padding: '5px'
                                    }}
                                  >
                                    {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                  </button>
                                  {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between mb-3">
                                <div className="d-flex align-items-center">
                                  <div className="form-check form-check-md mb-0">
                                    <input
                                      className="form-check-input"
                                      id="sendEmails"
                                      type="checkbox"
                                      name="sendEmails"
                                      checked={formData.sendEmails}
                                      onChange={handleChange}
                                    />
                                    <label htmlFor="sendEmails" className="form-check-label text-dark mt-0">
                                      Send me helpful emails
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between mb-3">
                                <div className="d-flex align-items-center">
                                  <div className="form-check form-check-md mb-0">
                                    <input
                                      className="form-check-input"
                                      id="agreeTerms"
                                      type="checkbox"
                                      name="agreeTerms"
                                      checked={formData.agreeTerms}
                                      onChange={handleChange}
                                      required
                                    />
                                    <label htmlFor="agreeTerms" className="form-check-label text-dark mt-0">
                                      Agree to <span className="text-primary">Terms & Privacy</span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                              {errors.agreeTerms && <div className="text-danger mb-3">{errors.agreeTerms}</div>}
                              <div className="mb-3">
                                <button 
                                  type="submit" 
                                  className="btn btn-primary w-100" 
                                  disabled={!formData.agreeTerms || isSubmitting || !isOtpVerified}
                                >
                                  {isSubmitting ? (
                                    <>
                                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                      Processing...
                                    </>
                                  ) : 'Sign Up'}
                                </button>
                              </div>
                            </>
                          ) : (
                            <div className="text-center">
                              <h4 className="text-success mb-3">Registration Complete!</h4>
                              <p className="mb-4">Your account has been successfully created.</p>
                              <Link to="/employer/login" className="btn btn-primary">
                                Continue to Login
                              </Link>
                            </div>
                          )}

                          {!registrationSuccess && (
                            <>
                              <div className="text-center">
                                <h6 className="fw-normal text-dark mb-0">
                                  Already have an account?
                                  <Link to="/employer/login" className="hover-a">Sign In</Link>
                                </h6>
                              </div>
                              <div className="login-or">
                                <span className="span-or">Or</span>
                              </div>
                              <div className="mt-2">
                                <div className="d-flex align-items-center justify-content-center flex-wrap">
                                  <div className="text-center me-2 flex-fill">
                                    <button
                                      type="button"
                                      className="br-10 p-2 btn btn-info d-flex align-items-center justify-content-center"
                                    >
                                      <img
                                        className="img-fluid m-1"
                                        src={facebookLogo}
                                        alt="Facebook"
                                      />
                                    </button>
                                  </div>
                                  <div className="text-center me-2 flex-fill">
                                    <button
                                      type="button"
                                      className="br-10 p-2 btn btn-outline-light border d-flex align-items-center justify-content-center"
                                    >
                                      <img
                                        className="img-fluid m-1"
                                        src={googleLogo}
                                        alt="Google"
                                      />
                                    </button>
                                  </div>
                                  <div className="text-center flex-fill">
                                    <button
                                      type="button"
                                      className="bg-dark br-10 p-2 btn btn-dark d-flex align-items-center justify-content-center"
                                    >
                                      <img
                                        className="img-fluid m-1"
                                        src={appleLogo}
                                        alt="Apple"
                                      />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="mt-5 pb-4 text-center">
                          <p className="mb-0 text-gray-9">Copyright &copy; 2025 - EduJobz</p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRegister;