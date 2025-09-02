import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


// Import images (use the same ones from login page)
import logo from '../../assets/employer/assets/img/logo - dark.png';
import bg1 from '../../assets/employer/assets/img/bg/bg-01.webp';
import bg2 from '../../assets/employer/assets/img/bg/bg-02.png';
import bg3 from '../../assets/employer/assets/img/bg/bg-03.webp';
import authBg from '../../assets/employer/assets/img/bg/authentication-bg-01.webp';
import { changeEmployerPassword } from '../../api/services/projectServices';

const EmployerChangePassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    userMobile: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.userMobile) newErrors.userMobile = 'Mobile number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await changeEmployerPassword({
        userMobile: formData.userMobile,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });
      
      setSuccess('Password changed successfully!');
      // Optionally redirect after success
      setTimeout(() => {
        navigate('/employer/login');
      }, 2000);
      
    } catch (err) {
      console.error('Password change error:', err);
      setError(err.message || 'Failed to change password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
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
                      <div className="vh-100 d-flex flex-column justify-content-between p-4">
                        <div className="mx-auto mb-4 text-center">
                          <img src={logo} width="240px" className="img-fluid" alt="Logo" />
                        </div>
                        <div>
                          <div className="text-center mb-3">
                            <h2 className="mb-2">Change Password</h2>
                            <p className="mb-0">Please enter your details to change password</p>
                          </div>

                          {error && (
                            <div className="alert alert-danger mb-3">
                              {error}
                            </div>
                          )}

                          {success && (
                            <div className="alert alert-success mb-3">
                              {success}
                            </div>
                          )}

                          <div className="mb-3">
                            <label className="form-label">Mobile Number</label>
                            <div className="input-group">
                              <input
                                type="text"
                                name="userMobile"
                                value={formData.userMobile}
                                onChange={handleChange}
                                className={`form-control border-end-0 ${errors.userMobile ? 'is-invalid' : ''}`}
                                placeholder="Enter your registered mobile number"
                              />
                              <span className="input-group-text border-start-0">
                                <i className="ti ti-phone"></i>
                              </span>
                              {errors.userMobile && <div className="invalid-feedback">{errors.userMobile}</div>}
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">New Password</label>
                            <div className="pass-group">
                              <input
                                type={passwordVisible ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`pass-input form-control ${errors.password ? 'is-invalid' : ''}`}
                                placeholder="Enter new password (any length)"
                              />
                              <span
                                className={`ti toggle-password ${passwordVisible ? 'ti-eye' : 'ti-eye-off'}`}
                                onClick={togglePasswordVisibility}
                                style={{ cursor: 'pointer' }}
                              ></span>
                              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Confirm Password</label>
                            <div className="pass-group">
                              <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`pass-input form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                placeholder="Confirm new password"
                              />
                              <span
                                className={`ti toggle-password ${confirmPasswordVisible ? 'ti-eye' : 'ti-eye-off'}`}
                                onClick={toggleConfirmPasswordVisibility}
                                style={{ cursor: 'pointer' }}
                              ></span>
                              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                            </div>
                          </div>
                          <div className="mb-3">
                            <button
                              type="submit"
                              className="btn btn-primary w-100"
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <>
                                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                  Changing Password...
                                </>
                              ) : 'Change Password'}
                            </button>
                          </div>
                          <div className="text-center">
                            <h6 className="fw-normal text-dark mb-0">
                              Remember your password?{' '}
                              <Link to="/employer/login" className="hover-a">
                                {' '}
                                Sign In
                              </Link>
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

export default EmployerChangePassword;