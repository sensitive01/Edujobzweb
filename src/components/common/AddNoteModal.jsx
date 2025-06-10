import React, { useState } from 'react';

const AddNoteModal = ({ show, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    assignee: 'Choose',
    status: 'Select',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Add Notes</h4>
            <button 
              type="button" 
              className="btn-close custom-btn-close" 
              onClick={onClose}
              aria-label="Close"
            >
              <i className="ti ti-x"></i>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Note Title</label>
                    <input 
                      type="text" 
                      className="form-control"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Assignee</label>
                    <select 
                      className="form-select"
                      name="assignee"
                      value={formData.assignee}
                      onChange={handleChange}
                      required
                    >
                      <option value="Choose">Choose</option>
                      <option value="Kathleen">Kathleen</option>
                      <option value="Gifford">Gifford</option>
                    </select>
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select 
                      className="form-select"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      required
                    >
                      <option value="Select">Select</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="mb-0 summer-description-box notes-summernote">
                    <label className="form-label">Descriptions</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      maxLength="60"
                      required
                    />
                    <small>Maximum 60 Characters</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-light me-2" 
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNoteModal;