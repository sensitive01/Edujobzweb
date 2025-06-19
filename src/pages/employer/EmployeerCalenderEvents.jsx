import React, { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon, ChevronDown, FileOutput, PlusCircle, ChevronsUp, SquarePlus, X, AlertTriangle, ArrowRight, Clock, MapPin } from 'lucide-react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import EmployerHeader from './EmployerHeader';
import EmployerFooter from './EmployerFooter';

const API_BASE_URL = 'https://edujobzbackend.onrender.com';

const EmployerCalendarEvents = () => {
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        title: '',
        start: '',
        end: '',
        location: '',
        description: ''
    });
    const [isCreatingEvent, setIsCreatingEvent] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const calendarRef = useRef(null);
    const externalEventsRef = useRef(null);

    const eventCategories = [
        { title: "Team Events", className: "bg-transparent-success", iconColor: "text-success" },
        { title: "Work", className: "bg-transparent-warning", iconColor: "text-warning" },
        { title: "External", className: "bg-transparent-danger", iconColor: "text-danger" },
        { title: "Projects", className: "bg-transparent-skyblue", iconColor: "text-skyblue" },
        { title: "Applications", className: "bg-transparent-purple", iconColor: "text-purple" },
        { title: "Design", className: "bg-transparent-info", iconColor: "text-info" }
    ];

    const fetchEvents = async () => {
        try {
            const employerData = JSON.parse(localStorage.getItem('employerData'));
            if (!employerData || !employerData._id) {
                throw new Error('Employer ID not found in localStorage');
            }

            const response = await fetch(`${API_BASE_URL}/employer/geteveent?employerId=${employerData._id}`);
            const data = await response.json();

            if (data.success) {
                const formattedEvents = data.data.map(event => ({
                    id: event.id,
                    title: event.title,
                    start: event.start,
                    end: event.end,
                    color: event.color,
                    allDay: event.allDay,
                    extendedProps: {
                        description: event.description,
                        location: event.location
                    }
                }));
                setEvents(formattedEvents);
                
                // Set upcoming events (next 5 events)
                const now = new Date();
                const upcoming = formattedEvents
                    .filter(event => new Date(event.end) > now)
                    .sort((a, b) => new Date(a.start) - new Date(b.start))
                    .slice(0, 5)
                    .map(event => ({
                        title: event.title,
                        date: new Date(event.start).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
                        borderColor: getRandomBorderColor()
                    }));
                
                setUpcomingEvents(upcoming);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const getRandomBorderColor = () => {
        const colors = ['border-purple', 'border-pink', 'border-success', 'border-warning', 'border-danger'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const createEvent = async (eventData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/employer/createcalender`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchEvents();

        if (externalEventsRef.current) {
            const externalEventElements = Array.from(externalEventsRef.current.children);
            
            externalEventElements.forEach(eventEl => {
                eventEl.draggable = true;
                eventEl.addEventListener('dragstart', (ev) => {
                    ev.dataTransfer.setData('text/plain', eventEl.dataset.event);
                    ev.dataTransfer.effectAllowed = 'copy';
                });
            });
        }

        return () => {
            if (externalEventsRef.current) {
                const externalEventElements = Array.from(externalEventsRef.current.children);
                externalEventElements.forEach(eventEl => {
                    eventEl.removeEventListener('dragstart', () => {});
                });
            }
        };
    }, []);

    const handleEventClick = (info) => {
        setSelectedEvent({
            title: info.event.title,
            start: info.event.start,
            end: info.event.end,
            extendedProps: info.event.extendedProps
        });
        setShowEventModal(true);
    };

    const handleDateSelect = (selectInfo) => {
        setNewEvent({
            ...newEvent,
            start: selectInfo.startStr,
            end: selectInfo.endStr
        });
        setShowAddEventModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({
            ...newEvent,
            [name]: value
        });
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();
        if (newEvent.title && !isCreatingEvent) {
            setIsCreatingEvent(true);
            setErrorMessage('');
            
            try {
                const employerData = JSON.parse(localStorage.getItem('employerData'));
                if (!employerData || !employerData._id) {
                    throw new Error('Employer ID not found in localStorage');
                }

                if (!newEvent.start || !newEvent.end) {
                    throw new Error('Please select both start and end times');
                }

                const startDate = new Date(newEvent.start);
                const endDate = new Date(newEvent.end);
                if (startDate >= endDate) {
                    throw new Error('End time must be after start time');
                }

                const eventData = {
                    employerId: employerData._id,
                    title: newEvent.title,
                    description: newEvent.description,
                    location: newEvent.location,
                    start: newEvent.start,
                    end: newEvent.end,
                    color: '#6C63FF',
                    allDay: false
                };

                const response = await createEvent(eventData);

                if (response.success) {
                    const eventToAdd = {
                        id: response.data.id,
                        title: response.data.title,
                        start: response.data.start,
                        end: response.data.end,
                        color: response.data.color,
                        allDay: response.data.allDay,
                        extendedProps: {
                            description: response.data.description,
                            location: response.data.location
                        }
                    };
                    
                    setEvents([...events, eventToAdd]);
                    setShowAddEventModal(false);
                    setNewEvent({
                        title: '',
                        start: '',
                        end: '',
                        location: '',
                        description: ''
                    });
                    // Refresh upcoming events
                    fetchEvents();
                }
            } catch (error) {
                setErrorMessage(error.message || 'Failed to create event');
            } finally {
                setIsCreatingEvent(false);
            }
        }
    };

    const getTimeFromISO = (isoString) => {
        if (!isoString || !isoString.includes('T')) return '';
        const timePart = isoString.split('T')[1];
        return timePart.substring(0, 5);
    };

    const formatDateForMiniCalendar = (date) => {
        return date.toISOString().split('T')[0];
    };

    const today = new Date();
    const todayStr = formatDateForMiniCalendar(today);

    return (
        <>
            <EmployerHeader />
            <div>
                <div className="content">
                    <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                        <div className="my-auto mb-2">
                            <h2 className="mb-1">
                                &nbsp; <CalendarIcon className="text-primary" /> Calendar Events
                            </h2>
                        </div>
                        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
                            <div className="me-2 mb-2">
                                <div className="input-icon-end position-relative">
                                    <input
                                        type="text"
                                        className="form-control date-range bookingrange"
                                        style={{ width: "205px" }}
                                        placeholder="dd/mm/yyyy - dd/mm/yyyy"
                                    />
                                    <span className="input-icon-addon">
                                        <ChevronDown />
                                    </span>
                                </div>
                            </div>
                            <div className="me-2 mb-2">
                                <div className="dropdown">
                                    <button
                                        className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                        type="button"
                                        id="exportDropdown"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <FileOutput className="me-1" /> Export
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end p-3" aria-labelledby="exportDropdown">
                                        <li>
                                            <button className="dropdown-item rounded-1">
                                                <i className="ti ti-file-type-pdf me-1"></i>Export as PDF
                                            </button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item rounded-1">
                                                <i className="ti ti-file-type-xls me-1"></i>Export as Excel
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="mb-2">
                                <button
                                    className="btn btn-primary d-flex align-items-center"
                                    onClick={() => setShowAddEventModal(true)}
                                >
                                    <PlusCircle className="me-2" /> Create Event
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xxl-3 col-xl-4">
                            <div className="card h-100">
                                <div className="card-body p-3">
                                    <div className="border-bottom pb-2 mb-4">
                                        <div id="mini-calendar" style={{ minHeight: '300px' }}>
                                            <FullCalendar
                                                plugins={[dayGridPlugin]}
                                                initialView="dayGridMonth"
                                                headerToolbar={{
                                                    left: 'prev',
                                                    center: 'title',
                                                    right: 'next'
                                                }}
                                                height="100%"
                                                contentHeight="auto"
                                                fixedWeekCount={false}
                                                initialDate={todayStr}
                                            />
                                        </div>
                                    </div>

                                    <div className="border-bottom pb-4 mb-4">
                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                            <h5>Event</h5>
                                            <button
                                                className="link-primary"
                                                onClick={() => setShowAddEventModal(true)}
                                            >
                                                <SquarePlus className="fs-16" />
                                            </button>
                                        </div>
                                        <p className="fs-12 mb-2">Drag and drop your event or click in the calendar</p>
                                        <div id="external-events" ref={externalEventsRef}>
                                            {eventCategories.map((event, index) => (
                                                <div
                                                    key={index}
                                                    className={`fc-event ${event.className} mb-1`}
                                                    data-event={JSON.stringify({ title: event.title })}
                                                    draggable="true"
                                                >
                                                    <i className={`ti ti-square-rounded ${event.iconColor} me-2`}></i>
                                                    {event.title}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="border-bottom pb-2 mb-4">
                                        <h5 className="mb-2">
                                            Upcoming Event<span className="badge badge-success rounded-pill ms-2">{upcomingEvents.length}</span>
                                        </h5>
                                        {upcomingEvents.map((event, index) => (
                                            <div key={index} className={`border-start ${event.borderColor} border-3 mb-3`}>
                                                <div className="ps-3">
                                                    <h6 className="fw-medium mb-1">{event.title}</h6>
                                                    <p className="fs-12">
                                                        <CalendarIcon className="text-info me-2" />
                                                        {event.date}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-dark rounded text-center position-relative p-4">
                                        <span className="avatar avatar-lg rounded-circle bg-white mb-2">
                                            <AlertTriangle className="text-dark" />
                                        </span>
                                        <h6 className="text-white mb-3">
                                            Enjoy Unlimited Access on a small price monthly.
                                        </h6>
                                        <button className="btn btn-white">
                                            Upgrade Now <ArrowRight />
                                        </button>
                                        <div className="box-bg">
                                            <span className="bg-right">
                                                <img src="assets/img/bg/email-bg-01.png" alt="Img" />
                                            </span>
                                            <span className="bg-left">
                                                <img src="assets/img/bg/email-bg-02.png" alt="Img" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xxl-9 col-xl-8 theiaStickySidebar">
                            <div className="card border-0 h-100">
                                <div className="card-body p-0">
                                    <FullCalendar
                                        ref={calendarRef}
                                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                        initialView="dayGridMonth"
                                        headerToolbar={{
                                            left: 'prev,next today',
                                            center: 'title',
                                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                                        }}
                                        editable={true}
                                        selectable={true}
                                        selectMirror={true}
                                        droppable={true}
                                        events={events}
                                        eventClick={handleEventClick}
                                        select={handleDateSelect}
                                        height="100%"
                                        contentHeight="auto"
                                        initialDate={todayStr}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add New Event Modal */}
                {showAddEventModal && (
                    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Add New Event</h4>
                                    <button
                                        type="button"
                                        className="btn-close custom-btn-close"
                                        onClick={() => setShowAddEventModal(false)}
                                    >
                                        <X />
                                    </button>
                                </div>
                                <form onSubmit={handleAddEvent}>
                                    <div className="modal-body">
                                        {errorMessage && (
                                            <div className="alert alert-danger mb-3">
                                                {errorMessage}
                                            </div>
                                        )}
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Event Name</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        name="title"
                                                        value={newEvent.title}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Event Date</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        value={newEvent.start ? newEvent.start.split('T')[0] : ''}
                                                        onChange={(e) => {
                                                            const date = e.target.value;
                                                            const time = getTimeFromISO(newEvent.start);
                                                            setNewEvent({
                                                                ...newEvent,
                                                                start: date && time ? `${date}T${time}:00` : date,
                                                                end: newEvent.end ? `${date}T${getTimeFromISO(newEvent.end)}:00` : ''
                                                            });
                                                        }}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Start Time</label>
                                                    <input
                                                        type="time"
                                                        className="form-control"
                                                        value={getTimeFromISO(newEvent.start)}
                                                        onChange={(e) => {
                                                            const time = e.target.value;
                                                            const date = newEvent.start ? newEvent.start.split('T')[0] : '';
                                                            setNewEvent({
                                                                ...newEvent,
                                                                start: date && time ? `${date}T${time}:00` : ''
                                                            });
                                                        }}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">End Time</label>
                                                    <input
                                                        type="time"
                                                        className="form-control"
                                                        value={getTimeFromISO(newEvent.end)}
                                                        onChange={(e) => {
                                                            const time = e.target.value;
                                                            const date = newEvent.end ? newEvent.end.split('T')[0] : newEvent.start ? newEvent.start.split('T')[0] : '';
                                                            setNewEvent({
                                                                ...newEvent,
                                                                end: date && time ? `${date}T${time}:00` : ''
                                                            });
                                                        }}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Event Location</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        name="location"
                                                        value={newEvent.location}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="mb-0">
                                                    <label className="form-label">Descriptions</label>
                                                    <textarea 
                                                        className="form-control" 
                                                        rows="3" 
                                                        name="description"
                                                        value={newEvent.description}
                                                        onChange={handleInputChange}
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-light me-2"
                                            onClick={() => setShowAddEventModal(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary" disabled={isCreatingEvent}>
                                            {isCreatingEvent ? 'Creating...' : 'Add Event'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Event Details Modal */}
                {showEventModal && selectedEvent && (
                    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header bg-dark modal-bg">
                                    <div className="modal-title text-white">
                                        <span>{selectedEvent.title}</span>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn-close custom-btn-close"
                                        onClick={() => setShowEventModal(false)}
                                    >
                                        <X />
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p className="d-flex align-items-center fw-medium text-black mb-3">
                                        <CalendarIcon className="text-default me-2" />
                                        {selectedEvent.start?.toLocaleDateString()} {selectedEvent.end && `to ${selectedEvent.end.toLocaleDateString()}`}
                                    </p>
                                    <p className="d-flex align-items-center fw-medium text-black mb-3">
                                        <Clock className="text-default me-2" />
                                        {selectedEvent.start?.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} {selectedEvent.end && `to ${selectedEvent.end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`}
                                    </p>
                                    <p className="d-flex align-items-center fw-medium text-black mb-3">
                                        <MapPin className="text-default me-2" />
                                        {selectedEvent.extendedProps?.location || 'No location specified'}
                                    </p>
                                    <p className="d-flex align-items-center fw-medium text-black mb-0">
                                        <CalendarIcon className="text-default me-2" />
                                        {selectedEvent.extendedProps?.description || 'No description provided'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <EmployerFooter />
        </>
    );
};

export default EmployerCalendarEvents;