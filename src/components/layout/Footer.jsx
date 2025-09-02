import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer footer-theme-9 bg-secondary" style={{ paddingTop: '80px' }}>
      <div className="container">
        <div className="wrap_footer">
          <div className="subscription">
            <div className="text-holder">
              <strong className="title text-primary" style={{ fontSize: '36px' }}>Let's Keep in Touch!</strong>
              <p>Subscribe to keep up with news and exciting updates.</p>
            </div>
            <form className="subscription-form">
              <input type="email" className="form-control" placeholder="Enter your email address...." />
              <button className="btn btn-primary " type="submit">
                <span className="btn-text">Subscribe</span>
              </button>
            </form>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-3">
              <div className="contact_info_holder">
                <div className="footer-logo">
                  <img src="/images/logo.png" alt="logo" />
                </div>
                <ul className="contact-info-list">
                  <li>
                    <strong className="left-title text-primary" style={{ width: '120px' }}>
                      <i className="icon icon-email"></i> &nbsp; Email:
                    </strong>
                    <span className="sub-text">
                      <a href="mailto:support@edprofio.com">support@edprofio.com</a>
                    </span>
                  </li>
                  <li>
                    <strong className="left-title text-primary" style={{ width: '120px' }}>
                      <i className="icon icon-phone"></i> &nbsp; Phone:
                    </strong>
                    <span className="sub-text">
                      <a href="tel:">(+91) 123 456 7890</a>
                    </span>
                  </li>
                  <li>
                    <strong className="left-title text-primary" style={{ width: '120px' }}>
                      <i className="icon icon-map-pin"></i> &nbsp; Location:
                    </strong>
                    <span className="sub-text">Bangalore, Karnataka, India</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-5">
              <div className="footer-links-holder">
                <div className="row">
                  <div className="col-5">
                    <strong className="h5 text-primary">Quick Links</strong>
                    <ul className="footer-links">
                      <li><Link to="/jobs">Browse Jobs</Link></li>
                      <li><Link to="/candidates">Browse Candidates</Link></li>
                      <li><Link to="/candidate-dashboard">Candidate Dashboard</Link></li>
                      <li><Link to="/job-alerts">Job Alerts</Link></li>
                      <li><Link to="/bookmarks">My Bookmarks</Link></li>
                    </ul>
                  </div>
                  <div className="col-7">
                    <strong className="h5 text-primary">Category</strong>
                    <ul className="footer-links">
                      <li><Link to="/education-jobs">Education Job Portal</Link></li>
                      <li><Link to="/teaching-jobs">Teaching Jobs</Link></li>
                      <li><Link to="/school-recruitment">School Recruitment</Link></li>
                      <li><Link to="/education-careers">Education Careers</Link></li>
                      <li><Link to="/edtech-jobs">EdTech Jobs</Link></li>
                      <li><Link to="/admin-jobs">Administrative Jobs in Education</Link></li>
                      <li><Link to="/institute-hiring">Educational Institute Hiring Platform</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 mt-30 mt-lg-0 col-lg-4">
              <div className="finder bg-white border border-primary shadow" style={{ border: '1px solid #fff' }}>
                <strong className="h3 text-dark">Let Employers Find You</strong>
                <p align="justify" className="text-secondary">
                  Advertise your jobs to millions of candidates and search 15.8 million CVs through EdProfio.
                </p>
                <Link className="btn_upload bg-light-sky border border-secondary" to="/upload-cv">
                  <i className="icon icon-upload-cloud"></i>
                  <span className="text">Upload Your CV</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="bottom-footer">
            <p>
              Copyright © 2025 <Link to="/">EdProfio</Link>. All Rights Reserved. 
              Powered by <a href="https://sensitive.co.in/">Sensitive Technologies</a>.
            </p>
            <ul className="social_links">
              <li>
                <a href="#">
                  <i className="icon icon-facebook"></i>
                  <span className="text">Facebook</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon icon-youtube"></i>
                  <span className="text">Youtube</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon icon-instagram"></i>
                  <span className="text">Instagram</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon icon-linkedin"></i>
                  <span className="text">Linked In</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;