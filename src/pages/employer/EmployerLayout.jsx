import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './EmployerLayout.css';

const EmployerLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Add employer-specific class to body
    document.body.classList.add('employer-route');

    // Function to load CSS
    const loadCSS = (path) => {
      return new Promise((resolve) => {
        // Check if this CSS is already loaded
        const existingLink = document.querySelector(`link[href="${path}"]`);
        if (existingLink) {
          return resolve();
        }

        const link = document.createElement('link');
        link.href = path;
        link.rel = 'stylesheet';
        link.className = 'employer-style';
        link.onload = resolve;
        link.onerror = (e) => {
          console.warn(`Failed to load CSS: ${path}`, e);
          resolve(); // Resolve even if there's an error
        };
        document.head.appendChild(link);
      });
    };

    // Function to inject critical styles
    const injectCriticalStyles = () => {
      const styleId = 'employer-critical-styles';
      // Remove any existing style with the same ID to avoid duplicates
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }

      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .employer-route .header,
        .employer-route .navbar,
        .employer-route .top-header {
          background-color: #063970 !important;
          background-image: none !important;
        }
      `;
      document.head.appendChild(style);
    };

    // Load all CSS files
    const loadAllCSS = async () => {
      try {
        // First inject critical styles
        injectCriticalStyles();

        // Then load other CSS files
        const cssFiles = [
          '/src/assets/employer/assets/css/bootstrap.min.css',
          '/src/assets/employer/assets/css/style.css',
          '/src/assets/employer/assets/css/bootstrap-datetimepicker.min.css',
          '/src/assets/employer/assets/css/dataTables.bootstrap5.min.css',
          '/src/assets/employer/assets/css/owl.carousel.min.css',
          '/src/assets/employer/assets/plugins/tabler-icons/tabler-icons.css',
          '/src/assets/employer/assets/plugins/@simonwep/pickr/themes/nano.min.css',
          '/src/assets/employer/assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css',
          '/src/assets/employer/assets/plugins/daterangepicker/daterangepicker.css',
          '/src/assets/employer/assets/plugins/fancybox/jquery.fancybox.min.css',
          '/src/assets/employer/assets/plugins/flatpickr/flatpickr.min.css',
          '/src/assets/employer/assets/plugins/fontawesome/css/all.min.css',
          '/src/assets/employer/assets/plugins/fontawesome/css/fontawesome.min.css',
          '/src/assets/employer/assets/plugins/icons/feather/feather.css',
          '/src/assets/employer/assets/plugins/select2/css/select2.min.css',
          '/src/assets/employer/assets/plugins/summernote/summernote-lite.min.css'
        ];

        await Promise.all(cssFiles.map(loadCSS));

        // Small delay to ensure all styles are applied
        setTimeout(() => {
          // Re-apply body class in case it was removed
          document.body.classList.add('employer-route');
          setIsLoading(false);
        }, 300);
      } catch (error) {
        console.error('Error in EmployerLayout:', error);
        setIsLoading(false);
      }
    };

    loadAllCSS();

    // Simple interval to ensure employer-route class is always present
    const intervalId = setInterval(() => {
      if (!document.body.classList.contains('employer-route')) {
        document.body.classList.add('employer-route');
      }
    }, 1000); // Check every second

    // Cleanup function
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="employer-loader">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Add a wrapper class for the current route to help with debugging
  const routeClass = location.pathname.replace(/\//g, '-').replace(/^-+|-+$/g, '') || 'home';

  return (
    <div className={`employer-route-wrapper route-${routeClass}`}>
      <Outlet />
    </div>
  );
};

export default EmployerLayout;