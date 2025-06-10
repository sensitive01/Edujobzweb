import React from 'react';
import JobsFilter from './JobsFilter';
import Jobsbreadcrumb from './jobsbreadcrumb';

const JobPageMapGrid = () => {
 const jobListings = [
    {
      id: 1,
      logo: 'company-logo01.jpg',
      title: 'PGT Mathematics Teacher',
      company: 'Royal Public School',
      location: 'Bengaluru, Karnataka',
      tags: ['Remote', 'Full Time', 'Part Time'],
      salary: '₹ 30,000 to ₹ 45,000',
      bookmarked: false
    },
    {
      id: 2,
      logo: 'company-logo02.jpg',
      title: 'PGT Science Teacher',
      company: 'Deeksha International School',
      location: 'Bengaluru, Karnataka',
      tags: ['Remote', 'Full Time', 'Part Time'],
      salary: '₹ 30,000 to ₹ 45,000',
      bookmarked: false
    },
    {
      id: 3,
      logo: 'company-logo05.jpg',
      title: 'PGT Chemistry Teacher',
      company: 'Oxford English School',
      location: 'Bengaluru, Karnataka',
      tags: ['Remote', 'Full Time', 'Part Time'],
      salary: '₹ 30,000 to ₹ 45,000',
      bookmarked: false
    },
    {
      id: 4,
      logo: 'company-logo04.jpg',
      title: 'PGT Physics Teacher',
      company: 'Oxford English School',
      location: 'Bengaluru, Karnataka',
      tags: ['Remote', 'Full Time', 'Part Time'],
      salary: '₹ 30,000 to ₹ 45,000',
      bookmarked: false
    },
    {
      id: 5,
      logo: 'company-logo06.jpg',
      title: 'PGT Chemistry Teacher',
      company: 'Royal Public School',
      location: 'Bengaluru, Karnataka',
      tags: ['Remote', 'Full Time', 'Part Time'],
      salary: '₹ 30,000 to ₹ 45,000',
      bookmarked: false
    },
    {
      id: 6,
      logo: 'company-logo07.jpg',
      title: 'English Teacher',
      company: 'Deeksha International School',
      location: 'Bengaluru, Karnataka',
      tags: ['Remote', 'Full Time', 'Part Time'],
      salary: '₹ 30,000 to ₹ 45,000',
      bookmarked: false
    },
    {
      id: 7,
      logo: 'company-logo02.jpg',
      title: 'Kannada teacher',
      company: 'Royal Public School',
      location: 'Bengaluru, Karnataka',
      tags: ['Remote', 'Full Time', 'Part Time'],
      salary: '₹ 30,000 to ₹ 45,000',
      bookmarked: false
    }
  ];

  return (
    <>
      <Jobsbreadcrumb />
      
      {/* Main Content */}
      <main className="main">
        {/* Featured Jobs Section */}
        <section className="section section-categories section-theme-1 pt-35 pt-md-50 pt-lg-75 pt-xl-95 pb-35 pb-md-50 pb-xl-75">
          <div className="container">
            <div className="row">
              <div className="col-6">
                {/* Page subheader */}
                <header className="page-subheader mb-30 mb-md-40 d-xxl-flex align-items-center justify-content-between">
                  <h3 className="h6 mb-25 mb-xxl-0 text-secondary">7,096 jobs found</h3>
                  <div className="subhead-filters d-xxl-flex align-items-center justify-content-between">
                    <div className="subhead-filters-item">
                      <label>Sort By</label>
                      <div className="form-group d-lg-flex align-items-center">
                        <select className="select2" name="state" data-placeholder="Sort by">
                          <option label="Sort by"></option>
                          <option>Newest Jobs</option>
                          <option>Old Jobs</option>
                          <option>Sort by Date</option>
                          <option>Sort by Name</option>
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
                
                <JobsFilter />
                
                <div className="row justify-content-center">
                  {jobListings.map(job => (
                    <div key={job.id} className="col-12 mb-40 mb-md-40">
                      <JobCard job={job} />
                    </div>
                  ))}
                </div>
                
                {/* Pagination Block */}
                <div className="pagination-block pt-20 pt-lg-30 pt-xl-50 pb-0">
                  <div className="container d-flex align-items-center justify-content-center">
                    <ul className="pagination">
                      <li className="page-item disabled">
                        <a className="page-link" href="#">
                          <i className="icon-arrow-left1"></i>
                        </a>
                      </li>
                      <li className="page-item active"><a className="page-link" href="#">1</a></li>
                      <li className="page-item"><a className="page-link" href="#">2</a></li>
                      <li className="page-item"><a className="page-link" href="#">3</a></li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          <i className="icon-arrow-right"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-6"> 

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
            <img src={`/images/${job.logo}`} width="78" height="78" alt={job.company} />
          </div>
          <div className="textbox">
            <a href="#" className="btn-bookmark">
              <i className={`icon-bookmark ${job.bookmarked ? 'text-primary' : ''}`}></i>
            </a>
            <h3 className="h5 mb-0">{job.title}</h3>
            <ul className="meta-list">
              <li><span className="text">{job.company}</span></li>
              <li><i className="icon-map-pin"></i><span className="text">{job.location}</span></li>
            </ul>
            <ul className="tags-list">
              {job.tags.map((tag, index) => (
                <li key={index}><span className="tag">{tag}</span></li>
              ))}
            </ul>
          </div>
        </div>
        <footer className="jobs-foot">
          <strong className="amount">{job.salary}<span>/month</span></strong>
          <a href={`job-details/${job.id}`} className="btn btn-green btn-sm">
            <span className="btn-text">
              <i className="fa fa-eye text-primary"></i> &nbsp; Apply Now
            </span>
          </a>
        </footer>
      </div>
    </article>
  );
};

export default JobPageMapGrid;