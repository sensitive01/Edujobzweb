import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

// Admin specific styles - statically imported to ensure they are loaded for all admin routes
import "./../../../assets/admin/assets/css/bootstrap.min.css";
import "./../../../assets/admin/assets/plugins/tabler-icons/tabler-icons.css";
import "./../../../assets/admin/assets/plugins/fontawesome/css/all.min.css";
import "./../../../assets/admin/assets/plugins/fontawesome/css/fontawesome.min.css";
import "./../../../assets/admin/assets/css/style.css";
import "./../../../assets/admin/assets/plugins/select2/css/select2.min.css";
import "./../../../assets/admin/assets/plugins/daterangepicker/daterangepicker.css";
import "./../../../assets/admin/assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css";
import "./../../../assets/admin/assets/css/bootstrap-datetimepicker.min.css";

const AdminLayout = () => {
  return (
    <Suspense fallback={null}>
      <Outlet />
    </Suspense>
  );
};

export default AdminLayout;
