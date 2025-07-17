import React, { useState } from 'react';

import EmployerHeader from '../EmployerHeader';
import EmployerFooter from '../EmployerFooter';
import TeacherModal from './Modal/TeacherModal';
import LeaveModal from './Modal/LeaveModal';
import UserModal from './Modal/UserModal';


const Dashboard = () => {
    const [showAddUnitModal, setShowAddUnitModal] = useState(false);
      const [showAddLeaveModal, setShowAddLeaveModal] = useState(false);
      const [showUserModal, setShowUserModal] = useState(false);
    return (
        <>
            <EmployerHeader />
            <div>
                {/* Welcome Wrap */}
                <div className="card">
                    <div className="card-body d-flex align-items-center justify-content-between flex-wrap pb-1">
                        <div className="d-flex align-items-center mb-3">
                            <span className="avatar avatar-xl flex-shrink-0">
                                <img src="assets/img/profiles/avatar-31.jpg" className="rounded-circle" alt="img" />
                            </span>
                            <div className="ms-3">
                                <h3 className="mb-2">
                                    Welcome Back, School{' '}
                                    <a href="javascript:void(0);" className="edit-icon">
                                        <i className="ti ti-edit fs-14"></i>
                                    </a>
                                </h3>
                                <p>
                                    You have <span className="text-primary text-decoration-underline">21</span> Pending Approvals &{' '}
                                    <span className="text-primary text-decoration-underline">14</span> Leave Requests
                                </p>
                            </div>
                        </div>
                        <div className="d-flex align-items-center flex-wrap mb-1">
                            <a
                              onClick={() => setShowUserModal(true)}
                                className="btn btn-primary btn-md me-2 mb-2"
                                data-bs-toggle="modal"
                                data-bs-target="#add_employee"
                            >
                                <i className="ti ti-user-check me-1"></i>Add User
                            </a>
                            <a
                                onClick={() => setShowAddUnitModal(true)}
                                className="btn btn-secondary btn-md me-2 mb-2"
                                data-bs-toggle="modal"
                                data-bs-target="#add_project"
                            >
                                <i className="ti ti-square-rounded-plus me-1"></i>Add Teacher
                            </a>
                            <a
                                 onClick={() => setShowAddLeaveModal(true)}
                                className="btn btn-default border border-dark btn-md mb-2"
                                data-bs-toggle="modal"
                                data-bs-target="#add_leaves"
                            >
                                <i className="ti ti-user-plus me-1"></i>Add Leave Requests
                            </a>
                        </div>
                    </div>
                </div>
                {/* /Welcome Wrap */}

                <div className="card">
                    <div className="card-body">
                        <div className="row align-items-center mb-4">
                            <div className="col-md-5">
                                <div className="mb-3 mb-md-0">
                                    <h4 className="mb-1">Attendance Details Today</h4>
                                    <p>Data from the 800+ total no of employees</p>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="d-flex align-items-center justify-content-md-end">
                                    <h6>Total Absenties today</h6>
                                    <div className="avatar-list-stacked avatar-group-sm ms-4">
                                        <span className="avatar avatar-rounded">
                                            <img className="border border-white" src="assets/img/profiles/avatar-02.jpg" alt="img" />
                                        </span>
                                        <span className="avatar avatar-rounded">
                                            <img className="border border-white" src="assets/img/profiles/avatar-03.jpg" alt="img" />
                                        </span>
                                        <span className="avatar avatar-rounded">
                                            <img className="border border-white" src="assets/img/profiles/avatar-05.jpg" alt="img" />
                                        </span>
                                        <span className="avatar avatar-rounded">
                                            <img className="border border-white" src="assets/img/profiles/avatar-06.jpg" alt="img" />
                                        </span>
                                        <span className="avatar avatar-rounded">
                                            <img className="border border-white" src="assets/img/profiles/avatar-07.jpg" alt="img" />
                                        </span>
                                        <a className="avatar bg-primary avatar-rounded text-fixed-white fs-12" href="javascript:void(0);">
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
                                            <h5>250</h5>
                                            <span className="badge badge-success d-inline-flex align-items-center">
                                                <i className="ti ti-arrow-wave-right-down me-1"></i>
                                                +1%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md col-sm-4 border-end bg-light">
                                    <div className="p-3">
                                        <span className="fw-medium mb-1 d-block">Late Login</span>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h5>45</h5>
                                            <span className="badge badge-danger d-inline-flex align-items-center">
                                                <i className="ti ti-arrow-wave-right-down me-1"></i>
                                                -1%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md col-sm-4 border-end bg-light">
                                    <div className="p-3">
                                        <span className="fw-medium mb-1 d-block">Uninformed</span>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h5>15</h5>
                                            <span className="badge badge-danger d-inline-flex align-items-center">
                                                <i className="ti ti-arrow-wave-right-down me-1"></i>
                                                -12%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md col-sm-4 border-end bg-light">
                                    <div className="p-3">
                                        <span className="fw-medium mb-1 d-block">Permisson</span>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h5>03</h5>
                                            <span className="badge badge-success d-inline-flex align-items-center">
                                                <i className="ti ti-arrow-wave-right-down me-1"></i>
                                                +1%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md col-sm-4 bg-light">
                                    <div className="p-3">
                                        <span className="fw-medium mb-1 d-block">Absent</span>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h5>12</h5>
                                            <span className="badge badge-danger d-inline-flex align-items-center">
                                                <i className="ti ti-arrow-wave-right-down me-1"></i>
                                                -19%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">

                    <div class="col-xl-3 col-sm-6 d-flex">
                        <div class="card flex-fill">
                            <div class="card-body">
                                <div class="d-flex align-items-center justify-content-between">
                                    <span class="avatar avatar-md bg-dark mb-3">
                                        <i class="ti ti-building fs-16"></i>
                                    </span>
                                    <span class="badge bg-success fw-normal mb-3">
                                        +19.01%
                                    </span>
                                </div>
                                <div class="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h2 class="mb-1"><a href="schools.php">5468</a></h2>
                                        <p class="fs-13">Total Schools</p>
                                    </div>
                                    <div class="company-bar1">5,10,7,5,10,7,5</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-sm-6 d-flex">
                        <div class="card flex-fill">
                            <div class="card-body">
                                <div class="d-flex align-items-center justify-content-between">
                                    <span class="avatar avatar-md bg-dark mb-3">
                                        <i class="ti ti-carousel-vertical fs-16"></i>
                                    </span>
                                    <span class="badge bg-danger fw-normal mb-3">
                                        -12%
                                    </span>
                                </div>
                                <div class="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h2 class="mb-1"><a href="jobs-grid.php">4598</a></h2>
                                        <p class="fs-13">Total Jobs</p>
                                    </div>
                                    <div class="company-bar2">5,3,7,6,3,10,5</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-sm-6 d-flex">
                        <div class="card flex-fill">
                            <div class="card-body">
                                <div class="d-flex align-items-center justify-content-between">
                                    <span class="avatar avatar-md bg-dark mb-3">
                                        <i class="ti ti-chalkboard-off fs-16"></i>
                                    </span>
                                    <span class="badge bg-success fw-normal mb-3">
                                        +6%
                                    </span>
                                </div>
                                <div class="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h2 class="mb-1"><a href="subscribers.php">3698</a></h2>
                                        <p class="fs-13">Total Subscribers</p>
                                    </div>
                                    <div class="company-bar3">8,10,10,8,8,10,8</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-sm-6 d-flex">
                        <div class="card flex-fill">
                            <div class="card-body">
                                <div class="d-flex align-items-center justify-content-between">
                                    <span class="avatar avatar-md bg-dark mb-3">
                                        <i class="ti ti-businessplan fs-16"></i>
                                    </span>
                                    <span class="badge bg-danger fw-normal mb-3">
                                        -16%
                                    </span>
                                </div>
                                <div class="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h2 class="mb-1"><a href="candidates.php">89,878,58</a></h2>
                                        <p class="fs-13">Total Candidates</p>
                                    </div>
                                    <div class="company-bar4">5,10,7,5,10,7,5</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <TeacherModal
                show={showAddUnitModal}
                onClose={() => setShowAddUnitModal(false)}
            />
             <LeaveModal
                show={showAddLeaveModal}
                onClose={() => setShowAddLeaveModal(false)}
            />
              <UserModal
                show={showUserModal}
                onClose={() => setShowUserModal(false)}
            />
            <EmployerFooter />
        </>
    );
};

export default Dashboard;