import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { getEventDetails, getAllEvents } from '../../api/services/projectServices';

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [autoSlideEnabled, setAutoSlideEnabled] = useState(true);
  const autoSlideRef = useRef(null);
  const sliderRef = useRef(null);

  // Get items per view based on screen size
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 992) return 4;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }
    return 3;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const data = await getEventDetails(eventId);
        setEvent(data);

        // Fetch all events for related events section
        const allEvents = await getAllEvents();
        // Filter out the current event and get related events
        const filteredEvents = allEvents.filter(e => e._id !== eventId);
        setRelatedEvents(filteredEvents);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  // Create infinite loop by duplicating events
  const getInfiniteEvents = () => {
    if (relatedEvents.length === 0) return [];

    // If we have fewer events than items per view, duplicate them
    if (relatedEvents.length < itemsPerView) {
      const multiplier = Math.ceil(itemsPerView * 3 / relatedEvents.length);
      return Array(multiplier).fill(relatedEvents).flat();
    }

    // For smooth infinite scrolling, add copies at the beginning and end
    return [...relatedEvents, ...relatedEvents, ...relatedEvents];
  };

  const infiniteEvents = getInfiniteEvents();
  const totalSlides = infiniteEvents.length > 0 ? Math.ceil(infiniteEvents.length / itemsPerView) : 0;

  // Auto slide functionality
  useEffect(() => {
    if (!autoSlideEnabled || infiniteEvents.length === 0) return;

    autoSlideRef.current = setInterval(() => {
      nextSlide();
    }, 4000); // Change slide every 4 seconds

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [autoSlideEnabled, infiniteEvents.length, currentSlide]);

  const pauseAutoSlide = () => {
    setAutoSlideEnabled(false);
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
    // Resume after 8 seconds
    setTimeout(() => {
      setAutoSlideEnabled(true);
    }, 8000);
  };

  const nextSlide = () => {
    if (isTransitioning || infiniteEvents.length === 0) return;

    setIsTransitioning(true);
    setCurrentSlide(prev => prev + 1);

    setTimeout(() => {
      setIsTransitioning(false);
      // Reset to beginning when we reach the end (infinite loop)
      if (currentSlide + 1 >= totalSlides - itemsPerView) {
        setCurrentSlide(Math.floor(relatedEvents.length / itemsPerView));
      }
    }, 500);
  };

  const prevSlide = () => {
    if (isTransitioning || infiniteEvents.length === 0) return;

    setIsTransitioning(true);

    if (currentSlide === 0) {
      // Jump to the end position without animation
      const endPosition = totalSlides - itemsPerView - Math.floor(relatedEvents.length / itemsPerView);
      setCurrentSlide(endPosition);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    } else {
      setCurrentSlide(prev => prev - 1);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }
  };

  const handleManualSlide = (direction) => {
    pauseAutoSlide();
    if (direction === 'next') {
      nextSlide();
    } else {
      prevSlide();
    }
  };

  const parseDDMMYYYY = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  };
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading event details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5 text-danger">
        <i className="fas fa-exclamation-triangle fa-2x mb-3"></i>
        <h5>Error loading event details</h5>
        <p>{error}</p>
        <button
          className="btn btn-primary mt-3"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-5">
        <i className="fas fa-calendar fa-3x text-muted mb-3"></i>
        <h4>Event not found</h4>
        <p className="text-muted">The event you're looking for doesn't exist or may have been removed</p>
      </div>
    );
  }

  return (
    <>
      {/* Sub Visual of the page */}
      <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 pb-30 text-white">
        <div className="container position-relative text-center">
          <div className="row">
            <div className="col-12">
              <div className="subvisual-textbox">
                <h1 className="text-primary mb-0">{event.title}</h1>
                <p>{event.organizer} • {event.venue}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="main">
        {/* Event Details Section */}
        <section className="section section-event-details section-theme-1 pt-35 pt-md-50 pt-lg-75 pt-xl-100 pb-35 pb-md-50 pb-xl-100">
          <div className="container">
            <header className="event-details-header mb-30 mb-md-45 mb-lg-60">
              <ul className="post-meta">
                <li>{event.organizer}</li>
                <li>
                  <MapPin size={16} className="mr-1" />
                  <span className="text">
                    {event.isVirtual ? 'Virtual Event' : event.venue}
                    {event.isVirtual && event.venue ? ` (${event.venue})` : ''}
                  </span>
                </li>
              </ul>
              <h2>{event.title}</h2>

              {/* Social Sharing Icons */}
              <div className="social-info">
                <strong className="title">Social Sharing:</strong>
                <ul className="social-networks">
                  <li><a className="bg-primary border border-none" href="#"><i className="icon-facebook"></i></a></li>
                  <li><a className="bg-primary border border-none" href="#"><i className="icon-linkedin"></i></a></li>
                  <li><a className="bg-primary border border-none" href="#"><i className="icon-twitter"></i></a></li>
                  <li><a className="bg-primary border border-none" href="#"><i className="icon-instagram"></i></a></li>
                </ul>
              </div>
            </header>

            <div className="row">
              <div className="col-12 col-md-7 col-xl-8">
                <div className="text-holder">
                  <h3 className="text-secondary">About the Event</h3>
                  <p>{event.description || 'No overview provided for this event.'}</p>
                </div>
              </div>

              <div className="col-12 col-md-5 col-xl-4 pt-35 pt-md-0">
                <div className="event-info-box bg-light-sky">
                  <div className="event-info-head" style={{ textAlign: 'center' }}>
                    <div className="event-banner">
                      <img
                        src={event.bannerImage || "/images/default-event-banner.jpg"}
                        width="100%"
                        height="auto"
                        alt={event.title}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="textbox mt-3">
                      <h4 className="text-secondary">{event.organizer}</h4>
                      <p>{event.category}</p>
                      {event.website && <p><a href={event.website.startsWith('http') ? event.website : `https://${event.website}`}>{event.website}</a></p>}
                    </div>
                  </div>
                  <div className="event-info-details">
                    <ul className="info-list">
                      <li>
                        <Calendar className="text-primary mr-2" size={18} />
                        <span className="text">{event.eventDate}</span>
                      </li>
                      <li>
                        <Clock className="text-primary mr-2" size={18} />
                        <span className="text">{event.startTime} - {event.endTime}</span>
                      </li>
                      <li>
                        <MapPin className="text-primary mr-2" size={18} />
                        <span className="text">{event.isVirtual ? 'Virtual Event' : event.venue}</span>
                      </li>
                    </ul>
                    <div className="text-center mt-4">
                       <Link
                        to={`/event-register/${eventId}`}
                        className="btn btn-primary btn-lg"
                      >
                        Register Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Events Section */}
            {relatedEvents.length > 0 && (
              <div className="row mt-5">
                <div className="col-12">
                  <h3 className="text-secondary mb-4">Related Events</h3>
                  <div
                    className="related-events-container position-relative"
                    onMouseEnter={pauseAutoSlide}
                  >
                    <button
                      className="carousel-control prev"
                      onClick={() => handleManualSlide('prev')}
                      aria-label="Previous slide"
                      disabled={isTransitioning}
                    >
                      <ChevronLeft size={24} />
                    </button>

                    <div className="related-events-slider">
                      <div
                        ref={sliderRef}
                        className="related-events-track"
                        style={{
                          transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)`,
                          transition: isTransitioning ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
                          width: `${(infiniteEvents.length / itemsPerView) * 100}%`
                        }}
                      >
                        {infiniteEvents.map((relatedEvent, index) => (
                          <div
                            className="related-event-card"
                            key={`${relatedEvent._id}-${index}`}
                            style={{ width: `${100 / infiniteEvents.length}%` }}
                          >
                            <div className="event-card">
                              <div className="event-image">
                                <img
                                  src={relatedEvent.bannerImage || "/images/default-event-banner.jpg"}
                                  alt={relatedEvent.title}
                                />
                              </div>
                              <div className="event-content">
                                <h4>
                                  <Link to={`/events-details/${relatedEvent._id}`}>
                                    {relatedEvent.title}
                                  </Link>
                                </h4>
                                <div className="event-meta">
                                  <span>
                                    <Calendar size={14} className="mr-1" />
                                    {relatedEvent.eventDate}
                                  </span>
                                  <span>
                                    <MapPin size={14} className="mr-1" />
                                    {relatedEvent.isVirtual ? 'Virtual' : relatedEvent.venue}
                                  </span>
                                </div>
                                <p className="event-description">
                                  {relatedEvent.description && relatedEvent.description.length > 100
                                    ? `${relatedEvent.description.substring(0, 100)}...`
                                    : relatedEvent.description || 'No description available.'}
                                </p>
                                <Link
                                  to={`/events-details/${relatedEvent._id}`}
                                  className="btn btn-outline-primary btn-sm"
                                >
                                  View Details
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      className="carousel-control next"
                      onClick={() => handleManualSlide('next')}
                      aria-label="Next slide"
                      disabled={isTransitioning}
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <style jsx>{`
        .event-banner {
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 1rem;
        }
        
        .event-info-box {
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .info-list {
          list-style: none;
          padding: 0;
        }
        
        .info-list li {
          display: flex;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        /* Social icons styling */
        .social-info {
          margin-top: 1rem;
          display: flex;
          align-items: center;
        }

        .social-info .title {
          margin-right: 0.5rem;
        }

        .social-networks {
          display: flex;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .social-networks li {
          margin-right: 0.5rem;
        }

        .social-networks a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          color: #333;
          transition: all 0.3s ease;
        }

        .social-networks a:hover {
          transform: translateY(-2px);
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }

        /* Related Events Styles */
        .related-events-container {
          overflow: hidden;
          position: relative;
          padding: 0 40px;
        }

        .related-events-slider {
          overflow: hidden;
          width: 100%;
        }

        .related-events-track {
          display: flex;
          will-change: transform;
        }

        .related-event-card {
          flex-shrink: 0;
          padding: 0 15px;
          box-sizing: border-box;
        }

        .event-card {
          border: 1px solid #eee;
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
          background: white;
        }

        .event-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .event-image {
          height: 160px;
          overflow: hidden;
        }

        .event-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .event-card:hover .event-image img {
          transform: scale(1.05);
        }

        .event-content {
          padding: 15px;
        }

        .event-content h4 {
          margin-bottom: 10px;
          font-size: 1.1rem;
          line-height: 1.3;
        }

        .event-content h4 a {
          color: inherit;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .event-content h4 a:hover {
          color: var(--primary);
        }

        .event-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 10px;
          font-size: 0.85rem;
          color: #666;
        }

        .event-meta span {
          display: flex;
          align-items: center;
        }

        .event-description {
          font-size: 0.9rem;
          color: #555;
          margin-bottom: 15px;
          line-height: 1.4;
        }

        .carousel-control {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: white;
          border: 1px solid #ddd;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          transition: all 0.3s ease;
        }

        .carousel-control:hover:not(:disabled) {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
          transform: translateY(-50%) scale(1.1);
        }

        .carousel-control:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .carousel-control.prev {
          left: 0;
        }

        .carousel-control.next {
          right: 0;
        }

        .btn-outline-primary {
          transition: all 0.3s ease;
        }

        .btn-outline-primary:hover {
          transform: translateY(-1px);
        }

        @media (max-width: 992px) {
          .related-event-card {
            width: 50% !important;
          }
        }

        @media (max-width: 768px) {
          .related-event-card {
            width: 100% !important;
          }
          
          .related-events-container {
            padding: 0 20px;
          }

          .carousel-control {
            width: 35px;
            height: 35px;
          }
        }

        @media (max-width: 576px) {
          .event-content {
            padding: 12px;
          }

          .event-content h4 {
            font-size: 1rem;
          }

          .event-description {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </>
  );
};

export default EventDetails;