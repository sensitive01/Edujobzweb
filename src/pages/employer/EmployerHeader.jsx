import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, MessageSquare, Star, Calendar, HelpCircle, Maximize2, Bell, Plus, LayoutDashboard, Users, Briefcase } from 'lucide-react';
import user19 from '../../assets/employer/assets/img/logo - dark.png';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const EmployerHeader = () => {
    const [candidatesDropdown, setCandidatesDropdown] = useState(false);
    const [jobsDropdown, setJobsDropdown] = useState(false);
    const [notificationDropdown, setNotificationDropdown] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);
    
    const notificationRef = useRef(null);
    const profileRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setNotificationDropdown(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const candidatesOptions = [
        { name: 'Add New Candidates', path: '/employer/new-candidate' },
        { name: 'Search Candidates', path: '/employer/search' },
    ];

    const jobsOptions = [
        { name: 'Post Jobs', path: '/employer/post-jobs' },
        { name: 'List Jobs', path: '/employer/post-jobs' },
    ];

    const notifications = [
        {
            id: 1,
            avatar: 'assets/img/profiles/avatar-27.jpg',
            name: 'Shawn',
            message: 'performance in Math is below the threshold.',
            time: 'Just Now'
        },
        {
            id: 2,
            avatar: 'assets/img/profiles/avatar-23.jpg',
            name: 'Sylvia',
            message: 'added appointment on 02:00 PM',
            time: '10 mins ago',
            hasActions: true
        },
        {
            id: 3,
            avatar: 'assets/img/profiles/avatar-25.jpg',
            name: 'George',
            message: 'New student record is created by Teressa',
            time: '2 hrs ago'
        },
        {
            id: 4,
            avatar: 'assets/img/profiles/avatar-01.jpg',
            name: 'Elisa',
            message: 'A new teacher record',
            time: '09:45 AM'
        }
    ];

    return (
        <header className='bg-white border-bottom px-4 py-1' style={{ borderColor: '#e5e7eb' }}>
            <div className='d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center'>
                    <div className='d-flex align-items-center me-4'>
                        <Link to="/employer/new-candidate" className='d-flex align-items-center justify-content-center me-3 rounded'
                            style={{
                                width: '100px',
                            }}
                        >
                            <img
                                src={user19}
                                alt="Logo"
                            />
                        </Link>
                    </div>
                </div>

                <nav className='d-flex align-items-center'>
                    <div className='d-flex align-items-center'>
                        <div className='position-relative me-2'>
                            <div
                                className='d-flex align-items-center fw-medium px-3 py-2 rounded dropdown'
                                onClick={() => {
                                    setCandidatesDropdown(!candidatesDropdown);
                                    setJobsDropdown(false);
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                <Users className='me-2' size={16} style={{ color: '#f9ab00' }} />
                                <span className="text-dark">Candidates</span>
                                <ChevronDown className='ms-1' size={16} />
                            </div>

                            {candidatesDropdown && (
                                <div
                                    className='position-absolute bg-white border rounded shadow-sm'
                                    style={{
                                        top: '100%',
                                        left: '0',
                                        minWidth: '180px',
                                        zIndex: 1000,
                                        marginTop: '4px'
                                    }}
                                >
                                    {candidatesOptions.map((option, index) => (
                                        <Link
                                            key={index}
                                            to={option.path}
                                            className='px-3 py-2 dropdown-item text-decoration-none'
                                            style={{
                                                cursor: 'pointer',
                                                color: '#374151',
                                                display: 'block',
                                                borderBottom: index < candidatesOptions.length - 1 ? '1px solid #f1f5f9' : 'none'
                                            }}
                                            onClick={() => {
                                                setCandidatesDropdown(false);
                                            }}
                                        >
                                            {option.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className='position-relative me-2'>
                            <div className='d-flex align-items-center fw-medium px-3 py-2 rounded dropdown'
                                onClick={() => {
                                    setJobsDropdown(!jobsDropdown);
                                    setCandidatesDropdown(false);
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                <Briefcase className='me-2' size={16} style={{ color: '#f9ab00' }} />
                                <span className="text-dark">Jobs</span>
                                <ChevronDown className='me-2' size={16} />
                            </div>
                            {jobsDropdown && (
                                <div className='position-absolute bg-white border rounded shadow-sm'
                                    style={{
                                        top: '100%',
                                        left: '0',
                                        minWidth: '180px',
                                        zIndex: '1000',
                                        marginTop: '4px',
                                    }}
                                >
                                    {jobsOptions.map((option, index) => (
                                        <Link
                                            key={index}
                                            to={option.path}
                                            className='px-3 py-2 dropdown-item text-decoration-none'
                                            style={{
                                                cursor: 'pointer',
                                                color: '#374151',
                                                display: 'block',
                                                borderBottom: index < jobsOptions.length - 1 ? '1px solid #f1f5f9' : 'none'
                                            }}
                                            onClick={() => {
                                                setJobsDropdown(false);
                                            }}
                                        >
                                            {option.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                        <Link to="/employer/messages" className='d-flex align-items-center fw-medium px-3 py-2 rounded me-2 menu text-decoration-none'>
                            <MessageSquare className='me-2' size={16} style={{ color: '#f9ab00' }} />
                            <span className="text-dark">Messages</span>
                        </Link>
                        <Link to="/employer/upgrade-plan" className='d-flex align-items-center fw-medium px-3 py-2 rounded me-2 menu text-decoration-none'>
                            <Star className='me-2' size={16} style={{ color: '#f9ab00' }} />
                            <span className="text-dark">Upgrade Plan</span>
                        </Link>
                        <Link to="/employer/events" className='d-flex align-items-center fw-medium px-3 py-2 rounded me-2 menu text-decoration-none'>
                            <Calendar className='me-2' size={16} style={{ color: '#f9ab00' }} />
                            <span className="text-dark">Events</span>
                        </Link>
                        <Link to="/employer/faq" className='d-flex align-items-center fw-medium px-3 py-2 rounded me-2 menu text-decoration-none'>
                            <HelpCircle className='me-2' size={16} style={{ color: '#f9ab00' }} />
                            <span className="text-dark">FAQ</span>
                        </Link>
                    </div>
                </nav>

                <div className='d-flex align-items-center'>
                    {/* Fullscreen Button */}
                    <button className='btn btn-link p-2 text-secondary me-2'>
                        <Maximize2 size={16} />
                    </button>

                    {/* Support Button with Badge */}
                    <Link to="/employer/support" className="btn btn-link p-2 text-secondary me-2 position-relative text-decoration-none">
                        <HelpCircle size={16} />
                        <span
                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info"
                            style={{
                                width: '16px',
                                height: '16px',
                                fontSize: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            5
                        </span>
                    </Link>

                    {/* Ads Button */}
                    <Link
                        to="/employer/ads"
                        className="btn fw-medium me-2 text-decoration-none"
                        style={{
                            backgroundColor: '#063970',
                            color: 'white',
                            border: 'none',
                            paddingLeft: '20px',
                            paddingRight: '20px'
                        }}
                    >
                        Ads
                    </Link>

                    {/* Notification Dropdown */}
                    <div className='me-2 position-relative' ref={notificationRef}>
                        <button
                            className="btn btn-link p-2 text-secondary position-relative"
                            onClick={() => {
                                setNotificationDropdown(!notificationDropdown);
                                setProfileDropdown(false);
                            }}
                        >
                            <Bell size={16} />
                            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                                <span className="visually-hidden">New alerts</span>
                            </span>
                        </button>

                        {notificationDropdown && (
                            <div className="dropdown-menu show notification-dropdown p-4 shadow"
                                style={{
                                    width: '360px',
                                    position: 'absolute',
                                    right: 0,
                                    top: '100%',
                                    zIndex: 1000,
                                    display: 'block'
                                }}
                            >
                                <div className="d-flex align-items-center justify-content-between border-bottom p-0 pb-3 mb-3">
                                    <h4 className="notification-title">Notifications (2)</h4>
                                    <div className="d-flex align-items-center">
                                        <a href="#" className="text-primary fs-15 me-3 lh-1">Mark all as read</a>
                                        <div className="dropdown">
                                            <a href="#" className="bg-white dropdown-toggle"
                                                data-bs-toggle="dropdown">
                                                <Calendar size={16} className="me-1" />Today
                                            </a>
                                            <ul className="dropdown-menu mt-2 p-3">
                                                <li>
                                                    <a href="#" className="dropdown-item rounded-1">
                                                        This Week
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="dropdown-item rounded-1">
                                                        Last Week
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="dropdown-item rounded-1">
                                                        Last Month
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="noti-content">
                                    <div className="d-flex flex-column">
                                        {notifications.map((notification, index) => (
                                            <div key={notification.id} className={`${index < notifications.length - 1 ? 'border-bottom mb-3 pb-3' : 'border-0 mb-3 pb-0'}`}>
                                                <a href="#">
                                                    <div className="d-flex">
                                                        <span className="avatar avatar-lg me-2 flex-shrink-0">
                                                            <img src={notification.avatar} alt="Profile" className="img-fluid rounded-circle" />
                                                        </span>
                                                        <div className="flex-grow-1">
                                                            <p className="mb-1">
                                                                <span className="text-dark fw-semibold">{notification.name}</span> {notification.message}
                                                            </p>
                                                            <span className="text-muted small">{notification.time}</span>
                                                            {notification.hasActions && (
                                                                <div className="d-flex justify-content-start align-items-center mt-1">
                                                                    <span className="btn btn-light btn-sm me-2">Deny</span>
                                                                    <span className="btn btn-primary btn-sm">Approve</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="d-flex p-0">
                                    <a href="#" className="btn btn-light w-100 me-2">Cancel</a>
                                    <a href="/employer/notifications" className="btn btn-primary w-100">View All</a>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Profile Dropdown */}
                    <div className="dropdown position-relative" ref={profileRef}>
                        <button
                            className="btn btn-link p-0 border-0"
                            onClick={() => {
                                setProfileDropdown(!profileDropdown);
                                setNotificationDropdown(false);
                            }}
                        >
                            <div className="avatar avatar-sm">
                                <span className="avatar-initial rounded-circle bg-primary">A</span>
                            </div>
                        </button>

                        {profileDropdown && (
                            <div className="dropdown-menu show shadow p-0"
                                style={{
                                    width: '280px',
                                    position: 'absolute',
                                    right: 0,
                                    top: '100%',
                                    zIndex: 1000,
                                    display: 'block'
                                }}
                            >
                                <div className="card mb-0">
                                    <div className="card-header">
                                        <div className="d-flex align-items-center">
                                            <span className="avatar avatar-lg me-2">
                                                <span className="avatar-initial rounded-circle bg-primary">A</span>
                                            </span>
                                            <div>
                                                <h5 className="mb-0 text-primary">EduJobz</h5>
                                                <p className="fs-12 fw-medium mb-0"><a href="/employer/profile">School</a></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <Link
                                            className="dropdown-item d-inline-flex align-items-center p-0 py-2 text-decoration-none"
                                            to="/employer/profile"
                                        >
                                            <span className="me-1 text-primary">↑</span>My Account
                                        </Link>
                                    </div>
                                    <div className="card-footer py-1">
                                        <Link
                                            className="dropdown-item d-inline-flex align-items-center p-0 py-2 text-decoration-none"
                                            to="/employer/login"
                                        >
                                            <FiLogOut className="me-2 text-primary" />Logout
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .dropdown:hover {
                    background-color: #f8f9fa !important;
                    color: #374151 !important;
                }
                
                .text-secondary:hover {
                    color: #374151 !important;
                }
                .menu:hover {
                    color: #f9ab00 !important;
                }
                .btn-link:hover {
                    background-color: #f8f9fa !important;
                }
                .dropdown-item:hover {
                    background-color: #f8f9fa !important;
                    color: #f97316 !important;
                }
                .notification-dropdown {
                    background-color: white;
                    border: 1px solid #dee2e6;
                    border-radius: 0.375rem;
                }
                .avatar {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 600;
                }
                .avatar-sm {
                    width: 32px;
                    height: 32px;
                    font-size: 0.875rem;
                }
                .avatar-lg {
                    width: 48px;
                    height: 48px;
                    font-size: 1.25rem;
                }
                .avatar-initial {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                }
                .bg-primary {
                    background-color: #3b82f6 !important;
                }
            `}</style>
        </header>
    );
};

export default EmployerHeader;