// only Employee login


// import React from 'react';
// import { FaUserTie, FaEye, FaEyeSlash } from 'react-icons/fa';
// import { usePasswordToggle } from '../../../hooks/usePasswordToggle';
// import { useLoginForm } from '../../../hooks/useLoginForm';
// import { useLogin } from '../../../hooks/useLogin';
// import { validateLoginForm } from '../../../utils/validateLogin';
// import { Link } from 'react-router-dom';

// const LoginPage = () => {
//   const { login, isLoading, error } = useLogin();
//   const [passwordInputType, passwordIcon, togglePassword] = usePasswordToggle();

//   // Initialize with userType set to 'employee' by default
//   const { values, errors, handleChange, handleSubmit } = useLoginForm(
//     async (formValues) => {
//       await login(formValues);
//     },
//     validateLoginForm,
//     { initialValues: { userType: 'employee' } } // Set default userType here
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
//               <div style={{ textAlign: 'center' }}>
//                 <p className="mb-0"><b>Continue With</b></p>
//                 <a href="#" className="button-continue bg-white text-primary btn-app border border-secondary btn-play-store">
//                   <span className="rj-icon rj-google"></span>
//                 </a>
//                 <a href="#" className="button-continue btn-app btn-app-store bg-secondary">
//                   <span className="btn-text">LinkedIn</span>
//                 </a>
//                 <a href="#" className="button-continue btn-app btn-app-store">
//                   <span className="rj-icon rj-apple"></span>
//                 </a>
//               </div>
//               <br />

//               <div className="jobplugin__userbox-seperator">
//                 <span className="bg-light">or</span>
//               </div>

//               <h1 className="text-secondary h3 mb-0">Login To Continue</h1>
//               <br />

//               {error && (
//                 <div className="jobplugin__form-row">
//                   <div className="alert alert-danger">{error}</div>
//                 </div>
//               )}

//               <form onSubmit={handleSubmit}>
//                 <div className="jobplugin__form">
//                   <div className="jobplugin__form-row">
//                     <div className="jobplugin__form-field col-md-6">
//                       <input
//                         type="email"
//                         name="email"
//                         value={values.email || ''}
//                         onChange={handleChange}
//                         style={{ padding: "5px 30px" }}
//                         className={`form-control ${errors.email ? 'is-invalid' : ''}`}
//                         placeholder="Email Address"
//                       />
//                       {errors.email && <div className="invalid-feedback">{errors.email}</div>}
//                     </div>
//                     <div className="jobplugin__form-field col-md-6" style={{ position: 'relative' }}>
//                       <input
//                         type={passwordInputType}
//                         name="password"
//                         value={values.password || ''}
//                         onChange={handleChange}
//                         style={{ padding: "5px 30px", paddingRight: '40px' }}
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

//                 <div className="jobplugin__userbox-button">
//                   <button
//                     type="submit"
//                     className="jobplugin__button large jobplugin__bg-primary hover:jobplugin__bg-secondary"
//                     disabled={isLoading}
//                   >
//                     {isLoading ? (
//                       'Logging in...'
//                     ) : (
//                       <>
//                         <FaUserTie className="text-primary" /> &nbsp; Login
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </form>
//               <div className='text-center mb-3'>
//                 <Link to="/forgot-password" className="jobplugin__userbox-textinfo">
//                   Forgot Password
//                 </Link>
//               </div>
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



import React, { useEffect, useState } from 'react';
import { FaUserTie, FaEye, FaEyeSlash } from 'react-icons/fa';
import { usePasswordToggle } from '../../../hooks/usePasswordToggle';
import { useLoginForm } from '../../../hooks/useLoginForm';
import { useLogin } from '../../../hooks/useLogin';
import { validateLoginForm } from '../../../utils/validateLogin';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useLogin();
  const [passwordInputType, passwordIcon, togglePassword] = usePasswordToggle();
  const [googleError, setGoogleError] = useState(null);
  const [isGoogleSignInProgress, setIsGoogleSignInProgress] = useState(false);

  const { values, errors, handleChange, handleSubmit } = useLoginForm(
    async (formValues) => {
      await login(formValues);
    },
    validateLoginForm,
    { initialValues: { userType: 'employee' } }
  );


  const handleGoogleSignIn = () => {
    if (isGoogleSignInProgress) return;
    setIsGoogleSignInProgress(true);
    setGoogleError(null);

    try {
      if (!window.google) {
        throw new Error('Google library not loaded');
      }

      window.google.accounts.id.initialize({
        client_id: '27340101537-82t9e0o3636e4su9bis6ngb0qtlt2f23.apps.googleusercontent.com', // Use full client ID
        callback: (response) => {
          setIsGoogleSignInProgress(false);
          if (!response.credential) {
            setGoogleError('Google sign-in failed');
            return;
          }

          try {
            const payload = response.credential.split('.')[1];
            const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
            const user = JSON.parse(decodedPayload);

            localStorage.setItem('googleUser', JSON.stringify({
              name: user.name,
              email: user.email,
              picture: user.picture
            }));

            navigate('/dashboard');
          } catch (err) {
            setGoogleError('Failed to process user info');
            console.error(err);
          }
        }
      });

      window.google.accounts.id.prompt();
    } catch (err) {
      setIsGoogleSignInProgress(false);
      setGoogleError('Google sign-in failed');
      console.error(err);
    }
  };

useEffect(() => {
  if (window.google) return;
  
  const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
  if (existingScript) return;

  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  script.onerror = () => {
    setGoogleError('Failed to load Google Sign-In');
  };
  document.body.appendChild(script);
}, []);

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
              <div style={{ textAlign: 'center' }}>
                <p className="mb-0"><b>Continue With</b></p>
                <a
                  href="#"
                  className="button-continue bg-white text-primary btn-app border border-secondary btn-play-store"
                  onClick={(e) => {
                    e.preventDefault();
                    handleGoogleSignIn();
                  }}
                >
                  <span className="rj-icon rj-google"></span>
                </a>
                <a href="#" className="button-continue btn-app btn-app-store bg-secondary">
                  <span className="btn-text">LinkedIn</span>
                </a>
                <a href="#" className="button-continue btn-app btn-app-store">
                  <span className="rj-icon rj-apple"></span>
                </a>
                {googleError && (
                  <div className="alert alert-danger mt-2">{googleError}</div>
                )}
              </div>
              <br />

              <div className="jobplugin__userbox-seperator">
                <span className="bg-light">or</span>
              </div>

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
                        style={{ padding: "5px 30px" }}
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
                        style={{ padding: "5px 30px", paddingRight: '40px' }}
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
              <div className='text-center mb-3'>
                <Link to="/forgot-password" className="jobplugin__userbox-textinfo">
                  Forgot Password
                </Link>
              </div>
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