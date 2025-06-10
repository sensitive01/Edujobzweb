import React, { useState } from 'react';
import { FaSearch, FaCheckCircle, FaChevronRight, FaStar, FaMapMarkerAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const PremiumAdvancedSearch = () => {
  // State for filters
  const [category, setCategory] = useState('Principle');
  const [keyAttributes, setKeyAttributes] = useState({
    communicationSkills: false,
    excel: false
  });
  const [salaryRange, setSalaryRange] = useState({ min: 0, max: 100000 });
  const [joiningTime, setJoiningTime] = useState('Less than 21 days');
  const [talentQuality, setTalentQuality] = useState({
    topRatedPlus: false,
    topRated: false,
    risingTalent: false
  });
  const [englishLevel, setEnglishLevel] = useState('Fluent');
  const [rating, setRating] = useState('2 stars');
  const [location, setLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Newest Jobs');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // State to manage accordion sections
  const [openAccordions, setOpenAccordions] = useState({
    category: true,     // First one open by default
    keyAttributes: false,
    salary: false,
    joining: false,
    talentDetails: false,
  });

  // Handle filter changes
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleKeyAttributeChange = (attr) => setKeyAttributes({...keyAttributes, [attr]: !keyAttributes[attr]});
  const handleSalaryChange = (e) => {
    const {name, value} = e.target;
    setSalaryRange({...salaryRange, [name]: parseInt(value)});
  };
  const handleJoiningTimeChange = (e) => setJoiningTime(e.target.value);
  const handleTalentQualityChange = (quality) => setTalentQuality({...talentQuality, [quality]: !talentQuality[quality]});
  const handleEnglishLevelChange = (e) => setEnglishLevel(e.target.value);
  const handleRatingChange = (e) => setRating(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSortChange = (e) => setSortBy(e.target.value);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  // Accordion toggle handler
  const toggleAccordion = (accordionKey) => {
    setOpenAccordions(prev => ({
      ...prev,
      [accordionKey]: !prev[accordionKey]
    }));
  };

  // Apply filters
  const applyFilters = (e) => {
    e.preventDefault();
    // Filter logic would go here
    console.log('Filters applied');
  };

  // Clear filters
  const clearFilters = (e) => {
    e.preventDefault();
    setCategory('Principle');
    setKeyAttributes({ communicationSkills: false, excel: false });
    setSalaryRange({ min: 0, max: 100000 });
    setJoiningTime('Less than 21 days');
    setTalentQuality({ topRatedPlus: false, topRated: false, risingTalent: false });
    setEnglishLevel('Fluent');
    setRating('2 stars');
    setLocation('');
  };

  // Sample job data
  const jobs = [
    {
      id: 1,
      company: 'Royal Public School',
      location: 'Bengaluru, Karnataka',
      position: 'PGT Teacher',
      subject: 'Physics',
      salary: '₹ 30,000 to ₹ 45,000',
      type: 'Intership',
      posted: '11 hours ago',
      logo: 'company-logo01.jpg'
    },
    {
      id: 2,
      company: 'Royal Public School',
      location: 'Bengaluru, Karnataka',
      position: 'PGT Teacher',
      subject: 'Kannada',
      salary: '₹ 30,000 to ₹ 45,000',
      type: 'Intership',
      posted: '11 hours ago',
      logo: 'company-logo02.jpg'
    },
    {
      id: 3,
      company: 'Royal Public School',
      location: 'Bengaluru, Karnataka',
      position: 'PGT Teacher',
      subject: 'English',
      salary: '₹ 30,000 to ₹ 45,000',
      type: 'Intership',
      posted: '11 hours ago',
      logo: 'company-logo03.jpg'
    },
    {
      id: 4,
      company: 'Royal Public School',
      location: 'Bengaluru, Karnataka',
      position: 'PGT Teacher',
      subject: 'Hindi',
      salary: '₹ 30,000 to ₹ 45,000',
      type: 'Full Time',
      posted: '11 hours ago',
      logo: 'company-logo04.jpg'
    },
    {
      id: 5,
      company: 'Royal Public School',
      location: 'Bengaluru, Karnataka',
      position: 'PGT Teacher',
      subject: 'Social Science',
      salary: '₹ 30,000 to ₹ 45,000',
      type: 'Full Time',
      posted: '11 hours ago',
      logo: 'company-logo05.jpg'
    },
    {
      id: 6,
      company: 'Royal Public School',
      location: 'Bengaluru, Karnataka',
      position: 'PGT Teacher',
      subject: 'Science',
      salary: '₹ 30,000 to ₹ 45,000',
      type: 'Intership',
      posted: '11 hours ago',
      logo: 'company-logo06.jpg'
    },
    {
      id: 7,
      company: 'Royal Public School',
      location: 'Bengaluru, Karnataka',
      position: 'PGT Teacher',
      subject: 'Chemistry',
      salary: '₹ 30,000 to ₹ 45,000',
      type: 'Full Time',
      posted: '11 hours ago',
      logo: 'company-logo07.jpg'
    },
    {
      id: 8,
      company: 'Royal Public School',
      location: 'Bengaluru, Karnataka',
      position: 'PGT Teacher',
      subject: 'Mathematics',
      salary: '₹ 30,000 to ₹ 45,000',
      type: 'Part Time',
      posted: '11 hours ago',
      logo: 'company-logo08.jpg'
    }
  ];

  return (
    <>
      {/* Sub Visual of the page */}
      <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 pt-lg-150 pb-30 text-white">
        <div className="container position-relative text-center">
          <div className="row">
            <div className="col-12">
              <div className="subvisual-textbox">
                <h1 className="text-primary mb-0">Careers @ EduJobz</h1>
                <p>job duties, job responsibilities, and skills required</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="jobplugin__main">
        <div className="jobplugin__main-holder">
          <span className="jobplugin__pattern default-right"></span>
          <span className="jobplugin__pattern default-left"></span>
          <div className="jobplugin__visual-pattern">
            <img src="images/visual-pattern.png" alt="Image Description" />
          </div>
          <div className="jobplugin__container">
            {/* Main Head */}
            <div className="jobplugin__main-head">
              {/* Breadcrumbs */}
              <ul className="jobplugin__breadcrumbs">
                <li className="jobplugin__breadcrumbs-home">
                  <a className="hover:jobplugin__text-primary" href="#">
                    <span className="rj-icon rj-home"></span>
                  </a>
                </li>
                <li><a className="hover:jobplugin__text-primary" href="#">Jobs</a></li>
                <li>Search</li>
              </ul>
            </div>

            {/* Page Search Form */}
            <div className="jobplugin__search">
              <input 
                className="form-control" 
                type="search" 
                placeholder="Search Project"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button className="jobplugin__search-btn bg-primary hover:bg-secondary">
                <FaSearch className="rj-icon rj-search" />
              </button>
            </div>

            {/* Results Block */}
            <div className="jobplugin__results">
              {/* Results Aside - Filters */}
              <aside className={`jobplugin__results-aside ${sidebarOpen ? 'open' : ''}`}>
                {/* Results Aside Header */}
                <div className="jobplugin__results-aside__header">
                  <h2 className="h5 jobplugin__text-secondary">Filters</h2>
                  <button 
                    className="jobplugin__results-aside__opener jobplugin__text-primary hover:jobplugin__bg-primary hover:jobplugin__text-white" 
                    type="button"
                    onClick={toggleSidebar}
                  >
                    <span className="jobplugin__results-aside__opener-bar"></span>
                    <span className="jobplugin__results-aside__opener-overlay"></span>
                  </button>
                </div>

                {/* Results Aside Holder */}
                <div className="jobplugin__results-aside__holder">
                  {/* Results Aside Close */}
                  <button 
                    type="button" 
                    className="jobplugin__results-aside__close"
                    onClick={toggleSidebar}
                  >
                    <span className="jobplugin__bg-primary"></span>
                    <span className="jobplugin__bg-primary"></span>
                  </button>

                  <form onSubmit={applyFilters}>
                    {/* Category Filter */}
                    <div className={`jobplugin__results-aside__box ${openAccordions.category ? 'active' : ''}`}>
                      <div 
                        className="jobplugin__results-aside__head jobplugin__results-aside__boxopener"
                        onClick={() => toggleAccordion('category')}
                        style={{ cursor: 'pointer' }}
                      >
                        <h2 className="h6">Category</h2>
                        <span className="jobplugin__results-aside__button"></span>
                      </div>
                      <div className="jobplugin__results-aside__drop">
                        <div className="jobplugin__results-aside__row">
                          <ul className="jobplugin__results-aside__list">
                            <li>
                              <label className="jobplugin__form-radio">
                                <input 
                                  type="radio" 
                                  name="group01" 
                                  checked={category === 'All Categories'}
                                  onChange={() => setCategory('All Categories')}
                                />
                                <span className="jobplugin__form-radio__btn"></span>
                                <span className="label-text">All Categories</span>
                              </label>
                            </li>
                            <li>
                              <label className="jobplugin__form-radio">
                                <input 
                                  type="radio" 
                                  name="group01" 
                                  checked={category === 'Teachers'}
                                  onChange={() => setCategory('Teachers')}
                                />
                                <span className="jobplugin__form-radio__btn"></span>
                                <span className="label-text">Teachers (11,108)</span>
                              </label>
                            </li>
                            <li>
                              <label className="jobplugin__form-radio">
                                <input 
                                  type="radio" 
                                  name="group01" 
                                  checked={category === 'Administrative'}
                                  onChange={() => setCategory('Administrative')}
                                />
                                <span className="jobplugin__form-radio__btn"></span>
                                <span className="label-text">Administrative (4,305)</span>
                              </label>
                            </li>
                            <li>
                              <label className="jobplugin__form-radio">
                                <input 
                                  type="radio" 
                                  name="group01" 
                                  checked={category === 'Principle'}
                                  onChange={() => setCategory('Principle')}
                                />
                                <span className="jobplugin__form-radio__btn"></span>
                                <span className="label-text">Principle (3,049)</span>
                              </label>
                            </li>
                            <li>
                              <label className="jobplugin__form-radio">
                                <input 
                                  type="radio" 
                                  name="group01" 
                                  checked={category === 'Senior Staffs'}
                                  onChange={() => setCategory('Senior Staffs')}
                                />
                                <span className="jobplugin__form-radio__btn"></span>
                                <span className="label-text">Senior Staffs (2,945)</span>
                              </label>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Key Attributes Filter */}
                    <div className={`jobplugin__results-aside__box ${openAccordions.keyAttributes ? 'active' : ''}`}>
                      <div 
                        className="jobplugin__results-aside__head jobplugin__results-aside__boxopener"
                        onClick={() => toggleAccordion('keyAttributes')}
                        style={{ cursor: 'pointer' }}
                      >
                        <h2 className="h6">Key Attributes</h2>
                        <span className="jobplugin__results-aside__button"></span>
                      </div>
                      <div className="jobplugin__results-aside__drop">
                        <div className="jobplugin__results-aside__row">
                          <strong className="jobplugin__results-aside__row-title">Main Type</strong>
                          <ul className="jobplugin__results-aside__list">
                            <li>
                              <label className="jobplugin__form-checkbox">
                                <input 
                                  type="checkbox" 
                                  checked={keyAttributes.communicationSkills}
                                  onChange={() => handleKeyAttributeChange('communicationSkills')}
                                />
                                <span className="jobplugin__form-checkbox__btn"></span>
                                <span className="label-text">Communication Skills (5,241)</span>
                              </label>
                            </li>
                            <li>
                              <label className="jobplugin__form-checkbox">
                                <input 
                                  type="checkbox" 
                                  checked={keyAttributes.excel}
                                  onChange={() => handleKeyAttributeChange('excel')}
                                />
                                <span className="jobplugin__form-checkbox__btn"></span>
                                <span className="label-text">Excel (3,028)</span>
                              </label>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Salary Filter */}
                    <div className={`jobplugin__results-aside__box ${openAccordions.salary ? 'active' : ''}`}>
                      <div 
                        className="jobplugin__results-aside__head jobplugin__results-aside__boxopener"
                        onClick={() => toggleAccordion('salary')}
                        style={{ cursor: 'pointer' }}
                      >
                        <h2 className="h6">Salary</h2>
                        <span className="jobplugin__results-aside__button"></span>
                      </div>
                      <div className="jobplugin__results-aside__drop">
                        <div className="jobplugin__results-aside__row">
                          <strong className="jobplugin__results-aside__row-title">Select range</strong>
                          <div className="jobplugin__results-aside__rangebox">
                            <div className="jobplugin__results-aside__range-values">
                              <div className="jobplugin__results-aside__range-price">$ <span id="min-amount">{salaryRange.min}</span></div>
                              <div className="jobplugin__results-aside__range-price">$ <span id="max-amount">{salaryRange.max}</span></div>
                            </div>
                            <div className="jobplugin__results-aside__range">
                              <input 
                                type="range" 
                                min="0" 
                                max="100000" 
                                step="1000"
                                value={salaryRange.min}
                                onChange={(e) => setSalaryRange({...salaryRange, min: parseInt(e.target.value)})}
                              />
                              <input 
                                type="range" 
                                min="0" 
                                max="100000" 
                                step="1000"
                                value={salaryRange.max}
                                onChange={(e) => setSalaryRange({...salaryRange, max: parseInt(e.target.value)})}
                              />
                            </div>
                            <div className="jobplugin__results-aside__range-fields">
                              <div className="jobplugin__results-aside__range-field">
                                <span className="jobplugin__results-aside__range-label">Min</span>
                                <div className="jobplugin__results-aside__range-fieldwrap">
                                  <span className="jobplugin__results-aside__range-type jobplugin__text-primary">$</span>
                                  <input 
                                    type="number" 
                                    name="min"
                                    value={salaryRange.min}
                                    onChange={handleSalaryChange}
                                  />
                                </div>
                              </div>
                              <div className="jobplugin__results-aside__range-field">
                                <span className="jobplugin__results-aside__range-label">Max</span>
                                <div className="jobplugin__results-aside__range-fieldwrap">
                                  <span className="jobplugin__results-aside__range-type jobplugin__text-primary">$</span>
                                  <input 
                                    type="number" 
                                    name="max"
                                    value={salaryRange.max}
                                    onChange={handleSalaryChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="jobplugin__results-aside__foot">
                          <button type="submit" className="jobplugin__button jobplugin__bg-primary hover:jobplugin__bg-secondary small">Apply</button>
                          <button type="button" onClick={clearFilters} className="jobplugin__button button-white button-link hover:jobplugin__bg-primary hover:jobplugin__text-white small">Clear</button>
                        </div>
                      </div>
                    </div>

                    {/* Joining Time Filter */}
                    <div className={`jobplugin__results-aside__box ${openAccordions.joining ? 'active' : ''}`}>
                      <div 
                        className="jobplugin__results-aside__head jobplugin__results-aside__boxopener"
                        onClick={() => toggleAccordion('joining')}
                        style={{ cursor: 'pointer' }}
                      >
                        <h2 className="h6">Joining</h2>
                        <span className="jobplugin__results-aside__button"></span>
                      </div>
                      <div className="jobplugin__results-aside__drop">
                        <div className="jobplugin__results-aside__row">
                          <ul className="jobplugin__results-aside__list">
                            <li>
                              <label className="jobplugin__form-radio">
                                <input 
                                  type="radio" 
                                  name="group02" 
                                  checked={joiningTime === 'Any time'}
                                  onChange={() => setJoiningTime('Any time')}
                                />
                                <span className="jobplugin__form-radio__btn"></span>
                                <span className="label-text">Any time(59,984)</span>
                              </label>
                            </li>
                            <li>
                              <label className="jobplugin__form-radio">
                                <input 
                                  type="radio" 
                                  name="group02" 
                                  checked={joiningTime === 'Immediate'}
                                  onChange={() => setJoiningTime('Immediate')}
                                />
                                <span className="jobplugin__form-radio__btn"></span>
                                <span className="label-text">Immediate(21,542)</span>
                              </label>
                            </li>
                            <li>
                              <label className="jobplugin__form-radio">
                                <input 
                                  type="radio" 
                                  name="group02" 
                                  checked={joiningTime === 'Less than 7 days'}
                                  onChange={() => setJoiningTime('Less than 7 days')}
                                />
                                <span className="jobplugin__form-radio__btn"></span>
                                <span className="label-text">Less than 7 days(56,833)</span>
                              </label>
                            </li>
                            <li>
                              <label className="jobplugin__form-radio">
                                <input 
                                  type="radio" 
                                  name="group02" 
                                  checked={joiningTime === 'Less than 21 days'}
                                  onChange={() => setJoiningTime('Less than 21 days')}
                                />
                                <span className="jobplugin__form-radio__btn"></span>
                                <span className="label-text">Less than 21 days(59,299)</span>
                              </label>
                            </li>
                          </ul>
                        </div>
                        <div className="jobplugin__results-aside__foot">
                          <button type="submit" className="jobplugin__button jobplugin__bg-primary hover:jobplugin__bg-secondary small">Apply</button>
                          <button type="button" onClick={clearFilters} className="jobplugin__button button-white button-link hover:jobplugin__bg-primary hover:jobplugin__text-white small">Clear</button>
                        </div>
                      </div>
                    </div>

                    {/* Talent Details Filter */}
                    <div className={`jobplugin__results-aside__box ${openAccordions.talentDetails ? 'active' : ''}`}>
                      <div 
                        className="jobplugin__results-aside__head jobplugin__results-aside__boxopener"
                        onClick={() => toggleAccordion('talentDetails')}
                        style={{ cursor: 'pointer' }}
                      >
                        <h2 className="h6">Talent Details</h2>
                        <span className="jobplugin__results-aside__button"></span>
                      </div>
                      <div className="jobplugin__results-aside__drop">
                        <div className="jobplugin__results-aside__row">
                          <strong className="jobplugin__results-aside__row-title">Talent Quality</strong>
                          <ul className="jobplugin__results-aside__list">
                            <li>
                              <label className="jobplugin__form-checkbox">
                                <input 
                                  type="checkbox" 
                                  checked={talentQuality.topRatedPlus}
                                  onChange={() => handleTalentQualityChange('topRatedPlus')}
                                />
                                <span className="jobplugin__form-checkbox__btn"></span>
                                <span className="label-text">Top Rated Plus (1,344)</span>
                              </label>
                            </li>
                            <li>
                              <label className="jobplugin__form-checkbox">
                                <input 
                                  type="checkbox" 
                                  checked={talentQuality.topRated}
                                  onChange={() => handleTalentQualityChange('topRated')}
                                />
                                <span className="jobplugin__form-checkbox__btn"></span>
                                <span className="label-text">Top Rated (4,510)</span>
                              </label>
                            </li>
                            <li>
                              <label className="jobplugin__form-checkbox">
                                <input 
                                  type="checkbox" 
                                  checked={talentQuality.risingTalent}
                                  onChange={() => handleTalentQualityChange('risingTalent')}
                                />
                                <span className="jobplugin__form-checkbox__btn"></span>
                                <span className="label-text">Rising Talent (5,733)</span>
                              </label>
                            </li>
                          </ul>
                        </div>

                        <div className="jobplugin__results-aside__row">
                          <strong className="jobplugin__results-aside__row-title">English Level</strong>
                          <ul className="jobplugin__results-aside__list">
                            <li>
                              <label className="jobplugin__form-radio">
                                <input 
                                  type="radio" 
                                  name="group03" 
                                  checked={englishLevel === 'Any level'}
                                  onChange={() => setEnglishLevel('Any level')}
                                />
                                <span className="jobplugin__form-radio__btn"></span>
                                <span className="label-text">Any level(59,931)</span>
                              </label>
                            </li>
                            <li>
                              <label className="jobplugin__form-radio">
                                <input 
                                  type="radio" 
                                  name="group03" 
                                  checked={englishLevel === 'Basic'}
                                  onChange={() => setEnglishLevel('Basic')}
                                />
                                <span className="jobplugin__form-radio__btn"></span>
                                <span className="label-text">Basic(59,931)</span>
                              </label>
                            </li>
                            <li>
                              <label className="jobplugin__form-radio">
                                <input 
                                  type="radio" 
                                  name="group03" 
                                  checked={englishLevel === 'Conversational'}
                                  onChange={() => setEnglishLevel('Conversational')}
                                />
                                <span className="jobplugin__form-radio__btn"></span>
                                <span className="label-text">Conversational(57,311)</span>
                              </label>
                            </li>
                            <li>
                              <label className="jobplugin__form-radio">
                                <input 
                                  type="radio" 
                                  name="group03" 
                                  checked={englishLevel === 'Fluent'}
                                  onChange={() => setEnglishLevel('Fluent')}
                                />
                                <span className="jobplugin__form-radio__btn"></span>
                                <span className="label-text">Fluent(49,246)</span>
                              </label>
                            </li>
                            <li>
                              <label className="jobplugin__form-radio">
                                <input 
                                  type="radio" 
                                  name="group03" 
                                  checked={englishLevel === 'Native or bilingual'}
                                  onChange={() => setEnglishLevel('Native or bilingual')}
                                />
                                <span className="jobplugin__form-radio__btn"></span>
                                <span className="label-text">Native or bilingual(15,093)</span>
                              </label>
                            </li>
                          </ul>
                        </div>

                        <div className="jobplugin__results-aside__row">
                          <strong className="jobplugin__results-aside__row-title">Rating</strong>
                          <ul className="jobplugin__results-aside__list">
                            <li>
                              <label className="jobplugin__form-radio">
                                <input 
                                  type="radio" 
                                  name="group04" 
                                  checked={rating === 'Any rating'}
                                  onChange={() => setRating('Any rating')}
                                />
                                <span className="jobplugin__form-radio__btn"></span>
                                <span className="label-text">Any rating(23,986)</span>
                              </label>
                            </li>
                            <li>
                              <label className="jobplugin__form-radio">
                                <input 
                                  type="radio" 
                                  name="group04" 
                                  checked={rating === '4 stars'}
                                  onChange={() => setRating('4 stars')}
                                />
                                <span className="jobplugin__form-radio__btn"></span>
                                <span className="label-text">
                                  <span className="jobplugin__results-aside__list-star jobplugin__text-primary">
                                    <FaStar />
                                  </span>
                                  <span className="jobplugin__results-aside__list-star jobplugin__text-primary">
                                    <FaStar />
                                  </span>
                                
                                  <span className="jobplugin__results-aside__list-star jobplugin__text-primary">
                                    <FaStar />
                                  </span>
                                  <span className="jobplugin__results-aside__list-star jobplugin__text-primary">
                                    <FaStar />
                                  </span>
                                  <span className="jobplugin__results-aside__list-star">
                                    <FaStar />
                                  </span>
                                  & up(23,348)
                                </span>
                              </label>
                            </li>
                            <li>
                              <label className="jobplugin__form-radio">
                                <input 
                                  type="radio" 
                                  name="group04" 
                                  checked={rating === '3 stars'}
                                  onChange={() => setRating('3 stars')}
                                />
                                <span className="jobplugin__form-radio__btn"></span>
                                <span className="label-text">
                                  <span className="jobplugin__results-aside__list-star jobplugin__text-primary">
                                    <FaStar />
                                  </span>
                                  <span className="jobplugin__results-aside__list-star jobplugin__text-primary">
                                    <FaStar />
                                  </span>
                                  <span className="jobplugin__results-aside__list-star jobplugin__text-primary">
                                    <FaStar />
                                  </span>
                                  <span className="jobplugin__results-aside__list-star">
                                    <FaStar />
                                  </span>
                                  <span className="jobplugin__results-aside__list-star">
                                    <FaStar />
                                  </span>
                                  & up(23,348)
                                </span>
                              </label>
                            </li>
                            <li>
                              <label className="jobplugin__form-radio">
                                <input 
                                  type="radio" 
                                  name="group04" 
                                  checked={rating === '2 stars'}
                                  onChange={() => setRating('2 stars')}
                                />
                                <span className="jobplugin__form-radio__btn"></span>
                                <span className="label-text">
                                  <span className="jobplugin__results-aside__list-star jobplugin__text-primary">
                                    <FaStar />
                                  </span>
                                  <span className="jobplugin__results-aside__list-star jobplugin__text-primary">
                                    <FaStar />
                                  </span>
                                  <span className="jobplugin__results-aside__list-star">
                                    <FaStar />
                                  </span>
                                  <span className="jobplugin__results-aside__list-star">
                                    <FaStar />
                                  </span>
                                  <span className="jobplugin__results-aside__list-star">
                                    <FaStar />
                                  </span>
                                  & up(23,348)
                                </span>
                              </label>
                            </li>
                          </ul>
                        </div>

                        <div className="jobplugin__results-aside__row">
                          <strong className="jobplugin__results-aside__row-title">Location</strong>
                          <input 
                            className="jobplugin__results-aside__input" 
                            type="text" 
                            placeholder="Search locations"
                            value={location}
                            onChange={handleLocationChange}
                          />
                        </div>

                        <div className="jobplugin__results-aside__foot">
                          <button type="submit" className="jobplugin__button jobplugin__bg-primary hover:jobplugin__bg-secondary small">Apply</button>
                          <button type="button" onClick={clearFilters} className="jobplugin__button button-white button-link hover:jobplugin__bg-primary hover:jobplugin__text-white small">Clear</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </aside>

              {/* Results Content */}
              <section className="section section-categories section-theme-1 pb-35 pb-md-50 pb-xl-75 bg-white">
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      {/* Page subheader */}
                      <header className="page-subheader mb-30 mb-md-40 d-lg-flex align-items-center justify-content-between">
                        <span></span>
                        <div className="subhead-filters">
                          <h2 className="h6 mb-25 mb-lg-0 text-dark me-3" style={{letterSpacing: '1px', fontSize: '1.25rem'}}>
                            <b>7,096 Jobs Found</b>
                          </h2>
                          &nbsp; &nbsp; &nbsp;
                          <a href="#" className="btn btn-secondary btn-sm filters-opener" onClick={toggleSidebar}>
                            <FaSearch className="icon icon-search text-primary" /> &nbsp; Filter Jobs
                          </a> &nbsp; &nbsp;
                          <div className="subhead-filters-item">
                            <div className="form-group d-lg-flex align-items-center">
                              <select 
                                className="select2" 
                                name="state" 
                                data-placeholder="Sort by"
                                value={sortBy}
                                onChange={handleSortChange}
                              >
                                <option label="Sort by"></option>
                                <option>Newest Jobs</option>
                                <option>Old Jobs</option>
                                <option>Sort by Date</option>
                                <option>Sort by Name</option>
                              </select>
                            </div>
                          </div>
                          <div className="grid-buttons">
                            <a href="job-vacancies-list" className="btn btn-list" type="button">
                              <img src="images/list-icon.svg" width="20" height="20" alt="List" />
                            </a> &nbsp;
                            <a href="job-vacancies" className="btn btn-grid active" type="button">
                              <img src="images/grid-icon.svg" width="22" height="22" alt="Grid" />
                            </a> &nbsp;
                            <a href="job-vacancies-grid-with-map" className="btn btn-grid bg-white" type="button">
                              <img src="images/icons8-place-marker.gif" width="22" height="22" alt="Grid" />
                            </a>
                          </div>
                        </div>
                      </header>

                      {/* Jobs Grid */}
                      <div className="row justify-content-center">
                        {jobs.map(job => (
                          <div key={job.id} className="col-12 col-sm-6 col-lg-4 col-xl-4 mb-15 mb-md-30">
                            {/* Featured Category Box */}
                            <article className="featured-category-box pt-20">
                              <span className="tag"><b className="text-primary">Posted:</b> {job.posted}</span>
                              <div className="img-holder">
                                <img src={`images/${job.logo}`} width="78" height="78" alt={job.subject} />
                              </div>
                              <div className="textbox">
                                <strong className="h6 mb-0">{job.company}</strong>
                                <address className="location pt-0">
                                  <FaMapMarkerAlt className="icon icon-map-pin" />
                                  <span className="text">{job.location}</span>
                                </address>
                                <strong className="h6 text-primary mb-0">{job.position}</strong>
                                <span className="subtitle">{job.subject}</span>
                                <hr />
                                <div className="job-info">
                                  <span className="amount"><strong>{job.salary}</strong>/month</span>
                                  <span className="subtext"><b className="text-primary">Job Type:</b> {job.type}</span>
                                </div>
                                <a href={`job-details/${job.id}`} className="btn btn-dark-yellow btn-sm">
                                  <span className="btn-text">
                                    <span className="text">
                                      <FaCheckCircle className="text-secondary" /> &nbsp; Apply Now
                                    </span>
                                    <FaChevronRight className="icon-chevron-right" />
                                  </span>
                                </a>
                              </div>
                            </article>
                          </div>
                        ))}
                      </div>

                      {/* Pagination Block */}
                      <div className="pagination-block pt-20 pt-lg-30 pt-xl-50 pb-0">
                        <div className="container d-flex align-items-center justify-content-center">
                          <ul className="pagination">
                            <li className="page-item disabled">
                              <a className="page-link" href="#">
                                <FaArrowLeft className="icon-arrow-left1" />
                              </a>
                            </li>
                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                              <a className="page-link" href="#">
                                <FaArrowRight className="icon-arrow-right" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PremiumAdvancedSearch;