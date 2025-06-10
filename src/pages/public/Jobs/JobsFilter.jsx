import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';

const JobsFilter = () => {
  const [openCategory, setOpenCategory] = useState(true);
  const [openExperience, setOpenExperience] = useState(true);
  const [openType, setOpenType] = useState(true);
  const [openSubject, setOpenSubject] = useState(true);
  const [openSpecialization, setOpenSpecialization] = useState(true);
  const [openSalary, setOpenSalary] = useState(true);
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  
  // State for filters
  const [filters, setFilters] = useState({
    categories: [],
    experience: { min: '', max: '' },
    jobTypes: [],
    subject: '',
    specializations: [],
    salary: { min: '', max: '' }
  });

  // Job categories data
  const jobCategories = [
    { id: 1, name: 'Teachers' },
    { id: 2, name: 'Lab Assistants' },
    { id: 3, name: 'Principals' },
    { id: 4, name: 'Sports Trainers' },
    { id: 5, name: 'Office Staffs' }
  ];

  // Job types data
  const jobTypes = [
    { id: 1, name: 'Full Time' },
    { id: 2, name: 'Part Time' },
    { id: 3, name: 'Remote' },
    { id: 4, name: 'Temporary' }
  ];

  // Specializations data
  const specializations = [
    'Physics', 'Chemistry', 'Mathematics', 'Science', 
    'Kannada', 'English', 'Hindi', 'German', 'French'
  ];

  // Handle category selection
  const handleCategoryChange = (categoryId) => {
    setFilters(prev => {
      const newCategories = prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId];
      return { ...prev, categories: newCategories };
    });
  };

  // Handle job type selection
  const handleJobTypeChange = (typeId) => {
    setFilters(prev => {
      const newTypes = prev.jobTypes.includes(typeId)
        ? prev.jobTypes.filter(id => id !== typeId)
        : [...prev.jobTypes, typeId];
      return { ...prev, jobTypes: newTypes };
    });
  };

  // Handle specialization selection
  const handleSpecializationClick = (specialization) => {
    setFilters(prev => {
      const newSpecs = prev.specializations.includes(specialization)
        ? prev.specializations.filter(s => s !== specialization)
        : [...prev.specializations, specialization];
      return { ...prev, specializations: newSpecs };
    });
  };

  // Handle form reset
  const handleReset = () => {
    setFilters({
      categories: [],
      experience: { min: '', max: '' },
      jobTypes: [],
      subject: '',
      specializations: [],
      salary: { min: '', max: '' }
    });
  };

  return (
    <aside className="filters-sidebar custom-filters">
      <button className="btn btn-filters filters-opener" type="button">
        <span></span>
      </button>
      
      <form>
        {/* Job Category Filter */}
        <div className="filter-box">
          <a 
            className="filter-box-head" 
            onClick={() => setOpenCategory(!openCategory)}
            aria-controls="collapseCategory"
            aria-expanded={openCategory}
          >
            <h2 className="h5 text-secondary">Job Category</h2>
            <span className={`collapse-icon ${openCategory ? 'open' : ''}`}></span>
          </a>
          <Collapse in={openCategory}>
            <div id="collapseCategory">
              <div className="form-group">
                <div className="checkbox-limit">
                  <ul className="checkbox-list">
                    {jobCategories.slice(0, showMoreCategories ? jobCategories.length : 3).map(category => (
                      <li key={category.id}>
                        <label className="custom-checkbox">
                          <input 
                            type="checkbox" 
                            checked={filters.categories.includes(category.id)}
                            onChange={() => handleCategoryChange(category.id)}
                          />
                          <span className="fake-checkbox"></span>
                          <span className="label-text">{category.name}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                  <button 
                    type="button" 
                    className="btn btn-primary btn-sm buttonShowMore"
                    onClick={() => setShowMoreCategories(!showMoreCategories)}
                  >
                    <span className="btn-text">
                      Show 
                      <span className={showMoreCategories ? 'hide' : 'show'}>More</span>
                      <span className={showMoreCategories ? 'show' : 'hide'}>Less</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </Collapse>
        </div>

        {/* Experience Filter */}
        <div className="filter-box">
          <a 
            className="filter-box-head" 
            onClick={() => setOpenExperience(!openExperience)}
            aria-controls="collapseexperience"
            aria-expanded={openExperience}
          >
            <h2 className="h5 text-secondary">Experience</h2>
            <span className={`collapse-icon ${openExperience ? 'open' : ''}`}></span>
          </a>
          <Collapse in={openExperience}>
            <div id="collapseexperience">
              <div className="form-group">
                <div className="price-inputs">
                  <input 
                    type="text" 
                    id="price-start" 
                    className="form-control" 
                    placeholder="From" 
                    value={filters.experience.min}
                    onChange={(e) => setFilters({...filters, experience: {...filters.experience, min: e.target.value}})}
                  />
                  <input 
                    type="text" 
                    id="price-end" 
                    className="form-control" 
                    placeholder="To" 
                    value={filters.experience.max}
                    onChange={(e) => setFilters({...filters, experience: {...filters.experience, max: e.target.value}})}
                  />
                </div>
                <div className="range-box">
                  {/* Range slider would be implemented here */}
                  <div id="price-range"></div>
                </div>
                <p className="text-center">Leave empty to Search Freshers</p>
              </div>
            </div>
          </Collapse>
        </div>

        {/* Job Type Filter */}
        <div className="filter-box">
          <a 
            className="filter-box-head" 
            onClick={() => setOpenType(!openType)}
            aria-controls="collapseType"
            aria-expanded={openType}
          >
            <h2 className="h5 text-secondary">Job Type</h2>
            <span className={`collapse-icon ${openType ? 'open' : ''}`}></span>
          </a>
          <Collapse in={openType}>
            <div id="collapseType">
              <div className="form-group">
                <div className="checkbox-limit">
                  <ul className="checkbox-list">
                    {jobTypes.map(type => (
                      <li key={type.id}>
                        <label className="custom-checkbox">
                          <input 
                            type="checkbox" 
                            checked={filters.jobTypes.includes(type.id)}
                            onChange={() => handleJobTypeChange(type.id)}
                          />
                          <span className="fake-checkbox"></span>
                          <span className="label-text">{type.name}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Collapse>
        </div>

        {/* Teaching Subject Filter */}
        <div className="filter-box">
          <a 
            className="filter-box-head" 
            onClick={() => setOpenSubject(!openSubject)}
            aria-controls="collapseLocation"
            aria-expanded={openSubject}
          >
            <h2 className="h5 text-secondary">Teaching Subject</h2>
            <span className={`collapse-icon ${openSubject ? 'open' : ''}`}></span>
          </a>
          <Collapse in={openSubject}>
            <div id="collapseLocation">
              <div className="form-group">
                <select 
                  className="select2 medium" 
                  name="state" 
                  value={filters.subject}
                  onChange={(e) => setFilters({...filters, subject: e.target.value})}
                >
                  <option value="">Select Subject</option>
                  <option>Bengaluru</option>
                  <option>Mysuru</option>
                </select>
              </div>
            </div>
          </Collapse>
        </div>

        {/* Specialization Filter */}
        <div className="filter-box">
          <a 
            className="filter-box-head" 
            onClick={() => setOpenSpecialization(!openSpecialization)}
            aria-controls="collapseTags"
            aria-expanded={openSpecialization}
          >
            <h2 className="h5 text-secondary">Specialized in</h2>
            <span className={`collapse-icon ${openSpecialization ? 'open' : ''}`}></span>
          </a>
          <Collapse in={openSpecialization}>
            <div id="collapseTags">
              <div className="form-group">
                <ul className="tags-list">
                  {specializations.map(spec => (
                    <li key={spec}>
                      <button 
                        type="button"
                        className={`tag ${filters.specializations.includes(spec) ? 'active' : ''}`}
                        onClick={() => handleSpecializationClick(spec)}
                      >
                        {spec}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Collapse>
        </div>

        {/* Salary Filter */}
        <div className="filter-box">
          <a 
            className="filter-box-head" 
            onClick={() => setOpenSalary(!openSalary)}
            aria-controls="collapseSalary"
            aria-expanded={openSalary}
          >
            <h2 className="h5 text-secondary">Salary per month</h2>
            <span className={`collapse-icon ${openSalary ? 'open' : ''}`}></span>
          </a>
          <Collapse in={openSalary}>
            <div id="collapseSalary">
              <div className="form-group">
                <div className="price-inputs">
                  <input 
                    type="text" 
                    id="amount-start" 
                    className="form-control" 
                    placeholder="From" 
                    value={filters.salary.min}
                    onChange={(e) => setFilters({...filters, salary: {...filters.salary, min: e.target.value}})}
                  />
                  <input 
                    type="text" 
                    id="amount-end" 
                    className="form-control" 
                    placeholder="To" 
                    value={filters.salary.max}
                    onChange={(e) => setFilters({...filters, salary: {...filters.salary, max: e.target.value}})}
                  />
                </div>
                <div className="range-box">
                  {/* Range slider would be implemented here */}
                  <div id="slider-range"></div>
                </div>
                <p className="text-center">Leave empty to search all range</p>
              </div>
            </div>
          </Collapse>
        </div>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          <button type="button" className="btn btn-secondary btn-sm">
            <span className="btn-text">
              <i className="fa fa-filter"></i> Apply Filter
            </span>
          </button>
          <button 
            type="button" 
            className="btn btn-text btn-sm"
            onClick={handleReset}
          >
            Reset filters
          </button>
        </div>
      </form>
    </aside>
  );
};

export default JobsFilter;