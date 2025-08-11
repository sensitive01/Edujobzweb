import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../Layout/AdminHeader';
import AdminFooter from '../Layout/AdminFooter';

const EmployerList = () => {
  const navigate = useNavigate();
  const [employers, setEmployers] = useState([]);
  const [filteredEmployers, setFilteredEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('Last 7 Days');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('This Year');
  const [selectedEmployers, setSelectedEmployers] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [showAddEmployerModal, setShowAddEmployerModal] = useState(false);
  const [showEditEmployerModal, setShowEditEmployerModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employerToDelete, setEmployerToDelete] = useState(null);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);

  // Dynamic filter states
  const [employerTypes, setEmployerTypes] = useState({});
  const [institutionTypes, setInstitutionTypes] = useState({});
  const [states, setStates] = useState({});
  const [subscriptionStatus, setSubscriptionStatus] = useState('All');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [selectedDateRange, setSelectedDateRange] = useState('This Year');
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  const getDynamicDateRangeOptions = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();

    return [
      {
        label: 'Today',
        value: 'today',
        dateLabel: `${currentDate.toString().padStart(2, '0')}/${currentMonth.toString().padStart(2, '0')}/${currentYear}`
      },
      {
        label: 'Yesterday',
        value: 'yesterday',
        dateLabel: (() => {
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          return `${yesterday.getDate().toString().padStart(2, '0')}/${(yesterday.getMonth() + 1).toString().padStart(2, '0')}/${yesterday.getFullYear()}`;
        })()
      },
      {
        label: 'Last 7 Days',
        value: 'last7days',
        dateLabel: (() => {
          const week = new Date(today);
          week.setDate(week.getDate() - 7);
          return `${week.getDate().toString().padStart(2, '0')}/${(week.getMonth() + 1).toString().padStart(2, '0')}/${week.getFullYear()} - ${currentDate.toString().padStart(2, '0')}/${currentMonth.toString().padStart(2, '0')}/${currentYear}`;
        })()
      },
      {
        label: 'Last 30 Days',
        value: 'last30days',
        dateLabel: (() => {
          const month = new Date(today);
          month.setDate(month.getDate() - 30);
          return `${month.getDate().toString().padStart(2, '0')}/${(month.getMonth() + 1).toString().padStart(2, '0')}/${month.getFullYear()} - ${currentDate.toString().padStart(2, '0')}/${currentMonth.toString().padStart(2, '0')}/${currentYear}`;
        })()
      },
      {
        label: 'This Year',
        value: 'thisyear',
        dateLabel: `01/01/${currentYear} - 31/12/${currentYear}`
      },
      {
        label: 'Last Year',
        value: 'lastyear',
        dateLabel: `01/01/${currentYear - 1} - 31/12/${currentYear - 1}`
      },
      {
        label: 'Custom Range',
        value: 'custom',
        dateLabel: 'Select dates'
      }
    ];
  };

  const handleDateRangeSelect = (option) => {
    if (option.value === 'custom') {
      setSelectedDateRange('Custom Range');
      return;
    }

    setSelectedDateRange(option.label);
    const today = new Date();
    let startDate, endDate;

    switch (option.value) {
      case 'today':
        startDate = endDate = today.toISOString().split('T')[0];
        break;
      case 'yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        startDate = endDate = yesterday.toISOString().split('T')[0];
        break;
      case 'last7days':
        const week = new Date(today);
        week.setDate(week.getDate() - 7);
        startDate = week.toISOString().split('T')[0];
        endDate = today.toISOString().split('T')[0];
        break;
      case 'last30days':
        const month = new Date(today);
        month.setDate(month.getDate() - 30);
        startDate = month.toISOString().split('T')[0];
        endDate = today.toISOString().split('T')[0];
        break;
      case 'thisyear':
        startDate = `${today.getFullYear()}-01-01`;
        endDate = `${today.getFullYear()}-12-31`;
        break;
      case 'lastyear':
        startDate = `${today.getFullYear() - 1}-01-01`;
        endDate = `${today.getFullYear() - 1}-12-31`;
        break;
      default:
        return;
    }

    setDateRange({ start: startDate, end: endDate });
  };

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://edujobzbackend.onrender.com/admin/getallemployers');

        if (!response.ok) {
          throw new Error('Failed to fetch employers');
        }

        const data = await response.json();
        setEmployers(data.data || []);
        setFilteredEmployers(data.data || []);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployers();
  }, []);

  // Extract filter options from employers
  useEffect(() => {
    if (employers.length > 0) {
      // Get unique employer types
      const types = [...new Set(employers.map(e => e.employerType).filter(Boolean))];
      const initialTypes = types.reduce((acc, type) => {
        acc[type] = false;
        return acc;
      }, {});

      // Get unique institution types
      const instTypes = [...new Set(employers.map(e => e.institutionType).filter(Boolean))];
      const initialInstTypes = instTypes.reduce((acc, type) => {
        acc[type] = false;
        return acc;
      }, {});

      // Get unique states
      const uniqueStates = [...new Set(employers.map(e => e.state).filter(Boolean))];
      const initialStates = uniqueStates.reduce((acc, state) => {
        acc[state] = false;
        return acc;
      }, {});

      setEmployerTypes(initialTypes);
      setInstitutionTypes(initialInstTypes);
      setStates(initialStates);
    }
  }, [employers]);

  // Apply all filters
  const applyFilters = () => {
    let filtered = [...employers];

    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);

      // Set time to beginning and end of day respectively
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      filtered = filtered.filter(employer => {
        if (!employer.createdAt) return false;
        const createdDate = new Date(employer.createdAt);
        return createdDate >= startDate && createdDate <= endDate;
      });
    }

    // Type filter
    if (selectedType !== 'All') {
      filtered = filtered.filter(employer => employer.employerType === selectedType);
    }

    // Status filter
    if (selectedStatus !== 'All') {
      filtered = filtered.filter(employer => employer.verificationstatus === selectedStatus);
    }

    // Subscription status filter
    if (subscriptionStatus !== 'All') {
      if (subscriptionStatus === 'subscribed') {
        filtered = filtered.filter(employer => employer.subscription === 'true');
      } else if (subscriptionStatus === 'trial') {
        filtered = filtered.filter(employer => employer.trial === 'true');
      } else {
        filtered = filtered.filter(employer => employer.subscription === 'false' && employer.trial === 'false');
      }
    }

    // Search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(employer =>
        employer.schoolName?.toLowerCase().includes(term) ||
        employer.userEmail?.toLowerCase().includes(term) ||
        `${employer.firstName || ''} ${employer.lastName || ''}`.toLowerCase().includes(term) ||
        employer.userMobile?.includes(term)
      );
    }

    // Employer Type filter
    const selectedEmployerTypes = Object.keys(employerTypes).filter(type => employerTypes[type]);
    if (selectedEmployerTypes.length > 0) {
      filtered = filtered.filter(employer =>
        selectedEmployerTypes.includes(employer.employerType)
      );
    }

    // Institution Type filter
    const selectedInstitutionTypes = Object.keys(institutionTypes).filter(type => institutionTypes[type]);
    if (selectedInstitutionTypes.length > 0) {
      filtered = filtered.filter(employer =>
        employer.institutionType && selectedInstitutionTypes.includes(employer.institutionType)
      );
    }

    // State filter
    const selectedStates = Object.keys(states).filter(state => states[state]);
    if (selectedStates.length > 0) {
      filtered = filtered.filter(employer =>
        employer.state && selectedStates.includes(employer.state)
      );
    }

    setFilteredEmployers(filtered);
    setShowFilterSidebar(false);
  };

  // Reset all filters
  const resetFilters = () => {
    // Reset employer types
    const resetTypes = Object.keys(employerTypes).reduce((acc, type) => {
      acc[type] = false;
      return acc;
    }, {});

    // Reset institution types
    const resetInstTypes = Object.keys(institutionTypes).reduce((acc, type) => {
      acc[type] = false;
      return acc;
    }, {});

    // Reset states
    const resetStates = Object.keys(states).reduce((acc, state) => {
      acc[state] = false;
      return acc;
    }, {});

    setEmployerTypes(resetTypes);
    setInstitutionTypes(resetInstTypes);
    setStates(resetStates);
    setSelectedType('All');
    setSelectedStatus('All');
    setSubscriptionStatus('All');
    setDateRange({ start: '', end: '' });
    setSelectedDateRange('This Year');
    setFilteredEmployers(employers);
  };

  // Handle employer type checkbox change
  const handleEmployerTypeChange = (type) => {
    setEmployerTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Handle institution type checkbox change
  const handleInstitutionTypeChange = (type) => {
    setInstitutionTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Handle state checkbox change
  const handleStateChange = (state) => {
    setStates(prev => ({
      ...prev,
      [state]: !prev[state]
    }));
  };

  const handleTypeFilter = (type) => {
    setSelectedType(type);
    applyFilters();
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    applyFilters();
  };

  const handleSubscriptionFilter = (status) => {
    setSubscriptionStatus(status);
    applyFilters();
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    applyFilters();
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedEmployers(filteredEmployers.map(employer => employer._id));
    } else {
      setSelectedEmployers([]);
    }
  };

  const handleSelectEmployer = (employerId) => {
    if (selectedEmployers.includes(employerId)) {
      setSelectedEmployers(selectedEmployers.filter(id => id !== employerId));
    } else {
      setSelectedEmployers([...selectedEmployers, employerId]);
    }
  };

  const handleDeleteClick = (employer) => {
    setEmployerToDelete(employer);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (employerToDelete) {
        const response = await fetch(
          `https://edujobzbackend.onrender.com/admin/deleteemployer/${employerToDelete._id}`,
          {
            method: 'DELETE'
          }
        );

        if (!response.ok) {
          throw new Error('Failed to delete employer');
        }

        // Remove the deleted employer from state
        setEmployers(employers.filter(e => e._id !== employerToDelete._id));
        setFilteredEmployers(filteredEmployers.filter(e => e._id !== employerToDelete._id));
      }
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.message);
    } finally {
      setShowDeleteModal(false);
      setEmployerToDelete(null);
    }
  };

  const handleBlockStatusToggle = async (employerId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'block' ? 'unblock' : 'block';

      const response = await fetch(
        `https://edujobzbackend.onrender.com/admin/updateblockstatusemployer/${employerId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ blockstatus: newStatus })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update block status');
      }

      // Update the local state
      setEmployers(employers.map(employer =>
        employer._id === employerId
          ? { ...employer, blockstatus: newStatus }
          : employer
      ));

      setFilteredEmployers(filteredEmployers.map(employer =>
        employer._id === employerId
          ? { ...employer, blockstatus: newStatus }
          : employer
      ));

    } catch (err) {
      console.error('Error updating block status:', err);
      setError(err.message);
    }
  };

  const viewEmployerDetails = (employer) => {
    setSelectedEmployer(employer);
    setShowDetails(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return 'badge bg-success';
      case 'pending':
        return 'badge bg-warning';
      case 'rejected':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  };

  const getSubscriptionBadge = (subscription, trial) => {
    if (trial === 'true') {
      return 'badge bg-info';
    } else if (subscription === 'true') {
      return 'badge bg-success';
    } else {
      return 'badge bg-secondary';
    }
  };

  const getSubscriptionText = (subscription, trial) => {
    if (trial === 'true') {
      return 'Trial';
    } else if (subscription === 'true') {
      return 'Subscribed';
    } else {
      return 'Not Subscribed';
    }
  };

  useEffect(() => {
    applyFilters();
  }, [selectedType, selectedStatus, subscriptionStatus, searchTerm, dateRange, employerTypes, institutionTypes, states]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4" role="alert">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <>
          <AdminHeader />
    <div className="container-fluid">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">
            <i className="fas fa-users text-primary me-2"></i>
            Employers
          </h2>
          <p className="text-muted mb-0">Manage and monitor all employers</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddEmployerModal(true)}
        >
          <i className="fas fa-plus me-2"></i>
          Add Employer
        </button>
      </div>

      {/* Filter Controls */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle w-100"
              type="button"
              data-bs-toggle="dropdown"
            >
              Date: {selectedDateRange}
            </button>
            <div className={`dropdown-menu p-3 ${showDateDropdown ? 'show' : ''}`}>
              {selectedDateRange === 'Custom Range' ? (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0">Select Date Range</h6>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => setSelectedDateRange('')}
                    >
                      ← Back
                    </button>
                  </div>
                  <div className="row g-2">
                    <div className="col-6">
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        value={dateRange.start}
                        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                      />
                    </div>
                    <div className="col-6">
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        value={dateRange.end}
                        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                getDynamicDateRangeOptions().map((option) => (
                  <button
                    key={option.value}
                    className="dropdown-item"
                    onClick={() => handleDateRangeSelect(option)}
                  >
                    {option.label}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
        
        <div className="col-md-2">
          <select 
            className="form-select"
            value={selectedType}
            onChange={(e) => handleTypeFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            {[...new Set(employers.map(e => e.employerType).filter(Boolean))].map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div className="col-md-2">
          <select 
            className="form-select"
            value={selectedStatus}
            onChange={(e) => handleStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        
        <div className="col-md-2">
          <select 
            className="form-select"
            value={subscriptionStatus}
            onChange={(e) => handleSubscriptionFilter(e.target.value)}
          >
            <option value="All">All Subscriptions</option>
            <option value="subscribed">Subscribed</option>
            <option value="trial">Trial</option>
            <option value="none">Not Subscribed</option>
          </select>
        </div>
        
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search employers..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-0">Total Employers</h6>
                  <h3 className="mb-0">{employers.length}</h3>
                </div>
                <i className="fas fa-users fa-2x opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-0">Approved</h6>
                  <h3 className="mb-0">{employers.filter(e => e.verificationstatus === 'approved').length}</h3>
                </div>
                <i className="fas fa-check-circle fa-2x opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-0">New This Week</h6>
                  <h3 className="mb-0">
                    {employers.filter(e => {
                      const createdDate = new Date(e.createdAt);
                      const sevenDaysAgo = new Date();
                      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                      return createdDate > sevenDaysAgo;
                    }).length}
                  </h3>
                </div>
                <i className="fas fa-plus-circle fa-2x opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-0">Rejected</h6>
                  <h3 className="mb-0">{employers.filter(e => e.verificationstatus === 'rejected').length}</h3>
                </div>
                <i className="fas fa-times-circle fa-2x opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Employers List ({filteredEmployers.length})</h5>
            <div className="d-flex gap-2">
              <button 
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setShowFilterSidebar(true)}
              >
                <i className="fas fa-filter me-1"></i>
                Advanced Filter
              </button>
              <button 
                className="btn btn-outline-primary btn-sm"
                onClick={resetFilters}
              >
                <i className="fas fa-refresh me-1"></i>
                Reset
              </button>
            </div>
          </div>
        </div>
        
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedEmployers.length === filteredEmployers.length && filteredEmployers.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Emp ID</th>
                  <th>Employer</th>
                  <th>Type</th>
                  <th>Contact</th>
                  <th>Created Date</th>
                  <th>Subscription</th>
                  <th>Status</th>
                  <th>Block Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployers.length > 0 ? (
                  filteredEmployers.map((employer) => (
                    <tr key={employer._id}>
                      <td>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selectedEmployers.includes(employer._id)}
                          onChange={() => handleSelectEmployer(employer._id)}
                        />
                      </td>
                      <td>
                        <small className="text-muted">
                          Emp-{employer._id.substring(employer._id.length - 4)}
                        </small>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-circle me-3">
                            {employer.userProfilePic ? (
                              <img
                                src={employer.userProfilePic}
                                alt="Profile"
                                className="rounded-circle"
                                width="40"
                                height="40"
                              />
                            ) : (
                              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                                {(employer.firstName || employer.schoolName || 'U').charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="fw-medium">
                              {employer.schoolName || `${employer.firstName || ''} ${employer.lastName || ''}`.trim() || 'N/A'}
                            </div>
                            <small className="text-muted">{employer.userEmail || 'N/A'}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-light text-dark">
                          {employer.employerType || 'N/A'}
                        </span>
                      </td>
                      <td>
                        <div>
                          <div className="text-sm">{employer.userEmail || 'N/A'}</div>
                          <small className="text-muted">{employer.userMobile || 'N/A'}</small>
                        </div>
                      </td>
                      <td>{formatDate(employer.createdAt)}</td>
                      <td>
                        <span className={getSubscriptionBadge(employer.subscription, employer.trial)}>
                          {getSubscriptionText(employer.subscription, employer.trial)}
                        </span>
                      </td>
                      <td>
                        <span className={getStatusBadge(employer.verificationstatus)}>
                          {employer.verificationstatus || 'pending'}
                        </span>
                      </td>
                      <td>
                        <button
                          className={`btn btn-sm ${employer.blockstatus === 'block' ? 'btn-danger' : 'btn-success'}`}
                          onClick={() => handleBlockStatusToggle(employer._id, employer.blockstatus)}
                        >
                          {employer.blockstatus === 'block' ? 'Blocked' : 'Active'}
                        </button>
                      </td>
                      <td>
                        <div className="dropdown">
                          <button
                            className="btn btn-sm btn-outline-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                          >
                            Actions
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => viewEmployerDetails(employer)}
                              >
                                <i className="fas fa-eye me-2"></i>View Details
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => {
                                  setSelectedEmployer(employer);
                                  setShowEditEmployerModal(true);
                                }}
                              >
                                <i className="fas fa-edit me-2"></i>Edit
                              </button>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                              <button
                                className="dropdown-item text-danger"
                                onClick={() => handleDeleteClick(employer)}
                              >
                                <i className="fas fa-trash me-2"></i>Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center py-5">
                      <div className="text-muted">
                        <i className="fas fa-inbox fa-3x mb-3 d-block"></i>
                        No employers found matching your criteria
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination could go here */}
      
      {/* Filter Sidebar */}
      {showFilterSidebar && (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Advanced Filters</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowFilterSidebar(false)}
                ></button>
              </div>
              <div className="modal-body">
                {/* Employer Types */}
                <div className="mb-4">
                  <h6>Employer Types</h6>
                  {Object.keys(employerTypes).map(type => (
                    <div key={type} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={employerTypes[type]}
                        onChange={() => handleEmployerTypeChange(type)}
                      />
                      <label className="form-check-label">{type}</label>
                    </div>
                  ))}
                </div>

                {/* Institution Types */}
                {Object.keys(institutionTypes).length > 0 && (
                  <div className="mb-4">
                    <h6>Institution Types</h6>
                    {Object.keys(institutionTypes).map(type => (
                      <div key={type} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={institutionTypes[type]}
                          onChange={() => handleInstitutionTypeChange(type)}
                        />
                        <label className="form-check-label">{type}</label>
                      </div>
                    ))}
                  </div>
                )}

                {/* States */}
                {Object.keys(states).length > 0 && (
                  <div className="mb-4">
                    <h6>States</h6>
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {Object.keys(states).map(state => (
                        <div key={state} className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={states[state]}
                            onChange={() => handleStateChange(state)}
                          />
                          <label className="form-check-label">{state}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetFilters}
                >
                  Reset All
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={applyFilters}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this employer?</p>
                {employerToDelete && (
                  <div className="alert alert-warning">
                    <strong>Employer:</strong> {employerToDelete.schoolName || `${employerToDelete.firstName || ''} ${employerToDelete.lastName || ''}`.trim()}
                    <br />
                    <strong>Email:</strong> {employerToDelete.userEmail}
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Employer Details Modal */}
      {showDetails && selectedEmployer && (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Employer Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDetails(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4 text-center mb-4">
                    {selectedEmployer.userProfilePic ? (
                      <img
                        src={selectedEmployer.userProfilePic}
                        alt="Profile"
                        className="rounded-circle mb-3"
                        width="120"
                        height="120"
                      />
                    ) : (
                      <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{width: '120px', height: '120px', fontSize: '48px'}}>
                        {(selectedEmployer.firstName || selectedEmployer.schoolName || 'U').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <h5>{selectedEmployer.schoolName || `${selectedEmployer.firstName || ''} ${selectedEmployer.lastName || ''}`.trim()}</h5>
                    <p className="text-muted">{selectedEmployer.userEmail}</p>
                  </div>
                  
                  <div className="col-md-8">
                    <div className="row">
                      <div className="col-sm-6 mb-3">
                        <label className="form-label fw-bold">Employer ID:</label>
                        <p>Emp-{selectedEmployer._id.substring(selectedEmployer._id.length - 4)}</p>
                      </div>
                      
                      <div className="col-sm-6 mb-3">
                        <label className="form-label fw-bold">Employer Type:</label>
                        <p>{selectedEmployer.employerType || 'N/A'}</p>
                      </div>
                      
                      <div className="col-sm-6 mb-3">
                        <label className="form-label fw-bold">Institution Type:</label>
                        <p>{selectedEmployer.institutionType || 'N/A'}</p>
                      </div>
                      
                      <div className="col-sm-6 mb-3">
                        <label className="form-label fw-bold">Phone:</label>
                        <p>{selectedEmployer.userMobile || 'N/A'}</p>
                      </div>
                      
                      <div className="col-sm-6 mb-3">
                        <label className="form-label fw-bold">State:</label>
                        <p>{selectedEmployer.state || 'N/A'}</p>
                      </div>
                      
                      <div className="col-sm-6 mb-3">
                        <label className="form-label fw-bold">City:</label>
                        <p>{selectedEmployer.city || 'N/A'}</p>
                      </div>
                      
                      <div className="col-sm-6 mb-3">
                        <label className="form-label fw-bold">Verification Status:</label>
                        <p>
                          <span className={getStatusBadge(selectedEmployer.verificationstatus)}>
                            {selectedEmployer.verificationstatus || 'pending'}
                          </span>
                        </p>
                      </div>
                      
                      <div className="col-sm-6 mb-3">
                        <label className="form-label fw-bold">Subscription:</label>
                        <p>
                          <span className={getSubscriptionBadge(selectedEmployer.subscription, selectedEmployer.trial)}>
                            {getSubscriptionText(selectedEmployer.subscription, selectedEmployer.trial)}
                          </span>
                        </p>
                      </div>
                      
                      <div className="col-sm-6 mb-3">
                        <label className="form-label fw-bold">Block Status:</label>
                        <p>
                          <span className={`badge ${selectedEmployer.blockstatus === 'block' ? 'bg-danger' : 'bg-success'}`}>
                            {selectedEmployer.blockstatus === 'block' ? 'Blocked' : 'Active'}
                          </span>
                        </p>
                      </div>
                      
                      <div className="col-sm-6 mb-3">
                        <label className="form-label fw-bold">Created Date:</label>
                        <p>{formatDate(selectedEmployer.createdAt)}</p>
                      </div>
                      
                      {selectedEmployer.address && (
                        <div className="col-12 mb-3">
                          <label className="form-label fw-bold">Address:</label>
                          <p>{selectedEmployer.address}</p>
                        </div>
                      )}
                      
                      {selectedEmployer.description && (
                        <div className="col-12 mb-3">
                          <label className="form-label fw-bold">Description:</label>
                          <p>{selectedEmployer.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDetails(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setShowDetails(false);
                    setShowEditEmployerModal(true);
                  }}
                >
                  Edit Employer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Employer Modal */}
      {showAddEmployerModal && (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Employer</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddEmployerModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">School/Company Name</label>
                      <input type="text" className="form-control" required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Employer Type</label>
                      <select className="form-select" required>
                        <option value="">Select Type</option>
                        <option value="School">School</option>
                        <option value="College">College</option>
                        <option value="University">University</option>
                        <option value="Company">Company</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">First Name</label>
                      <input type="text" className="form-control" required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Last Name</label>
                      <input type="text" className="form-control" required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Phone</label>
                      <input type="tel" className="form-control" required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">State</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">City</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label">Address</label>
                      <textarea className="form-control" rows="3"></textarea>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAddEmployerModal(false)}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary">
                  Add Employer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employer Modal */}
      {showEditEmployerModal && selectedEmployer && (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Employer</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditEmployerModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">School/Company Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        defaultValue={selectedEmployer.schoolName || ''}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Employer Type</label>
                      <select className="form-select" defaultValue={selectedEmployer.employerType || ''}>
                        <option value="">Select Type</option>
                        <option value="School">School</option>
                        <option value="College">College</option>
                        <option value="University">University</option>
                        <option value="Company">Company</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">First Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        defaultValue={selectedEmployer.firstName || ''}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Last Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        defaultValue={selectedEmployer.lastName || ''}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        defaultValue={selectedEmployer.userEmail || ''}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Phone</label>
                      <input 
                        type="tel" 
                        className="form-control" 
                        defaultValue={selectedEmployer.userMobile || ''}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">State</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        defaultValue={selectedEmployer.state || ''}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">City</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        defaultValue={selectedEmployer.city || ''}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Verification Status</label>
                      <select className="form-select" defaultValue={selectedEmployer.verificationstatus || 'pending'}>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Block Status</label>
                      <select className="form-select" defaultValue={selectedEmployer.blockstatus || 'unblock'}>
                        <option value="unblock">Active</option>
                        <option value="block">Blocked</option>
                      </select>
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label">Address</label>
                      <textarea 
                        className="form-control" 
                        rows="3"
                        defaultValue={selectedEmployer.address || ''}
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowEditEmployerModal(false)}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary">
                  Update Employer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    
      <AdminFooter />
    </>
  );
};

export default EmployerList;