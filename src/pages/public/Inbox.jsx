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

const Inbox = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    }

    useEffect(() => {
        const fetchChats = async () => {
            try {
                setLoading(true);
                // Get user data from localStorage
                const userData = JSON.parse(localStorage.getItem('userData'));
                if (!userData || !userData._id) {
                    throw new Error('User data not found in localStorage');
                }

                const employeeId = userData._id;
                const response = await fetch(`https://edujobzbackend.onrender.com/employer/employee/${employeeId}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch chats');
                }

                const data = await response.json();
                setChats(data);
                if (data.length > 0) {
                    setSelectedChat(data[0]);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchChats();
    }, []);

    const handleChatSelect = (chat) => {
        setSelectedChat(chat);
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
                                            {loading ? (
                                                <div className="text-center">Loading chats...</div>
                                            ) : error ? (
                                                <div className="text-danger">{error}</div>
                                            ) : (
                                                <ul className="jobplugin__messenger-users">
                                                    {chats.map((chat, index) => (
                                                        <li key={chat._id} className={selectedChat?._id === chat._id ? 'active' : ''}>
                                                            <button 
                                                                className="jobplugin__messenger-users__button" 
                                                                type="button"
                                                                onClick={() => handleChatSelect(chat)}
                                                            >
                                                                <strong className={`jobplugin__messenger-users__avatar bg-${['red', 'blue', 'green', 'yellow'][index % 4]}`}>
                                                                    {chat.jobId ? chat.jobId.charAt(0) : 'J'}
                                                                </strong>
                                                                <span className="jobplugin__messenger-users__textbox">
                                                                    <strong className="jobplugin__messenger-users__name">
                                                                        Job ID: {chat.jobId}
                                                                    </strong>
                                                                    <span className="jobplugin__messenger-users__shortmsg">
                                                                        Last updated: {new Date(chat.updatedAt).toLocaleString()}
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
                                                                <span className="jobplugin__messenger-users__time">
                                                                    {new Date(chat.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                                </span>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </aside>
                                    
                                    {/* Messenger Content */}
                                    <div className="jobplugin__messenger-content">
                                        {selectedChat ? (
                                            <div className="jobplugin__messenger-dialog">
                                                {/* Messenger Dialog header */}
                                                <header className="jobplugin__messenger-header">
                                                    <div className="jobplugin__messenger-header__left">
                                                        <strong className="jobplugin__messenger-header__title text-secondary">
                                                            Job ID: {selectedChat.jobId}
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
                                                        {selectedChat.messages && selectedChat.messages.length > 0 ? (
                                                            selectedChat.messages.map((msg, index) => (
                                                                <div key={index} className={`jobplugin__messenger-message ${msg.sender === 'employee' ? '' : 'reverse'}`}>
                                                                    <div className="jobplugin__messenger-message__head">
                                                                        <div className="jobplugin__messenger-message__avatar">
                                                                            {msg.sender === 'employee' ? (
                                                                                <strong className="jobplugin__messenger-users__avatar bg-green">Y</strong>
                                                                            ) : (
                                                                                <strong className="jobplugin__messenger-users__avatar bg-blue">E</strong>
                                                                            )}
                                                                        </div>
                                                                        <div className="jobplugin__messenger-message__time">
                                                                            {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                                        </div>
                                                                    </div>
                                                                    <div className="jobplugin__messenger-message__item">
                                                                        <div className="jobplugin__messenger-message__wrap">
                                                                            <div className="jobplugin__messenger-message__content">
                                                                                <div className="jobplugin__messenger-message__body">
                                                                                    <div className="jobplugin__messenger-message__text">
                                                                                        {msg.message}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="text-center py-4">No messages in this chat yet</div>
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
                                                        <form className="jobplugin__messenger-form__holder" action="#">
                                                            <textarea rows="1" className="form-control" placeholder="Type your message..."></textarea>
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
                                                <div className="text-center py-4">
                                                    {loading ? 'Loading...' : error ? error : 'Select a chat to view messages'}
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