import React from 'react';
import company01 from '../../../../assets/employer-admin/assets/img/company/company-01.svg';

const UnitSchoolDetailModal = ({ show, onClose, schoolData }) => {

  if (!show) {
    return null;
  }

    return (
       <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
         <div className="modal-dialog modal-dialog-centered modal-lg">
           <div className="modal-content">
             <div className="modal-header">
               <h4 className="modal-title">School Detail</h4>
               <button 
                 type="button" 
                 className="btn-close custom-btn-close" 
                 onClick={onClose}
                 aria-label="Close"
               >
                 <i className="ti ti-x"></i>
               </button>
             </div>
             <div className="modal-body">
               <div className="p-3">
                 <div className="d-flex justify-content-between align-items-center rounded bg-light p-3">
                   <div className="file-name-icon d-flex align-items-center">
                     <a href="#" className="avatar avatar-md border rounded-circle flex-shrink-0 me-2">
                         <img src={company01} className="img-fluid"  alt="img" />
                     </a>
                     <div>
                       <p className="text-gray-9 fw-medium mb-0">BrightWave Innovations</p>
                       <p>
                         <a href="mailto:email@school.com" className="__cf_email__">
                           email@school.com
                         </a>
                       </p>
                     </div>
                   </div>
                   <span className="badge badge-success">
                     <i className="ti ti-point-filled"></i>Active
                   </span>
                 </div>
               </div>
               
               <div className="p-3">
                 <p className="text-gray-9 fw-medium">Basic Info</p>
                 <div className="pb-1 border-bottom mb-4">
                   <div className="row align-items-center">
                     <div className="col-md-4">
                       <div className="mb-3">
                         <p className="fs-12 mb-0">Account URL</p>
                         <p className="text-gray-9">bwi.example.com</p>
                       </div>
                     </div>
                     <div className="col-md-4">
                       <div className="mb-3">
                         <p className="fs-12 mb-0">Phone Number</p>
                         <p className="text-gray-9">(163) 2459 315</p>
                       </div>
                     </div>
                     <div className="col-md-4">
                       <div className="mb-3">
                         <p className="fs-12 mb-0">Website</p>
                         <p className="text-gray-9">www.exmple.com</p>
                       </div>
                     </div>
                   </div>
                   
                   <div className="row align-items-center">
                     <div className="col-md-4">
                       <div className="mb-3">
                         <p className="fs-12 mb-0">Currency</p>
                         <p className="text-gray-9">United Stated Dollar (USD)</p>
                       </div>
                     </div>
                     <div className="col-md-4">
                       <div className="mb-3">
                         <p className="fs-12 mb-0">Language</p>
                         <p className="text-gray-9">English</p>
                       </div>
                     </div>
                     <div className="col-md-4">
                       <div className="mb-3">
                         <p className="fs-12 mb-0">Address</p>
                         <p className="text-gray-9">3705 Lynn Avenue, Phelps, WI 54554</p>
                       </div>
                     </div>
                   </div>
                 </div>
                 
                 <p className="text-gray-9 fw-medium">Plan Details</p>
                 <div>
                   <div className="row align-items-center">
                     <div className="col-md-4">
                       <div className="mb-3">
                         <p className="fs-12 mb-0">Plan Name</p>
                         <p className="text-gray-9">Advanced</p>
                       </div>
                     </div>
                     <div className="col-md-4">
                       <div className="mb-3">
                         <p className="fs-12 mb-0">Plan Type</p>
                         <p className="text-gray-9">Monthly</p>
                       </div>
                     </div>
                     <div className="col-md-4">
                       <div className="mb-3">
                         <p className="fs-12 mb-0">Price</p>
                         <p className="text-gray-9">$200</p>
                       </div>
                     </div>
                   </div>
                   
                   <div className="row align-items-center">
                     <div className="col-md-4">
                       <div className="mb-3">
                         <p className="fs-12 mb-0">Register Date</p>
                         <p className="text-gray-9">12 Sep 2024</p>
                       </div>
                     </div>
                     <div className="col-md-4">
                       <div className="mb-3">
                         <p className="fs-12 mb-0">Expiring On</p>
                         <p className="text-gray-9">11 Oct 2024</p>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     );
};

export default UnitSchoolDetailModal;