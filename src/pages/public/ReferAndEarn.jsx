import React, { useState, useEffect } from "react";
import {
  FaCog,
  FaCopy,
  FaCheck,
  FaUserFriends,
  FaGift,
  FaTrophy,
} from "react-icons/fa";
import { getEmployeeDetails } from "../../api/services/projectServices";
import Sidebar from "../../components/layout/Sidebar";
import { useNavigate } from "react-router-dom";

const ReferAndEarn = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const userDataString = localStorage.getItem("userData");
        const token = localStorage.getItem("authToken");

        if (!userDataString || !token) {
          setLoading(false);
          return;
        }

        const userData = JSON.parse(userDataString);
        const userId = userData._id;

        const data = await getEmployeeDetails(userId, token);
        setEmployeeData(data);
      } catch (error) {
        console.error("Failed to fetch employee details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  const getReferralLink = () => {
    if (!employeeData?.referralCode) return "";
    return `${window.location.origin}/employee-registration?ref=${employeeData.referralCode}`;
  };

  const handleCopy = () => {
    const link = getReferralLink();
    if (link) {
      navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="subvisual-block subvisual-theme-1 bg-secondary d-flex align-items-center text-white"
        style={{
          minHeight: "240px",
          paddingTop: "160px",
          paddingBottom: "40px",
        }}
      >
        <div className="container position-relative text-center">
          <div className="row">
            <div className="col-12">
              <div className="subvisual-textbox">
                {/* Reduced font size */}
                <h2
                  className="text-white mb-2"
                  style={{ fontSize: "2.5rem", fontWeight: "700" }}
                >
                  Refer & Earn
                </h2>
                <p className="text-white-50 mb-0" style={{ fontSize: "1rem" }}>
                  Invite friends, earn rewards!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="jobplugin__main">
        <div className="jobplugin__main-holder mt-4">
          <div className="jobplugin__container">
            <div className="jobplugin__settings">
              <a
                href="#"
                className="jobplugin__settings-opener jobplugin__text-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                onClick={(e) => {
                  e.preventDefault();
                  toggleSidebar();
                }}
              >
                <FaCog className="rj-icon rj-settings" />
              </a>
              <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

              <div className="jobplugin__settings-content">
                <div className="row mb-3">
                  <div className="col-md-4 mb-2 mb-md-0">
                    <div className="card border-0 shadow-sm h-100 bg-white">
                      <div className="card-body d-flex align-items-center p-3">
                        <div
                          className="rounded-circle bg-primary bg-opacity-10 mr-3 d-flex justify-content-center align-items-center"
                          style={{
                            background: "rgba(13, 110, 253, 0.1)",
                            width: "40px",
                            height: "40px",
                          }}
                        >
                          <FaUserFriends className="text-primary" />
                        </div>
                        <div>
                          <h6
                            className="text-muted mb-0"
                            style={{
                              fontSize: "0.75rem",
                              textTransform: "uppercase",
                            }}
                          >
                            Total Referrals
                          </h6>
                          <h4 className="mb-0 font-weight-bold text-dark">
                            {employeeData?.referralCount || 0}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-2 mb-md-0">
                    <div className="card border-0 shadow-sm h-100 bg-white">
                      <div className="card-body d-flex align-items-center p-3">
                        <div
                          className="rounded-circle bg-success bg-opacity-10 mr-3 d-flex justify-content-center align-items-center"
                          style={{
                            background: "rgba(25, 135, 84, 0.1)",
                            width: "40px",
                            height: "40px",
                          }}
                        >
                          <FaGift className="text-success" />
                        </div>
                        <div>
                          <h6
                            className="text-muted mb-0"
                            style={{
                              fontSize: "0.75rem",
                              textTransform: "uppercase",
                            }}
                          >
                            Rewards Earned
                          </h6>
                          <h4 className="mb-0 font-weight-bold text-dark">
                            {employeeData?.referralRewards || 0}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100 bg-white">
                      <div className="card-body d-flex align-items-center p-3">
                        <div
                          className="rounded-circle bg-warning bg-opacity-10 mr-3 d-flex justify-content-center align-items-center"
                          style={{
                            background: "rgba(255, 193, 7, 0.1)",
                            width: "40px",
                            height: "40px",
                          }}
                        >
                          <FaTrophy className="text-warning" />
                        </div>
                        <div>
                          <h6
                            className="text-muted mb-0"
                            style={{
                              fontSize: "0.75rem",
                              textTransform: "uppercase",
                            }}
                          >
                            Status
                          </h6>
                          <h4 className="mb-0 font-weight-bold text-dark">
                            Active
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12 mb-3">
                    <div className="card border-0 shadow-sm bg-white">
                      <div className="card-body p-3">
                        <div className="row align-items-center">
                          <div className="col-md-8">
                            <h5 className="mb-1">Invite Friends & Earn</h5>
                            <p
                              className="text-muted mb-3"
                              style={{ fontSize: "0.9rem" }}
                            >
                              Share the link below. You both get rewarded!
                            </p>

                            <div className="form-group mb-0">
                              <label className="text-muted small font-weight-bold mb-1">
                                Your Unique Referral Link
                              </label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={getReferralLink()}
                                  readOnly
                                  style={{
                                    backgroundColor: "#f8f9fa",
                                    borderColor: "#dee2e6",
                                    height: "38px",
                                    fontSize: "0.9rem",
                                  }}
                                />
                                <div className="input-group-append">
                                  <button
                                    className={`btn ${copied ? "btn-success" : "btn-primary"} btn-sm`}
                                    type="button"
                                    onClick={handleCopy}
                                    style={{
                                      minWidth: "100px",
                                      height: "38px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    {copied ? (
                                      <FaCheck className="mr-1" />
                                    ) : (
                                      <FaCopy className="mr-1" />
                                    )}
                                    {copied ? "Copied" : "Copy"}
                                  </button>
                                </div>
                              </div>
                            </div>

                            {employeeData?.referralCode && (
                              <div className="mt-2">
                                <small className="text-muted">
                                  Code:{" "}
                                  <span className="font-weight-bold text-dark">
                                    {employeeData.referralCode}
                                  </span>
                                </small>
                              </div>
                            )}
                          </div>
                          <div className="col-md-4 text-center d-none d-md-block">
                            <img
                              src="images/visual-pattern.png"
                              alt="Invite"
                              className=""
                              style={{ maxWidth: "80px", opacity: 0.6 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="card border-0 shadow-sm bg-white">
                      <div className="card-header bg-white border-bottom-0 py-3 px-3 d-flex justify-content-between align-items-center">
                        <h6 className="mb-0">Referred Users</h6>
                        <span className="badge badge-light text-muted border px-2 py-1 rounded">
                          {employeeData?.referralsList?.length || 0} Total
                        </span>
                      </div>
                      <div className="card-body p-0">
                        <div className="table-responsive">
                          {employeeData?.referralsList &&
                          employeeData.referralsList.length > 0 ? (
                            <table
                              className="table table-hover align-middle mb-0"
                              style={{ fontSize: "0.9rem" }}
                            >
                              <thead className="bg-light">
                                <tr>
                                  <th
                                    className="border-0 px-3 py-2 text-muted font-weight-normal"
                                    scope="col"
                                  >
                                    User
                                  </th>
                                  <th
                                    className="border-0 px-3 py-2 text-muted font-weight-normal"
                                    scope="col"
                                  >
                                    Date
                                  </th>
                                  <th
                                    className="border-0 px-3 py-2 text-muted font-weight-normal"
                                    scope="col"
                                  >
                                    Reward
                                  </th>
                                  <th
                                    className="border-0 px-3 py-2 text-muted font-weight-normal text-right"
                                    scope="col"
                                  >
                                    Status
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {employeeData.referralsList.map(
                                  (referral, index) => (
                                    <tr key={index}>
                                      <td className="px-3 py-2 text-muted">
                                        {index + 1}
                                      </td>
                                      <td className="px-3 py-2">
                                        <div className="d-flex align-items-center">
                                          <img
                                            src={
                                              referral.referredUserProfilePic ||
                                              "images/img-avatar.png"
                                            }
                                            alt=""
                                            className="rounded-circle mr-2"
                                            width="30"
                                            height="30"
                                            onError={(e) => {
                                              e.target.onerror = null;
                                              e.target.src =
                                                "images/img-avatar.png";
                                            }}
                                            style={{ objectFit: "cover" }}
                                          />
                                          <div>
                                            <div className="font-weight-bold text-dark">
                                              {referral.referredUserName ||
                                                "Unknown"}
                                            </div>
                                            <small
                                              className="text-muted d-block"
                                              style={{
                                                lineHeight: "1",
                                                fontSize: "0.75rem",
                                              }}
                                            >
                                              {referral.referredUserEmail}
                                            </small>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="px-3 py-2 text-muted">
                                        {new Date(referral.referredDate)
                                          .toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "2-digit",
                                          })
                                          .replace(/\//g, "-")}
                                      </td>
                                      <td className="px-3 py-2">
                                        <span className="text-success font-weight-bold">
                                          +{referral.rewardEarned || 0}
                                        </span>
                                      </td>
                                      <td className="px-3 py-2 text-right">
                                        <span
                                          className="badge px-2 py-1 rounded font-weight-normal"
                                          style={{
                                            backgroundColor: "#198754",
                                            color: "#fff",
                                          }}
                                        >
                                          Successful
                                        </span>
                                      </td>
                                    </tr>
                                  ),
                                )}
                              </tbody>
                            </table>
                          ) : (
                            <div className="text-center py-4">
                              <div
                                className="mb-2 text-muted"
                                style={{ opacity: 0.3 }}
                              >
                                <FaUserFriends size={30} />
                              </div>
                              <p className="small text-muted mb-0">
                                No referrals yet.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ReferAndEarn;
