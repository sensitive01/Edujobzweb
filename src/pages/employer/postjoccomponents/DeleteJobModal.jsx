import React, { useState } from 'react';
import axios from 'axios';
import { deleteJob } from "../../../api/services/projectServices";
import { toast } from 'react-toastify';

const DeleteJobModal = ({ show, jobId, onClose, onJobDeleted }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    if (!show) return null;

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const token = localStorage.getItem("employerToken");
            await deleteJob(jobId);

            toast.success("Job deleted successfully");
            if (onJobDeleted) {
                onJobDeleted();
            }
            onClose();
        } catch (error) {
            console.error("Error deleting job:", error);
            toast.error(error.response?.data?.message || "Failed to delete job");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-sm">
                <div className="modal-content">
                    <div className="modal-body text-center">
                        <div className="mb-3">
                            <i className="ti ti-trash text-danger fs-36"></i>
                        </div>
                        <h4 className="mb-1">Confirm Deletion</h4>
                        <p className="mb-3">Are you sure you want to delete this job? This action cannot be undone.</p>
                        <div className="d-flex justify-content-center">
                            <button
                                className="btn btn-light me-3"
                                onClick={onClose}
                                disabled={isDeleting}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={handleDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteJobModal;
