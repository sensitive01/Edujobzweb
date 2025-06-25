import React, { useState, useEffect } from 'react';
import { ChevronsUp, Search, ChevronDown, Download, FileText, FileSpreadsheet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EmployerHeader from './EmployerHeader';
import EmployerFooter from './EmployerFooter';
import user13 from '../../assets/employer/assets/img/users/user-13.jpg';
import EmployerCandidatesDetails from './EmployerCandidatesDetails';
import EmployeerChatSidebar from './EmployeerChatSidebar';
import { FaArrowCircleUp } from 'react-icons/fa';

const EmployeerCandidatesSearch = () => {
  const [status, setStatus] = useState('Select Status');
  const [sortBy, setSortBy] = useState('Sort By : Last 7 Days');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedDateRange, setSelectedDateRange] = useState('This Year');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedCandidateForChat, setSelectedCandidateForChat] = useState(null);
  const navigate = useNavigate();

  const statuses = [
    'All',
    'Pending',
    'Hold',
    'In Progress',
    'Interview Scheduled',
    'Hired',
    'Rejected'
  ];

  const sortOptions = [
    'Recently Added',
    'Ascending',
    'Descending',
    'Last Month',
    'Last 7 Days'
  ];

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
        label: 'Next Year',
        value: 'nextyear',
        dateLabel: `01/01/${currentYear + 1} - 31/12/${currentYear + 1}`
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
      setActiveDropdown('customRange');
      return;
    }

    setSelectedDateRange(option.dateLabel);
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
      case 'nextyear':
        startDate = `${today.getFullYear() + 1}-01-01`;
        endDate = `${today.getFullYear() + 1}-12-31`;
        break;
      default:
        return;
    }

    setDateRange({ start: startDate, end: endDate });
    setFiltersApplied(true);
    closeAllDropdowns();
    filterCandidates();
  };

  const exportToPDF = () => {
    const content = `
      <h1>Candidates List</h1>
      <table border="1" style="width:100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Job Role</th>
            <th>Status</th>
            <th>Applied Date</th>
          </tr>
        </thead>
        <tbody>
          ${filteredCandidates.map(candidate => `
            <tr>
              <td>${candidate.firstName} ${candidate.lastName || ''}</td>
              <td>${candidate.email || 'N/A'}</td>
              <td>${candidate.phone || 'N/A'}</td>
              <td>${candidate.jobrole || 'N/A'}</td>
              <td>${candidate.employapplicantstatus || 'N/A'}</td>
              <td>${new Date(candidate.appliedDate).toLocaleDateString('en-GB') || 'N/A'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Candidates List</title>
          <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          ${content}
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 200);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const exportToExcel = () => {
    const headers = ['Name', 'Email', 'Phone', 'Job Role', 'Status', 'Applied Date'];
    const rows = filteredCandidates.map(candidate => [
      `"${candidate.firstName} ${candidate.lastName || ''}"`,
      `"${candidate.email || 'N/A'}"`,
      `"${candidate.phone || 'N/A'}"`,
      `"${candidate.jobrole || 'N/A'}"`,
      `"${candidate.employapplicantstatus || 'N/A'}"`,
      `"${new Date(candidate.appliedDate).toLocaleDateString('en-GB') || 'N/A'}"`
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'candidates_list.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportOptions = [
    {
      label: 'Export as PDF',
      icon: <FileText size={16} className="me-1" />,
      onClick: exportToPDF
    },
    {
      label: 'Export as Excel',
      icon: <FileSpreadsheet size={16} className="me-1" />,
      onClick: exportToExcel
    }
  ];

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
  };

  const handleStatusSelect = (selectedStatus) => {
    setStatus(selectedStatus);
    setFiltersApplied(selectedStatus !== 'Select Status');
    filterCandidates();
  };

  const handleSortBySelect = (selectedSort) => {
    setSortBy(`Sort By : ${selectedSort}`);
    setFiltersApplied(selectedSort !== 'Last 7 Days');
    filterCandidates();
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('employerToken');
      const employerData = JSON.parse(localStorage.getItem('employerData'));

      if (!token || !employerData) {
        navigate('/employer/login');
        return;
      }

      const response = await fetch(
        `https://edujobzbackend.onrender.com/employer/viewallappliedcandi/${employerData._id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch candidates');
      }

      const data = await response.json();
      setCandidates(data.data || []);
      setFilteredCandidates(data.data || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterCandidates = () => {
    let result = [...candidates];

    // Date range filter
    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      result = result.filter(candidate => {
        if (!candidate.appliedDate) return false;
        const appliedDate = new Date(candidate.appliedDate);
        return appliedDate >= startDate && appliedDate <= endDate;
      });
    }

    // Status filter
    if (status !== 'Select Status' && status !== 'All') {
      result = result.filter(candidate =>
        candidate.employapplicantstatus &&
        candidate.employapplicantstatus.toLowerCase() === status.toLowerCase()
      );
    }

    // Search query filter - improved to handle exact matches for experience
    if (searchQuery.trim()) {
      const searchTerm = searchQuery.toLowerCase().trim();
      result = result.filter(candidate => {
        // Check for exact experience match first (e.g., "3 years" or "3")
        const experienceMatch = candidate.experience && 
          (candidate.experience.toString() === searchTerm || 
           `${candidate.experience} years`.toLowerCase() === searchTerm ||
           `${candidate.experience} year`.toLowerCase() === searchTerm);

        if (experienceMatch) return true;

        // If not an experience match, check other fields
        const searchFields = [
          candidate.firstName,
          candidate.lastName,
          candidate.email,
          candidate.phone,
          candidate.jobrole,
          candidate.currentcity,
          candidate.qualification,
          candidate.jobTitle,
          candidate.employapplicantstatus
        ].filter(Boolean).join(' ').toLowerCase();
        
        return searchFields.includes(searchTerm);
      });
    }

    // Sort candidates
    if (sortBy.includes('Recently Added')) {
      result.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
    } else if (sortBy.includes('Ascending')) {
      result.sort((a, b) => (a.firstName || '').localeCompare(b.firstName || ''));
    } else if (sortBy.includes('Descending')) {
      result.sort((a, b) => (b.firstName || '').localeCompare(a.firstName || ''));
    } else if (sortBy.includes('Last Month')) {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      result = result.filter(candidate => {
        if (!candidate.appliedDate) return false;
        const appliedDate = new Date(candidate.appliedDate);
        return appliedDate >= lastMonth;
      });
    } else if (sortBy.includes('Last 7 Days')) {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      result = result.filter(candidate => {
        if (!candidate.appliedDate) return false;
        const appliedDate = new Date(candidate.appliedDate);
        return appliedDate >= lastWeek;
      });
    }

    setFilteredCandidates(result);
    setHasSearched(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    filterCandidates();
  };

  const viewCandidateDetails = (candidate) => {
    setSelectedCandidate(candidate);
    setShowDetails(true);
  };

  const toggleFavoriteStatus = async (applicationId, employid, currentStatus) => {
    try {
      const token = localStorage.getItem('employerToken');
      if (!token) {
        navigate('/employer/login');
        return;
      }

      const response = await fetch(
        `https://edujobzbackend.onrender.com/employer/updaee/${applicationId}/${employid}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            favourite: !currentStatus
          })
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to update favorite status');
      }

      // Update state only after successful API call
      setCandidates(prev => prev.map(candidate => {
        if (candidate._id === applicationId) {
          return {
            ...candidate,
            favourite: !currentStatus
          };
        }
        return candidate;
      }));

      setFilteredCandidates(prev => prev.map(candidate => {
        if (candidate._id === applicationId) {
          return {
            ...candidate,
            favourite: !currentStatus
          };
        }
        return candidate;
      }));

    } catch (error) {
      console.error('Error updating favorite status:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'shortlisted':
        return 'bg-success';
      case 'rejected':
        return 'bg-danger';
      case 'in progress':
        return 'bg-info';
      case 'pending':
        return 'bg-warning';
      case 'applied':
        return 'bg-primary';
      default:
        return 'bg-secondary';
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  useEffect(() => {
    if (searchQuery || status !== 'Select Status' || sortBy !== 'Sort By : Last 7 Days' || dateRange.start) {
      filterCandidates();
    }
  }, [searchQuery, status, sortBy, dateRange]);

  if (loading) {
    return (
      <>
        <EmployerHeader />
        <div className="content">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading search...</p>
          </div>
        </div>
        <EmployerFooter />
      </>
    );
  }

  if (error) {
    return (
      <>
        <EmployerHeader />
        <div className="content">
          <div className="text-center py-5 text-danger">
            <i className="fas fa-exclamation-triangle fa-2x mb-3"></i>
            <h5>Error loading search</h5>
            <p>{error}</p>
            <button
              className="btn btn-primary mt-3"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
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
        {/* Breadcrumb */}
        <div className={`d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3 ${isCollapsed ? 'collapsed' : ''}`}>
          <div className="my-auto">
            <h2>&nbsp; <i className="fa fa-search text-primary"></i> Search Candidates</h2>
          </div>
          <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
            {/* Date Range Picker */}
            <div className="dropdown me-2">
              <button
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                onClick={() => toggleDropdown('dateRange')}
              >
                <i className="ti ti-calendar me-1"></i>{selectedDateRange}
              </button>
              <ul
                className={`dropdown-menu dropdown-menu-end p-3 ${activeDropdown === 'dateRange' || activeDropdown === 'customRange' ? 'show' : ''}`}
                style={{ display: activeDropdown === 'dateRange' || activeDropdown === 'customRange' ? 'block' : 'none', minWidth: '280px' }}
              >
                {activeDropdown === 'customRange' ? (
                  <li className="p-2">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0">Select Date Range</h6>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setActiveDropdown('dateRange')}
                      >
                        <i className="ti ti-arrow-left"></i> Back
                      </button>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <input
                        type="date"
                        className="form-control me-2"
                        style={{ fontSize: '12px' }}
                        value={dateRange.start}
                        onChange={(e) => {
                          setDateRange({ ...dateRange, start: e.target.value });
                          if (dateRange.end && e.target.value) {
                            setSelectedDateRange(`${e.target.value} - ${dateRange.end}`);
                          }
                          setFiltersApplied(true);
                        }}
                        placeholder="Start Date"
                      />
                      <span className="me-2">to</span>
                      <input
                        type="date"
                        className="form-control"
                        style={{ fontSize: '12px' }}
                        value={dateRange.end}
                        onChange={(e) => {
                          setDateRange({ ...dateRange, end: e.target.value });
                          if (dateRange.start && e.target.value) {
                            setSelectedDateRange(`${dateRange.start} - ${e.target.value}`);
                          }
                          setFiltersApplied(true);
                        }}
                        min={dateRange.start}
                        placeholder="End Date"
                      />
                    </div>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => {
                          setDateRange({ start: '', end: '' });
                          setSelectedDateRange('This Year');
                          setFiltersApplied(false);
                          closeAllDropdowns();
                        }}
                      >
                        Clear
                      </button>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          if (dateRange.start && dateRange.end) {
                            closeAllDropdowns();
                            filterCandidates();
                          }
                        }}
                        disabled={!dateRange.start || !dateRange.end}
                      >
                        Apply
                      </button>
                    </div>
                  </li>
                ) : (
                  <>
                    {getDynamicDateRangeOptions().map((option) => (
                      <li key={option.value}>
                        <button
                          className="dropdown-item rounded-1 d-flex justify-content-between align-items-center"
                          onClick={() => handleDateRangeSelect(option)}
                        >
                          <span>{option.label}</span>
                          <small className="text-muted">{option.dateLabel}</small>
                        </button>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>
            
            {/* Status Dropdown */}
            <div className="dropdown me-2">
              <button 
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center" 
                onClick={() => toggleDropdown('status')}
              >
                {status}
              </button>
              <ul 
                className={`dropdown-menu dropdown-menu-end p-3 ${activeDropdown === 'status' ? 'show' : ''}`}
                style={{ display: activeDropdown === 'status' ? 'block' : 'none' }}
              >
                {statuses.map((item) => (
                  <li key={item}>
                    <button 
                      className="dropdown-item rounded-1" 
                      onClick={() => {
                        handleStatusSelect(item);
                        closeAllDropdowns();
                      }}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Sort By Dropdown */}
            <div className="dropdown me-2">
              <button 
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center" 
                onClick={() => toggleDropdown('sort')}
              >
                {sortBy}
              </button>
              <ul 
                className={`dropdown-menu dropdown-menu-end p-3 ${activeDropdown === 'sort' ? 'show' : ''}`}
                style={{ display: activeDropdown === 'sort' ? 'block' : 'none' }}
              >
                {sortOptions.map((item) => (
                  <li key={item}>
                    <button 
                      className="dropdown-item rounded-1" 
                      onClick={() => {
                        handleSortBySelect(item);
                        closeAllDropdowns();
                      }}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Export Dropdown */}
            <div className="dropdown me-2">
              <button 
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center" 
                onClick={() => toggleDropdown('export')}
              >
                <Download size={16} className="me-1" /> Export
              </button>
              <ul 
                className={`dropdown-menu dropdown-menu-end p-3 ${activeDropdown === 'export' ? 'show' : ''}`}
                style={{ display: activeDropdown === 'export' ? 'block' : 'none' }}
              >
                {exportOptions.map((item) => (
                  <li key={item.label}>
                    <button 
                      className="dropdown-item rounded-1" 
                      onClick={() => {
                        item.onClick();
                        closeAllDropdowns();
                      }}
                    >
                      {item.icon} {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="head-icons ms-2">
              <button 
                className="" 
                onClick={toggleCollapse}
                data-bs-toggle="tooltip" 
                data-bs-placement="top" 
                title="Collapse"
              >
                <ChevronsUp size={16} />
              </button>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}
        
        <br />
        
        <div className="row">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSearch}>
                <div className="d-flex align-items-center">
                  <input 
                    type="text" 
                    className="form-control flex-fill me-3" 
                    placeholder="Search Candidates (name, email, skills, experience, etc.)" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button 
                    type="submit" 
                    className="btn btn-secondary" 
                    style={{ whiteSpace: 'nowrap' }}
                    disabled={!searchQuery.trim() && !filtersApplied}
                  >
                    <Search size={16} className="me-1" /> Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Candidates Count */}
        {hasSearched && (
          <div className="mb-3">
            <span className="badge bg-warning">
              {filteredCandidates.length} {filteredCandidates.length === 1 ? 'candidate' : 'candidates'} found
            </span>
          </div>
        )}

        {/* Candidates Grid */}
        {hasSearched && filteredCandidates.length > 0 && (
          <div className="row mt-4">
            {filteredCandidates.map(candidate => (
              <div key={candidate._id} className="col-xxl-12 col-xl-4 col-md-6">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div className="d-flex align-items-center">
                        <a href="javascript:void(0);" className="avatar flex-shrink-0">
                          <img
                            src={candidate.profileurl || user13}
                            className="img-fluid h-auto w-auto"
                            alt="img"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = user13;
                            }}
                          />
                        </a>
                        <div className="ms-2">
                          <h6 className="fs-14 fw-medium text-truncate text-primary mb-1">
                            <a className="text-secondary" href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                viewCandidateDetails(candidate);
                              }}>
                              {candidate.firstName} {candidate.lastName || ''} &nbsp; | &nbsp;
                              <span className="text-dark">
                                <i className="ti ti-eye"></i> View Profile
                              </span>
                            </a>
                          </h6>
                          <p className="fs-13">
                            <b>Applied On:</b> {new Date(candidate.appliedDate).toLocaleDateString('en-GB')} &nbsp; | &nbsp;
                            <span className={`badge ${getStatusBadgeClass(candidate.employapplicantstatus)}`}>
                              {candidate.employapplicantstatus || 'Pending'}
                            </span> &nbsp; | &nbsp;
                            {candidate.resume?.url && (
                              <a href={candidate.resume.url} className="fw-medium text-primary" target="_blank" rel="noopener noreferrer">
                                <i className="ti ti-download"></i> Download Resume
                              </a>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        {candidate.phone && (
                          <a href={`tel:${candidate.phone}`} className="btn btn-light text-success btn-icon btn-sm me-1">
                            <i className="ti ti-phone fs-16"></i>
                          </a>
                        )}
                        {candidate.email && (
                          <a href={`mailto:${candidate.email}`} className="btn btn-light btn-icon text-danger btn-sm me-1">
                            <i className="ti ti-mail-bolt fs-16"></i>
                          </a>
                        )}

                        <a
                          href="#"
                          className="btn btn-light text-info btn-icon text-info btn-sm me-1"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedCandidateForChat(candidate);
                            setIsChatOpen(true);
                          }}
                        >
                          <i className="ti ti-brand-hipchat fs-16"></i>
                        </a>

                        <a
                          href="#"
                          className={`btn btn-light ${candidate.favourite ? 'text-danger' : 'text-primary'} btn-icon btn-sm`}
                          onClick={(e) => {
                            e.preventDefault();
                            const employerData = JSON.parse(localStorage.getItem('employerData'));
                            toggleFavoriteStatus(candidate._id, employerData._id, candidate.favourite);
                          }}
                          style={candidate.favourite ? { backgroundColor: '#ffd700', borderColor: 'white' } : {}}
                        >
                          <i
                            className={`ti ti-bookmark fs-16 ${candidate.favourite ? 'filled' : ''}`}
                            style={candidate.favourite ? { color: 'white' } : {}}
                          ></i>
                        </a>
                      </div>
                    </div>
                    <div className="bg-light rounder p-2">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span><b>Experience</b> : {candidate.experience || '0'} Years</span>
                        <span><b>Job Role</b> : {candidate.jobrole || 'Not specified'}</span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span><b>Gender</b> : {candidate.gender || 'Not specified'}</span>
                        <span><b>Email</b> : {candidate.email || 'Not specified'}</span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span><b>Phone</b> : {candidate.phone || 'Not specified'}</span>
                        <span><b>Qualification</b> : {candidate.qualification || 'Not specified'}</span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <span><b>Current Location</b> : {candidate.currentcity || 'Not specified'}</span>
                        <span>
                          <button
                            className="fs-10 fw-bold badge bg-warning"
                            onClick={() => viewCandidateDetails(candidate)}
                          >
                            <i className="ti ti-eye"></i> View Profile
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Show no results message if search was performed but no matches found */}
        {hasSearched && filteredCandidates.length === 0 && (
          <div className="row mt-4">
            <div className="col-12">
              <div className="card">
                <div className="card-body text-center py-5">
                  <img src="/images/no-results.png" alt="No results" width="150" className="mb-3" />
                  <h4>No candidates found</h4>
                  <p className="text-muted">Try adjusting your search query or filters</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Candidate Details Modal */}
      {selectedCandidate && (
        <EmployerCandidatesDetails
          show={showDetails}
          onClose={() => setShowDetails(false)}
          candidate={selectedCandidate}
        />
      )}

      {/* Chat Sidebar */}
      {isChatOpen && (
        <EmployeerChatSidebar
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          candidate={selectedCandidateForChat}
        />
      )}
   
      <EmployerFooter/>
    </>
  );
};

export default EmployeerCandidatesSearch;