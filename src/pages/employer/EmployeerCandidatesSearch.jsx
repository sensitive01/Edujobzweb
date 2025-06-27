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
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedDateRange, setSelectedDateRange] = useState('This Year');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedCandidateForChat, setSelectedCandidateForChat] = useState(null);
  const [showChatSidebar, setShowChatSidebar] = useState(false);
  const [jobs, setJobs] = useState([]);
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
  };

  const exportToPDF = () => {
    try {
      // Create a printable HTML content
      let htmlContent = `
      <h2 style="text-align: center; margin-bottom: 20px;">Candidates Report</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f8f9fa;">
            <th style="border: 1px solid #ddd; padding: 8px;">Name</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Email</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Phone</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Experience</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Skills</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Location</th>
          </tr>
        </thead>
        <tbody>
    `;

      // Add rows for each candidate
      filteredCandidates.forEach(candidate => {
        htmlContent += `
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">${candidate.userName || 'N/A'}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${candidate.userEmail || 'N/A'}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${candidate.userMobile || 'N/A'}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${candidate.totalExperience || '0'} years</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${candidate.skills?.join(', ') || 'N/A'}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${candidate.currentCity || 'N/A'}</td>
        </tr>
      `;
      });

      htmlContent += `
        </tbody>
      </table>
      <p style="text-align: right; margin-top: 20px; font-size: 12px;">
        Generated on ${new Date().toLocaleDateString()}
      </p>
    `;

      // Open a new window with the content and trigger print
      const win = window.open('', '_blank');
      win.document.write(`
      <html>
        <head>
          <title>Candidates Report</title>
          <style>
            @media print {
              @page { size: landscape; margin: 10mm; }
              table { width: 100%; font-size: 12px; }
              th { background-color: #f8f9fa !important; }
            }
          </style>
        </head>
        <body>
          ${htmlContent}
          <script>
            setTimeout(function() {
              window.print();
              window.close();
            }, 100);
          </script>
        </body>
      </html>
    `);
      win.document.close();

    } catch (error) {
      console.error('Error exporting to PDF:', error);
      alert('Failed to export PDF: ' + error.message);
    }
  };

  const exportToExcel = () => {
    try {
      // Create CSV content
      let csvContent = "Name,Email,Phone,Experience,Skills,Location\n";

      // Add rows for each candidate
      filteredCandidates.forEach(candidate => {
        csvContent += `"${candidate.userName || ''}","${candidate.userEmail || ''}","${candidate.userMobile || ''}",` +
          `"${candidate.totalExperience || '0'} years","${candidate.skills?.join(', ') || ''}",` +
          `"${candidate.currentCity || ''}"\n`;
      });

      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `candidates_${new Date().toISOString().slice(0, 10)}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error('Error exporting to Excel:', error);
      alert('Failed to export Excel: ' + error.message);
    }
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
    setFiltersApplied(true);
    closeAllDropdowns();
  };

  const handleSortBySelect = (selectedSort) => {
    setSortBy(`Sort By : ${selectedSort}`);
    setFiltersApplied(true);
    closeAllDropdowns();
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const employerData = JSON.parse(localStorage.getItem('employerData'));
        if (!employerData) return;

        const response = await fetch(
          `https://edujobzbackend.onrender.com/employer/fetchjob/${employerData._id}`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('employerToken')}`
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          setJobs(data || []);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('employerToken');

      if (!token) {
        navigate('/employer/login');
        return;
      }

      const response = await fetch(
        `https://edujobzbackend.onrender.com/fetchallemployee`,
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
      setCandidates(data || []);
      setFilteredCandidates(data || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterCandidates = () => {
    let results = [...candidates];

    // Apply search filter if search query exists
    if (searchQuery.trim()) {
      const searchTerm = searchQuery.toLowerCase().trim();
      results = results.filter(candidate => {
        // Check for exact experience match
        const experienceMatch = candidate.totalExperience &&
          (candidate.totalExperience.toString() === searchTerm ||
            `${candidate.totalExperience} years`.toLowerCase() === searchTerm ||
            `${candidate.totalExperience} year`.toLowerCase() === searchTerm);

        if (experienceMatch) return true;

        // Check other fields
        const searchFields = [
          candidate.userName,
          candidate.userEmail,
          candidate.userMobile,
          candidate.skills?.join(' '),
          candidate.currentCity,
          candidate.education?.map(edu => `${edu.degree} ${edu.institution}`).join(' '),
          candidate.workExperience?.map(exp => `${exp.position} ${exp.company}`).join(' '),
          candidate.languages?.join(' ')
        ].filter(Boolean).join(' ').toLowerCase();

        return searchFields.includes(searchTerm);
      });
    }

    // Apply additional filters only if filters are applied
    if (filtersApplied) {
      // Date range filter
      if (dateRange.start && dateRange.end) {
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);

        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);

        results = results.filter(candidate => {
          if (!candidate.createdAt) return false;
          const createdDate = new Date(candidate.createdAt);
          return createdDate >= startDate && createdDate <= endDate;
        });
      }

      // Status filter
      if (status !== 'Select Status' && status !== 'All') {
        // Filter logic here if you add status to your data
      }

      // Sort candidates
      if (sortBy.includes('Recently Added')) {
        results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (sortBy.includes('Ascending')) {
        results.sort((a, b) => (a.userName || '').localeCompare(b.userName || ''));
      } else if (sortBy.includes('Descending')) {
        results.sort((a, b) => (b.userName || '').localeCompare(a.userName || ''));
      } else if (sortBy.includes('Last Month')) {
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        results = results.filter(candidate => {
          if (!candidate.createdAt) return false;
          const createdDate = new Date(candidate.createdAt);
          return createdDate >= lastMonth;
        });
      } else if (sortBy.includes('Last 7 Days')) {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        results = results.filter(candidate => {
          if (!candidate.createdAt) return false;
          const createdDate = new Date(candidate.createdAt);
          return createdDate >= lastWeek;
        });
      }
    }

    setFilteredCandidates(results);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    filterCandidates();
  };

  const viewCandidateDetails = (candidate) => {
    setSelectedCandidate({
      ...candidate,
      applicantId: candidate._id
    });
    setShowDetails(true);
  };

  const toggleFavoriteStatus = async (applicationId, employid, currentStatus) => {
    try {
      console.log("Updating favorite status with:", {
        applicationId,
        employid,
        currentStatus
      });
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
  const findJobIdForCandidate = (candidate) => {
    // Find the job that contains this candidate in its applications
    const job = jobs.find(job =>
      job.applications && job.applications.some(app =>
        app.applicantId === candidate.applicantId ||
        app.applicantId === candidate._id ||
        app._id === candidate._id
      )
    );

    return job ? job._id : 'default-job-id';
  };
  useEffect(() => {
    filterCandidates();
  }, [searchQuery, filtersApplied, status, sortBy, dateRange]);

  if (loading) {
    return (
      <>
        <EmployerHeader />
        <div className="content">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading candidates...</p>
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
            <h5>Error loading candidates</h5>
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
                            setFiltersApplied(true);
                            closeAllDropdowns();
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
                disabled={filteredCandidates.length === 0}
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
                  >
                    <Search size={16} className="me-1" /> Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Candidates Count */}
        <div className="mb-3">
          <span className="badge bg-warning">
            {filteredCandidates.length} {filteredCandidates.length === 1 ? 'candidate' : 'candidates'} found
          </span>
          {(searchQuery || filtersApplied) && (
            <button
              className="btn btn-sm btn-link ms-2"
              onClick={() => {
                setSearchQuery('');
                setStatus('Select Status');
                setSortBy('Sort By : Last 7 Days');
                setDateRange({ start: '', end: '' });
                setSelectedDateRange('This Year');
                setFiltersApplied(false);
              }}
            >
              Clear all
            </button>
          )}
        </div>

        {/* Candidates Grid */}
        <div className="row mt-4">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map(candidate => (
              <div key={candidate._id} className="col-xxl-12 col-xl-4 col-md-6">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div className="d-flex align-items-center">
                        <a href="javascript:void(0);" className="avatar flex-shrink-0">
                          <img
                            src={candidate.userProfilePic || user13}
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
                              {candidate.userName} &nbsp; | &nbsp;
                              <span className="text-dark">
                                <i className="ti ti-eye"></i> View Profile
                              </span>
                            </a>
                          </h6>
                          <p className="fs-13">
                            <b>Registered On:</b> {new Date(candidate.createdAt).toLocaleDateString('en-GB')} &nbsp; | &nbsp;
                            {candidate.resume?.url && (
                              <a href={candidate.resume.url} className="fw-medium text-primary" target="_blank" rel="noopener noreferrer">
                                <i className="ti ti-download"></i> Download Resume
                              </a>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        {candidate.userMobile && (
                          <a href={`tel:${candidate.userMobile}`} className="btn btn-light text-success btn-icon btn-sm me-1">
                            <i className="ti ti-phone fs-16"></i>
                          </a>
                        )}
                        {candidate.userEmail && (
                          <a href={`mailto:${candidate.userEmail}`} className="btn btn-light btn-icon text-danger btn-sm me-1">
                            <i className="ti ti-mail-bolt fs-16"></i>
                          </a>
                        )}
                        <a
                          href="#"
                          className="btn btn-light text-info btn-icon text-info btn-sm me-1"
                          onClick={(e) => {
                            e.preventDefault();
                            const jobId = findJobIdForCandidate(candidate);
                            setSelectedCandidateForChat({
                              ...candidate,
                              jobId: jobId,
                              applicantId: candidate.applicantId || candidate._id,
                               firstName: candidate.userName,
                               avatar: candidate.userProfilePic
                            });
                            setShowChatSidebar(true);
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
                        <span><b>Experience</b> : {candidate.totalExperience || '0'} Years</span>
                        <span><b>Skills</b> : {candidate.skills?.join(', ') || 'Not specified'}</span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span><b>Gender</b> : {candidate.gender || 'Not specified'}</span>
                        <span><b>Email</b> : {candidate.userEmail || 'Not specified'}</span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span><b>Phone</b> : {candidate.userMobile || 'Not specified'}</span>
                        <span><b>Education</b> : {candidate.education?.[0]?.degree || 'Not specified'}</span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <span><b>Current Location</b> : {candidate.currentCity || 'Not specified'}</span>
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
            ))
          ) : searchQuery || filtersApplied ? (
            <div className="col-12">
              <div className="card">
                <div className="card-body text-center py-5">
                  <img src="/images/no-results.png" alt="No results" width="150" className="mb-3" />
                  <h4>No candidates found</h4>
                  <p className="text-muted">Try adjusting your search query or filters</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-12">
              <div className="card">
                <div className="card-body text-center py-5">
                  <i className="ti ti-users fs-1 text-muted mb-3"></i>
                  <h4>All Candidates</h4>
                  <p className="text-muted">Start typing to search or apply filters</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Candidate Details Modal */}
      {selectedCandidate && (
        <EmployerCandidatesDetails
          show={showDetails}
          onClose={() => setShowDetails(false)}
          candidate={selectedCandidate} 
        />
      )}
        {selectedCandidateForChat && (
        <EmployeerChatSidebar
          isOpen={showChatSidebar}
          onClose={() => setShowChatSidebar(false)}
          candidate={selectedCandidateForChat}
        />
      )}

      <EmployerFooter />
    </>
  );
};

export default EmployeerCandidatesSearch;
