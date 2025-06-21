
import React, { useState, useEffect, useRef } from 'react';

const EmployeerChatSidebar = ({ isOpen, onClose, candidate }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Anthony Lewis',
      avatar: 'employer/assets/img/profiles/avatar-29.jpg',
      time: '08:00 AM',
      content: 'Hi John, I wanted to update you on a new company policy regarding remote work.',
      isMe: false
    },
    {
      id: 2,
      sender: 'Anthony Lewis',
      avatar: 'employer/assets/img/profiles/avatar-29.jpg',
      time: '08:00 AM',
      content: 'Do you have a moment?',
      isMe: false
    },
    {
      id: 3,
      sender: 'You',
      avatar: 'employer/assets/img/profiles/avatar-14.jpg',
      time: '08:00 AM',
      content: 'Sure, Sarah. What\'s the new policy?',
      isMe: true
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

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

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: messages.length + 1,
      sender: 'You',
      avatar: 'employer/assets/img/profiles/avatar-14.jpg',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: newMessage,
      isMe: true
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
    setActiveDropdown(null);

    // Simulate reply after 1-2 seconds
    setIsTyping(true);
    setTimeout(() => {
      const replyMsg = {
        id: messages.length + 2,
        sender: candidate?.name || 'Anthony Lewis',
        avatar: candidate?.avatar || 'employer/assets/img/profiles/avatar-29.jpg',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: 'Thanks for your message. I\'ll get back to you soon.',
        isMe: false
      };
      setMessages(prev => [...prev, replyMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`chat-sidebar ${isOpen ? 'open' : ''}`}
      style={{
        position: 'fixed',
        top: '0',
        right: isOpen ? '0' : '-400px',
        width: '400px',
        height: '100vh',
        backgroundColor: '#fff',
        boxShadow: '-2px 0 15px rgba(0, 0, 0, 0.15)',
        zIndex: 1050,
        transition: 'right 0.3s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        borderLeft: '1px solid #e0e0e0'
      }}
    >
      {/* Chat Header */}
      <div className="chat-header" style={{ flexShrink: 0, borderBottom: '1px solid #e0e0e0', padding: '15px' }}>
        <div className="user-details" style={{ display: 'flex', alignItems: 'center' }}>
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
            <h6 className="mb-1">{candidate?.name || 'Anthony Lewis'}</h6>
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
      <div
        className="chat-body"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '15px',
          maxHeight: 'calc(100vh - 140px)'
        }}
      >
        <div className="messages">
          <div className="chats">
            {messages.map((message) => (
              <React.Fragment key={message.id}>
                {message.isMe ? (
                  // My messages (right side) - Three dots on LEFT side
                  <div className="chats chats-right mb-3" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', position: 'relative' }}>
                    <div className="chat-content" style={{ maxWidth: '70%', marginRight: '10px' }}>
                      <div className="chat-info">
                        <div className="message-content" style={{
                          backgroundColor: '#007bff',
                          color: 'white',
                          padding: '10px 15px',
                          borderRadius: '18px 18px 4px 18px',
                          position: 'relative'
                        }}>
                          {message.content}
                          <div className="chat-actions" style={{ position: 'absolute', left: '-30px', top: '50%', transform: 'translateY(-50%)' }}>
                            <a
                              href="#"
                              className="btn btn-sm"
                              onClick={(e) => toggleDropdown(message.id, e)}
                              style={{ color: '#007bff', backgroundColor: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
                        style={{ width: '35px', height: '35px', objectFit: 'cover' }}
                      />
                    </div>
                    {activeDropdown === message.id && (
                      <div
                        ref={dropdownRef}
                        className="dropdown-menu show p-3"
                        style={{
                          position: 'absolute',
                          left: '30px',
                          top: '316%',
                          transform: 'translateY(-50%)',
                          zIndex: 1100,
                          minWidth: '200px',
                          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                          backgroundColor: 'white',
                          borderRadius: '8px'
                        }}
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
                  // Other person's messages (left side) - Three dots on RIGHT side
                  <div className="chats mb-3" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', position: 'relative' }}>
                    <div className="chat-avatar me-2">
                      <img
                        src={message.avatar}
                        className="rounded-circle"
                        alt="image"
                        style={{ width: '35px', height: '35px', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="chat-content" style={{ maxWidth: '70%' }}>
                      <div className="chat-info">
                        <div className="message-content" style={{
                          backgroundColor: '#f8f9fa',
                          color: '#333',
                          padding: '10px 15px',
                          borderRadius: '18px 18px 18px 4px',
                          position: 'relative'
                        }}>
                          {message.content}
                          <div className="chat-actions" style={{ position: 'absolute', right: '-30px', top: '50%', transform: 'translateY(-50%)' }}>
                            <a
                              href="#"
                              className="btn btn-sm"
                              onClick={(e) => toggleDropdown(message.id, e)}
                              style={{ color: '#6c757d', backgroundColor: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
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
                        style={{
                          position: 'absolute',
                          right: '20px',
                          top: '226%',
                          transform: 'translateY(-50%)',
                          zIndex: 1100,
                          minWidth: '200px',
                          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                          backgroundColor: 'white',
                          borderRadius: '8px'
                        }}
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
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="chats" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <div className="chat-avatar me-2">
                  <img
                    src={candidate?.avatar || 'employer/assets/img/profiles/avatar-29.jpg'}
                    className="rounded-circle"
                    alt="image"
                    style={{ width: '35px', height: '35px', objectFit: 'cover' }}
                  />
                </div>
                <div className="chat-content" style={{ maxWidth: '70%' }}>
                  <div className="chat-profile-name">
                    <small className="text-muted">
                      {candidate?.name || 'Anthony Lewis'} <i className="ti ti-circle-filled" style={{ fontSize: '4px' }}></i> Now
                    </small>
                  </div>
                  <div className="message-content" style={{ backgroundColor: '#f8f9fa', color: '#333', padding: '10px 15px', borderRadius: '18px 18px 18px 4px' }}>
                    <span className="animate-typing">
                      is typing
                      <span className="dot" style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#333', marginLeft: '2px', animation: 'typing 1.4s infinite both' }}></span>
                      <span className="dot" style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#333', marginLeft: '2px', animation: 'typing 1.4s infinite both', animationDelay: '0.2s' }}></span>
                      <span className="dot" style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#333', marginLeft: '2px', animation: 'typing 1.4s infinite both', animationDelay: '0.4s' }}></span>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Footer */}
      <div className="chat-footer" style={{ flexShrink: 0, borderTop: '1px solid #e0e0e0', padding: '15px' }}>
        <form className="footer-form" onSubmit={handleSendMessage}>
          <div className="chat-footer-wrap" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="form-item">
              <a href="#" className="btn btn-light btn-sm rounded-circle" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                style={{ borderRadius: '25px', padding: '10px 15px' }}
              />
            </div>

            <div className="form-item emoj-action-foot">
              <a href="#" className="btn btn-light btn-sm rounded-circle" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Schedule Interview">
                <i className="ti ti-calendar"></i>
              </a>
            </div>

            <div className="form-item position-relative">
              <a href="#" className="btn btn-light btn-sm rounded-circle" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="ti ti-folder"></i>
              </a>
              <input
                type="file"
                className="position-absolute opacity-0"
                style={{ top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                onChange={handleFileChange}
                id="fileInput"
              />
            </div>
            <div className="form-item">
              <div className="dropdown">
                <a href="#" className="btn btn-light btn-sm rounded-circle" data-bs-toggle="dropdown" style={{ width: '40px', height: '40px' }}>
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
                style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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

export default EmployeerChatSidebar;


