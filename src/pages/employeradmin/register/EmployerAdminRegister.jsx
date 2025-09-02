import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

// Import images
import logo from '../../../assets/employer-admin/assets/img/logo - dark.png';
import bg1 from '../../../assets/employer-admin/assets/img/bg/bg-01.webp';
import bg2 from '../../../assets/employer-admin/assets/img/bg/bg-02.png';
import bg3 from '../../../assets/employer-admin/assets/img/bg/bg-03.webp';
import authBg from '../../../assets/employer-admin/assets/img/bg/authentication-bg-01.webp';
import facebookLogo from '../../../assets/employer-admin/assets/img/icons/facebook-logo.svg';
import googleLogo from '../../../assets/employer-admin/assets/img/icons/google-logo.svg';
import appleLogo from '../../../assets/employer-admin/assets/img/icons/apple-logo.svg';
import { registerEmployerAdmin } from '../../../api/services/projectServices';

const EmployerAdminRegister = () => {
  const [formData, setFormData] = useState({
    employeradminUsername: '',
    employeradminEmail: '',
    employeradminMobile: '',
    employeradminPassword: '',
    employerconfirmPassword: '',
    agreeTerms: false
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const validateForm = () => {
    if (!formData.employeradminUsername || !formData.employeradminEmail ||
      !formData.employeradminPassword || !formData.employerconfirmPassword) {
      setError('All fields are required');
      return false;
    }

    if (formData.employeradminPassword !== formData.employerconfirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (!formData.agreeTerms) {
      setError('You must agree to the Terms & Privacy');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.employeradminEmail)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!isOtpVerified) {
      setError('Please verify your email with OTP');
      return false;
    }

    return true;
  };

  // Send OTP to backend
  const sendOtp = async () => {
    if (!formData.employeradminEmail) {
      setOtpError('Please enter your email address first');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.employeradminEmail)) {
      setOtpError('Please enter a valid email address');
      return;
    }

    setIsSendingOtp(true);
    setOtpError('');

    try {
      const response = await axios.post('https://edujobemailverification.onrender.com/api/send-otp', {
        email: formData.employeradminEmail
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
        email: formData.employeradminEmail,
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
  //   setError('');

  //   if (!validateForm()) return;

  //   try {
  //     setLoading(true);

  //     const adminData = {
  //       employeradminUsername: formData.employeradminUsername,
  //       employeradminEmail: formData.employeradminEmail,
  //       employeradminMobile: formData.employeradminMobile,
  //       employeradminPassword: formData.employeradminPassword,
  //       employerconfirmPassword: formData.employerconfirmPassword
  //     };

  //     await registerEmployerAdmin(adminData);

  //     navigate('/employer-admin/login', {
  //       state: { registrationSuccess: true }
  //     });
  //   } catch (err) {
  //     console.error('Registration error:', err);
  //     setError(err.message || 'Registration failed. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const checkExistingData = async () => {
    try {
      // Attempt registration which will fail if email/mobile exists
      await registerEmployerAdmin({
        employeradminUsername: formData.employeradminUsername,
        employeradminEmail: formData.employeradminEmail,
        employeradminMobile: formData.employeradminMobile,
        employeradminPassword: formData.employeradminPassword,
        employerconfirmPassword: formData.employerconfirmPassword
      });

      // If no error, data doesn't exist
      return { emailExists: false, mobileExists: false };
    } catch (error) {
      // Parse error message to determine which field exists
      const errorMsg = error.response?.data?.message || error.message;

      if (errorMsg.includes('email')) {
        return { emailExists: true, mobileExists: false };
      } else if (errorMsg.includes('mobile')) {
        return { emailExists: false, mobileExists: true };
      }
      return { emailExists: false, mobileExists: false };
    }
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    try {
      setLoading(true);

      const adminData = {
        employeradminUsername: formData.employeradminUsername,
        employeradminEmail: formData.employeradminEmail,
        employeradminMobile: formData.employeradminMobile,
        employeradminPassword: formData.employeradminPassword,
        employerconfirmPassword: formData.employerconfirmPassword
      };

      await registerEmployerAdmin(adminData);

      navigate('/employer-admin/login', {
        state: { registrationSuccess: true }
      });

    } catch (err) {
      console.error('Registration error:', err);
      
      // Parse the error response for duplicate email or mobile
      const errorResponse = err.response?.data;
      const errorMessage = errorResponse?.message || err.message || 'Registration failed';

      if (errorResponse) {
        // Check for duplicate email error
        if (errorResponse.errors?.some(e => e.path === 'userEmail')) {
          setError('Email address is already registered');
          setValidationErrors(prev => ({
            ...prev,
            emailError: 'Email address is already registered'
          }));
        } 
        // Check for duplicate mobile error
        else if (errorResponse.errors?.some(e => e.path === 'userMobile')) {
          setError('Mobile number is already registered');
          setValidationErrors(prev => ({
            ...prev,
            mobileError: 'Mobile number is already registered'
          }));
        }
        // Generic duplicate error
        else if (errorMessage.includes('already exists')) {
          if (errorMessage.includes('email')) {
            setError('Email address is already registered');
          } else if (errorMessage.includes('mobile')) {
            setError('Mobile number is already registered');
          } else {
            setError(errorMessage);
          }
        } else {
          setError(errorMessage);
        }
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
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
                    <form onSubmit={handleSubmit} className="vh-100">
                      <div className="vh-100 d-flex flex-column justify-content-between p-4 pb-0">
                        <div className="mx-auto mb-4 text-center">
                          <img src={logo} width="240px" className="img-fluid" alt="Logo" />
                        </div>
                        <div>
                          <div className="text-center mb-3">
                            <h2 className="mb-2">Sign Up</h2>
                            <p className="mb-0">Please enter your details to sign up</p>
                          </div>

                          {error && (
                            <div className="alert alert-danger mb-3" role="alert">
                              {error}
                            </div>
                          )}

                          <div className="mb-3">
                            <label className="form-label">Name</label>
                            <div className="input-group">
                              <input
                                type="text"
                                name="employeradminUsername"
                                value={formData.employeradminUsername}
                                onChange={handleChange}
                                className="form-control border-end-0"
                                required
                              />
                              <span className="input-group-text border-start-0">
                                <i className="ti ti-user"></i>
                              </span>
                            </div>
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Email Address</label>
                            <div className="input-group">
                              <input
                                type="email"
                                name="employeradminEmail"
                                value={formData.employeradminEmail}
                                onChange={handleChange}
                                className="form-control border-end-0"
                                required
                                disabled={isOtpSent}
                              />
                              <span className="input-group-text border-start-0">
                                <i className="ti ti-mail"></i>
                              </span>
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
                                  disabled={isSendingOtp || !formData.employeradminEmail}
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
                                name="employeradminMobile"
                                value={formData.employeradminMobile}
                                onChange={handleChange}
                                className="form-control border-end-0"
                              />
                              <span className="input-group-text border-start-0">
                                <i className="ti ti-phone"></i>
                              </span>
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Password</label>
                            <div className="pass-group" style={{ position: 'relative' }}>
                              <input
                                type={passwordVisible ? "text" : "password"}
                                name="employeradminPassword"
                                value={formData.employeradminPassword}
                                onChange={handleChange}
                                className="form-control"
                                style={{ paddingRight: '40px' }}
                                required
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
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Confirm Password</label>
                            <div className="pass-group" style={{ position: 'relative' }}>
                              <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                name="employerconfirmPassword"
                                value={formData.employerconfirmPassword}
                                onChange={handleChange}
                                className="form-control"
                                style={{ paddingRight: '40px' }}
                                required
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
                          <div className="mb-3">
                            <button
                              type="submit"
                              className="btn btn-primary w-100"
                              disabled={loading || !isOtpVerified}
                            >
                              {loading ? (
                                <>
                                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                  Processing...
                                </>
                              ) : 'Sign Up'}
                            </button>
                          </div>
                          <div className="text-center">
                            <h6 className="fw-normal text-dark mb-0">
                              Already have an account?
                              <Link to="/employer-admin/login" className="hover-a">Sign In</Link>
                            </h6>
                          </div>
                    
                        </div>
                        <div className="mt-5 pb-4 text-center">
                          <p className="mb-0 text-gray-9">Copyright &copy; 2025 - EdProfio</p>
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

export default EmployerAdminRegister;