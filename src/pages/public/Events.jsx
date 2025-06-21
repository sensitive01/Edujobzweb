import React, { useState, useEffect } from 'react';
import { FaCog, FaCheckCircle, FaChevronRight, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import Sidebar from '../../components/layout/Sidebar';
import { getAllEvents } from '../../api/services/projectServices';
import { Link } from 'react-router-dom';

const Events = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  if (loading) {
    return <div className="jobplugin__main">Loading events...</div>;
  }

  if (error) {
    return <div className="jobplugin__main">Error: {error}</div>;
  }

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
                {events.map((event) => (
                  <div className="jobplugin__settings-card" key={event._id}>
                    <div className="jobplugin__settings-card__body shadow">
                      <div className="jobplugin__settings-benefits">
                        <div className="jobplugin__settings-benefits__image">
                          <img src={event.bannerImage} alt={event.title} style={{ width: '100%', height: 'auto' }} />
                        </div>
                        <ul className="jobplugin__settings-card__infolist">
                          <li>
                            <strong className="jobplugin__settings-card__subtitle text-large">{event.title}</strong>
                            <ul className="jobplugin__settings-bulletlist">
                              <li>{event.description}</li>
                              <li>
                                <IoLocationOutline /> {event.venue}
                              </li>
                              <li>Date: {event.eventDate}</li>
                              <li>Time: {event.startTime} - {event.endTime}</li>
                              <li>Registrations: {event.totalRegistrations}</li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                      <br />
                      <div className="jobplugin__section-buttons" style={{ textAlign: 'right' }}>
                        <Link
                          to={`/event-register/${event._id}`}
                          className="jobplugin__button jobplugin__bg-primary hover:jobplugin__bg-secondary small"
                        >
                          Apply Now
                        </Link>
                        <Link
                          to={`/events-details/${event._id}`}
                          className="jobplugin__button button-white button-link hover:jobplugin__bg-primary hover:jobplugin__text-white small"
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Events;