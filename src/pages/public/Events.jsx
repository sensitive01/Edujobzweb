import React, { useState, useEffect } from "react";
import {
  FaCog,
  FaCheckCircle,
  FaChevronRight,
  FaArrowLeft,
  FaArrowRight,
  FaTimes,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUser,
  FaPhone,
} from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import Sidebar from "../../components/layout/Sidebar";
import {
  getAllEvents,
  getMyEvents,
  registerEventEmployee,
} from "../../api/services/projectServices";
import { Link } from "react-router-dom";

const Events = () => {
  const userDataString = localStorage.getItem("userData");
  if (!userDataString) {
    throw new Error("User data not found. Please login again.");
  }

  const userData = JSON.parse(userDataString);
  const participantId = userData._id;
  const participantMobile = userData?.userMobile;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [myEventsSubTab, setMyEventsSubTab] = useState("all");
  const [availableCategories, setAvailableCategories] = useState([]);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        const myEventsData = await getMyEvents(participantId);
        
        setEvents(data);
        setMyEvents(myEventsData);
        setFilteredEvents(data);

        const categories = [
          ...new Set(data.map((event) => event.category).filter(Boolean)),
        ];
        setAvailableCategories(categories);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, [participantId]);

  const getEventTiming = (eventDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const event = new Date(eventDate);
    event.setHours(0, 0, 0, 0);

    if (event < today) return "past";
    if (event.getTime() === today.getTime()) return "today";
    return "upcoming";
  };

  useEffect(() => {
    if (activeTab === "myevents") {
      let filtered = myEvents;
      
      if (myEventsSubTab === "past") {
        filtered = myEvents.filter(event => getEventTiming(event.eventDate) === "past");
      } else if (myEventsSubTab === "today") {
        filtered = myEvents.filter(event => getEventTiming(event.eventDate) === "today");
      } else if (myEventsSubTab === "upcoming") {
        filtered = myEvents.filter(event => getEventTiming(event.eventDate) === "upcoming");
      }
      
      setFilteredEvents(filtered);
    } else if (activeTab === "all") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) => event.category === activeTab);
      setFilteredEvents(filtered);
    }
  }, [events, myEvents, activeTab, myEventsSubTab]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "myevents") {
      setMyEventsSubTab("all");
    }
  };

  const handleApplyNow = (event) => {
    setSelectedEvent(event);
    setShowApplyModal(true);
    setMobileNumber(participantMobile || "");
    setSubmitSuccess(false);
  };

  const closeApplyModal = () => {
    setShowApplyModal(false);
    setSelectedEvent(null);
    setMobileNumber("");
    setSubmitSuccess(false);
  };

  const handleSubmitApplication = async () => {
    if (!mobileNumber.trim()) {
      alert("Please enter your mobile number");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    if (!selectedEvent?._id) {
      alert("Event information is missing. Please try again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await registerEventEmployee(
        participantId,
        mobileNumber,
        selectedEvent._id,
        "Registered"
      );

      setMessage(response.data.message);
      setSubmitSuccess(true);

      const myEventsData = await getMyEvents(participantId);
      setMyEvents(myEventsData);

      setTimeout(() => {
        closeApplyModal();
      }, 2000);
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "TBD";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const myEventsCounts = {
    all: myEvents.length,
    past: myEvents.filter(e => getEventTiming(e.eventDate) === "past").length,
    today: myEvents.filter(e => getEventTiming(e.eventDate) === "today").length,
    upcoming: myEvents.filter(e => getEventTiming(e.eventDate) === "upcoming").length,
  };

  const tabs = [
    { id: "all", label: "All Events", count: events.length },
    { id: "myevents", label: "My Events", count: myEvents.length },
    ...availableCategories.map((category) => ({
      id: category,
      label: category,
      count: events.filter((event) => event.category === category).length,
    })),
  ];

  if (loading) {
    return (
      <div
        className="jobplugin__main"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "18px", color: "#666" }}>
            Loading events...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="jobplugin__main"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ textAlign: "center", color: "#e74c3c" }}>
          <div style={{ fontSize: "18px" }}>Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 text-white"></div>

      <main
        className="jobplugin__main"
        style={{
          paddingLeft: isSidebarOpen ? "300px" : "0",
          transition: "padding-left 0.3s ease",
          minHeight: "100vh",
        }}
      >
        <div
          className="jobplugin__main-holder"
          style={{ padding: "20px", paddingTop: "60px" }}
        >
          <div
            className="jobplugin__container"
            style={{ maxWidth: "1400px", margin: "0 auto" }}
          >
            <div className="jobplugin__settings">
              <a
                href="#"
                className="jobplugin__settings-opener jobplugin__text-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                onClick={(e) => {
                  e.preventDefault();
                  toggleSidebar();
                }}
                style={{
                  position: "fixed",
                  top: "20px",
                  left: "20px",
                  zIndex: 1001,
                  padding: "12px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  backgroundColor: "white",
                  border: "1px solid #e0e0e0",
                }}
              >
                <FaCog className="rj-icon rj-settings" />
              </a>

              {isSidebarOpen && (
                <div
                  className="sidebar-overlay"
                  onClick={closeSidebar}
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    zIndex: 999,
                  }}
                />
              )}

              <div
                style={{
                  position: "relative",
                  zIndex: 1002,
                  marginRight: "28px",
                }}
              >
                <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
              </div>

              <div
                className="jobplugin__settings-content"
                style={{ padding: "0px" }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                    border: "1px solid #f0f0f0",
                    marginBottom: "15px",
                  }}
                >
                  <div className="jobplugin__tabset-normal">
                    <ul
                      data-tabset="tabset"
                      style={{
                        display: "flex",
                        gap: "30px",
                        margin: "0",
                        padding: "20px 20px 0 20px",
                        listStyle: "none",
                        borderBottom: "2px solid #f5f5f5",
                        paddingBottom: "15px",
                        flexWrap: "wrap",
                      }}
                    >
                      {tabs.map((tab) => (
                        <li
                          key={tab.id}
                          className={activeTab === tab.id ? "active" : ""}
                        >
                          <a
                            className="hover:jobplugin__text-primary hover:jobplugin__border-primary"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleTabClick(tab.id);
                            }}
                            style={{
                              padding: "8px 0",
                              textDecoration: "none",
                              fontWeight: activeTab === tab.id ? "600" : "500",
                              fontSize: "16px",
                              color: activeTab === tab.id ? "#2c5aa0" : "#666",
                              borderBottom:
                                activeTab === tab.id
                                  ? "2px solid #2c5aa0"
                                  : "2px solid transparent",
                              transition: "all 0.3s ease",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            {tab.label}
                            <span
                              style={{
                                backgroundColor:
                                  activeTab === tab.id ? "#2c5aa0" : "#e0e0e0",
                                color: activeTab === tab.id ? "white" : "#666",
                                borderRadius: "12px",
                                padding: "2px 8px",
                                fontSize: "12px",
                                fontWeight: "600",
                                minWidth: "20px",
                                textAlign: "center",
                              }}
                            >
                              {tab.count}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {activeTab === "myevents" && (
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "12px",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                      border: "1px solid #f0f0f0",
                      marginBottom: "15px",
                      padding: "15px 20px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                      {[
                        { id: "all", label: "All", count: myEventsCounts.all },
                        { id: "past", label: "Past", count: myEventsCounts.past },
                        { id: "today", label: "Today", count: myEventsCounts.today },
                        { id: "upcoming", label: "Upcoming", count: myEventsCounts.upcoming },
                      ].map((subTab) => (
                        <button
                          key={subTab.id}
                          onClick={() => setMyEventsSubTab(subTab.id)}
                          style={{
                            padding: "8px 16px",
                            borderRadius: "8px",
                            border: "none",
                            backgroundColor:
                              myEventsSubTab === subTab.id ? "#2c5aa0" : "#f5f5f5",
                            color: myEventsSubTab === subTab.id ? "white" : "#666",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          {subTab.label}
                          <span
                            style={{
                              backgroundColor:
                                myEventsSubTab === subTab.id ? "rgba(255,255,255,0.2)" : "#ddd",
                              padding: "2px 6px",
                              borderRadius: "10px",
                              fontSize: "12px",
                            }}
                          >
                            {subTab.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {filteredEvents.length > 0 ? (
                  <div
                    style={{
                      display: "grid",
                      gap: "20px",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(500px, 1fr))",
                      padding: "0",
                    }}
                  >
                    {filteredEvents.map((event) => (
                      <div
                        key={event._id}
                        style={{
                          backgroundColor: "white",
                          borderRadius: "12px",
                          border: "1px solid #e8e8e8",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                          overflow: "hidden",
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow =
                            "0 8px 25px rgba(0,0,0,0.12)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow =
                            "0 2px 8px rgba(0,0,0,0.06)";
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            padding: "20px",
                            gap: "20px",
                            alignItems: "flex-start",
                          }}
                        >
                          <div
                            style={{
                              flexShrink: 0,
                              width: "120px",
                              height: "120px",
                              borderRadius: "10px",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={event.bannerImage}
                              alt={event.title}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>

                          <div
                            style={{
                              flex: 1,
                              display: "flex",
                              flexDirection: "column",
                              gap: "12px",
                            }}
                          >
                            <h3
                              style={{
                                fontSize: "18px",
                                fontWeight: "600",
                                color: "#333",
                                margin: "0",
                                lineHeight: "1.3",
                              }}
                            >
                              {event.title}
                            </h3>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "6px",
                                fontSize: "14px",
                                color: "#666",
                              }}
                            >
                              <p
                                style={{
                                  margin: "0",
                                  lineHeight: "1.4",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                }}
                              >
                                {event.description}
                              </p>

                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "6px",
                                  marginTop: "4px",
                                }}
                              >
                                <IoLocationOutline
                                  style={{ fontSize: "16px", color: "#888" }}
                                />
                                <span>{event.venue}</span>
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  gap: "20px",
                                  marginTop: "2px",
                                }}
                              >
                                <span>
                                  <strong>Date:</strong>{" "}
                                  {formatDate(event.eventDate)}
                                </span>
                                <span>
                                  <strong>Time:</strong> {event.startTime} -{" "}
                                  {event.endTime}
                                </span>
                              </div>

                              {activeTab === "myevents" && event.myRegistration && (
                                <div style={{ marginTop: "4px" }}>
                                  <span
                                    style={{
                                      display: "inline-block",
                                      padding: "4px 12px",
                                      borderRadius: "6px",
                                      fontSize: "13px",
                                      fontWeight: "600",
                                      backgroundColor:
                                        event.myRegistration.status === "Pending"
                                          ? "#fff3cd"
                                          : "#d4edda",
                                      color:
                                        event.myRegistration.status === "Pending"
                                          ? "#856404"
                                          : "#155724",
                                    }}
                                  >
                                    Status: {event.myRegistration.status}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                marginTop: "8px",
                              }}
                            >
                              {activeTab !== "myevents" && (
                                <button
                                  onClick={() => handleApplyNow(event)}
                                  style={{
                                    padding: "8px 16px",
                                    borderRadius: "6px",
                                    fontWeight: "500",
                                    fontSize: "14px",
                                    backgroundColor: "#2c5aa0",
                                    color: "white",
                                    border: "none",
                                    transition: "all 0.3s ease",
                                    cursor: "pointer",
                                  }}
                                >
                                  Apply Now
                                </button>
                              )}
                              <Link
                                to={`/events-details/${event._id}`}
                                style={{
                                  padding: "8px 16px",
                                  borderRadius: "6px",
                                  textDecoration: "none",
                                  fontWeight: "500",
                                  fontSize: "14px",
                                  backgroundColor: "white",
                                  color: "#2c5aa0",
                                  border: "2px solid #2c5aa0",
                                  transition: "all 0.3s ease",
                                  textAlign: "center",
                                }}
                              >
                                Learn More
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "12px",
                      border: "1px solid #e8e8e8",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      padding: "60px 40px",
                      textAlign: "center",
                      marginTop: "20px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "48px",
                        color: "#ddd",
                        marginBottom: "20px",
                      }}
                    >
                      📅
                    </div>
                    <h3
                      style={{
                        fontSize: "20px",
                        color: "#666",
                        marginBottom: "10px",
                      }}
                    >
                      No Events Found
                    </h3>
                    <p style={{ fontSize: "16px", color: "#999", margin: "0" }}>
                      {activeTab === "myevents"
                        ? `No ${myEventsSubTab === "all" ? "" : myEventsSubTab} events in your registrations.`
                        : activeTab === "all"
                        ? "No events are currently available."
                        : `No events found in "${activeTab}" category.`}
                    </p>
                  </div>
                )}

                {showApplyModal && selectedEvent && (
                  <div
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0,0,0,0.6)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 2000,
                    }}
                    onClick={closeApplyModal}
                  >
                    <div
                      style={{
                        backgroundColor: "white",
                        borderRadius: "16px",
                        padding: "0",
                        maxWidth: "600px",
                        width: "90%",
                        maxHeight: "90vh",
                        overflow: "auto",
                        position: "relative",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div
                        style={{
                          padding: "24px 30px",
                          borderBottom: "1px solid #f0f0f0",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor: "#f8f9fa",
                          borderRadius: "16px 16px 0 0",
                        }}
                      >
                        <h3
                          style={{
                            margin: "0",
                            fontSize: "20px",
                            fontWeight: "600",
                            color: "#333",
                          }}
                        >
                          Apply for Event
                        </h3>
                        <button
                          onClick={closeApplyModal}
                          style={{
                            background: "none",
                            border: "none",
                            fontSize: "20px",
                            cursor: "pointer",
                            color: "#666",
                            padding: "4px",
                            borderRadius: "50%",
                            width: "32px",
                            height: "32px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <FaTimes />
                        </button>
                      </div>

                      {submitSuccess ? (
                        <div
                          style={{ padding: "40px 30px", textAlign: "center" }}
                        >
                          <FaCheckCircle
                            style={{
                              fontSize: "48px",
                              color: "#28a745",
                              marginBottom: "20px",
                            }}
                          />
                          <h3
                            style={{
                              fontSize: "20px",
                              color: "#28a745",
                              marginBottom: "10px",
                            }}
                          >
                            {message}
                          </h3>
                          <p style={{ fontSize: "16px", color: "#666" }}>
                            You will receive a confirmation email shortly.
                          </p>
                        </div>
                      ) : (
                        <div style={{ padding: "30px" }}>
                          <div
                            style={{
                              display: "flex",
                              gap: "20px",
                              marginBottom: "24px",
                            }}
                          >
                            <img
                              src={selectedEvent.bannerImage}
                              alt={selectedEvent.title}
                              style={{
                                width: "100px",
                                height: "100px",
                                borderRadius: "10px",
                                objectFit: "cover",
                                flexShrink: 0,
                              }}
                            />
                            <div style={{ flex: 1 }}>
                              <h4
                                style={{
                                  fontSize: "18px",
                                  fontWeight: "600",
                                  color: "#333",
                                  marginBottom: "8px",
                                }}
                              >
                                {selectedEvent.title}
                              </h4>
                              <p
                                style={{
                                  fontSize: "14px",
                                  color: "#666",
                                  margin: "0",
                                  lineHeight: "1.4",
                                }}
                              >
                                {selectedEvent.description?.length > 100
                                  ? selectedEvent.description.substring(0, 100) +
                                    "..."
                                  : selectedEvent.description}
                              </p>
                            </div>
                          </div>

                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr",
                              gap: "16px",
                              marginBottom: "24px",
                              padding: "20px",
                              backgroundColor: "#f8f9fa",
                              borderRadius: "10px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            >
                              <FaCalendarAlt
                                style={{ color: "#2c5aa0", fontSize: "16px" }}
                              />
                              <div>
                                <div
                                  style={{
                                    fontSize: "12px",
                                    color: "#888",
                                    fontWeight: "500",
                                  }}
                                >
                                  Date
                                </div>
                                <div
                                  style={{
                                    fontSize: "14px",
                                    color: "#333",
                                    fontWeight: "600",
                                  }}
                                >
                                  {formatDate(selectedEvent.eventDate)}
                                </div>
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            >
                              <FaClock
                                style={{ color: "#2c5aa0", fontSize: "16px" }}
                              />
                              <div>
                                <div
                                  style={{
                                    fontSize: "12px",
                                    color: "#888",
                                    fontWeight: "500",
                                  }}
                                >
                                  Time
                                </div>
                                <div
                                  style={{
                                    fontSize: "14px",
                                    color: "#333",
                                    fontWeight: "600",
                                  }}
                                >
                                  {selectedEvent.startTime} -{" "}
                                  {selectedEvent.endTime}
                                </div>
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            >
                              <FaMapMarkerAlt
                                style={{ color: "#2c5aa0", fontSize: "16px" }}
                              />
                              <div>
                                <div
                                  style={{
                                    fontSize: "12px",
                                    color: "#888",
                                    fontWeight: "500",
                                  }}
                                >
                                  Venue
                                </div>
                                <div
                                  style={{
                                    fontSize: "14px",
                                    color: "#333",
                                    fontWeight: "600",
                                  }}
                                >
                                  {selectedEvent.venue}
                                </div>
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            >
                              <FaUser
                                style={{ color: "#2c5aa0", fontSize: "16px" }}
                              />
                              <div>
                                <div
                                  style={{
                                    fontSize: "12px",
                                    color: "#888",
                                    fontWeight: "500",
                                  }}
                                >
                                  Entry Fee
                                </div>
                                <div
                                  style={{
                                    fontSize: "14px",
                                    color: "#333",
                                    fontWeight: "600",
                                  }}
                                >
                                  ₹{selectedEvent.entryfee || "Free"}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div style={{ marginBottom: "24px" }}>
                            <label
                              style={{
                                display: "block",
                                fontSize: "14px",
                                fontWeight: "600",
                                color: "#333",
                                marginBottom: "8px",
                              }}
                            >
                              <FaPhone
                                style={{
                                  marginRight: "8px",
                                  color: "#2c5aa0",
                                }}
                              />
                              Mobile Number *
                            </label>
                            <input
                              type="tel"
                              value={mobileNumber}
                              onChange={(e) => setMobileNumber(e.target.value)}
                              placeholder="Enter your 10-digit mobile number"
                              style={{
                                width: "100%",
                                padding: "12px 16px",
                                border: "2px solid #e0e0e0",
                                borderRadius: "8px",
                                fontSize: "16px",
                                transition: "border-color 0.3s ease",
                                outline: "none",
                                boxSizing: "border-box",
                              }}
                              onFocus={(e) =>
                                (e.target.style.borderColor = "#2c5aa0")
                              }
                              onBlur={(e) =>
                                (e.target.style.borderColor = "#e0e0e0")
                              }
                            />
                          </div>

                          <div
                            style={{
                              display: "flex",
                              gap: "12px",
                              justifyContent: "flex-end",
                            }}
                          >
                            <button
                              onClick={closeApplyModal}
                              style={{
                                padding: "12px 24px",
                                borderRadius: "8px",
                                border: "2px solid #ddd",
                                backgroundColor: "white",
                                color: "#666",
                                fontSize: "16px",
                                fontWeight: "500",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                              }}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleSubmitApplication}
                              disabled={isSubmitting}
                              style={{
                                padding: "12px 24px",
                                borderRadius: "8px",
                                border: "none",
                                backgroundColor: isSubmitting ? "#ccc" : "#2c5aa0",
                                color: "white",
                                fontSize: "16px",
                                fontWeight: "600",
                                cursor: isSubmitting ? "not-allowed" : "pointer",
                                transition: "all 0.3s ease",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            >
                              {isSubmitting ? "Submitting..." : "Confirm Application"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @media (max-width: 768px) {
          .jobplugin__main {
            padding-left: 0 !important;
          }

          .jobplugin__settings-content > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }

          .jobplugin__tabset-normal ul {
            flex-wrap: wrap !important;
            gap: 15px !important;
            padding: 15px 15px 0 15px !important;
          }

          .jobplugin__settings-content > div:nth-child(2) > div > div:first-child {
            flex-direction: column !important;
            align-items: center !important;
          }

          .jobplugin__settings-content
            > div:nth-child(2)
            > div
            > div:first-child
            > div:first-child {
            width: 100% !important;
            height: 160px !important;
            margin-bottom: 15px !important;
          }

          .modal-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 480px) {
          .jobplugin__settings-content > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
};

export default Events;