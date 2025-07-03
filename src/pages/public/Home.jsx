import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Users, GraduationCap, FileSearch, Briefcase } from 'lucide-react';
import { FaSquarePen, FaSuitcase, FaUsers } from 'react-icons/fa6';
import { IoDocumentText } from 'react-icons/io5';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('All Locations');
  const [locations, setLocations] = useState(['All Locations', 'India', 'Remote']);
  const [jobTitles, setJobTitles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://edujobzbackend.onrender.com/employer/fetchjobs');
        if (!response.ok) {
          throw new Error('Failed to fetch job data');
        }
        const data = await response.json();
        
        // Extract unique locations
        const jobLocations = [...new Set(
          data.flatMap(job => 
            job.isRemote ? ['Remote'] : [job.location || 'India']
          )
        )].filter(Boolean);
        
        // Extract unique job titles and categories
        const titles = [...new Set(data.map(job => job.jobTitle))].filter(Boolean);
        const cats = [...new Set(data.map(job => job.category))].filter(Boolean);
        
        setLocations(['All Locations', 'India', 'Remote', ...jobLocations]);
        setJobTitles(titles);
        setCategories(cats);
        setError(null);
      } catch (err) {
        setError(err.message);
        setLocations(['All Locations', 'India', 'Remote']); // Fallback options
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Prepare search parameters
    const params = new URLSearchParams();
    
    if (searchTerm.trim()) {
      params.append('keyword', searchTerm.trim());
    }
    
    if (location && location !== 'All Locations') {
      params.append('location', location);
    }
    
    // Navigate to job vacancies with search parameters
    navigate(`/job-vacancies?${params.toString()}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="visual-block visual-theme-9 bg-white pt-100 pb-30 pb-md-80 pb-lg-140 text-white" style={{ backgroundImage: 'none' }}>
        <div className="container position-relative">
          <div className="row justify-content-between">
            <div className="col-12 col-lg-12 col-xl-12 position-relative">
              <div className="visual-textbox">
                <h2 align="center" className="text-secondary mb-0">Edujobz: A Platform for Educators at Every Level</h2>
                <p align="center" className="text-dark">
                  Discover <b className="text-primary">294,881+</b> Open Positions Within Our Network of <b className="text-primary">11,921</b> Educational Partners.
                </p>
                
                {/* Search Form */}
                <form 
                  className="form-search bg-light-sky" 
                  onSubmit={handleSearch}
                  style={{ margin: '0px auto', borderRadius: '35px' }}
                >
                  <div className="fields-holder bg-white text-black d-flex flex-wrap flex-md-nowrap">
                    <div className="form-group">
                      <i className="icon icon-briefcase3 text-secondary"></i>
                      <input 
                        className="form-control bg-white" 
                        type="search" 
                        placeholder="Job title, Keyword..."  
                        style={{width: '300px',outline: 'none',boxShadow: 'none',color: '#333'}}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        disabled={loading}
                        list="jobTitles"
                      />
                      <datalist id="jobTitles">
                        {jobTitles.map((title, index) => (
                          <option key={`title-${index}`} value={title} />
                        ))}
                        {categories.map((category, index) => (
                          <option key={`cat-${index}`} value={category} />
                        ))}
                      </datalist>
                    </div>
                    <div className="form-group">
                      <i className="icon icon-map-pin text-secondary"></i>
                      <select 
                        className="select2 bg-white" 
                        name="state"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        style={{ border: 'none', boxShadow: 'none', outline: 'none' }}
                        disabled={loading}
                      >
                        {locations.map((loc, index) => (
                          <option key={`loc-${index}`} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button 
                    style={{ minWidth: '165px' }} 
                    className="btn btn-blue btn-sm" 
                    type="submit"
                    disabled={loading}
                  >
                    <span className="btn-text">
                      {loading ? (
                        'Loading...'
                      ) : (
                        <>
                          <FaSearch className="mr-1" /> &nbsp; Search Job
                        </>
                      )}
                    </span>
                  </button>
                  {error && (
                    <div className="text-danger small mt-2">
                      Couldn't load all locations: {error}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Rest of your existing content */}
      <main className="main">
        {/* Browse Categories Section */}
        <section className="section section-theme-9 browse_categories" style={{ backgroundImage: 'url(/images/bg_img04.jpg)' }}>
          <div className="container">
            <div className="section-header text-center mb-40 mb-md-45" style={{ maxWidth: '800px' }}>
              <p>Invest in Your Future: Join Our Thriving Educational Network</p>
              <h2><span className="text-outlined text-secondary">Browse by Category</span></h2>
              <b>Discover Career Advancement Within Our Network of Educational Professionals</b>
            </div>
            
            <div className="row">
              {/* Category Items */}
              {[
                { title: "Teaching Jobs", jobs: "2", iconBlue: "/images/img_20.png", iconWhite: "/images/img_20_white.png" },
                { title: "Leadership and Administration", jobs: "14", iconBlue: "/images/leadership.png", iconWhite: "/images/leadership1.png" },
                { title: "Support and Student Welfare", jobs: "12", iconBlue: "/images/img_25.png", iconWhite: "/images/img_25_white.png" },
                { title: "Extracurricular Activities", jobs: "06", iconBlue: "/images/img_22.png", iconWhite: "/images/img_22_white.png" },
                { title: "Curriculum and Content Development", jobs: "16", iconBlue: "/images/img_23.png", iconWhite: "/images/img_23_white.png" },
                { title: "EdTech and Digital Learning", jobs: "6", iconBlue: "/images/img_24.png", iconWhite: "/images/img_24_white.png" },
                { title: "Special Education and Inclusive Learning", jobs: "2", iconBlue: "/images/special.png", iconWhite: "/images/special1.png" },
                { title: "Non-Teaching Staffs", jobs: "14", lucideIcon: FaUsers },
                { title: "Training and Development", jobs: "12", lucideIcon: FaSquarePen },
                { title: "Research and Policy Development", jobs: "06", lucideIcon: IoDocumentText },
                { title: "Other Specialized Roles", jobs: "06", lucideIcon: FaSuitcase },
              ].map((category, index) => (
                <div key={index} className={`col-6 col-lg-4 col-xl-3 ${index % 2 === 0 ? 'pe-5' : 'ps-5'} mb-30 mb-md-50`} align="center">
                  <div className="info_box">
                    <div className="wrap_info">
                      <div className="icon_wrap">
                        {category.lucideIcon ? (
                          <>
                            <category.lucideIcon className="blueImg" size={32} color="#3f71ef" />
                            <category.lucideIcon className="whiteImg" size={32} color="#ffffff" />
                          </>
                        ) : category.icon ? (
                          <>
                            <i className={`blueImg fa fa-${category.icon} fa-2xl`}></i>
                            <i className={`whiteImg fa fa-${category.icon} fa-2xl`}></i>
                          </>
                        ) : (
                          <>
                            <img className="blueImg" src={category.iconBlue} alt="img" width={category.title === "Leadership and Administration" ? "70%" : ""} />
                            <img className="whiteImg" src={category.iconWhite} alt="img" width={category.title === "Leadership and Administration" ? "70%" : ""} />
                          </>
                        )}
                      </div>
                      <div className="text_wrap">
                        <strong className="title">{category.title}</strong>
                        <hr />
                        <p>{category.jobs} Jobs available</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Images between categories */}
              <div className="col-12 col-xl-3 mb-15 browse_categories_image">
                <img src="/images/image.jpg" width="100%" style={{ borderRadius: '20px' }} alt="Education" />
              </div>
              <div className="col-12 col-xl-3 mb-15 browse_categories_image1">
                <img src="/images/image.jpg" width="100%" style={{ borderRadius: '20px' }} alt="Education" />
              </div>
            </div>
          </div>
        </section>

        {/* Jobs Waiting Section */}
        <section className="section section-theme-9 jobs_waiting bg-light-sky">
          <div className="container">
            <div className="holder">
              <div className="left_align">
                <div className="icon-hold">
                  <img src="/images/img_39.svg" alt="Jobs" />
                </div>
                <div className="text-white">
                  <h2 className="text-secondary">Your Ideal Jobs Awaits.</h2>
                  <p className="text-dark fw-bold">Access over 1 Million Educational Opportunities and Find Your Ideal Role.</p>
                </div>
              </div>
              <div className="right_align">
                <Link to="/job-vacancies" className="btn btn-white btn-sm">
                  <i className="icon icon-search"></i> &nbsp; Search Job
                </Link>
                <Link to="/employee-registration" className="btn btn-secondary btn-sm">
                  <span className="btn-text"><i className="icon icon-users text-primary" style={{ fontSize: '13px' }}></i> &nbsp; Apply Job</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="section section-theme-9 works_area">
          <div className="container">
            <div className="section-header text-center">
              <h2><span className="text-outlined text-secondary">How It Works?</span></h2>
              <p><b>for Job Seekers</b></p>
            </div>
            <div className="row">
              {[
                { 
                  step: "01", 
                  title: "Sign Up/Register", 
                  description: "Begin by creating a profile on our website. This step allows you to highlight your qualifications, experience, and skills to attract potential employers.",
                  icon: "/images/img_14.svg" 
                },
                { 
                  step: "02", 
                  title: "Career Search", 
                  description: "After setting up your profile, you can easily browse for job opportunities. Use filters like location, job title, or specific keywords to find the right match.",
                  icon: "/images/img_15.svg" 
                },
                { 
                  step: "03", 
                  title: "Apply Now", 
                  description: "Once you find a job that interests you, simply apply directly through our platform, streamlining the process and saving you valuable time.",
                  icon: "/images/img_16.svg" 
                },
              ].map((step, index) => (
                <div key={index} className="col-12 mb-30 mb-lg-0 col-lg-4 d-flex">
                  <div className="works_info_column" style={{ border: '1px solid #063970', borderRadius: '5px', backgroundImage: 'url(/images/bg-visual-15.jpg)' }}>
                    <div className="wrap">
                      <strong className="title">{step.step}. {step.title}</strong>
                      <div className="img_holder shadow">
                        <img src={step.icon} alt="step" />
                      </div>
                      <p>{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Get Hired Section */}
        <section className="section section-theme-1 section-how-works pt-45 pt-md-50 pt-lg-65 pt-xl-85 pt-xxl-110 pb-60 pb-md-80 pb-xl-85 pb-xxl-110 pb-xxxl-150 bg-light">
          <div className="container">
            <header className="section-header text-center mb-30 mb-md-45 mb-xl-60">
              <h3 className="text-dark mb-0"><b>04. Get Hired</b></h3>
            </header>
            <div className="row mb-lg-60 mb-xl-90">
              {[
                { 
                  step: "4.1", 
                  title: "Interview Scheduling", 
                  description: "Employers can schedule interviews with selected candidates through the platform.",
                  icon: "/images/line-icon06.png" 
                },
                { 
                  step: "4.2", 
                  title: "Online Interviews", 
                  description: "Conduct interviews seamlessly with video integrated conferencing tools.",
                  icon: "/images/line-icon07.png" 
                },
                { 
                  step: "4.3", 
                  title: "Offer Letter", 
                  description: "Employer can send job offers directly to candidates via the platform, simplifying the hiring process.",
                  icon: "/images/line-icon08.png" 
                },
              ].map((step, index) => (
                <div key={index} className="col-4 col-md-4 text-center mb-30 mb-md-0">
                  <div className="how-work-box">
                    <div className="icon bg-primary">
                      <img src={step.icon} alt="Step" />
                    </div>
                    <strong className="num">{step.step}</strong>
                    <strong className="h5 text-secondary">{step.title}</strong>
                    <p align="center" style={{ fontSize: '14px' }}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="row">
              <div className="col-12">
                <div className="matched-jobs-block shadow border border-dark" style={{ backgroundImage: 'url(/images/bg-visual-15.jpg)' }}>
                  <div className="bg-pattern">
                    <img src="/images/bg-pattern-overlay1.jpg" alt="bg Pattern" />
                  </div>
                  <div className="section-header">
                    <h2 className="text-secondary">Get your Matched Jobs in a few <span className="text-outlined">minutes</span>.</h2>
                    <p className="text-dark">Find your dream job & earn from the leading Employer. </p>
                    <Link to="/post-job" className="btn btn-blue fw-bold border border-dark shadow">
                      <span className="btn-text"><i className="icon-upload-cloud"></i> Upload Your CV</span>
                    </Link>
                  </div>
                  <div className="image-holder">
                    <img src="/images/image-circle.png" width="462" height="436" alt="Matched Jobs" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section section-theme-9 featured_Jobs_Block" style={{ padding: '80px 0px' }}>
          <div className="container">
            <div className="client_testimonials">
              <header className="section-header">
                <h2 className="text-secondary">Client's Testimonials</h2>
                <p>1,00,000+ satisfied Employer and candidates. What they said.</p>
              </header>
              <div className="client_testimonials_slider">
                {[
                  { 
                    name: "Linda Svennsky", 
                    role: "Great quality i am 100% Satisfied",
                    img: "/images/img_33.jpg",
                    quote: "Vestibulum orci felis, ullamcorper non conum non, ultrices ac nunc. Mauris non ligscipit, vulputate mi accumsan, dapi bus fe lam sed sapien dc nunc non,uiem non porta."
                  },
                  { 
                    name: "Roman Lorance", 
                    role: "Great quality i am 100% Satisfied",
                    img: "/images/img_34.jpg",
                    quote: "Vestibulum orci felis, ullamcorper non conum non, ultrices ac nunc. Mauris non ligscipit, vulputate mi accumsan, dapi bus fe lam sed sapien dc nunc non,uiem non porta."
                  },
                  { 
                    name: "Petar Walim", 
                    role: "Great quality i am 100% Satisfied",
                    img: "/images/img_35.png",
                    quote: "Vestibulum orci felis, ullamcorper non conum non, ultrices ac nunc. Mauris non ligscipit, vulputate mi accumsan, dapi bus fe lam sed sapien dc nunc non,uiem non porta."
                  },
                ].map((testimonial, index) => (
                  <div key={index}>
                    <div className="client_review border border-dark">
                      <div className="heading_bar">
                        <div className="text_wrap">
                          <strong className="h5">{testimonial.name}</strong>
                          <span className="text">{testimonial.role}</span>
                        </div>
                        <div className="img_wrap">
                          <img src={testimonial.img} alt="Client" />
                        </div>
                      </div>
                      <div className="stars_bar">
                        <div className="stars_wrap">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className="icon icon-star"></i>
                          ))}
                        </div>
                      </div>
                      <p>"{testimonial.quote}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* App Download Section */}
        <section className="apps-block section-theme-9 bg-light-sky">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-md-6 col-lg-5">
                <div className="text">
                  <h2 className="text-secondary" style={{ lineHeight: '48px' }}>App Available Now – Finds Them For You Right Job.</h2>
                  <hr />
                  <p>Download and install ont-time installable app for your android or IOS device and find people or jobs smart.</p>
                  <div className="download-btns">
                    <Link className="btn-app btn-play-store blue-btn" to="#">
                      <div className="store-icon">
                        <img src="/images/icon-play-store.png" width="28" height="30" alt="Google Play" />
                      </div>
                      <div className="btn-text">
                        Download From <span>Google Play</span>
                      </div>
                    </Link>
                    <Link className="btn-app btn-app-store" to="#">
                      <div className="store-icon">
                        <img src="/images/icon-app-store.png" width="32" height="38" alt="App Store" />
                      </div>
                      <div className="btn-text">
                        Download From <span>App Store</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-7">
                <div className="image-holder d-flex justify-content-center">
                  <img src="/images/image.png" alt="App Preview" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;