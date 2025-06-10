import React, { useState } from 'react';
import { FaCog } from 'react-icons/fa';
import Sidebar from '../../components/layout/Sidebar';

const JobAlert = () => {

  
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    const closeSidebar = () => {
      setIsSidebarOpen(false);
    };
  
  return (
    <>
      <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 text-white"></div>
      <main className="jobplugin__main">
        <div className="jobplugin__main-holder">
          <div className="jobplugin__container">
                <div className="jobplugin__settings">
                  <a href="#" className="jobplugin__settings-opener jobplugin__text-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                      onClick={(e) => {
                  e.preventDefault();
                  toggleSidebar();
                }}
                >
                    <FaCog className="rj-icon rj-settings" />
                  </a>
                     <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
                  <div className="jobplugin__settings-content"> 
                    <div className="jobplugin__settings-head">
                      <strong className="jobplugin__settings-card__subtitle text-large">Job Alerts</strong>
                      <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                      <p>Jobs matching your requirement will display here as per your request</p>
                    </div>
                    <div className="jobplugin__settings-card">
                      <header className="jobplugin__settings-card__head">
                        <h3 className="h6">Matching Jobs</h3>
                        <a href="add-job-alerts.php" className="jobplugin__button jobplugin__bg-white jobplugin__border-primary small hover:jobplugin__bg-white">Add a Job Alert</a>
                      </header>
                      <div className="jobplugin__settings-card__body">
                        <ul className="jobplugin__settings-card__infolist">
                          <li>
                            <p>No Matching Jobs Found</p>
                          </li>
                        </ul>
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

export default JobAlert;