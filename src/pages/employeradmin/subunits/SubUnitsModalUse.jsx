import React, { useState } from 'react';
import { X, Calendar, Check, Trash2 } from 'lucide-react';

// Upgrade Package Modal
export const UpgradeInfoModal = ({ onClose }) => {
  return (
    <div className="modal fade show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Upgrade Package</h4>
            <button type="button" className="btn-close custom-btn-close" onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
          </div>
          <div className="p-3 mb-1">
            <div className="rounded bg-light p-3">                                                
              <h5 className="mb-3">Current Plan Details</h5>                                              
              <div className="row align-items-center">
                <div className="col-md-4">
                  <div className="mb-3">
                    <p className="fs-12 mb-0">Unit Name</p>
                    <p className="text-gray-9">School Unit Name</p>
                  </div>
                </div>
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
              </div>
              <div className="row align-items-center">
                <div className="col-md-4">
                  <div className="mb-3">
                    <p className="fs-12 mb-0">Price</p>
                    <p className="text-gray-9">200</p>
                  </div>
                </div>
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
          
          <form action="units.php">
            <div className="modal-body pb-0">
              <h5 className="mb-4">Change Plan</h5>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Plan Name <span className="text-danger">*</span></label>
                    <select className="form-select">
                      <option>Select</option>
                      <option>Advanced</option>
                      <option>Basic</option>
                      <option>Enterprise</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Plan Type <span className="text-danger">*</span></label>
                    <select className="form-select">
                      <option>Select</option>
                      <option>Monthly</option>
                      <option>Yearly</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Amount<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" />
                  </div>									
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Payment Date <span className="text-danger">*</span></label>
                    <div className="input-icon-end position-relative">
                      <input type="text" className="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                      <span className="input-icon-addon">
                        <Calendar className="text-gray-7" size={18} />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Next Payment Date <span className="text-danger">*</span></label>
                    <div className="input-icon-end position-relative">
                      <input type="text" className="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                      <span className="input-icon-addon">
                        <Calendar className="text-gray-7" size={18} />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Expiring On <span className="text-danger">*</span></label>
                    <div className="input-icon-end position-relative">
                      <input type="text" className="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                      <span className="input-icon-addon">
                        <Calendar className="text-gray-7" size={18} />
                      </span>
                    </div>
                  </div>
                </div> 
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Unit Detail Modal
export const UnitDetailModal = ({ onClose }) => {
  return (
    <div className="modal fade show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Unit Detail</h4>
            <button type="button" className="btn-close custom-btn-close" onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
          </div>
          <div className="moday-body">
            <div className="p-3">
              <div className="d-flex justify-content-between align-items-center rounded bg-light p-3">                                                
                <div className="file-name-icon d-flex align-items-center">
                  <a href="#" className="avatar avatar-md border rounded-circle flex-shrink-0 me-2">
                    <img src="assets/img/company/company-01.svg" className="img-fluid" alt="img" />
                  </a> 
                  <div>
                    <p className="text-gray-9 fw-medium mb-0">School Unit Name</p>
                    <p><a href="mailto:email@school.com" className="__cf_email__">email@school.com</a></p>
                  </div>
                </div>                                        
                <span className="badge badge-success"><i className="ti ti-point-filled"></i>Active</span>
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
                      <p className="fs-12 mb-0">Addresss</p>
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

// Success Modal
export const SuccessCompanyModal = ({ onClose }) => {
  return (
    <div className="modal fade show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">
          <div className="modal-body pb-0">
            <div className="p-4">
              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex flex-column align-items-center justify-content-center mb-3">
                    <Check className="text-success mb-3" size={48} strokeWidth={2} />
                    <h5>Unit Added Successfully</h5>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <a href="units-grid.php" className="btn btn-dark d-flex justify-content-center">Back to List</a>
                  </div>								
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <a href="school-details.php" className="btn btn-primary bg-primary-gradient d-flex justify-content-center">Detail Page</a>		
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

// Delete Confirmation Modal
export const DeleteModal = ({ onClose, onConfirm }) => {
  return (
    <div className="modal fade show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content">
          <div className="modal-body text-center">
            <span className="avatar avatar-xl bg-transparent-danger text-danger mb-3">
              <Trash2 className="text-danger-x" size={36} />
            </span>
            <h4 className="mb-1">Confirm Deletion</h4>
            <p className="mb-3">You want to delete all the marked items, this cant be undone once you delete.</p>
            <div className="d-flex justify-content-center">
              <button className="btn btn-light me-3" onClick={onClose}>Cancel</button>
              <button className="btn btn-danger" onClick={onConfirm}>Yes, Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const SubUnitsModalUse = () => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-3">
          <button className="btn btn-primary" onClick={() => setShowUpgradeModal(true)}>
            Show Upgrade Modal
          </button>
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary" onClick={() => setShowDetailModal(true)}>
            Show Detail Modal
          </button>
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary" onClick={() => setShowSuccessModal(true)}>
            Show Success Modal
          </button>
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary" onClick={() => setShowDeleteModal(true)}>
            Show Delete Modal
          </button>
        </div>
      </div>

      {showUpgradeModal && (
        <UpgradeInfoModal onClose={() => setShowUpgradeModal(false)} />
      )}
      
      {showDetailModal && (
        <UnitDetailModal onClose={() => setShowDetailModal(false)} />
      )}
      
      {showSuccessModal && (
        <SuccessCompanyModal onClose={() => setShowSuccessModal(false)} />
      )}
      
      {showDeleteModal && (
        <DeleteModal 
          onClose={() => setShowDeleteModal(false)} 
          onConfirm={() => {
            // Handle delete logic here
            setShowDeleteModal(false);
          }}
        />
      )}
    </div>
  );
};

export default SubUnitsModalUse;