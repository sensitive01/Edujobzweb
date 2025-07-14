import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaBriefcase,
  FaUsers,
  FaGraduationCap,
  FaUniversity,
  FaUserCircle,
  FaSignOutAlt,
  FaTimes,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken') || localStorage.getItem('employerToken');
    setIsLoggedIn(!!authToken);
  }, [location]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setOpenDropdown(null);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleProfileClick = () => {
    navigate('/dashboard');
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

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  const handleAccountClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
    setIsMenuOpen(false);
  };

  return (
    <>
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
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '5px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30px',
                height: '30px'
              }}
            >
              <span style={{
                display: 'block',
                width: '20px',
                height: '2px',
                backgroundColor: '#fff',
                margin: '2px 0',
                transition: '0.3s'
              }}></span>
              <span style={{
                display: 'block',
                width: '20px',
                height: '2px',
                backgroundColor: '#fff',
                margin: '2px 0',
                transition: '0.3s'
              }}></span>
              <span style={{
                display: 'block',
                width: '20px',
                height: '2px',
                backgroundColor: '#fff',
                margin: '2px 0',
                transition: '0.3s'
              }}></span>
            </button>

            {/* Desktop Navigation */}
            <div className="nav-drop d-none d-lg-block">
              <ul className="navigation">
                <li style={{ padding: '0px 15px' }}>
                  <Link to="/" onClick={handleLinkClick}>
                    <FaHome /> &nbsp; Home
                  </Link>
                </li>

                <li style={{ padding: '0px 15px' }}>
                  <Link to="/job-vacancies" onClick={handleLinkClick}>
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
                      <Link className="dropdown-item" to="/employer/login" onClick={handleLinkClick}>
                        Login / Signup
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/employer" onClick={handleLinkClick}>
                        Employer
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/subscription-plan" onClick={handleLinkClick}>
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
                    {!isLoggedIn && (
                      <li>
                        <Link className="dropdown-item" to="/employee-registration" onClick={handleLinkClick}>
                          Login / Signup
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link className="dropdown-item" to="/dashboard" onClick={handleLinkClick}>
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/job-vacancies" onClick={handleLinkClick}>
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
                      <Link className="dropdown-item" to="/about-us" onClick={handleLinkClick}>
                        About Edujobz
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/careers" onClick={handleLinkClick}>
                        Careers
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/blogs" onClick={handleLinkClick}>
                        Blogs / Press Release
                      </Link>
                    </li>
                  </ul>
                </li>

                <li style={{ padding: '0px 10px' }}>
                  <Link
                    className="btn btn-white btn-sm"
                    to="/job-vacancies"
                    onClick={handleLinkClick}
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
                    onClick={handleLinkClick}
                  >
                    <span className="btn-text text-secondary">
                      <i className="icon icon-briefcase3" style={{ fontSize: '14px' }}></i> &nbsp; Post Jobs FREE
                    </span>
                  </Link>
                </li>

                <li style={{ padding: '0px 5px' }} className="text-login">
                  <button
                    onClick={handleAccountClick}
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
                        <FaUserCircle style={{ fontSize: '14px', color: '#fff' }} />
                        My Account
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

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div
          className="mobile-nav-overlay d-lg-none"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            display: 'block'
          }}
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Navigation Menu */}
      <div
        className={`mobile-nav-menu d-lg-none ${isMenuOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          right: isMenuOpen ? 0 : '-100%',
          width: '280px',
          height: '100vh',
          backgroundColor: '#063970',
          zIndex: 1000,
          transition: 'right 0.3s ease-in-out',
          overflowY: 'auto',
          paddingTop: '20px'
        }}
      >
        {/* Close button */}
        <button
          onClick={toggleMenu}
          style={{
            position: 'absolute',
            top: '15px',
            left: '15px',
            background: 'none',
            border: 'none',
            color: '#ffa500',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '5px'
          }}
        >
          <FaTimes />
        </button>

        {/* Mobile Navigation Items */}
        <div style={{ padding: '50px 0 20px 0' }}>
          {/* Home */}
          <div style={{ marginBottom: '8px' }}>
            <Link
              to="/"
              onClick={handleLinkClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 20px',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '400',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <FaHome style={{ marginRight: '12px', fontSize: '16px' }} />
              Home
            </Link>
          </div>

          {/* Jobs */}
          <div style={{ marginBottom: '8px' }}>
            <Link
              to="/job-vacancies"
              onClick={handleLinkClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 20px',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '400',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <FaBriefcase style={{ marginRight: '12px', fontSize: '16px' }} />
              Jobs
            </Link>
          </div>

          {/* Employer Dropdown */}
          <div style={{ marginBottom: '8px' }}>
            <button
              onClick={() => toggleDropdown('employer')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 20px',
                color: '#ff9800',
                background: 'none',
                border: 'none',
                fontSize: '16px',
                fontWeight: '400',
                cursor: 'pointer',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaUniversity style={{ marginRight: '12px', fontSize: '16px' }} />
                Employer
              </div>
              {openDropdown === 'employer' ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {openDropdown === 'employer' && (
              <div style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                <Link
                  to="/employer/login"
                  onClick={handleLinkClick}
                  style={{
                    display: 'block',
                    padding: '12px 20px 12px 52px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    backgroundColor: '#ffa500',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#ff8c00'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#ffa500'}
                >
                  Login / Signup
                </Link>
                <Link
                  to="/dashboard"
                  onClick={handleLinkClick}
                  style={{
                    display: 'block',
                    padding: '12px 20px 12px 52px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#ffa500'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Dashboard
                </Link>
                <Link
                  to="/employer"
                  onClick={handleLinkClick}
                  style={{
                    display: 'block',
                    padding: '12px 20px 12px 52px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#ffa500'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Employer
                </Link>
                <Link
                  to="/subscription-plan"
                  onClick={handleLinkClick}
                  style={{
                    display: 'block',
                    padding: '12px 20px 12px 52px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#ffa500'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Plan & Subscription
                </Link>
              </div>
            )}
          </div>

          {/* Candidates Dropdown */}
          <div style={{ marginBottom: '8px' }}>
            <button
              onClick={() => toggleDropdown('candidates')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 20px',
                color: '#fff',
                background: 'none',
                border: 'none',
                fontSize: '16px',
                fontWeight: '400',
                cursor: 'pointer',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaUsers style={{ marginRight: '12px', fontSize: '16px' }} />
                Candidates
              </div>
              {openDropdown === 'candidates' ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {openDropdown === 'candidates' && (
              <div style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                  {!isLoggedIn && (
                <Link
                  to="/employee-registration"
                  onClick={handleLinkClick}
                  style={{
                    display: 'block',
                    padding: '12px 20px 12px 52px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#ffa500'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Login / Signup
                </Link>
                )}
                <Link
                  to="/dashboard"
                  onClick={handleLinkClick}
                  style={{
                    display: 'block',
                    padding: '12px 20px 12px 52px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#ffa500'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Dashboard
                </Link>
                <Link
                  to="/job-vacancies"
                  onClick={handleLinkClick}
                  style={{
                    display: 'block',
                    padding: '12px 20px 12px 52px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#ffa500'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Jobs
                </Link>
              </div>
            )}
          </div>

          {/* About Us Dropdown */}
          <div style={{ marginBottom: '8px' }}>
            <button
              onClick={() => toggleDropdown('about')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 20px',
                color: '#fff',
                background: 'none',
                border: 'none',
                fontSize: '16px',
                fontWeight: '400',
                cursor: 'pointer',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaGraduationCap style={{ marginRight: '12px', fontSize: '16px' }} />
                About Us
              </div>
              {openDropdown === 'about' ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {openDropdown === 'about' && (
              <div style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                <Link
                  to="/about-us"
                  onClick={handleLinkClick}
                  style={{
                    display: 'block',
                    padding: '12px 20px 12px 52px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#ffa500'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  About Edujobz
                </Link>
                <Link
                  to="/careers"
                  onClick={handleLinkClick}
                  style={{
                    display: 'block',
                    padding: '12px 20px 12px 52px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#ffa500'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Careers
                </Link>
                <Link
                  to="/blogs"
                  onClick={handleLinkClick}
                  style={{
                    display: 'block',
                    padding: '12px 20px 12px 52px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#ffa500'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Blogs / Press Release
                </Link>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <Link
              to="/job-vacancies"
              onClick={handleLinkClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 20px',
                backgroundColor: '#fff',
                color: '#063970',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                borderRadius: '25px',
                marginBottom: '12px',
                border: 'none'
              }}
            >
              <i className="icon icon-user" style={{ fontSize: '14px', marginRight: '8px' }}></i>
              Apply Now
            </Link>

            <Link
              to="/post-job"
              onClick={handleLinkClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 20px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                borderRadius: '25px',
                marginBottom: '20px',
                border: '1px solid rgba(255,255,255,0.3)'
              }}
            >
              <i className="icon icon-briefcase3" style={{ fontSize: '14px', marginRight: '8px' }}></i>
              Post Jobs FREE
            </Link>

            <button
              onClick={isLoggedIn ? handleProfileClick : handleLogin}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 20px',
                backgroundColor: 'transparent',
                color: '#fff',
                border: 'none',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                paddingTop: '20px'
              }}
            >
              {isLoggedIn ? (
                <>
                  <FaUserCircle style={{ fontSize: '16px', marginRight: '8px' }} />
                  My Account
                </>
              ) : (
                <>
                  <i className="icon icon-users" style={{ fontSize: '16px', marginRight: '8px' }}></i>
                  Login
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;