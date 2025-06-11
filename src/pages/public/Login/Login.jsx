// employer and candidate login

// import React from 'react';
// import { FaUserTie, FaSchool, FaEye, FaEyeSlash } from 'react-icons/fa';
// import { usePasswordToggle } from '../../../hooks/usePasswordToggle';
// import { useLoginForm } from '../../../hooks/useLoginForm';
// import { useLogin } from '../../../hooks/useLogin';
// import { validateLoginForm } from '../../../utils/validateLogin';

// const LoginPage = () => {
//   const { login, isLoading, error, resetError } = useLogin();
//   const [passwordInputType, passwordIcon, togglePassword] = usePasswordToggle();
  
//   const { values, errors, handleChange, handleSubmit, setUserType } = useLoginForm(
//     async (formValues) => {
//       await login(formValues);
//     },
//     validateLoginForm
//   );

//   return (
//     <>
//       <div className="subvisual-block subvisual-theme-1 bg-white d-flex pt-60 text-white"></div>

//       <main className="jobplugin__main">
//         <div className="jobplugin__main-holder">
//           <span className="jobplugin__pattern default-right"></span>
//           <span className="jobplugin__pattern default-left"></span>
//           <div className="jobplugin__visual-pattern">
//             <img src="images/visual-pattern.png" alt="Decorative pattern" />
//           </div>
//           <br />
          
//           <div className="jobplugin__container">
//             <div className="jobplugin__userbox bg-light shadow">
//               <span className="jobplugin__userbox-bar jobplugin__bg-primary"></span>
//               <span className="jobplugin__userbox-bar"></span>
              
//               <h1 className="text-secondary h3 mb-0">Login to Continue</h1>
//               <br />

//               {error && (
//                 <div className="jobplugin__form-row">
//                   <div className="alert alert-danger">{error}</div>
//                 </div>
//               )}

//               <form onSubmit={handleSubmit}>
//                 <div className="jobplugin__form">
//                   <div className="jobplugin__form-row">
//                     <div className="jobplugin__form-field">
//                       <input 
//                         type="email" 
//                         name="email"
//                         value={values.email}
//                         onChange={handleChange}
//                         style={{padding: "5px 30px"}} 
//                         className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
//                         placeholder="Email Address" 
//                       />
//                       {errors.email && <div className="invalid-feedback">{errors.email}</div>}
//                     </div>
//                   </div>
                  
//                   <div className="jobplugin__form-row">
//                     <div className="jobplugin__form-field" style={{ position: 'relative' }}>
//                       <input 
//                         type={passwordInputType}
//                         name="password"
//                         value={values.password}
//                         onChange={handleChange}
//                         style={{padding: "5px 30px", paddingRight: '40px'}} 
//                         className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
//                         placeholder="Password" 
//                       />
//                       <button
//                         type="button"
//                         onClick={togglePassword}
//                         style={{
//                           position: 'absolute',
//                           right: '10px',
//                           top: '50%',
//                           transform: 'translateY(-50%)',
//                           background: 'none',
//                           border: 'none',
//                           cursor: 'pointer',
//                           color: '#6c757d',
//                           padding: '5px'
//                         }}
//                       >
//                         {passwordIcon === 'show' ? <FaEye /> : <FaEyeSlash />}
//                       </button>
//                       {errors.password && <div className="invalid-feedback">{errors.password}</div>}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="jobplugin__userbox-button d-flex justify-content-between">
//                   {/* <button 
//                     type="submit" 
//                     onClick={() => setUserType('employee')}
//                     className="jobplugin__button large jobplugin__bg-primary hover:jobplugin__bg-secondary"
//                     style={{width: '48%'}}
//                     disabled={isLoading}
//                   >
//                     {isLoading && values.userType === 'employee' ? (
//                       'Logging in...'
//                     ) : (
//                       <>
//                         <FaUserTie className="text-primary" /> &nbsp; Employee Login
//                       </>
//                     )}
//                   </button> */}
//                   <button 
//                     type="submit" 
//                     onClick={() => setUserType('school')}
//                     className="jobplugin__button large jobplugin__bg-secondary hover:jobplugin__bg-primary"
//                     style={{width: '48%'}}
//                     disabled={isLoading}
//                   >
//                     {isLoading && values.userType === 'school' ? (
//                       'Logging in...'
//                     ) : (
//                       <>
//                         <FaSchool className="text-primary" /> &nbsp; Employeer Login
//                       </>
//                     )}
//                   </button>
//                   <button 
//                     type="submit" 
//                     onClick={() => setUserType('employee')}
//                     className="jobplugin__button large jobplugin__bg-primary hover:jobplugin__bg-secondary"
//                     style={{width: '48%'}}
//                     disabled={isLoading}
//                   >
//                     {isLoading && values.userType === 'employee' ? (
//                       'Logging in...'
//                     ) : (
//                       <>
//                         <FaUserTie className="text-primary" /> &nbsp; Candidate Login
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </form>
              
//               <br />

//               <div className="jobplugin__userbox-seperator">
//                 <span className="bg-light">or</span>
//               </div>

//               <p className="jobplugin__userbox-textinfo">
//                 Don't have an account?{' '}
//                 <a className="hover:jobplugin__text-primary" href="signup">
//                   Sign Up
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

// export default LoginPage;


// only Employee login


import React from 'react';
import { FaUserTie, FaEye, FaEyeSlash } from 'react-icons/fa';
import { usePasswordToggle } from '../../../hooks/usePasswordToggle';
import { useLoginForm } from '../../../hooks/useLoginForm';
import { useLogin } from '../../../hooks/useLogin';
import { validateLoginForm } from '../../../utils/validateLogin';

const LoginPage = () => {
  const { login, isLoading, error } = useLogin();
  const [passwordInputType, passwordIcon, togglePassword] = usePasswordToggle();
  
  // Initialize with userType set to 'employee' by default
  const { values, errors, handleChange, handleSubmit } = useLoginForm(
    async (formValues) => {
      await login(formValues);
    },
    validateLoginForm,
    { initialValues: { userType: 'employee' } } // Set default userType here
  );

  return (
    <>
      <div className="subvisual-block subvisual-theme-1 bg-white d-flex pt-60 text-white"></div>

      <main className="jobplugin__main">
        <div className="jobplugin__main-holder">
          <span className="jobplugin__pattern default-right"></span>
          <span className="jobplugin__pattern default-left"></span>
          <div className="jobplugin__visual-pattern">
            <img src="images/visual-pattern.png" alt="Decorative pattern" />
          </div>
          <br />
          
          <div className="jobplugin__container">
            <div className="jobplugin__userbox bg-light shadow">
              <span className="jobplugin__userbox-bar jobplugin__bg-primary"></span>
              <span className="jobplugin__userbox-bar"></span>
              
              <h1 className="text-secondary h3 mb-0">Login To Continue</h1>
              <br />

              {error && (
                <div className="jobplugin__form-row">
                  <div className="alert alert-danger">{error}</div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="jobplugin__form">
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field col-md-6">
                      <input 
                        type="email" 
                        name="email"
                        value={values.email || ''}
                        onChange={handleChange}
                        style={{padding: "5px 30px"}} 
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                        placeholder="Email Address" 
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>                  
                    <div className="jobplugin__form-field col-md-6" style={{ position: 'relative' }}>
                      <input 
                        type={passwordInputType}
                        name="password"
                        value={values.password || ''}
                        onChange={handleChange}
                        style={{padding: "5px 30px", paddingRight: '40px'}} 
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                        placeholder="Password" 
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
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                  </div>
                </div>

                <div className="jobplugin__userbox-button">
                  <button 
                    type="submit" 
                    className="jobplugin__button large jobplugin__bg-primary hover:jobplugin__bg-secondary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      'Logging in...'
                    ) : (
                      <>
                        <FaUserTie className="text-primary" /> &nbsp; Login
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
                Don't have an account?{' '}
                <a className="hover:jobplugin__text-primary" href="signup">
                  Sign Up
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

export default LoginPage;