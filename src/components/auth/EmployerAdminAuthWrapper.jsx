import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { fetchEmployerAdminProfile } from "../../api/services/projectServices";

const EmployerAdminAuthWrapper = () => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({
    authenticated: false,
    profileCompleted: false,
    subscribed: false,
  });
  const location = useLocation();

  useEffect(() => {
    const checkAuthAndStatus = async () => {
      try {
        const token = localStorage.getItem("EmployerAdminToken");
        const adminData = JSON.parse(localStorage.getItem("EmployerAdminData"));

        if (!token || !adminData) {
          setLoading(false);
          return;
        }

        // Fetch latest profile to get real-time status
        const response = await fetchEmployerAdminProfile(adminData._id);
        const admin = response.admin;

        setStatus({
          authenticated: true,
          profileCompleted: admin.isProfileCompleted,
          subscribed: admin.isSubscribed,
        });

        // Update localStorage with latest data
        localStorage.setItem("EmployerAdminData", JSON.stringify(admin));
      } catch (error) {
        console.error("Auth wrapper error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndStatus();
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!status.authenticated) {
    return <Navigate to="/employer-admin/login" replace />;
  }

  const path = location.pathname;

  // Allow access to health check pages (profile and subscription) even if they aren't "complete"
  const isProfilePage = path === "/employer-admin/school-profile";
  const isSubscriptionPage = path === "/employer-admin/plan-and-subscription";

  if (!status.profileCompleted && !isProfilePage) {
    return <Navigate to="/employer-admin/school-profile" replace />;
  }

  if (
    status.profileCompleted &&
    !status.subscribed &&
    !isSubscriptionPage &&
    !isProfilePage
  ) {
    return <Navigate to="/employer-admin/plan-and-subscription" replace />;
  }

  return <Outlet />;
};

export default EmployerAdminAuthWrapper;
