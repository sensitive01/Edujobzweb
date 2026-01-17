import React, { useState, useEffect, useRef } from "react";
import {
  FaCog,
  FaComments,
  FaEnvelope,
  FaPhone,
  FaVideo,
  FaTimes, // Used for closing modals etc
  FaMicrophone, // Used for voice notes
  FaPaperclip,
  FaInbox,
  FaCommentSlash,
  FaPhoneSlash, // For hanging up
} from "react-icons/fa";
import Sidebar from "../../components/layout/Sidebar";
import axios from "axios";
import { io } from "socket.io-client";
import Peer from "simple-peer";

// Ensure global exists for simple-peer if missing
if (typeof global === "undefined") {
  window.global = window;
}

const Inbox = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [conversationDetails, setConversationDetails] = useState({});
  const [employeeProfilePic, setEmployeeProfilePic] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  // Socket & WebRTC State
  const [socket, setSocket] = useState(null);
  const [me, setMe] = useState("");
  const [stream, setStream] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);

  const fileInputRef = useRef(null);
  const audioRef = useRef(null);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const messagesEndRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Socket
  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:4000";
    const socketUrl = baseUrl.replace(/\/api$/, "");
    console.log("Connecting socket to:", socketUrl);
    const socketInstance = io(socketUrl, {
      transports: ["websocket", "polling"], // explicit transports
      reconnectionAttempts: 5,
    });
    setSocket(socketInstance);

    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData._id) {
      setMe(userData._id);
      socketInstance.emit("join_user_room", userData._id);
    }

    socketInstance.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
      setIsVideoCall(data.isVideo);
      setShowCallModal(true);
    });

    socketInstance.on("callAccepted", (signal) => {
      setCallAccepted(true);
      connectionRef.current?.signal(signal);
    });

    socketInstance.on("callEnded", () => {
      setCallEnded(true);
      leaveCall(false); // Clean up local state
    });

    return () => {
      socketInstance.off("callUser");
    };
  }, []);

  // Listen for incoming messages
  useEffect(() => {
    if (!socket) return;
    socket.on("receive_message", (data) => {
      if (
        selectedConversation &&
        data.conversationId === selectedConversation._id
      ) {
        setMessages((prev) => [...prev, data]);
      }
    });
    return () => socket.off("receive_message");
  }, [socket, selectedConversation]);

  useEffect(() => {
    const fetchEmployeeProfile = async (employeeId) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/fetchemployee/${employeeId}`,
        );
        if (response.data && response.data.userProfilePic) {
          setEmployeeProfilePic(response.data.userProfilePic);
        }
      } catch (err) {
        console.error("Error fetching employee profile:", err);
      }
    };

    const fetchEmployerProfile = async (employerId) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/employer/fetchemployer/${employerId}`,
        );
        if (response.data) {
          return {
            employerProfilePic:
              response.data.userProfilePic || "images/img10.jpg",
            employerName:
              response.data.schoolName ||
              response.data.firstName + " " + response.data.lastName ||
              "Employer",
            employerType: response.data.employerType || "Employer",
          };
        }
        return null;
      } catch (err) {
        console.error("Error fetching employer profile:", err);
        return null;
      }
    };

    const fetchConversations = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (!userData || !userData._id) {
          setLoading(false);
          return;
        }

        // Fetch employee profile picture first
        await fetchEmployeeProfile(userData._id);

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/employer/employee/${userData._id}`,
        );

        if (response.data && response.data.length > 0) {
          setConversations(response.data);
          setConversations(response.data);
          // setSelectedConversation(response.data[0]); // Disabled auto-select

          // Fetch profile pictures and names for all conversations
          const details = {};
          for (const conversation of response.data) {
            try {
              // Fetch employer details from employer profile API
              const employerProfile = await fetchEmployerProfile(
                conversation.employerId,
              );

              // Also fetch job details for job title
              const jobDetailsResponse = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/employer/fetchjob/${conversation.employerId}`,
              );

              if (
                jobDetailsResponse.data &&
                jobDetailsResponse.data.length > 0
              ) {
                const job = jobDetailsResponse.data.find(
                  (j) => j._id === conversation.jobId,
                );
                if (job) {
                  details[conversation._id] = {
                    ...(employerProfile || {}),
                    jobTitle: job.jobTitle || "Job",
                  };
                }
              } else if (employerProfile) {
                details[conversation._id] = employerProfile;
              }
            } catch (err) {
              console.error("Error fetching conversation details:", err);
            }
          }
          setConversationDetails(details);
        }
      } catch (err) {
        console.error("Error fetching conversations:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch conversations",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    if (!selectedConversation) return;

    if (socket) {
      socket.emit("join_conversation", selectedConversation._id);
    }

    // Function to fetch messages
    const fetchMessages = async () => {
      try {
        const messagesResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/employer/view`,
          {
            params: {
              employeeId: selectedConversation.employeeId,
              employerId: selectedConversation.employerId,
              jobId: selectedConversation.jobId,
            },
          },
        );

        if (messagesResponse.data && messagesResponse.data.messages) {
          setMessages(messagesResponse.data.messages);
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    // Initial fetch
    fetchMessages();

    // Polling removed in favor of sockets, but kept as fallback? No, let's rely on sockets for instant updates
    // const intervalId = setInterval(fetchMessages, 3000);
    // return () => clearInterval(intervalId);
  }, [selectedConversation, socket]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (
      !newMessage.trim() &&
      !audioChunks.length &&
      !fileInputRef.current?.files?.[0]
    ) {
      return;
    }

    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const formData = new FormData();

      formData.append("employeeId", selectedConversation.employeeId);
      formData.append("employerId", selectedConversation.employerId);
      formData.append("jobId", selectedConversation.jobId);
      formData.append("message", newMessage);
      formData.append("sender", "employee");
      formData.append(
        "employerName",
        conversationDetails[selectedConversation._id]?.employerName ||
          "Employer",
      );
      formData.append(
        "employerImage",
        conversationDetails[selectedConversation._id]?.employerProfilePic || "",
      );
      formData.append(
        "employeeName",
        userData.firstName + " " + userData.lastName,
      );
      formData.append("employeeImage", employeeProfilePic || "");

      // Handle file upload
      if (fileInputRef.current?.files?.[0]) {
        formData.append("file", fileInputRef.current.files[0]);
        formData.append("fileType", fileInputRef.current.files[0].type);
      }

      // Handle audio upload
      if (audioChunks.length > 0) {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        formData.append("file", audioBlob, "audio-message.wav");
        formData.append("fileType", "audio/wav");
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/employer/sendchats`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.success) {
        const newMsg = {
          ...response.data.data,
          isMe: true,
          sender: "employee", // Ensure sender matches logic
        };
        // Optimistic update handled by socket usually, but for self message:
        setMessages((prev) => [...prev, newMsg]);

        // Emit via socket
        socket.emit("send_message", {
          ...newMsg,
          conversationId: selectedConversation._id,
        });

        setNewMessage("");
        setAudioChunks([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again.");
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setAudioChunks((prev) => [...prev, e.data]);
        }
      };

      recorder.start(1000); // Collect data every 1 second
      setIsRecording(true);
    } catch (err) {
      console.error("Error starting recording:", err);
      setError("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const playAudio = () => {
    if (audioChunks.length > 0) {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
      }
    }
  };

  const clearRecording = () => {
    setAudioChunks([]);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatSidebarTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    const isToday =
      now.getDate() === date.getDate() &&
      now.getMonth() === date.getMonth() &&
      now.getFullYear() === date.getFullYear();
    const isYesterday =
      new Date(now.setDate(now.getDate() - 1)).getDate() === date.getDate() &&
      now.getMonth() === date.getMonth() &&
      now.getFullYear() === date.getFullYear();

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (isToday) return `${Math.floor(diffInMinutes / 60)}h`;
    if (isYesterday) return "Yesterday";

    // For dates older than yesterday
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  // WebRTC Functions
  const callUser = async (video = false) => {
    setIsVideoCall(video);
    setShowCallModal(true);
    setCallAccepted(false);
    setCallEnded(false);

    try {
      const currentStream = await navigator.mediaDevices.getUserMedia({
        video: video,
        audio: true,
      });
      setStream(currentStream);
      if (myVideo.current) myVideo.current.srcObject = currentStream;

      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: currentStream,
      });

      peer.on("signal", (data) => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        // We need to signal the specific user.
        // In this context, we are calling the Employer.
        socket.emit("callUser", {
          userToCall: selectedConversation.employerId, // Assuming employerId is their socket room or linked ID
          signalData: data,
          from: userData._id,
          name: userData.firstName,
          isVideo: video,
        });
      });

      peer.on("stream", (currentStream) => {
        if (userVideo.current) userVideo.current.srcObject = currentStream;
      });

      socket.on("callAccepted", (signal) => {
        setCallAccepted(true);
        peer.signal(signal);
      });

      connectionRef.current = peer;
    } catch (err) {
      console.error("Error media devices", err);
      alert("Could not access camera/microphone");
      setShowCallModal(false);
    }
  };

  const answerCall = async () => {
    setCallAccepted(true);
    try {
      const currentStream = await navigator.mediaDevices.getUserMedia({
        video: isVideoCall,
        audio: true,
      });
      setStream(currentStream);
      if (myVideo.current) myVideo.current.srcObject = currentStream;

      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: currentStream,
      });

      peer.on("signal", (data) => {
        socket.emit("answerCall", { signal: data, to: caller });
      });

      peer.on("stream", (currentStream) => {
        if (userVideo.current) userVideo.current.srcObject = currentStream;
      });

      peer.signal(callerSignal);
      connectionRef.current = peer;
    } catch (err) {
      console.error("Error answering call", err);
    }
  };

  const leaveCall = (emitEnd = true) => {
    setCallEnded(true);
    setShowCallModal(false);
    if (emitEnd && caller) {
      socket.emit("endCall", { to: caller });
    } else if (emitEnd && selectedConversation) {
      socket.emit("endCall", { to: selectedConversation.employerId });
    }

    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    // Reload to clear simple-peer state fully or just reset
    window.location.reload();
  };

  // Placeholder for when no chat is selected (WhatsApp style)
  const WelcomePlaceholder = () => (
    <div
      className="d-flex flex-column justify-content-center align-items-center h-100 bg-light"
      style={{ borderLeft: "1px solid #d1d7db" }}
    >
      <div className="mb-4 text-center">
        <div
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
            margin: "0 auto",
          }}
        >
          <FaInbox size={60} color="#007bff" style={{ opacity: 0.8 }} />
        </div>
      </div>
      <h2 className="font-weight-light text-secondary mb-2">EdProfio Web</h2>
      <p
        className="text-muted text-center"
        style={{ maxWidth: "400px", fontSize: "14px" }}
      >
        Send and receive messages without keeping your phone online.
        <br />
        Use EdProfio on up to 4 linked devices and 1 phone at the same time.
      </p>
      <div className="mt-4 text-muted small d-flex align-items-center">
        <FaCog className="mr-2" /> End-to-end encrypted
      </div>
    </div>
  );

  // No Conversations Component
  const NoConversationsView = () => (
    <div className="jobplugin__settings-card" style={{ marginTop: "20px" }}>
      <div className="jobplugin__settings-card__body">
        <div
          className="d-flex flex-column justify-content-center align-items-center text-center"
          style={{ padding: "40px 20px" }}
        >
          <div className="mb-3">
            <FaComments size={48} className="text-muted" />
          </div>
          <h3 className="h5 mb-2" style={{ color: "#495057" }}>
            No conversations yet
          </h3>
          <p className="text-muted mb-4" style={{ fontSize: "14px" }}>
            Apply to jobs to start chatting with employers
          </p>
          <a
            href="/job-vacancies"
            className="jobplugin__button jobplugin__bg-primary hover:jobplugin__bg-secondary small"
          >
            Browse Jobs
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1; 
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #ccc; 
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #aaa; 
          }
          .chat-list-item {
             transition: background-color 0.2s ease;
             border-radius: 0; /* Full width feel */
             border-bottom: 1px solid #f1f1f1;
             margin: 0;
          }
          .chat-list-item:hover {
             background-color: #f8f9fa;
          }
          .chat-list-item.active {
             background-color: #e6f7ff; /* Brand primary light */
             border-left: 4px solid #007bff;
          }
          /* Ensure footer inputs look good */
          .chat-footer {
             background-color: #f0f2f5;
          }
        `}
      </style>
      {/* Call Modal */}
      {showCallModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.85)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "80%",
              height: "80%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* My Video */}
            {stream && (
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                style={{
                  position: "absolute",
                  bottom: "20px",
                  right: "20px",
                  width: "200px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                  border: "2px solid white",
                }}
              />
            )}
            {/* User Video */}
            {callAccepted && !callEnded ? (
              <video
                playsInline
                ref={userVideo}
                autoPlay
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: "10px",
                }}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  flexDirection: "column",
                }}
              >
                {receivingCall && !callAccepted ? (
                  <>
                    <h2>{name} is calling...</h2>
                    <div className="mt-4">
                      <button
                        className="btn btn-success btn-lg mr-3"
                        onClick={answerCall}
                      >
                        <FaPhone className="mr-2" /> Answer
                      </button>
                      <button
                        className="btn btn-danger btn-lg"
                        onClick={() => leaveCall(true)}
                      >
                        <FaPhoneSlash className="mr-2" /> Decline
                      </button>
                    </div>
                  </>
                ) : (
                  <h2>Calling...</h2>
                )}
              </div>
            )}
          </div>

          <div className="mt-4">
            <button
              className="btn btn-danger btn-lg rounded-circle"
              style={{
                width: 60,
                height: 60,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => leaveCall(true)}
            >
              <FaPhoneSlash size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Sub Visual of the page */}
      <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 text-white"></div>

      <main className="jobplugin__main">
        <div className="jobplugin__main-holder">
          <div className="jobplugin__container">
            <div className="jobplugin__settings">
              <a
                href="#"
                className="jobplugin__settings-opener jobplugin__text-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                onClick={(e) => {
                  e.preventDefault();
                  toggleSidebar();
                }}
              >
                <FaCog className="rj-icon rj-settings" />
              </a>

              <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

              <div className="jobplugin__settings-content">
                <h2 className="h5 text-secondary mb-20">
                  <FaComments /> Chat History
                </h2>

                {loading ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ minHeight: "50vh" }}
                  >
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading conversations...</span>
                    </div>
                  </div>
                ) : conversations.length === 0 ? (
                  <NoConversationsView />
                ) : (
                  <div
                    className="jobplugin__messenger shadow-sm m-0"
                    style={{
                      display: "flex",
                      height: "85vh", // Taller for better view
                      backgroundColor: "#fff",
                      overflow: "hidden",
                      border: "1px solid #d1d7db",
                      borderRadius: "8px",
                    }}
                  >
                    <aside
                      className="jobplugin__messenger-aside border-right"
                      style={{
                        width: "320px", // Slightly narrower standard width
                        display: "flex",
                        flexDirection: "column",
                        flexShrink: 0,
                        backgroundColor: "#fff",
                      }}
                    >
                      <div
                        className="d-flex flex-column border-bottom"
                        style={{
                          backgroundColor: "#f8f9fa",
                          padding: "20px",
                          flexShrink: 0,
                          position: "relative",
                          zIndex: 10,
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5
                            className="mb-0 font-weight-bold"
                            style={{ color: "#343a40", fontSize: "1.1rem" }}
                          >
                            Chats
                          </h5>
                          <span className="badge badge-primary rounded-pill">
                            {conversations.length}
                          </span>
                        </div>
                        <form
                          action="#"
                          onSubmit={(e) => e.preventDefault()}
                          style={{ margin: 0 }}
                        >
                          <div className="position-relative w-100">
                            <input
                              className="form-control"
                              style={{
                                padding: "10px 15px 10px 40px",
                                fontSize: "0.9rem",
                                backgroundColor: "#fff",
                                color: "#495057",
                                borderRadius: "8px",
                                border: "1px solid #ced4da",
                                height: "45px",
                                width: "100%",
                                boxShadow: "none",
                              }}
                              type="search"
                              placeholder="Search conversations..."
                            />
                            <FaComments
                              style={{
                                position: "absolute",
                                top: "50%",
                                left: "15px",
                                transform: "translateY(-50%)",
                                color: "#adb5bd",
                                pointerEvents: "none",
                              }}
                            />
                          </div>
                        </form>
                      </div>
                      <div
                        className="jobplugin__messenger-aside__scroller custom-scrollbar"
                        style={{
                          flex: 1,
                          overflowY: "auto",
                          paddingTop: "0",
                        }}
                      >
                        <ul className="list-unstyled mb-0">
                          {conversations.map((conversation) => (
                            <li
                              key={conversation._id}
                              className={`p-3 chat-list-item ${selectedConversation?._id === conversation._id ? "active" : ""}`}
                              onClick={() => {
                                setSelectedConversation(conversation);
                                setOpenMenuId(null);
                              }}
                              style={{
                                cursor: "pointer",
                                borderBottom: "1px solid #f0f0f0",
                                marginBottom: "0px",
                              }}
                            >
                              <div className="d-flex justify-content-between align-items-start w-100">
                                <div
                                  className="d-flex align-items-center"
                                  style={{ flex: 1, minWidth: 0 }}
                                >
                                  <div className="position-relative mr-3">
                                    <img
                                      src={
                                        conversationDetails[conversation._id]
                                          ?.employerProfilePic ||
                                        "images/img10.jpg"
                                      }
                                      alt="Employer"
                                      className="rounded-circle border"
                                      style={{
                                        width: "48px",
                                        height: "48px",
                                        objectFit: "cover",
                                      }}
                                    />
                                  </div>
                                  <div
                                    className="d-flex flex-column"
                                    style={{ minWidth: 0 }}
                                  >
                                    <strong
                                      className="text-truncate mb-1"
                                      style={{
                                        fontSize: "0.95rem",
                                        color: "#333",
                                        fontWeight: "600",
                                      }}
                                    >
                                      {conversationDetails[conversation._id]
                                        ?.employerName || "Employer"}
                                    </strong>

                                    <span
                                      className="text-muted small text-truncate"
                                      style={{ fontSize: "0.85rem" }}
                                    >
                                      {conversation.messages.length > 0
                                        ? conversation.messages[
                                            conversation.messages.length - 1
                                          ].message
                                        : "No messages yet"}
                                    </span>
                                  </div>
                                </div>

                                <div
                                  className="d-flex flex-column align-items-end ml-2"
                                  style={{ minWidth: "60px" }}
                                >
                                  {conversation.messages.length > 0 && (
                                    <span
                                      className="text-muted small mb-1"
                                      style={{ fontSize: "0.7rem" }}
                                    >
                                      {formatSidebarTime(
                                        conversation.messages[
                                          conversation.messages.length - 1
                                        ].createdAt,
                                      )}
                                    </span>
                                  )}
                                  {conversation.messages.length > 0 &&
                                    !conversation.messages[
                                      conversation.messages.length - 1
                                    ].isRead &&
                                    conversation.messages[
                                      conversation.messages.length - 1
                                    ].sender === "employer" && (
                                      <span
                                        className="badge badge-success rounded-circle p-1 mt-1"
                                        style={{
                                          width: "10px",
                                          height: "10px",
                                        }}
                                      ></span>
                                    )}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </aside>

                    <div
                      className="jobplugin__messenger-content w-100"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        minWidth: 0,
                      }}
                    >
                      {selectedConversation ? (
                        <>
                          <header
                            className="jobplugin__messenger-header d-flex justify-content-between align-items-center px-4 py-3 border-bottom bg-white shadow-sm"
                            style={{ zIndex: 10 }}
                          >
                            <div className="d-flex align-items-center">
                              <div className="mr-3 d-md-none ">
                                {" "}
                                {/* Back button for mobile if needed, hidden on desktop */}
                                <button
                                  className="btn btn-sm btn-light"
                                  onClick={() => setSelectedConversation(null)}
                                >
                                  ←
                                </button>
                              </div>
                              <img
                                src={
                                  conversationDetails[selectedConversation._id]
                                    ?.employerProfilePic || "images/img10.jpg"
                                }
                                alt="Employer"
                                className="rounded-circle mr-3 border"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  objectFit: "cover",
                                }}
                              />
                              <div className="d-flex flex-column">
                                <strong className="h6 mb-0 text-dark">
                                  {conversationDetails[selectedConversation._id]
                                    ?.employerName || "Employer"}
                                </strong>
                                <small className="text-secondary">
                                  {conversationDetails[selectedConversation._id]
                                    ?.jobTitle || "Job"}
                                </small>
                              </div>
                            </div>

                            <div className="jobplugin__messenger-header__right">
                              <ul className="jobplugin__messenger-header__buttons d-flex align-items-center list-unstyled mb-0">
                                <li className="mr-2">
                                  <button
                                    type="button"
                                    className="btn btn-light rounded-circle border d-flex align-items-center justify-content-center"
                                    style={{ width: "40px", height: "40px" }}
                                    onClick={() => callUser(false)}
                                  >
                                    <FaPhone
                                      size={16}
                                      className="text-secondary"
                                    />
                                  </button>
                                </li>
                                <li className="mr-0">
                                  <button
                                    type="button"
                                    className="btn btn-light rounded-circle border d-flex align-items-center justify-content-center"
                                    style={{ width: "40px", height: "40px" }}
                                    onClick={() => callUser(true)}
                                  >
                                    <FaVideo
                                      size={16}
                                      className="text-secondary"
                                    />
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </header>

                          <div
                            className="jobplugin__messenger-dialog__content bg-light"
                            style={{
                              flex: 1,
                              overflowY: "auto",
                              padding: "20px",
                            }}
                          >
                            {messagesLoading ? (
                              <div className="text-center p-20">
                                <div
                                  className="spinner-border spinner-border-sm text-primary"
                                  role="status"
                                ></div>{" "}
                                Loading...
                              </div>
                            ) : messages.length > 0 ? (
                              messages.map((message, index) => (
                                <div
                                  key={index}
                                  className={`d-flex mb-3 ${
                                    message.sender === "employee" ||
                                    message.sender === "You" ||
                                    message.isMe
                                      ? "justify-content-end"
                                      : "justify-content-start"
                                  }`}
                                >
                                  <div
                                    className={`d-flex ${
                                      message.sender === "employee" ||
                                      message.sender === "You" ||
                                      message.isMe
                                        ? "flex-row-reverse"
                                        : "flex-row"
                                    }`}
                                    style={{ maxWidth: "70%" }}
                                  >
                                    <div className="flex-shrink-0 mx-2">
                                      {/* Avatar suppressed for cleaner chat look, or optional */}
                                    </div>

                                    <div>
                                      <div
                                        className={`px-3 py-2 rounded shadow-sm position-relative ${
                                          message.sender === "employee" ||
                                          message.sender === "You" ||
                                          message.isMe
                                            ? "bg-primary text-white"
                                            : "bg-white text-dark"
                                        }`}
                                        style={{
                                          borderRadius: "12px",
                                          borderTopRightRadius:
                                            message.sender === "employee" ||
                                            message.sender === "You" ||
                                            message.isMe
                                              ? "0"
                                              : "12px",
                                          borderTopLeftRadius:
                                            message.sender === "employee" ||
                                            message.sender === "You" ||
                                            message.isMe
                                              ? "12px"
                                              : "0",
                                        }}
                                      >
                                        <div
                                          style={{
                                            wordBreak: "break-word",
                                            fontSize: "0.95rem",
                                            lineHeight: "1.4",
                                          }}
                                        >
                                          {message.message}
                                          {message.mediaType === "image" && (
                                            <div className="mt-2">
                                              <img
                                                src={message.mediaUrl}
                                                alt="Attachment"
                                                className="img-fluid rounded"
                                                style={{ maxHeight: "200px" }}
                                              />
                                            </div>
                                          )}
                                          {message.mediaType === "audio" && (
                                            <div className="mt-2">
                                              <audio
                                                controls
                                                src={message.mediaUrl}
                                                style={{ width: "200px" }}
                                              />
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                      <div
                                        className={`small text-muted mt-1 ${
                                          message.sender === "employee" ||
                                          message.sender === "You" ||
                                          message.isMe
                                            ? "text-right"
                                            : "text-left"
                                        }`}
                                        style={{ fontSize: "0.7rem" }}
                                      >
                                        {message.createdAt
                                          ? formatTime(message.createdAt)
                                          : formatTime(new Date())}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="text-center p-5 mt-5">
                                <div className="mb-3 text-muted opacity-50">
                                  <FaComments size={60} />
                                </div>
                                <h6 className="text-dark">No messages yet</h6>
                                <p className="text-muted small">
                                  Say hello to start the conversation!
                                </p>
                              </div>
                            )}
                            <div ref={messagesEndRef}></div>
                          </div>

                          <footer
                            className="jobplugin__messenger-footer border-top p-3 chat-footer"
                            style={{ flexShrink: 0 }}
                          >
                            <form
                              className="d-flex align-items-center w-100"
                              onSubmit={handleSendMessage}
                            >
                              <div className="mr-2">
                                <input
                                  type="file"
                                  ref={fileInputRef}
                                  onChange={handleFileChange}
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  id="file-upload"
                                />
                                <label
                                  htmlFor="file-upload"
                                  className="d-flex align-items-center justify-content-center mb-0 shadow-sm"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    minWidth: "40px" /* Prevent squishing */,
                                    cursor: "pointer",
                                    backgroundColor: "#fff",
                                    border: "1px solid #dee2e6",
                                    borderRadius: "50%",
                                    color: "#555",
                                    transition: "all 0.2s",
                                  }}
                                  title="Add Attachment"
                                >
                                  <FaPaperclip size={16} />
                                </label>
                              </div>

                              <div className="mr-2">
                                <button
                                  type="button"
                                  className={`d-flex align-items-center justify-content-center shadow-sm ${isRecording ? "bg-danger text-white border-danger" : "bg-white text-dark"}`}
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    minWidth: "40px",
                                    borderRadius: "50%",
                                    border: isRecording
                                      ? "none"
                                      : "1px solid #dee2e6",
                                    cursor: "pointer",
                                    color: isRecording ? "#fff" : "#555",
                                    padding: 0,
                                    outline: "none",
                                  }}
                                  onClick={toggleRecording}
                                  title={
                                    isRecording
                                      ? "Stop Recording"
                                      : "Record Voice"
                                  }
                                >
                                  <FaMicrophone size={16} />
                                </button>
                              </div>

                              {audioChunks.length > 0 && (
                                <div className="mr-2 d-flex">
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-success mr-1"
                                    onClick={playAudio}
                                  >
                                    Play
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={clearRecording}
                                  >
                                    Clear
                                  </button>
                                </div>
                              )}

                              <div className="flex-grow-1 mr-2">
                                <textarea
                                  rows="1"
                                  className="form-control rounded-pill px-3 py-2 border-0 shadow-sm"
                                  placeholder="Type a message..."
                                  value={newMessage}
                                  onChange={(e) =>
                                    setNewMessage(e.target.value)
                                  }
                                  style={{
                                    resize: "none",
                                    overflow: "hidden",
                                    minHeight: "40px",
                                    backgroundColor: "#fff",
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                      e.preventDefault();
                                      handleSendMessage(e);
                                    }
                                  }}
                                ></textarea>
                              </div>

                              <button
                                className="btn btn-primary rounded-pill px-3 py-1"
                                type="submit"
                                style={{
                                  fontSize: "0.9rem",
                                  minWidth: "80px",
                                  height: "40px",
                                }}
                                disabled={
                                  !newMessage.trim() &&
                                  audioChunks.length === 0 &&
                                  !fileInputRef.current?.files?.[0]
                                }
                              >
                                Send
                              </button>

                              <audio
                                ref={audioRef}
                                style={{ display: "none" }}
                              />
                            </form>
                          </footer>
                        </>
                      ) : (
                        <WelcomePlaceholder />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Inbox;
