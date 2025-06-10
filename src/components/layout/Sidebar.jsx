// import React, { useState, useEffect } from 'react';
// import './Sidebar.css';
// const Sidebar = ({ isOpen, onClose }) => {
//   const [openSubmenu, setOpenSubmenu] = useState(null);
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

//   const toggleSubmenu = (index) => {
//     setOpenSubmenu(openSubmenu === index ? null : index);
//   };

//   return (
//     <nav className={`jobplugin__settings-menu ${isMobile && isOpen ? 'open' : ''}`}>
//       {isMobile && (
//         <a 
//           href="#" 
//           className="jobplugin__settings-close"
//           onClick={(e) => {
//             e.preventDefault();
//             onClose();
//           }}
//         >
//           <span className="bg-primary"></span>
//           <span className="bg-primary"></span>
//         </a>
//       )}
      
//       <ul id="accordion">
//         <li>
//           <a className="shadow" href="/dashboard">
//             <i className="fa fa-home text-primary"></i> &nbsp; Dashboard
//           </a>
//         </li>
        
//         <li>
//           <a className="shadow" href="/candidate-profile">
//             <i className="fa fa-users text-primary"></i> &nbsp; My Profile
//           </a>
//         </li>
        
//         <li>
//           <a className="shadow" href="/resume-builder">
//             <i className="fa fa-print text-primary"></i> &nbsp; Resume Builder
//           </a>
//         </li>
        
//         <li className={openSubmenu === 0 ? 'open' : ''}>
//           <a 
//             className="shadow link" 
//             href="#"
//             onClick={(e) => {
//               e.preventDefault();
//               toggleSubmenu(0);
//             }}
//           >
//             <i className="fa fa-graduation-cap text-primary"></i> &nbsp; My Jobs 
//             <i 
//               style={{float: 'right', paddingTop: '3px'}} 
//               className={`fa ${openSubmenu === 0 ? 'fa-angle-up' : 'fa-angle-down'}`}
//             ></i>
//           </a>
          
//           <ul className="submenu" style={{ display: openSubmenu === 0 ? 'block' : 'none' }}>
//             <li style={{padding: '10px 10px 0px 20px'}}>
//               <a style={{padding: '10px'}} href="/job-vacancies">
//                 <i className="fa fa-search text-primary"></i> &nbsp; Search Jobs
//               </a>
//             </li>
//             <li style={{padding: '0px 10px 0px 20px'}}>
//               <a style={{padding: '10px'}} href="/search">
//                 <i className="fa fa-briefcase text-primary"></i> &nbsp; Premium Advanced Search
//               </a>
//             </li>
//             <li style={{padding: '0px 10px 0px 20px'}}>
//               <a style={{padding: '10px'}} href="/job-alerts">
//                 <i className="fa fa-graduation-cap text-primary"></i> &nbsp; Job Alerts
//               </a>
//             </li>
//             <li style={{padding: '0px 10px 0px 20px'}}>
//               <a style={{padding: '10px'}} href="/applied-jobs">
//                 <i className="fa fa-graduation-cap text-primary"></i> &nbsp; Applied Jobs
//               </a>
//             </li>
//             <li style={{padding: '0px 10px 0px 20px'}}>
//               <a style={{padding: '10px'}} href="/shortlisted">
//                 <i className="fa fa-graduation-cap text-primary"></i> &nbsp; Shortlisted Jobs
//               </a>
//             </li>
//           </ul>
//         </li>
        
//         <li>
//           <a className="shadow" href="/certificates-trainings">
//             <i className="fa fa-file-edit text-primary"></i> &nbsp; Certificates & Training
//           </a>
//         </li>
        
//         <li>
//           <a className="shadow" href="/events">
//             <i className="fa fa-bank text-primary"></i> &nbsp; Events
//           </a>
//         </li>
        
//         <li>
//           <a className="shadow" href="/refer-us">
//             <i className="fa fa-rupee text-primary"></i> &nbsp; Refer & Earn
//           </a>
//         </li>
        
//         <li>
//           <a className="shadow" href="/notifications">
//             <i className="fa fa-info-circle text-primary"></i> &nbsp; Notifications
//           </a>
//         </li>
        
//         <li>
//           <a className="shadow" href="/support">
//             <i className="fa fa-comments text-primary"></i> &nbsp; Inbox
//           </a>
//         </li>
        
//         <li>
//           <a className="shadow" href="/">
//             <i className="fa fa-sign-out text-primary"></i> &nbsp; Logout
//           </a>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Sidebar;


import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <div className={`jobplugin__settings-menu ${isMobile ? 'mobile' : ''} ${isOpen ? 'open' : ''}`}>
      {isMobile && (
        <a href="#" className="jobplugin__settings-close" onClick={(e) => { e.preventDefault(); onClose(); }}>
          <span className="bg-primary"></span>
          <span className="bg-primary"></span>
        </a>
      )}

      <ul id="accordion">
        <li>
          <a className="shadow" href="/dashboard">
            <i className="fa fa-home text-primary"></i> &nbsp; Dashboard
          </a>
        </li>
        <li>
          <a className="shadow" href="/employee-profile">
            <i className="fa fa-users text-primary"></i> &nbsp; My Profile
          </a>
        </li>
        <li>
          <a className="shadow" href="/resume-builder">
            <i className="fa fa-print text-primary"></i> &nbsp; Resume Builder
          </a>
        </li>
        <li className={openSubmenu === 'my-jobs' ? 'open' : ''}>
          <a 
            className="shadow link" 
            onClick={(e) => { e.preventDefault(); toggleSubmenu('my-jobs'); }}
          >
            <i className="fa fa-graduation-cap text-primary"></i> &nbsp; My Jobs 
            <i 
              style={{float: 'right', paddingTop: '3px'}} 
              className={`fa ${openSubmenu === 'my-jobs' ? 'fa-angle-up' : 'fa-angle-down'}`}
            ></i>
          </a>
          <ul className="submenu" style={{ display: openSubmenu === 'my-jobs' ? 'block' : 'none' }}>
            <li style={{padding: '10px 10px 0px 20px'}}>
              <a style={{padding: '10px'}} href="/job-vacancies">
                <i className="fa fa-search text-primary"></i> &nbsp; Search Jobs
              </a>
            </li>
            <li style={{padding: '0px 10px 0px 20px'}}>
              <a style={{padding: '10px'}} href="/search">
                <i className="fa fa-briefcase text-primary"></i> &nbsp; Premium Advanced Search
              </a>
            </li>
            <li style={{padding: '0px 10px 0px 20px'}}>
              <a style={{padding: '10px'}} href="/job-alerts">
                <i className="fa fa-graduation-cap text-primary"></i> &nbsp; Job Alerts
              </a>
            </li>
            <li style={{padding: '0px 10px 0px 20px'}}>
              <a style={{padding: '10px'}} href="/applied-jobs">
                <i className="fa fa-graduation-cap text-primary"></i> &nbsp; Applied Jobs
              </a>
            </li>
            <li style={{padding: '0px 10px 0px 20px'}}>
              <a style={{padding: '10px'}} href="/saved-jobs">
                <i className="fa fa-graduation-cap text-primary"></i> &nbsp; Saved Jobs
              </a>
            </li>
            <li style={{padding: '0px 10px 0px 20px'}}>
              <a style={{padding: '10px'}} href="/shortlisted">
                <i className="fa fa-graduation-cap text-primary"></i> &nbsp; Shortlisted Jobs
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a className="shadow" href="/certificates-trainings">
            <i className="fa fa-file-edit text-primary"></i> &nbsp; Certificates & Training
          </a>
        </li>
        <li>
          <a className="shadow" href="/events">
            <i className="fa fa-bank text-primary"></i> &nbsp; Events
          </a>
        </li>
        <li>
          <a className="shadow" href="/refer-us">
            <i className="fa fa-rupee text-primary"></i> &nbsp; Refer & Earn
          </a>
        </li>
        <li>
          <a className="shadow" href="/notifications">
            <i className="fa fa-info-circle text-primary"></i> &nbsp; Notifications
          </a>
        </li>
        <li>
          <a className="shadow" href="/support">
            <i className="fa fa-comments text-primary"></i> &nbsp; Inbox
          </a>
        </li>
        <li>
          <a className="shadow" href="/">
            <i className="fa fa-sign-out text-primary"></i> &nbsp; Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;