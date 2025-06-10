// import React, { useState, useEffect } from 'react';
// import Sidebar from '../../components/layout/Sidebar';

// const UserDashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   // Check if the current viewport is mobile
//   useEffect(() => {
//     const checkIsMobile = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     // Initial check
//     checkIsMobile();

//     // Add event listener for window resize
//     window.addEventListener('resize', checkIsMobile);

//     // Clean up
//     return () => window.removeEventListener('resize', checkIsMobile);
//   }, []);

//   return (
//     <>
//       <div className="subvisual-block subvisual-theme-1 bg-white d-flex pt-60 pt-md-90 text-white"></div>
//       <main className="jobplugin__main">
//         <div className="jobplugin__main-holder">
//           <div className="jobplugin__container">
//             {/* Settings Block */}
//             <div className="jobplugin__settings">
//               {/* Settings Nav Opener - Only show in mobile view */}
//               {isMobile && (
//                 <a 
//                   href="#" 
//                   className="jobplugin__settings-opener jobplugin__text-primary hover:bg-secondary hover:jobplugin__text-white bg-primary"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setSidebarOpen(!sidebarOpen);
//                   }}
//                 >
//                   <span className="fa fa-bars"></span>
//                 </a>
//               )}
              
//               {/* Sidebar Menu */}
//               <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              
//               {/* Dashboard Section */}
//               <div className="jobplugin__dashboard">
//                 {/* Profile Block */}
//                 <div className="jobplugin__profile">
//                   <div className="jobplugin__profile-intro border border-dark">
//                     <div className="jobplugin__profile-intro__left">
//                       <div className="jobplugin__profile-intro__image jobplugin__border-primary">
//                         <div className="jobplugin__profile-intro__avatar">
//                           <img src="images/img-profile.jpg" alt="Jennie Thomas" />
//                         </div>
//                         <a href="#" className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white">
//                           <span className="rj-icon rj-edit-text"></span>
//                         </a>
//                       </div>
                      
//                       <div className="jobplugin__profile-intro__Textbox">
//                         <div className="jobplugin__profile-intro__info mb-0">
//                           <h1 className="h5">Jennie Thomas</h1>
//                           <span className="jobplugin__article-toprated">Top Rated</span>
//                         </div>
//                         <address className="jobplugin__profile-intro__address">Bengaluru, Karnataka</address>
//                       </div>
//                     </div>
                    
//                     <div className="jobplugin__profile-intro__right">
//                       <div className="jobplugin__profile-intro__success">
//                         <div className="jobplugin__profile-intro__success-icon">
//                           <span className="rj-icon rj-crown"></span>												
//                         </div>
//                         <div style={{ float: 'right' }}>
//                           <strong className="jobplugin__profile-intro__success-text">94% Profile Completion</strong>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Stats Dashboard Block */}
//                 <div className="jobplugin__dashboard-block">
//                   <div className="jobplugin__row jobplugin__four-column p-20">
//                     <div className="jobplugin__column">
//                       <div className="jobplugin__dashboard-stats jobplugin__border-primary">
//                         <i className="jobplugin__dashboard-tooltip bg-light-sky">
//                           <span className="jobplugin__text-primary rj-icon rj-info"></span>
//                         </i>
//                         <span className="jobplugin__dashboard-stats__subtitle">
//                           Profile Score
//                         </span>
//                         <strong className="jobplugin__dashboard-stats__number text-primary">94%</strong>
//                         <p style={{ textAlign: 'right' }}>(Based on input data)</p>
//                       </div>
//                     </div>
                    
//                     <div className="jobplugin__column p-20">
//                       <div className="jobplugin__dashboard-stats">
//                         <i className="jobplugin__dashboard-tooltip bg-light-sky">
//                           <span className="jobplugin__text-primary rj-icon rj-info"></span>
//                         </i>
//                         <span className="jobplugin__dashboard-stats__subtitle">
//                           Average Salary
//                         </span>
//                         <strong className="jobplugin__dashboard-stats__number text-primary">35,000</strong>
//                         <p style={{ textAlign: 'right' }}>(bases on hired)</p>
//                       </div>
//                     </div>
                    
//                     <div className="jobplugin__column p-20">
//                       <div className="jobplugin__dashboard-stats">
//                         <i className="jobplugin__dashboard-tooltip bg-light-sky">
//                           <span className="jobplugin__text-primary rj-icon rj-info"></span>
//                         </i>
//                         <span className="jobplugin__dashboard-stats__subtitle">
//                           Jobs Available
//                         </span>
//                         <strong className="jobplugin__dashboard-stats__number text-primary">140</strong>
//                         <p style={{ textAlign: 'right' }}>(in Mathematics)</p>
//                       </div>
//                     </div>
                    
//                     <div className="jobplugin__column p-20">
//                       <div className="jobplugin__dashboard-stats">
//                         <i className="jobplugin__dashboard-tooltip bg-light-sky">
//                           <span className="jobplugin__text-primary rj-icon rj-info"></span>
//                         </i>
//                         <span className="jobplugin__dashboard-stats__subtitle">
//                           Shorlisted Jobs
//                         </span>
//                         <strong className="jobplugin__dashboard-stats__number text-primary">10</strong>
//                         <p style={{ textAlign: 'right' }}>(of 24 applied)</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <p style={{ textAlign: 'center' }} className="text-secondary">
//                   <strong>Want to get shortlisted Fast ? <a href="#">Learn More...</a></strong>
//                 </p>
                
//                 {/* Activity Overview Block */}
//                 <div className="jobplugin__dashboard-block p-20">
//                   <div className="jobplugin__dashboard-activity border border-dark">
//                     <h2 className="h5 text-secondary">Overview</h2>
                    
//                     <div className="jobplugin__dashboard-dropdowns">
//                       <div className="select-box">
//                         <select>
//                           <option>2025</option>
//                           <option>2024</option>
//                         </select>
//                         <span className="select-arrow rj-icon rj-arrow-down"></span>
//                       </div>
                      
//                       <div className="select-box">
//                         <select>
//                           <option>Yearly</option>
//                           <option>Monthly</option>
//                           <option>Daily</option>
//                           <option>Hourly</option>
//                         </select>
//                         <span className="select-arrow rj-icon rj-arrow-down"></span>
//                       </div>
//                     </div>
                    
//                     <ul className="jobplugin__dashboard-sales">
//                       <li className="sales">Applied <strong>54</strong></li>
//                       <li className="cancelled">Rejected <strong>24</strong></li>
//                       <li className="completed">Shortlisted <strong>10</strong></li>
//                       <li>Pending <strong>20</strong></li>
//                     </ul>
                    
//                     <div className="jobplugin__dashboard-graph">
//                       <img src="images/img-graph.jpg" alt="Application Statistics Graph" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// };

// export default UserDashboard;

import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { FaArrowLeft, FaPowerOff, FaShare, FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { getEmployeeDetails } from '../../api/services/projectServices';

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [employerData, setEmployerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if the current viewport is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);

    // Clean up
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Fetch employer data
  useEffect(() => {
    const fetchEmployerData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = JSON.parse(localStorage.getItem('userData'));
        
        if (!token || !userData) {
          navigate('/login');
          return;
        }

        const data = await getEmployeeDetails(userData._id, token);
        setEmployerData(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch employer data');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployerData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!employerData) {
    return <div className="alert alert-info">No employer data found</div>;
  }

  return (
    <>
      <div className="subvisual-block subvisual-theme-1 bg-white d-flex pt-60 pt-md-90 text-white"></div>
      <main className="jobplugin__main">
        <div className="jobplugin__main-holder">
          <div className="jobplugin__container">
            {/* Settings Block */}
            <div className="jobplugin__settings">
              {/* Settings Nav Opener - Only show in mobile view */}
              {isMobile && (
                <a 
                  href="#" 
                  className="jobplugin__settings-opener jobplugin__text-primary hover:bg-secondary hover:jobplugin__text-white bg-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    setSidebarOpen(!sidebarOpen);
                  }}
                >
                  <span className="fa fa-bars"></span>
                </a>
              )}
              
              {/* Sidebar Menu */}
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              
              {/* Dashboard Section */}
              <div className="jobplugin__dashboard">
                {/* Profile Block - Replaced with Employer Profile */}
                <div className="jobplugin__profile">
                  <div className="jobplugin__profile-intro border border-dark shadow">
                    <div className="jobplugin__profile-intro__left">
                      <div className="jobplugin__profile-intro__image border-primary">
                        <div className="jobplugin__profile-intro__avatar">
                          <img 
                            src={employerData.userProfilePic || 'images/img-profile.jpg'} 
                            alt={`${employerData.firstName} ${employerData.lastName}`} 
                          />
                        </div>
                        <Link
                          to={`/employee/edit/${employerData._id}`} 
                          className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                        >
                          <span className="rj-icon rj-edit-text"></span>
                        </Link>
                      </div>
                      <div className="jobplugin__profile-intro__Textbox">
                        <div className="jobplugin__profile-intro__info mb-0">
                          <h1 className="h5">{employerData.firstName} {employerData.lastName}</h1>
                          <span className="jobplugin__article-toprated">Verified Employer</span>
                        </div>
                        <address className="jobplugin__profile-intro__address">
                          {employerData.city || 'Location not specified'}
                        </address>
                      </div>
                    </div>
                    <div className="jobplugin__profile-intro__right">
                      <button 
                        onClick={handleLogout}
                        className="jobplugin__button border-dark shadow bg-primary hover:jobplugin__bg-secondary small"
                      >
                        <FaPowerOff /> &nbsp; Logout
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Stats Dashboard Block */}
                <div className="jobplugin__dashboard-block">
                  <div className="jobplugin__row jobplugin__four-column p-20">
                    <div className="jobplugin__column">
                      <div className="jobplugin__dashboard-stats jobplugin__border-primary">
                        <i className="jobplugin__dashboard-tooltip bg-light-sky">
                          <span className="jobplugin__text-primary rj-icon rj-info"></span>
                        </i>
                        <span className="jobplugin__dashboard-stats__subtitle">
                          Profile Score
                        </span>
                        <strong className="jobplugin__dashboard-stats__number text-primary">94%</strong>
                        <p style={{ textAlign: 'right' }}>(Based on input data)</p>
                      </div>
                    </div>
                    
                    <div className="jobplugin__column p-20">
                      <div className="jobplugin__dashboard-stats">
                        <i className="jobplugin__dashboard-tooltip bg-light-sky">
                          <span className="jobplugin__text-primary rj-icon rj-info"></span>
                        </i>
                        <span className="jobplugin__dashboard-stats__subtitle">
                          Posted Jobs
                        </span>
                        <strong className="jobplugin__dashboard-stats__number text-primary">0</strong>
                        <p style={{ textAlign: 'right' }}>(Currently active)</p>
                      </div>
                    </div>
                    
                    <div className="jobplugin__column p-20">
                      <div className="jobplugin__dashboard-stats">
                        <i className="jobplugin__dashboard-tooltip bg-light-sky">
                          <span className="jobplugin__text-primary rj-icon rj-info"></span>
                        </i>
                        <span className="jobplugin__dashboard-stats__subtitle">
                          Applications
                        </span>
                        <strong className="jobplugin__dashboard-stats__number text-primary">0</strong>
                        <p style={{ textAlign: 'right' }}>(Total received)</p>
                      </div>
                    </div>
                    
                    <div className="jobplugin__column p-20">
                      <div className="jobplugin__dashboard-stats">
                        <i className="jobplugin__dashboard-tooltip bg-light-sky">
                          <span className="jobplugin__text-primary rj-icon rj-info"></span>
                        </i>
                        <span className="jobplugin__dashboard-stats__subtitle">
                          Shortlisted
                        </span>
                        <strong className="jobplugin__dashboard-stats__number text-primary">0</strong>
                        <p style={{ textAlign: 'right' }}>(Candidates)</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Profile Details Section */}
                <div className="jobplugin__profile-container">
                  <aside className="jobplugin__profile-aside">
                    <div className="jobplugin__profile-box border border-dark shadow">
                      <div className="jobplugin__profile-box__head">
                        <div className="jobplugin__profile-box__heading">
                          <h2 className="h5">Contact Info</h2>
                          <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                        </div>
                        <div className="jobplugin__profile-box__buttons">
                        <Link 
                            to={`/employee/edit/${employerData._id}`}
                            className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                          >
                            <span className="rj-icon rj-edit-text"></span>
                          </Link>
                        </div>
                      </div>
                      <div className="jobplugin__profile-box__body">
                        <ul className="jobplugin__profile-box__links">
                          <li>
                            <a className="hover:jobplugin__bg-primary hover:jobplugin__text-white" href="#">
                              <span className="jobplugin__profile-box__links-text">
                                Phone: {employerData.userMobile || 'Not provided'}
                              </span>
                              <span className="jobplugin__profile-box__links-icon rj-icon rj-link-arrow"></span>
                            </a>
                          </li>
                          <li>
                            <a className="hover:jobplugin__bg-primary hover:jobplugin__text-white" href="#">
                              <span className="jobplugin__profile-box__links-text">
                                Email: {employerData.userEmail}
                              </span>
                              <span className="jobplugin__profile-box__links-icon rj-icon rj-link-arrow"></span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="jobplugin__profile-box border border-dark shadow">
                      <div className="jobplugin__profile-box__head">
                        <div className="jobplugin__profile-box__heading">
                          <h2 className="h5">Institution Details</h2>
                          <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                        </div>
                        <div className="jobplugin__profile-box__buttons">
                        <Link 
                            to={`/employee/edit/${employerData._id}`}
                            className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                          >
                            <span className="rj-icon rj-edit-text"></span>
                          </Link>
                        </div>
                      </div>
                      <div className="jobplugin__profile-box__body">
                        <div className="jobplugin__profile-box__list-textbox">
                          <p><strong>Institution Name:</strong> {employerData.institutionName || 'Not specified'}</p>
                          <p><strong>Type:</strong> {employerData.institutionType || 'Not specified'}</p>
                          <p><strong>Board:</strong> {employerData.board || 'Not specified'}</p>
                          <p><strong>Website:</strong> {employerData.website ? (
                            <a href={employerData.website} target="_blank" rel="noopener noreferrer">
                              {employerData.website}
                            </a>
                          ) : 'Not specified'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="jobplugin__profile-box border border-dark shadow">
                      <div className="jobplugin__profile-box__head">
                        <div className="jobplugin__profile-box__heading">
                          <h2 className="h5">Address</h2>
                          <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                        </div>
                        <div className="jobplugin__profile-box__buttons">
                        <Link 
                            to={`/employee/edit/${employerData._id}`}
                            className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                          >
                            <span className="rj-icon rj-edit-text"></span>
                          </Link>
                        </div>
                      </div>
                      <div className="jobplugin__profile-box__body">
                        <div className="jobplugin__profile-box__list-textbox">
                          <p>{employerData.address || 'Address not specified'}</p>
                          <p>{employerData.city || ''} {employerData.state || ''}</p>
                          <p>PIN: {employerData.pincode || ''}</p>
                        </div>
                      </div>
                    </div>
                  </aside>
                  
                  <div className="jobplugin__profile-content border border-dark shadow">
                    <div className="jobplugin__profile-block">
                      <div className="jobplugin__profile-block__header">
                        <h2 className="h4">Institution Profile</h2>
                        <Link 
                          to={`/employee/edit/${employerData._id}`}
                          className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                        >
                          <span className="rj-icon rj-edit-text"></span>
                        </Link>
                      </div>
                      <div className="jobplugin__profile-block__body">
                        <div className="jobplugin__profile-block__textarea">
                          <div className="jobplugin__profile-block__textbox">
                            <h3 className="h5">{employerData.schoolName || employerData.institutionName || 'Institution'}</h3>
                            <p>Welcome to our institution profile. We are committed to providing quality education and opportunities.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="jobplugin__profile-block">
                      <div className="jobplugin__profile-block__header">
                        <h2 className="h4">About the Institution</h2>
                        <Link 
                          to={`/employee/edit/${employerData._id}`}
                          className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                        >
                          <span className="rj-icon rj-edit-text"></span>
                        </Link>
                      </div>
                      <div className="jobplugin__profile-block__body">
                        <div className="jobplugin__profile-block__textarea">
                          <div className="jobplugin__profile-block__textbox">
                            <p>
                              {employerData.institutionType ? `${employerData.institutionType} institution` : 'Educational institution'} 
                              located in {employerData.city || 'our city'}.
                            </p>
                            <p>
                              {employerData.board ? `Affiliated with ${employerData.board}` : ''}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default UserDashboard;