import React, { useState, useEffect } from "react";
import { projectServices } from "../../../api/axios/axiosInstance";
import AddTodoModal from "./modal/AddTodoModal";
import AddTeacherModal from "./modal/AddTeacherModal";
import AddLeavesModal from "./modal/AddLeavesModal";
import AddUserModal from "./modal/AddUserModal";
import user09 from "../../../assets/employer-admin/assets/img/profiles/avatar-09.jpg";
import AdminHeader from "../layout/AdminHeader";
import AdminFooter from "../layout/AdminFooter";

const AdminDashboard = () => {
  const [showTodotModal, setShowTodoModal] = useState(false);
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  const [stats, setStats] = useState({
    totalCandidates: 0,
    totalEmployers: 0,
    totalEmployerAdmins: 0,
    totalJobs: 0,
    totalApplications: 0,
    employerStats: [],
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await projectServices.get("/admin/dashboard-stats");
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stats.employerStats.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(stats.employerStats.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <AdminHeader />
      <div className="content">
        {/* Welcome Wrap */}
        <div className="card">
          <div className="card-body d-flex align-items-center justify-content-between flex-wrap pb-1">
            <div className="d-flex align-items-center mb-3">
              <span className="avatar avatar-xl flex-shrink-0">
                <img src={user09} className="rounded-circle" alt="img" />
              </span>
              <div className="ms-3">
                <h3 className="mb-2">
                  Welcome Back, Admin{" "}
                  <a href="/admin/profile" className="edit-icon">
                    <i className="ti ti-edit fs-14"></i>
                  </a>
                </h3>
                <p>
                  You have{" "}
                  <span className="text-primary text-decoration-underline">
                    21
                  </span>{" "}
                  Pending Approvals &{" "}
                  <span className="text-primary text-decoration-underline">
                    14
                  </span>{" "}
                  Leave Requests
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center flex-wrap mb-1">
              <a
                className="btn btn-primary btn-md me-2 mb-2"
                onClick={() => setShowUserModal(true)}
              >
                <i className="ti ti-user-check me-1"></i>Add User
              </a>
              {/* <a
                className="btn btn-secondary btn-md me-2 mb-2"
                onClick={() => setShowTeacherModal(true)}
              >
                <i className="ti ti-square-rounded-plus me-1"></i>Add Teacher
              </a> */}
              <a
                className="btn btn-default border border-dark btn-md mb-2"
                onClick={() => setShowLeaveModal(true)}
              >
                <i className="ti ti-user-plus me-1"></i>Add Leave Requests
              </a>
            </div>
          </div>
        </div>
        {/* /Welcome Wrap */}

        <div className="row">
          {/* Widget Info */}
          <div className="col-xxl-12">
            <div className="row row-cols-1 row-cols-md-5">
              <div className="col d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <span className="avatar rounded-circle bg-primary mb-2">
                      <i className="ti ti-users fs-16"></i>
                    </span>
                    <h6 className="fs-13 fw-medium text-default mb-1">
                      Total Candidates
                    </h6>
                    <h3 className="mb-3">{stats.totalCandidates}</h3>
                    <a href="/admin/candidate-list" className="link-default">
                      View All
                    </a>
                  </div>
                </div>
              </div>
              <div className="col d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <span className="avatar rounded-circle bg-secondary mb-2">
                      <i className="ti ti-building fs-16"></i>
                    </span>
                    <h6 className="fs-13 fw-medium text-default mb-1">
                      Total Employers
                    </h6>
                    <h3 className="mb-3">{stats.totalEmployers}</h3>
                    <a href="/admin/employer-list" className="link-default">
                      View All
                    </a>
                  </div>
                </div>
              </div>
              <div className="col d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <span className="avatar rounded-circle bg-info mb-2">
                      <i className="ti ti-user-shield fs-16"></i>
                    </span>
                    <h6 className="fs-13 fw-medium text-default mb-1">
                      Employer Admins
                    </h6>
                    <h3 className="mb-3">{stats.totalEmployerAdmins}</h3>
                    <a href="/admin/Organization-list" className="link-default">
                      View All
                    </a>
                  </div>
                </div>
              </div>
              <div className="col d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <span className="avatar rounded-circle bg-pink mb-2">
                      <i className="ti ti-briefcase fs-16"></i>
                    </span>
                    <h6 className="fs-13 fw-medium text-default mb-1">
                      Total Jobs
                    </h6>
                    <h3 className="mb-3">{stats.totalJobs}</h3>
                    <a href="/admin/job-list" className="link-default">
                      View All
                    </a>
                  </div>
                </div>
              </div>
              <div className="col d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <span className="avatar rounded-circle bg-purple mb-2">
                      <i className="ti ti-file-description fs-16"></i>
                    </span>
                    <h6 className="fs-13 fw-medium text-default mb-1">
                      Job Applications
                    </h6>
                    <h3 className="mb-3">{stats.totalApplications || 0}</h3>
                    <a href="/admin/job-list" className="link-default">
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xxl-12 d-flex">
            <div className="card flex-fill">
              <div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
                <h5 className="mb-2">Employer & Job Statistics</h5>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-nowrap mb-0">
                    <thead>
                      <tr>
                        <th style={{ width: "50px" }}>SL No</th>
                        <th>Employer / Admin Name</th>
                        <th className="text-center">Jobs Posted</th>
                        <th className="text-center">Total Applications</th>
                        <th className="text-center">Hired</th>
                        <th className="text-center">Shortlisted</th>
                        <th className="text-center">In-Interview</th>
                        <th className="text-center">Rejected</th>
                        <th className="text-center">Pending</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems &&
                        currentItems.map((emp, index) => (
                          <tr key={index}>
                            <td>{indexOfFirstItem + index + 1}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <h6 className="fw-medium">{emp.name}</h6>
                              </div>
                            </td>
                            <td className="text-center">
                              <span className="badge badge-soft-primary px-3">
                                {emp.jobsPosted}
                              </span>
                            </td>
                            <td className="text-center">
                              <span className="badge badge-soft-info px-3">
                                {emp.totalApplications}
                              </span>
                            </td>
                            <td className="text-center">
                              <span className="badge badge-success-transparent px-3">
                                {emp.statuses?.hired || 0}
                              </span>
                            </td>
                            <td className="text-center">
                              <span className="badge badge-info-transparent px-3">
                                {emp.statuses?.shortlisted || 0}
                              </span>
                            </td>
                            <td className="text-center">
                              <span className="badge badge-purple-transparent px-3 text-purple">
                                {emp.statuses?.interviewScheduled || 0}
                              </span>
                            </td>
                            <td className="text-center">
                              <span className="badge badge-danger-transparent px-3">
                                {emp.statuses?.rejected || 0}
                              </span>
                            </td>
                            <td className="text-center">
                              <span className="badge badge-warning-transparent px-3">
                                {emp.statuses?.pending || 0}
                              </span>
                            </td>
                          </tr>
                        ))}
                      {(!stats.employerStats ||
                        stats.employerStats.length === 0) && (
                        <tr>
                          <td colSpan="9" className="text-center p-4">
                            {loading
                              ? "Loading data..."
                              : "No employer statistics found"}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer border-top-0 pt-0">
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                  <p className="mb-2 fs-13">
                    Showing {indexOfFirstItem + 1} to{" "}
                    {Math.min(indexOfLastItem, stats.employerStats.length)} of{" "}
                    {stats.employerStats.length} entries
                  </p>
                  <nav aria-label="Page navigation">
                    <ul className="pagination pagination-sm mb-2">
                      <li
                        className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                      >
                        <button
                          className="page-link d-flex align-items-center justify-content-center"
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                          style={{ minWidth: "30px", height: "30px" }}
                        >
                          <i className="ti ti-chevron-left"></i>
                        </button>
                      </li>
                      {[...Array(totalPages)].map((_, i) => (
                        <li
                          key={i}
                          className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                        >
                          <button
                            className="page-link d-flex align-items-center justify-content-center"
                            onClick={() => paginate(i + 1)}
                            style={{ minWidth: "30px", height: "30px" }}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}
                      <li
                        className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                      >
                        <button
                          className="page-link d-flex align-items-center justify-content-center"
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          style={{ minWidth: "30px", height: "30px" }}
                        >
                          <i className="ti ti-chevron-right"></i>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pagination .page-link {
          font-size: 13px !important;
          border-radius: 4px !important;
          margin: 0 2px !important;
          padding: 0 !important;
          background-color: #fff !important;
          border-color: #dee2e6 !important;
          color: #6c757d !important;
        }
        .pagination .page-item.active .page-link {
          background-color: #0d6efd !important;
          border-color: #0d6efd !important;
          color: #fff !important;
        }
        .pagination .page-item.disabled .page-link {
          color: #ced4da !important;
          background-color: #f8f9fa !important;
        }
      `}</style>

      <AddTodoModal
        show={showTodotModal}
        onClose={() => setShowTodoModal(false)}
      />
      <AddTeacherModal
        show={showTeacherModal}
        onClose={() => setShowTeacherModal(false)}
      />
      <AddLeavesModal
        show={showLeaveModal}
        onClose={() => setShowLeaveModal(false)}
      />
      <AddUserModal
        show={showUserModal}
        onClose={() => setShowUserModal(false)}
      />
      <AdminFooter />
    </>
  );
};

export default AdminDashboard;
