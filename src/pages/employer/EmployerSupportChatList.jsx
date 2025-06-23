
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployerHeader from './EmployerHeader';
import EmployerFooter from './EmployerFooter';

const EmployerSupportChatList = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Get employer data from localStorage
  const employerData = JSON.parse(localStorage.getItem('employerData'));
  const employerId = employerData?._id;

  // Fetch all chats for the employer
  useEffect(() => {
    if (!employerId) return;

    const fetchChats = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://edujobzbackend.onrender.com/employer/employer/${employerId}`);
        
        if (response.data && Array.isArray(response.data)) {
          setChats(response.data);
          if (response.data.length > 0) {
            setSelectedChat(response.data[0]);
          }
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching chats:', err);
        setError('Failed to load chat list');
        setLoading(false);
      }
    };

    fetchChats();
  }, [employerId]);

  // Fetch messages for the selected chat
  useEffect(() => {
    if (!selectedChat) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://edujobzbackend.onrender.com/employer/view', {
          params: {
            employeeId: selectedChat.employeeId,
            employerId: selectedChat.employerId,
            jobId: selectedChat.jobId
          }
        });

        if (response.data && response.data.messages) {
          setMessages(response.data.messages);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to load messages');
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedChat]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    try {
      // Prepare message data
      const messageData = {
        employeeId: selectedChat.employeeId,
        employerId: selectedChat.employerId,
        jobId: selectedChat.jobId,
        message: newMessage,
        sender: 'employer',
        employerName: employerData.companyName,
        employerImage: employerData.profilePicture,
        employeeName: selectedChat.employeeName,
        employeeImage: selectedChat.employeeImage
      };

      // Send message to API
      const response = await axios.post('https://edujobzbackend.onrender.com/employer/sendchat', messageData);

      if (response.data.success) {
        // Add the new message to local state
        const newMsg = {
          ...response.data.data,
          isMe: true,
          sender: 'You'
        };
        setMessages(prev => [...prev, newMsg]);
        setNewMessage('');

        // Simulate reply after 1-2 seconds
        setIsTyping(true);
        setTimeout(() => {
          const replyMsg = {
            _id: Date.now().toString(),
            message: 'Thanks for your message. Our support team will get back to you soon.',
            sender: 'employee',
            createdAt: new Date(),
            isRead: false,
            employeeImage: selectedChat.employeeImage,
            isMe: false,
            sender: selectedChat.employeeName
          };
          setMessages(prev => [...prev, replyMsg]);
          setIsTyping(false);
        }, 1500);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <EmployerHeader />
      <div className="content">
        <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
          <div className="head-icons">
            <a href="javascript:void(0);" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Collapse" id="collapse-header">
              <i className="lucide lucide-chevrons-up"></i>
            </a>
          </div>
        </div>
        
        <div className="chat-wrapper">
          {/* Chats sidebar */}
          <div className="sidebar-group border border-dark shadow p-2">
            <div id="chats" className="sidebar-content active slimscroll">
              <div className="slimscroll">
                <div className="chat-search-header">                            
                  <div className="header-title d-flex align-items-center justify-content-between">
                    <h4 className="mb-3">Help & Support</h4>
                  </div>
                
                  {/* Chat Search */}
                  <div className="search-wrap">
                    <form>
                      <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search For Contacts or Messages"/>
                        <span className="input-group-text"><i className="lucide lucide-search"></i></span>
                      </div>
                    </form>
                  </div>
                  {/* /Chat Search */} 
                </div>       
      
                <div className="sidebar-body chat-body" id="chatsidebar">
                  {/* Left Chat Title */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="chat-title">All Tickets Raised</h5>
                  </div>
                  {/* /Left Chat Title */}

                  {loading && (
                    <div className="text-center py-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="alert alert-danger">{error}</div>
                  )}

                  <div className="chat-users-wrap">
                    {/* User list items */}
                    {chats.map(chat => (
                      <div className="chat-list" key={chat._id}>
                        <a 
                          href="javascript:void(0)" 
                          className="chat-user-list"
                          onClick={() => setSelectedChat(chat)}
                        >
                          <div className="avatar avatar-lg online me-2">
                            <img 
                              src={chat.employeeImage || 'assets/img/profiles/avatar-29.jpg'} 
                              className="rounded-circle" 
                              alt={chat.employeeName}
                            />
                          </div>
                          <div className="chat-user-info">
                            <div className="chat-user-msg">
                              <h6>{chat.employeeName}</h6>
                              <p>
                                {chat.messages && chat.messages.length > 0 ? 
                                  chat.messages[chat.messages.length - 1].message : 
                                  'No messages yet'}
                              </p>
                            </div>
                            <div className="chat-user-time">
                              <span className="time">
                                {chat.messages && chat.messages.length > 0 ? 
                                  formatTime(chat.messages[chat.messages.length - 1].createdAt) : 
                                  ''}
                              </span>
                              <div className="chat-pin">
                                {chat.messages && chat.messages.some(m => !m.isRead) && (
                                  <span className="count-message fs-12 fw-semibold">
                                    {chat.messages.filter(m => !m.isRead).length}
                                  </span>
                                )}
                              </div>
                            </div>    
                          </div>
                        </a>                        
                        <div className="chat-dropdown">
                          <a href="#" data-bs-toggle="dropdown">
                            <i className="lucide lucide-more-vertical"></i>
                          </a>
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li><a className="dropdown-item" href="#"><i className="lucide lucide-archive me-2"></i>Archive Chat</a></li>
                            <li><a className="dropdown-item" href="#"><i className="lucide lucide-heart me-2"></i>Mark as Favourite</a></li>
                            <li><a className="dropdown-item" href="#"><i className="lucide lucide-check me-2"></i>Mark as Unread</a></li>
                            <li><a className="dropdown-item" href="#"><i className="lucide lucide-pin me-2"></i>Pin Chats</a></li>
                            <li><a className="dropdown-item" href="#"><i className="lucide lucide-trash me-2"></i>Delete</a></li>
                          </ul>
                        </div>     
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* / Chats sidebar */}					

          {/* Chat */}
          <div className="chat chat-messages show border border-dark shadow p-2" id="middle">
            <div>
              {selectedChat ? (
                <>
                  <div className="chat-header">
                    <div className="user-details">
                      <div className="d-xl-none">
                        <a className="text-muted chat-close me-2" href="#">
                          <i className="lucide lucide-arrow-left"></i>
                        </a>
                      </div>
                      <div className="avatar avatar-lg online flex-shrink-0">
                        <img 
                          src={selectedChat.employeeImage || 'assets/img/profiles/avatar-29.jpg'} 
                          className="rounded-circle" 
                          alt={selectedChat.employeeName}
                        />
                      </div>
                      <div className="ms-2 overflow-hidden">
                        <h6>{selectedChat.employeeName}</h6>
                        <span className="last-seen">Online</span>
                      </div>
                    </div>
                    <div className="chat-options">
                      <ul>
                        <li>
                          <a href="javascript:void(0)" className="btn chat-search-btn" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Search">
                            <i className="lucide lucide-search"></i>
                          </a>
                        </li>
                        <li>
                          <a className="btn no-bg" href="#" data-bs-toggle="dropdown">
                            <i className="lucide lucide-more-vertical"></i>
                          </a>
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li><a href="#" className="dropdown-item"><i className="lucide lucide-volume-x me-2"></i>Mute Notification</a></li>
                            <li><a href="#" className="dropdown-item"><i className="lucide lucide-clock me-2"></i>Disappearing Message</a></li>
                            <li><a href="#" className="dropdown-item"><i className="lucide lucide-trash-2 me-2"></i>Clear Message</a></li>
                            <li><a href="#" className="dropdown-item"><i className="lucide lucide-trash me-2"></i>Delete Chat</a></li>
                            <li><a href="#" className="dropdown-item"><i className="lucide lucide-ban me-2"></i>Block</a></li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="chat-body chat-page-group slimscroll">
                    <div className="messages">
                      <div className="chats">
                        {messages.map((message, index) => (
                          <div 
                            key={index} 
                            className={message.sender === 'employer' || message.isMe ? "chats chats-right" : "chats"}
                          >
                            {message.sender !== 'employer' && !message.isMe && (
                              <div className="chat-avatar">
                                <img 
                                  src={message.employeeImage || selectedChat.employeeImage || 'assets/img/profiles/avatar-29.jpg'} 
                                  className="rounded-circle" 
                                  alt={selectedChat.employeeName}
                                />
                              </div>
                            )}
                            <div className="chat-content">
                              <div className="chat-info">
                                <div className="message-content">
                                  {message.message}
                                  <div className="emoj-group">
                                    <ul>
                                      <li className="emoj-action">
                                        <a href="javascript:void(0);"><i className="lucide lucide-smile"></i></a>
                                      </li>
                                      <li><a href="#"><i className="lucide lucide-forward"></i></a></li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className={`chat-profile-name ${message.sender === 'employer' || message.isMe ? 'text-end' : ''}`}>
                                <h6>
                                  {message.sender === 'employer' || message.isMe ? 'You' : selectedChat.employeeName}
                                  <i className="lucide lucide-circle fs-7 mx-2"></i>
                                  <span className="chat-time">{formatTime(message.createdAt)}</span>
                                  {message.sender === 'employer' || message.isMe ? (
                                    <span className="msg-read success"><i className="lucide lucide-check"></i></span>
                                  ) : null}
                                </h6>
                              </div>
                            </div>
                            {message.sender === 'employer' || message.isMe ? (
                              <div className="chat-avatar">
                                <img 
                                  src={employerData.profilePicture || 'assets/img/profiles/avatar-14.jpg'} 
                                  className="rounded-circle" 
                                  alt="You"
                                />
                              </div>
                            ) : null}
                          </div>
                        ))}
                        
                        {isTyping && (
                          <div className="chats">
                            <div className="chat-avatar">
                              <img 
                                src={selectedChat.employeeImage || 'assets/img/profiles/avatar-29.jpg'} 
                                className="rounded-circle" 
                                alt={selectedChat.employeeName}
                              />
                            </div>
                            <div className="chat-content">
                              <div className="chat-profile-name">
                                <h6>
                                  {selectedChat.employeeName}
                                  <i className="lucide lucide-circle fs-7 mx-2"></i>
                                  <span className="chat-time">Now</span>
                                </h6>
                              </div>
                              <div className="message-content">
                                <span className="animate-typing">
                                  is typing
                                  <span className="dot"></span>
                                  <span className="dot"></span>
                                  <span className="dot"></span>
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="chat-footer">
                    <form className="footer-form" onSubmit={handleSendMessage}>
                      <div className="chat-footer-wrap">
                        <div className="form-item">
                          <a href="#" className="action-circle"><i className="lucide lucide-mic"></i></a>
                        </div>
                        <div className="form-wrap">
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Type Your Message"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                          />
                        </div>
                        <div className="form-item emoj-action-foot">
                          <a href="#" className="action-circle"><i className="lucide lucide-smile"></i></a>
                        </div>
                        <div className="form-item position-relative d-flex align-items-center justify-content-center">
                          <a href="#" className="action-circle file-action position-absolute">
                            <i className="lucide lucide-folder"></i>
                          </a>
                          <input type="file" className="open-file position-relative" name="files" id="files"/>
                        </div>
                        <div className="form-btn">
                          <button className="btn btn-primary" type="submit">
                            <i className="lucide lucide-send"></i>
                          </button>
                        </div>
                      </div>                        
                    </form>
                  </div>
                </>
              ) : (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <div className="text-center">
                    <i className="lucide lucide-message-square" style={{ fontSize: '48px', color: '#ccc' }}></i>
                    <p className="mt-3">Select a chat to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* /Chat */}
        </div>
        <br/>
      </div>
      <EmployerFooter />
    </>
  );
};

export default EmployerSupportChatList;