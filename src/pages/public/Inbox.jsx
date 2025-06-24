import React, { useState, useEffect } from 'react';
import { FaCog, FaComments, FaEnvelope, FaPhone, FaVideo, FaTimes } from 'react-icons/fa';
import Sidebar from '../../components/layout/Sidebar';
import axios from 'axios';

const Inbox = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [conversationDetails, setConversationDetails] = useState({});
    const [employeeProfilePic, setEmployeeProfilePic] = useState('');

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    }

    useEffect(() => {
        const fetchEmployeeProfile = async (employeeId) => {
            try {
                const response = await axios.get(`https://edujobzbackend.onrender.com/fetchemployee/${employeeId}`);
                if (response.data && response.data.userProfilePic) {
                    setEmployeeProfilePic(response.data.userProfilePic);
                }
            } catch (err) {
                console.error('Error fetching employee profile:', err);
            }
        };

        const fetchEmployerProfile = async (employerId) => {
            try {
                const response = await axios.get(`https://edujobzbackend.onrender.com/employer/fetchemployer/${employerId}`);
                if (response.data) {
                    return {
                        employerProfilePic: response.data.userProfilePic || 'images/img10.jpg',
                        employerName: response.data.schoolName || response.data.firstName + ' ' + response.data.lastName || 'Employer',
                        employerType: response.data.employerType || 'Employer'
                    };
                }
                return null;
            } catch (err) {
                console.error('Error fetching employer profile:', err);
                return null;
            }
        };

        const fetchConversations = async () => {
            try {
                setLoading(true);
                const userData = JSON.parse(localStorage.getItem('userData'));
                if (!userData || !userData._id) {
                    setConversations([]);
                    setLoading(false);
                    return;
                }

                // Fetch employee profile picture first
                await fetchEmployeeProfile(userData._id);

                const response = await axios.get(`https://edujobzbackend.onrender.com/employer/employee/${userData._id}`);

                if (response.data && response.data.length > 0) {
                    setConversations(response.data);
                    setSelectedConversation(response.data[0]);

                    // Fetch profile pictures and names for all conversations
                    const details = {};
                    for (const conversation of response.data) {
                        try {
                            // Fetch employer details from employer profile API
                            const employerProfile = await fetchEmployerProfile(conversation.employerId);
                            
                            // Also fetch job details for job title
                            const jobDetailsResponse = await axios.get(
                                `https://edujobzbackend.onrender.com/employer/fetchjob/${conversation.employerId}`
                            );
                            
                            if (jobDetailsResponse.data && jobDetailsResponse.data.length > 0) {
                                const job = jobDetailsResponse.data.find(j => j._id === conversation.jobId);
                                if (job) {
                                    details[conversation._id] = {
                                        ...(employerProfile || {}),
                                        jobTitle: job.jobTitle || 'Job'
                                    };
                                }
                            } else if (employerProfile) {
                                details[conversation._id] = employerProfile;
                            }
                        } catch (err) {
                            console.error('Error fetching conversation details:', err);
                        }
                    }
                    setConversationDetails(details);
                } else {
                    setConversations([]);
                }
            } catch (err) {
                console.error('Error fetching conversations:', err);
                setError(err.response?.data?.message || err.message || 'Failed to fetch conversations');
            } finally {
                setLoading(false);
            }
        };

        fetchConversations();
    }, []);

    useEffect(() => {
        if (!selectedConversation) return;

        const fetchMessagesAndDetails = async () => {
            try {
                setLoading(true);
                // Fetch messages
                const messagesResponse = await axios.get('https://edujobzbackend.onrender.com/employer/view', {
                    params: {
                        employeeId: selectedConversation.employeeId,
                        employerId: selectedConversation.employerId,
                        jobId: selectedConversation.jobId
                    }
                });

                // If we don't already have the profile details for this conversation, fetch them
                if (!conversationDetails[selectedConversation._id]) {
                    const employerProfile = await fetchEmployerProfile(selectedConversation.employerId);
                    
                    // Also fetch job details
                    const jobDetailsResponse = await axios.get(
                        `https://edujobzbackend.onrender.com/employer/fetchjob/${selectedConversation.employerId}`
                    );
                    
                    if (jobDetailsResponse.data && jobDetailsResponse.data.length > 0) {
                        const job = jobDetailsResponse.data.find(j => j._id === selectedConversation.jobId);
                        if (job) {
                            setConversationDetails(prev => ({
                                ...prev,
                                [selectedConversation._id]: {
                                    ...(employerProfile || {}),
                                    jobTitle: job.jobTitle || 'Job'
                                }
                            }));
                        }
                    } else if (employerProfile) {
                        setConversationDetails(prev => ({
                            ...prev,
                            [selectedConversation._id]: employerProfile
                        }));
                    }
                }

                if (messagesResponse.data && messagesResponse.data.messages) {
                    setMessages(messagesResponse.data.messages);
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.response?.data?.message || err.message || 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchMessagesAndDetails();
    }, [selectedConversation]);

    const fetchEmployerProfile = async (employerId) => {
        try {
            const response = await axios.get(`https://edujobzbackend.onrender.com/employer/fetchemployer/${employerId}`);
            if (response.data) {
                return {
                    employerProfilePic: response.data.userProfilePic || 'images/img10.jpg',
                    employerName: response.data.schoolName || response.data.firstName + ' ' + response.data.lastName || 'Employer',
                    employerType: response.data.employerType || 'Employer'
                };
            }
            return null;
        } catch (err) {
            console.error('Error fetching employer profile:', err);
            return null;
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConversation) return;

        try {
            const userData = JSON.parse(localStorage.getItem('userData'));

            const messageData = {
                employeeId: selectedConversation.employeeId,
                employerId: selectedConversation.employerId,
                jobId: selectedConversation.jobId,
                message: newMessage,
                sender: 'employee'
            };

            const response = await axios.post('https://edujobzbackend.onrender.com/employer/sendchats', messageData);

            if (response.data.success) {
                const newMsg = {
                    ...response.data.data,
                    isMe: true,
                    sender: 'You'
                };
                setMessages(prev => [...prev, newMsg]);
                setNewMessage('');
            }
        } catch (err) {
            console.error('Error sending message:', err);
            setError('Failed to send message. Please try again.');
        }
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatSidebarTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        const isToday = now.getDate() === date.getDate() &&
            now.getMonth() === date.getMonth() &&
            now.getFullYear() === date.getFullYear();
        const isYesterday = new Date(now.setDate(now.getDate() - 1)).getDate() === date.getDate() &&
            now.getMonth() === date.getMonth() &&
            now.getFullYear() === date.getFullYear();

        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m`;
        if (isToday) return `${Math.floor(diffInMinutes / 60)}h`;
        if (isYesterday) return 'Yesterday';

        // For dates older than yesterday
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    if (loading) {
        return <div className="jobplugin__container">Loading conversations...</div>;
    }

    if (error) {
        return <div className="jobplugin__container">Error: {error}</div>;
    }

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

                            <div className="jobplugin__container">
                                <h2 className="h5 text-secondary mb-20"> &nbsp; <FaComments /> Chat History</h2>
                                <div className="jobplugin__messenger border border-grey mt-0 p-10">
                                    <aside className="jobplugin__messenger-aside">
                                        <div className="jobplugin__messenger-search">
                                            <form action="#">
                                                <input className="form-control" style={{ padding: "5px 15px" }} type="search" placeholder="Search Conversation" />
                                            </form>
                                            <br />
                                        </div>
                                        <div className="jobplugin__messenger-aside__scroller">
                                            <ul className="jobplugin__messenger-users">
                                                {conversations.length > 0 ? (
                                                    conversations.map((conversation) => (
                                                        <li
                                                            key={conversation._id}
                                                            className={selectedConversation?._id === conversation._id ? 'active' : ''}
                                                            onClick={() => {
                                                                setSelectedConversation(conversation);
                                                                setOpenMenuId(null);
                                                            }}
                                                        >
                                                            <div className="jobplugin__messenger-users__button">
                                                                <div className="jobplugin__messenger-users__avatar">
                                                                    <img
                                                                        src={conversationDetails[conversation._id]?.employerProfilePic || 'images/img10.jpg'}
                                                                        alt="Employer"
                                                                        style={{
                                                                            width: '40px',
                                                                            height: '40px',
                                                                            borderRadius: '50%',
                                                                            objectFit: 'cover'
                                                                        }}
                                                                    />
                                                                </div>
                                                                <span className="jobplugin__messenger-users__textbox">
                                                                    <strong className="jobplugin__messenger-users__name">
                                                                        {conversationDetails[conversation._id]?.employerName || 'Employer'}
                                                                    </strong>
                                                                    <span className="jobplugin__messenger-users__type">
                                                                        {conversationDetails[conversation._id]?.employerType || 'Employer'}
                                                                    </span>
                                                                    <span className="jobplugin__messenger-users__job">
                                                                        {conversationDetails[conversation._id]?.jobTitle || 'Job'}
                                                                    </span>
                                                                    <span className="jobplugin__messenger-users__shortmsg">
                                                                        {conversation.messages.length > 0
                                                                            ? conversation.messages[conversation.messages.length - 1].message.length > 25
                                                                                ? conversation.messages[conversation.messages.length - 1].message.substring(0, 25) + '...'
                                                                                : conversation.messages[conversation.messages.length - 1].message
                                                                            : 'No messages yet'}
                                                                    </span>
                                                                </span>
                                                            </div>

                                                            <div className="meta-container">
                                                                <div className="time-menu-wrapper">
                                                                    <button
                                                                        className="menu-dots"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setOpenMenuId(openMenuId === conversation._id ? null : conversation._id);
                                                                        }}
                                                                    >
                                                                        ⋯
                                                                    </button>
                                                                    {openMenuId === conversation._id && (
                                                                        <div className="message-menu">
                                                                            <button onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                // Handle remove action
                                                                                setOpenMenuId(null);
                                                                            }}>
                                                                                Remove
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                {conversation.messages.length > 0 && (
                                                                    <div className="time-unread-wrapper">
                                                                        <span className="message-time">
                                                                            {formatSidebarTime(conversation.messages[conversation.messages.length - 1].createdAt)}
                                                                        </span>
                                                                        {!conversation.messages[conversation.messages.length - 1].isRead &&
                                                                            conversation.messages[conversation.messages.length - 1].sender === 'employer' && (
                                                                                <span className="unread-badge"></span>
                                                                            )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li className="text-center p-20">No conversations found</li>
                                                )}
                                            </ul>
                                        </div>
                                    </aside>

                                    <div className="jobplugin__messenger-content">
                                        {selectedConversation ? (
                                            <div className="jobplugin__messenger-dialog">
                                                <header className="jobplugin__messenger-header">
                                                    <div className="jobplugin__messenger-header__left">
                                                        <strong className="jobplugin__messenger-header__title text-secondary">
                                                            {conversationDetails[selectedConversation._id]?.employerName || 'Employer'}
                                                        </strong>
                                                        <span className="jobplugin__messenger-header__subtitle">
                                                            {conversationDetails[selectedConversation._id]?.jobTitle || 'Job'}
                                                        </span>
                                                        <span className="jobplugin__messenger-header__type">
                                                            {conversationDetails[selectedConversation._id]?.employerType || 'Employer'}
                                                        </span>
                                                    </div>
                                                    <div className="jobplugin__messenger-header__right">
                                                        <ul className="jobplugin__messenger-header__buttons">
                                                            <li>
                                                                <button type="button" className="bg-light-sky brorder border-grey text-secondary">
                                                                    <FaEnvelope />
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button type="button" className="bg-light-sky brorder border-grey text-secondary">
                                                                    <FaPhone />
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button type="button" className="bg-light-sky brorder border-grey text-secondary">
                                                                    <FaVideo />
                                                                </button>
                                                            </li>
                                                            <li className="jobplugin__messenger-header__buttons-close">
                                                                <button type="button" className="jobplugin__messenger-dialog__close">
                                                                    <FaTimes />
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </header>

                                                <div className="jobplugin__messenger-dialog__content">
                                                    <div className="jobplugin__messenger-dialog__scroller">
                                                        {messages.length > 0 ? (
                                                            messages.map((message, index) => (
                                                                <div key={index} className={`jobplugin__messenger-message ${message.sender === 'employer' ? '' : 'reverse'}`}>
                                                                    <div className="jobplugin__messenger-message__head">
                                                                        <div className="jobplugin__messenger-message__avatar">
                                                                            {message.sender === 'employer' ? (
                                                                                <img
                                                                                    src={conversationDetails[selectedConversation._id]?.employerProfilePic || 'images/img10.jpg'}
                                                                                    alt="Employer"
                                                                                    style={{
                                                                                        width: '40px',
                                                                                        height: '40px',
                                                                                        borderRadius: '50%',
                                                                                        objectFit: 'cover'
                                                                                    }}
                                                                                />
                                                                            ) : (
                                                                                <img
                                                                                    src={employeeProfilePic || 'images/img11.jpg'}
                                                                                    alt="Employee"
                                                                                    style={{
                                                                                        width: '40px',
                                                                                        height: '40px',
                                                                                        borderRadius: '50%',
                                                                                        objectFit: 'cover'
                                                                                    }}
                                                                                />
                                                                            )}
                                                                        </div>
                                                                        <div className="jobplugin__messenger-message__time">
                                                                            {formatTime(message.createdAt)}
                                                                        </div>
                                                                    </div>
                                                                    <div className="jobplugin__messenger-message__item">
                                                                        <div className="jobplugin__messenger-message__wrap">
                                                                            <div className="jobplugin__messenger-message__content">
                                                                                <div className="jobplugin__messenger-message__body">
                                                                                    <div className="jobplugin__messenger-message__text">
                                                                                        {message.message}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="text-center p-20">No messages in this conversation</div>
                                                        )}
                                                        <div className="jobplugin__messenger-dialog__scroller-bottom"></div>
                                                    </div>
                                                </div>

                                                <footer className="jobplugin__messenger-footer">
                                                    <div className="jobplugin__messenger-form">
                                                        <ul className="jobplugin__messenger-tags">
                                                            {['Yes', 'No', 'That\'s it', 'Cool stuff', 'Show More', 'Try Different'].map((tag, index) => (
                                                                <li key={index}><a href="#">{tag}</a></li>
                                                            ))}
                                                        </ul>
                                                        <form className="jobplugin__messenger-form__holder" onSubmit={handleSendMessage}>
                                                            <textarea
                                                                rows="1"
                                                                className="form-control"
                                                                placeholder="Type your message..."
                                                                value={newMessage}
                                                                onChange={(e) => setNewMessage(e.target.value)}
                                                            ></textarea>
                                                            <div className="jobplugin__messenger-form__buttons">
                                                                <a href="#" className="jobplugin__button btn-attachment">
                                                                    <img src="images/icon-attach.svg" alt="Attachment" /> Add Attachment
                                                                </a>
                                                                <button className="jobplugin__button jobplugin__bg-primary hover:jobplugin__bg-secondary" type="submit">Send</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </footer>
                                            </div>
                                        ) : (
                                            <div className="jobplugin__messenger-dialog">
                                                <div className="text-center p-20">
                                                    {conversations.length === 0 ? 'No conversations available' : 'Select a conversation to view messages'}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <style jsx>{`
                .jobplugin__messenger-users__more {
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .message-meta {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .jobplugin__messenger-users__shortmsg {
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: #888;
                    font-size: 13px;
                }

                .jobplugin__messenger-users__job,
                .jobplugin__messenger-users__type {
                    display: block;
                    font-size: 12px;
                    color: #666;
                    margin-top: 2px;
                }

                .jobplugin__messenger-users__type {
                    color: #888;
                    font-size: 11px;
                    text-transform: capitalize;
                }

                .meta-container {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 2px;
                    margin-left: auto;
                    padding-left: 10px;
                }

                .time-menu-wrapper {
                    position: relative;
                    height: 16px;
                }

                .menu-dots {
                    background: none;
                    border: none;
                    color: #888;
                    cursor: pointer;
                    padding: 0;
                    font-size: 16px;
                    line-height: 1;
                    display: inline-block;
                    vertical-align: middle;
                }

                .message-menu {
                    position: absolute;
                    right: 0;
                    top: 100%;
                    background: white;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    padding: 5px 0;
                    z-index: 10;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    min-width: 100px;
                }

                .message-menu button {
                    display: block;
                    width: 100%;
                    padding: 5px 15px;
                    text-align: left;
                    background: none;
                    border: none;
                    color: #333;
                    cursor: pointer;
                    white-space: nowrap;
                }

                .message-menu button:hover {
                    background: #f5f5f5;
                }

                .time-unread-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .message-time {
                    color: #888;
                    font-size: 11px;
                    white-space: nowrap;
                    line-height: 1;
                }

                .unread-badge {
                    width: 8px;
                    height: 8px;
                    background: #25D366;
                    border-radius: 50%;
                    flex-shrink: 0;
                }

                .jobplugin__messenger-header__subtitle,
                .jobplugin__messenger-header__type {
                    display: block;
                    font-size: 13px;
                    color: #666;
                    margin-top: 2px;
                }

                .jobplugin__messenger-header__type {
                    color: #888;
                    font-size: 12px;
                    text-transform: capitalize;
                }
            `}</style>
        </>
    );
};

export default Inbox;