// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import {
//     ChevronDown,
//     LayoutGrid,
//     ListTree,
//     Download,
//     FileText,
//     PlusCircle,
//     ChevronsUp,
//     Home,
//     MapPin,
//     Circle,
//     Eye,
//     Edit2,
//     Trash2
// } from 'lucide-react';
// import company01 from '../../../assets/employer-admin/assets/img/company/company-01.svg';
// import company02 from '../../../assets/employer-admin/assets/img/company/company-02.svg';
// import company03 from '../../../assets/employer-admin/assets/img/company/company-03.svg';
// import company04 from '../../../assets/employer-admin/assets/img/company/company-04.svg';
// import company05 from '../../../assets/employer-admin/assets/img/company/company-05.svg';
// import company06 from '../../../assets/employer-admin/assets/img/company/company-06.svg';
// import company07 from '../../../assets/employer-admin/assets/img/company/company-07.svg';
// import company08 from '../../../assets/employer-admin/assets/img/company/company-08.svg';
// import company09 from '../../../assets/employer-admin/assets/img/company/company-09.svg';
// import company10 from '../../../assets/employer-admin/assets/img/company/company-10.svg';
// import EmployerAdminFooter from '../Layout/EmployerAdminFooter';
// import EmployerAdminHeader from '../Layout/EmployerAdminHeader';
// import UnitAddSchoolModal from './Modals/UnitAddSchoolModal';
// import UnitEditSchoolModal from './Modals/UnitEditSchoolModal';
// import UnitSchoolDetailModal from './Modals/UnitSchoolDetailModal';
// import UnitUpgradeModal from './Modals/UnitUpgradeModal';
// import DeleteConfirmationModal from '../subunits/Modals/DeleteConfirmationModal';
// import AddUnitModal from '../subunits/Modals/AddUnitModal';

// const UnitsPage = () => {
//     const [selectedDateRange, setSelectedDateRange] = useState('');
//     const [selectedPlan, setSelectedPlan] = useState('Select Plan');
//     const [selectedStatus, setSelectedStatus] = useState('Select Status');
//     const [sortBy, setSortBy] = useState('Last 7 Days');
//     const [selectedAll, setSelectedAll] = useState(false);
//     const [selectedRows, setSelectedRows] = useState([]);
//     const [showPlanDropdown, setShowPlanDropdown] = useState(false);
//     const [showStatusDropdown, setShowStatusDropdown] = useState(false);
//     const [showSortDropdown, setShowSortDropdown] = useState(false);
//     const [showExportDropdown, setShowExportDropdown] = useState(false);
//     const [showAddSchooltModal, setShowAddSchoolModal] = useState(false);
//     const [showEditSchoolModal, setShowEditSchoolModal] = useState(false);
//     const [showDetailsSchoolModal, setShowDetailsSchoolModal] = useState(false);
//     const [showUpgradeSchoolModal, setShowUpgradeSchoolModal] = useState(false);
//     const [itemToDelete, setItemToDelete] = useState(null);
//     const [schools, setSchools] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedSchool, setSelectedSchool] = useState(null);
//     const [stats, setStats] = useState({
//         totalSchools: 0,
//         activeSchools: 0,
//         inactiveSchools: 0,
//         schoolLocations: 0
//     });

//     // Get organization ID from localStorage
//     const employerAdminData = JSON.parse(localStorage.getItem('EmployerAdminData') || '{}');
//     const organizationid = employerAdminData._id || '';

//     useEffect(() => {
//         const fetchSchools = async () => {
//             try {
//                 const response = await axios.get(`https://edujobzbackend.onrender.com/employeradmin/fetchbyorg/${organizationid}`);
//                 if (response.data.success) {
//                     const transformedSchools = response.data.data.map((school, index) => ({
//                         id: school._id,
//                         name: school.schoolName,
//                         email: school.userEmail,
//                         url: school.website || `${school.schoolName.toLowerCase().replace(/\s+/g, '-')}.example.com`,
//                         plan: school.userMobile || 'Basic (Monthly)',
//                         date: new Date(school.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
//                         status: school.status || 'Active',
//                         image: getCompanyLogo(school), // Pass the school object instead of just index
//                         originalData: school
//                     }));

//                     setSchools(transformedSchools);

//                     // Calculate stats
//                     const total = transformedSchools.length;
//                     const active = transformedSchools.filter(s => s.status === 'Active').length;
//                     const inactive = total - active;
//                     const locations = new Set(transformedSchools.map(s => `${s.originalData.city}, ${s.originalData.state}`)).size;

//                     setStats({
//                         totalSchools: total,
//                         activeSchools: active,
//                         inactiveSchools: inactive,
//                         schoolLocations: locations
//                     });
//                 }
//             } catch (error) {
//                 console.error('Error fetching schools:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (organizationid) {
//             fetchSchools();
//         }
//     }, [organizationid]);

//     // Helper function to get company logo based on index
//     const getCompanyLogo = (school) => {
//         // If school has a profile picture, use that
//         if (school?.userProfilePic) {
//             return school.userProfilePic;
//         }

//         // Fallback to static images based on index if no profile picture
//         const logos = [company01, company02, company03, company04, company05,
//             company06, company07, company08, company09, company10];
//         return logos[school?._id?.charCodeAt(0) % logos.length] || company01;
//     };

//     const handleSelectAll = (e) => {
//         const isChecked = e.target.checked;
//         setSelectedAll(isChecked);
//         setSelectedRows(isChecked ? schools.map(school => school.id) : []);
//     };

//     const handleRowSelect = (id) => {
//         setSelectedRows(prev =>
//             prev.includes(id)
//                 ? prev.filter(rowId => rowId !== id)
//                 : [...prev, id]
//         );
//     };

//     const handleEdit = (school) => {
//         setSelectedSchool(school);
//         setShowEditSchoolModal(true);
//     };

//     const handleDelete = (school) => {
//         setSelectedSchool(school);
//         setItemToDelete(true);
//     };

//     const handleViewDetails = (school) => {
//         setSelectedSchool(school);
//         setShowDetailsSchoolModal(true);
//     };

//     const handleUpgrade = (school) => {
//         setSelectedSchool(school);
//         setShowUpgradeSchoolModal(true);
//     };

//     const handleDeleteConfirmed = async () => {
//         try {
//             await axios.delete(`https://edujobzbackend.onrender.com/employeradmin/${selectedSchool.id}`);
//             setSchools(schools.filter(school => school.id !== selectedSchool.id));
//             setItemToDelete(false);

//             // Update stats
//             setStats(prev => ({
//                 ...prev,
//                 totalSchools: prev.totalSchools - 1,
//                 activeSchools: selectedSchool.status === 'Active' ? prev.activeSchools - 1 : prev.activeSchools,
//                 inactiveSchools: selectedSchool.status !== 'Active' ? prev.inactiveSchools - 1 : prev.inactiveSchools
//             }));
//         } catch (error) {
//             console.error('Error deleting school:', error);
//         }
//     };

//     const handleAddSchool = async (newSchoolData) => {
//         try {
//             const response = await axios.post('https://edujobzbackend.onrender.com/employeradmin', {
//                 ...newSchoolData,
//                 organizationid
//             });

//             if (response.data.success) {
//                 const newSchool = {
//                     id: response.data.data._id,
//                     name: response.data.data.schoolName,
//                     email: response.data.data.userEmail,
//                     url: response.data.data.website || `${response.data.data.schoolName.toLowerCase().replace(/\s+/g, '-')}.example.com`,
//                     plan: response.data.data.plan || 'Basic (Monthly)',
//                     date: new Date(response.data.data.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
//                     status: response.data.data.status || 'Active',
//                     image: getCompanyLogo(schools.length),
//                     originalData: response.data.data
//                 };

//                 setSchools([...schools, newSchool]);
//                 setShowAddSchoolModal(false);

//                 // Update stats
//                 setStats(prev => ({
//                     ...prev,
//                     totalSchools: prev.totalSchools + 1,
//                     activeSchools: newSchool.status === 'Active' ? prev.activeSchools + 1 : prev.activeSchools,
//                     inactiveSchools: newSchool.status !== 'Active' ? prev.inactiveSchools + 1 : prev.inactiveSchools,
//                     schoolLocations: prev.schoolLocations +
//                         (schools.some(s => `${s.originalData.city}, ${s.originalData.state}` === `${newSchool.originalData.city}, ${newSchool.originalData.state}`))
//                         ? 0 : 1
//                 }));
//             }
//         } catch (error) {
//             console.error('Error adding school:', error);
//         }
//     };

//     const handleUpdateSchool = async (updatedData) => {
//         try {
//             const response = await axios.put(`https://edujobzbackend.onrender.com/employeradmin/${selectedSchool.id}`, updatedData);

//             if (response.data.success) {
//                 const updatedSchools = schools.map(school => {
//                     if (school.id === selectedSchool.id) {
//                         return {
//                             ...school,
//                             name: response.data.data.schoolName,
//                             email: response.data.data.userEmail,
//                             url: response.data.data.website || school.url,
//                             plan: response.data.data.plan || school.plan,
//                             status: response.data.data.status || school.status,
//                             originalData: response.data.data
//                         };
//                     }
//                     return school;
//                 });

//                 setSchools(updatedSchools);
//                 setShowEditSchoolModal(false);

//                 // Update stats if status changed
//                 if (selectedSchool.status !== (response.data.data.status || selectedSchool.status)) {
//                     const newStatus = response.data.data.status || selectedSchool.status;
//                     setStats(prev => ({
//                         ...prev,
//                         activeSchools: newStatus === 'Active'
//                             ? prev.activeSchools + (selectedSchool.status !== 'Active' ? 1 : 0)
//                             : prev.activeSchools - (selectedSchool.status === 'Active' ? 1 : 0),
//                         inactiveSchools: newStatus !== 'Active'
//                             ? prev.inactiveSchools + (selectedSchool.status === 'Active' ? 1 : 0)
//                             : prev.inactiveSchools - (selectedSchool.status !== 'Active' ? 1 : 0)
//                     }));
//                 }
//             }
//         } catch (error) {
//             console.error('Error updating school:', error);
//         }
//     };

//     const useOutsideClick = (ref, callback) => {
//         useEffect(() => {
//             const handleClickOutside = (event) => {
//                 if (ref.current && !ref.current.contains(event.target)) {
//                     callback();
//                 }
//             };
//             document.addEventListener('mousedown', handleClickOutside);
//             return () => {
//                 document.removeEventListener('mousedown', handleClickOutside);
//             }
//         }, [ref, callback]);
//     };

//     const planDropdownRef = useRef(null);
//     const sortDropdownRef = useRef(null);
//     const exportDropdownRef = useRef(null);
//     const statusDropdownRef = useRef(null);
//     useOutsideClick(planDropdownRef, () => setShowPlanDropdown(false));
//     useOutsideClick(sortDropdownRef, () => setShowSortDropdown(false));
//     useOutsideClick(exportDropdownRef, () => setShowExportDropdown(false));
//     useOutsideClick(statusDropdownRef, () => setShowStatusDropdown(false));

//     // Add these functions to your component (inside the UnitsPage component)

//     const handleExportPDF = () => {
//         setShowExportDropdown(false);

//         const printWindow = window.open('', '_blank');
//         printWindow.document.write(`
//     <html>
//       <head>
//         <title>Schools Report</title>
//         <style>
//           body { font-family: Arial, sans-serif; margin: 20px; }
//           h1 { color: #333; }
//           table { width: 100%; border-collapse: collapse; margin-top: 20px; }
//           th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
//           th { background-color: #f2f2f2; }
//           .summary { margin-top: 20px; font-weight: bold; }
//         </style>
//       </head>
//       <body>
//         <h1>Schools Report</h1>
//         <p>Generated on: ${new Date().toLocaleDateString()}</p>

//         <table>
//           <thead>
//             <tr>
//               <th>School Name</th>
//               <th>Email</th>
//               <th>Website</th>
//               <th>Plan</th>
//               <th>Created Date</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${schools.map(school => `
//               <tr>
//                 <td>${school.name}</td>
//                 <td>${school.email}</td>
//                 <td>${school.url}</td>
//                 <td>${school.plan}</td>
//                 <td>${school.date}</td>
//                 <td>${school.status}</td>
//               </tr>
//             `).join('')}
//           </tbody>
//         </table>

//         <div class="summary">
//           Total Schools: ${stats.totalSchools} | 
//           Active: ${stats.activeSchools} | 
//           Inactive: ${stats.inactiveSchools}
//         </div>

//         <script>
//           // Automatically trigger print dialog when the window loads
//           window.onload = function() {
//             setTimeout(function() {
//               window.print();
//             }, 200);
//           };
//         </script>
//       </body>
//     </html>
//   `);
//         printWindow.document.close();
//     };

//     const handleExportExcel = () => {
//         setShowExportDropdown(false);

//         // Create CSV content
//         const csvContent = [
//             ['School Name', 'Email', 'Website', 'Plan', 'Created Date', 'Status'],
//             ...schools.map(school => [
//                 school.name,
//                 school.email,
//                 school.url,
//                 school.plan,
//                 school.date,
//                 school.status
//             ])
//         ].map(row => row.join(',')).join('\n');

//         // Create download link
//         const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.setAttribute('href', url);
//         link.setAttribute('download', `schools_report_${new Date().toISOString().slice(0, 10)}.csv`);
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };


//     if (loading) {
//         return (
//             <>
//                 <EmployerAdminHeader />
//                 <div className="content m-2">
//                     <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
//                         <div className="spinner-border text-primary" role="status">
//                             <span className="visually-hidden">Loading...</span>
//                         </div>
//                     </div>
//                 </div>
//                 <EmployerAdminFooter />
//             </>
//         );
//     }

//     return (
//         <>
//             <EmployerAdminHeader />
//             <div className="content m-2">
//                 {/* Breadcrumb */}
//                 <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
//                     <div className="my-auto">
//                         <h2>Units</h2>
//                     </div>
//                     <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
//                         {/* Date Range Picker */}
//                         <div className="me-2">
//                             <div className="input-icon-end position-relative">
//                                 <input
//                                     type="text"
//                                     className="form-control date-range bookingrange"
//                                     placeholder="dd/mm/yyyy - dd/mm/yyyy"
//                                     value={selectedDateRange}
//                                     onChange={(e) => setSelectedDateRange(e.target.value)}
//                                 />
//                                 <span className="input-icon-addon">
//                                     <ChevronDown size={16} />
//                                 </span>
//                             </div>
//                         </div>

//                         {/* Plan Dropdown */}
//                         <div className="dropdown me-2" ref={planDropdownRef}>
//                             <button
//                                 className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
//                                 onClick={() => setShowPlanDropdown(!showPlanDropdown)}
//                             >
//                                 {selectedPlan}
//                             </button>
//                             <ul
//                                 className={`dropdown-menu dropdown-menu-end p-3 ${showPlanDropdown ? 'show' : ''}`}
//                                 style={{ display: showPlanDropdown ? 'block' : 'none' }}
//                             >
//                                 <li>
//                                     <button
//                                         className="dropdown-item rounded-1"
//                                         onClick={() => {
//                                             setSelectedPlan('Advanced');
//                                             setShowPlanDropdown(false);
//                                         }}
//                                     >
//                                         Advanced
//                                     </button>
//                                 </li>
//                                 <li>
//                                     <button
//                                         className="dropdown-item rounded-1"
//                                         onClick={() => {
//                                             setSelectedPlan('Basic');
//                                             setShowPlanDropdown(false);
//                                         }}
//                                     >
//                                         Basic
//                                     </button>
//                                 </li>
//                                 <li>
//                                     <button
//                                         className="dropdown-item rounded-1"
//                                         onClick={() => {
//                                             setSelectedPlan('Enterprise');
//                                             setShowPlanDropdown(false);
//                                         }}
//                                     >
//                                         Enterprise
//                                     </button>
//                                 </li>
//                             </ul>
//                         </div>

//                         {/* Status Dropdown */}
//                         <div className="dropdown me-2" ref={statusDropdownRef}>
//                             <button
//                                 className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
//                                 onClick={() => setShowStatusDropdown(!showStatusDropdown)}
//                             >
//                                 {selectedStatus}
//                             </button>
//                             <ul
//                                 className={`dropdown-menu dropdown-menu-end p-3 ${showStatusDropdown ? 'show' : ''}`}
//                                 style={{ display: showStatusDropdown ? 'block' : 'none' }}
//                             >
//                                 <li>
//                                     <button
//                                         className="dropdown-item rounded-1"
//                                         onClick={() => {
//                                             setSelectedStatus('Active');
//                                             setShowStatusDropdown(false);
//                                         }}
//                                     >
//                                         Active
//                                     </button>
//                                 </li>
//                                 <li>
//                                     <button
//                                         className="dropdown-item rounded-1"
//                                         onClick={() => {
//                                             setSelectedStatus('Inactive');
//                                             setShowStatusDropdown(false);
//                                         }}
//                                     >
//                                         Inactive
//                                     </button>
//                                 </li>
//                             </ul>
//                         </div>

//                         {/* Sort By Dropdown */}
//                         <div className="dropdown me-2" ref={sortDropdownRef}>
//                             <button
//                                 className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
//                                 onClick={() => {
//                                     setShowSortDropdown(!showSortDropdown);
//                                     setShowExportDropdown(false);
//                                 }}
//                             >
//                                 Sort By: {sortBy}
//                             </button>
//                             <ul
//                                 className={`dropdown-menu dropdown-menu-end p-3 ${showSortDropdown ? 'show' : ''}`}
//                                 style={{ display: showSortDropdown ? 'block' : 'none' }}
//                             >
//                                 <li>
//                                     <button
//                                         className="dropdown-item rounded-1"
//                                         onClick={() => {
//                                             setSortBy('Recently Added');
//                                             setShowSortDropdown(false);
//                                         }}
//                                     >
//                                         Recently Added
//                                     </button>
//                                 </li>
//                                 <li>
//                                     <button
//                                         className="dropdown-item rounded-1"
//                                         onClick={() => {
//                                             setSortBy('Ascending');
//                                             setShowSortDropdown(false);
//                                         }}
//                                     >
//                                         Ascending
//                                     </button>
//                                 </li>
//                                 <li>
//                                     <button
//                                         className="dropdown-item rounded-1"
//                                         onClick={() => {
//                                             setSortBy('Descending');
//                                             setShowSortDropdown(false);
//                                         }}
//                                     >
//                                         Descending
//                                     </button>
//                                 </li>
//                                 <li>
//                                     <button
//                                         className="dropdown-item rounded-1"
//                                         onClick={() => {
//                                             setSortBy('Last Month');
//                                             setShowSortDropdown(false);
//                                         }}
//                                     >
//                                         Last Month
//                                     </button>
//                                 </li>
//                                 <li>
//                                     <button
//                                         className="dropdown-item rounded-1"
//                                         onClick={() => {
//                                             setSortBy('Last 7 Days');
//                                             setShowSortDropdown(false);
//                                         }}
//                                     >
//                                         Last 7 Days
//                                     </button>
//                                 </li>
//                             </ul>
//                         </div>

//                         {/* View Toggle */}
//                         <div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
//                             <a href="units" className="btn btn-icon btn-sm active bg-primary text-white">
//                                 <ListTree size={16} />
//                             </a>
//                             <a href="units-grid" className="btn btn-icon btn-sm me-1">
//                                 <LayoutGrid size={16} />
//                             </a>
//                         </div>

//                         {/* Export Dropdown */}
//                         <div className="dropdown me-2" ref={exportDropdownRef}>
//                             <button
//                                 className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
//                                 onClick={() => {
//                                     setShowExportDropdown(!showExportDropdown);
//                                     setShowSortDropdown(false);
//                                 }}
//                             >
//                                 <Download size={16} className="me-1" />
//                                 Export
//                             </button>
//                             <ul
//                                 className={`dropdown-menu dropdown-menu-end p-3 ${showExportDropdown ? 'show' : ''}`}
//                                 style={{ display: showExportDropdown ? 'block' : 'none' }}
//                             >
//                                 <li>
//                                     <button
//                                         className="dropdown-item rounded-1 d-flex align-items-center"
//                                         onClick={handleExportPDF}
//                                     >
//                                         <FileText size={16} className="me-1" />
//                                         Export as PDF
//                                     </button>
//                                 </li>
//                                 <li>
//                                     <button
//                                         className="dropdown-item rounded-1 d-flex align-items-center"
//                                         onClick={handleExportExcel}
//                                     >
//                                         <FileText size={16} className="me-1" />
//                                         Export as Excel
//                                     </button>
//                                 </li>
//                             </ul>
//                         </div>
//                         <button onClick={() => setShowAddSchoolModal(true)} className="btn btn-primary d-flex align-items-center">
//                             <PlusCircle size={16} className="me-2" />
//                             Add School
//                         </button>
//                     </div>
//                 </div>

//                 {/* Stats Cards */}
//                 <div className="row">
//                     {/* Total Schools */}
//                     <div className="col-lg-3 col-md-6 d-flex">
//                         <div className="card flex-fill">
//                             <div className="card-body d-flex align-items-center justify-content-between">
//                                 <div className="d-flex align-items-center overflow-hidden">
//                                     <span className="avatar avatar-lg bg-primary flex-shrink-0">
//                                         <i className="ti ti-building fs-16"></i>
//                                     </span>
//                                     <div className="ms-2 overflow-hidden">
//                                         <p className="fs-12 fw-medium mb-1 text-truncate">Total Schools</p>
//                                         <h4>{stats.totalSchools}</h4>
//                                     </div>
//                                 </div>
//                                 <div id="total-chart"></div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Active Schools */}
//                     <div className="col-lg-3 col-md-6 d-flex">
//                         <div className="card flex-fill">
//                             <div className="card-body d-flex align-items-center justify-content-between">
//                                 <div className="d-flex align-items-center overflow-hidden">
//                                     <span className="avatar avatar-lg bg-success flex-shrink-0">
//                                         <i className="ti ti-building fs-16"></i>
//                                     </span>
//                                     <div className="ms-2 overflow-hidden">
//                                         <p className="fs-12 fw-medium mb-1 text-truncate">Active Schools</p>
//                                         <h4>{stats.activeSchools}</h4>
//                                     </div>
//                                 </div>
//                                 <div id="active-chart"></div>
//                             </div>
//                         </div>
//                     </div>
//                     {/* Inactive Schools */}
//                     <div className="col-lg-3 col-md-6 d-flex">
//                         <div className="card flex-fill">
//                             <div className="card-body d-flex align-items-center justify-content-between">
//                                 <div className="d-flex align-items-center overflow-hidden">
//                                     <span className="avatar avatar-lg bg-danger flex-shrink-0">
//                                         <i className="ti ti-building fs-16"></i>
//                                     </span>
//                                     <div className="ms-2 overflow-hidden">
//                                         <p className="fs-12 fw-medium mb-1 text-truncate">Inactive Schools</p>
//                                         <h4>{stats.inactiveSchools}</h4>
//                                     </div>
//                                 </div>
//                                 <div id="inactive-chart"></div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* School Location */}
//                     <div className="col-lg-3 col-md-6 d-flex">
//                         <div className="card flex-fill">
//                             <div className="card-body d-flex align-items-center justify-content-between">
//                                 <div className="d-flex align-items-center overflow-hidden">
//                                     <span className="avatar avatar-lg bg-skyblue flex-shrink-0">
//                                         <i className="ti ti-map-pin-check fs-16"></i>
//                                     </span>
//                                     <div className="ms-2 overflow-hidden">
//                                         <p className="fs-12 fw-medium mb-1 text-truncate">School Location</p>
//                                         <h4>{stats.schoolLocations}</h4>
//                                     </div>
//                                 </div>
//                                 <div id="location-chart"></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Schools Table */}
//                 <div className="card">
//                     <div className="card-body p-0">
//                         <div className="custom-datatable-filter table-responsive">
//                             <table className="table datatable">
//                                 <thead className="thead-light">
//                                     <tr>
//                                         <th className="no-sort">
//                                             <div className="form-check form-check-md">
//                                                 <input
//                                                     className="form-check-input"
//                                                     type="checkbox"
//                                                     id="select-all"
//                                                     checked={selectedAll}
//                                                     onChange={handleSelectAll}
//                                                 />
//                                             </div>
//                                         </th>
//                                         <th>School Name</th>
//                                         <th>Email</th>
//                                         <th>Website</th>
//                                         <th>Contact</th>
//                                         <th>Created Date</th>
//                                         <th>Status</th>
//                                         <th></th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {schools.length > 0 ? (
//                                         schools.map((school) => (
//                                             <tr key={school.id}>
//                                                 <td>
//                                                     <div className="form-check form-check-md">
//                                                         <input
//                                                             className="form-check-input"
//                                                             type="checkbox"
//                                                             checked={selectedRows.includes(school.id)}
//                                                             onChange={() => handleRowSelect(school.id)}
//                                                         />
//                                                     </div>
//                                                 </td>
//                                                 <td>
//                                                     <div className="d-flex align-items-center file-name-icon">
//                                                         <a href="#" className="avatar avatar-md border rounded-circle">
//                                                             <img src={school.image} className="img-fluid" alt={school.name} />
//                                                         </a>
//                                                         <div className="ms-2">
//                                                             <h6 className="fw-medium">
//                                                                 <a href="#">{school.name}</a>
//                                                             </h6>
//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                                 <td><a href={`mailto:${school.email}`}>{school.email}</a></td>
//                                                 <td>{school.url}</td>
//                                                 <td>
//                                                     <div className="d-flex align-items-center justify-content-between">
//                                                         <p className="mb-0 me-2">{school.plan}</p>
//                                                         <button onClick={() => handleUpgrade(school)} className="badge badge-purple badge-xs">Upgrade</button>
//                                                     </div>
//                                                 </td>
//                                                 <td>{school.date}</td>
//                                                 <td>
//                                                     <span className={`badge ${school.status === 'Active' ? 'badge-success' : 'badge-danger'} d-inline-flex align-items-center badge-xs`}>
//                                                         <Circle size={12} className="me-1" />
//                                                         {school.status}
//                                                     </span>
//                                                 </td>
//                                                 <td>
//                                                     <div className="action-icon d-inline-flex">
//                                                         <button onClick={() => handleViewDetails(school)} className="me-2 btn btn-icon btn-sm">
//                                                             <Eye size={16} />
//                                                         </button>
//                                                         <button onClick={() => handleEdit(school)} className="me-2 btn btn-icon btn-sm">
//                                                             <Edit2 size={16} />
//                                                         </button>
//                                                         <button onClick={() => handleDelete(school)} className="btn btn-icon btn-sm">
//                                                             <Trash2 size={16} className="text-danger" />
//                                                         </button>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         ))
//                                     ) : (
//                                         <tr>
//                                             <td colSpan="8" className="text-center py-5">
//                                                 <h4>No schools found</h4>
//                                                 <p>Click "Add School" to create your first school</p>
//                                             </td>
//                                         </tr>
//                                     )}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Modals */}
//             <AddUnitModal
//                 show={showAddSchooltModal}
//                 onClose={() => setShowAddSchoolModal(false)}
//                 onSave={handleAddSchool}
//             />

//             {selectedSchool && (
//                 <>
//                     <UnitEditSchoolModal
//                         show={showEditSchoolModal}
//                         onClose={() => setShowEditSchoolModal(false)}
//                         school={selectedSchool}
//                         onSave={handleUpdateSchool}
//                     />

//                     <UnitSchoolDetailModal
//                         show={showDetailsSchoolModal}
//                         onClose={() => setShowDetailsSchoolModal(false)}
//                         school={selectedSchool}
//                     />

//                     <UnitUpgradeModal
//                         show={showUpgradeSchoolModal}
//                         onClose={() => setShowUpgradeSchoolModal(false)}
//                         school={selectedSchool}
//                     />
//                 </>
//             )}

//             <DeleteConfirmationModal
//                 show={itemToDelete}
//                 onClose={() => setItemToDelete(false)}
//                 onConfirm={handleDeleteConfirmed}
//             />

//             <EmployerAdminFooter />
//         </>
//     );
// };

// export default UnitsPage;

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
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
import EmployerAdminFooter from '../Layout/EmployerAdminFooter';
import EmployerAdminHeader from '../Layout/EmployerAdminHeader';
import UnitAddSchoolModal from './Modals/UnitAddSchoolModal';
import UnitEditSchoolModal from './Modals/UnitEditSchoolModal';
import UnitSchoolDetailModal from './Modals/UnitSchoolDetailModal';
import UnitUpgradeModal from './Modals/UnitUpgradeModal';
import DeleteConfirmationModal from '../subunits/Modals/DeleteConfirmationModal';
import AddUnitModal from '../subunits/Modals/AddUnitModal';

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
    const [showAddSchooltModal, setShowAddSchoolModal] = useState(false);
    const [showEditSchoolModal, setShowEditSchoolModal] = useState(false);
    const [showDetailsSchoolModal, setShowDetailsSchoolModal] = useState(false);
    const [showUpgradeSchoolModal, setShowUpgradeSchoolModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [schools, setSchools] = useState([]);
    const [filteredSchools, setFilteredSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [stats, setStats] = useState({
        totalSchools: 0,
        activeSchools: 0,
        inactiveSchools: 0,
        schoolLocations: 0
    });

    // Get organization ID from localStorage
    const employerAdminData = JSON.parse(localStorage.getItem('EmployerAdminData') || '{}');
    const organizationid = employerAdminData._id || '';

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await axios.get(`https://edujobzbackend.onrender.com/employeradmin/fetchbyorg/${organizationid}`);
                if (response.data.success) {
                    const transformedSchools = response.data.data.map((school, index) => ({
                        id: school._id,
                        name: school.schoolName,
                        email: school.userEmail,
                        url: school.website || `${school.schoolName.toLowerCase().replace(/\s+/g, '-')}.example.com`,
                        plan: school.userMobile || 'Basic (Monthly)',
                        date: new Date(school.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
                        status: school.status || 'Active',
                        image: getCompanyLogo(school),
                        originalData: school
                    }));

                    setSchools(transformedSchools);
                    setFilteredSchools(transformedSchools);
                    updateStats(transformedSchools);
                }
            } catch (error) {
                console.error('Error fetching schools:', error);
            } finally {
                setLoading(false);
            }
        };

        if (organizationid) {
            fetchSchools();
        }
    }, [organizationid]);

    useEffect(() => {
        applyFilters();
    }, [selectedDateRange, selectedPlan, selectedStatus, sortBy, schools]);

    const applyFilters = () => {
        let result = [...schools];  

        // Apply date range filter if selected
        if (selectedDateRange) {
            const [startDateStr, endDateStr] = selectedDateRange.split(' - ');
            try {
                const parseDate = (dateStr) => {
                    const [day, month, year] = dateStr.split('/');
                    return new Date(`${year}-${month}-${day}`);
                };

                const startDate = parseDate(startDateStr.trim());
                const endDate = parseDate(endDateStr.trim());

                result = result.filter(school => {
                    const schoolDate = new Date(school.originalData.createdAt);
                    return schoolDate >= startDate && schoolDate <= endDate;
                });
            } catch (e) {
                console.error('Invalid date format', e);
            }
        }

        // Apply plan filter if not "Select Plan"
        if (selectedPlan !== 'Select Plan') {
            result = result.filter(school => {
                const schoolPlan = school.plan.split(' ')[0];
                return schoolPlan === selectedPlan;
            });
        }

        // Apply status filter if not "Select Status"
        if (selectedStatus !== 'Select Status') {
            result = result.filter(school => school.status === selectedStatus);
        }

        // Apply sorting
        result = sortSchools(result);

        setFilteredSchools(result);
        updateStats(result);
    };

    const sortSchools = (schoolsToSort) => {
        const sorted = [...schoolsToSort];

        switch (sortBy) {
            case 'Recently Added':
                return sorted.sort((a, b) =>
                    new Date(b.originalData.createdAt) - new Date(a.originalData.createdAt)
                );
            case 'Ascending':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            case 'Descending':
                return sorted.sort((a, b) => b.name.localeCompare(a.name));
            case 'Last Month': {
                const oneMonthAgo = new Date();
                oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
                return sorted.filter(school =>
                    new Date(school.originalData.createdAt) >= oneMonthAgo
                );
            }
            case 'Last 7 Days': {
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                return sorted.filter(school =>
                    new Date(school.originalData.createdAt) >= sevenDaysAgo
                );
            }
            default:
                return sorted;
        }
    };

    const updateStats = (schoolsList) => {
        const total = schoolsList.length;
        const active = schoolsList.filter(s => s.status === 'Active').length;
        const inactive = total - active;
        const locations = new Set(
            schoolsList.map(s => `${s.originalData.city}, ${s.originalData.state}`)
        ).size;

        setStats({
            totalSchools: total,
            activeSchools: active,
            inactiveSchools: inactive,
            schoolLocations: locations
        });
    };

    const getCompanyLogo = (school) => {
        if (school?.userProfilePic) {
            return school.userProfilePic;
        }

        const logos = [company01, company02, company03, company04, company05,
            company06, company07, company08, company09, company10];
        return logos[school?._id?.charCodeAt(0) % logos.length] || company01;
    };

    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        setSelectedAll(isChecked);
        setSelectedRows(isChecked ? filteredSchools.map(school => school.id) : []);
    };

    const handleRowSelect = (id) => {
        setSelectedRows(prev =>
            prev.includes(id)
                ? prev.filter(rowId => rowId !== id)
                : [...prev, id]
        );
    };

    const handleEdit = (school) => {
        setSelectedSchool(school);
        setShowEditSchoolModal(true);
    };

    const handleDelete = (school) => {
        setSelectedSchool(school);
        setItemToDelete(true);
    };

    const handleViewDetails = (school) => {
        setSelectedSchool(school);
        setShowDetailsSchoolModal(true);
    };

    const handleUpgrade = (school) => {
        setSelectedSchool(school);
        setShowUpgradeSchoolModal(true);
    };

    const handleDeleteConfirmed = async () => {
        try {
            await axios.delete(`https://edujobzbackend.onrender.com/employeradmin/${selectedSchool.id}`);
            const updatedSchools = schools.filter(school => school.id !== selectedSchool.id);
            setSchools(updatedSchools);
            setItemToDelete(false);
            updateStats(updatedSchools);
        } catch (error) {
            console.error('Error deleting school:', error);
        }
    };

    const handleAddSchool = async (newSchoolData) => {
        try {
            const response = await axios.post('https://edujobzbackend.onrender.com/employeradmin', {
                ...newSchoolData,
                organizationid
            });

            if (response.data.success) {
                const newSchool = {
                    id: response.data.data._id,
                    name: response.data.data.schoolName,
                    email: response.data.data.userEmail,
                    url: response.data.data.website || `${response.data.data.schoolName.toLowerCase().replace(/\s+/g, '-')}.example.com`,
                    plan: response.data.data.plan || 'Basic (Monthly)',
                    date: new Date(response.data.data.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
                    status: response.data.data.status || 'Active',
                    image: getCompanyLogo(schools.length),
                    originalData: response.data.data
                };

                const updatedSchools = [...schools, newSchool];
                setSchools(updatedSchools);
                setShowAddSchoolModal(false);
                updateStats(updatedSchools);
            }
        } catch (error) {
            console.error('Error adding school:', error);
        }
    };

    const handleUpdateSchool = async (updatedData) => {
        try {
            const response = await axios.put(`https://edujobzbackend.onrender.com/employeradmin/${selectedSchool.id}`, updatedData);

            if (response.data.success) {
                const updatedSchools = schools.map(school => {
                    if (school.id === selectedSchool.id) {
                        return {
                            ...school,
                            name: response.data.data.schoolName,
                            email: response.data.data.userEmail,
                            url: response.data.data.website || school.url,
                            plan: response.data.data.plan || school.plan,
                            status: response.data.data.status || school.status,
                            originalData: response.data.data
                        };
                    }
                    return school;
                });

                setSchools(updatedSchools);
                setShowEditSchoolModal(false);
                updateStats(updatedSchools);
            }
        } catch (error) {
            console.error('Error updating school:', error);
        }
    };

    const handleExportPDF = () => {
        setShowExportDropdown(false);
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Schools Report</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        h1 { color: #333; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; }
                        .summary { margin-top: 20px; font-weight: bold; }
                    </style>
                </head>
                <body>
                    <h1>Schools Report</h1>
                    <p>Generated on: ${new Date().toLocaleDateString()}</p>
                    <p>Filters: 
                        ${selectedDateRange ? `Date Range: ${selectedDateRange} | ` : ''}
                        ${selectedPlan !== 'Select Plan' ? `Plan: ${selectedPlan} | ` : ''}
                        ${selectedStatus !== 'Select Status' ? `Status: ${selectedStatus} | ` : ''}
                        Sort By: ${sortBy}
                    </p>
                    
                    <table>
                        <thead>
                            <tr>
                                <th>School Name</th>
                                <th>Email</th>
                                <th>Website</th>
                                <th>Plan</th>
                                <th>Created Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filteredSchools.map(school => `
                                <tr>
                                    <td>${school.name}</td>
                                    <td>${school.email}</td>
                                    <td>${school.url}</td>
                                    <td>${school.plan}</td>
                                    <td>${school.date}</td>
                                    <td>${school.status}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    
                    <div class="summary">
                        Total Schools: ${stats.totalSchools} | 
                        Active: ${stats.activeSchools} | 
                        Inactive: ${stats.inactiveSchools}
                    </div>
                    
                    <script>
                        window.onload = function() {
                            setTimeout(function() {
                                window.print();
                            }, 200);
                        };
                    </script>
                </body>
            </html>
        `);
        printWindow.document.close();
    };

    const handleExportExcel = () => {
        setShowExportDropdown(false);
        const csvContent = [
            ['School Name', 'Email', 'Website', 'Plan', 'Created Date', 'Status'],
            ...filteredSchools.map(school => [
                school.name,
                school.email,
                school.url,
                school.plan,
                school.date,
                school.status
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `schools_report_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const useOutsideClick = (ref, callback) => {
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    callback();
                }
            };
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            }
        }, [ref, callback]);
    };

    const planDropdownRef = useRef(null);
    const sortDropdownRef = useRef(null);
    const exportDropdownRef = useRef(null);
    const statusDropdownRef = useRef(null);
    useOutsideClick(planDropdownRef, () => setShowPlanDropdown(false));
    useOutsideClick(sortDropdownRef, () => setShowSortDropdown(false));
    useOutsideClick(exportDropdownRef, () => setShowExportDropdown(false));
    useOutsideClick(statusDropdownRef, () => setShowStatusDropdown(false));

    if (loading) {
        return (
            <>
                <EmployerAdminHeader />
                <div className="content m-2">
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
                <EmployerAdminFooter />
            </>
        );
    }

    return (
        <>
            <EmployerAdminHeader />
            <div className="content m-2">
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
                                    className="form-control date-range"
                                    placeholder="dd/mm/yyyy - dd/mm/yyyy"
                                    value={selectedDateRange}
                                    onChange={(e) => setSelectedDateRange(e.target.value)}
                                    pattern="\d{2}/\d{2}/\d{4} - \d{2}/\d{2}/\d{4}"
                                    title="Please use format: dd/mm/yyyy - dd/mm/yyyy"
                                />
                                <span className="input-icon-addon">
                                    <ChevronDown size={16} />
                                </span>
                            </div>
                        </div>

                        {/* Plan Dropdown */}
                        <div className="dropdown me-2" ref={planDropdownRef}>
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
                        <div className="dropdown me-2" ref={statusDropdownRef}>
                            <button
                                className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                            >
                                {selectedStatus}
                            </button>
                            <ul
                                className={`dropdown-menu dropdown-menu-end p-3 ${showStatusDropdown ? 'show' : ''}`}
                                style={{ display: showStatusDropdown ? 'block' : 'none' }}
                            >
                                <li>
                                    <button
                                        className="dropdown-item rounded-1"
                                        onClick={() => {
                                            setSelectedStatus('Active');
                                            setShowStatusDropdown(false);
                                        }}
                                    >
                                        Active
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item rounded-1"
                                        onClick={() => {
                                            setSelectedStatus('Inactive');
                                            setShowStatusDropdown(false);
                                        }}
                                    >
                                        Inactive
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* Sort By Dropdown */}
                        <div className="dropdown me-2" ref={sortDropdownRef}>
                            <button
                                className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                onClick={() => {
                                    setShowSortDropdown(!showSortDropdown);
                                    setShowExportDropdown(false);
                                }}
                            >
                                Sort By: {sortBy}
                            </button>
                            <ul
                                className={`dropdown-menu dropdown-menu-end p-3 ${showSortDropdown ? 'show' : ''}`}
                                style={{ display: showSortDropdown ? 'block' : 'none' }}
                            >
                                <li>
                                    <button
                                        className="dropdown-item rounded-1"
                                        onClick={() => {
                                            setSortBy('Recently Added');
                                            setShowSortDropdown(false);
                                        }}
                                    >
                                        Recently Added
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item rounded-1"
                                        onClick={() => {
                                            setSortBy('Ascending');
                                            setShowSortDropdown(false);
                                        }}
                                    >
                                        Ascending
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item rounded-1"
                                        onClick={() => {
                                            setSortBy('Descending');
                                            setShowSortDropdown(false);
                                        }}
                                    >
                                        Descending
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item rounded-1"
                                        onClick={() => {
                                            setSortBy('Last Month');
                                            setShowSortDropdown(false);
                                        }}
                                    >
                                        Last Month
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item rounded-1"
                                        onClick={() => {
                                            setSortBy('Last 7 Days');
                                            setShowSortDropdown(false);
                                        }}
                                    >
                                        Last 7 Days
                                    </button>
                                </li>
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
                        <div className="dropdown me-2" ref={exportDropdownRef}>
                            <button
                                className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                onClick={() => {
                                    setShowExportDropdown(!showExportDropdown);
                                    setShowSortDropdown(false);
                                }}
                            >
                                <Download size={16} className="me-1" />
                                Export
                            </button>
                            <ul
                                className={`dropdown-menu dropdown-menu-end p-3 ${showExportDropdown ? 'show' : ''}`}
                                style={{ display: showExportDropdown ? 'block' : 'none' }}
                            >
                                <li>
                                    <button
                                        className="dropdown-item rounded-1 d-flex align-items-center"
                                        onClick={handleExportPDF}
                                    >
                                        <FileText size={16} className="me-1" />
                                        Export as PDF
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item rounded-1 d-flex align-items-center"
                                        onClick={handleExportExcel}
                                    >
                                        <FileText size={16} className="me-1" />
                                        Export as Excel
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <button onClick={() => setShowAddSchoolModal(true)} className="btn btn-primary d-flex align-items-center">
                            <PlusCircle size={16} className="me-2" />
                            Add School
                        </button>
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
                                        <h4>{stats.totalSchools}</h4>
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
                                        <h4>{stats.activeSchools}</h4>
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
                                        <h4>{stats.inactiveSchools}</h4>
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
                                        <h4>{stats.schoolLocations}</h4>
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
                                        <th>Website</th>
                                        <th>Contact</th>
                                        <th>Created Date</th>
                                        {/* <th>Status</th> */}
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(filteredSchools.length > 0 ? filteredSchools : schools).map((school) => (
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
                                                    <button onClick={() => handleUpgrade(school)} className="badge badge-purple badge-xs">Upgrade</button>
                                                </div>
                                            </td>
                                            <td>{school.date}</td>
                                            {/* <td>
                                                <span className={`badge ${school.status === 'Active' ? 'badge-success' : 'badge-danger'} d-inline-flex align-items-center badge-xs`}>
                                                    <Circle size={12} className="me-1" />
                                                    {school.status}
                                                </span>
                                            </td> */}
                                            <td>
                                                <div className="action-icon d-inline-flex">
                                                    <button onClick={() => handleViewDetails(school)} className="me-2 btn btn-icon btn-sm">
                                                        <Eye size={16} />
                                                    </button>
                                                    <button onClick={() => handleEdit(school)} className="me-2 btn btn-icon btn-sm">
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button onClick={() => handleDelete(school)} className="btn btn-icon btn-sm">
                                                        <Trash2 size={16} className="text-danger" />
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
            </div>

            {/* Modals */}
            <AddUnitModal
                show={showAddSchooltModal}
                onClose={() => setShowAddSchoolModal(false)}
                onSave={handleAddSchool}
            />

            {selectedSchool && (
                <>
                    <UnitEditSchoolModal
                        show={showEditSchoolModal}
                        onClose={() => setShowEditSchoolModal(false)}
                        school={selectedSchool}
                        onSave={handleUpdateSchool}
                    />

                    <UnitSchoolDetailModal
                        show={showDetailsSchoolModal}
                        onClose={() => setShowDetailsSchoolModal(false)}
                        school={selectedSchool}
                    />

                    <UnitUpgradeModal
                        show={showUpgradeSchoolModal}
                        onClose={() => setShowUpgradeSchoolModal(false)}
                        school={selectedSchool}
                    />
                </>
            )}

            <DeleteConfirmationModal
                show={itemToDelete}
                onClose={() => setItemToDelete(false)}
                onConfirm={handleDeleteConfirmed}
            />

            <EmployerAdminFooter />
        </>
    );
};

export default UnitsPage;