import React, {useState} from 'react';
import { FaCog, FaCheckCircle, FaChevronRight, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import Sidebar from '../../components/layout/Sidebar';

const Events = () => {
       
            const [isSidebarOpen, setIsSidebarOpen] = useState(false);
        
          const toggleSidebar = () => {
            setIsSidebarOpen(!isSidebarOpen);
          };
        
          const closeSidebar = () => {
            setIsSidebarOpen(false);
          };
  return (
    <>
      {/* Sub Visual of the page */}
      <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 text-white"></div>
      
      {/* Main content with grid layout */}
      <main className="jobplugin__main">
        <div className="jobplugin__main-holder">
          <div className="jobplugin__container">
                <div className="jobplugin__settings">
                  {/* Settings Nav Opener */}
                  <a href="#" className="jobplugin__settings-opener jobplugin__text-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                         onClick={(e) => {
                  e.preventDefault();
                  toggleSidebar();
                }}
                >
                    <FaCog className="rj-icon rj-settings" />
                  </a>
                   <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
                  {/* Settings Content */}
                  <div className="jobplugin__settings-content"> 
                    {/* Tabset Navigation */}
                    <div className="jobplugin__tabset-normal">
                      <ul data-tabset="tabset">
                        <li className="active"><a className="hover:jobplugin__text-primary hover:jobplugin__border-primary" data-tabset="tabset-link" href="active-members.html">All Events</a></li>
                        <li><a className="hover:jobplugin__text-primary hover:jobplugin__border-primary" data-tabset="tabset-link" href="events">Online Webinars</a></li>
                        <li><a className="hover:jobplugin__text-primary hover:jobplugin__border-primary" data-tabset="tabset-link" href="events">Seminars</a></li>
                        <li><a className="hover:jobplugin__text-primary hover:jobplugin__border-primary" data-tabset="tabset-link" href="events">Expo</a></li>
                      </ul>
                    </div>
                    
                    {/* Settings Card 1 */}
                    <div className="jobplugin__settings-card">
                      <div className="jobplugin__settings-card__body shadow">
                        <div className="jobplugin__settings-benefits">
                          <div className="jobplugin__settings-benefits__image">
                            <img src="images/img-benefit01.png" alt="Image Description" />
                          </div>
                          {/* Settings Info List */}
                          <ul className="jobplugin__settings-card__infolist">
                            <li>
                              <strong className="jobplugin__settings-card__subtitle text-large">Discover quality talent fast</strong>
                              <ul className="jobplugin__settings-bulletlist">
                                <li>Post a job and receive proposals from talent</li>
                                <li>See Verification work history and reviews</li>
                                <li>Send 30 events to talent per job post</li>
                                <li>Use advanced search filters</li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                        <br />
                        {/* Settings Card Buttons */}
                        <div className="jobplugin__section-buttons" style={{ textAlign: 'right' }}>
                          <a href="#" className="jobplugin__button jobplugin__bg-primary hover:jobplugin__bg-secondary small">Apply Now</a>
                          <a href="#" className="jobplugin__button button-white button-link hover:jobplugin__bg-primary hover:jobplugin__text-white small">Learn More</a>
                        </div>
                      </div>
                    </div>
                    
                    {/* Settings Card 2 */}
                    <div className="jobplugin__settings-card">
                      <div className="jobplugin__settings-card__body shadow">
                        <div className="jobplugin__settings-benefits">
                          <div className="jobplugin__settings-benefits__image">
                            <img src="images/img-benefit02.png" alt="Image Description" />
                          </div>
                          {/* Settings Info List */}
                          <ul className="jobplugin__settings-card__infolist">
                            <li>
                              <strong className="jobplugin__settings-card__subtitle text-large">Collaboration tools for project tracking</strong>
                              <ul className="jobplugin__settings-bulletlist">
                                <li>Chat, video call, and share files with talent</li>
                                <li>Get advanced reporting and tracking</li>
                                <li>Set coworker teams and member permission settings</li>
                                <li>Customize your invoice with activity codes</li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                        <br />
                        {/* Settings Card Buttons */}
                        <div className="jobplugin__section-buttons" style={{ textAlign: 'right' }}>
                          <a href="#" className="jobplugin__button jobplugin__bg-primary hover:jobplugin__bg-secondary small">Apply Now</a>
                          <a href="#" className="jobplugin__button button-white button-link hover:jobplugin__bg-primary hover:jobplugin__text-white small">Learn More</a>
                        </div>
                      </div>
                    </div>
                    
                    {/* Settings Card 3 */}
                    <div className="jobplugin__settings-card">
                      <div className="jobplugin__settings-card__body shadow">
                        <div className="jobplugin__settings-benefits">
                          <div className="jobplugin__settings-benefits__image">
                            <img src="images/img-benefit04.png" alt="Image Description" />
                          </div>
                          {/* Settings Info List */}
                          <ul className="jobplugin__settings-card__infolist">
                            <li>
                              <strong className="jobplugin__settings-card__subtitle text-large">Safe, easy payments</strong>
                              <ul className="jobplugin__settings-bulletlist">
                                <li>Get an extra level of security with Upwork Payment Protection</li>
                                <li>Pay as you go billing for milestone and hourly contracts</li>
                                <li><a className="jobplugin__text-primary hover:jobplugin__text-secondary" href="#"><b>3-5% marketplace fee</b></a> depending on payment method</li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                        <br />
                        {/* Settings Card Buttons */}
                        <div className="jobplugin__section-buttons" style={{ textAlign: 'right' }}>
                          <a href="#" className="jobplugin__button jobplugin__bg-primary hover:jobplugin__bg-secondary small">Apply Now</a>
                          <a href="#" className="jobplugin__button button-white button-link hover:jobplugin__bg-primary hover:jobplugin__text-white small">Learn More</a>
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

export default Events;