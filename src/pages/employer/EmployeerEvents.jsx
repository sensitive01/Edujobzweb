import React, { useState, useEffect } from 'react';
import { MessageSquare, Paperclip, MoreVertical, Trash2, Edit, Calendar } from 'lucide-react';
import EmployerHeader from './EmployerHeader';
import EmployerFooter from './EmployerFooter';
import { TfiSearch } from 'react-icons/tfi';
import { FaUniversity } from 'react-icons/fa';
import { getAllEvents } from '../../api/services/projectServices';
import { TiPlus } from 'react-icons/ti';

const EmployeerEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('pills-home');
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [organizerFilter, setOrganizerFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents();
        const processedEvents = response.map(event => {
          const eventDate = new Date(event.eventDate);
          const today = new Date();
          let status = 'Upcoming';
          
          if (eventDate < today) {
            status = 'Completed';
          } else if (eventDate.toDateString() === today.toDateString()) {
            status = 'Current';
          }
          
          // Add some sample On-hold/Cancelled events
          if (event._id === "68564338f6e1e50b7331fa57") {
            status = 'On-hold';
          } else if (event._id === "6856433af6e1e50b7331fa59") {
            status = 'Cancelled';
          }
          
          return {
            ...event,
            status,
            type: event.category || 'Workshop'
          };
        });
        setEvents(processedEvents);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         event.venue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOrganizer = organizerFilter === 'All' || 
                           (event.organizerId === "665fd983d7e1f2a70b89e5e7" ? 'Edujobz' : 'Other') === organizerFilter;
    const matchesStatus = statusFilter === 'All' || event.status === statusFilter;
    const eventDate = new Date(event.eventDate);
    const matchesDate = (!fromDate || eventDate >= new Date(fromDate)) && 
                       (!toDate || eventDate <= new Date(toDate));
    
    return matchesSearch && matchesOrganizer && matchesStatus && matchesDate;
  });

  const currentEvents = filteredEvents.filter(event => event.status === 'Current');
  const upcomingEvents = filteredEvents.filter(event => event.status === 'Upcoming');
  const onHoldEvents = filteredEvents.filter(event => event.status === 'On-hold' || event.status === 'Cancelled');
  const completedEvents = filteredEvents.filter(event => event.status === 'Completed');

  const workshops = filteredEvents.filter(event => event.type === 'Workshop');
  const webinars = filteredEvents.filter(event => event.type === 'Online Webinar');
  const seminars = filteredEvents.filter(event => event.type === 'Seminar');

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
  };

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <EmployerHeader/>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Fixed Header Card */}
        <div className="card" style={{ marginTop: '49px', position: 'fixed', width: '100%', zIndex: 9 }}>
          <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-2">
            <h4><FaUniversity className="text-primary" /> Events</h4>
            <div className="d-flex align-items-center flex-wrap row-gap-2">
              <div className="d-flex align-items-center me-3">
                <p className="mb-0 me-3 pe-3 border-end fs-14 text-primary">Total Events: <span className="text-dark"> {events.length}</span></p>
                <p className="mb-0 me-3 pe-3 border-end fs-14 text-primary">Upcoming: <span className="text-dark"> {upcomingEvents.length}</span></p>
                <p className="mb-0 fs-14 text-primary">Completed: <span className="text-dark"> {completedEvents.length}</span></p>
              </div>
              <div className="input-icon-start position-relative me-2">
                <span className="input-icon-addon">
                  <TfiSearch />
                </span>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Search Event"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button 
                className="btn btn-primary d-flex align-items-center justify-content-center"
                onClick={() => setShowAddEventModal(true)}
              >
                <TiPlus className="me-2" /> Add New Event
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6">
                <div className="d-flex align-items-center flex-wrap row-gap-2">
                  <div className="dropdown me-2">
                    <button className="dropdown-toggle btn btn-white d-inline-flex align-items-center">
                      {organizerFilter === 'All' ? 'Organizer' : organizerFilter}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end p-3">
                      <li><button className="dropdown-item rounded-1" onClick={() => setOrganizerFilter('All')}>All</button></li>
                      <li><button className="dropdown-item rounded-1" onClick={() => setOrganizerFilter('Edujobz')}>Edujobz</button></li>
                      <li><button className="dropdown-item rounded-1" onClick={() => setOrganizerFilter('Other')}>Other</button></li>
                    </ul>
                  </div>
                  <ul className="nav nav-pills border d-inline-flex rounded bg-light todo-tabs">
                    <li className="nav-item">
                      <button 
                        className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${activeTab === 'pills-home' ? 'active' : ''}`}
                        onClick={() => setActiveTab('pills-home')}
                      >
                        All Events
                      </button>
                    </li>
                    <li className="nav-item">
                      <button 
                        className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${activeTab === 'pills-contact' ? 'active' : ''}`}
                        onClick={() => setActiveTab('pills-contact')}
                      >
                        Workshops
                      </button>
                    </li>
                    <li className="nav-item">
                      <button 
                        className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${activeTab === 'pills-medium' ? 'active' : ''}`}
                        onClick={() => setActiveTab('pills-medium')}
                      >
                        Webinars
                      </button>
                    </li>
                    <li className="nav-item">
                      <button 
                        className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${activeTab === 'pills-low' ? 'active' : ''}`}
                        onClick={() => setActiveTab('pills-low')}
                      >
                        Seminars
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="d-flex align-items-center justify-content-lg-end flex-wrap row-gap-2">
                  <div className="input-icon w-120 position-relative me-2">
                    <span className="input-icon-addon">
                      <Calendar className="text-gray-9" />
                    </span>
                    <input 
                      type="date" 
                      className="form-control" 
                      placeholder="From Date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>
                  <div className="input-icon w-120 position-relative me-2">
                    <span className="input-icon-addon">
                      <Calendar className="text-gray-9" />
                    </span>
                    <input 
                      type="date" 
                      className="form-control" 
                      placeholder="To Date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>
                  <div className="dropdown me-2">
                    <button className="dropdown-toggle btn btn-white d-inline-flex align-items-center">
                      {statusFilter === 'All' ? 'Select Status' : statusFilter}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end p-3">
                      <li><button className="dropdown-item rounded-1" onClick={() => setStatusFilter('All')}>All</button></li>
                      <li><button className="dropdown-item rounded-1" onClick={() => setStatusFilter('Current')}>Current</button></li>
                      <li><button className="dropdown-item rounded-1" onClick={() => setStatusFilter('Upcoming')}>Upcoming</button></li>
                      <li><button className="dropdown-item rounded-1" onClick={() => setStatusFilter('On-hold')}>On-hold</button></li>
                      <li><button className="dropdown-item rounded-1" onClick={() => setStatusFilter('Cancelled')}>Cancelled</button></li>
                      <li><button className="dropdown-item rounded-1" onClick={() => setStatusFilter('Completed')}>Completed</button></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="content" style={{ marginTop: '230px', flex: 1 }}>
          <div className="card">
            <div className="card-body">
              <div className="tab-content">
                {/* All Events Tab */}
                {activeTab === 'pills-home' && (
                  <div className="tab-pane fade show active">
                    <div className="d-flex align-items-start overflow-auto project-status pb-4">
                      <EventColumn 
                        title="Current Events" 
                        count={currentEvents.length} 
                        events={currentEvents} 
                        color="pink"
                        onView={handleViewEvent}
                      />
                      
                      <EventColumn 
                        title="Upcoming Events" 
                        count={upcomingEvents.length} 
                        events={upcomingEvents} 
                        color="skyblue"
                        onView={handleViewEvent}
                      />
                      
                      <EventColumn 
                        title="On-hold / Cancelled" 
                        count={onHoldEvents.length} 
                        events={onHoldEvents} 
                        color="danger"
                        onView={handleViewEvent}
                      />
                      
                      <EventColumn 
                        title="Completed Events" 
                        count={completedEvents.length} 
                        events={completedEvents} 
                        color="success"
                        onView={handleViewEvent}
                      />
                    </div>
                  </div>
                )}

                {/* Workshops Tab */}
                {activeTab === 'pills-contact' && (
                  <div className="tab-pane fade">
                    <div className="d-flex align-items-start overflow-auto project-status pb-4">
                      <EventColumn 
                        title="Current Workshops" 
                        count={workshops.filter(e => e.status === 'Current').length} 
                        events={workshops.filter(e => e.status === 'Current')} 
                        color="pink"
                        onView={handleViewEvent}
                      />
                      
                      <EventColumn 
                        title="Upcoming Workshops" 
                        count={workshops.filter(e => e.status === 'Upcoming').length} 
                        events={workshops.filter(e => e.status === 'Upcoming')} 
                        color="skyblue"
                        onView={handleViewEvent}
                      />
                      
                      <EventColumn 
                        title="On-hold / Cancelled" 
                        count={workshops.filter(e => e.status === 'On-hold' || e.status === 'Cancelled').length} 
                        events={workshops.filter(e => e.status === 'On-hold' || e.status === 'Cancelled')} 
                        color="danger"
                        onView={handleViewEvent}
                      />
                      
                      <EventColumn 
                        title="Completed Workshops" 
                        count={workshops.filter(e => e.status === 'Completed').length} 
                        events={workshops.filter(e => e.status === 'Completed')} 
                        color="success"
                        onView={handleViewEvent}
                      />
                    </div>
                  </div>
                )}

                {/* Webinars Tab */}
                {activeTab === 'pills-medium' && (
                  <div className="tab-pane fade">
                    <div className="d-flex align-items-start overflow-auto project-status pb-4">
                      <EventColumn 
                        title="Current Webinars" 
                        count={webinars.filter(e => e.status === 'Current').length} 
                        events={webinars.filter(e => e.status === 'Current')} 
                        color="pink"
                        onView={handleViewEvent}
                      />
                      
                      <EventColumn 
                        title="Upcoming Webinars" 
                        count={webinars.filter(e => e.status === 'Upcoming').length} 
                        events={webinars.filter(e => e.status === 'Upcoming')} 
                        color="skyblue"
                        onView={handleViewEvent}
                      />
                      
                      <EventColumn 
                        title="On-hold / Cancelled" 
                        count={webinars.filter(e => e.status === 'On-hold' || e.status === 'Cancelled').length} 
                        events={webinars.filter(e => e.status === 'On-hold' || e.status === 'Cancelled')} 
                        color="danger"
                        onView={handleViewEvent}
                      />
                      
                      <EventColumn 
                        title="Completed Webinars" 
                        count={webinars.filter(e => e.status === 'Completed').length} 
                        events={webinars.filter(e => e.status === 'Completed')} 
                        color="success"
                        onView={handleViewEvent}
                      />
                    </div>
                  </div>
                )}

                {/* Seminars Tab */}
                {activeTab === 'pills-low' && (
                  <div className="tab-pane fade">
                    <div className="d-flex align-items-start overflow-auto project-status pb-4">
                      <EventColumn 
                        title="Current Seminars" 
                        count={seminars.filter(e => e.status === 'Current').length} 
                        events={seminars.filter(e => e.status === 'Current')} 
                        color="pink"
                        onView={handleViewEvent}
                      />
                      
                      <EventColumn 
                        title="Upcoming Seminars" 
                        count={seminars.filter(e => e.status === 'Upcoming').length} 
                        events={seminars.filter(e => e.status === 'Upcoming')} 
                        color="skyblue"
                        onView={handleViewEvent}
                      />
                      
                      <EventColumn 
                        title="On-hold / Cancelled" 
                        count={seminars.filter(e => e.status === 'On-hold' || e.status === 'Cancelled').length} 
                        events={seminars.filter(e => e.status === 'On-hold' || e.status === 'Cancelled')} 
                        color="danger"
                        onView={handleViewEvent}
                      />
                      
                      <EventColumn 
                        title="Completed Seminars" 
                        count={seminars.filter(e => e.status === 'Completed').length} 
                        events={seminars.filter(e => e.status === 'Completed')} 
                        color="success"
                        onView={handleViewEvent}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Add New Event Modal */}
        {showAddEventModal && (
          <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered" style={{ zIndex: 1051 }}>
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title text-primary">Add New Event</h4>
                  <button type="button" className="btn-close" onClick={() => setShowAddEventModal(false)}>
                    <MoreVertical />
                  </button>
                </div>
                <form>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-12">
                        <div className="mb-3">
                          <label className="form-label">Event Name</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="mb-3">
                          <label className="form-label">Event Date</label>
                          <div className="input-icon-end position-relative">
                            <input type="date" className="form-control" />
                            <span className="input-icon-addon">
                              <Calendar className="text-primary" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Start Time</label>
                          <div className="input-icon-end position-relative">
                            <input type="time" className="form-control" />
                            <span className="input-icon-addon">
                              <Calendar className="text-primary" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">End Time</label>
                          <div className="input-icon-end position-relative">
                            <input type="time" className="form-control" />
                            <span className="input-icon-addon">
                              <Calendar className="text-primary" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="mb-3">
                          <label className="form-label">Event Location</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="mb-0">
                          <label className="form-label">Descriptions</label>
                          <textarea className="form-control" rows="3"></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-light me-2" onClick={() => setShowAddEventModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Add Event</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <EmployerFooter/>
    </>
  );
};

// Reusable Event Column Component
const EventColumn = ({ title, count, events, color, onView }) => {
  const colorClasses = {
    pink: { bg: 'bg-soft-pink', dot: 'bg-pink' },
    skyblue: { bg: 'bg-soft-skyblue', dot: 'bg-skyblue' },
    danger: { bg: 'bg-soft-danger', dot: 'bg-danger' },
    success: { bg: 'bg-soft-success', dot: 'bg-success' }
  };

  return (
    <div className="p-3 rounded bg-transparent-secondary w-100 me-4 border border-dark shadow">
      <div className={`bg-secondary p-2 rounded mb-2`}>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center" style={{ margin: '0px auto' }}>
            <span className={`${colorClasses[color].bg} p-1 d-flex rounded-circle me-2`}>
              <span className={`${colorClasses[color].dot} rounded-circle d-block p-1`}></span>
            </span>
            <h5 className="me-2 text-white">{title}</h5>
            <span className="badge bg-light rounded-pill">{count}</span>
          </div>
        </div>
      </div>
      <div className="kanban-drag-wrap">
        {events.map((event, index) => (
          <EventCard key={index} event={event} onView={() => onView(event)} />
        ))}
      </div>
    </div>
  );
};

// Reusable Event Card Component
const EventCard = ({ event, onView }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="card kanban-card mb-2">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center">
            <span className="badge bg-outline-dark me-2">
              {event.organizerId === "665fd983d7e1f2a70b89e5e7" ? 'Edujobz' : 'Other'}
            </span>
          </div>
          <div className="dropdown">
            <button 
              className="d-inline-flex align-items-center border-0 bg-transparent"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <MoreVertical />
            </button>
            {showDropdown && (
              <div className="dropdown-menu show" style={{ position: 'absolute', right: 0, zIndex: 1000 }}>
                <button className="dropdown-item rounded-1" onClick={() => {}}>
                  <Edit className="me-2" />Edit
                </button>
                <button className="dropdown-item rounded-1" onClick={() => {}}>
                  <Trash2 className="text-danger me-2" />Delete
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="d-flex align-items-center mb-2">
          <span className="avatar avatar-xs rounded-circle bg-warning me-2">
            <img src={event.bannerImage} alt={event.title} className="avatar avatar-xs rounded-circle" />
          </span>
          <h6 className="align-items-center text-primary">
            <button onClick={onView} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
              {event.title}
            </button>
            <br />
            <span className="fs-12 text-gray">{event.venue}</span>
          </h6>
        </div>
        <div className="d-flex align-items-center border-bottom mb-3 pb-3">
          <div className="me-3 pe-3 border-end">
            <span className="fw-bold fs-12 d-block">Entry Fee</span>
            <p className="fs-12 text-dark">FREE</p>
          </div>
          <div className="me-3 pe-3 border-end">
            <span className="fw-bold fs-12 d-block">Participants</span>
            <p className="fs-12 text-dark">{event.totalRegistrations || 0}/{event.maxParticipants || '∞'}</p>
          </div>
          <div className="">
            <span className="fw-bold fs-12 d-block">Event on</span>
            <p className="fs-12 text-dark">{event.eventDate}</p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="avatar-list-stacked avatar-group-sm me-3">
            {event.registrations && event.registrations.slice(0, 3).map((reg, index) => (
              <span key={index} className="avatar avatar-rounded bg-secondary fs-12 text-white">
                {reg.participantName ? reg.participantName.charAt(0).toUpperCase() : 'A'}
              </span>
            ))}
            {event.registrations && event.registrations.length > 3 && (
              <span className="avatar avatar-rounded bg-secondary fs-12 text-white">
                +{event.registrations.length - 3}
              </span>
            )}
          </div>
          <div className="d-flex align-items-center">
            <button className="d-flex align-items-center text-dark me-2">
              <MessageSquare className="text-success me-1" />
              {event.registrations ? event.registrations.length : 0}
            </button>
            <button className="d-flex align-items-center text-dark me-2">
              <Paperclip className="text-primary me-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeerEvents;