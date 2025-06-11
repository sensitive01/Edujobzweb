import React, { useState, useEffect } from 'react';
import user13 from '../../assets/employer/assets/img/users/user-13.jpg';
import AddNewCandidate from '../../components/common/AddNewCAndidate';
import EmployerCandidatesDetails from './EmployerCandidatesDetails';
import { FaArrowCircleUp } from 'react-icons/fa';
import EmployerFooter from './EmployerFooter';
import EmployerHeader from './EmployerHeader';
import { useNavigate } from 'react-router-dom';

const EmployeerShortlisedCandidates = () => {
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedRole, setSelectedRole] = useState('Role');
  const [selectedStatus, setSelectedStatus] = useState('Select Status');
  const [selectedSort, setSelectedSort] = useState('Sort By: Last 7 Days');
  const [selectedExport, setSelectedExport] = useState('Export');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const roles = [
    'All',
    'PGT Mathematics Teacher',
    'Physical Trainer',
    'Chemistry Teacher',
    'Receptionist',
    'Bus Driver',
    'Security',
    'flutter developer'
  ];
  
  const statuses = [
    'Active',
    'Inactive',
    'New',
    'On Hold',
    'Shortlisted',
    'Rejected',
    'Applied',
    'Pending'
  ];
  
  const sortOptions = [
    'Recently Added',
    'Ascending',
    'Descending',
    'Last Month',
    'Last 7 Days'
  ];
  
  const exportOptions = [
    { label: 'Export as PDF', icon: 'ti ti-file-type-pdf' },
    { label: 'Export as Excel', icon: 'ti ti-file-type-xls' }
  ];

  const [openSections, setOpenSections] = useState({
    jobCategory: true,
    JobType: true,
    gender: true,
    salaryRange: true,
    Location: true,
    qualification: true,
    experience: true,
  });

  const [filters, setFilters] = useState({
    jobCategories: [],
    jobTypes: [],
    gender: '',
    salaryFrom: '',
    salaryTo: '',
    location: '',
    qualification: '',
    experienceFrom: '',
    experienceTo: '',
    searchQuery: '',
    status: ''
  });

  useEffect(() => {
    const fetchNonPendingCandidates = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('employerToken');
        const employerData = JSON.parse(localStorage.getItem('employerData'));
        
        if (!token || !employerData) {
          navigate('/employer/login');
          return;
        }

        const response = await fetch(
          `https://edujobzbackend.onrender.com/employer/fetchallnonpending/${employerData._id}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch non-pending candidates');
        }
        
        const data = await response.json();
        setCandidates(data.data || []);
        setFilteredCandidates(data.data || []);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNonPendingCandidates();
  }, [navigate]);

  useEffect(() => {
    // Apply filters whenever filters state changes
    filterCandidates();
  }, [filters, candidates]);

  const filterCandidates = () => {
    let result = [...candidates];

    // Search query filter
    if (filters.searchQuery.trim()) {
      const searchTerm = filters.searchQuery.toLowerCase().trim();
      result = result.filter(candidate => {
        return (
          (candidate.firstName && candidate.firstName.toLowerCase().includes(searchTerm)) ||
          (candidate.lastName && candidate.lastName.toLowerCase().includes(searchTerm)) ||
          (candidate.email && candidate.email.toLowerCase().includes(searchTerm)) ||
          (candidate.jobrole && candidate.jobrole.toLowerCase().includes(searchTerm)) ||
          (candidate.currentcity && candidate.currentcity.toLowerCase().includes(searchTerm)) ||
          (candidate.qualification && candidate.qualification.toLowerCase().includes(searchTerm)) ||
          (candidate.currentDesignation && candidate.currentDesignation.toLowerCase().includes(searchTerm))
        );
      });
    }

    // Job role filter
    if (filters.jobCategories.length > 0) {
      result = result.filter(candidate => 
        filters.jobCategories.includes(candidate.jobrole)
      );
    }

    // Location filter
    if (filters.location) {
      result = result.filter(candidate => 
        candidate.currentcity && 
        candidate.currentcity.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Experience filter
    if (filters.experienceFrom || filters.experienceTo) {
      const from = parseInt(filters.experienceFrom) || 0;
      const to = parseInt(filters.experienceTo) || Infinity;
      
      result = result.filter(candidate => {
        const exp = parseInt(candidate.experience) || 0;
        return exp >= from && exp <= to;
      });
    }

    // Gender filter
    if (filters.gender) {
      result = result.filter(candidate => 
        candidate.gender && 
        candidate.gender.toLowerCase() === filters.gender.toLowerCase()
      );
    }

    // Status filter
    if (filters.status) {
      result = result.filter(candidate => 
        candidate.employapplicantstatus && 
        candidate.employapplicantstatus.toLowerCase() === filters.status.toLowerCase()
      );
    }

    setFilteredCandidates(result);
  };

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCheckboxChange = (type, value) => {
    setFilters(prev => {
      const currentValues = [...prev[type]];
      const index = currentValues.indexOf(value);

      if (index === -1) {
        currentValues.push(value);
      } else {
        currentValues.splice(index, 1);
      }

      return {
        ...prev,
        [type]: currentValues
      };
    });
  };

  const handleRadioChange = (e) => {
    setFilters(prev => ({
      ...prev,
      gender: e.target.value
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = () => {
    setFilters({
      jobCategories: [],
      jobTypes: [],
      gender: '',
      salaryFrom: '',
      salaryTo: '',
      location: '',
      qualification: '',
      experienceFrom: '',
      experienceTo: '',
      searchQuery: '',
      status: ''
    });
  };

  const handleSubmit = () => {
    // Filters are applied automatically through useEffect
    console.log('Applied filters', filters);
  };

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
  };

  const handleSubmitCandidate = (candidateData) => {
    console.log('Note Submitted', candidateData);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.search?.value || '';
    setFilters(prev => ({
      ...prev,
      searchQuery
    }));
  };

  const viewCandidateDetails = (candidate) => {
    setSelectedCandidate(candidate);
    setShowDetails(true);
  };

  if (loading) {
    return (
      <>
        <EmployerHeader />
        <div className="content">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading shortlisted candidates...</p>
          </div>
        </div>
        <EmployerFooter />
      </>
    );
  }

  if (error) {
    return (
      <>
        <EmployerHeader />
        <div className="content">
          <div className="text-center py-5 text-danger">
            <i className="fas fa-exclamation-triangle fa-2x mb-3"></i>
            <h5>Error loading shortlisted candidates</h5>
            <p>{error}</p>
            <button 
              className="btn btn-primary mt-3"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
        <EmployerFooter />
      </>
    );
  }

  return (
    <>
      <EmployerHeader/>

      <div className="content">
        {/* Breadcrumb */}
        <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
          <div className="my-auto">
            <h2>&nbsp;<i className="fa fa-users text-primary"></i> Shortlisted Candidates</h2>
          </div>

          <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
            {/* Date Range Picker */}
            <div className="me-2">
              <div className="input-icon-end position-relative">
                <input
                  type="text"
                  className="form-control date-range bookingrange"
                  style={{ width: "205px" }}
                  placeholder="dd/mm/yyyy - dd/mm/yyyy"
                />
                <span className="input-icon-addon">
                  <i className="ti ti-chevron-down"></i>
                </span>
              </div>
            </div>

            {/* Role Dropdown */}
            <div className="dropdown me-2">
              <button
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                onClick={() => toggleDropdown('role')}
              >
                {selectedRole}
              </button>
              <ul
                className={`dropdown-menu dropdown-menu-end p-3 ${activeDropdown === 'role' ? 'show' : ''}`}
                style={{ display: activeDropdown === 'role' ? 'block' : 'none' }}
              >
                {roles.map((role) => (
                  <li key={role}>
                    <button
                      className="dropdown-item rounded-1"
                      onClick={() => {
                        setSelectedRole(role);
                        setFilters(prev => ({
                          ...prev,
                          jobCategories: role === 'All' ? [] : [role]
                        }));
                        closeAllDropdowns();
                      }}
                    >
                      {role}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Status Dropdown */}
            <div className="dropdown me-2">
              <button
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                onClick={() => toggleDropdown('status')}
              >
                {selectedStatus}
              </button>
              <ul
                className={`dropdown-menu dropdown-menu-end p-3 ${activeDropdown === 'status' ? 'show' : ''}`}
                style={{ display: activeDropdown === 'status' ? 'block' : 'none' }}
              >
                {statuses.map((status) => (
                  <li key={status}>
                    <button
                      className="dropdown-item rounded-1"
                      onClick={() => {
                        setSelectedStatus(status);
                        setFilters(prev => ({
                          ...prev,
                          status: status === 'Select Status' ? '' : status
                        }));
                        closeAllDropdowns();
                      }}
                    >
                      {status}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sort Dropdown */}
            <div className="dropdown me-2">
              <button
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                onClick={() => toggleDropdown('sort')}
              >
                {selectedSort}
              </button>
              <ul
                className={`dropdown-menu dropdown-menu-end p-3 ${activeDropdown === 'sort' ? 'show' : ''}`}
                style={{ display: activeDropdown === 'sort' ? 'block' : 'none' }}
              >
                {sortOptions.map((option) => (
                  <li key={option}>
                    <button
                      className="dropdown-item rounded-1"
                      onClick={() => {
                        setSelectedSort(`Sort By: ${option}`);
                        closeAllDropdowns();
                      }}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* View Toggle */}
            <div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
              <button className="btn btn-icon btn-sm me-1">
                <i className="ti ti-list-tree"></i>
              </button>
              <button className="btn btn-icon btn-sm active bg-secondary text-white">
                <i className="ti ti-layout-grid"></i>
              </button>
            </div>

            {/* Export Dropdown */}
            <div className="dropdown me-2">
              <button
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                onClick={() => toggleDropdown('export')}
              >
                <i className="ti ti-file-export me-1"></i>{selectedExport}
              </button>
              <ul
                className={`dropdown-menu dropdown-menu-end p-3 ${activeDropdown === 'export' ? 'show' : ''}`}
                style={{ display: activeDropdown === 'export' ? 'block' : 'none' }}
              >
                {exportOptions.map((option) => (
                  <li key={option.label}>
                    <button
                      className="dropdown-item rounded-1"
                      onClick={() => {
                        setSelectedExport(option.label);
                        closeAllDropdowns();
                      }}
                    >
                      <i className={`${option.icon} me-1`}></i>{option.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Header Icons */}
            <div className="card-header d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div className="head-icons ms-2">
                  <button
                    className="btn btn-icon"
                    onClick={(e) => {
                      e.preventDefault();
                      // Handle collapse functionality here
                    }}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Collapse"
                    id="collapse-header"
                  >
                    <i className="ti ti-chevrons-up"></i>
                  </button>
                </div>
              </div>

              <AddNewCandidate
                show={showCandidateModal}
                onClose={() => setShowCandidateModal(false)}
                onSubmit={handleSubmitCandidate}
              />
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}

        <div className="row">
          <div className="col-xl-12">
            <div className="row">
              {/* Filter Sidebar */}
              <div className="col-lg-3 col-md-6 card card-body">
                <div className="themesettings-inner offcanvas-body">
                  <div className="accordion accordion-customicon1 accordions-items-seperate" id="settingtheme">
                    <h3 className="mb-1 text-secondary">Filter Candidates</h3>
                    <p className="text-dark">Search & Filter</p>

                    {/* Job Category Accordion */}
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button text-dark fs-16 align-items-center justify-content-between"
                          type="button"
                          onClick={() => toggleSection('jobCategory')}
                        >
                          Select Job Category
                          <span>
                            <FaArrowCircleUp
                              className={`text-primary transition-all duration-300 ${openSections.jobCategory ? 'rotate-180' : ''}`}
                              size={20}
                            />
                          </span>
                        </button>
                      </h2>
                      <div
                        className={`accordion-collapse collapse ${openSections.jobCategory ? 'show' : ''}`}
                      >
                        <div className="accordion-body">
                          <div className="row gx-3">
                            <div className="form-group">
                              <div className="checkbox-limit">
                                <ul className="checkbox-list">
                                  {roles.filter(role => role !== 'All').map(category => (
                                    <li className="mb-2" key={category}>
                                      <label className="custom-checkbox">
                                        <input
                                          type="checkbox"
                                          checked={filters.jobCategories.includes(category)}
                                          onChange={() => handleCheckboxChange('jobCategories', category)}
                                        />
                                        <span className="fake-checkbox"></span>
                                        <span className="label-text">{category}</span>
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Job Type Accordion */}
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button text-dark fs-16 align-items-center justify-content-between"
                          type="button"
                          onClick={() => toggleSection('jobType')}
                        >
                          Select Job Type
                          <span>
                            <FaArrowCircleUp
                              className={`text-primary transition-all duration-300 ${openSections.jobType ? 'rotate-180' : ''}`}
                              size={20}
                            />
                          </span>
                        </button>
                      </h2>
                      <div className={`accordion-collapse collapse ${openSections.jobType ? 'show' : ''}`}>
                        <div className="accordion-body">
                          <div className="row">
                            <div className="form-group">
                              <div className="checkbox-limit">
                                <ul className="checkbox-list d-flex flex-wrap">
                                  {['Full Time', 'Part Time', 'Remote', 'Temporary'].map(type => (
                                    <li className="me-2 mb-2" key={type}>
                                      <label className="custom-checkbox">
                                        <input
                                          type="checkbox"
                                          checked={filters.jobTypes.includes(type)}
                                          onChange={() => handleCheckboxChange('jobTypes', type)}
                                        />
                                        <span className="fake-checkbox"></span>
                                        <span className="label-text">{type}</span>
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Gender Accordion */}
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button text-dark fs-16 align-items-center justify-content-between"
                          type="button"
                          onClick={() => toggleSection('gender')}
                        >
                          Gender
                          <span>
                            <FaArrowCircleUp
                              className={`text-primary transition-all duration-300 ${openSections.gender ? 'rotate-180' : ''}`}
                              size={20}
                            />
                          </span>
                        </button>
                      </h2>
                      <div className={`accordion-collapse collapse ${openSections.gender ? 'show' : ''}`}>
                        <div className="accordion-body">
                          <div className="d-flex align-items-center">
                            <div className="theme-width m-1 me-2">
                              <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                checked={filters.gender === 'male'}
                                onChange={handleRadioChange}
                              />
                              <label htmlFor="male" className="d-block rounded fs-12">Male</label>
                            </div>
                            <div className="theme-width m-1">
                              <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                checked={filters.gender === 'female'}
                                onChange={handleRadioChange}
                              />
                              <label htmlFor="female" className="d-block rounded fs-12">Female</label>
                            </div>
                            <div className="theme-width m-1">
                              <input
                                type="radio"
                                id="any"
                                name="gender"
                                value=""
                                checked={!filters.gender}
                                onChange={handleRadioChange}
                              />
                              <label htmlFor="any" className="d-block rounded fs-12">Any</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Salary Range Accordion */}
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button text-dark fs-16 align-items-center justify-content-between"
                          type="button"
                          onClick={() => toggleSection('salaryRange')}
                        >
                          Salary Range
                          <span>
                            <FaArrowCircleUp
                              className={`text-primary transition-all duration-300 ${openSections.salaryRange ? 'rotate-180' : ''}`}
                              size={20}
                            />
                          </span>
                        </button>
                      </h2>
                      <div className={`accordion-collapse collapse ${openSections.salaryRange ? 'show' : ''}`}>
                        <div className="accordion-body pb-0">
                          <div className="row gx-3">
                            <div className="form-group">
                              <div className="price-inputs d-flex mb-3">
                                <input
                                  type="text"
                                  id="salary-from"
                                  className="form-control me-3"
                                  placeholder="From"
                                  value={filters.salaryFrom}
                                  onChange={(e) => handleInputChange(e)}
                                  name="salaryFrom"
                                />
                                <input
                                  type="text"
                                  id="salary-to"
                                  className="form-control"
                                  placeholder="To"
                                  value={filters.salaryTo}
                                  onChange={(e) => handleInputChange(e)}
                                  name="salaryTo"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Location Accordion */}
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button text-dark fs-16 align-items-center justify-content-between"
                          type="button"
                          onClick={() => toggleSection('location')}
                        >
                          Location
                          <span>
                            <FaArrowCircleUp
                              className={`text-primary transition-all duration-300 ${openSections.location ? 'rotate-180' : ''}`}
                              size={20}
                            />
                          </span>
                        </button>
                      </h2>
                      <div className={`accordion-collapse collapse ${openSections.location ? 'show' : ''}`}>
                        <div className="accordion-body">
                          <div className="d-flex align-items-center">
                            <input
                              type="text"
                              id="location"
                              className="form-control"
                              placeholder="Choose Location"
                              value={filters.location}
                              onChange={(e) => handleInputChange(e)}
                              name="location"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Qualification Accordion */}
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button text-dark fs-16 align-items-center justify-content-between"
                          type="button"
                          onClick={() => toggleSection('qualification')}
                        >
                          Qualification
                          <span>
                            <FaArrowCircleUp
                              className={`text-primary transition-all duration-300 ${openSections.qualification ? 'rotate-180' : ''}`}
                              size={20}
                            />
                          </span>
                        </button>
                      </h2>
                      <div className={`accordion-collapse collapse ${openSections.qualification ? 'show' : ''}`}>
                        <div className="accordion-body">
                          <div className="row gx-3">
                            <input
                              type="text"
                              id="qualification"
                              className="form-control"
                              placeholder="Qualification"
                              value={filters.qualification}
                              onChange={(e) => handleInputChange(e)}
                              name="qualification"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Experience Accordion */}
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button text-dark fs-16 align-items-center justify-content-between"
                          type="button"
                          onClick={() => toggleSection('experience')}
                        >
                          Experience
                          <span>
                            <FaArrowCircleUp
                              className={`text-primary transition-all duration-300 ${openSections.experience ? 'rotate-180' : ''}`}
                              size={20}
                            />
                          </span>
                        </button>
                      </h2>
                      <div className={`accordion-collapse collapse ${openSections.experience ? 'show' : ''}`}>
                        <div className="accordion-body pb-0">
                          <div className="row gx-3">
                            <div className="price-inputs d-flex mb-3">
                              <input
                                type="text"
                                id="experience-from"
                                className="form-control me-3"
                                placeholder="From"
                                value={filters.experienceFrom}
                                onChange={(e) => handleInputChange(e)}
                                name="experienceFrom"
                              />
                              <input
                                type="text"
                                id="experience-to"
                                className="form-control"
                                placeholder="To"
                                value={filters.experienceTo}
                                onChange={(e) => handleInputChange(e)}
                                name="experienceTo"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-3 pt-5">
                  <div className="row gx-3">
                    <div className="col-6">
                      <button
                        id="resetbutton"
                        className="btn btn-light close-theme w-100"
                        onClick={handleReset}
                      >
                        <i className="ti ti-restore me-1"></i>Reset
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        className="btn btn-secondary w-100"
                        onClick={handleSubmit}
                      >
                        <i className="ti ti-circle-check me-1"></i>Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Main Content Area */}
              <div className="col-lg-9 col-md-6">
                <div className="card">
                  <div className="card-body">
                    <form onSubmit={handleSearch}>
                      <div className="d-flex align-items-center">
                        <input 
                          type="text" 
                          name="search"
                          className="form-control flex-fill me-2" 
                          placeholder="Search Candidates (name, email, skills, etc.)" 
                          defaultValue={filters.searchQuery}
                        />
                        <button type="submit" className="btn btn-secondary">Search</button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Candidates Count */}
                <div className="mb-3">
                  <span className="badge bg-warning">
                    {filteredCandidates.length} {filteredCandidates.length === 1 ? 'shortlisted candidate' : 'shortlisted candidates'} found
                  </span>
                </div>

                {/* Candidates Grid */}
                <div className="row">
                  {filteredCandidates.length > 0 ? (
                    filteredCandidates.map(candidate => (
                      <div key={candidate._id} className="col-xxl-12 col-xl-4 col-md-6">
                        <div className="card">
                          <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                              <div className="d-flex align-items-center">
                                <a href="javascript:void(0);" className="avatar flex-shrink-0">
                                  <img 
                                    src={candidate.profileurl || user13} 
                                    className="img-fluid h-auto w-auto" 
                                    alt="img" 
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = user13;
                                    }}
                                  />
                                </a>
                                <div className="ms-2">
                                  <h6 className="fs-14 fw-medium text-truncate text-primary mb-1">
                                    <a className="text-secondary" href="#"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        viewCandidateDetails(candidate);
                                      }}>
                                      {candidate.firstName} {candidate.lastName || ''} &nbsp; | &nbsp;
                                      <span className="text-dark">
                                        <i className="ti ti-eye"></i> View Profile
                                      </span>
                                    </a>
                                  </h6>
                                  <p className="fs-13">
                                    <b>Shortlisted On:</b> {new Date(candidate.appliedDate).toLocaleDateString()} &nbsp; | &nbsp; 
                                    <span className={`badge ${candidate.employapplicantstatus === 'Pending' ? 'bg-warning' : 
                                      candidate.employapplicantstatus === 'Interview Scheduled' ? 'bg-info' : 
                                      candidate.employapplicantstatus === 'In Progress' ? 'bg-primary' : 'bg-success'}`}>
                                      {candidate.employapplicantstatus || 'Pending'}
                                    </span> &nbsp; | &nbsp; 
                                    {candidate.resume?.url && (
                                      <a href={candidate.resume.url} className="fw-medium text-primary" target="_blank" rel="noopener noreferrer">
                                        <i className="ti ti-download"></i> Download Resume
                                      </a>
                                    )}
                                  </p>
                                </div>
                              </div>
                              <div className="d-flex align-items-center">
                                {candidate.phone && (
                                  <a href={`tel:${candidate.phone}`} className="btn btn-light text-success btn-icon btn-sm me-1">
                                    <i className="ti ti-phone fs-16"></i>
                                  </a>
                                )}
                                {candidate.email && (
                                  <a href={`mailto:${candidate.email}`} className="btn btn-light btn-icon text-danger btn-sm me-1">
                                    <i className="ti ti-mail-bolt fs-16"></i>
                                  </a>
                                )}
                                <a data-bs-toggle="offcanvas" data-bs-target="#theme-setting" className="btn btn-light text-info btn-icon text-info btn-sm me-1">
                                  <i className="ti ti-brand-hipchat fs-16"></i>
                                </a>
                                <a href="#" className="btn btn-light text-primary btn-icon btn-sm">
                                  <i className="ti ti-bookmark fs-16"></i>
                                </a>
                              </div>
                            </div>
                            <div className="bg-light rounder p-2">
                              <div className="d-flex align-items-center justify-content-between mb-2">
                                <span><b>Experience</b> : {candidate.experience || '0'} Years</span>
                                <span><b>Job Role</b> : {candidate.jobrole || 'Not specified'}</span>
                              </div>
                              <div className="d-flex align-items-center justify-content-between mb-2">
                                <span><b>Gender</b> : {candidate.gender || 'Not specified'}</span>
                                <span><b>Email</b> : {candidate.email || 'Not specified'}</span>
                              </div>
                              <div className="d-flex align-items-center justify-content-between mb-2">
                                <span><b>Phone</b> : {candidate.phone || 'Not specified'}</span>
                                <span><b>Qualification</b> : {candidate.qualification || 'Not specified'}</span>
                              </div>
                              <div className="d-flex align-items-center justify-content-between">
                                <span><b>Current Location</b> : {candidate.currentcity || 'Not specified'}</span>
                                <span>
                                  <button 
                                    className="fs-10 fw-bold badge bg-warning"
                                    onClick={() => viewCandidateDetails(candidate)}
                                  >
                                    <i className="ti ti-eye"></i> View Profile
                                  </button>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center py-5">
                      <img src="/images/no-jobs-found.png" alt="No shortlisted candidates found" width="150" className="mb-3" />
                      <h4>No shortlisted candidates found</h4>
                      <p className="text-muted">Try adjusting your search filters</p>
                    </div>
                  )}
                  
                  {filteredCandidates.length > 0 && (
                    <div className="col-md-12">
                      <div align="right" className="mb-4">
                        <a href="#" className="btn btn-secondary"><i className="ti ti-loader-3 me-1"></i>Load More</a>
                      </div>
                    </div>
                  )}
                </div>
                {/* /Candidates Grid */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Details Modal */}
      {selectedCandidate && (
        <EmployerCandidatesDetails
          show={showDetails}
          onClose={() => setShowDetails(false)}
          candidate={selectedCandidate}
        />
      )}

      <EmployerFooter/>
    </>
  );
};

export default EmployeerShortlisedCandidates;