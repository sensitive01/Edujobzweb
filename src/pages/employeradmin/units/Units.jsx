import React, { useState } from 'react';
import {
    ChevronDown,
    LayoutGrid,
    ListTree,
    Download,
    FileText,
    PlusCircle,
    ChevronsUp,
    Home,
    MapPin,
    Circle,
    Eye,
    Edit2,
    Trash2
} from 'lucide-react';
import company01 from '../../../assets/employer-admin/assets/img/company/company-01.svg';
import company02 from '../../../assets/employer-admin/assets/img/company/company-02.svg';
import company03 from '../../../assets/employer-admin/assets/img/company/company-03.svg';
import company04 from '../../../assets/employer-admin/assets/img/company/company-04.svg';
import company05 from '../../../assets/employer-admin/assets/img/company/company-05.svg';
import company06 from '../../../assets/employer-admin/assets/img/company/company-06.svg';
import company07 from '../../../assets/employer-admin/assets/img/company/company-07.svg';
import company08 from '../../../assets/employer-admin/assets/img/company/company-08.svg';
import company09 from '../../../assets/employer-admin/assets/img/company/company-09.svg';
import company10 from '../../../assets/employer-admin/assets/img/company/company-10.svg';

const UnitsPage = () => {
    const [selectedDateRange, setSelectedDateRange] = useState('');
    const [selectedPlan, setSelectedPlan] = useState('Select Plan');
    const [selectedStatus, setSelectedStatus] = useState('Select Status');
    const [sortBy, setSortBy] = useState('Last 7 Days');
    const [selectedAll, setSelectedAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [showPlanDropdown, setShowPlanDropdown] = useState(false);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [showExportDropdown, setShowExportDropdown] = useState(false);

    const schools = [
        {
            id: 1,
            name: 'BrightWave Innovations',
            email: 'contact@bwi.com',
            url: 'bwi.example.com',
            plan: 'Advanced (Monthly)',
            date: '12 Sep 2024',
            status: 'Active',
            image: company01
        },
        {
            id: 2,
            name: 'Stellar Dynamics',
            email: 'contact@sd.com',
            url: 'sd.example.com',
            plan: 'Basic (Yearly)',
            date: '24 Oct 2024',
            status: 'Active',
            image: company02
        },
        {
            id: 3,
            name: 'Quantum Nexus',
            email: 'contact@qn.com',
            url: 'qn.example.com',
            plan: 'Advanced (Monthly)',
            date: '18 Feb 2024',
            status: 'Active',
            image: company03
        },
        {
            id: 4,
            name: 'EcoVision Enterprises',
            email: 'contact@eve.com',
            url: 'eve.example.com',
            plan: 'Advanced (Monthly)',
            date: '17 Oct 2024',
            status: 'Active',
            image: company04
        },
        {
            id: 5,
            name: 'Aurora Technologies',
            email: 'contact@at.com',
            url: 'at.example.com',
            plan: 'Enterprise (Monthly)',
            date: '20 Jul 2024',
            status: 'Active',
            image: company05
        },
        {
            id: 6,
            name: 'BlueSky Ventures',
            email: 'contact@bsv.com',
            url: 'bsv.example.com',
            plan: 'Advanced (Monthly)',
            date: '10 Apr 2024',
            status: 'Active',
            image: company06
        },
        {
            id: 7,
            name: 'TerraFusion Energy',
            email: 'contact@tfe.com',
            url: 'tfe.example.com',
            plan: 'Enterprise (Yearly)',
            date: '29 Aug 2024',
            status: 'Active',
            image: company07
        },
        {
            id: 8,
            name: 'UrbanPulse Design',
            email: 'contact@upd.com',
            url: 'upd.example.com',
            plan: 'Basic (Monthly)',
            date: '22 Feb 2024',
            status: 'Inactive',
            image: company08
        },
        {
            id: 9,
            name: 'Nimbus Networks',
            email: 'contact@nn.com',
            url: 'nn.example.com',
            plan: 'Basic (Yearly)',
            date: '03 Nov 2024',
            status: 'Active',
            image: company09
        },
        {
            id: 10,
            name: 'Epicurean Delights',
            email: 'contact@ed.com',
            url: 'ed.example.com',
            plan: 'Advanced (Monthly)',
            date: '17 Dec 2024',
            status: 'Active',
            image: company10
        }
    ];

    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        setSelectedAll(isChecked);
        setSelectedRows(isChecked ? schools.map(school => school.id) : []);
    };

    const handleRowSelect = (id) => {
        setSelectedRows(prev =>
            prev.includes(id)
                ? prev.filter(rowId => rowId !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="content">
            {/* Breadcrumb */}
            <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                <div className="my-auto">
                    <h2>Units</h2>
                </div>
                <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
                    {/* Date Range Picker */}
                    <div className="me-2">
                        <div className="input-icon-end position-relative">
                            <input
                                type="text"
                                className="form-control date-range bookingrange"
                                placeholder="dd/mm/yyyy - dd/mm/yyyy"
                                value={selectedDateRange}
                                onChange={(e) => setSelectedDateRange(e.target.value)}
                            />
                            <span className="input-icon-addon">
                                <ChevronDown size={16} />
                            </span>
                        </div>
                    </div>

                    {/* Plan Dropdown */}
                    <div className="dropdown me-2">
                        <button
                            className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                            onClick={() => setShowPlanDropdown(!showPlanDropdown)}
                        >
                            {selectedPlan}
                        </button>
                        <ul
                            className={`dropdown-menu dropdown-menu-end p-3 ${showPlanDropdown ? 'show' : ''}`}
                            style={{ display: showPlanDropdown ? 'block' : 'none' }}
                        >
                            <li>
                                <button
                                    className="dropdown-item rounded-1"
                                    onClick={() => {
                                        setSelectedPlan('Advanced');
                                        setShowPlanDropdown(false);
                                    }}
                                >
                                    Advanced
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item rounded-1"
                                    onClick={() => {
                                        setSelectedPlan('Basic');
                                        setShowPlanDropdown(false);
                                    }}
                                >
                                    Basic
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item rounded-1"
                                    onClick={() => {
                                        setSelectedPlan('Enterprise');
                                        setShowPlanDropdown(false);
                                    }}
                                >
                                    Enterprise
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Status Dropdown */}
                    <div className="dropdown me-2">
                        <button className="dropdown-toggle btn btn-white d-inline-flex align-items-center">
                            {selectedStatus}
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li><button className="dropdown-item rounded-1" onClick={() => setSelectedStatus('Active')}>Active</button></li>
                            <li><button className="dropdown-item rounded-1" onClick={() => setSelectedStatus('Inactive')}>Inactive</button></li>
                        </ul>
                    </div>

                    {/* Sort By Dropdown */}
                    <div className="dropdown me-2">
                        <button className="dropdown-toggle btn btn-white d-inline-flex align-items-center">
                            Sort By: {sortBy}
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li><button className="dropdown-item rounded-1" onClick={() => setSortBy('Recently Added')}>Recently Added</button></li>
                            <li><button className="dropdown-item rounded-1" onClick={() => setSortBy('Ascending')}>Ascending</button></li>
                            <li><button className="dropdown-item rounded-1" onClick={() => setSortBy('Desending')}>Desending</button></li>
                            <li><button className="dropdown-item rounded-1" onClick={() => setSortBy('Last Month')}>Last Month</button></li>
                            <li><button className="dropdown-item rounded-1" onClick={() => setSortBy('Last 7 Days')}>Last 7 Days</button></li>
                        </ul>
                    </div>

                    {/* View Toggle */}
                    <div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
                        <a href="units" className="btn btn-icon btn-sm active bg-primary text-white">
                            <ListTree size={16} />
                        </a>
                        <a href="units-grid" className="btn btn-icon btn-sm me-1">
                            <LayoutGrid size={16} />
                        </a>
                    </div>

                    {/* Export Dropdown */}
                    <div className="me-2">
                        <div className="dropdown">
                            <button className="dropdown-toggle btn btn-white d-inline-flex align-items-center">
                                <Download size={16} className="me-1" />
                                Export
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li>
                                    <button className="dropdown-item rounded-1">
                                        <FileText size={16} className="me-1" />
                                        Export as PDF
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item rounded-1">
                                        <FileText size={16} className="me-1" />
                                        Export as Excel
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <a href="#" data-bs-toggle="modal" data-bs-target="#add_company" class="btn btn-primary d-flex align-items-center"><i class="ti ti-circle-plus me-2"></i>Add School</a>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="row">
                {/* Total Schools */}
                <div className="col-lg-3 col-md-6 d-flex">
                    <div className="card flex-fill">
                        <div className="card-body d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center overflow-hidden">
                                <span className="avatar avatar-lg bg-primary flex-shrink-0">
                                    <i className="ti ti-building fs-16"></i>
                                </span>
                                <div className="ms-2 overflow-hidden">
                                    <p className="fs-12 fw-medium mb-1 text-truncate">Total Schools</p>
                                    <h4>950</h4>
                                </div>
                            </div>
                            <div id="total-chart"></div>
                        </div>
                    </div>
                </div>

                {/* Active Schools */}
                <div className="col-lg-3 col-md-6 d-flex">
                    <div className="card flex-fill">
                        <div className="card-body d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center overflow-hidden">
                                <span className="avatar avatar-lg bg-success flex-shrink-0">
                                    <i className="ti ti-building fs-16"></i>
                                </span>
                                <div className="ms-2 overflow-hidden">
                                    <p className="fs-12 fw-medium mb-1 text-truncate">Active Schools</p>
                                    <h4>920</h4>
                                </div>
                            </div>
                            <div id="active-chart"></div>
                        </div>
                    </div>
                </div>
                {/* Inactive Schools */}
                <div className="col-lg-3 col-md-6 d-flex">
                    <div className="card flex-fill">
                        <div className="card-body d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center overflow-hidden">
                                <span className="avatar avatar-lg bg-danger flex-shrink-0">
                                    <i className="ti ti-building fs-16"></i>
                                </span>
                                <div className="ms-2 overflow-hidden">
                                    <p className="fs-12 fw-medium mb-1 text-truncate">Inactive Schools</p>
                                    <h4>30</h4>
                                </div>
                            </div>
                            <div id="inactive-chart"></div>
                        </div>
                    </div>
                </div>

                {/* School Location */}
                <div className="col-lg-3 col-md-6 d-flex">
                    <div className="card flex-fill">
                        <div className="card-body d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center overflow-hidden">
                                <span className="avatar avatar-lg bg-skyblue flex-shrink-0">
                                    <i className="ti ti-map-pin-check fs-16"></i>
                                </span>
                                <div className="ms-2 overflow-hidden">
                                    <p className="fs-12 fw-medium mb-1 text-truncate">School Location</p>
                                    <h4>180</h4>
                                </div>
                            </div>
                            <div id="location-chart"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Schools Table */}
            <div className="card">
                <div className="card-body p-0">
                    <div className="custom-datatable-filter table-responsive">
                        <table className="table datatable">
                            <thead className="thead-light">
                                <tr>
                                    <th className="no-sort">
                                        <div className="form-check form-check-md">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="select-all"
                                                checked={selectedAll}
                                                onChange={handleSelectAll}
                                            />
                                        </div>
                                    </th>
                                    <th>School Name</th>
                                    <th>Email</th>
                                    <th>Account URL</th>
                                    <th>Plan</th>
                                    <th>Created Date</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {schools.map((school) => (
                                    <tr key={school.id}>
                                        <td>
                                            <div className="form-check form-check-md">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={selectedRows.includes(school.id)}
                                                    onChange={() => handleRowSelect(school.id)}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center file-name-icon">
                                                <a href="#" className="avatar avatar-md border rounded-circle">
                                                    <img src={school.image} className="img-fluid" alt={school.name} />
                                                </a>
                                                <div className="ms-2">
                                                    <h6 className="fw-medium">
                                                        <a href="#">{school.name}</a>
                                                    </h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td><a href={`mailto:${school.email}`}>{school.email}</a></td>
                                        <td>{school.url}</td>
                                        <td>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <p className="mb-0 me-2">{school.plan}</p>
                                                <a href="#" className="badge badge-purple badge-xs">Upgrade</a>
                                            </div>
                                        </td>
                                        <td>{school.date}</td>
                                        <td>
                                            <span className={`badge ${school.status === 'Active' ? 'badge-success' : 'badge-danger'} d-inline-flex align-items-center badge-xs`}>
                                                <Circle size={12} className="me-1" fill="currentColor" />
                                                {school.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-icon d-inline-flex">
                                                <a href="#" className="me-2">
                                                    <Eye size={16} />
                                                </a>
                                                <a href="#" className="me-2">
                                                    <Edit2 size={16} />
                                                </a>
                                                <a href="#">
                                                    <Trash2 size={16} className="text-danger" />
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnitsPage;
