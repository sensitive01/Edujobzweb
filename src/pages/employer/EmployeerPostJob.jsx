import React, { useState, useEffect } from 'react';
import { Briefcase, ChevronDown, PlusCircle, Users, Eye, ArrowUp, MapPin, IndianRupee, Calendar, Bus, Settings, PieChart, X, Check, ArrowUpRight, RotateCw, CheckCircle2 } from 'lucide-react';
import EmployerHeader from './EmployerHeader';
import EmployerFooter from './EmployerFooter';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Main Jobs Component
const EmployeerPostJob = () => {
  const [activeTab, setActiveTab] = useState('basic-info');
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: [],
    type: [],
    status: [],
    role: 'All',
    sortBy: 'Recently Added',
    gender: '',
    salaryRange: { from: '', to: '' },
    location: '',
    qualification: '',
    experienceRange: { from: '', to: '' }
  });

  // Extract unique values from jobs for filters
  const jobCategories = [...new Set(jobs.map(job => job.category))].filter(Boolean);
  const jobTypes = [...new Set(jobs.map(job => job.type))].filter(Boolean);
  const statusOptions = [...new Set(jobs.map(job => job.status))].filter(Boolean);
  const jobRoles = ['All', ...new Set(jobs.map(job => job.title))].filter(Boolean);

  const sortOptions = [
    "Recently Added", "Ascending", "Descending", "Last Month", "Last 7 Days"
  ];

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    filterAndSortJobs();
  }, [jobs, filters, searchTerm]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const employerData = JSON.parse(localStorage.getItem('employerData'));

      if (!employerData || !employerData._id) {
        throw new Error('Employer not logged in or missing ID');
      }

      const response = await axios.get(`https://edujobzbackend.onrender.com/employer/fetchjob/${employerData._id}`);

      if (!response.data || response.data.length === 0) {
        throw new Error('No jobs found for this employer');
      }

      const formattedJobs = response.data.map(job => ({
        id: job._id,
        title: job.jobTitle,
        employerProfilePic: job.employerProfilePic,
        applicants: job.applications?.length || 0,
        shortlisted: job.applications?.filter(app => app.employapplicantstatus === 'Shortlisted').length || 0,
        location: job.location,
        salaryFrom: job.salaryFrom || 0,
        salaryTo: job.salaryTo || 0,
        salary: `${job.salaryFrom || 'N/A'} - ${job.salaryTo || 'N/A'} ${job.salaryType || ''}`,
        experience: job.experienceLevel || 'Not specified',
        type: job.jobType || 'Not specified',
        category: job.category || 'Not specified',
        accommodation: job.benefits || "Not specified",
        skills: job.skills || [],
        postedDate: formatDate(job.createdAt),
        icon: job.employerProfilePic || "default.svg",
        description: job.description || '',
        remote: job.isRemote || false,
        applications: job.applications || [],
        status: job.isActive ? 'Active' : 'Inactive',
        createdDate: new Date(job.createdAt),
        priority: job.priority || 'null',
        educationLevel: job.educationLevel || ''
      }));

      setJobs(formattedJobs);
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err.message || 'Failed to load jobs. Please try again later.');
      setLoading(false);
      setJobs([]);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return isNaN(date) ? 'Invalid Date' : date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  const filterAndSortJobs = () => {
    let result = [...jobs];

    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(job =>
        job.title.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term) ||
        (job.skills && job.skills.some(skill => skill.toLowerCase().includes(term))) ||
        job.category.toLowerCase().includes(term) ||
        job.type.toLowerCase().includes(term)
      );
    }

    // Apply category filter
    if (filters.category.length > 0) {
      result = result.filter(job =>
        job.category && filters.category.includes(job.category)
      );
    }

    // Apply type filter
    if (filters.type.length > 0) {
      result = result.filter(job =>
        job.type && filters.type.includes(job.type)
      );
    }

    // Apply status filter
    if (filters.status.length > 0) {
      result = result.filter(job =>
        job.status && filters.status.includes(job.status)
      );
    }

    // Apply role filter
    if (filters.role !== 'All') {
      result = result.filter(job =>
        job.title && job.title.includes(filters.role)
      );
    }

    // Apply salary range filter
    if (filters.salaryRange.from || filters.salaryRange.to) {
      result = result.filter(job => {
        const from = filters.salaryRange.from ? Number(filters.salaryRange.from) : 0;
        const to = filters.salaryRange.to ? Number(filters.salaryRange.to) : Infinity;
        return job.salaryFrom >= from && job.salaryTo <= to;
      });
    }

    // Apply location filter
    if (filters.location) {
      result = result.filter(job =>
        job.location && job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply qualification filter
    if (filters.qualification) {
      result = result.filter(job =>
        job.educationLevel && job.educationLevel.toLowerCase().includes(filters.qualification.toLowerCase())
      );
    }

    // Apply experience filter
    if (filters.experienceRange.from || filters.experienceRange.to) {
      result = result.filter(job => {
        const expValue = getExperienceValue(job.experience);
        const from = filters.experienceRange.from ? Number(filters.experienceRange.from) : 0;
        const to = filters.experienceRange.to ? Number(filters.experienceRange.to) : Infinity;
        return expValue >= from && expValue <= to;
      });
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'Recently Added':
        result.sort((a, b) => b.createdDate - a.createdDate);
        break;
      case 'Ascending':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'Descending':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'Last Month': {
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        result = result.filter(job => new Date(job.createdDate) > lastMonth);
        break;
      }
      case 'Last 7 Days': {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        result = result.filter(job => new Date(job.createdDate) > lastWeek);
        break;
      }
      default:
        break;
    }

    setFilteredJobs(result);
  };

  const getExperienceValue = (expString) => {
    if (!expString) return 0;
    const matches = expString.match(/\d+/g);
    if (matches && matches.length > 0) {
      return parseInt(matches[0], 10);
    }
    return 0;
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAddPost = () => {
    setShowAddPostModal(true);
  };

  const handleCloseAddPost = () => {
    setShowAddPostModal(false);
  };

  const handleSubmitJob = () => {
    setShowAddPostModal(false);
    setShowSuccessModal(true);
    fetchJobs();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    filterAndSortJobs();
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'category' || filterType === 'type' || filterType === 'status') {
      setFilters(prev => ({
        ...prev,
        [filterType]: prev[filterType].includes(value)
          ? prev[filterType].filter(item => item !== value)
          : [...prev[filterType], value]
      }));
    } else if (filterType === 'salaryRange' || filterType === 'experienceRange') {
      setFilters(prev => ({
        ...prev,
        [filterType]: { ...prev[filterType], ...value }
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
    }
  };

  const resetFilters = () => {
    setFilters({
      category: [],
      type: [],
      status: [],
      role: 'All',
      sortBy: 'Recently Added',
      gender: '',
      salaryRange: { from: '', to: '' },
      location: '',
      qualification: '',
      experienceRange: { from: '', to: '' }
    });
    setSearchTerm('');
  };

  const handleJobStatusChange = (jobId, newStatus) => {
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );
    setFilteredJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );
  };
  return (
    <>
      <EmployerHeader />
      <div className="content">
        {/* Header Section */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="my-auto">
            <h2>&nbsp; <Briefcase className="text-primary" /> Jobs</h2>
          </div>
          <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
            <div className="me-2">
              <div className="input-icon-end position-relative">
                <input
                  type="text"
                  className="form-control date-range bookingrange border border-grey"
                  style={{ width: "205px" }}
                  placeholder="dd/mm/yyyy - dd/mm/yyyy"
                />
                <span className="input-icon-addon">
                  <ChevronDown />
                </span>
              </div>
            </div>

            <Dropdown
              title={filters.role}
              options={jobRoles}
              onSelect={(value) => handleFilterChange('role', value)}
            />
            <Dropdown
              title="Status"
              options={statusOptions}
              selected={filters.status}
              multiSelect
              onSelect={(value) => handleFilterChange('status', value)}
            />
            <Dropdown
              title={`Sort By: ${filters.sortBy}`}
              options={sortOptions}
              onSelect={(value) => handleFilterChange('sortBy', value)}
            />

            <div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
              <a href="jobs.php" className="btn btn-icon btn-sm me-1">
                <i className="ti ti-list-tree"></i>
              </a>
              <a href="jobs-grid.php" className="btn btn-icon btn-sm active bg-secondary text-white">
                <i className="ti ti-layout-grid"></i>
              </a>
            </div>

            <div className="dropdown me-2">
              <a href="javascript:void(0);" className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                <i className="ti ti-file-export me-1"></i>Export
              </a>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1">
                    <i className="ti ti-file-type-pdf me-1"></i>Export as PDF
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1">
                    <i className="ti ti-file-type-xls me-1"></i>Export as Excel
                  </a>
                </li>
              </ul>
            </div>

            <button
              onClick={handleAddPost}
              className="btn btn-primary d-flex align-items-center" 
            >
              <PlusCircle className="me-2" />Post Job
            </button>
          </div>
        </div>

        {/* Main Content */}
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="row">
            {/* Filters Sidebar */}
            <div className="col-xl-3 col-lg-3 col-md-6 card card-body">
              <FilterSidebar
                jobCategories={jobCategories}
                jobTypes={jobTypes}
                selectedCategories={filters.category}
                selectedTypes={filters.type}
                selectedGender={filters.gender}
                salaryRange={filters.salaryRange}
                location={filters.location}
                qualification={filters.qualification}
                experienceRange={filters.experienceRange}
                onCategoryChange={(value) => handleFilterChange('category', value)}
                onTypeChange={(value) => handleFilterChange('type', value)}
                onGenderChange={(value) => handleFilterChange('gender', value)}
                onSalaryRangeChange={(value) => handleFilterChange('salaryRange', value)}
                onLocationChange={(value) => handleFilterChange('location', value)}
                onQualificationChange={(value) => handleFilterChange('qualification', value)}
                onExperienceRangeChange={(value) => handleFilterChange('experienceRange', value)}
                onReset={resetFilters}
              />
            </div>

            {/* Jobs Grid */}
            <div className="col-xl-9 col-lg-9 col-md-6">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSearch}>
                    <div className="d-flex align-items-center">
                      <input
                        type="text"
                        className="form-control flex-fill me-2"
                        placeholder="Search Jobs"
                        value={searchTerm}
                        onChange={handleSearchInputChange}
                      />
                      <button type="submit" className="btn btn-secondary" style={{ whiteSpace: 'nowrap' }}>Search</button>
                    </div>
                  </form>
                </div>
              </div>

              {filteredJobs.length === 0 ? (
                <div className="card">
                  <div className="card-body text-center py-5">
                    <h4>No jobs found</h4>
                    <p>Try adjusting your search or filters</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="row">
                    {filteredJobs.map(job => (
                      <JobCard key={job.id} job={job} onStatusChange={handleJobStatusChange} />
                    ))}
                  </div>

                  {/* Stats Section */}
                  <div className="row mt-3">
                    <StatsSection jobs={filteredJobs} />
                    <JobsByStatusChart jobs={filteredJobs} />
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Modals */}
        {showAddPostModal && (
          <AddPostModal
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onClose={handleCloseAddPost}
            onSubmit={handleSubmitJob}
            refreshJobs={fetchJobs}
          />
        )}

        {showSuccessModal && (
          <SuccessModal onClose={() => setShowSuccessModal(false)} />
        )}
      </div>
      <EmployerFooter />
    </>
  );
};

const Dropdown = ({ title, options, selected, multiSelect, onSelect }) => {
  return (
    <div className="dropdown me-2">
      <a href="javascript:void(0);" className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
        {title}
      </a>
      <ul className="dropdown-menu dropdown-menu-end p-3">
        {options.map((option, index) => (
          <li key={index}>
            <a
              href="javascript:void(0);"
              className={`dropdown-item rounded-1 ${multiSelect && selected?.includes(option) ? 'active' : ''}`}
              onClick={() => onSelect(option)}
            >
              {option}
              {multiSelect && selected?.includes(option) && <Check className="ms-2 float-end" size={16} />}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FilterSidebar = ({
  jobCategories,
  jobTypes,
  selectedCategories,
  selectedTypes,
  selectedGender,
  salaryRange,
  location,
  qualification,
  experienceRange,
  onCategoryChange,
  onTypeChange,
  onGenderChange,
  onSalaryRangeChange,
  onLocationChange,
  onQualificationChange,
  onExperienceRangeChange,
  onReset
}) => {
  // State to track which accordion items are open
  const [openAccordions, setOpenAccordions] = useState({
    layoutsetting: true,
    layoutsetting1: true,
    genderFilter: true,
    salaryFilter: true,
    locationFilter: true,
    qualificationFilter: true,
    experienceFilter: true
  });

  // Toggle accordion open/close state
  const toggleAccordion = (accordionId) => {
    setOpenAccordions(prev => ({
      ...prev,
      [accordionId]: !prev[accordionId]
    }));
  };

  return (
    <div className="themesettings-inner offcanvas-body">
      <div className="accordion accordion-customicon1 accordions-items-seperate" id="settingtheme">
        <h3 className="mb-1 text-secondary">Filter Jobs</h3>
        <p className="text-dark">Search & Filter</p>

        {/* Job Category Filter */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button text-dark fs-16 align-items-center justify-content-between"
              type="button"
              onClick={() => toggleAccordion('layoutsetting')}
            >
              Select Job Category
              {openAccordions.layoutsetting ? (
                <ChevronDown className="text-primary" />
              ) : (
                <ArrowUp className="text-primary" />
              )}
            </button>
          </h2>
          <div
            id="layoutsetting"
            className={`accordion-collapse collapse ${openAccordions.layoutsetting ? 'show' : ''}`}
          >
            <div className="accordion-body">
              <div className="row gx-3">
                <div className="form-group">
                  <div className="checkbox-limit">
                    <ul className="checkbox-list">
                      {jobCategories.map((category, index) => (
                        <li key={index} className="mb-2">
                          <label className="custom-checkbox">
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(category)}
                              onChange={() => onCategoryChange(category)}
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

        {/* Job Type Filter */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button text-dark fs-16 align-items-center justify-content-between"
              type="button"
              onClick={() => toggleAccordion('layoutsetting1')}
            >
              Select Job Type
              {openAccordions.layoutsetting1 ? (
                <ChevronDown className="text-primary" />
              ) : (
                <ArrowUp className="text-primary" />
              )}
            </button>
          </h2>
          <div
            id="layoutsetting1"
            className={`accordion-collapse collapse ${openAccordions.layoutsetting1 ? 'show' : ''}`}
          >
            <div className="accordion-body">
              <div className="row">
                <div className="form-group">
                  <div className="checkbox-limit">
                    <ul className="checkbox-list d-flex">
                      {jobTypes.map((type, index) => (
                        <li key={index} className="me-2">
                          <label className="custom-checkbox">
                            <input
                              type="checkbox"
                              checked={selectedTypes.includes(type)}
                              onChange={() => onTypeChange(type)}
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

        {/* Salary Range Filter */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button text-dark fs-16 align-items-center justify-content-between"
              type="button"
              onClick={() => toggleAccordion('salaryFilter')}
            >
              Salary Range
              {openAccordions.salaryFilter ? (
                <ChevronDown className="text-primary" />
              ) : (
                <ArrowUp className="text-primary" />
              )}
            </button>
          </h2>
          <div
            id="salaryFilter"
            className={`accordion-collapse collapse ${openAccordions.salaryFilter ? 'show' : ''}`}
          >
            <div className="accordion-body pb-0">
              <div className="row gx-3">
                <div className="form-group">
                  <div className="price-inputs d-flex mb-3">
                    <input
                      type="number"
                      className="form-control me-3"
                      placeholder="From"
                      value={salaryRange.from}
                      onChange={(e) => onSalaryRangeChange({ ...salaryRange, from: e.target.value })}
                    />
                    <input
                      type="number"
                      className="form-control"
                      placeholder="To"
                      value={salaryRange.to}
                      onChange={(e) => onSalaryRangeChange({ ...salaryRange, to: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Filter */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button text-dark fs-16 align-items-center justify-content-between"
              type="button"
              onClick={() => toggleAccordion('locationFilter')}
            >
              Location
              {openAccordions.locationFilter ? (
                <ChevronDown className="text-primary" />
              ) : (
                <ArrowUp className="text-primary" />
              )}
            </button>
          </h2>
          <div
            id="locationFilter"
            className={`accordion-collapse collapse ${openAccordions.locationFilter ? 'show' : ''}`}
          >
            <div className="accordion-body">
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Choose Location"
                  value={location}
                  onChange={(e) => onLocationChange(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Experience Filter */}
        {/* <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button text-dark fs-16 align-items-center justify-content-between"
              type="button"
              onClick={() => toggleAccordion('experienceFilter')}
            >
              Experience
              {openAccordions.experienceFilter ? (
                <ChevronDown className="text-primary" />
              ) : (
                <ArrowUp className="text-primary" />
              )}
            </button>
          </h2>
          <div
            id="experienceFilter"
            className={`accordion-collapse collapse ${openAccordions.experienceFilter ? 'show' : ''}`}
          >
            <div className="accordion-body pb-0">
              <div className="row gx-3">
                <div className="price-inputs d-flex mb-3">
                  <input
                    type="number"
                    className="form-control me-3"
                    placeholder="From"
                    value={experienceRange.from}
                    onChange={(e) => onExperienceRangeChange({ ...experienceRange, from: e.target.value })}
                  />
                  <input
                    type="number"
                    className="form-control"
                    placeholder="To"
                    value={experienceRange.to}
                    onChange={(e) => onExperienceRangeChange({ ...experienceRange, to: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="p-3 pt-5">
          <div className="row gx-3">
            <div className="col-6">
              <button
                onClick={onReset}
                className="btn btn-light close-theme w-100"
              >
                <RotateCw className="me-1" />Reset
              </button>
            </div>
            <div className="col-6">
              <button className="btn btn-secondary w-100" data-bs-dismiss="offcanvas">
                <CheckCircle2 className="me-1" />Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobCard = ({ job, onStatusChange }) => {
  const [isActive, setIsActive] = useState(job.status === 'Active');
  const [isUpdating, setIsUpdating] = useState(false);



  const handleStatusChange = async () => {
    try {
      setIsUpdating(true);
      const newStatus = !isActive;

      const token = localStorage.getItem('employerToken');
      if (!token) {
        throw new Error('Authentication required');
      }

      if (!job.id) {
        throw new Error('Job ID is missing');
      }

      const response = await axios.put(
        `https://edujobzbackend.onrender.com/employer/updatejobstatus/${job.id}`,
        { isActive: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.message) {
        setIsActive(newStatus);
        onStatusChange(job.id, newStatus ? 'Active' : 'Inactive');
        // You can add a toast notification here if you want
        console.log(response.data.message);
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating job status:', error);
      // Revert the toggle if the request failed
      setIsActive(!isActive);
      alert(`Error: ${error.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="col-xl-6 col-lg-6 col-md-6">
      <div className="card job" style={{
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
          e.currentTarget.style.border = '2px solid #000';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '';
          e.currentTarget.style.border = '';
          e.currentTarget.style.transform = '';
        }}>
        <div className="card-body mb-1 pb-1">
          {/* Add status toggle at the top right */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="badge bg-light text-dark">
              Status: {isActive ? 'Active' : 'Inactive'}
            </span>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id={`status-toggle-${job.id}`}
                checked={isActive}
                onChange={handleStatusChange}
                disabled={isUpdating}
              />
              <label className="form-check-label" htmlFor={`status-toggle-${job.id}`}>
                {isUpdating ? 'Updating...' : (isActive ? 'Active' : 'Inactive')}
              </label>
            </div>
          </div>


          <div className="card bg-light mb-3">
            <div className="card-body p-3">
              <div className="d-flex align-items-center">
                <a href="#" className="me-2">
                  <span className="avatar avatar-lg bg-gray">
                    <img
                      src={job.employerProfilePic || 'employeer/assets/img/icons/default.svg'}
                      style={{
                        width: '48px',
                        height: '48px',
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }}
                      alt="employer"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'employeer/assets/img/icons/default.svg'
                      }}
                    />
                  </span>
                </a>
                <div>
                  <h6 className="fs-17 fw-medium mb-0 text-truncate">
                    <a href="view-job">{job.title}</a>
                  </h6>
                  <p className="fs-13 text-primary fw-normal">{job.applicants} Applications</p>
                </div>
              </div>
            </div>
          </div>

          <div className="fs-16 d-flex flex-column mb-3">
            <p className="text-dark d-inline-flex align-items-center mb-1">
              <MapPin className="text-primary me-2" style={{ width: '14px', height: '14px' }} />
              {job.location}
            </p>
            <p className="text-dark d-inline-flex align-items-center mb-1">
              <IndianRupee className="text-primary me-2" style={{ width: '14px', height: '14px' }} />
              {job.salary}
            </p>
            <p className="text-dark d-inline-flex align-items-center mb-1">
              <Calendar className="text-primary me-2" style={{ width: '14px', height: '14px' }} />
              {job.experience}
            </p>
            <p className="text-dark d-inline-flex align-items-center mb-1">
              <Briefcase className="text-primary me-2" style={{ width: '14px', height: '14px' }} />
              {job.type}
            </p>
            <p className="text-dark d-inline-flex align-items-center">
              <Bus className="text-primary me-2" style={{ width: '14px', height: '14px' }} />
              {job.accommodation}
            </p>
          </div>

          {job.skills && job.skills.length > 0 && (
            <div className="mb-3">
              <Settings className="text-primary me-2" style={{ width: '14px', height: '14px' }} />Skillset:
              {job.skills.map((skill, index) => (
                <span key={index} className="badge bg-light ms-1">{skill}</span>
              ))}
            </div>
          )}

          <div className="progress progress-xs mb-1">
            <div
              className="progress-bar bg-secondary"
              role="progressbar"
              style={{ width: `${(job.shortlisted / Math.max(job.applicants, 1)) * 100}%` }}
            ></div>
          </div>

          <p className="fs-12 mb-0 text-gray fw-normal">
            {job.shortlisted} Shortlisted of {job.applicants} Applications
          </p>
        </div>

        {/* Combined row for Date Posted and both buttons */}
        <div className="d-flex justify-content-between align-items-center mb-2 mx-2">
          <span className="text-dark fs-13 ms-4 me-3">
            <b className="text-secondary">Date Posted:</b> {job.postedDate}
          </span>
          <div className="d-flex">
            {/* <a href="applied-candidates" className="badge bg-warning fs-12 fw-medium me-2">
              <Users className="me-1" style={{ width: '12px', height: '12px' }} /> Applied Candidates
            </a> */}
            <Link to={`/employer/applied-candidates/${job.id}`} className="badge bg-warning fs-12 fw-medium me-2">
              <Users className="me-1" style={{ width: '12px', height: '12px' }} /> Applied Candidates
            </Link>
            <Link to={`/employer/view-job/${job.id}`} className="badge bg-secondary fs-12 fw-medium">
              <Eye className="me-1" style={{ width: '12px', height: '12px' }} /> View Job Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
const StatsSection = ({ jobs }) => {
  const totalJobs = jobs.length;
  const totalApplicants = jobs.reduce((sum, job) => sum + job.applicants, 0);
  const pendingApplicants = jobs.reduce((sum, job) => {
    return sum + (job.applications ? job.applications.filter(app => app.employapplicantstatus === 'Pending').length : 0);
  }, 0);
  const shortlistedApplicants = jobs.reduce((sum, job) => {
    return sum + (job.applications ? job.applications.filter(app => app.employapplicantstatus === 'Shortlisted').length : 0);
  }, 0);

  const stats = [
    {
      title: "Total Jobs",
      value: totalJobs,
      progress: (totalJobs / Math.max(totalJobs, 1)) * 100,
      trend: "+10.54%",
      trendPositive: true,
      color: "bg-pink"
    },
    {
      title: "Shortlisted Candidates",
      value: shortlistedApplicants,
      progress: (shortlistedApplicants / Math.max(totalApplicants, 1)) * 100,
      trend: "+12.84%",
      trendPositive: true,
      color: "bg-success"
    },
    {
      title: "Pending Candidates",
      value: pendingApplicants,
      progress: (pendingApplicants / Math.max(totalApplicants, 1)) * 100,
      trend: "-10.75%",
      trendPositive: false,
      color: "bg-warning"
    },
    {
      title: "New Candidates",
      value: jobs.reduce((sum, job) => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return sum + (job.applications ? job.applications.filter(app => new Date(app.appliedDate) > oneWeekAgo).length : 0);
      }, 0),
      progress: 60,
      trend: "+15.74%",
      trendPositive: true,
      color: "bg-purple"
    }
  ];

  return (
    <div className="col-lg-6 col-md-6 d-flex">
      <div className="row flex-fill">
        {stats.map((stat, index) => (
          <div key={index} className="col-lg-6 col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-body">
                <div>
                  <div className="mb-2">
                    <span className="fs-14 fw-bold text-secondary mb-1">{stat.title}</span>
                    <h5>{stat.value}</h5>
                  </div>
                  <div
                    className="progress"
                    role="progressbar"
                    style={{ width: "100%", height: "5px" }}
                  >
                    <div
                      className={`progress-bar ${stat.color}`}
                      style={{ width: `${stat.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                    <span className={`fs-12 d-flex align-items-center me-1 ${stat.trendPositive ? "text-success" : "text-danger"
                      }`}>
                      <ArrowUpRight className="me-1" />
                      {stat.trend}
                    </span>
                    from last month
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const JobsByStatusChart = ({ jobs }) => {
  const statusCounts = {
    active: jobs.filter(job => job.status === 'Active').length,
    inactive: jobs.filter(job => job.status === 'Inactive').length,
    new: jobs.filter(job => job.status === 'New').length,
    onHold: jobs.filter(job => job.status === 'On Hold').length,
  };

  const totalJobs = jobs.length;

  return (
    <div className="col-lg-6 col-md-6 d-flex">
      <div className="card flex-fill">
        <div className="card-header border-0">
          <div className="d-flex flex-wrap justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <span className="me-2">
                <PieChart className="text-danger" />
              </span>
              <h5>Jobs By Status</h5>
            </div>
            <div className="dropdown">
              <a
                href="javascript:void(0);"
                className="dropdown-toggle btn btn-sm fs-12 btn-light d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                Choose State
              </a>
              <ul className="dropdown-menu dropdown-menu-end p-2">
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1">Karnataka</a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1">Tamilnadu</a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1">Andhra Pradesh</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card-body pt-0">
          <div className="row align-items-center">
            <div className="col-md-6 d-flex justify-content-center">
              <div id="project-report"></div>
            </div>
            <div className="col-md-6">
              <div className="row gy-4">
                <div className="col-md-6">
                  <p className="fs-16 project-report-badge-blue fw-normal mb-0 text-gray-5">Pending jobs</p>
                  <p className="fs-20 fw-bold text-dark">
                    {totalJobs > 0 ? Math.round((statusCounts.inactive / totalJobs) * 100) : 0}%
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="fs-16 project-report-badge-purple mb-0 fw-normal text-gray-5">On Hold</p>
                  <p className="fs-20 fw-bold text-dark">
                    {totalJobs > 0 ? Math.round((statusCounts.onHold / totalJobs) * 100) : 0}%
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="fs-16 project-report-badge-warning mb-0 fw-normal text-gray-5">Inprogress</p>
                  <p className="fs-20 fw-bold text-dark">20%</p>
                </div>
                <div className="col-md-6">
                  <p className="fs-16 project-report-badge-success mb-0 fw-normal text-gray-5">Active Jobs</p>
                  <p className="fs-20 fw-bold text-dark">
                    {totalJobs > 0 ? Math.round((statusCounts.active / totalJobs) * 100) : 0}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddPostModal = ({ activeTab, onTabChange, onClose, onSubmit, refreshJobs }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    employid: '',
    companyName: '',
    jobTitle: '',
    description: '',
    category: '',
    salaryFrom: '',
    salaryTo: '',
    salaryType: 'month',
    locationTypes: [],
    skills: [],
    benefits: '',
    jobType: 'Full Time',
    experienceLevel: '',
    educationLevel: '',
    deadline: '',
    openings: '',
    contactEmail: '',
    contactPhone: '',
    location: '',
    isRemote: false,
    companyUrl: '',
    applicationInstructions: '',
    priority: ''
  });

  const fetchEmployerData = async () => {
    try {
      const employerData = JSON.parse(localStorage.getItem('employerData'));

      if (!employerData || !employerData._id) {
        throw new Error('Employer not logged in or missing ID');
      }

      const token = localStorage.getItem('authToken');
      const response = await axios.get(`https://edujobzbackend.onrender.com/employer/fetchemployer/${employerData._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching employer data:', error);
      throw error;
    }
  };
  useEffect(() => {
    const fetchAndPrefillData = async () => {
      try {
        const employerData = await fetchEmployerData();

        // Prefill form with employer data
        const newFormData = {
          ...formData,
          companyName: employerData.schoolName || employerData.companyName || '',
          contactEmail: employerData.userEmail || '',
          contactPhone: employerData.userMobile || '',
          location: employerData.city || employerData.address || '',
          companyUrl: employerData.website || '',
          // Add other fields as needed
        };

        setFormData(newFormData);
      } catch (error) {
        console.error('Error pre-filling form:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndPrefillData();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddSkill = (skill) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async () => {
    try {
      const employerData = JSON.parse(localStorage.getItem('employerData'));
      if (!employerData || !employerData._id) {
        throw new Error('Employer ID not found');
      }

      const submitData = {
        applydatetime: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        employid: employerData._id,
        companyName: formData.companyName,
        jobTitle: formData.jobTitle,
        description: formData.description,
        category: formData.category,
        salaryFrom: formData.salaryFrom,
        salaryTo: formData.salaryTo,
        salaryType: formData.salaryType,
        locationTypes: formData.locationTypes,
        skills: formData.skills,
        benefits: formData.benefits,
        jobType: formData.jobType,
        experienceLevel: formData.experienceLevel,
        educationLevel: formData.educationLevel,
        deadline: formData.deadline ? new Date(formData.deadline).toISOString() : null,
        openings: formData.openings,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        location: formData.location,
        isRemote: formData.isRemote,
        companyUrl: formData.companyUrl,
        applicationInstructions: formData.applicationInstructions,
        priority: formData.priority,
      };

      const response = await axios.post('https://edujobzbackend.onrender.com/employer/postjob', submitData);

      if (response.data) {
        onSubmit();
        refreshJobs();
      }
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post job. Please try again.');
    }
  };

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Post Job</h4>
            <button
              type="button"
              className="btn-close custom-btn-close"
              onClick={onClose}
            >
              <X />
            </button>
          </div>

          <div className="modal-body pb-0">
            <div className="row">
              <div className="contact-grids-tab pt-0">
                <ul className="nav nav-underline" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${activeTab === 'basic-info' ? 'active' : ''}`}
                      onClick={() => onTabChange('basic-info')}
                    >
                      Basic Information
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${activeTab === 'address' ? 'active' : ''}`}
                      onClick={() => onTabChange('address')}
                    >
                      Location
                    </button>
                  </li>
                </ul>
              </div>

              <div className="tab-content" id="myTabContent">
                {activeTab === 'basic-info' && (
                  <BasicInfoTab
                    selectedFile={selectedFile}
                    onFileChange={handleFileChange}
                    formData={formData}
                    onInputChange={handleInputChange}
                    onAddSkill={handleAddSkill}
                    onRemoveSkill={handleRemoveSkill}
                  />
                )}

                {activeTab === 'address' && (
                  <AddressTab
                    formData={formData}
                    onInputChange={handleInputChange}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-light me-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={activeTab === 'basic-info' ? () => onTabChange('address') : handleSubmit}
            >
              {activeTab === 'basic-info' ? 'Save & Next' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BasicInfoTab = ({ selectedFile, onFileChange, formData, onInputChange, onAddSkill, onRemoveSkill }) => {
  const [newSkill, setNewSkill] = useState('');

  const handleSkillKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onAddSkill(newSkill);
      setNewSkill('');
    }
  };

  return (
    <div className="tab-pane fade show active" id="basic-info" role="tabpanel">
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Company Name <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              name="companyName"
              value={formData.companyName}
              onChange={onInputChange}
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Job Title <span className="text-danger">*</span></label>

            <input
              type="text"
              className="form-control"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={onInputChange}
              required
            />
          </div>
        </div>
        {/* Job Description */}
        <div className="col-md-12">
          <div className="mb-3">
            <label className="form-label">Job Description <span className="text-danger">*</span></label>
            <textarea
              rows="4"
              className="form-control"
              name="description"
              value={formData.description}
              onChange={onInputChange}
              required
            ></textarea>
          </div>
        </div>
        {/* Category */}
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Category <span className="text-danger">*</span></label>
            <select
              className="form-select"
              name="category"
              value={formData.category}
              onChange={onInputChange}
              required
            >
              <option value="">Select Category</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
            </select>
          </div>
        </div>

        {/* Job Type */}
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Job Type</label>
            <select
              className="form-select"
              name="jobType"
              value={formData.jobType}
              onChange={onInputChange}
            >
              <option value="">Select Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Temporary">Temporary</option>
            </select>
          </div>
        </div>

        {/* Experience & Education */}
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Experience Level</label>
            <select
              className="form-select"
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={onInputChange}
            >
              <option value="">Select Experience Level</option>
              <option value="Entry Level">Entry Level</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Senior Level">Senior Level</option>
              <option value="Executive">Executive</option>
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Education Level</label>
            <select
              className="form-select"
              name="educationLevel"
              value={formData.educationLevel}
              onChange={onInputChange}
            >
              <option value="">Select Education Level</option>
              <option value="High School">High School</option>
              <option value="Diploma">Diploma</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
              <option value="None">None</option>
            </select>
          </div>
        </div>
        {/* Salary Range */}
        <div className="col-md-4">
          <div className="mb-3">
            <label className="form-label">Salary From <span className="text-danger">*</span></label>
            <input
              type="number"
              className="form-control"
              name="salaryFrom"
              value={formData.salaryFrom}
              onChange={onInputChange}
              required
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className="mb-3">
            <label className="form-label">Salary To <span className="text-danger">*</span></label>
            <input
              type="number"
              className="form-control"
              name="salaryTo"
              value={formData.salaryTo}
              onChange={onInputChange}
              required
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className="mb-3">
            <label className="form-label">Salary Type</label>
            <select
              className="form-select"
              name="salaryType"
              value={formData.salaryType}
              onChange={onInputChange}
            >
              <option value="">Type</option>
              <option value="Monthly">Per Monthly</option>
              <option value="Yearly">LPA</option>
            </select>
          </div>
        </div>

        {/* Number of Openings */}
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Number of Openings</label>
            <input
              type="number"
              className="form-control"
              name="openings"
              value={formData.openings}
              onChange={onInputChange}
              min="1"
            />
          </div>
        </div>

        {/* Application Deadline */}
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Application Deadline</label>
            <input
              type="date"
              className="form-control"
              name="deadline"
              value={formData.deadline}
              onChange={onInputChange}
            />
          </div>
        </div>

        {/* Job Priority */}
        {/* <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Job Priority</label>
            <select
              className="form-select"
              name="priority"
              value={formData.priority}
              onChange={onInputChange}
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div> */}

        {/* Skills */}
        <div className="col-md-12">
          <div className="mb-3">
            <label className="form-label">Skills</label>
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Add skill and press Enter"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleSkillKeyPress}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  onAddSkill(newSkill);
                  setNewSkill('');
                }}
              >
                Add
              </button>
            </div>
            <div className="mt-2">
              {formData.skills.map((skill, index) => (
                <span key={index} className="badge bg-light me-1 mb-1">
                  {skill}
                  <button
                    type="button"
                    className="btn-close btn-close-white ms-1"
                    onClick={() => onRemoveSkill(skill)}
                    style={{ fontSize: '0.5rem' }}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Contact Email</label>
            <input
              type="email"
              className="form-control"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Contact Phone</label>
            <input
              type="tel"
              className="form-control"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={onInputChange}
            />
          </div>
        </div>

        {/* Company URL */}
        <div className="col-md-12">
          <div className="mb-3">
            <label className="form-label">Company Website</label>
            <input
              type="url"
              className="form-control"
              name="companyUrl"
              value={formData.companyUrl}
              onChange={onInputChange}
              placeholder="https://example.com"
            />
          </div>
        </div>

        {/* Benefits */}
        <div className="col-md-12">
          <div className="mb-3">
            <label className="form-label">Benefits</label>
            <textarea
              rows="3"
              className="form-control"
              name="benefits"
              value={formData.benefits}
              onChange={onInputChange}
              placeholder="Describe any benefits or perks"
            ></textarea>
          </div>
        </div>

        {/* Application Instructions */}
        <div className="col-md-12">
          <div className="mb-3">
            <label className="form-label">Application Instructions</label>
            <textarea
              rows="3"
              className="form-control"
              name="applicationInstructions"
              value={formData.applicationInstructions}
              onChange={onInputChange}
              placeholder="Special instructions for applicants"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

// Fixed AddressTab
const AddressTab = ({ formData, onInputChange }) => {
  const [newLocationType, setNewLocationType] = useState('');

  const handleAddLocationType = (type) => {
    if (type && !formData.locationTypes.includes(type)) {
      onInputChange({
        target: {
          name: 'locationTypes',
          value: [...formData.locationTypes, type]
        }
      });
      setNewLocationType('');
    }
  };

  const handleRemoveLocationType = (typeToRemove) => {
    onInputChange({
      target: {
        name: 'locationTypes',
        value: formData.locationTypes.filter(type => type !== typeToRemove)
      }
    });
  };

  const handleLocationTypeKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddLocationType(newLocationType);
    }
  };

  return (
    <div className="tab-pane fade show active" id="address" role="tabpanel" aria-labelledby="address-tab">
      <div className="row">
        {/* Location Input */}
        <div className="col-md-12">
          <div className="mb-3">
            <label className="form-label">Location <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={formData.location}
              onChange={onInputChange}
              placeholder="Enter job location (e.g., Bangalore, Karnataka)"
              required
            />
          </div>
        </div>

        {/* Location Types - Updated to match Skills UI */}
        <div className="col-md-12">
          <div className="mb-3">
            <label className="form-label">Location Types</label>
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Add location type and press Enter"
                value={newLocationType}
                onChange={(e) => setNewLocationType(e.target.value)}
                onKeyPress={handleLocationTypeKeyPress}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleAddLocationType(newLocationType)}
              >
                Add
              </button>
            </div>
            <div className="mt-2">
              {formData.locationTypes.map((type, index) => (
                <span key={index} className="badge bg-light me-1 mb-1">
                  {type}
                  <button
                    type="button"
                    className="btn-close btn-close-white ms-1"
                    onClick={() => handleRemoveLocationType(type)}
                    style={{ fontSize: '0.5rem' }}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Remote Job Toggle */}
        <div className="col-md-12">
          <div className="mb-3">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="remoteCheck"
                name="isRemote"
                checked={formData.isRemote || false}
                onChange={onInputChange}
              />
              <label className="form-check-label" htmlFor="remoteCheck">
                This is a Remote Job
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SuccessModal = ({ onClose }) => {
  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-xm">
        <div className="modal-content">
          <div className="modal-body">
            <div className="text-center p-3">
              <span className="avatar avatar-lg avatar-rounded bg-success mb-3">
                <Check className="fs-24" />
              </span>
              <h5 className="mb-2">Job Posted Successfully</h5>
              <div>
                <div className="row g-2">
                  <div className="col-12">
                    <button className="btn btn-dark w-100" onClick={onClose}>
                      Back to List
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeerPostJob;