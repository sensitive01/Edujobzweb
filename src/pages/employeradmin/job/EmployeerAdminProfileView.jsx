import React, { useEffect, useState } from "react";
import EmployerAdminHeader from "../Layout/EmployerAdminHeader";
import EmployerAdminFooter from "../Layout/EmployerAdminFooter";
import {
  fetchEmployerAdminProfile,
  updateEmployerAdmin,
} from "../../../api/services/projectServices";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeerAdminProfileView = () => {
  const [profileData, setProfileData] = useState({
    employeradminUsername: "",
    employeradminEmail: "",
    employeradminMobile: "",
    employeradminProfilePic: "",
    address: "",
    state: "",
    city: "",
    taluk: "",
    pincode: "",
    landmark: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const adminData = JSON.parse(localStorage.getItem("EmployerAdminData"));
        if (!adminData || !adminData._id) {
          throw new Error("Admin data not found");
        }

        const response = await fetchEmployerAdminProfile(adminData._id);
        setProfileData((prev) => ({
          ...prev,
          ...response.admin,
        }));

        if (!response.admin.isProfileCompleted) {
          setShowWelcomeModal(true);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        if (err.response?.status === 401) {
          navigate("/employer-admin/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const adminData = JSON.parse(localStorage.getItem("EmployerAdminData"));
      const response = await updateEmployerAdmin(adminData._id, profileData);

      toast.success("Profile updated successfully!");

      // Update local storage
      localStorage.setItem("EmployerAdminData", JSON.stringify(response.data));

      // If profile is now completed, refresh or redirect to plans
      if (response.data.isProfileCompleted) {
        setTimeout(() => {
          navigate("/employer-admin/plan-and-subscription");
        }, 1500);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <EmployerAdminHeader />
        <div className="content">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "80vh" }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <EmployerAdminFooter />
      </>
    );
  }

  // Render the component
  return (
    <>
      <ToastContainer />
      <EmployerAdminHeader />
      <div className="content">
        <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
          <div className="my-auto mb-2">
            <h2 className="mb-1">Settings</h2>
          </div>
        </div>

        <ul className="nav nav-tabs nav-tabs-solid bg-transparent border-bottom mb-3">
          <li className="nav-item">
            <a
              className="nav-link active"
              href="/employer-admin/school-profile"
            >
              <i className="ti ti-settings me-2"></i>Profile Details
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/employer-admin/school-details">
              <i className="ti ti-world-cog me-2"></i>School Information
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="plan-and-subscription">
              <i className="ti ti-device-ipad-horizontal-cog me-2"></i>Plan &
              Subscription
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="hired-candidates">
              <i className="ti ti-server-cog me-2"></i>Hired Candidates
            </a>
          </li>
        </ul>

        <div className="row">
          <div className="col-xl-3 theiaStickySidebar">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column list-group settings-list">
                  <a
                    href="/employer-admin/school-profile"
                    className="d-inline-flex align-items-center rounded active py-2 px-3"
                  >
                    <i className="ti ti-arrow-badge-right me-2"></i> Profile
                    Settings
                  </a>
                  <a
                    href="/employer-admin/security-settings"
                    className="d-inline-flex align-items-center rounded py-2 px-3"
                  >
                    Security Settings
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9">
            <div className="card">
              <div className="card-body">
                <div className="border-bottom mb-3 pb-3">
                  <h4>
                    <i className="ti ti-user me-2 text-primary"></i> Profile
                    Information
                  </h4>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="border-bottom mb-3">
                    <h6 className="mb-3 text-primary">Basic Information</h6>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-4">
                            <label className="form-label mb-md-0">
                              Username
                            </label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="text"
                              name="employeradminUsername"
                              className="form-control"
                              value={profileData.employeradminUsername}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-4">
                            <label className="form-label mb-md-0">Email</label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="email"
                              name="employeradminEmail"
                              className="form-control"
                              value={profileData.employeradminEmail}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-4">
                            <label className="form-label mb-md-0">Phone</label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="text"
                              name="employeradminMobile"
                              className="form-control"
                              value={profileData.employeradminMobile}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-bottom mb-3">
                    <h6 className="mb-3 text-primary">Address Information</h6>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-2">
                            <label className="form-label mb-md-0">
                              Address
                            </label>
                          </div>
                          <div className="col-md-10">
                            <input
                              type="text"
                              name="address"
                              className="form-control"
                              placeholder="Enter Full Address"
                              value={profileData.address || ""}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-4">
                            <label className="form-label mb-md-0">State</label>
                          </div>
                          <div className="col-md-8">
                            <select
                              name="state"
                              className="form-control"
                              value={profileData.state || ""}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Select State</option>
                              <option value="Karnataka">Karnataka</option>
                              <option value="Maharashtra">Maharashtra</option>
                              {/* Add more states as needed */}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-4">
                            <label className="form-label mb-md-0">City</label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="text"
                              name="city"
                              className="form-control"
                              placeholder="Enter City"
                              value={profileData.city || ""}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-4">
                            <label className="form-label mb-md-0">Taluk</label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="text"
                              name="taluk"
                              className="form-control"
                              placeholder="Enter Taluk"
                              value={profileData.taluk || ""}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-4">
                            <label className="form-label mb-md-0">
                              Pincode
                            </label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="text"
                              name="pincode"
                              className="form-control"
                              placeholder="6 Digit Pincode"
                              value={profileData.pincode || ""}
                              onChange={handleChange}
                              required
                              maxLength="6"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-2">
                            <label className="form-label mb-md-0">
                              Landmark
                            </label>
                          </div>
                          <div className="col-md-10">
                            <input
                              type="text"
                              name="landmark"
                              className="form-control"
                              placeholder="Enter Landmark"
                              value={profileData.landmark || ""}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-end mt-3">
                    <button
                      type="button"
                      className="btn btn-outline-light border me-3"
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Saving...
                        </>
                      ) : (
                        "Complete Profile & Continue"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EmployerAdminFooter />

      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-primary text-white border-0">
                <h5 className="modal-title">
                  <i className="ti ti-user-check me-2"></i> Account Activation
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowWelcomeModal(false)}
                ></button>
              </div>
              <div className="modal-body p-4 text-center">
                <div
                  className="mb-3 d-inline-flex align-items-center justify-content-center bg-primary-transparent rounded-circle"
                  style={{ width: "80px", height: "80px" }}
                >
                  <i className="ti ti-info-circle fs-1 text-primary"></i>
                </div>
                <h4>Complete Your Profile</h4>
                <p className="text-muted">
                  Welcome to EdProfio! To unlock your dashboard and start
                  managing your school, please fill in your <b>Address</b> and{" "}
                  <b>Contact</b> details first.
                </p>
                <div className="alert alert-warning border-0 mb-0">
                  <i className="ti ti-alert-circle me-2"></i>
                  Note: You'll also need to select a subscription plan in the
                  next step.
                </div>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button
                  type="button"
                  className="btn btn-primary w-100 py-2 fw-semibold"
                  onClick={() => setShowWelcomeModal(false)}
                >
                  Got it, let's start!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeerAdminProfileView;
