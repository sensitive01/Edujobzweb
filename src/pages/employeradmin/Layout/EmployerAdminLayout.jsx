import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

// Employer-Admin specific styles - statically imported to ensure they are loaded for all admin routes
import "./../../../assets/employer-admin/assets/css/bootstrap.min.css";
import "./../../../assets/employer-admin/assets/plugins/tabler-icons/tabler-icons.css";
import "./../../../assets/employer-admin/assets/plugins/fontawesome/css/all.min.css";
import "./../../../assets/employer-admin/assets/plugins/fontawesome/css/fontawesome.min.css";
import "./../../../assets/employer-admin/assets/css/style.css";
import "./../../../assets/employer-admin/assets/plugins/select2/css/select2.min.css";
import "./../../../assets/employer-admin/assets/plugins/daterangepicker/daterangepicker.css";
import "./../../../assets/employer-admin/assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css";
import "./../../../assets/employer-admin/assets/css/bootstrap-datetimepicker.min.css";

const EmployerAdminLayout = () => {
  return (
    <Suspense fallback={null}>
      <Outlet />
    </Suspense>
  );
};

export default EmployerAdminLayout;
