import React from 'react';

const AddPositionsModal = ({ show, onClose, onAddAccess }) => {
    if (!show) return null;

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Add New Positions</h4>
                        <button
                            type="button"
                            className="btn-close custom-btn-close"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            <i className="ti ti-x"></i>
                        </button>
                    </div>
                    <form>
                        <div className="modal-body pb-0">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label">Position Name <span className="text-danger"> *</span></label>
                                        <select className="form-select">
                                            <option>Select</option>
                                            <option>PGT Teacher</option>
                                            <option>Maintenance</option>
                                            <option>Admin Staff</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <label className="form-label">Access <span className="text-danger"> *</span></label>
                                            <button
                                                type="button"
                                                className="add-new text-primary"
                                                onClick={onAddAccess}
                                            >
                                                <i className="ti ti-plus text-primary me-1"></i>Add New
                                            </button>
                                        </div>
                                        <select className="form-select">
                                            <option>Select</option>
                                            <option>Recruitment</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Status <span className="text-danger"> *</span></label>
                                        <select className="form-select">
                                            <option>Select</option>
                                            <option>Open</option>
                                            <option>Won</option>
                                            <option>Lost</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Position Value  <span className="text-danger"> *</span></label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Currency<span className="text-danger"> *</span></label>
                                        <select className="form-select">
                                            <option>Select</option>
                                            <option>Dollar</option>
                                            <option>Euro</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Period <span className="text-danger"> *</span></label>
                                        <select className="form-select">
                                            <option>Select</option>
                                            <option>Days</option>
                                            <option>Months</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Period Value  <span className="text-danger"> *</span></label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label">Job Reporting to<span className="text-danger"> *</span></label>
                                        <input className="form-control" placeholder="Add new" type="text" name="Label" defaultValue="Vaughan Lewis" />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label">Skills<span className="text-danger"> *</span></label>
                                        <input className="form-control" placeholder="Add new" type="text" name="Label" defaultValue="Office Management App,Clinic Management,Educational Platform" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Due Date <span className="text-danger"> *</span> </label>
                                        <div className="input-icon-end position-relative">
                                            <input type="text" className="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                                            <span className="input-icon-addon">
                                                <i className="ti ti-calendar text-gray-7"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Expected Closing  Date <span className="text-danger"> *</span> </label>
                                        <div className="input-icon-end position-relative">
                                            <input type="text" className="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                                            <span className="input-icon-addon">
                                                <i className="ti ti-calendar text-gray-7"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label">Assignee <span className="text-danger"> *</span></label>
                                        <input className="form-control" placeholder="Add new" type="text" name="Label" defaultValue="Vaughan Lewis" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Tags  <span className="text-danger"> *</span></label>
                                        <input className="form-control" placeholder="Add new" type="text" name="Label" defaultValue="Collab" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Followup Date   <span className="text-danger"> *</span></label>
                                        <div className="input-icon-end position-relative">
                                            <input type="text" className="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                                            <span className="input-icon-addon">
                                                <i className="ti ti-calendar text-gray-7"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Source  <span className="text-danger"> *</span></label>
                                        <select className="form-select">
                                            <option>Select</option>
                                            <option>Phone Calls</option>
                                            <option>Social Media</option>
                                            <option>Refferal Sites</option>
                                            <option>Web Analytics</option>
                                            <option>Previous Purchase</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Priority   <span className="text-danger"> *</span></label>
                                        <select className="form-select">
                                            <option>Select</option>
                                            <option>High</option>
                                            <option>Low</option>
                                            <option>Medium</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label">Description    <span className="text-danger"> *</span></label>
                                        <textarea className="form-control"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Add Position</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPositionsModal;