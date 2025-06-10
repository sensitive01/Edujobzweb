import React, { useState, useEffect } from 'react';
import Jobsbreadcrumb from './jobsbreadcrumb';
import JobsFilter from './JobsFilter';

const JobsPageList = () => {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    jobType: '',
    location: '',
    experienceLevel: '',
    searchQuery: ''
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        let apiUrl = 'https://edujobzbackend.onrender.com/employer/fetchjobs';
        
        // Add query parameters if filters are applied
        const queryParams = new URLSearchParams();
        if (filters.jobType) queryParams.append('jobType', filters.jobType);
        if (filters.location) queryParams.append('location', filters.location);
        if (filters.experienceLevel) queryParams.append('experienceLevel', filters.experienceLevel);
        if (filters.searchQuery) queryParams.append('search', filters.searchQuery);
        
        if (queryParams.toString()) {
          apiUrl += `?${queryParams.toString()}`;
        }

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobListings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value;
    setFilters(prevFilters => ({
      ...prevFilters,
      searchQuery
    }));
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5 text-danger">
        <i className="fas fa-exclamation-triangle fa-2x mb-3"></i>
        <h5>Error loading jobs</h5>
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

  return (
    <>
      <Jobsbreadcrumb />
      
      {/* Main Content */}
      <main className="main">
        {/* Featured Jobs Section */}
        <section className="section section-categories section-theme-1 pt-35 pt-md-50 pt-lg-75 pt-xl-95 pb-35 pb-md-50 pb-xl-75">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* Page subheader */}
                <header className="page-subheader mb-30 mb-md-40 d-xxl-flex align-items-center justify-content-between">
                  <h3 className="h6 mb-25 mb-xxl-0 text-secondary">{jobListings.length} jobs found</h3>
                  <div className="subhead-filters d-xxl-flex align-items-center justify-content-between">
                    <div className="subhead-filters-item">
                      <label>Sort By</label>
                      <div className="form-group d-lg-flex align-items-center">
                        <select 
                          className="select2" 
                          name="sort" 
                          onChange={handleFilterChange}
                          value={filters.sort}
                        >
                          <option value="">Sort by</option>
                          <option value="newest">Newest Jobs</option>
                          <option value="oldest">Old Jobs</option>
                          <option value="salary-high">Salary (High to Low)</option>
                          <option value="salary-low">Salary (Low to High)</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid-buttons">
                      <a href="job-vacancies-list" className="btn btn-list active" type="button">
                        <img src="/images/list-icon.svg" width="20" height="20" alt="List" />
                      </a>
                      <a href="job-vacancies" className="btn btn-grid bg-light" type="button">
                        <img src="/images/grid-icon.svg" width="22" height="22" alt="Grid" />
                      </a>
                      <button className="btn btn-filters filters-opener bg-light" type="button">
                        <span></span>
                      </button>
                      <a href="job-vacancies-map" className="btn btn-grid" type="button">
                        <img src="/images/icons8-place-marker.gif" width="22" height="22" alt="Grid" />
                      </a>
                    </div>
                  </div>
                </header>
                
                <JobsFilter 
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onSearch={handleSearch}
                />
                
                <div className="row justify-content-center">
                  {jobListings.length > 0 ? (
                    jobListings.map(job => (
                      <div key={job._id} className="col-12 mb-40 mb-md-40">
                        <JobCard job={job} />
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center py-5">
                      <img src="/images/no-jobs-found.png" alt="No jobs found" width="150" className="mb-3" />
                      <h4>No jobs found matching your criteria</h4>
                      <p className="text-muted">Try adjusting your search filters</p>
                    </div>
                  )}
                </div>
                
                {/* Pagination Block */}
                {/* You can implement pagination here when your API supports it */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

// Job Card Component
const JobCard = ({ job }) => {
  return (
    <article className="popular-jobs-box">
      <div className="box-holder border border-grey shadow">
        <div className="job-info shadow">
          <div className="img-holder">
            <img 
              src="/images/default-company-logo.jpg" 
              width="78" 
              height="78" 
              alt={job.companyName}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/default-company-logo.jpg';
              }}
            />
          </div>
          <div className="textbox">
            <a href="#" className="btn-bookmark">
              <i className="icon-bookmark"></i>
            </a>
            <h3 className="h5 mb-0">{job.jobTitle}</h3>
            <ul className="meta-list">
              <li><span className="text">{job.companyName}</span></li>
              <li>
                <i className="icon-map-pin"></i>
                <span className="text">
                  {job.isRemote ? 'Remote' : job.location}
                  {job.isRemote && job.location ? ` (${job.location})` : ''}
                </span>
              </li>
            </ul>
            <ul className="tags-list">
              <li><span className="tag">{job.jobType}</span></li>
              <li><span className="tag">{job.experienceLevel}</span></li>
              {job.isRemote && <li><span className="tag">Remote</span></li>}
            </ul>
          </div>
        </div>
        <footer className="jobs-foot">
          <strong className="amount">
            ₹{job.salaryFrom} to ₹{job.salaryTo}<span>/{job.salaryType || 'month'}</span>
          </strong>
          <a href={`/job-details/${job._id}`} className="btn btn-green btn-sm">
            <span className="btn-text">
              <i className="fa fa-eye text-primary"></i> &nbsp; Apply Now
            </span>
          </a>
        </footer>
      </div>
    </article>
  );
};

export default JobsPageList;