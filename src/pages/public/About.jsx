import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import edProfiologo from "../../../public/images/logo2.png"



const AboutPage = () => {
  return (
    <div className="main-wrapper">
      
      {/* Sub Visual Block */}
      <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 pt-lg-150 pb-30 text-white">
        <div className="container position-relative text-center">
          <div className="row">
            <div className="col-12">
              <div className="subvisual-textbox pb-0">
                <h1 className="text-primary mb-0">About EdProfio</h1>
                <p>Exclusive recruitment platform for the education industry</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="main">
        {/* About Section */}
        <section className="section section-about section-theme-1 pt-35 pt-md-50 pt-lg-70 pt-xl-100 pt-xxl-120 pb-35 pb-md-50 pb-lg-70 pb-xl-100 pb-xxl-120">
          <div className="container">
            <div className="row about-content-row">
              <div className="col-12 col-lg-7 mb-35 mb-lg-0">
                <div className="textbox">
                  <img src={edProfiologo} className="about-logo" alt="EdProfio Logo" />
                  <h2 className="text-secondary mb-0">About EdProfio</h2>
                  <p className="fw-bold text-dark">Exclusive Recruitment Platform for the Education Industry</p>
                  <hr className="mb-20" />
                  <p style={{textAlign: "justify"}}>
                    Welcome to EdProfio, a dedicated recruitment platform built exclusively for the education industry. 
                    We empower schools, colleges, universities, and EdTech organizations with seamless hiring solutions designed for growth. 
                    Whether you are an institution seeking qualified professionals or an educator pursuing the right career opportunity, 
                    EdProfio ensures a smooth, transparent, and efficient process from start to finish.
                  </p>
                  <p style={{textAlign: "justify"}}>
                    We focus on creating meaningful connections — linking opportunity with expertise — so that the right people find 
                    the right environment to inspire, innovate, and succeed.
                  </p>
                </div>
              </div>
              <div className="col-12 col-lg-5">
                <div className="about-image shadow border border-dark">
                  <img src="/images/img-about-01.jpg" className="img-fluid" alt="Intro" />
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-12 col-lg-12 mt-60">
                <Tabs defaultActiveKey="why-choose" id="about-tabs" className="nav-tabs-line about-tabs">
                  <Tab eventKey="why-choose" title="Why Choose EdProfio?" className="border border-dark shadow p-20 tab-content-box">
                    <p style={{textAlign: "justify", marginBottom: "1rem"}}>
                      Educational hiring requires skill, understanding, and precision — and that's exactly what we excel at. Our platform provides:
                    </p>
                    <ul style={{listStyleType: "none", paddingLeft: "0"}}>
                      <li style={{marginBottom: "0.5rem"}}>✔ Smart talent discovery through verified profiles</li>
                      <li style={{marginBottom: "0.5rem"}}>✔ Streamlined hiring workflows tailored for educators</li>
                      <li style={{marginBottom: "0.5rem"}}>✔ Accurate candidate–institution fit based on competencies & goals</li>
                    </ul>
                    <p style={{textAlign: "justify", marginTop: "1rem"}}>
                      For professionals, EdProfio opens access to opportunities across teaching, administration, leadership, research, 
                      and EdTech—supporting long-term career growth and development.
                    </p>
                    <p style={{textAlign: "justify", fontWeight: "600", marginTop: "1rem"}}>
                      We don't just fill positions. We build stronger, future-ready institutions.
                    </p>
                  </Tab>
                  <Tab eventKey="benefit" title="Who Can Benefit from EdProfio?" className="border border-dark shadow p-20 tab-content-box">
                    <p style={{textAlign: "justify", marginBottom: "1rem"}}>
                      EdProfio is built for the entire education ecosystem, including:
                    </p>
                    <ul style={{listStyleType: "disc", paddingLeft: "1.5rem"}}>
                      <li style={{marginBottom: "0.5rem"}}>Teachers | Administrative Staff | Academic Leaders</li>
                      <li style={{marginBottom: "0.5rem"}}>Counselors | Coordinators | Librarians</li>
                      <li style={{marginBottom: "0.5rem"}}>Researchers & Academic Support Roles</li>
                      <li style={{marginBottom: "0.5rem"}}>EdTech & Training Professionals</li>
                      <li style={{marginBottom: "0.5rem"}}>Schools, Universities, Coaching Centres & EdTech Firms</li>
                    </ul>
                    <p style={{textAlign: "justify", marginTop: "1rem"}}>
                      We connect the right talent to the right opportunities—driving success for individuals and institutions alike.
                    </p>
                  </Tab>
                  <Tab eventKey="mission" title="Our Mission" className="border border-dark shadow p-20 tab-content-box">
                    <p style={{textAlign: "justify"}}>
                      To advance the education sector by transforming the way talent is discovered, assessed, and hired. 
                      Through intelligent tools, reliable processes, and people-first solutions, EdProfio strives to make 
                      recruitment simpler, faster, and more impactful for everyone involved.
                    </p>
                    <p style={{textAlign: "justify", fontWeight: "600", marginTop: "1rem"}}>
                      Together, we shape careers.<br />
                      Together, we strengthen education.
                    </p>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="section section-theme-1 section-leadership bg-light-sky pt-45 pt-md-50 pt-lg-65 pt-xl-85 pt-xxl-110 pb-30 pb-md-50 pb-xl-60" style={{backgroundImage: "url('/images/bg-leaders.jpg')"}}>
          <div className="container">
            <header className="section-header text-center mb-30 mb-md-45 mb-xl-60">
              <h2 className="text-secondary mb-0">Our Team</h2>
              <p>The Strong Team Members behind every milestones</p>
              <hr />
            </header>
            
            <div className="row">
              {teamMembers.map((member, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4 mb-15 mb-md-30 mb-xl-80">
                  <div className="leadership-box shadow border border-dark">
                    <div className="image-holder shadow border border-dark">
                      <img src={`/images/${member.image}`} className="img-fluid" alt={member.name} />
                    </div>
                    <div className="textbox">
                      <h3 className="h4 mt-0 mb-0 text-secondary">{member.name}</h3>
                      <span className="subtitle">{member.position}</span>
                      <hr />
                      <span className="number mb-10">
                        <i className="icon-phone"></i> <a href={`tel:${member.phone}`}>{member.phone}</a>
                      </span>
                      <ul className="social-networks d-flex flex-wrap">
                        {member.social.map((social, i) => (
                          <li key={i}><a href="#"><i className={`icon-${social}`}></i></a></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section - Slider Removed, Direct Display */}
        <section className="section section-theme-6 learning-block bg-light-sky pt-30 pt-md-50 pt-lg-75 pt-xxl-120 pb-10 pb-md-50 pb-lg-40 pb-xxl-60 bg-white">
          <div className="container testimonials-container">
            <div className="row mb-10 mb-lg-60">
              <div className="col-12 col-md-8">
                <h2 className="text-secondary mb-0">People Love To Share Feedback</h2>
                <p>The most comprehensive search engine for jobs.</p>
              </div>
              <div className="col-12 col-md-4 d-flex justify-content-md-end align-items-start">
                <a href="#" className="reviews-link">
                  <div className="ratings-info bg-primary text-white">
                    <i className="icon-star"></i>
                    <span>4.9</span>
                  </div>
                  <span className="txt">494 Reviews</span>
                </a>
              </div>
              <hr />
            </div>
            
            {/* Testimonials Display - Better Layout with Photo on Left */}
            <div className="row mb-30 mb-md-50 mb-lg-80">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="col-12 mb-4">
                  <div className="testimonial-card d-flex align-items-start p-4 border shadow" style={{borderRadius: "10px", backgroundColor: "white", gap: "2rem"}}>
                    {/* Profile Photo */}
                    <div className="testimonial-photo flex-shrink-0">
                      <img 
                        src={`/images/${testimonial.image}`} 
                        alt={testimonial.name}
                        className="testimonial-img"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="testimonial-content flex-grow-1">
                      <h3 className="text-secondary mb-3" style={{fontSize: "1.75rem", fontWeight: "600"}}>{testimonial.title}</h3>
                      <p style={{
                        textAlign: "justify", 
                        fontSize: "1rem", 
                        lineHeight: "1.7",
                        color: "#333",
                        marginBottom: "1.5rem"
                      }}>
                        {testimonial.quote}
                      </p>
                      <div className="testimonial-author">
                        <strong style={{fontSize: "1.1rem", color: "#000"}}>{testimonial.name}</strong>
                        <span style={{color: "#666", marginLeft: "0.5rem"}}>- {testimonial.position}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <hr />
            
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <ul className="list-inline logos-list">
                  {logos.map((logo, index) => (
                    <li key={index} className="list-inline-item">
                      <img src={`/images/${logo}`} alt="partner logo" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* App Download Section */}
        <section className="section section-theme-1 bg-light section-downloads pt-20 pt-md-35 pt-lg-50 pb-50 pb-md-75 pb-lg-75 pb-xl-110 pb-xxl-140">
          <br /><br />
          <div className="container">
            <header className="section-header text-center mb-30 mb-md-40 mb-lg-50">
              <h2 className="text-secondary">Download our mobile app</h2>
              <br /><hr /><br />
              <p>Search through millions of jobs and find the right fit.<br /> Simply swipe right to apply.</p>
            </header>
            
            <div className="app-buttons">
              <a className="btn-app btn-play-store" href="#">
                <div className="store-icon">
                  <img src="/images/icon-play-store.png" width="28" height="30" alt="Google Play" />
                </div>
                <div className="btn-text">
                  Download From <span>Google Play</span>
                </div>
              </a>
              <a className="btn-app btn-app-store" href="#">
                <div className="store-icon">
                  <img src="/images/icon-app-store.png" width="32" height="38" alt="App Store" />
                </div>
                <div className="btn-text">
                  Download From <span>App Store</span>
                </div>
              </a>
            </div>
            
            <div className="icon ico01"><img src="/images/ico-app01.png" alt="Decoration" /></div>
            <div className="icon ico02"><img src="/images/ico-app02.png" alt="Decoration" /></div>
            <div className="icon ico03"><img src="/images/ico-app03.png" alt="Decoration" /></div>
            <div className="icon ico04"><img src="/images/ico-app04.png" alt="Decoration" /></div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section section-about section-theme-1 pb-35 pb-md-50 pb-lg-70 pb-xl-100 pb-xxl-120" style={{borderBottom: "1px solid #fff"}}>
          <div className="container">
            <div className="row">
              <div className="counters-block d-flex flex-wrap justify-content-between mt-md-25 mt-xl-50 pt-35 pt-md-50 pt-lg-60 mb-0 pb-0">
                {stats.map((stat, index) => (
                  <div key={index} className="counter-box bg-light-sky border border-dark shadow">
                    <div className="counter-stats">
                      <strong className="numbers h2">
                        <span className="purecounter">{stat.value}</span>
                        {stat.unit}
                      </strong>
                      <span className="subtext">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        /* ===== RESPONSIVE FIXES FOR ABOUT PAGE ===== */
        
        /* About Content Row - Remove inline padding and make responsive */
        .about-content-row {
          padding: 0 100px;
        }

        /* Testimonials Container */
        .testimonials-container {
          padding: 0 100px;
        }

        /* Logo sizing */
        .about-logo {
          width: 30%;
          max-width: 200px;
          height: auto;
        }

        /* About image responsive */
        .about-image img {
          width: 100%;
          height: auto;
        }

        /* Tab content box */
        .tab-content-box {
          border-radius: 10px;
        }

        /* Testimonial card styling */
        .testimonial-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
        }

        /* Testimonial photo */
        .testimonial-img {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #e0e0e0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        /* Leadership box images */
        .leadership-box .image-holder img {
          width: 100%;
          height: auto;
          max-width: 260px;
        }

        /* Counter boxes responsive */
        .counter-box {
          flex: 1;
          min-width: 200px;
          margin: 10px;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 991px) {
          .about-content-row {
            padding: 0 50px;
          }

          .testimonials-container {
            padding: 0 50px;
          }

          .about-logo {
            width: 40%;
            max-width: 150px;
          }
        }

        @media (max-width: 767px) {
          /* Remove large padding on mobile */
          .about-content-row {
            padding: 0 15px;
          }

          .testimonials-container {
            padding: 0 15px;
          }

          /* Logo sizing for mobile */
          .about-logo {
            width: 50%;
            max-width: 120px;
            margin-bottom: 1rem;
          }

          /* Headings font size */
          .text-secondary {
            font-size: 1.5rem !important;
          }

          h1.text-primary {
            font-size: 1.75rem !important;
          }

          /* Testimonial card mobile - stack vertically */
          .testimonial-card {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center;
            gap: 1.5rem !important;
          }

          .testimonial-img {
            width: 120px !important;
            height: 120px !important;
          }

          .testimonial-content {
            text-align: center !important;
          }

          .testimonial-content p {
            text-align: center !important;
            font-size: 0.95rem !important;
          }

          .testimonial-content h3 {
            font-size: 1.3rem !important;
          }

          .testimonial-author {
            justify-content: center;
            flex-wrap: wrap;
          }

          /* Subvisual text padding */
          .subvisual-textbox {
            padding: 0 1rem;
          }

          .subvisual-textbox h1 {
            font-size: 1.5rem !important;
          }

          .subvisual-textbox p {
            font-size: 0.9rem;
          }

          /* Tab titles - make them wrap */
          .about-tabs .nav-link {
            font-size: 0.85rem;
            padding: 0.5rem 0.75rem;
            white-space: normal;
            text-align: center;
          }

          /* Tab content padding */
          .tab-content-box {
            padding: 15px !important;
          }

          /* Leadership boxes */
          .leadership-box {
            margin-bottom: 1.5rem;
          }

          /* Counter boxes stack on mobile */
          .counters-block {
            flex-direction: column;
            align-items: center;
          }

          .counter-box {
            width: 100%;
            max-width: 300px;
            margin: 10px 0;
          }

          /* Reviews link */
          .reviews-link {
            margin-top: 1rem;
          }

          /* App buttons */
          .app-buttons {
            flex-direction: column;
            gap: 1rem;
          }

          .btn-app {
            width: 100%;
            max-width: 300px;
          }

          /* Text alignment on mobile */
          p {
            text-align: left !important;
          }

          /* Section headers */
          .section-header h2 {
            font-size: 1.5rem !important;
          }

          .section-header p {
            font-size: 0.9rem;
          }

          /* Logos list wrap on mobile */
          .logos-list {
            text-align: center;
          }

          .logos-list .list-inline-item {
            margin: 0.5rem;
          }

          .logos-list img {
            max-width: 80px;
            height: auto;
          }
        }

        @media (max-width: 576px) {
          /* Extra small screens */
          .about-logo {
            width: 60%;
            max-width: 100px;
          }

          .text-secondary {
            font-size: 1.25rem !important;
          }

          h1.text-primary {
            font-size: 1.5rem !important;
          }

          .about-tabs .nav-link {
            font-size: 0.75rem;
            padding: 0.4rem 0.5rem;
          }

          /* Testimonial adjustments for very small screens */
          .testimonial-card {
            padding: 1.5rem 1rem !important;
          }

          .testimonial-img {
            width: 100px !important;
            height: 100px !important;
            border-width: 3px !important;
          }

          .testimonial-content h3 {
            font-size: 1.15rem !important;
          }

          .testimonial-content p {
            font-size: 0.9rem !important;
          }

          .testimonial-author strong {
            font-size: 1rem !important;
          }

          .testimonial-author span {
            font-size: 0.85rem !important;
          }

          /* Stack team members on very small screens */
          .section-leadership .col-md-6 {
            width: 100%;
          }

          /* Smaller stats text */
          .counter-stats .numbers {
            font-size: 1.5rem !important;
          }

          .counter-stats .subtext {
            font-size: 0.85rem;
          }
        }

        /* Ensure images don't overflow */
        img {
          max-width: 100%;
          height: auto;
        }

        /* Override any problematic inline styles on mobile */
        @media (max-width: 767px) {
          [style*="padding: 0px 100px"] {
            padding: 0 15px !important;
          }
        }
      `}</style>

    </div>
  );
};

// Data for dynamic content
const teamMembers = [
  {
    name: "Julian Wan",
    position: "Head of Marketing",
    phone: "+44 (0)20 7942 2000",
    image: "img-leader01.jpg",
    social: ["facebook", "linkedin", "twitter"]
  },
  {
    name: "Thomas",
    position: "UX / UI Designer",
    phone: "+44 (0)20 7942 2000",
    image: "img-leader02.jpg",
    social: ["facebook", "linkedin", "twitter"]
  },
  {
    name: "Goli Povali",
    position: "Co-Founder",
    phone: "+44 (0)20 7942 2000",
    image: "img-leader03.jpg",
    social: ["facebook", "linkedin", "twitter"]
  }
];

const testimonials = [
  {
    title: "Great Quality!",
    quote: "Vestibulum orci felis, ullamcorper non conu m non, ultrices ac nunc. Mauris non ligscipit, vulpu tate mi accumsan, dapibus fe lam sed sapien duiem non porta.",
    name: "Courtney Henry",
    position: "Web Designer",
    image: "people-img-01.jpg"
  }
];

const logos = [
  "com-logo01.png",
  "com-logo02.png",
  "com-logo03.png",
  "com-logo04.png",
  "com-logo05.png"
];

const stats = [
  { value: "100", unit: "%", label: "Success Rate" },
  { value: "5", unit: ".0", label: "Average rating" },
  { value: "44", unit: "K", label: "Total Candidates" },
  { value: "12", unit: "+", label: "Award in School Recruitment Category" }
];

export default AboutPage;