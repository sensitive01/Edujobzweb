// import React, {useState} from 'react';
// import { FaCog, FaComments, FaEnvelope, FaPhone, FaVideo, FaTimes } from 'react-icons/fa';
// import Sidebar from '../../components/layout/Sidebar';

// const Inbox = () => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//       const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//       };
//       const closeSidebar = () => {
//         setIsSidebarOpen(false);
//       }
//   return (
//     <>
//       {/* Sub Visual of the page */}
//       <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 text-white"></div>
      
//       {/* Main content with grid layout */}
//       <main className="jobplugin__main">
//         <div className="jobplugin__main-holder">
//           <div className="jobplugin__container">

//                 <div className="jobplugin__settings">
//                   {/* Settings Nav Opener */}
//                   <a href="#" className="jobplugin__settings-opener jobplugin__text-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
//                     onClick={(e) => {
//                     e.preventDefault();
//                     toggleSidebar();
//                   }}
//                   >
//                     <FaCog className="rj-icon rj-settings" />
//                   </a>
//                     <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
//                   {/* Chat History Content */}
//                   <div className="jobplugin__container">
//                     <h2 className="h5 text-secondary mb-20"> &nbsp; <FaComments /> Chat History</h2>
//                     <div className="jobplugin__messenger border border-grey mt-0 p-10">
//                       {/* Messenger Aside */}
//                       <aside className="jobplugin__messenger-aside">
//                         {/* Messenger Aside Search */}
//                         <div className="jobplugin__messenger-search">
//                           <form action="#">
//                             <input className="form-control" style={{padding: "5px 15px"}} type="search" placeholder="Search Conversation" />
//                           </form>
//                           <br />
//                         </div>
//                         <div className="jobplugin__messenger-aside__scroller">
//                           {/* Messenger Users */}
//                           <ul className="jobplugin__messenger-users">
//                             <li className="active">
//                               <button className="jobplugin__messenger-users__button" type="button">
//                                 <strong className="jobplugin__messenger-users__avatar bg-red">M</strong>
//                                 <span className="jobplugin__messenger-users__textbox">
//                                   <strong className="jobplugin__messenger-users__name">Matt Thompson</strong>
//                                   <span className="jobplugin__messenger-users__shortmsg">Thanks again you have been...</span>
//                                 </span>
//                               </button>
//                               <div className="jobplugin__messenger-users__more">
//                                 <div className="jobplugin__messenger-openclose">
//                                   <button type="button" className="jobplugin__messenger-openclose__opener">
//                                     <span className="rj-icon rj-dots">⋯</span>
//                                   </button>
//                                   <ul className="jobplugin__messenger-openclose__slide">
//                                     <li><a href="#">Remove</a></li>
//                                   </ul>
//                                 </div>
//                                 <span className="jobplugin__messenger-users__time">5 min</span>
//                               </div>
//                             </li>
                            
//                             {/* Additional chat users */}
//                             {[
//                               { initial: 'C', name: 'Claire Sharwood', message: 'My selfie game is lacking can...', time: '10 min', bg: 'bg-yellow' },
//                               { initial: 'K', name: 'Kirsten Mckellar', message: 'Where is the nearest place to...', time: '2 min', bg: 'bg-blue' },
//                               { initial: 's', name: 'Shaun Gardner', message: 'Ok that sounds perfect', time: '30 min', bg: 'bg-green' },
//                               { initial: 'M', name: 'Mace Windu', message: 'Protect the senator at all costs.', time: '38 min', bg: 'bg-red' },
//                               { initial: 'C', name: 'Kayne West', message: 'So tell the voice inside your...', time: '49 min', bg: 'bg-yellow' },
//                               { initial: 'K', name: 'Kirsten Mckellar', message: 'Where is the nearest place to...', time: '2 min', bg: 'bg-blue' }
//                             ].map((user, index) => (
//                               <li key={index}>
//                                 <button className="jobplugin__messenger-users__button" type="button">
//                                   <strong className={`jobplugin__messenger-users__avatar ${user.bg}`}>{user.initial}</strong>
//                                   <span className="jobplugin__messenger-users__textbox">
//                                     <strong className="jobplugin__messenger-users__name">{user.name}</strong>
//                                     <span className="jobplugin__messenger-users__shortmsg">{user.message}</span>
//                                   </span>
//                                 </button>
//                                 <div className="jobplugin__messenger-users__more">
//                                   <div className="jobplugin__messenger-openclose">
//                                     <button type="button" className="jobplugin__messenger-openclose__opener">
//                                       <span className="rj-icon rj-dots">⋯</span>
//                                     </button>
//                                     <ul className="jobplugin__messenger-openclose__slide">
//                                       <li><a className="dropdown-item" href="#">Remove</a></li>
//                                     </ul>
//                                   </div>
//                                   <span className="jobplugin__messenger-users__time">{user.time}</span>
//                                 </div>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       </aside>
                      
//                       {/* Messenger Content */}
//                       <div className="jobplugin__messenger-content">
//                         {/* Messenger Dialog */}
//                         <div className="jobplugin__messenger-dialog">
//                           {/* Messenger Dialog header */}
//                           <header className="jobplugin__messenger-header">
//                             <div className="jobplugin__messenger-header__left">
//                               <strong className="jobplugin__messenger-header__title text-secondary">Matt Thompson</strong>
//                             </div>
//                             <div className="jobplugin__messenger-header__right">
//                               {/* Messenger Dialog Header Buttons */}
//                               <ul className="jobplugin__messenger-header__buttons">
//                                 <li>
//                                   <button type="button" className="bg-light-sky brorder border-grey text-secondary">
//                                     <FaEnvelope />
//                                   </button>
//                                 </li>
//                                 <li>
//                                   <button type="button" className="bg-light-sky brorder border-grey text-secondary">
//                                     <FaPhone />
//                                   </button>
//                                 </li>
//                                 <li>
//                                   <button type="button" className="bg-light-sky brorder border-grey text-secondary">
//                                     <FaVideo />
//                                   </button>
//                                 </li>
//                                 <li className="jobplugin__messenger-header__buttons-close">
//                                   <button type="button" className="jobplugin__messenger-dialog__close">
//                                     <FaTimes />
//                                   </button>
//                                 </li>
//                               </ul>
//                             </div>
//                           </header>
                          
//                           {/* Messenger Content */}
//                           <div className="jobplugin__messenger-dialog__content">
//                             <div className="jobplugin__messenger-dialog__scroller">
//                               {/* Sample chat messages */}
//                               {[
//                                 { avatar: 'img10.jpg', time: '12:45', message: 'It goes a little something like this.', reverse: false },
//                                 { avatar: 'img10.jpg', time: '12:45', message: 'It was all a dream, I used to read Word Up magazine Salt\'n\'Pepa and Heavy D up in the limousine.', reverse: false },
//                                 { avatar: 'img11.jpg', time: '12:45', message: 'Did you ever Hang\' pictures on your wall?', reverse: true },
//                                 { avatar: 'img10.jpg', time: '12:45', message: 'Yes I did! Every Saturday! Rap Attack, Mr. Magic, Marley Marl. I even let my tape rock \'til my tape popped. Smokin\' weed and bamboo, sippin\' on private stock. But this was way back, when I had the red and black lumberjack with the hat to match.', reverse: false },
//                                 { avatar: 'img11.jpg', time: '12:45', message: 'Haha awesome, I think I know the album your looking for.', reverse: true }
//                               ].map((msg, index) => (
//                                 <div key={index} className={`jobplugin__messenger-message ${msg.reverse ? 'reverse' : ''}`}>
//                                   <div className="jobplugin__messenger-message__head">
//                                     <div className="jobplugin__messenger-message__avatar">
//                                       <img src={`images/${msg.avatar}`} alt="User" />
//                                     </div>
//                                     <div className="jobplugin__messenger-message__time">{msg.time}</div>
//                                   </div>
//                                   <div className="jobplugin__messenger-message__item">
//                                     <div className="jobplugin__messenger-message__wrap">
//                                       <div className="jobplugin__messenger-message__content">
//                                         <div className="jobplugin__messenger-message__body">
//                                           <div className="jobplugin__messenger-message__text">
//                                             {msg.message}
//                                           </div>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               ))}
//                               <div className="jobplugin__messenger-dialog__scroller-bottom"></div>
//                             </div>
//                           </div>
                          
//                           {/* Messenger Footer */}
//                           <footer className="jobplugin__messenger-footer">
//                             <div className="jobplugin__messenger-form">
//                               {/* Messenger Tags */}
//                               <ul className="jobplugin__messenger-tags">
//                                 {['Yes', 'No', 'That\'s it', 'Cool stuff', 'Show More', 'Try Different'].map((tag, index) => (
//                                   <li key={index}><a href="#">{tag}</a></li>
//                                 ))}
//                               </ul>
//                               {/* Messenger Footer Form */}
//                               <form className="jobplugin__messenger-form__holder" action="#">
//                                 <textarea rows="1" className="form-control" placeholder="Type your message..."></textarea>
//                                 <div className="jobplugin__messenger-form__buttons">
//                                   <a href="#" className="jobplugin__button btn-attachment">
//                                     <img src="images/icon-attach.svg" alt="Attachment" /> Add Attachment
//                                   </a>
//                                   <button className="jobplugin__button jobplugin__bg-primary hover:jobplugin__bg-secondary" type="submit">Send</button>
//                                 </div>
//                               </form>
//                             </div>
//                           </footer>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
            
          
//           </div>
//         </div>
//       </main>
//     </>
//   );
// };

// export default Inbox;


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

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    
    const closeSidebar = () => {
        setIsSidebarOpen(false);
    }

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                setLoading(true);
                const userData = JSON.parse(localStorage.getItem('userData'));
                if (!userData || !userData._id) {
                    setConversations([]);
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`https://edujobzbackend.onrender.com/employer/employee/${userData._id}`);
                
                if (response.data && response.data.length > 0) {
                    setConversations(response.data);
                    // Select the first conversation by default
                    setSelectedConversation(response.data[0]);
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

        const fetchMessages = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://edujobzbackend.onrender.com/employer/view', {
                    params: {
                        employeeId: selectedConversation.employeeId,
                        employerId: selectedConversation.employerId,
                        jobId: selectedConversation.jobId
                    }
                });

                if (response.data && response.data.messages) {
                    setMessages(response.data.messages);
                }
            } catch (err) {
                console.error('Error fetching messages:', err);
                setError(err.response?.data?.message || err.message || 'Failed to fetch messages');
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [selectedConversation]);

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
                sender: 'employer'
            };

            const response = await axios.post('https://edujobzbackend.onrender.com/employer/sendchat', messageData);

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

    if (loading) {
        return <div className="jobplugin__container">Loading conversations...</div>;
    }

    if (error) {
        return <div className="jobplugin__container">Error: {error}</div>;
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
                            
                            {/* Chat History Content */}
                            <div className="jobplugin__container">
                                <h2 className="h5 text-secondary mb-20"> &nbsp; <FaComments /> Chat History</h2>
                                <div className="jobplugin__messenger border border-grey mt-0 p-10">
                                    {/* Messenger Aside */}
                                    <aside className="jobplugin__messenger-aside">
                                        {/* Messenger Aside Search */}
                                        <div className="jobplugin__messenger-search">
                                            <form action="#">
                                                <input className="form-control" style={{padding: "5px 15px"}} type="search" placeholder="Search Conversation" />
                                            </form>
                                            <br />
                                        </div>
                                        <div className="jobplugin__messenger-aside__scroller">
                                            {/* Messenger Users */}
                                            <ul className="jobplugin__messenger-users">
                                                {conversations.length > 0 ? (
                                                    conversations.map((conversation, index) => (
                                                        <li key={conversation._id} className={selectedConversation?._id === conversation._id ? 'active' : ''}>
                                                            <button 
                                                                className="jobplugin__messenger-users__button" 
                                                                type="button"
                                                                onClick={() => setSelectedConversation(conversation)}
                                                            >
                                                                <strong className="jobplugin__messenger-users__avatar bg-red">
                                                                    {conversation.employeeId?.charAt(0) || 'U'}
                                                                </strong>
                                                                <span className="jobplugin__messenger-users__textbox">
                                                                    <strong className="jobplugin__messenger-users__name">
                                                                        {conversation.employeeId || 'Unknown User'}
                                                                    </strong>
                                                                    <span className="jobplugin__messenger-users__shortmsg">
                                                                        {conversation.messages.length > 0 
                                                                            ? conversation.messages[conversation.messages.length - 1].message 
                                                                            : 'No messages yet'}
                                                                    </span>
                                                                </span>
                                                            </button>
                                                            <div className="jobplugin__messenger-users__more">
                                                                <div className="jobplugin__messenger-openclose">
                                                                    <button type="button" className="jobplugin__messenger-openclose__opener">
                                                                        <span className="rj-icon rj-dots">⋯</span>
                                                                    </button>
                                                                    <ul className="jobplugin__messenger-openclose__slide">
                                                                        <li><a href="#">Remove</a></li>
                                                                    </ul>
                                                                </div>
                                                                {conversation.messages.length > 0 && (
                                                                    <span className="jobplugin__messenger-users__time">
                                                                        {formatTime(conversation.messages[conversation.messages.length - 1].createdAt)}
                                                                    </span>
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
                                    
                                    {/* Messenger Content */}
                                    <div className="jobplugin__messenger-content">
                                        {selectedConversation ? (
                                            <div className="jobplugin__messenger-dialog">
                                                {/* Messenger Dialog header */}
                                                <header className="jobplugin__messenger-header">
                                                    <div className="jobplugin__messenger-header__left">
                                                        <strong className="jobplugin__messenger-header__title text-secondary">
                                                            {selectedConversation.employeeId || 'Unknown User'}
                                                        </strong>
                                                    </div>
                                                    <div className="jobplugin__messenger-header__right">
                                                        {/* Messenger Dialog Header Buttons */}
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
                                                
                                                {/* Messenger Content */}
                                                <div className="jobplugin__messenger-dialog__content">
                                                    <div className="jobplugin__messenger-dialog__scroller">
                                                        {messages.length > 0 ? (
                                                            messages.map((message, index) => (
                                                                <div key={index} className={`jobplugin__messenger-message ${message.sender === 'employer' ? '' : 'reverse'}`}>
                                                                    <div className="jobplugin__messenger-message__head">
                                                                        <div className="jobplugin__messenger-message__avatar">
                                                                            {message.sender === 'employer' ? (
                                                                                <img src="images/img10.jpg" alt="User" />
                                                                            ) : (
                                                                                <img src="images/img11.jpg" alt="User" />
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
                                                
                                                {/* Messenger Footer */}
                                                <footer className="jobplugin__messenger-footer">
                                                    <div className="jobplugin__messenger-form">
                                                        {/* Messenger Tags */}
                                                        <ul className="jobplugin__messenger-tags">
                                                            {['Yes', 'No', 'That\'s it', 'Cool stuff', 'Show More', 'Try Different'].map((tag, index) => (
                                                                <li key={index}><a href="#">{tag}</a></li>
                                                            ))}
                                                        </ul>
                                                        {/* Messenger Footer Form */}
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
        </>
    );
};

export default Inbox;