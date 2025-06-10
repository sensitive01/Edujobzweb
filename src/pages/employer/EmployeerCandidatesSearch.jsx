import React, { useState } from 'react';
import { ChevronsUp, Search, ChevronDown, Download, FileText, FileSpreadsheet } from 'lucide-react';
import EmployerHeader from './EmployerHeader';
import EmployerFooter from './EmployerFooter';

const EmployeerCandidatesSearch = () => {
  const [status, setStatus] = useState('Select Status');
  const [sortBy, setSortBy] = useState('Sort By : Last 7 Days');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleStatusSelect = (selectedStatus) => {
    setStatus(selectedStatus);
  };

  const handleSortBySelect = (selectedSort) => {
    setSortBy(`Sort By : ${selectedSort}`);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
    <EmployerHeader/>
   
      <div className="content">
        {/* Breadcrumb */}
        <div className={`d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3 ${isCollapsed ? 'collapsed' : ''}`}>
          <div className="my-auto">
            <h2>&nbsp; <i className="fa fa-search text-primary"></i> Search Candidates</h2>
          </div>
          <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
            <div className="me-2">
              <div className="input-icon-end position-relative">
                <input 
                  type="text" 
                  className="form-control date-range bookingrange" 
                  placeholder="dd/mm/yyyy - dd/mm/yyyy" 
                  style={{width: '205px'}} 
                />
                <span className="input-icon-addon">
                  <ChevronDown size={16} />
                </span>
              </div>
            </div>
            
            <div className="dropdown me-2">
              <button 
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center" 
                data-bs-toggle="dropdown"
              >
                {status}
              </button>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <button 
                    className="dropdown-item rounded-1" 
                    onClick={() => handleStatusSelect('Active')}
                  >
                    Active
                  </button>
                </li>
                <li>
                  <button 
                    className="dropdown-item rounded-1" 
                    onClick={() => handleStatusSelect('Inactive')}
                  >
                    Inactive
                  </button>
                </li>
              </ul>
            </div>
            
            <div className="dropdown me-2">
              <button 
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center" 
                data-bs-toggle="dropdown"
              >
                {sortBy}
              </button>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                {['Recently Added', 'Ascending', 'Desending', 'Last Month', 'Last 7 Days'].map((item) => (
                  <li key={item}>
                    <button 
                      className="dropdown-item rounded-1" 
                      onClick={() => handleSortBySelect(item)}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="dropdown">
              <button 
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center" 
                data-bs-toggle="dropdown"
              >
                <Download size={16} className="me-1" /> Export
              </button>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <button className="dropdown-item rounded-1">
                    <FileText size={16} className="me-1" /> Export as PDF
                  </button>
                </li>
                <li>
                  <button className="dropdown-item rounded-1">
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
              <form>
                <div className="d-flex align-items-center">
                  <input 
                    type="text" 
                    className="form-control flex-fill me-3" 
                    placeholder="Search Candidates" 
                  />
                  <a href="/employer/new-candidate" className="btn btn-secondary">
                    <Search size={16} className="me-1" /> Search
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
   
    <EmployerFooter/>
    </>
  );
};

export default EmployeerCandidatesSearch;