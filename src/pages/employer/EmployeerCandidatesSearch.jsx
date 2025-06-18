// import React, { useState, useEffect } from 'react';
// import { ChevronsUp, Search, ChevronDown, Download, FileText, FileSpreadsheet } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import EmployerHeader from './EmployerHeader';
// import EmployerFooter from './EmployerFooter';

// const EmployeerCandidatesSearch = () => {
//   const [status, setStatus] = useState('Select Status');
//   const [sortBy, setSortBy] = useState('Sort By : Last 7 Days');
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [candidates, setCandidates] = useState([]);
//   const [filteredCandidates, setFilteredCandidates] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [hasSearched, setHasSearched] = useState(false);
//   const navigate = useNavigate();

//   const handleStatusSelect = (selectedStatus) => {
//     setStatus(selectedStatus);
//   };

//   const handleSortBySelect = (selectedSort) => {
//     setSortBy(`Sort By : ${selectedSort}`);
//   };

//   const toggleCollapse = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   const fetchCandidates = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('employerToken');
//       const employerData = JSON.parse(localStorage.getItem('employerData'));

//       if (!token || !employerData) {
//         navigate('/employer/login');
//         return;
//       }

//       const response = await fetch(
//         `https://edujobzbackend.onrender.com/employer/viewallappliedcandi/${employerData._id}`,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         }
//       );

//       if (!response.ok) {
//         throw new Error('Failed to fetch candidates');
//       }

//       const data = await response.json();
//       setCandidates(data.data || []);
//     } catch (err) {
//       console.error('Fetch error:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (!searchQuery.trim()) return;

//     setHasSearched(true);
    
//     // Filter candidates based on search query
//     const filtered = candidates.filter(candidate => {
//       const searchFields = [
//         candidate.firstName,
//         candidate.lastName,
//         candidate.email,
//         candidate.phone,
//         candidate.jobrole,
//         candidate.currentcity,
//         candidate.qualification,
//         candidate.jobTitle
//       ].filter(Boolean).join(' ').toLowerCase();
      
//       return searchFields.includes(searchQuery.toLowerCase().trim());
//     });

//     setFilteredCandidates(filtered);

//     // Only navigate if there are results
//     if (filtered.length > 0) {
//       navigate('/employer/new-candidate', { 
//         state: { 
//           searchQuery,
//           filteredCandidates: filtered
//         } 
//       });
//     }
//   };

//   useEffect(() => {
//     fetchCandidates();
//   }, []);

//   if (loading) {
//     return (
//       <>
//         <EmployerHeader />
//         <div className="content">
//           <div className="text-center py-5">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//             <p className="mt-2">Loading search...</p>
//           </div>
//         </div>
//         <EmployerFooter />
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <EmployerHeader />
//         <div className="content">
//           <div className="text-center py-5 text-danger">
//             <i className="fas fa-exclamation-triangle fa-2x mb-3"></i>
//             <h5>Error loading search</h5>
//             <p>{error}</p>
//             <button
//               className="btn btn-primary mt-3"
//               onClick={() => window.location.reload()}
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//         <EmployerFooter />
//       </>
//     );
//   }

//   return (
//     <>
//       <EmployerHeader />
   
//       <div className="content">
//         {/* Breadcrumb */}
//         <div className={`d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3 ${isCollapsed ? 'collapsed' : ''}`}>
//           <div className="my-auto">
//             <h2>&nbsp; <i className="fa fa-search text-primary"></i> Search Candidates</h2>
//           </div>
//           <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
//             <div className="me-2">
//               <div className="input-icon-end position-relative">
//                 <input 
//                   type="text" 
//                   className="form-control date-range bookingrange" 
//                   placeholder="dd/mm/yyyy - dd/mm/yyyy" 
//                   style={{width: '205px'}} 
//                 />
//                 <span className="input-icon-addon">
//                   <ChevronDown size={16} />
//                 </span>
//               </div>
//             </div>
            
//             <div className="dropdown me-2">
//               <button 
//                 className="dropdown-toggle btn btn-white d-inline-flex align-items-center" 
//                 data-bs-toggle="dropdown"
//               >
//                 {status}
//               </button>
//               <ul className="dropdown-menu dropdown-menu-end p-3">
//                 <li>
//                   <button 
//                     className="dropdown-item rounded-1" 
//                     onClick={() => handleStatusSelect('Active')}
//                   >
//                     Active
//                   </button>
//                 </li>
//                 <li>
//                   <button 
//                     className="dropdown-item rounded-1" 
//                     onClick={() => handleStatusSelect('Inactive')}
//                   >
//                     Inactive
//                   </button>
//                 </li>
//               </ul>
//             </div>
            
//             <div className="dropdown me-2">
//               <button 
//                 className="dropdown-toggle btn btn-white d-inline-flex align-items-center" 
//                 data-bs-toggle="dropdown"
//               >
//                 {sortBy}
//               </button>
//               <ul className="dropdown-menu dropdown-menu-end p-3">
//                 {['Recently Added', 'Ascending', 'Desending', 'Last Month', 'Last 7 Days'].map((item) => (
//                   <li key={item}>
//                     <button 
//                       className="dropdown-item rounded-1" 
//                       onClick={() => handleSortBySelect(item)}
//                     >
//                       {item}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
            
//             <div className="dropdown">
//               <button 
//                 className="dropdown-toggle btn btn-white d-inline-flex align-items-center" 
//                 data-bs-toggle="dropdown"
//               >
//                 <Download size={16} className="me-1" /> Export
//               </button>
//               <ul className="dropdown-menu dropdown-menu-end p-3">
//                 <li>
//                   <button className="dropdown-item rounded-1">
//                     <FileText size={16} className="me-1" /> Export as PDF
//                   </button>
//                 </li>
//                 <li>
//                   <button className="dropdown-item rounded-1">
//                     <FileSpreadsheet size={16} className="me-1" /> Export as Excel
//                   </button>
//                 </li>
//               </ul>
//             </div>
            
//             <div className="head-icons ms-2">
//               <button 
//                 className="" 
//                 onClick={toggleCollapse}
//                 data-bs-toggle="tooltip" 
//                 data-bs-placement="top" 
//                 title="Collapse"
//               >
//                 <ChevronsUp size={16} />
//               </button>
//             </div>
//           </div>
//         </div>
//         {/* /Breadcrumb */}
        
//         <br />
        
//         <div className="row">
//           <div className="card">
//             <div className="card-body">
//               <form onSubmit={handleSearch}>
//                 <div className="d-flex align-items-center">
//                   <input 
//                     type="text" 
//                     className="form-control flex-fill me-3" 
//                     placeholder="Search Candidates" 
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                   <button type="submit" className="btn btn-secondary" style={{ whiteSpace: 'nowrap' }}>
//                     <Search size={16} className="me-1" /> Search
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>

//         {/* Show no results message if search was performed but no matches found */}
//         {hasSearched && filteredCandidates.length === 0 && (
//           <div className="row mt-4">
//             <div className="col-12">
//               <div className="card">
//                 <div className="card-body text-center py-5">
//                   <img src="/images/no-results.png" alt="No results" width="150" className="mb-3" />
//                   <h4>No candidates found</h4>
//                   <p className="text-muted">Try adjusting your search query</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
   
//       <EmployerFooter/>
//     </>
//   );
// };

// export default EmployeerCandidatesSearch;

// search wth all flter


import React, { useState, useEffect } from 'react';
import { ChevronsUp, Search, ChevronDown, Download, FileText, FileSpreadsheet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EmployerHeader from './EmployerHeader';
import EmployerFooter from './EmployerFooter';
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
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedDateRange, setSelectedDateRange] = useState('This Year');
  const navigate = useNavigate();

  const statusOptions = [
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
        label: 'Custom Range',
        value: 'custom',
        dateLabel: 'Select dates'
      }
    ];
  };

  const handleStatusSelect = (selectedStatus) => {
    setStatus(selectedStatus);
    filterCandidates(searchQuery, selectedStatus);
  };

  const handleSortBySelect = (selectedSort) => {
    setSortBy(`Sort By : ${selectedSort}`);
    sortCandidates(selectedSort);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
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

  const filterCandidates = (query = '', statusFilter = 'All') => {
    let filtered = [...candidates];

    // Apply search query filter
    if (query.trim()) {
      filtered = filtered.filter(candidate => {
        const searchFields = [
          candidate.firstName,
          candidate.lastName,
          candidate.email,
          candidate.phone,
          candidate.jobrole,
          candidate.currentcity,
          candidate.qualification,
          candidate.jobTitle
        ].filter(Boolean).join(' ').toLowerCase();
        
        return searchFields.includes(query.toLowerCase().trim());
      });
    }

    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(candidate => 
        candidate.employapplicantstatus &&
        candidate.employapplicantstatus.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Apply date range filter
    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      filtered = filtered.filter(candidate => {
        if (!candidate.appliedDate) return false;
        const appliedDate = new Date(candidate.appliedDate);
        return appliedDate >= startDate && appliedDate <= endDate;
      });
    }

    setFilteredCandidates(filtered);
    setHasSearched(true);
  };

  const sortCandidates = (sortOption) => {
    let sorted = [...filteredCandidates];

    switch (sortOption) {
      case 'Recently Added':
        sorted.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
        break;
      case 'Ascending':
        sorted.sort((a, b) => (a.firstName || '').localeCompare(b.firstName || ''));
        break;
      case 'Descending':
        sorted.sort((a, b) => (b.firstName || '').localeCompare(a.firstName || ''));
        break;
      case 'Last Month':
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        sorted = sorted.filter(candidate => {
          if (!candidate.appliedDate) return false;
          const appliedDate = new Date(candidate.appliedDate);
          return appliedDate >= lastMonth;
        });
        break;
      case 'Last 7 Days':
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        sorted = sorted.filter(candidate => {
          if (!candidate.appliedDate) return false;
          const appliedDate = new Date(candidate.appliedDate);
          return appliedDate >= lastWeek;
        });
        break;
      default:
        break;
    }

    setFilteredCandidates(sorted);
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
      default:
        return;
    }

    setDateRange({ start: startDate, end: endDate });
    closeAllDropdowns();
    filterCandidates(searchQuery, status);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    filterCandidates(searchQuery, status);
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
                  // Custom Range Date Picker View
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
                            filterCandidates(searchQuery, status);
                          }
                        }}
                        disabled={!dateRange.start || !dateRange.end}
                      >
                        Apply
                      </button>
                    </div>
                  </li>
                ) : (
                  // Regular Date Range Options
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
                {statusOptions.map((option) => (
                  <li key={option}>
                    <button
                      className="dropdown-item rounded-1"
                      onClick={() => {
                        handleStatusSelect(option);
                        closeAllDropdowns();
                      }}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sort Dropdown */}
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
                {sortOptions.map((option) => (
                  <li key={option}>
                    <button
                      className="dropdown-item rounded-1"
                      onClick={() => {
                        handleSortBySelect(option);
                        closeAllDropdowns();
                      }}
                    >
                      {option}
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
                <li>
                  <button 
                    className="dropdown-item rounded-1" 
                    onClick={() => {
                      exportToPDF();
                      closeAllDropdowns();
                    }}
                  >
                    <FileText size={16} className="me-1" /> Export as PDF
                  </button>
                </li>
                <li>
                  <button 
                    className="dropdown-item rounded-1"
                    onClick={() => {
                      exportToExcel();
                      closeAllDropdowns();
                    }}
                  >
                    <FileSpreadsheet size={16} className="me-1" /> Export as Excel
                  </button>
                </li>
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
                    placeholder="Search Candidates (name, email, skills, etc.)" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" className="btn btn-secondary" style={{ whiteSpace: 'nowrap' }}>
                    <Search size={16} className="me-1" /> Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {hasSearched && (
          <div className="row mt-4">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="mb-3">
                    <span className="badge bg-warning">
                      {filteredCandidates.length} {filteredCandidates.length === 1 ? 'candidate' : 'candidates'} found
                    </span>
                  </div>

                  {filteredCandidates.length > 0 ? (
                    <div className="row">
                      {filteredCandidates.map(candidate => (
                        <div key={candidate._id} className="col-xxl-12 col-xl-4 col-md-6 mb-3">
                          <div className="card">
                            <div className="card-body">
                              <div className="d-flex align-items-center justify-content-between mb-2">
                                <div className="d-flex align-items-center">
                                  <div className="avatar flex-shrink-0">
                                    <img
                                      src={candidate.profileurl || '/images/user-default.png'}
                                      className="img-fluid h-auto w-auto rounded-circle"
                                      alt="img"
                                      width="50"
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/images/user-default.png';
                                      }}
                                    />
                                  </div>
                                  <div className="ms-3">
                                    <h6 className="fs-14 fw-medium text-truncate text-primary mb-1">
                                      {candidate.firstName} {candidate.lastName || ''}
                                    </h6>
                                    <p className="fs-13 mb-1">
                                      <span className={`badge ${getStatusBadgeClass(candidate.employapplicantstatus)} me-1`}>
                                        {candidate.employapplicantstatus || 'Pending'}
                                      </span>
                                      <span className="text-muted">
                                        Applied: {new Date(candidate.appliedDate).toLocaleDateString('en-GB')}
                                      </span>
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
                                </div>
                              </div>
                              <div className="bg-light rounded p-2">
                                <div className="d-flex align-items-center justify-content-between mb-1">
                                  <span><b>Job Role:</b> {candidate.jobrole || 'Not specified'}</span>
                                  <span><b>Experience:</b> {candidate.experience || '0'} Years</span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-1">
                                  <span><b>Email:</b> {candidate.email || 'Not specified'}</span>
                                  <span><b>Phone:</b> {candidate.phone || 'Not specified'}</span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                  <span><b>Location:</b> {candidate.currentcity || 'Not specified'}</span>
                                  {candidate.resume?.url && (
                                    <a href={candidate.resume.url} className="fw-medium text-primary" target="_blank" rel="noopener noreferrer">
                                      <i className="ti ti-download"></i> Resume
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-5">
                      <img src="/images/no-results.png" alt="No results" width="150" className="mb-3" />
                      <h4>No candidates found</h4>
                      <p className="text-muted">Try adjusting your search filters</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
   
      <EmployerFooter/>
    </>
  );
};

export default EmployeerCandidatesSearch;