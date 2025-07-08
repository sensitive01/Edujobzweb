import React, { useState } from 'react';
import EmployerAdminFooter from '../Layout/EmployerAdminFooter';
import EmployerAdminHeader from '../Layout/EmployerAdminHeader';

const EmployeerAdminPlansGrid = () => {
  const [isPremium, setIsPremium] = useState(false);

  const togglePlanType = () => {
    setIsPremium(!isPremium);
  };

  const plans = [
    {
      id: 1,
      name: "FREE",
      price: "₹0",
      features: [
        { text: "10 Profile View or Download", included: true },
        { text: "50 Resume Request Feature", included: true },
        { text: "Verified Candidate Access", included: true },
        { text: "50 Job post", included: true },
        { text: "14 Days Plan Validity", included: false },
        { text: "DRM (Dedicated Resource Manager)", included: false },
        { text: "Interview Online or Campus", included: false },
        { text: "Customer Care & Support", included: false }
      ]
    },
    {
      id: 2,
      name: "Basic",
      price: "₹3999",
      features: [
        { text: "10 Profile View or Download", included: true },
        { text: "50 Resume Request Feature", included: true },
        { text: "Verified Candidate Access", included: true },
        { text: "50 Job post", included: true },
        { text: "14 Days Plan Validity", included: false },
        { text: "DRM (Dedicated Resource Manager)", included: false },
        { text: "Interview Online or Campus", included: false },
        { text: "Customer Care & Support", included: false }
      ]
    },
    {
      id: 3,
      name: "Standard",
      price: "₹6999",
      features: [
        { text: "10 Profile View or Download", included: true },
        { text: "50 Resume Request Feature", included: true },
        { text: "Verified Candidate Access", included: true },
        { text: "50 Job post", included: true },
        { text: "14 Days Plan Validity", included: false },
        { text: "DRM (Dedicated Resource Manager)", included: false },
        { text: "Interview Online or Campus", included: false },
        { text: "Customer Care & Support", included: false }
      ]
    },
    {
      id: 4,
      name: "Premium",
      price: "₹9999",
      features: [
        { text: "10 Profile View or Download", included: true },
        { text: "50 Resume Request Feature", included: true },
        { text: "Verified Candidate Access", included: true },
        { text: "50 Job post", included: true },
        { text: "14 Days Plan Validity", included: false },
        { text: "DRM (Dedicated Resource Manager)", included: false },
        { text: "Interview Online or Campus", included: false },
        { text: "Customer Care & Support", included: false }
      ]
    }
  ];

  return (
    <>
        <EmployerAdminHeader/>
    <div className="content">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-center align-items-center mb-4">
            <p className="mb-0 me-2">Premium Plans</p>
            <div className="form-check form-switch">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="flexSwitchCheckDefault"
                checked={isPremium}
                onChange={togglePlanType}
              />
            </div>
            <p>Crown Plans</p>
          </div>
          <div className="row justify-content-center">
            {plans.map(plan => (
              <div className="col-lg-3 col-md-6 col-sm-12 d-flex" key={plan.id}>
                <div className="card flex-fill">
                  <div className="card-body bg-light shadow">
                    <div className="card shadow">
                      <div className="card-body">
                        <h4>{plan.id}. {plan.name}</h4>
                        <h1 className="text-primary">{plan.price}<span className="fs-14 fw-normal text-gray">/monthly</span></h1>
                      </div>
                    </div>
                    <div className="pricing-content rounded bg-white border border-grey shadow mb-3">
                      <div className="price-hdr">
                        <h6 className="fs-14 fw-medium text-primary w-100">Features Includes</h6>
                      </div>
                      <div>
                        {plan.features.map((feature, index) => (
                          <span className="text-dark d-flex align-items-center mb-3" key={index}>
                            <i className={`ti ${feature.included ? 'ti-discount-check-filled text-success' : 'ti-circle-x-filled text-danger'} me-2`}></i>
                            {feature.text}
                          </span>
                        ))}
                      </div>
                    </div>
                    <a href="#" className="btn btn-secondary w-100">Choose Plan</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Plan Modal */}
      <AddPlanModal />
      
      {/* Edit Plan Modal */}
      <EditPlanModal />
    </div>
       <EmployerAdminFooter/>
    </>
  );
};

const AddPlanModal = () => {
  return (
    <div className="modal fade" id="add_plans">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Add New Plan</h4>
            <button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
              <i className="ti ti-x"></i>
            </button>
          </div>
          <form action="packages-grid.html">
            <div className="modal-body pb-0">
              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">                                                
                    <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                      <img src="assets/img/profiles/avatar-30.jpg" alt="img" className="rounded-circle" />
                    </div>                                              
                    <div className="profile-upload">
                      <div className="mb-2">
                        <h6 className="mb-1">Upload Profile Image</h6>
                        <p className="fs-12">Image should be below 4 mb</p>
                      </div>
                      <div className="profile-uploader d-flex align-items-center">
                        <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                          Upload
                          <input type="file" className="form-control image-sign" multiple="" />
                        </div>
                        <a href="javascript:void(0);" className="btn btn-light btn-sm">Cancel</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3 ">
                    <label className="form-label">Plan Name<span className="text-danger"> *</span></label>
                    <select className="select">
                      <option>Select</option>
                      <option>Advanced</option>
                      <option>Basic</option>
                      <option>Enterprise</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3 ">
                    <label className="form-label">Plan Type<span className="text-danger"> *</span></label>
                    <select className="select">
                      <option>Select</option>
                      <option>Monthly</option>
                      <option>Yearly</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3 ">
                    <label className="form-label">Plan Position<span className="text-danger"> *</span></label>
                    <select className="select">
                      <option>Select</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3 ">
                    <label className="form-label">Plan Currency<span className="text-danger"> *</span></label>
                    <select className="select">
                      <option>Select</option>
                      <option>USD</option>
                      <option>EURO</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <div className="d-flex justify-content-between">
                      <label className="form-label">Plan Currency <span className="text-danger"> *</span></label>
                      <span className="text-primary"><i className="fa-solid fa-circle-exclamation me-2"></i>Set 0 for free</span>
                    </div>
                    <select className="select">
                      <option>Select</option>
                      <option>Fixed</option>
                      <option>Percentage</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3 ">
                    <label className="form-label">Discount Type<span className="text-danger"> *</span></label>
                    <div className="pass-group">
                      <select className="select">
                        <option>Select</option>
                        <option>Fixed</option>
                        <option>Percentage</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3 ">
                    <label className="form-label">Discount<span className="text-danger"> *</span></label>
                    <div className="pass-group">
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="mb-3">
                    <label className="form-label">Limitations Invoices</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="mb-3">
                    <label className="form-label">Max Customers</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="mb-3">
                    <label className="form-label">Product</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="mb-3">
                    <label className="form-label">Supplier</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h6>Plan Modules</h6>
                    <div className="form-check form-check-md d-flex align-items-center">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Select All
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-3 col-sm-6">
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Employees
                      </label>
                    </div>										
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Invoices
                      </label>
                    </div>										
                  </div>
                  <div className="col-lg-3 col-sm-6">	
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Reports
                      </label>
                    </div>										
                  </div>
                  <div className="col-lg-3 col-sm-6">	
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Contacts
                      </label>
                    </div>									
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Clients
                      </label>
                    </div>								
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Estimates
                      </label>
                    </div>										
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Goals
                      </label>
                    </div>										
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Deals
                      </label>
                    </div>									
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Projects
                      </label>
                    </div>										
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Payments
                      </label>
                    </div>											
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Assets
                      </label>
                    </div>											
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Leads
                      </label>
                    </div>											
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Tickets
                      </label>
                    </div>											
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Taxes
                      </label>
                    </div>											
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Activities
                      </label>
                    </div>											
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Pipelines
                      </label>
                    </div>											
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 me-2 text-dark fw-medium">										
                        Access Trial
                      </label>
                      <div className="form-check form-check-md form-switch me-2">
                        <input className="form-check-input me-2" type="checkbox" role="switch" />
                      </div>
                    </div>									
                  </div>
                </div>
                <div className="row align-items-center gx-3">
                  <div className="col-md-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="flex-fill">
                        <label className="form-label">Trial Days</label>
                        <input type="text" className="form-control" />
                      </div>	
                    </div>								
                  </div>
                  <div className="col-md-3">
                    <div className="d-block align-items-center ms-3">
                      <label className="form-check-label mt-0 me-2 text-dark">										
                        Is Recommended
                      </label>
                      <div className="form-check form-check-md form-switch me-2">
                        <input className="form-check-input me-2" type="checkbox" role="switch" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="mb-3 ">
                      <label className="form-label">Status<span className="text-danger"> *</span></label>
                      <select className="select">
                        <option>Select</option>
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>								
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control"></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-light me-2" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" className="btn btn-primary">Add Plan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const EditPlanModal = () => {
  return (
    <div className="modal fade" id="edit_plans">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Edit Plan</h4>
            <button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
              <i className="ti ti-x"></i>
            </button>
          </div>
          <form action="packages-grid.html">
            <div className="modal-body pb-0">
              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">                                                
                    <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                      <img src="assets/img/profiles/avatar-30.jpg" alt="img" className="rounded-circle" />
                    </div>                                              
                    <div className="profile-upload">
                      <div className="mb-2">
                        <h6 className="mb-1">Upload Profile Image</h6>
                        <p className="fs-12">Image should be below 4 mb</p>
                      </div>
                      <div className="profile-uploader d-flex align-items-center">
                        <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                          Upload
                          <input type="file" className="form-control image-sign" multiple="" />
                        </div>
                        <a href="javascript:void(0);" className="btn btn-light btn-sm">Cancel</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3 ">
                    <label className="form-label">Plan Name<span className="text-danger"> *</span></label>
                    <select className="select">
                      <option>Select</option>
                      <option>Advanced</option>
                      <option>Basic</option>
                      <option>Enterprise</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3 ">
                    <label className="form-label">Plan Type<span className="text-danger"> *</span></label>
                    <select className="select">
                      <option>Select</option>
                      <option>Monthly</option>
                      <option>Yearly</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3 ">
                    <label className="form-label">Plan Position<span className="text-danger"> *</span></label>
                    <select className="select">
                      <option>Select</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3 ">
                    <label className="form-label">Plan Currency<span className="text-danger"> *</span></label>
                    <select className="select">
                      <option>Select</option>
                      <option>USD</option>
                      <option>EURO</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <div className="d-flex justify-content-between">
                      <label className="form-label">Plan Currency<span className="text-danger"> *</span></label>
                      <span className="text-primary"><i className="fa-solid fa-circle-exclamation me-2"></i>Set 0 for free</span>
                    </div>
                    <select className="select">
                      <option>Select</option>
                      <option>Fixed</option>
                      <option>Percentage</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3 ">
                    <label className="form-label">Discount Type<span className="text-danger"> *</span></label>
                    <div className="pass-group">
                      <select className="select">
                        <option>Select</option>
                        <option>Fixed</option>
                        <option>Percentage</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3 ">
                    <label className="form-label">Discount<span className="text-danger"> *</span></label>
                    <div className="pass-group">
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="mb-3">
                    <label className="form-label">Limitations Invoices</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="mb-3">
                    <label className="form-label">Max Customers</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="mb-3">
                    <label className="form-label">Product</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="mb-3">
                    <label className="form-label">Supplier</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h6>Plan Modules</h6>
                    <div className="form-check form-check-md d-flex align-items-center">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Select All
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-3 col-sm-6">
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Employees
                      </label>
                    </div>										
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Invoices
                      </label>
                    </div>										
                  </div>
                  <div className="col-lg-3 col-sm-6">	
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Reports
                      </label>
                    </div>										
                  </div>
                  <div className="col-lg-3 col-sm-6">	
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Contacts
                      </label>
                    </div>									
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Clients
                      </label>
                    </div>								
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Estimates
                      </label>
                    </div>										
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Goals
                      </label>
                    </div>										
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Deals
                      </label>
                    </div>									
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Projects
                      </label>
                    </div>										
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Payments
                      </label>
                    </div>											
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Assets
                      </label>
                    </div>											
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Leads
                      </label>
                    </div>											
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Tickets
                      </label>
                    </div>											
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Taxes
                      </label>
                    </div>											
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Activities
                      </label>
                    </div>											
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="form-check form-check-md d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 text-dark fw-medium">
                        <input className="form-check-input" type="checkbox" />
                        Pipelines
                      </label>
                    </div>											
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-3">
                      <label className="form-check-label mt-0 me-2 text-dark fw-medium">										
                        Access Trial
                      </label>
                      <div className="form-check form-check-md form-switch me-2">
                        <input className="form-check-input me-2" type="checkbox" role="switch" />
                      </div>
                    </div>									
                  </div>
                </div>
                <div className="row align-items-center gx-3">
                  <div className="col-md-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="flex-fill">
                        <label className="form-label">Trial Days</label>
                        <input type="text" className="form-control" />
                      </div>	
                    </div>								
                  </div>
                  <div className="col-md-3">
                    <div className="d-block align-items-center ms-3">
                      <label className="form-check-label mt-0 me-2 text-dark">										
                        Is Recommended
                      </label>
                      <div className="form-check form-check-md form-switch me-2">
                        <input className="form-check-input me-2" type="checkbox" role="switch" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="mb-3 ">
                      <label className="form-label">Status<span className="text-danger"> *</span></label>
                      <select className="select">
                        <option>Select</option>
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>								
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control"></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-light me-2" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeerAdminPlansGrid;