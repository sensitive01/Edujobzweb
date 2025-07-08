import React, { useState } from 'react';
import {
    ChevronDown,
    ChevronsUp,
    FileText,
    Download,
    Trash2,
    TrendingUp,
    Circle,
    FileType2,
    FileSpreadsheet,
    Calendar,
    FileOutput,
    CreditCard,
    Search,
} from 'lucide-react';
import EmployerAdminHeader from '../Layout/EmployerAdminHeader';
import EmployerAdminFooter from '../Layout/EmployerAdminFooter';

const EmployerAdminEnrollment = () => {
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');


    // Complete subscribers data
    const subscribersData = [
        {
            id: 1,
            company: "BrightWave Innovations",
            image: "company-01.svg",
            plan: "Advanced (Monthly)",
            billingCycle: "30 Days",
            paymentMethod: "Credit Card",
            amount: "$200",
            createdDate: "12 Sep 2024",
            expiringOn: "11 Oct 2024",
            status: "Paid",
            statusClass: "success"
        },
        {
            id: 2,
            company: "Stellar Dynamics",
            image: "company-02.svg",
            plan: "Basic (Yearly)",
            billingCycle: "365 Days",
            paymentMethod: "Paypal",
            amount: "$600",
            createdDate: "24 Oct 2024",
            expiringOn: "23 Oct 2025",
            status: "Paid",
            statusClass: "success"
        },
        {
            id: 3,
            company: "Quantum Nexus",
            image: "company-03.svg",
            plan: "Advanced (Monthly)",
            billingCycle: "30 Days",
            paymentMethod: "Debit Card",
            amount: "$200",
            createdDate: "18 Feb 2024",
            expiringOn: "17 Mar 2024",
            status: "Paid",
            statusClass: "success"
        },
        {
            id: 4,
            company: "EcoVision Enterprises",
            image: "company-04.svg",
            plan: "Advanced (Monthly)",
            billingCycle: "30 Days",
            paymentMethod: "Paypal",
            amount: "$200",
            createdDate: "17 Oct 2024",
            expiringOn: "16 Nov 2024",
            status: "Paid",
            statusClass: "success"
        },
        {
            id: 5,
            company: "Aurora Technologies",
            image: "company-05.svg",
            plan: "Enterprise (Monthly)",
            billingCycle: "30 Days",
            paymentMethod: "Credit Card",
            amount: "$400",
            createdDate: "20 Jul 2024",
            expiringOn: "19 Aug 2024",
            status: "Paid",
            statusClass: "success"
        },
        {
            id: 6,
            company: "BlueSky Ventures",
            image: "company-06.svg",
            plan: "Advanced (Monthly)",
            billingCycle: "30 Days",
            paymentMethod: "Paypal",
            amount: "$200",
            createdDate: "10 Apr 2024",
            expiringOn: "19 Aug 2024",
            status: "Paid",
            statusClass: "success"
        },
        {
            id: 7,
            company: "TerraFusion Energy",
            image: "company-07.svg",
            plan: "Enterprise (Yearly)",
            billingCycle: "365 Days",
            paymentMethod: "Credit Card",
            amount: "$4800",
            createdDate: "29 Aug 2024",
            expiringOn: "28 Aug 2025",
            status: "Paid",
            statusClass: "success"
        },
        {
            id: 8,
            company: "UrbanPulse Design",
            image: "company-08.svg",
            plan: "Basic (Monthly)",
            billingCycle: "30 Days",
            paymentMethod: "Credit Card",
            amount: "$50",
            createdDate: "22 Feb 2024",
            expiringOn: "21 Mar 2024",
            status: "Unpaid",
            statusClass: "danger"
        },
        {
            id: 9,
            company: "Nimbus Networks",
            image: "company-09.svg",
            plan: "Basic (Yearly)",
            billingCycle: "365 Days",
            paymentMethod: "Paypal",
            amount: "$600",
            createdDate: "03 Nov 2024",
            expiringOn: "02 Nov 2025",
            status: "Paid",
            statusClass: "success"
        },
        {
            id: 10,
            company: "Epicurean Delights",
            image: "company-10.svg",
            plan: "Advanced (Monthly)",
            billingCycle: "30 Days",
            paymentMethod: "Credit Card",
            amount: "$200",
            createdDate: "17 Dec 2024",
            expiringOn: "16 Jan 2024",
            status: "Paid",
            statusClass: "success"
        }
    ];

    // Complete stats data
    const statsData = [
        {
            title: "Total Transaction",
            value: "$5,340",
            lineClass: "subscription-line-1",
            trend: "+19.01%"
        },
        {
            title: "Total Subscribers",
            value: "600",
            lineClass: "subscription-line-2",
            trend: "+19.01%"
        },
        {
            title: "Active Subscribers",
            value: "560",
            lineClass: "subscription-line-3",
            trend: "+19.01%"
        },
        {
            title: "Expired Subscribers",
            value: "40",
            lineClass: "subscription-line-4",
            trend: "+19.01%"
        }
    ];

    const handleSelectAll = (e) => {
        setSelectAll(e.target.checked);
    };
    const filteredData = subscribersData.filter(subscriber =>
        subscriber.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscriber.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscriber.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscriber.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startEntry = (currentPage - 1) * rowsPerPage + 1;
    const endEntry = Math.min(currentPage * rowsPerPage, filteredData.length);
    const currentData = filteredData.slice(startEntry - 1, endEntry);
    return (
        <>
            <EmployerAdminHeader />
            <div className="content">
                {/* Breadcrumb Section */}
                <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                    <div className="my-auto">
                        <h2>Subscribers</h2>
                    </div>
                    <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
                        {/* Date Range Picker */}
                        <div className="me-2">
                            <div className="input-icon-end position-relative">
                                <input
                                    type="text"
                                    className="form-control date-range bookingrange"
                                    placeholder="dd/mm/yyyy - dd/mm/yyyy"
                                />
                                <span className="input-icon-addon">
                                    <ChevronDown size={16} />
                                </span>
                            </div>
                        </div>

                        {/* Plan Filter Dropdown */}
                        <div className="dropdown me-2">
                            <button className="dropdown-toggle btn btn-white d-inline-flex align-items-center">
                                Select Plan <ChevronDown size={16} className="ms-1" />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li><button className="dropdown-item rounded-1">Advanced (Monthly)</button></li>
                                <li><button className="dropdown-item rounded-1">Basic (Yearly)</button></li>
                                <li><button className="dropdown-item rounded-1">Enterprise (Monthly)</button></li>
                            </ul>
                        </div>

                        {/* Status Filter Dropdown */}
                        <div className="dropdown me-2">
                            <button className="dropdown-toggle btn btn-white d-inline-flex align-items-center">
                                Select Status <ChevronDown size={16} className="ms-1" />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li><button className="dropdown-item rounded-1">Paid</button></li>
                                <li><button className="dropdown-item rounded-1">Unpaid</button></li>
                            </ul>
                        </div>

                        {/* Sort Dropdown */}
                        <div className="dropdown me-2">
                            <button className="dropdown-toggle btn btn-white d-inline-flex align-items-center">
                                Sort By : Last 7 Days <ChevronDown size={16} className="ms-1" />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li><button className="dropdown-item rounded-1">Recently Added</button></li>
                                <li><button className="dropdown-item rounded-1">Ascending</button></li>
                                <li><button className="dropdown-item rounded-1">Descending</button></li>
                                <li><button className="dropdown-item rounded-1">Last Month</button></li>
                                <li><button className="dropdown-item rounded-1">Last 7 Days</button></li>
                            </ul>
                        </div>

                        {/* Export Dropdown */}
                        <div className="dropdown">
                            <button className="dropdown-toggle btn btn-white d-inline-flex align-items-center">
                                <FileOutput size={16} className="me-1" /> Export <ChevronDown size={16} className="ms-1" />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li>
                                    <button className="dropdown-item rounded-1">
                                        <FileType2 size={16} className="me-1" /> Export as PDF
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item rounded-1">
                                        <FileSpreadsheet size={16} className="me-1" /> Export as Excel
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* Collapse Button */}
                        <div className="head-icons">
                            <button data-bs-toggle="tooltip" data-bs-placement="top" title="Collapse">
                                <ChevronsUp size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards Section */}
                <div className="row">
                    {statsData.map((stat, index) => (
                        <div className="col-xl-3 col-md-6 d-flex" key={index}>
                            <div className="card flex-fill">
                                <div className="card-body">
                                    <div className="border-bottom pb-3 mb-3">
                                        <div className="row align-items-center">
                                            <div className="col-7">
                                                <div>
                                                    <span className="fs-14 fw-normal text-truncate mb-1">{stat.title}</span>
                                                    <h5>{stat.value}</h5>
                                                </div>
                                            </div>
                                            <div className="col-5">
                                                <div>
                                                    <span className={stat.lineClass} data-width="100%"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                                            <span className="text-primary fs-12 d-flex align-items-center me-1">
                                                <TrendingUp size={14} className="me-1" />
                                                {stat.trend}
                                            </span>
                                            from last week
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row mb-3">
                    <div className="col-sm-12 col-md-6">
                        <div className="dataTables_length d-flex align-items-center">
                            <label className="me-2 mb-0">Show</label>
                            <select
                                className="form-select form-select-sm w-auto"
                                value={rowsPerPage}
                                onChange={(e) => {
                                    setRowsPerPage(Number(e.target.value));
                                    setCurrentPage(1); // Reset to first page when changing rows per page
                                }}
                                style={{ padding: '0.25rem 1.5rem 0.25rem 0.5rem' }}
                            >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                            <label className="ms-2 mb-0">entries</label>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="dataTables_filter d-flex justify-content-end">
                            <div className="input-group input-group-sm" style={{ width: '250px' }}>
                                <input
                                    type="search"
                                    className="form-control form-control-sm"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1); // Reset to first page when searching
                                    }}
                                    style={{ padding: '0.375rem 0.75rem' }}
                                />
                                <span className="input-group-text bg-white">
                                    <Search size={16} className="text-muted" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subscribers Table Section */}
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
                                                    checked={selectAll}
                                                    onChange={handleSelectAll}
                                                />
                                            </div>
                                        </th>
                                        <th>Subscriber</th>
                                        <th>Plan</th>
                                        <th>Billing Cycle</th>
                                        <th>Payment Method</th>
                                        <th>Amount</th>
                                        <th>Created Date</th>
                                        <th>Expiring On</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.map((subscriber) => (
                                        <tr key={subscriber.id}>
                                            <td>
                                                <div className="form-check form-check-md">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={selectAll}
                                                        onChange={() => { }}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center file-name-icon">
                                                    <div className="avatar avatar-md border rounded-circle">
                                                        <img
                                                            src={`assets/img/company/${subscriber.image}`}
                                                            className="img-fluid"
                                                            alt={subscriber.company}
                                                        />
                                                    </div>
                                                    <div className="ms-2">
                                                        <h6 className="fw-medium">{subscriber.company}</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{subscriber.plan}</td>
                                            <td>{subscriber.billingCycle}</td>
                                            <td>{subscriber.paymentMethod}</td>
                                            <td>{subscriber.amount}</td>
                                            <td>{subscriber.createdDate}</td>
                                            <td>{subscriber.expiringOn}</td>
                                            <td>
                                                <span className={`badge badge-${subscriber.statusClass} d-flex align-items-center badge-xs`}>
                                                    <Circle size={10} className="me-1" fill="currentColor" />
                                                    {subscriber.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-icon d-inline-flex">
                                                    <button
                                                        className="me-2 btn btn-sm btn-icon"
                                                        onClick={() => setShowInvoiceModal(true)}
                                                        aria-label="View invoice"
                                                    >
                                                        <FileText size={16} />
                                                    </button>
                                                    <button
                                                        className="me-2 btn btn-sm btn-icon"
                                                        aria-label="Download"
                                                    >
                                                        <Download size={16} />
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-icon text-danger"
                                                        onClick={() => setShowDeleteModal(true)}
                                                        aria-label="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-sm-12 col-md-6">
                        <div className="dataTables_info">
                            Showing {startEntry} to {endEntry} of {filteredData.length} entries
                            {searchTerm && filteredData.length !== subscribersData.length && (
                                <span className="text-muted"> (filtered from {subscribersData.length} total entries)</span>
                            )}
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="dataTables_paginate paging_simple_numbers d-flex justify-content-end">
                            <ul className="pagination mb-0">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                    >
                                        &lt;
                                    </button>
                                </li>

                                {/* Always show first page */}
                                <li className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage(1)}
                                    >
                                        1
                                    </button>
                                </li>

                                {/* Show ellipsis if needed */}
                                {currentPage > 3 && (
                                    <li className="page-item disabled">
                                        <span className="page-link">...</span>
                                    </li>
                                )}

                                {/* Show current page and adjacent pages */}
                                {Array.from({ length: Math.min(3, totalPages - 2) }, (_, i) => {
                                    const page = Math.max(2, Math.min(currentPage - 1, totalPages - 3)) + i;
                                    if (page > 1 && page < totalPages) {
                                        return (
                                            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                                <button
                                                    className="page-link"
                                                    onClick={() => setCurrentPage(page)}
                                                >
                                                    {page}
                                                </button>
                                            </li>
                                        );
                                    }
                                    return null;
                                })}

                                {/* Show ellipsis if needed */}
                                {currentPage < totalPages - 2 && totalPages > 4 && (
                                    <li className="page-item disabled">
                                        <span className="page-link">...</span>
                                    </li>
                                )}

                                {/* Always show last page if there is more than one page */}
                                {totalPages > 1 && (
                                    <li className={`page-item ${currentPage === totalPages ? 'active' : ''}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => setCurrentPage(totalPages)}
                                        >
                                            {totalPages}
                                        </button>
                                    </li>
                                )}

                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                    >
                                        &gt;
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* View Invoice Modal */}
                {showInvoiceModal && (
                    <div className="modal fade show d-block" id="view_invoice">
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content">
                                <div className="modal-body p-5">
                                    <div className="row justify-content-between align-items-center mb-3">
                                        <div className="col-md-6">
                                            <div className="mb-4">
                                                <img src="assets/img/logo.svg" className="img-fluid" alt="logo" width="120" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="text-end mb-3">
                                                <h5 className="text-dark mb-1">Invoice</h5>
                                                <p className="mb-1 fw-normal">
                                                    <FileText size={14} className="me-1" />INV0287
                                                </p>
                                                <p className="mb-1 fw-normal">
                                                    <Calendar size={14} className="me-1" />Issue date : 12 Sep 2024
                                                </p>
                                                <p className="fw-normal">
                                                    <Calendar size={14} className="me-1" />Due date : 12 Oct 2024
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-3 d-flex justify-content-between">
                                        <div className="col-md-7">
                                            <p className="text-dark mb-2 fw-medium fs-16">Invoice From :</p>
                                            <div>
                                                <p className="mb-1">SmartHR</p>
                                                <p className="mb-1">367 Hillcrest Lane, Irvine, California, United States</p>
                                                <p className="mb-1">contact@smarthr.com</p>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <p className="text-dark mb-2 fw-medium fs-16">Invoice To :</p>
                                            <div>
                                                <p className="mb-1">BrightWave Innovations</p>
                                                <p className="mb-1">367 Hillcrest Lane, Irvine, California, United States</p>
                                                <p className="mb-1">contact@brightwave.com</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="table-responsive mb-3">
                                            <table className="table">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>Plan</th>
                                                        <th>Billing Cycle</th>
                                                        <th>Created Date</th>
                                                        <th>Expiring On</th>
                                                        <th>Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Advanced (Monthly)</td>
                                                        <td>30 Days</td>
                                                        <td>12 Sep 2024</td>
                                                        <td>12 Oct 2024</td>
                                                        <td>$200</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="row mb-3 d-flex justify-content-between">
                                        <div className="col-md-4">
                                            <div>
                                                <h6 className="mb-4">Payment info:</h6>
                                                <p className="mb-0 d-flex align-items-center">
                                                    <CreditCard size={16} className="me-2" /> Credit Card - 123***********789
                                                </p>
                                                <div className="d-flex justify-content-between align-items-center mb-2 pe-3 mt-3">
                                                    <p className="mb-0">Amount</p>
                                                    <p className="text-dark fw-medium mb-2">$200.00</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="d-flex justify-content-between align-items-center pe-3 mb-2">
                                                <p className="text-dark fw-medium mb-0">Sub Total</p>
                                                <p className="mb-0">$200.00</p>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center pe-3 mb-2">
                                                <p className="text-dark fw-medium mb-0">Tax</p>
                                                <p className="mb-0">$0.00</p>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center pe-3">
                                                <p className="text-dark fw-medium mb-0">Total</p>
                                                <p className="text-dark fw-medium mb-0">$200.00</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card border mb-0">
                                        <div className="card-body">
                                            <p className="text-dark fw-medium mb-2">Terms & Conditions:</p>
                                            <p className="fs-12 fw-normal d-flex align-items-baseline mb-2">
                                                <Circle size={8} className="text-primary me-2" fill="currentColor" />
                                                All payments must be made according to the agreed schedule. Late payments may incur additional fees.
                                            </p>
                                            <p className="fs-12 fw-normal d-flex align-items-baseline">
                                                <Circle size={8} className="text-primary me-2" fill="currentColor" />
                                                We are not liable for any indirect, incidental, or consequential damages, including loss of profits, revenue, or data.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 text-end">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => setShowInvoiceModal(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="modal fade show d-block" id="delete_modal">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-body text-center">
                                    <span className="avatar avatar-xl bg-transparent-danger text-danger mb-3">
                                        <Trash2 size={36} className="text-danger" />
                                    </span>
                                    <h4 className="mb-1">Confirm Delete</h4>
                                    <p className="mb-3">
                                        You want to delete all the marked items, this can't be undone once you delete.
                                    </p>
                                    <div className="d-flex justify-content-center">
                                        <button
                                            className="btn btn-light me-3"
                                            onClick={() => setShowDeleteModal(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                                setShowDeleteModal(false);
                                                // Add your delete logic here
                                            }}
                                        >
                                            Yes, Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal Backdrop */}
                {(showInvoiceModal || showDeleteModal) && (
                    <div
                        className="modal-backdrop fade show"
                        onClick={() => {
                            setShowInvoiceModal(false);
                            setShowDeleteModal(false);
                        }}
                    ></div>
                )}
            </div>
            <EmployerAdminFooter />
        </>
    );
};

export default EmployerAdminEnrollment;