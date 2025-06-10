// import React from 'react';
// import { FaUserCircle } from 'react-icons/fa';

// const SchoolRegistration = () => {
//   return (
//     <>
//       {/* Sub Visual of the page */}
//       <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 pt-lg-150 pb-30 text-white">
//         <div className="container position-relative text-center">
//           <div className="row">
//             <div className="col-12">
//               <div className="subvisual-textbox">
//                 <h1 className="text-primary mb-0">School Registration</h1>
//                 <p>Feel free to get in touch with us. Need Help?</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main content */}
//       <main className="jobplugin__main">
//         <div className="jobplugin__main-holder">
//           <span className="jobplugin__pattern default-right"></span>
//           <span className="jobplugin__pattern default-left"></span>
          
//           <div className="jobplugin__visual-pattern">
//             <img src="images/visual-pattern.png" alt="Decorative pattern" />
//           </div>
//           <br />
          
//           <div className="jobplugin__container">
//             {/* User Box */}
//             <div className="jobplugin__userbox bg-light shadow">
//               <span className="jobplugin__userbox-bar jobplugin__bg-primary"></span>
              
//               {/* Social Login Options */}
//               <div style={{ textAlign: 'center' }}>
//                 <p className="mb-0"><b>Continue With</b></p>
//                 <a href="#" className="button-continue bg-white text-secondary btn-app border border-secondary btn-play-store">
//                   <span className="rj-icon rj-google"></span>
//                 </a>
//                 <a href="#" className="button-continue btn-app btn-app-store bg-secondary">
//                   <span className="btn-text">In</span>
//                 </a>
//                 <a href="#" className="button-continue btn-app btn-app-store">
//                   <span className="rj-icon rj-apple"></span>
//                 </a>
//               </div>
//               <br />
              
//               <div className="jobplugin__userbox-seperator">
//                 <span className="bg-light">or</span>
//               </div>
              
//               {/* Registration Form */}
//               <h1 className="text-secondary h3">Sign Up as School</h1>
//               <form action="#">
//                 <div className="jobplugin__form">
//                   {/* School Name */}
//                   <label htmlFor="schoolname">School / company Full Name</label>
//                   <div className="jobplugin__form-row">
//                     <div className="jobplugin__form-field">
//                       <input 
//                         type="text" 
//                         id="schoolname" 
//                         style={{ padding: '5px 30px' }} 
//                         className="form-control" 
//                         placeholder="School Full Name" 
//                       />
//                     </div>
//                   </div>
                  
//                   {/* Name Fields */}
//                   <div className="jobplugin__form-row">
//                     <div className="jobplugin__form-field">
//                       <input 
//                         type="text" 
//                         placeholder="First Name" 
//                         style={{ padding: '5px 30px' }} 
//                         className="form-control" 
//                       />
//                     </div>
//                     <div className="jobplugin__form-field">
//                       <input 
//                         type="text" 
//                         placeholder="Last Name" 
//                         style={{ padding: '5px 30px' }} 
//                         className="form-control" 
//                       />
//                     </div>
//                   </div>
                  
//                   {/* Contact Info */}
//                   <div className="jobplugin__form-row">
//                     <div className="jobplugin__form-field">
//                       <input 
//                         type="text" 
//                         placeholder="Preferable contact Number" 
//                         style={{ padding: '5px 30px' }} 
//                         className="form-control" 
//                       />
//                     </div>
//                     <div className="jobplugin__form-field">
//                       <input 
//                         type="url" 
//                         placeholder="Website" 
//                         style={{ padding: '5px 30px' }} 
//                         className="form-control" 
//                       />
//                     </div>
//                   </div>
                  
//                   {/* Address Section */}
//                   <label htmlFor="address">Address</label>
//                   <div className="jobplugin__form-row">
//                     <div className="jobplugin__form-field">
//                       <input 
//                         type="text" 
//                         className="form-control" 
//                         style={{ padding: '5px 30px' }} 
//                         placeholder="Door No / Building / Street Name, etc" 
//                       />
//                     </div>
//                     <div className="jobplugin__form-field">
//                       <input 
//                         type="text" 
//                         className="form-control" 
//                         style={{ padding: '5px 30px' }} 
//                         placeholder="Area" 
//                       />
//                     </div>
//                   </div>
                  
//                   {/* Location Dropdowns */}
//                   <div className="jobplugin__form-row">
//                     <div className="jobplugin__form-field">
//                       <select className="select2" name="state" data-placeholder="Select State">
//                         <option label="Placeholder"></option>
//                         <option value="karnataka">Karnataka</option>
//                       </select>
//                     </div>
//                     <div className="jobplugin__form-field">
//                       <select className="select2" name="state" data-placeholder="Select City">
//                         <option label="Placeholder"></option>
//                         <option value="bengaluru">Bengaluru</option>
//                         <option value="mysuru">Mysuru</option>
//                       </select>
//                     </div>
//                   </div>
                  
//                   {/* Additional Address Info */}
//                   <div className="jobplugin__form-row">
//                     <div className="jobplugin__form-field">
//                       <input 
//                         type="text" 
//                         className="form-control" 
//                         style={{ padding: '5px 30px' }} 
//                         placeholder="Pincode" 
//                       />
//                     </div>
//                     <div className="jobplugin__form-field">
//                       <input 
//                         type="text" 
//                         className="form-control" 
//                         style={{ padding: '5px 30px' }} 
//                         placeholder="Landmark" 
//                       />
//                     </div>
//                   </div>
                  
//                   {/* School Info */}
//                   <div className="jobplugin__form-row">
//                     <div className="jobplugin__form-field">
//                       <select className="select2" name="state" data-placeholder="Select Board">
//                         <option label="Placeholder"></option>
//                         <option value="cbsc">CBSC</option>
//                       </select>
//                     </div>
//                     <div className="jobplugin__form-field">
//                       <select className="select2" name="state" data-placeholder="Type of Institution">
//                         <option label="Placeholder"></option>
//                       </select>
//                     </div>
//                   </div>
                  
//                   {/* Login Information */}
//                   <label htmlFor="login">Login Information</label>
//                   <div className="jobplugin__form-row">
//                     <div className="jobplugin__form-field">
//                       <input 
//                         type="email" 
//                         className="form-control" 
//                         style={{ padding: '5px 30px' }} 
//                         placeholder="Email Address" 
//                       />
//                     </div>
//                   </div>
                  
//                   {/* Password Fields */}
//                   <div className="jobplugin__form-row">
//                     <div className="jobplugin__form-field">
//                       <input 
//                         type="password" 
//                         className="form-control" 
//                         style={{ padding: '5px 30px' }} 
//                         placeholder="Password (8 or more characters)" 
//                       />
//                     </div>
//                     <div className="jobplugin__form-field">
//                       <input 
//                         type="password" 
//                         className="form-control" 
//                         style={{ padding: '5px 30px' }} 
//                         placeholder="Confirm Password" 
//                       />
//                     </div>
//                   </div>
                  
//                   <hr />
                  
//                   {/* Checkbox Options */}
//                   <div className="jobplugin__form-row">
//                     <div className="jobplugin__form-field mb-0">
//                       <label className="jobplugin__form-checkbox">
//                         <input type="checkbox" />
//                         <span className="jobplugin__form-checkbox__btn"></span>
//                       </label>
//                       <span className="label-text">
//                         Send me helpful emails to find resources and job leads.
//                       </span>
//                     </div>
//                   </div>
                  
//                   <div className="jobplugin__form-row">
//                     <div className="jobplugin__form-field">
//                       <label className="jobplugin__form-checkbox">
//                         <input type="checkbox" />
//                         <span className="jobplugin__form-checkbox__btn"></span>
//                       </label>
//                       <span className="label-text">
//                         Yes, I understand and agree to the{' '}
//                         <a className="hover:jobplugin__text-primary" href="#">
//                           Terms of Service
//                         </a>, including the{' '}
//                         <a className="hover:jobplugin__text-primary" href="#">
//                           User Agreement
//                         </a> and{' '}
//                         <a className="hover:jobplugin__text-primary" href="#">
//                           Privacy Policy
//                         </a>.
//                       </span>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Submit Button */}
//                 <div className="jobplugin__userbox-button">
//                   <button 
//                     type="button" 
//                     className="jobplugin__button large jobplugin__bg-primary hover:jobplugin__bg-secondary"
//                   >
//                     <i className="icon icon-briefcase3 text-primary" style={{ fontSize: '14px' }}></i>
//                     &nbsp; Signup
//                   </button>
//                 </div>
//               </form>
              
//               <br />
              
//               {/* Login Link */}
//               <div className="jobplugin__userbox-seperator mb-0">
//                 <span className="bg-light">or</span>
//               </div>
//               <p className="jobplugin__userbox-textinfo mt-0">
//                 Already have an account? &nbsp;{' '}
//                 <a 
//                   className="hover:jobplugin__text-primary" 
//                   href="login" 
//                   style={{ textDecoration: 'none' }}
//                 >
//                   <FaUserCircle /> Log In
//                 </a>
//               </p>
//             </div>
//           </div>
//           <br />
//         </div>
//       </main>
//     </>
//   );
// };

// export default SchoolRegistration;



import React  from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { validationsEmployeer } from '../../../utils/validationsEmployeer';
import { useRegistrationForm } from '../../../hooks/useRegistrationForm';
import { useEmployeeRegistration } from '../../../hooks/useEmployeeRegistration';
import { usePasswordToggle } from '../../../hooks/usePasswordToggle';
import { useAutoClearMessages } from '../../../hooks/useAutoClearMessages';

const SchoolRegistration = () => {
  const navigate =  useNavigate();
  const { schoolregister, isLoading, error, success, clearMessages } = useEmployeeRegistration();
  const [passwordInputType, passwordIcon, togglePassword] = usePasswordToggle();
  const [confirmPasswordInputType, confirmPasswordIcon, toggleConfirmPassword] = usePasswordToggle();
  
  useAutoClearMessages();

  const { values, errors, handleChange, handleSubmit } = useRegistrationForm(
    async (formValues) => {
      const { confirmPassword, ...schoolData } = formValues;
      const response = await schoolregister(schoolData);
      if (response) {
        setTimeout(() => navigate('/login'),2000);
      }
    },
    validationsEmployeer
  );

  return (
    <>
      <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 pt-lg-150 pb-30 text-white">
        <div className="container position-relative text-center">
          <div className="row">
            <div className="col-12">
              <div className="subvisual-textbox">
                <h1 className="text-primary mb-0">Candidates  Registration</h1>
                <p>Feel free to get in touch with us. Need Help?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <main className="jobplugin__main">
        <div className="jobplugin__main-holder">
          <span className="jobplugin__pattern default-right"></span>
          <span className="jobplugin__pattern default-left"></span>
          <div className="jobplugin__visual-pattern">
            <img src="images/visual-pattern.png" alt="Image Description" />
          </div>
          <br />
          
          <div className="jobplugin__container">
            <div className="jobplugin__userbox bg-light shadow">
              <span className="jobplugin__userbox-bar jobplugin__bg-primary"></span>
              
              <div style={{ textAlign: 'center' }}>
                <p className="mb-0"><b>Continue With</b></p>
                <a href="#" className="button-continue bg-white text-secondary btn-app border border-secondary btn-play-store">
                  <span className="rj-icon rj-google"></span>
                </a>
                <a href="#" className="button-continue btn-app btn-app-store bg-secondary">
                  <span className="btn-text">LinkedIn</span>
                </a>
                <a href="#" className="button-continue btn-app btn-app-store">
                  <span className="rj-icon rj-apple"></span>
                </a>
              </div>
              <br />
              
              <div className="jobplugin__userbox-seperator">
                <span className="bg-light">or</span>
              </div>
              
              <h1 className="text-secondary h3">Sign Up as School</h1>
              
              <form onSubmit={handleSubmit}>
                <div className="jobplugin__form">
                  {/* Error message */}
                  {error && (
                    <div className="jobplugin__form-row">
                      <div className="alert alert-danger">{error}</div>
                    </div>
                  )}
                  
                  {/* Success message */}
                  {success && (
                    <div className="jobplugin__form-row">
                      <div className="alert alert-success">
                        Registration successful!
                      </div>
                    </div>
                  )}
                  
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <input 
                        type="text" 
                        name="schoolName"
                        placeholder="School Name" 
                        value={values.schoolName || ''}
                        onChange={handleChange}
                        className={`form-control ${errors.schoolName ? 'is-invalid' : ''}`}
                        style={{ padding: '5px 30px' }}
                      />
                      {errors.schoolName && <div className="invalid-feedback">{errors.schoolName}</div>}
                    </div>
                    <div className="jobplugin__form-field">
                      <input 
                        type="email" 
                        name="userEmail"
                        placeholder="Email Address" 
                        value={values.userEmail || ''}
                        onChange={handleChange}
                        className={`form-control ${errors.userEmail ? 'is-invalid' : ''}`}
                        style={{ padding: '5px 30px' }}
                      />
                      {errors.userEmail && <div className="invalid-feedback">{errors.userEmail}</div>}
                    </div>
                  </div>
                  
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <input 
                        type="text" 
                        name="userMobile"
                        placeholder="Phone Number" 
                        value={values.userMobile || ''}
                        onChange={handleChange}
                        className={`form-control ${errors.userMobile ? 'is-invalid' : ''}`}
                        style={{ padding: '5px 30px' }}
                      />
                      {errors.userMobile && <div className="invalid-feedback">{errors.userMobile}</div>}
                    </div>
                    <div className="jobplugin__form-field" style={{ position: 'relative' }}>
                      <input 
                        type={passwordInputType}
                        name="userPassword"
                        placeholder="Password" 
                        value={values.userPassword || ''}
                        onChange={handleChange}
                        className={`form-control ${errors.userPassword ? 'is-invalid' : ''}`}
                        style={{ padding: '5px 30px 5px 30px', paddingRight: '40px' }}
                      />
                      <button
                        type="button"
                        onClick={togglePassword}
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
                        {passwordIcon === 'show' ? <FaEye /> : <FaEyeSlash />}
                      </button>
                      {errors.userPassword && <div className="invalid-feedback">{errors.userPassword}</div>}
                    </div>
                  </div>
                  
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field" style={{ position: 'relative' }}>
                      <input 
                        type={confirmPasswordInputType}
                        name="confirmPassword"
                        placeholder="Confirm Password" 
                        value={values.confirmPassword || ''}
                        onChange={handleChange}
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        style={{ padding: '5px 30px 5px 30px', paddingRight: '40px' }}
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPassword}
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
                        {confirmPasswordIcon === 'show' ? <FaEye /> : <FaEyeSlash />}
                      </button>
                      {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                    </div>
                    <div className="jobplugin__form-field">
                      {/* Empty field to maintain layout */}
                    </div>
                  </div>
                  
                  <hr />
                  
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field mb-0">
                      <label className="jobplugin__form-checkbox">
                        <input 
                          type="checkbox" 
                          name="sendEmails" 
                          checked={values.sendEmails || false} 
                          onChange={handleChange} 
                        />
                        <span className="jobplugin__form-checkbox__btn"></span>
                      </label>
                      <span className="label-text">
                        Send me helpful emails to find suitable jobs.
                      </span>
                      {errors.sendEmails && <div className="invalid-feedback d-block">{errors.sendEmails}</div>}
                    </div>
                  </div>
                  
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <label className="jobplugin__form-checkbox">
                        <input 
                          type="checkbox" 
                          name="agreeTerms" 
                          checked={values.agreeTerms || false} 
                          onChange={handleChange} 
                        />
                        <span className="jobplugin__form-checkbox__btn"></span>
                      </label>
                      <span className="label-text">
                        Yes, I understand and agree to the{' '}
                        <a className="hover:jobplugin__text-primary" href="#">
                          Terms of Service
                        </a>
                        , including the{' '}
                        <a className="hover:jobplugin__text-primary" href="#">
                          User Agreement
                        </a>{' '}
                        and{' '}
                        <a className="hover:jobplugin__text-primary" href="#">
                          Privacy Policy
                        </a>
                        .
                      </span>
                      {errors.agreeTerms && <div className="invalid-feedback d-block">{errors.agreeTerms}</div>}
                    </div>
                  </div>
                </div>
                <div className="jobplugin__userbox-button">
                  <button 
                    type="submit" 
                    className="jobplugin__button large jobplugin__bg-primary hover:jobplugin__bg-secondary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Registering...' : (
                      <>
                        <i className="icon icon-briefcase3 text-primary" style={{ fontSize: '14px' }}></i>
                        &nbsp; Signup
                      </>
                    )}
                  </button>
                </div>
              </form>
              <br />
              
              <div className="jobplugin__userbox-seperator">
                <span className="bg-light">or</span>
              </div>
              
              <p className="jobplugin__userbox-textinfo">
                Already have an account? &nbsp;{' '}
                <a 
                  className="hover:jobplugin__text-primary" 
                  href="login" 
                  style={{ textDecoration: 'none' }}
                >
                  <i className="fa fa-user-circle"></i> Log In
                </a>
              </p>
            </div>
          </div>
          <br />
        </div>
      </main>
    </>
  );
};

export default SchoolRegistration;