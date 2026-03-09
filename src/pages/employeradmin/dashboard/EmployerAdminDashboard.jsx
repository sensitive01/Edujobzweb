import React, { useState, useEffect } from "react";
import EmployerAdminHeader from "../Layout/EmployerAdminHeader";
import EmployerAdminFooter from "../Layout/EmployerAdminFooter";
import AddTodoModal from "./modal/AddTodoModal";
import AddTeacherModal from "./modal/AddTeacherModal";
import AddLeavesModal from "./modal/AddLeavesModal";
import AddUserModal from "./modal/AddUserModal";

// Original imports for placeholders
import user02 from "../../../assets/employer-admin/assets/img/profiles/avatar-02.jpg";
import user03 from "../../../assets/employer-admin/assets/img/profiles/avatar-03.jpg";
import user05 from "../../../assets/employer-admin/assets/img/profiles/avatar-05.jpg";
import user07 from "../../../assets/employer-admin/assets/img/profiles/avatar-07.jpg";
import user09 from "../../../assets/employer-admin/assets/img/profiles/avatar-09.jpg";

const EmployerAdminDashboard = () => {
  const [stats, setStats] = useState({
    subunitCount: 0,
    totalJobs: 0,
    totalApplications: 0,
    totalCandidates: 0,
    shortlisted: 0,
    hired: 0,
    rejected: 0,
    interviewScheduled: 0,
    subunitStats: [],
  });
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState(null);

  // Pagination for Subunit Stats Table
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const storedAdminData = JSON.parse(
          localStorage.getItem("EmployerAdminData"),
        );
        if (storedAdminData) {
          setAdminData(storedAdminData);
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/employeradmin/dashboard-stats/${storedAdminData._id}`,
          );
          const data = await response.json();
          if (data.success) {
            setStats(data.data);
          }
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stats.subunitStats.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(stats.subunitStats.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [showTodotModal, setShowTodoModal] = useState(false);
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  if (loading) {
    return <div className="p-5 text-center">Loading Dashboard...</div>;
  }

  return (
    <>
      <EmployerAdminHeader />
      <div className="content">
        {/* Welcome Wrap */}
        <div className="card">
          <div className="card-body d-flex align-items-center justify-content-between flex-wrap pb-1">
            <div className="d-flex align-items-center mb-3">
              <span className="avatar avatar-xl flex-shrink-0">
                {adminData?.employeradminProfilePic ? (
                  <img
                    src={adminData.employeradminProfilePic}
                    className="rounded-circle"
                    alt="img"
                  />
                ) : (
                  <img src={user09} className="rounded-circle" alt="img" />
                )}
              </span>
              <div className="ms-3">
                <h3 className="mb-2">
                  Welcome Back,{" "}
                  {adminData?.employeradminUsername || "Employer Admin"}{" "}
                  <a
                    href="/employer-admin/school-profile"
                    className="edit-icon"
                  >
                    <i className="ti ti-edit fs-14"></i>
                  </a>
                </h3>
                <p>
                  You have{" "}
                  <span className="text-primary text-decoration-underline">
                    {stats.totalApplications}
                  </span>{" "}
                  Applications &{" "}
                  <span className="text-primary text-decoration-underline">
                    {stats.subunitCount}
                  </span>{" "}
                  Subunits registered
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
              <a
                className="btn btn-secondary btn-md me-2 mb-2"
                onClick={() => setShowTeacherModal(true)}
              >
                <i className="ti ti-square-rounded-plus me-1"></i>Add Teacher
              </a>
              <a
                className="btn btn-default border border-dark btn-md mb-2"
                onClick={() => setShowLeaveModal(true)}
              >
                <i className="ti ti-user-plus me-1"></i>Add Leave
              </a>
            </div>
          </div>
        </div>
        {/* /Welcome Wrap */}

        {/* Attendance Bar Placeholder */}
        <div className="card">
          <div className="card-body">
            <div className="row align-items-center mb-4">
              <div className="col-md-5">
                <div className="mb-3 mb-md-0">
                  <h4 className="mb-1">Attendance Details Today</h4>
                  <p>Data from the total no of employees</p>
                </div>
              </div>
              <div className="col-md-7">
                <div className="d-flex align-items-center justify-content-md-end">
                  <h6>Total Absenties today</h6>
                  <div className="avatar-list-stacked avatar-group-sm ms-4">
                    <span className="avatar avatar-rounded">
                      <img
                        className="border border-white"
                        src={user02}
                        alt="img"
                      />
                    </span>
                    <span className="avatar avatar-rounded">
                      <img
                        className="border border-white"
                        src={user03}
                        alt="img"
                      />
                    </span>
                    <span className="avatar avatar-rounded">
                      <img
                        className="border border-white"
                        src={user05}
                        alt="img"
                      />
                    </span>
                    <a
                      className="avatar bg-primary avatar-rounded text-fixed-white fs-12"
                      href="javascript:void(0);"
                    >
                      +1
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="border rounded">
              <div className="row gx-0">
                <div className="col-md col-sm-4 border-end bg-light">
                  <div className="p-3">
                    <span className="fw-medium mb-1 d-block">Present</span>
                    <div className="d-flex align-items-center justify-content-between">
                      <h5>-</h5>
                      <span className="badge badge-success d-inline-flex align-items-center">
                        <i className="ti ti-arrow-wave-right-down me-1"></i>
                        0%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md col-sm-4 border-end bg-light">
                  <div className="p-3">
                    <span className="fw-medium mb-1 d-block">Late</span>
                    <div className="d-flex align-items-center justify-content-between">
                      <h5>-</h5>
                      <span className="badge badge-danger d-inline-flex align-items-center">
                        <i className="ti ti-arrow-wave-right-down me-1"></i>
                        0%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md col-sm-4 bg-light">
                  <div className="p-3">
                    <span className="fw-medium mb-1 d-block">Absent</span>
                    <div className="d-flex align-items-center justify-content-between">
                      <h5>-</h5>
                      <span className="badge badge-danger d-inline-flex align-items-center">
                        <i className="ti ti-arrow-wave-right-down me-1"></i>
                        0%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Widget Info - Restored to 8 Widgets */}
          <div className="col-xxl-8 d-flex">
            <div className="row flex-fill">
              <div className="col-md-3 d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <span className="avatar rounded-circle bg-primary mb-2">
                      <i className="ti ti-building fs-16"></i>
                    </span>
                    <h6 className="fs-13 fw-medium text-default mb-1">
                      Total Subunits
                    </h6>
                    <h3 className="mb-3">{stats.subunitCount}</h3>
                    <a
                      href="/employer-admin/units-grid"
                      className="link-default text-decoration-underline"
                    >
                      View All
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-3 d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <span className="avatar rounded-circle bg-secondary mb-2">
                      <i className="ti ti-users fs-16"></i>
                    </span>
                    <h6 className="fs-13 fw-medium text-default mb-1">
                      Total Candidates
                    </h6>
                    <h3 className="mb-3">{stats.totalCandidates}</h3>
                    <a
                      href="/employer-admin/applied-candidates"
                      className="link-default text-decoration-underline"
                    >
                      View All
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-3 d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <span className="avatar rounded-circle bg-info mb-2">
                      <i className="ti ti-briefcase fs-16"></i>
                    </span>
                    <h6 className="fs-13 fw-medium text-default mb-1">
                      Total Jobs
                    </h6>
                    <h3 className="mb-3">{stats.totalJobs}</h3>
                    <a
                      href="/employer-admin/post-jobs"
                      className="link-default text-decoration-underline"
                    >
                      View All
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-3 d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <span className="avatar rounded-circle bg-pink mb-2">
                      <i className="ti ti-file-description fs-16"></i>
                    </span>
                    <h6 className="fs-13 fw-medium text-default mb-1">
                      Total Applications
                    </h6>
                    <h3 className="mb-3">{stats.totalApplications}</h3>
                    <a
                      href="/employer-admin/applied-candidates"
                      className="link-default text-decoration-underline"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-3 d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <span className="avatar rounded-circle bg-purple mb-2">
                      <i className="ti ti-user-check fs-16"></i>
                    </span>
                    <h6 className="fs-13 fw-medium text-default mb-1">
                      Shortlisted
                    </h6>
                    <h3 className="mb-3">{stats.shortlisted}</h3>
                    <a
                      href="/employer-admin/applied-candidates"
                      className="link-default text-decoration-underline"
                    >
                      View All
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-3 d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <span className="avatar rounded-circle bg-danger mb-2">
                      <i className="ti ti-check fs-16"></i>
                    </span>
                    <h6 className="fs-13 fw-medium text-default mb-1">Hired</h6>
                    <h3 className="mb-3">{stats.hired}</h3>
                    <a
                      href="/employer-admin/applied-candidates"
                      className="link-default text-decoration-underline"
                    >
                      View More
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-3 d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <span className="avatar rounded-circle bg-success mb-2">
                      <i className="ti ti-user-minus fs-16"></i>
                    </span>
                    <h6 className="fs-13 fw-medium text-default mb-1">
                      Rejected
                    </h6>
                    <h3 className="mb-3">{stats.rejected}</h3>
                    <a
                      href="/employer-admin/applied-candidates"
                      className="link-default text-decoration-underline"
                    >
                      View All
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-3 d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <span className="avatar rounded-circle bg-dark mb-2">
                      <i className="ti ti-calendar-event fs-16"></i>
                    </span>
                    <h6 className="fs-13 fw-medium text-default mb-1">
                      Interviewed
                    </h6>
                    <h3 className="mb-3">{stats.interviewScheduled}</h3>
                    <a
                      href="/employer-admin/applied-candidates"
                      className="link-default text-decoration-underline"
                    >
                      View All
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Todo & Sidebar */}
          <div className="col-xxl-4 col-xl-6 d-flex flex-column">
            <div className="card flex-fill">
              <div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
                <h5 className="mb-2">Todo</h5>
                <div className="d-flex align-items-center">
                  <a
                    className="btn btn-primary btn-icon btn-xs rounded-circle d-flex align-items-center justify-content-center p-0 mb-2"
                    onClick={() => setShowTodoModal(true)}
                  >
                    <i className="ti ti-plus fs-16"></i>
                  </a>
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex align-items-center todo-item border p-2 br-5 mb-2 bg-light">
                  <i className="ti ti-grid-dots me-2"></i>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="todo1"
                    />
                    <label
                      className="form-check-label fw-medium"
                      htmlFor="todo1"
                    >
                      Add Holidays
                    </label>
                  </div>
                </div>
                <div className="d-flex align-items-center todo-item border p-2 br-5 mb-2 bg-light">
                  <i className="ti ti-grid-dots me-2"></i>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="todo2"
                    />
                    <label
                      className="form-check-label fw-medium"
                      htmlFor="todo2"
                    >
                      Verify Job Postings
                    </label>
                  </div>
                </div>
                <div className="d-flex align-items-center todo-item border p-2 br-5 mb-0 bg-light">
                  <i className="ti ti-grid-dots me-2"></i>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="todo3"
                    />
                    <label
                      className="form-check-label fw-medium"
                      htmlFor="todo3"
                    >
                      Interview Feedback
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Job Applicants */}
            <div className="card flex-fill">
              <div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
                <h5 className="mb-2">Recent Job Applicants</h5>
                <a
                  href="/employer-admin/applied-candidates"
                  className="btn btn-light btn-md mb-2"
                >
                  View All
                </a>
              </div>
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="d-flex align-items-center">
                    <span className="avatar overflow-hidden flex-shrink-0 small">
                      <img
                        src={user03}
                        className="img-fluid rounded-circle"
                        alt="img"
                      />
                    </span>
                    <div className="ms-2 overflow-hidden">
                      <p className="text-dark fw-medium text-truncate mb-0">
                        Anthony Lewis
                      </p>
                      <span className="fs-13">Exp : 4+ Years</span>
                    </div>
                  </div>
                  <span className="badge badge-soft-info">PGT Teacher</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <span className="avatar overflow-hidden flex-shrink-0 small">
                      <img
                        src={user07}
                        className="img-fluid rounded-circle"
                        alt="img"
                      />
                    </span>
                    <div className="ms-2 overflow-hidden">
                      <p className="text-dark fw-medium text-truncate mb-0">
                        Stephan Peralt
                      </p>
                      <span className="fs-13">Exp : 6+ Years</span>
                    </div>
                  </div>
                  <span className="badge badge-soft-pink">Principal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subunit & Job Statistics Table - Moved and Styled */}
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap border-bottom-0">
                <h5 className="mb-2">Subunit & Job Statistics</h5>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover table-nowrap mb-0">
                    <thead className="thead-light">
                      <tr>
                        <th>SL No</th>
                        <th>Subunit Name</th>
                        <th className="text-center">Jobs Posted</th>
                        <th className="text-center">Applications</th>
                        <th className="text-center">Hired</th>
                        <th className="text-center">Shortlisted</th>
                        <th className="text-center">Interview</th>
                        <th className="text-center">Rejected</th>
                        <th className="text-center">Pending</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length > 0 ? (
                        currentItems.map((sub, index) => (
                          <tr key={sub.id}>
                            <td>{indexOfFirstItem + index + 1}</td>
                            <td>
                              <h6 className="fw-medium mb-0">{sub.name}</h6>
                            </td>
                            <td className="text-center">
                              <span className="badge badge-soft-primary px-3 fs-12">
                                {sub.jobsPosted}
                              </span>
                            </td>
                            <td className="text-center">
                              <span className="badge badge-soft-info px-3 fs-12">
                                {sub.applications}
                              </span>
                            </td>
                            <td className="text-center">
                              <span className="badge badge-success-transparent px-3 fs-12">
                                {sub.hired}
                              </span>
                            </td>
                            <td className="text-center">
                              <span className="badge badge-info-transparent px-3 fs-12">
                                {sub.shortlisted}
                              </span>
                            </td>
                            <td className="text-center">
                              <span className="badge badge-purple-transparent px-3 text-purple fs-12">
                                {sub.interviewScheduled}
                              </span>
                            </td>
                            <td className="text-center">
                              <span className="badge badge-danger-transparent px-3 fs-12">
                                {sub.rejected}
                              </span>
                            </td>
                            <td className="text-center">
                              <span className="badge badge-warning-transparent px-3 fs-12">
                                {sub.applications - (sub.hired + sub.shortlisted + sub.interviewScheduled + sub.rejected)}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="7"
                            className="text-center p-4 text-muted"
                          >
                            No subunit data found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer border-top-0">
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                  <p className="mb-2 fs-13">
                    Showing {indexOfFirstItem + 1} to{" "}
                    {Math.min(indexOfLastItem, stats.subunitStats.length)} of{" "}
                    {stats.subunitStats.length} entries
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

      {/* Modals */}
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
          background-color: #1b315b !important;
          border-color: #1b315b !important;
          color: #fff !important;
          border-radius: 4px !important;
        }
        .pagination .page-item.disabled .page-link {
          color: #ced4da !important;
          background-color: #f8f9fa !important;
        }
        .pagination .page-item .page-link:hover {
          background-color: #f8f9fa !important;
          color: #1b315b !important;
        }
      `}</style>
      <EmployerAdminFooter />
    </>
  );
};

export default EmployerAdminDashboard;
