import React, { useState, useRef, useEffect } from "react";
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
  FaHome,
  FaBriefcase,
  FaUsers,
  FaEnvelope,
  FaSignOutAlt,
  FaBars,
  FaGraduationCap,
  FaCertificate,
  FaBook,
  FaPlay,
  FaStar,
  FaHeart,
  FaShare,
  FaDownload,
} from "react-icons/fa";
import Sidebar from "../../components/layout/Sidebar"; // Your existing sidebar component

// Import all images (keeping your original imports)
import event1 from "../../../public/images/event1.jpg";
import roboImage from "../../../public/images/robo.avif";
import edujobzImage from "../../../public/images/edujobz.avif";
import certificateImage from "../../../public/images/certificate.avif";
import errorImage from "../../../public/images/404.avif";
import avatar1 from "../../../public/images/img-avatar-01.png";
import avatar2 from "../../../public/images/img-avatar-02.png";
import avatar3 from "../../../public/images/img-avatar-03.png";
import userImage from "../../../public/images/img-user01.png";
import { FaMessage } from "react-icons/fa6";

const CertificatesTrainings = () => {
  // Get user data (replace with your auth method if different)
  const userDataString =
    typeof window !== "undefined" ? localStorage.getItem("userData") : null;
  const userData = userDataString
    ? JSON.parse(userDataString)
    : { _id: "guest", name: "Guest User" };

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State for training data from API (keeping your original structure)
  const [trainings, setTrainings] = useState([]);
  const [filteredTrainings, setFilteredTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTraining, setSelectedTraining] = useState(null);

  // Tab state for filtering
  const [activeTab, setActiveTab] = useState("all");
  const [availableCategories, setAvailableCategories] = useState([]);

  // State for slider functionality (keeping your original structure)
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const sliderRef = useRef(null);

  // State for gallery slider (keeping your original structure)
  const [currentGallerySlide, setCurrentGallerySlide] = useState(0);
  const galleryImages = [event1, event1, event1, event1];

  // State for service tier accordions (keeping your original structure)
  const [activeTier, setActiveTier] = useState(null);

  // Fetch training data from API (keeping your original API call)
  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await fetch(
          "https://api.edprofio.com/employer/fetchtraining"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch trainings");
        }
        const data = await response.json();
        setTrainings(data);
        setFilteredTrainings(data);

        // Extract unique categories from trainings
        const categories = [
          ...new Set(data.map((training) => training.category).filter(Boolean)),
        ];
        setAvailableCategories(categories);

        if (data.length > 0) {
          setSelectedTraining(data[0]);
          setActiveTier(
            data[0].paymentStatus === "paid"
              ? `Premium - $${data[0].paidAmount}`
              : "Free Tier"
          );
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTrainings();
  }, []);

  // Filter trainings based on active tab
  useEffect(() => {
    if (activeTab === "all") {
      setFilteredTrainings(trainings);
    } else {
      const filtered = trainings.filter(
        (training) => training.category === activeTab
      );
      setFilteredTrainings(filtered);
    }
  }, [trainings, activeTab]);

  // Keyboard navigation for sidebar
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSidebarOpen]);

  // Sidebar functions
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Tab handling
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Generate slider items from training data (keeping your original logic)
  const sliderItems = trainings.map((training, index) => ({
    id: training._id,
    image: [roboImage, edujobzImage, certificateImage, errorImage][index % 4],
    title: training.title,
    description: training.description,
    duration: `${training.subCategories?.length || 0} Modules`,
    price:
      training.paymentStatus === "paid" ? `$${training.paidAmount}` : "Free",
    avatar: [avatar1, avatar2, avatar3][index % 3],
    name: "EdProfio Instructor",
    rating:
      "4." + ((index % 5) + 1) + ` (${training.enrollerList?.length || 0})`,
    trainingData: training,
  }));

  // Infinite loop carousel logic (keeping your original logic)
  const itemsPerSlide = 4;
  const totalSlides = Math.max(
    5,
    Math.ceil(sliderItems.length / itemsPerSlide)
  );
  const totalItems = sliderItems.length;

  // Auto-play carousel (keeping your original logic)
  useEffect(() => {
    if (!autoPlay || totalItems === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [autoPlay, totalSlides, totalItems]);

  // Handle slider navigation (keeping your original logic)
  const goToSlide = (index) => {
    setCurrentSlide(index);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 5000);
  };

  // Get items for current slide with infinite loop (keeping your original logic)
  const getCurrentSlideItems = () => {
    if (totalItems === 0) return [];

    let items = [];
    for (let i = 0; i < itemsPerSlide; i++) {
      const itemIndex = (currentSlide * itemsPerSlide + i) % totalItems;
      items.push(sliderItems[itemIndex]);
    }
    return items;
  };

  // Handle training selection (keeping your original logic)
  const selectTraining = (training) => {
    if (!training?.trainingData) return;

    setSelectedTraining(training.trainingData);
    setActiveTier(
      training.trainingData.paymentStatus === "paid"
        ? `Premium - $${training.trainingData.paidAmount}`
        : "Free Tier"
    );
    setCurrentGallerySlide(0);
  };

  // Handle gallery navigation (keeping your original logic)
  const goToGallerySlide = (index) => {
    setCurrentGallerySlide(index);
  };

  // Toggle service tier accordion (keeping your original logic)
  const toggleTier = (tier) => {
    setActiveTier(activeTier === tier ? null : tier);
  };

  // Generate pricing tiers based on training data (keeping your original logic)
  const generatePricingTiers = (training) => {
    if (!training) return [];

    if (training.paymentStatus === "Free") {
      return [
        {
          name: "Free Tier",
          price: "Free",
          duration: "Lifetime access",
          features: [
            "Full course access",
            `${training.subCategories?.length || 0} modules`,
            "Community support",
            "Email assistance",
            "Basic certificate",
          ],
        },
      ];
    } else {
      return [
        {
          name: "Basic",
          price: `$${Math.floor(parseInt(training.paidAmount || 0) * 0.5)}`,
          duration: "3 months access",
          features: [
            "Full course access",
            `${training.subCategories?.length || 0} modules`,
            "Community support",
            "Email assistance",
          ],
        },
        {
          name: "Standard",
          price: `$${training.paidAmount || 0}`,
          duration: "6 months access",
          features: [
            "Full course access",
            `${training.subCategories?.length || 0} modules`,
            "Priority support",
            "Practice exercises",
            "Basic certificate",
          ],
        },
        {
          name: "Premium",
          price: `$${Math.floor(parseInt(training.paidAmount || 0) * 1.5)}`,
          duration: "Lifetime access",
          features: [
            "Full course access",
            `${training.subCategories?.length || 0} modules`,
            "Priority support",
            "Practice exercises",
            "Premium certificate",
            "1-on-1 mentoring session",
            "Course materials download",
          ],
        },
      ];
    }
  };

  // Dynamic tabs based on available categories
  const tabs = [
    { id: "all", label: "All Trainings", count: trainings.length },
    ...availableCategories.map((category) => ({
      id: category,
      label: category,
      count: trainings.filter((training) => training.category === category)
        .length,
    })),
  ];

  // Loading and error states
  if (loading) {
    return (
      <div
        className="certificates-trainings-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "18px", color: "#666" }}>
            Loading trainings...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="certificates-trainings-container"
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

  if (trainings.length === 0 || !selectedTraining) {
    return (
      <div className="certificates-trainings-container">
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            border: "1px solid #e8e8e8",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            padding: "60px 40px",
            textAlign: "center",
            margin: "20px",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              color: "#ddd",
              marginBottom: "20px",
            }}
          >
            <FaGraduationCap />
          </div>
          <h3
            style={{
              fontSize: "20px",
              color: "#666",
              marginBottom: "10px",
            }}
          >
            No Trainings Found
          </h3>
          <p style={{ fontSize: "16px", color: "#999", margin: "0" }}>
            No training courses are currently available.
          </p>
        </div>
      </div>
    );
  }

  const pricingTiers = generatePricingTiers(selectedTraining);
  const enrollmentCount = selectedTraining.enrollerList?.length || 0;
  const lastUpdated = new Date(selectedTraining.updatedAt).toLocaleDateString();

  return (
    <>
      {/* Sub Visual of the page */}
      <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 text-white"></div>

      {/* Main content with dashboard-style layout */}
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
              {/* Fixed Settings Button */}
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

              {/* Sidebar Overlay */}
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

              {/* Main Content Area */}
              <div
                className="jobplugin__settings-content"
                style={{ padding: "0px" }}
              >
                {/* Tab Navigation - Dashboard Style */}
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

                {/* Carousel Section */}
                <section
                  className="jobplugin__section jobplugin__section-white jobplugin__section-trending"
                  style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                    border: "1px solid #f0f0f0",
                    marginBottom: "20px",
                    padding: "20px",
                  }}
                >
                  <div className="jobplugin__container">
                    <div
                      className="jobplugin__slider-container"
                      style={{ overflow: "hidden", position: "relative" }}
                    >
                      {/* Slider Grid */}
                      {filteredTrainings.length > 0 ? (
                        <>
                          <div
                            className="jobplugin__slider-grid"
                            style={{
                              display: "grid",
                              gridTemplateColumns:
                                "repeat(auto-fit, minmax(280px, 1fr))",
                              gap: "20px",
                              padding: "20px 0",
                              transition: "transform 0.5s ease",
                            }}
                            ref={sliderRef}
                          >
                            {getCurrentSlideItems().map((item, index) => (
                              <div
                                key={`${item.id}-${currentSlide}-${index}`}
                                className="jobplugin__slider-slide"
                                onClick={() => selectTraining(item)}
                                style={{
                                  cursor: "pointer",
                                  transition: "transform 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform =
                                    "translateY(-4px)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform =
                                    "translateY(0)";
                                }}
                              >
                                <article className="jobplugin__article-box bg-light">
                                  <div className="jobplugin__article-image border-dark shadow">
                                    <img
                                      src={item.image}
                                      alt={item.title}
                                      style={{
                                        width: "100%",
                                        height: "200px",
                                        objectFit: "cover",
                                      }}
                                    />
                                  </div>
                                  <div
                                    className="jobplugin__article-textbox"
                                    style={{ padding: "15px" }}
                                  >
                                    <strong className="jobplugin__article-title hover:jobplugin__text-primary">
                                      {item.title}
                                    </strong>
                                    <div
                                      className="jobplugin__article-duration"
                                      style={{ margin: "8px 0" }}
                                    >
                                      <span className="jobplugin__article-duration__icon jobplugin__text-primary rj-icon rj-clock"></span>
                                      <span className="jobplugin__article-duration__text">
                                        {item.duration}
                                      </span>
                                    </div>
                                    <strong className="jobplugin__article-pricing">
                                      From{" "}
                                      <span className="jobplugin__article-pricing__text">
                                        {item.price}
                                      </span>
                                    </strong>
                                  </div>
                                  <div
                                    className="jobplugin__article-foot bg-white"
                                    style={{
                                      padding: "15px",
                                      borderTop: "1px solid #f0f0f0",
                                    }}
                                  >
                                    <div className="jobplugin__article-userinfo hover:jobplugin__text-primary">
                                      <div className="jobplugin__article-useravatar">
                                        <img
                                          src={item.avatar}
                                          alt={item.name}
                                          style={{
                                            width: "32px",
                                            height: "32px",
                                            borderRadius: "50%",
                                          }}
                                        />
                                      </div>
                                      <div className="jobplugin__article-subtext">
                                        <strong className="jobplugin__article-username">
                                          {item.name}
                                        </strong>
                                      </div>
                                    </div>
                                    <span
                                      className="jobplugin__section-box__ratings jobplugin__bg-primary"
                                      style={{
                                        padding: "4px 8px",
                                        borderRadius: "4px",
                                        color: "white",
                                        fontSize: "12px",
                                      }}
                                    >
                                      <FaStar style={{ marginRight: "4px" }} />
                                      <span className="jobplugin__section-box__ratings-points">
                                        {item.rating}
                                      </span>
                                    </span>
                                  </div>
                                </article>
                              </div>
                            ))}
                          </div>

                          {/* Navigation dots */}
                          <div
                            style={{
                              textAlign: "center",
                              marginTop: "20px",
                              display: "flex",
                              justifyContent: "center",
                              gap: "8px",
                            }}
                          >
                            {Array.from({ length: totalSlides }, (_, index) => (
                              <div
                                key={index}
                                onClick={() => goToSlide(index)}
                                style={{
                                  width: "40px",
                                  height: "4px",
                                  backgroundColor:
                                    currentSlide === index ? "#007bff" : "#ccc",
                                  cursor: "pointer",
                                  transition: "background-color 0.3s ease",
                                }}
                              ></div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div
                          style={{
                            textAlign: "center",
                            padding: "40px",
                            color: "#666",
                          }}
                        >
                          <FaGraduationCap
                            style={{
                              fontSize: "48px",
                              marginBottom: "16px",
                              color: "#ddd",
                            }}
                          />
                          <h3>No Training Courses Found</h3>
                          <p>
                            {activeTab === "all"
                              ? "No training courses are currently available."
                              : `No courses found in "${activeTab}" category.`}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                {/* Training Details Section */}
                {selectedTraining && (
                  <div
                    className="jobplugin__main-holder"
                    style={{
                      backgroundColor: "white",
                      borderRadius: "12px",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                      border: "1px solid #f0f0f0",
                      padding: "30px",
                    }}
                  >
                    <div className="jobplugin__container">
                      <div className="jobplugin__main-head">
                        <ul className="jobplugin__breadcrumbs">
                          <li className="jobplugin__breadcrumbs-home">
                            <a
                              className="hover:jobplugin__text-primary"
                              href="#"
                            >
                              <FaHome className="text-secondary" />
                            </a>
                          </li>
                          <li>
                            <a
                              className="hover:jobplugin__text-primary"
                              href="#"
                            >
                              Online
                            </a>
                          </li>
                          <li>{selectedTraining.title}</li>
                        </ul>
                        <ul className="jobplugin__shares">
                          <li>
                            <a
                              className="hover:jobplugin__bg-primary hover:jobplugin__border-primary"
                              href="#"
                              style={{
                                padding: "8px 12px",
                                borderRadius: "6px",
                                border: "1px solid #e0e0e0",
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                              }}
                            >
                              <FaHeart className="jobplugin__shares-icon" />
                              <span className="jobplugin__shares-text">
                                Save
                              </span>
                            </a>
                          </li>
                          <li>
                            <a
                              className="hover:jobplugin__bg-primary hover:jobplugin__border-primary"
                              href="#"
                              style={{
                                padding: "8px 12px",
                                borderRadius: "6px",
                                border: "1px solid #e0e0e0",
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                              }}
                            >
                              <FaShare className="jobplugin__shares-icon" />
                              <span className="jobplugin__shares-text">
                                Share
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <hr />

                      <div
                        className="jobplugin__catalog"
                        style={{
                          display: "flex",
                          gap: "30px",
                          alignItems: "flex-start",
                        }}
                      >
                        <div
                          className="jobplugin__catalog-content"
                          style={{ flex: "2" }}
                        >
                          <h1 className="h4 text-secondary">
                            {selectedTraining.title}
                          </h1>
                          <div
                            className="jobplugin__catalog-head"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "15px",
                              marginBottom: "20px",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              className="jobplugin__catalog-admin"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            >
                              <div className="jobplugin__catalog-admin__img">
                                <img
                                  src={userImage}
                                  alt="Training Instructor"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                  }}
                                />
                              </div>
                              <strong className="jobplugin__catalog-admin__name">
                                EdProfio Instructor
                              </strong>
                            </div>
                            <span
                              className="jobplugin__section-box__ratings jobplugin__bg-primary"
                              style={{
                                padding: "6px 12px",
                                borderRadius: "6px",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <FaStar />
                              <span className="jobplugin__section-box__ratings-points">
                                4.8 ({enrollmentCount} Reviews)
                              </span>
                            </span>
                            <span
                              className="jobplugin__article-toprated"
                              style={{
                                padding: "4px 8px",
                                backgroundColor: "#28a745",
                                color: "white",
                                borderRadius: "4px",
                                fontSize: "12px",
                              }}
                            >
                              Top Rated
                            </span>
                            <span
                              className="jobplugin__catalog-inprogress"
                              style={{
                                padding: "4px 8px",
                                backgroundColor: "#17a2b8",
                                color: "white",
                                borderRadius: "4px",
                                fontSize: "12px",
                              }}
                            >
                              {enrollmentCount}{" "}
                              {enrollmentCount === 1
                                ? "enrollment"
                                : "enrollments"}
                            </span>
                          </div>

                          {/* Image Gallery */}
                          <div
                            className="jobplugin__catalog-projects"
                            style={{ marginBottom: "30px" }}
                          >
                            <div className="jobplugin__catalog-gallery">
                              <div className="gallery-main-slide">
                                <img
                                  src={galleryImages[currentGallerySlide]}
                                  alt="Course preview"
                                  style={{
                                    width: "100%",
                                    height: "300px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                  }}
                                />
                              </div>
                            </div>
                            <div
                              className="gallery-thumbnails"
                              style={{
                                display: "flex",
                                marginTop: "10px",
                                gap: "8px",
                              }}
                            >
                              {galleryImages.map((img, index) => (
                                <div
                                  key={index}
                                  onClick={() => goToGallerySlide(index)}
                                  style={{
                                    cursor: "pointer",
                                    border:
                                      currentGallerySlide === index
                                        ? "2px solid #007bff"
                                        : "1px solid #ddd",
                                    opacity:
                                      currentGallerySlide === index ? 1 : 0.7,
                                    transition: "all 0.3s ease",
                                    borderRadius: "4px",
                                    overflow: "hidden",
                                  }}
                                >
                                  <img
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    style={{
                                      width: "60px",
                                      height: "40px",
                                      objectFit: "cover",
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Course Details */}
                          <div
                            className="jobplugin__catalog-block"
                            style={{ marginBottom: "30px" }}
                          >
                            <div
                              className="jobplugin__settings-head"
                              style={{ marginBottom: "15px" }}
                            >
                              <h2 className="h5 text-secondary">
                                Course details
                              </h2>
                              <span
                                className="jobplugin__settings-head__bar jobplugin__bg-primary"
                                style={{
                                  display: "block",
                                  width: "40px",
                                  height: "3px",
                                  backgroundColor: "#2c5aa0",
                                  marginTop: "8px",
                                }}
                              ></span>
                            </div>
                            <p
                              style={{
                                lineHeight: "1.6",
                                marginBottom: "20px",
                              }}
                            >
                              {selectedTraining.description}
                            </p>

                            <strong
                              className="jobplugin__catalog-block__subtitle text-secondary"
                              style={{
                                display: "block",
                                marginBottom: "10px",
                                fontSize: "16px",
                              }}
                            >
                              Course Modules
                            </strong>
                            <ul
                              className="jobplugin__catalog-block__list"
                              style={{ marginBottom: "25px", paddingLeft: "0" }}
                            >
                              {selectedTraining.subCategories?.map(
                                (module, index) => (
                                  <li
                                    key={index}
                                    style={{
                                      marginBottom: "8px",
                                      padding: "10px",
                                      backgroundColor: "#f8f9fa",
                                      borderRadius: "6px",
                                      border: "1px solid #e9ecef",
                                    }}
                                  >
                                    <strong>{module.title}:</strong>{" "}
                                    {module.description}
                                  </li>
                                )
                              )}
                            </ul>

                            <strong
                              className="jobplugin__catalog-block__subtitle text-secondary"
                              style={{
                                display: "block",
                                marginBottom: "10px",
                                fontSize: "16px",
                              }}
                            >
                              Enrollment Information
                            </strong>
                            <p style={{ marginBottom: "10px" }}>
                              This course has {enrollmentCount} enrolled
                              participants:
                            </p>
                            <ul
                              className="jobplugin__catalog-block__list"
                              style={{ marginBottom: "25px", paddingLeft: "0" }}
                            >
                              {selectedTraining.enrollerList
                                ?.slice(0, 3)
                                .map((enroller, index) => (
                                  <li
                                    key={index}
                                    style={{
                                      marginBottom: "6px",
                                      padding: "8px",
                                      backgroundColor: "#f8f9fa",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    {enroller.employername} (
                                    {enroller.paidAmount === "0"
                                      ? "Free"
                                      : `Paid ${enroller.paidAmount}`}
                                    )
                                  </li>
                                ))}
                              {enrollmentCount > 3 && (
                                <li
                                  style={{
                                    padding: "8px",
                                    fontStyle: "italic",
                                    color: "#666",
                                  }}
                                >
                                  ...and {enrollmentCount - 3} more
                                </li>
                              )}
                            </ul>

                            <strong
                              className="jobplugin__catalog-block__subtitle text-secondary"
                              style={{
                                display: "block",
                                marginBottom: "10px",
                                fontSize: "16px",
                              }}
                            >
                              Course Status
                            </strong>
                            <p style={{ marginBottom: "8px" }}>
                              Status:{" "}
                              {selectedTraining?.status
                                ? selectedTraining.status
                                    .charAt(0)
                                    .toUpperCase() +
                                  selectedTraining.status.slice(1)
                                : "Status not available"}
                            </p>
                            <p>Last updated: {lastUpdated}</p>
                          </div>

                          {/* Course Stats */}
                          <div
                            className="jobplugin__catalog-block no-padding"
                            style={{
                              backgroundColor: "#f8f9fa",
                              padding: "20px",
                              borderRadius: "8px",
                            }}
                          >
                            <div
                              className="jobplugin__row jobplugin__three-column"
                              style={{
                                display: "grid",
                                gridTemplateColumns:
                                  "repeat(auto-fit, minmax(200px, 1fr))",
                                gap: "20px",
                              }}
                            >
                              <div className="jobplugin__column">
                                <strong
                                  className="jobplugin__catalog-block__subtitle text-secondary"
                                  style={{
                                    display: "block",
                                    marginBottom: "8px",
                                  }}
                                >
                                  Payment Type
                                </strong>
                                <p
                                  style={{
                                    margin: "0",
                                    padding: "8px",
                                    backgroundColor: "white",
                                    borderRadius: "4px",
                                  }}
                                >
                                  {selectedTraining.paymentStatus === "paid"
                                    ? "Paid Course"
                                    : "Free Course"}
                                </p>
                              </div>
                              <div className="jobplugin__column">
                                <strong
                                  className="jobplugin__catalog-block__subtitle text-secondary"
                                  style={{
                                    display: "block",
                                    marginBottom: "8px",
                                  }}
                                >
                                  Course Fee
                                </strong>
                                <p
                                  style={{
                                    margin: "0",
                                    padding: "8px",
                                    backgroundColor: "white",
                                    borderRadius: "4px",
                                  }}
                                >
                                  {selectedTraining.paymentStatus === "paid"
                                    ? `${selectedTraining.paidAmount}`
                                    : "Free"}
                                </p>
                              </div>
                              <div className="jobplugin__column">
                                <strong
                                  className="jobplugin__catalog-block__subtitle text-secondary"
                                  style={{
                                    display: "block",
                                    marginBottom: "8px",
                                  }}
                                >
                                  Modules
                                </strong>
                                <p
                                  style={{
                                    margin: "0",
                                    padding: "8px",
                                    backgroundColor: "white",
                                    borderRadius: "4px",
                                  }}
                                >
                                  {selectedTraining?.subCategories?.length || 0}{" "}
                                  modules
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Pricing Tiers Sidebar */}
                        <aside
                          className="jobplugin__catalog-aside"
                          style={{ flex: "1", minWidth: "300px" }}
                        >
                          <strong
                            className="jobplugin__catalog-aside__title"
                            style={{
                              display: "block",
                              marginBottom: "20px",
                              fontSize: "18px",
                              fontWeight: "600",
                            }}
                          >
                            Select service tier
                          </strong>

                          {pricingTiers.map((tier, index) => (
                            <div
                              key={index}
                              className={`jobplugin__results-aside__box ${
                                activeTier === tier.name + " - " + tier.price
                                  ? "active"
                                  : ""
                              }`}
                              style={{
                                marginBottom: "15px",
                                border: "1px solid #e8e8e8",
                                borderRadius: "8px",
                                backgroundColor:
                                  activeTier === tier.name + " - " + tier.price
                                    ? "#f8f9fa"
                                    : "white",
                                overflow: "hidden",
                              }}
                            >
                              <div
                                className="jobplugin__results-aside__head jobplugin__results-aside__boxopener"
                                onClick={() =>
                                  toggleTier(tier.name + " - " + tier.price)
                                }
                                style={{
                                  cursor: "pointer",
                                  padding: "15px",
                                  borderBottom:
                                    activeTier ===
                                    tier.name + " - " + tier.price
                                      ? "1px solid #e8e8e8"
                                      : "none",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <h3
                                  className="h6"
                                  style={{ margin: "0", fontWeight: "600" }}
                                >
                                  {tier.name} - {tier.price}
                                </h3>
                                <FaChevronRight
                                  style={{
                                    transform:
                                      activeTier ===
                                      tier.name + " - " + tier.price
                                        ? "rotate(90deg)"
                                        : "rotate(0deg)",
                                    transition: "transform 0.3s ease",
                                  }}
                                />
                              </div>
                              <div
                                className="jobplugin__results-aside__drop"
                                style={{
                                  display:
                                    activeTier ===
                                    tier.name + " - " + tier.price
                                      ? "block"
                                      : "none",
                                  padding: "20px",
                                }}
                              >
                                <div
                                  className="jobplugin__catalog-aside__duration"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    marginBottom: "15px",
                                  }}
                                >
                                  <FaClock style={{ color: "#2c5aa0" }} />
                                  <strong>{tier.duration}</strong>
                                </div>
                                <ul
                                  className="jobplugin__checkout-services"
                                  style={{
                                    listStyle: "none",
                                    padding: "0",
                                    marginBottom: "20px",
                                  }}
                                >
                                  {tier.features.map((feature, featIndex) => (
                                    <li
                                      key={featIndex}
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "8px 0",
                                        borderBottom: "1px solid #f0f0f0",
                                      }}
                                    >
                                      <span className="jobplugin__checkout-services__subtitle">
                                        {feature}
                                      </span>
                                      <span className="jobplugin__checkout-services__text">
                                        <FaCheckCircle
                                          style={{ color: "#28a745" }}
                                        />
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                                <div
                                  className="jobplugin__catalog-aside__buttons"
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px",
                                  }}
                                >
                                  <a
                                    href="#"
                                    className="jobplugin__button jobplugin__bg-primary hover:jobplugin__bg-secondary"
                                    style={{
                                      display: "block",
                                      padding: "12px 20px",
                                      backgroundColor: "#2c5aa0",
                                      color: "white",
                                      textDecoration: "none",
                                      borderRadius: "6px",
                                      textAlign: "center",
                                      fontWeight: "600",
                                      transition: "background-color 0.3s ease",
                                    }}
                                  >
                                    {tier.price === "Free"
                                      ? "Enroll Now"
                                      : `Proceed to Pay (${tier.price})`}
                                  </a>
                                  <a
                                    href="#"
                                    className="jobplugin__button jobplugin__bg-white jobplugin__border-primary hover:jobplugin__bg-white"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      gap: "8px",
                                      padding: "12px 20px",
                                      backgroundColor: "white",
                                      color: "#2c5aa0",
                                      textDecoration: "none",
                                      border: "2px solid #2c5aa0",
                                      borderRadius: "6px",
                                      textAlign: "center",
                                      fontWeight: "500",
                                      transition: "all 0.3s ease",
                                    }}
                                  >
                                    <FaMessage />
                                    Send Message
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
                        </aside>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Responsive CSS */}
      <style jsx>{`
        @media (max-width: 768px) {
          .jobplugin__main {
            padding-left: 0 !important;
          }

          .jobplugin__catalog {
            flex-direction: column !important;
          }

          .jobplugin__catalog-aside {
            min-width: auto !important;
          }

          .jobplugin__tabset-normal ul {
            flex-wrap: wrap !important;
            gap: 15px !important;
            padding: 15px 15px 0 15px !important;
          }

          .jobplugin__slider-grid {
            grid-template-columns: 1fr !important;
          }

          .jobplugin__row.jobplugin__three-column {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 480px) {
          .jobplugin__main-holder {
            padding: 10px !important;
          }

          .jobplugin__catalog-aside {
            margin-top: 20px;
          }
        }

        .jobplugin__slider-slide:hover {
          transform: translateY(-4px);
        }

        .jobplugin__article-box {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .jobplugin__article-box:hover {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </>
  );
};

export default CertificatesTrainings;
