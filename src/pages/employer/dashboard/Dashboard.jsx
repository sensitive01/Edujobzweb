import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import EmployerHeader from "../EmployerHeader";
import EmployerFooter from "../EmployerFooter";
import { getEmployerDashboardData } from "../../../api/services/projectServices";
import defaultImage from "../../../../public/images/jobImage.jpg";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalJobs: 0,
    activeJobs: 0,
    appliedCount: 0,
    interviewScheduledCount: 0,
    shortlistedCount: 0,
    rejectedCount: 0,
    pendingCount: 0,
  });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const employerData = JSON.parse(localStorage.getItem("employerData"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getEmployerDashboardData(employerData?._id);
        if (response.status === 200) {
          setDashboardData(response.data.counts);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (employerData?._id) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    // Add CSS for hover effects
    const style = document.createElement("style");
    style.textContent = `
      .clickable-card {
        cursor: pointer;
        transition: all 0.3s ease;
        border: 1px solid #e9ecef;
      }
      
      .clickable-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border-color: #007bff;
      }
      
      .clickable-overview-card {
        cursor: pointer;
        transition: all 0.3s ease;
        background-color: #f8f9fa !important;
      }
      
      .clickable-overview-card:hover {
        background-color: #e9ecef !important;
        transform: translateY(-1px);
      }
      
      .card-link {
        text-decoration: none;
        color: inherit;
      }
      
      .card-link:hover {
        color: inherit;
        text-decoration: none;
      }
      
      .stat-number {
        transition: color 0.3s ease;
      }
      
      .clickable-card:hover .stat-number {
        color: #007bff !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (!employerData || !employerData._id) {
    navigate("/employer/login");
    return null;
  }

  const handleSearchCandidates = () => {
    navigate("/employer/search");
  };

  const handlePostJob = () => {
    navigate("/employer/post-jobs");
  };

  // Navigation handlers for overview cards
  const handleAppliedCandidates = () => {
    navigate("/employer/applied-candidates");
  };

  const handleShortlistedCandidates = () => {
    navigate("/employer/shortlisted-candidates");
  };

  const handleRejectedCandidates = () => {
    navigate("#");
  };

  const handlePendingCandidates = () => {
    navigate("/employer/applied-candidates");
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
            <p className="mt-2">Loading dashboard...</p>
          </div>
        </div>
        <EmployerFooter />
      </>
    );
  }

  return (
    <>
      <EmployerHeader />
      <div className="content">
        {/* Welcome Wrap */}
        <div className="card">
          <div className="card-body d-flex align-items-center justify-content-between flex-wrap pb-1">
            <div className="d-flex align-items-center mb-3">
              <span className="avatar avatar-xl flex-shrink-0">
                <img src={defaultImage} className="rounded-circle" alt="img" />
              </span>
              <div className="ms-3">
                <h3 className="mb-2">
                  Welcome Back, {employerData.schoolName || "School"}{" "}
                  <a href="javascript:void(0);" className="edit-icon">
                    <i className="ti ti-edit fs-14"></i>
                  </a>
                </h3>
                <p>
                  You have{" "}
                  <span className="text-primary text-decoration-underline">
                    {dashboardData.appliedCount}
                  </span>{" "}
                  Total Applications &{" "}
                  <span className="text-primary text-decoration-underline">
                    {dashboardData.pendingCount}
                  </span>{" "}
                  Pending Reviews
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center flex-wrap mb-1">
              <button
                onClick={handleSearchCandidates}
                className="btn btn-primary btn-md me-2 mb-2"
              >
                <i className="ti ti-search me-1"></i>Search Candidates
              </button>
              <button
                onClick={handlePostJob}
                className="btn btn-secondary btn-md me-2 mb-2"
              >
                <i className="ti ti-plus me-1"></i>Post Job
              </button>
            </div>
          </div>
        </div>
        {/* /Welcome Wrap */}

        {/* Candidates Overview */}
        <div className="card">
          <div className="card-body">
            <div className="row align-items-center mb-4">
              <div className="col-md-8">
                <div className="mb-3 mb-md-0">
                  <h4 className="mb-1">
                    Candidates (for current active positions only)
                  </h4>
                  <p>
                    Overview of candidate applications and their current status
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex align-items-center justify-content-md-end">
                  <h6>Active Jobs: {dashboardData.activeJobs}</h6>
                </div>
              </div>
            </div>
            <div className="border rounded">
              <div className="row gx-0">
                <div
                  className="col-md col-sm-6 border-end clickable-overview-card"
                  onClick={handleAppliedCandidates}
                >
                  <div className="p-3">
                    <span className="fw-medium mb-1 d-block">
                      Applied Candidates
                    </span>
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="text-primary stat-number">
                        {dashboardData.appliedCount}
                      </h5>
                      <span className="badge badge-primary d-inline-flex align-items-center">
                        <i className="ti ti-user-plus me-1"></i>
                        Total
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md col-sm-6 border-end clickable-overview-card"
                  onClick={handleShortlistedCandidates}
                >
                  <div className="p-3">
                    <span className="fw-medium mb-1 d-block">
                      Shortlisted Candidates
                    </span>
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="text-success stat-number">
                        {dashboardData.shortlistedCount}
                      </h5>
                      <span className="badge badge-success d-inline-flex align-items-center">
                        <i className="ti ti-user-check me-1"></i>
                        Selected
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md col-sm-6 border-end clickable-overview-card"
                  onClick={handleRejectedCandidates}
                >
                  <div className="p-3">
                    <span className="fw-medium mb-1 d-block">
                      Rejected Candidates
                    </span>
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="text-danger stat-number">
                        {dashboardData.rejectedCount}
                      </h5>
                      <span className="badge badge-danger d-inline-flex align-items-center">
                        <i className="ti ti-user-x me-1"></i>
                        Not Selected
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md col-sm-6 clickable-overview-card"
                  onClick={handlePendingCandidates}
                >
                  <div className="p-3">
                    <span className="fw-medium mb-1 d-block">
                      Pending for Review
                    </span>
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="text-warning stat-number">
                        {dashboardData.pendingCount}
                      </h5>
                      <span className="badge badge-warning d-inline-flex align-items-center">
                        <i className="ti ti-clock me-1"></i>
                        Awaiting
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="row">
          <div className="col-xl-3 col-sm-6 d-flex">
            <div
              className="card flex-fill clickable-card"
              onClick={() => navigate("/employer/post-jobs")}
            >
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="avatar avatar-md bg-primary mb-3">
                    <i className="ti ti-briefcase fs-16"></i>
                  </span>
                  <span className="badge bg-success fw-normal mb-3">
                    {dashboardData.activeJobs > 0 ? "+" : ""}
                    {dashboardData.activeJobs}
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h2 className="mb-1 stat-number">
                      {dashboardData.totalJobs}
                    </h2>
                    <p className="fs-13">Total Jobs Posted</p>
                  </div>
                  <i className="ti ti-arrow-up-right fs-16 text-muted"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 d-flex">
            <div
              className="card flex-fill clickable-card"
              onClick={() => navigate("/employer/post-jobs")}
            >
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="avatar avatar-md bg-success mb-3">
                    <i className="ti ti-user-search fs-16"></i>
                  </span>
                  <span className="badge bg-info fw-normal mb-3">Active</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h2 className="mb-1 stat-number">
                      {dashboardData.activeJobs}
                    </h2>
                    <p className="fs-13">Hiring Active Jobs</p>
                  </div>
                  <i className="ti ti-arrow-up-right fs-16 text-muted"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 d-flex">
            <div
              className="card flex-fill clickable-card"
              onClick={() => navigate("/employer/post-jobs")}
            >
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="avatar avatar-md bg-warning mb-3">
                    <i className="ti ti-calendar-event fs-16"></i>
                  </span>
                  <span className="badge bg-warning fw-normal mb-3">
                    Scheduled
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h2 className="mb-1 stat-number">
                      {dashboardData.interviewScheduledCount}
                    </h2>
                    <p className="fs-13">Upcoming Interviews</p>
                  </div>
                  <i className="ti ti-arrow-up-right fs-16 text-muted"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 d-flex">
            <div
              className="card flex-fill clickable-card"
              onClick={() => navigate("#")}
            >
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="avatar avatar-md bg-info mb-3">
                    <i className="ti ti-crown fs-16"></i>
                  </span>
                  <span className="badge bg-info fw-normal mb-3">Premium</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h2 className="mb-1 stat-number">30</h2>
                    <p className="fs-13">Plan Validity (Days)</p>
                  </div>
                  <i className="ti ti-arrow-up-right fs-16 text-muted"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EmployerFooter />
    </>
  );
};

export default Dashboard;
