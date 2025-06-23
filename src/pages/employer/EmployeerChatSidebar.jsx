

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const EmployeerChatSidebar = ({ isOpen, onClose, candidate }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);
  const [chatId, setChatId] = useState(null);
  const dropdownRef = useRef(null);

  // Get employer data from localStorage
  const employerData = JSON.parse(localStorage.getItem('employerData'));

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch job details when component mounts or candidate changes
  useEffect(() => {
    if (isOpen && candidate?.jobId) {
      fetchJobDetails(candidate.jobId);
    }
  }, [isOpen, candidate]);

  // Fetch chat messages when job details are available
  useEffect(() => {
    if (jobDetails && candidate) {
      fetchChatMessages();
    }
  }, [jobDetails, candidate]);

  const fetchJobDetails = async (jobId) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://edujobzbackend.onrender.com/employer/fetchjob/${employerData._id}`);

      if (!response.data || response.data.length === 0) {
        throw new Error('No jobs found for this employer');
      }

      const job = response.data.find(j => j._id === jobId);
      if (!job) {
        throw new Error('Job not found');
      }

      setJobDetails(job);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching job details:', err);
      setError(err.message || 'Failed to load job details');
      setLoading(false);
    }
  };

  const fetchChatMessages = async () => {
    try {
      if (!candidate?.jobId || !candidate?.applicantId || !employerData?._id) return;

      const response = await axios.get(`https://edujobzbackend.onrender.com/employer/view`, {
        params: {
          employeeId: candidate.applicantId,
          employerId: employerData._id,
          jobId: candidate.jobId
        }
      });

      if (response.data) {
        const chat = response.data;
        
        if (chat && chat.messages) {
          // Transform API messages to match component format
          const formattedMessages = chat.messages.map(msg => ({
            id: msg._id || Date.now(),
            sender: msg.sender === 'employer' ? 'You' : candidate.firstName || candidate.name || 'Candidate',
            avatar: msg.sender === 'employer'
              ? employerData.profilePicture || 'employer/assets/img/profiles/avatar-14.jpg'
              : candidate.avatar || 'employer/assets/img/profiles/avatar-29.jpg',
            time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            content: msg.message,
            isMe: msg.sender === 'employer'
          }));

          setMessages(formattedMessages);
          setChatId(chat._id);
        } else {
          // No messages in chat yet, initialize with empty array
          setMessages([]);
          setChatId(chat._id);
        }
      }
    } catch (err) {
      console.error('Error fetching chat messages:', err);
      // If no chat exists yet (404), initialize with empty messages
      if (err.response?.status === 404) {
        setMessages([]);
        setChatId(null);
      } else {
        setError('Failed to load chat messages');
      }
    }
  };

  const toggleDropdown = (messageId, e) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === messageId ? null : messageId);
  };

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    const chatBody = document.querySelector('.chat-body');
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !candidate || !jobDetails) return;

    try {
      // First add the message optimistically to the UI
      const newMsg = {
        id: Date.now(),
        sender: 'You',
        avatar: employerData.profilePicture || 'employer/assets/img/profiles/avatar-14.jpg',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: newMessage,
        isMe: true
      };

      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');
      setActiveDropdown(null);

      // Prepare data for API
      const messageData = {
        employeeId: candidate.applicantId,
        employerId: employerData._id,
        jobId: candidate.jobId,
        message: newMessage,
        sender: 'employer',
        employerName: employerData.companyName,
        employerImage: employerData.profilePicture,
        employeeName: candidate.firstName || candidate.name,
        employeeImage: candidate.avatar
      };

      // Send message to API
      const response = await axios.post('https://edujobzbackend.onrender.com/employer/sendchat', messageData);

      if (response.data.success) {
        // Update chatId if this was a new chat
        if (!chatId && response.data.chatId) {
          setChatId(response.data.chatId);
        }

        // Simulate reply after 1-2 seconds
        setIsTyping(true);
        setTimeout(() => {
          const replyMsg = {
            id: Date.now() + 1,
            sender: candidate?.firstName || candidate?.name || 'Candidate',
            avatar: candidate?.avatar || 'employer/assets/img/profiles/avatar-29.jpg',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            content: 'Thanks for your message. I\'ll get back to you soon.',
            isMe: false
          };
          setMessages(prev => [...prev, replyMsg]);
          setIsTyping(false);
        }, 1500);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Remove the optimistic update if sending failed
      setMessages(prev => prev.filter(msg => msg.id !== newMsg.id));
      setError('Failed to send message. Please try again.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
    }
  };

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="chat-sidebar open" style={sidebarStyles}>
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="chat-sidebar open" style={sidebarStyles}>
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="alert alert-danger">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-sidebar open" style={sidebarStyles}>
      {/* Chat Header */}
      <div className="chat-header" style={headerStyles}>
        <div className="user-details" style={userDetailsStyles}>
          <div className="d-xl-none me-2">
            <a className="text-muted chat-close" href="#" onClick={(e) => { e.preventDefault(); onClose(); }}>
              <i className="fas fa-arrow-left"></i>
            </a>
          </div>
          <div className="avatar avatar-lg online flex-shrink-0">
            <img
              src={candidate?.avatar || 'employer/assets/img/profiles/avatar-29.jpg'}
              className="rounded-circle"
              alt="image"
              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
            />
          </div>
          <div className="ms-2 overflow-hidden flex-grow-1">
            <h6 className="mb-1">{candidate?.firstName || candidate?.name || 'Candidate'}</h6>
            <span className="last-seen text-success small">Online</span>
          </div>
          <div className="chat-options">
            <ul className="d-flex list-unstyled mb-0 align-items-center">
              <li>
                <a href="javascript:void(0)" className="btn btn-sm me-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Search">
                  <i className="ti ti-search"></i>
                </a>
              </li>
              <li>
                <div className="dropdown me-2">
                  <a className="btn btn-sm" href="#" data-bs-toggle="dropdown">
                    <i className="ti ti-dots-vertical"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end p-2">
                    <li><a href="#" className="dropdown-item small"><i className="ti ti-volume-off me-2"></i>Mute Notification</a></li>
                    <li><a href="#" className="dropdown-item small"><i className="ti ti-clock-hour-4 me-2"></i>Disappearing Message</a></li>
                    <li><a href="#" className="dropdown-item small"><i className="ti ti-clear-all me-2"></i>Clear Message</a></li>
                    <li><a href="#" className="dropdown-item small"><i className="ti ti-trash me-2"></i>Delete Chat</a></li>
                    <li><a href="#" className="dropdown-item small"><i className="ti ti-ban me-2"></i>Block</a></li>
                  </ul>
                </div>
              </li>
              <li>
                <a href="javascript:void(0)" className="btn btn-sm chat-close-btn" onClick={onClose}>
                  <i className="ti ti-x"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Chat Body */}
      <div className="chat-body" style={chatBodyStyles}>
        <div className="messages">
          <div className="chats">
            {messages.length > 0 ? (
              messages.map((message) => (
                <React.Fragment key={message.id}>
                  {message.isMe ? (
                    <div className="chats chats-right mb-3" style={myMessageStyles}>
                      <div className="chat-content" style={myMessageContentStyles}>
                        <div className="chat-info">
                          <div className="message-content" style={myMessageBubbleStyles}>
                            {message.content}
                            <div className="chat-actions" style={myMessageActionsStyles}>
                              <a
                                href="#"
                                className="btn btn-sm"
                                onClick={(e) => toggleDropdown(message.id, e)}
                                style={threeDotsButtonStyles}
                              >
                                <i className="ti ti-dots-vertical" style={{ fontSize: '14px' }}></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="chat-profile-name text-end mt-1">
                          <small className="text-muted">
                            {message.sender} <i className="ti ti-circle-filled" style={{ fontSize: '4px' }}></i> {message.time}
                            <span className="msg-read text-success ms-1">
                              <i className="ti ti-checks"></i>
                            </span>
                          </small>
                        </div>
                      </div>
                      <div className="chat-avatar">
                        <img
                          src={message.avatar}
                          className="rounded-circle"
                          alt="image"
                          style={avatarStyles}
                        />
                      </div>
                      {activeDropdown === message.id && (
                        <div
                          ref={dropdownRef}
                          className="dropdown-menu show p-3"
                          style={dropdownMenuStyles}
                        >
                          <li><a className="dropdown-item small" href="#"><i className="ti ti-heart me-2"></i>Reply</a></li>
                          <li><a className="dropdown-item small" href="#"><i className="ti ti-pinned me-2"></i>Forward</a></li>
                          <li><a className="dropdown-item small" href="#"><i className="ti ti-file-export me-2"></i>Copy</a></li>
                          <li><a className="dropdown-item small" href="#"><i className="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                          <li><a className="dropdown-item small" href="#"><i className="ti ti-trash me-2"></i>Delete</a></li>
                          <li><a className="dropdown-item small" href="#"><i className="ti ti-check me-2"></i>Mark as Unread</a></li>
                          <li><a className="dropdown-item small" href="#"><i className="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                          <li><a className="dropdown-item small" href="#"><i className="ti ti-pinned me-2"></i>Pin Chat</a></li>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="chats mb-3" style={theirMessageStyles}>
                      <div className="chat-avatar me-2">
                        <img
                          src={message.avatar}
                          className="rounded-circle"
                          alt="image"
                          style={avatarStyles}
                        />
                      </div>
                      <div className="chat-content" style={theirMessageContentStyles}>
                        <div className="chat-info">
                          <div className="message-content" style={theirMessageBubbleStyles}>
                            {message.content}
                            <div className="chat-actions" style={theirMessageActionsStyles}>
                              <a
                                href="#"
                                className="btn btn-sm"
                                onClick={(e) => toggleDropdown(message.id, e)}
                                style={threeDotsButtonStyles}
                              >
                                <i className="ti ti-dots-vertical" style={{ fontSize: '14px' }}></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="chat-profile-name mt-1">
                          <small className="text-muted">
                            {message.sender} <i className="ti ti-circle-filled" style={{ fontSize: '4px' }}></i> {message.time}
                          </small>
                        </div>
                      </div>
                      {activeDropdown === message.id && (
                        <div
                          ref={dropdownRef}
                          className="dropdown-menu show p-3"
                          style={theirDropdownMenuStyles}
                        >
                          <li><a className="dropdown-item small" href="#"><i className="ti ti-heart me-2"></i>Reply</a></li>
                          <li><a className="dropdown-item small" href="#"><i className="ti ti-pinned me-2"></i>Forward</a></li>
                          <li><a className="dropdown-item small" href="#"><i className="ti ti-file-export me-2"></i>Copy</a></li>
                          <li><a className="dropdown-item small" href="#"><i className="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                          <li><a className="dropdown-item small" href="#"><i className="ti ti-trash me-2"></i>Delete</a></li>
                          <li><a className="dropdown-item small" href="#"><i className="ti ti-check me-2"></i>Mark as Unread</a></li>
                          <li><a className="dropdown-item small" href="#"><i className="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                          <li><a className="dropdown-item small" href="#"><i className="ti ti-pinned me-2"></i>Pin Chat</a></li>
                        </div>
                      )}
                    </div>
                  )}
                </React.Fragment>
              ))
            ) : (
              <div className="text-center py-4">
                <p>No messages yet. Start the conversation!</p>
              </div>
            )}

            {/* Typing indicator */}
            {isTyping && (
              <div className="chats" style={typingIndicatorStyles}>
                <div className="chat-avatar me-2">
                  <img
                    src={candidate?.avatar || 'employer/assets/img/profiles/avatar-29.jpg'}
                    className="rounded-circle"
                    alt="image"
                    style={avatarStyles}
                  />
                </div>
                <div className="chat-content" style={theirMessageContentStyles}>
                  <div className="chat-profile-name">
                    <small className="text-muted">
                      {candidate?.firstName || candidate?.name || 'Candidate'} <i className="ti ti-circle-filled" style={{ fontSize: '4px' }}></i> Now
                    </small>
                  </div>
                  <div className="message-content" style={theirMessageBubbleStyles}>
                    <span className="animate-typing">
                      is typing
                      <span className="dot" style={typingDotStyles}></span>
                      <span className="dot" style={{ ...typingDotStyles, animationDelay: '0.2s' }}></span>
                      <span className="dot" style={{ ...typingDotStyles, animationDelay: '0.4s' }}></span>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Footer */}
      <div className="chat-footer" style={footerStyles}>
        <form className="footer-form" onSubmit={handleSendMessage}>
          <div className="chat-footer-wrap" style={footerFormStyles}>
            <div className="form-item">
              <a href="#" className="btn btn-light btn-sm rounded-circle" style={footerButtonStyles}>
                <i className="ti ti-microphone"></i>
              </a>
            </div>

            <div className="form-wrap flex-grow-1">
              <input
                type="text"
                className="form-control"
                placeholder="Type Your Message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                style={messageInputStyles}
              />
            </div>

            <div className="form-item emoj-action-foot">
              <a href="#" className="btn btn-light btn-sm rounded-circle" style={footerButtonStyles} title="Schedule Interview">
                <i className="ti ti-calendar"></i>
              </a>
            </div>

            <div className="form-item position-relative">
              <a href="#" className="btn btn-light btn-sm rounded-circle" style={footerButtonStyles}>
                <i className="ti ti-folder"></i>
              </a>
              <input
                type="file"
                className="position-absolute opacity-0"
                style={fileInputStyles}
                onChange={handleFileChange}
                id="fileInput"
              />
            </div>
            <div className="form-item">
              <div className="dropdown">
                <a href="#" className="btn btn-light btn-sm rounded-circle" data-bs-toggle="dropdown" style={footerButtonStyles}>
                  <i className="ti ti-dots-vertical"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-end p-2">
                  <a href="#" className="dropdown-item small"><i className="ti ti-check me-2"></i>Mark as Selected</a>
                  <a href="#" className="dropdown-item small"><i className="ti ti-x me-2"></i>Mark as Rejected</a>
                  <a href="#" className="dropdown-item small"><i className="ti ti-hand-stop me-2"></i>Mark as Hold</a>
                  <a href="#" className="dropdown-item small"><i className="ti ti-calendar me-2"></i>Schedule Interview</a>
                </div>
              </div>
            </div>
            <div className="form-btn">
              <button
                className="btn btn-primary btn-sm rounded-circle"
                type="submit"
                style={footerButtonStyles}
              >
                <i className="ti ti-send"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// Styles (keep the same as before)
const sidebarStyles = {
  position: 'fixed',
  top: '0',
  right: '0',
  width: '400px',
  height: '100vh',
  backgroundColor: '#fff',
  boxShadow: '-2px 0 15px rgba(0, 0, 0, 0.15)',
  zIndex: 1050,
  transition: 'right 0.3s ease-in-out',
  display: 'flex',
  flexDirection: 'column',
  borderLeft: '1px solid #e0e0e0'
};

const headerStyles = {
  flexShrink: 0,
  borderBottom: '1px solid #e0e0e0',
  padding: '15px'
};

const userDetailsStyles = {
  display: 'flex',
  alignItems: 'center'
};

const chatBodyStyles = {
  flex: 1,
  overflowY: 'auto',
  padding: '15px',
  maxHeight: 'calc(100vh - 140px)'
};

const myMessageStyles = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  position: 'relative'
};

const myMessageContentStyles = {
  maxWidth: '70%',
  marginRight: '10px'
};

const myMessageBubbleStyles = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '10px 15px',
  borderRadius: '18px 18px 4px 18px',
  position: 'relative'
};

const myMessageActionsStyles = {
  position: 'absolute',
  left: '-30px',
  top: '50%',
  transform: 'translateY(-50%)'
};

const theirMessageStyles = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  position: 'relative'
};

const theirMessageContentStyles = {
  maxWidth: '70%'
};

const theirMessageBubbleStyles = {
  backgroundColor: '#f8f9fa',
  color: '#333',
  padding: '10px 15px',
  borderRadius: '18px 18px 18px 4px',
  position: 'relative'
};

const theirMessageActionsStyles = {
  position: 'absolute',
  right: '-30px',
  top: '50%',
  transform: 'translateY(-50%)'
};

const dropdownMenuStyles = {
  position: 'absolute',
  left: '30px',
  top: '316%',
  transform: 'translateY(-50%)',
  zIndex: 1100,
  minWidth: '200px',
  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  backgroundColor: 'white',
  borderRadius: '8px'
};

const theirDropdownMenuStyles = {
  position: 'absolute',
  right: '20px',
  top: '226%',
  transform: 'translateY(-50%)',
  zIndex: 1100,
  minWidth: '200px',
  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  backgroundColor: 'white',
  borderRadius: '8px'
};

const typingIndicatorStyles = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start'
};

const avatarStyles = {
  width: '35px',
  height: '35px',
  objectFit: 'cover'
};

const threeDotsButtonStyles = {
  color: '#007bff',
  backgroundColor: 'white',
  borderRadius: '50%',
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const typingDotStyles = {
  display: 'inline-block',
  width: '4px',
  height: '4px',
  borderRadius: '50%',
  backgroundColor: '#333',
  marginLeft: '2px',
  animation: 'typing 1.4s infinite both'
};

const footerStyles = {
  flexShrink: 0,
  borderTop: '1px solid #e0e0e0',
  padding: '15px'
};

const footerFormStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
};

const footerButtonStyles = {
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const messageInputStyles = {
  borderRadius: '25px',
  padding: '10px 15px'
};

const fileInputStyles = {
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  cursor: 'pointer'
};

export default EmployeerChatSidebar;