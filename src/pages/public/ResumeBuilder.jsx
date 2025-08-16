import React, { useState } from 'react';
import { FaCog } from 'react-icons/fa';
import Sidebar from '../../components/layout/Sidebar';

const ResumeBuilder = () => {

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
                      <h2 className="h5 text-secondary">AI Resume Builder</h2>
                      <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                    </div>
                    <div className="jobplugin__settings-card box-organization">
                      <div className="jobplugin__settings-card__body">
                        <div className="jobplugin__settings-organization">
                          <div className="jobplugin__settings-organization__image">
                            <img src="images/icon-organization.png" alt="Organization" />
                          </div>
                          
                          <h3 className="h5">Generate better visible AI generated Resume for the competitive world</h3>
                          
                          <ul>
                            <li>
                              <div className="jobplugin__settings-organization__box shadow">
                                <div className="jobplugin__settings-organization__checkicon">
                                  <img src="images/check-icon.svg" alt="Check" />
                                </div>
                                <p>Better visibility into time logged and spend per group</p>
                              </div>
                            </li>
                            
                            <li>
                              <div className="jobplugin__settings-organization__box shadow">
                                <div className="jobplugin__settings-organization__checkicon">
                                  <img src="images/check-icon.svg" alt="Check" />
                                </div>
                                <p>Tighter control over admin or hiring privileges within each team</p>
                              </div>
                            </li>
                            
                            <li>
                              <div className="jobplugin__settings-organization__box shadow">
                                <div className="jobplugin__settings-organization__checkicon">
                                  <img src="images/check-icon.svg" alt="Check" />
                                </div>
                                <p>Streamlined billing by charging each team directly to that group's billing method</p>
                              </div>
                            </li>
                          </ul>
                          <div className="jobplugin__section-buttons">
                            <a href="#" className="jobplugin__button jobplugin__bg-primary hover:jobplugin__bg-secondary small shadow">
                              Generate Resume
                            </a>
                            <a href="employee-profile" className="jobplugin__button button-white button-link hover:jobplugin__bg-primary hover:jobplugin__text-white small">
                              Learn More / fill missing values
                            </a>
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

export default ResumeBuilder;