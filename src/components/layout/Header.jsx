// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   FaHome,
//   FaBriefcase,
//   FaUsers,
//   FaGraduationCap,
//   FaUniversity,
//   FaUserCircle
// } from 'react-icons/fa';
// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
//   const handleProfileClick = () => {
//     navigate('/employee-profile');
//     setIsMenuOpen(false);
//   };
//   const handlelogout = () => {  
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('employerData');
//     localStorage.removeItem('employerToken');
//     localStorage.removeItem('userData');
//     navigate('/login');
//   }
//   return (
//     <header className="header header-theme-9 bg-secondary" style={{ padding: '10px 0px' }}>
//       <div className="container" style={{ maxWidth: '1440px' }}>
//         <strong className="logo">
//           <Link to="/">
//             <img className="normal-logo" src="/images/logo.png" width="175" height="43" alt="Job Circle" />
//             <img className="sticky-logo" src="/images/logo.png" width="175" height="43" alt="Job Circle" />
//           </Link>
//         </strong>

//         <div className="main-nav">
//           <button
//             className="nav-opener d-flex d-lg-none"
//             onClick={toggleMenu}
//             aria-label="Toggle navigation"
//           >
//             <span></span>
//           </button>

//           <div className={`nav-drop ${isMenuOpen ? 'open' : ''}`}>
//             <button
//               className="nav-close d-flex d-lg-none"
//               onClick={toggleMenu}
//               aria-label="Close navigation"
//             >
//               <span></span>
//             </button>

//             <ul className="navigation">
//               <li style={{ padding: '0px 15px' }}>
//                 <Link to="/" onClick={() => setIsMenuOpen(false)}>
//                   <FaHome /> &nbsp; Home
//                 </Link>
//               </li>

//               <li style={{ padding: '0px 15px' }}>
//                 <Link to="/job-vacancies" onClick={() => setIsMenuOpen(false)}>
//                   <FaBriefcase /> &nbsp; Jobs
//                 </Link>
//               </li>

//               <li style={{ padding: '0px 15px' }} className="dropdown">
//                 <a className="dropdown-toggle" href="#" role="button" id="employerDropdown"
//                   data-bs-toggle="dropdown" aria-expanded="false">
//                   <FaUniversity /> &nbsp; Employer
//                 </a>
//                 <ul className="dropdown-menu" aria-labelledby="employerDropdown">
//                   <li>
//                     <Link className="dropdown-item" to="/employer/login" onClick={() => setIsMenuOpen(false)}>
//                       Login / Signup
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/employer" onClick={() => setIsMenuOpen(false)}>
//                       Employer
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/subscription-plan" onClick={() => setIsMenuOpen(false)}>
//                       Plan & Subscription
//                     </Link>
//                   </li>
//                 </ul>
//               </li>

//               <li style={{ padding: '0px 15px' }} className="dropdown">
//                 <a className="dropdown-toggle" href="#" role="button" id="candidatesDropdown"
//                   data-bs-toggle="dropdown" aria-expanded="false">
//                   <FaUsers /> &nbsp; Candidates
//                 </a>
//                 <ul className="dropdown-menu" aria-labelledby="candidatesDropdown">
//                   <li>
//                     <Link className="dropdown-item" to="/employee-registration" onClick={() => setIsMenuOpen(false)}>
//                       Login / Signup
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/dashboard" onClick={() => setIsMenuOpen(false)}>
//                       Dashboard
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/job-vacancies" onClick={() => setIsMenuOpen(false)}>
//                       Jobs
//                     </Link>
//                   </li>
//                 </ul>
//               </li>

//               <li style={{ padding: '0px 15px' }} className="dropdown">
//                 <a className="dropdown-toggle" href="#" role="button" id="aboutDropdown"
//                   data-bs-toggle="dropdown" aria-expanded="false">
//                   <FaGraduationCap /> &nbsp; About Us
//                 </a>
//                 <ul className="dropdown-menu" aria-labelledby="aboutDropdown">
//                   <li>
//                     <Link className="dropdown-item" to="/about-us" onClick={() => setIsMenuOpen(false)}>
//                       About Edujobz
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/careers" onClick={() => setIsMenuOpen(false)}>
//                       Careers
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/blogs" onClick={() => setIsMenuOpen(false)}>
//                       Blogs / Press Release
//                     </Link>
//                   </li>
//                 </ul>
//               </li>

//               <li style={{ padding: '0px 10px' }}>
//                 <Link
//                   className="btn btn-white btn-sm"
//                   to="/job-vacancies"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <span className="btn-text text-secondary">
//                     <i className="icon icon-user" style={{ fontSize: '14px' }}></i> Apply Now
//                   </span>
//                 </Link>
//               </li>

//               <li style={{ padding: '0px 10px' }}>
//                 <Link
//                   className="btn btn-white btn-sm"
//                   to="/post-job"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <span className="btn-text text-secondary">
//                     <i className="icon icon-briefcase3" style={{ fontSize: '14px' }}></i> &nbsp; Post Jobs FREE
//                   </span>
//                 </Link>
//               </li>
//               <li style={{ padding: '0px 15px' }}>
//                 <button
//                   onClick={handleProfileClick}
//                   style={{
//                     background: 'none',
//                     border: 'none',
//                     cursor: 'pointer',
//                     padding: 0,
//                     display: 'flex',
//                     alignItems: 'center'
//                   }}
//                   aria-label="Open profile"
//                 >
//                   <FaUserCircle style={{ fontSize: '24px', color: '#fff' }} />
//                 </button>
//               </li>
//               <li style={{ padding: '0px 5px' }} className="text-login">
//                 <button
//                   onClick={handlelogout}
//                   style={{
//                     backgroundColor: '#063970',
//                     color: '#fff',
//                     border: 'none',
//                     display: 'flex',
//                     alignItems: 'center',
//                     padding: '8px 12px',
//                     gap: '6px',
//                     fontSize: '16px',
//                     fontFamily: 'poppins, sans-serif',
//                     fontWeight: '400',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   <i className="icon icon-users " style={{ fontSize: '14px', color: '#fff' }}></i>
//                   Login
//                 </button>

//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>

//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaBriefcase,
  FaUsers,
  FaGraduationCap,
  FaUniversity,
  FaUserCircle,
  FaSignOutAlt
} from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); 
  const location = useLocation();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken') || localStorage.getItem('employerToken');
    setIsLoggedIn(!!authToken);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleProfileClick = () => {
    navigate('/employee-profile');
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('employerData');
    localStorage.removeItem('employerToken');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
    setIsMenuOpen(false);
  };

  return (
    <header className="header header-theme-9 bg-secondary" style={{ padding: '10px 0px' }}>
      <div className="container" style={{ maxWidth: '1440px' }}>
        <strong className="logo">
          <Link to="/">
            <img className="normal-logo" src="/images/logo.png" width="175" height="43" alt="Job Circle" />
            <img className="sticky-logo" src="/images/logo.png" width="175" height="43" alt="Job Circle" />
          </Link>
        </strong>

        <div className="main-nav">
          <button
            className="nav-opener d-flex d-lg-none"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <span></span>
          </button>

          <div className={`nav-drop ${isMenuOpen ? 'open' : ''}`}>
            <button
              className="nav-close d-flex d-lg-none"
              onClick={toggleMenu}
              aria-label="Close navigation"
            >
              <span></span>
            </button>

            <ul className="navigation">
              <li style={{ padding: '0px 15px' }}>
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  <FaHome /> &nbsp; Home
                </Link>
              </li>

              <li style={{ padding: '0px 15px' }}>
                <Link to="/job-vacancies" onClick={() => setIsMenuOpen(false)}>
                  <FaBriefcase /> &nbsp; Jobs
                </Link>
              </li>

              <li style={{ padding: '0px 15px' }} className="dropdown">
                <a className="dropdown-toggle" href="#" role="button" id="employerDropdown"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  <FaUniversity /> &nbsp; Employer
                </a>
                <ul className="dropdown-menu" aria-labelledby="employerDropdown">
                  <li>
                    <Link className="dropdown-item" to="/employer/login" onClick={() => setIsMenuOpen(false)}>
                      Login / Signup
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/employer" onClick={() => setIsMenuOpen(false)}>
                      Employer
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/subscription-plan" onClick={() => setIsMenuOpen(false)}>
                      Plan & Subscription
                    </Link>
                  </li>
                </ul>
              </li>

              <li style={{ padding: '0px 15px' }} className="dropdown">
                <a className="dropdown-toggle" href="#" role="button" id="candidatesDropdown"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  <FaUsers /> &nbsp; Candidates
                </a>
                <ul className="dropdown-menu" aria-labelledby="candidatesDropdown">
                  <li>
                    <Link className="dropdown-item" to="/employee-registration" onClick={() => setIsMenuOpen(false)}>
                      Login / Signup
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/job-vacancies" onClick={() => setIsMenuOpen(false)}>
                      Jobs
                    </Link>
                  </li>
                </ul>
              </li>

              <li style={{ padding: '0px 15px' }} className="dropdown">
                <a className="dropdown-toggle" href="#" role="button" id="aboutDropdown"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  <FaGraduationCap /> &nbsp; About Us
                </a>
                <ul className="dropdown-menu" aria-labelledby="aboutDropdown">
                  <li>
                    <Link className="dropdown-item" to="/about-us" onClick={() => setIsMenuOpen(false)}>
                      About Edujobz
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/careers" onClick={() => setIsMenuOpen(false)}>
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/blogs" onClick={() => setIsMenuOpen(false)}>
                      Blogs / Press Release
                    </Link>
                  </li>
                </ul>
              </li>

              <li style={{ padding: '0px 10px' }}>
                <Link
                  className="btn btn-white btn-sm"
                  to="/job-vacancies"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="btn-text text-secondary">
                    <i className="icon icon-user" style={{ fontSize: '14px' }}></i> Apply Now
                  </span>
                </Link>
              </li>

              <li style={{ padding: '0px 10px' }}>
                <Link
                  className="btn btn-white btn-sm"
                  to="/post-job"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="btn-text text-secondary">
                    <i className="icon icon-briefcase3" style={{ fontSize: '14px' }}></i> &nbsp; Post Jobs FREE
                  </span>
                </Link>
              </li>

              {/* {isLoggedIn && (
                <li style={{ padding: '0px 15px' }}>
                  <button
                    onClick={handleProfileClick}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    aria-label="Open profile"
                  >
                    <FaUserCircle style={{ fontSize: '24px', color: '#fff' }} />
                  </button>
                </li>
              )}
               */}
              <li style={{ padding: '0px 5px' }} className="text-login">
                <button
                  onClick={isLoggedIn ? handleLogout : handleLogin}
                  style={{
                    backgroundColor: '#063970',
                    color: '#fff',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 12px',
                    gap: '6px',
                    fontSize: '16px',
                    fontFamily: 'poppins, sans-serif',
                    fontWeight: '400',
                    cursor: 'pointer'
                  }}
                >
                  {isLoggedIn ? (
                    <>
                      <FaSignOutAlt style={{ fontSize: '14px', color: '#fff' }} />
                      Logout
                    </>
                  ) : (
                    <>
                      <i className="icon icon-users" style={{ fontSize: '14px', color: '#fff' }}></i>
                      Login
                    </>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;