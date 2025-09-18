import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import EmployerHeader from "../EmployerHeader";
import EmployerFooter from "../EmployerFooter";
import { getEmployerDashboardData } from "../../../api/services/projectServices";
import defaultImage from "../../../../public/images/jobImage.jpg"

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
        if (response.status===200) {
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
                <img
                  src={defaultImage}
                  className="rounded-circle"
                  alt="img"
                />
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
                <div className="col-md col-sm-6 border-end bg-light">
                  <div className="p-3">
                    <span className="fw-medium mb-1 d-block">
                      Applied Candidates
                    </span>
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="text-primary">
                        {dashboardData.appliedCount}
                      </h5>
                      <span className="badge badge-primary d-inline-flex align-items-center">
                        <i className="ti ti-user-plus me-1"></i>
                        Total
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md col-sm-6 border-end bg-light">
                  <div className="p-3">
                    <span className="fw-medium mb-1 d-block">
                      Shortlisted Candidates
                    </span>
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="text-success">
                        {dashboardData.shortlistedCount}
                      </h5>
                      <span className="badge badge-success d-inline-flex align-items-center">
                        <i className="ti ti-user-check me-1"></i>
                        Selected
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md col-sm-6 border-end bg-light">
                  <div className="p-3">
                    <span className="fw-medium mb-1 d-block">
                      Rejected Candidates
                    </span>
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="text-danger">
                        {dashboardData.rejectedCount}
                      </h5>
                      <span className="badge badge-danger d-inline-flex align-items-center">
                        <i className="ti ti-user-x me-1"></i>
                        Not Selected
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md col-sm-6 bg-light">
                  <div className="p-3">
                    <span className="fw-medium mb-1 d-block">
                      Pending for Review
                    </span>
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="text-warning">
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
            <div className="card flex-fill">
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
                    <h2 className="mb-1">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/employer/jobs");
                        }}
                        className="text-decoration-none"
                      >
                        {dashboardData.totalJobs}
                      </a>
                    </h2>
                    <p className="fs-13">Total Jobs Posted</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 d-flex">
            <div className="card flex-fill">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="avatar avatar-md bg-success mb-3">
                    <i className="ti ti-user-search fs-16"></i>
                  </span>
                  <span className="badge bg-info fw-normal mb-3">Active</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h2 className="mb-1">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/employer/jobs?filter=active");
                        }}
                        className="text-decoration-none"
                      >
                        {dashboardData.activeJobs}
                      </a>
                    </h2>
                    <p className="fs-13">Hiring Active Jobs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 d-flex">
            <div className="card flex-fill">
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
                    <h2 className="mb-1">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/employer/interviews");
                        }}
                        className="text-decoration-none"
                      >
                        {dashboardData.interviewScheduledCount}
                      </a>
                    </h2>
                    <p className="fs-13">Upcoming Interviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 d-flex">
            <div className="card flex-fill">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="avatar avatar-md bg-info mb-3">
                    <i className="ti ti-crown fs-16"></i>
                  </span>
                  <span className="badge bg-info fw-normal mb-3">Premium</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h2 className="mb-1">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/employer/plan");
                        }}
                        className="text-decoration-none"
                      >
                        30
                      </a>
                    </h2>
                    <p className="fs-13">Plan Validity (Days)</p>
                  </div>
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
