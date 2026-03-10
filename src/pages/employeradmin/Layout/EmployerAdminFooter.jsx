import React from "react";

function EmployerAdminFooter() {
  return (
    <>
      <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
        <p className="mb-0">Copyright 2025 &copy; EdProfio.</p>
        <p>
          Designed &amp; Developed By{" "}
          <a
            href="https://sensitive.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            Sensitive Technologies
          </a>
        </p>
      </div>
      <a
        href="#"
        id="resetbutton"
        hidden
        className="btn btn-light close-theme w-100"
      >
        <i className="ti ti-restore me-1"></i>Reset
      </a>
    </>
  );
}

export default EmployerAdminFooter;
