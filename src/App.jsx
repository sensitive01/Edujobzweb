import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/public/Home';
import AboutPage from './pages/public/About';
import CareersPage from './pages/public/Careers';
import BlogsPage from './pages/public/Blogs';
import BlogDetailsPage from './pages/public/Blogs/[id]';
import JobsPage from './pages/public/Jobs';
import JobsPageList from './pages/public/Jobs/JobsPageList';
import JobPageMapGrid from './pages/public/Jobs/JobPageMapGrid';
import JobsFilter from './pages/public/Jobs/JobsFilter';
import ResumeBuilder from './pages/public/ResumeBuilder';
import PremiumAdvancedSearch from './pages/public/PremiumAdvancedSearch';
import JobVacanciesListWthMap from './pages/public/Jobs/JobVacanciesListWthMap';
import JobAlert from './pages/public/JobAlert';
import AppliedJobs from './pages/public/AppliedJobs';
import Shortlisted from './pages/public/shortlisted';
import CertificatesTrainings from './pages/public/CertificatesTrainings';
import Events from './pages/public/Events';
import ReferAndEarn from './pages/public/ReferAndEarn';
import Notifications from './pages/public/notifications';
import Inbox from './pages/public/Inbox';
import UserDashboard from './pages/public/UserDashboard';
import LoginPage from './pages/public/Login/Login';
import SignupPage from './pages/public/Login/Signup';
import EmployeeRegistration from './pages/public/Login/EmployeeRegistration';
import SchoolRegistration from './pages/public/Login/SchoolRegistration';
import EmployerLoginPage from './pages/employer/EmployerLoginPage';
import EmployersPage from './pages/employer/EmployersPage';
import PlansAndSubscription from './pages/employer/PlanAndSubscription';
import PostJob from './pages/public/PostJob';
import EmployerCandidates from './pages/employer/EmployerCandidates';
import JobDetails from './pages/public/Jobs/JobDetails';
import EmployerLayout from './pages/employer/EmployerLayout';
import EmployeerRegister from './pages/employer/EmployeerRegister';
import EmployeerCandidatesSearch from './pages/employer/EmployeerCandidatesSearch';
import EmployeerPostJob from './pages/employer/EmployeerPostJob';
import CandidateProfile from './pages/public/CandidateProfile';
import EditEmployerProfile from './pages/public/EmployeeerEditProfile';
import CandidatesListEmployeer from './pages/candidates/CandidatesListEmployeer';
import ApplyJob from './pages/public/Jobs/ApplyJob';
import EmployeProfile from './pages/public/EmployerProfile';
import SavedJobs from './pages/public/Jobs/SavedJobs';
import EmployeerJobDetails from './pages/employer/EmployeerJobDetails';
import EmployeerShortlisedCandidates from './pages/employer/EmployeerShortlisedCandidates';
import EmployeerSavedCandidates from './pages/employer/EmployeerSavedCandidates';
import EmployeerJobIdShortlistedCandidates from './pages/employer/EmployeerJobIdShortlistedCandidates';
import EmployeerAppliedCandidates from './pages/employer/EmployeerAppliedCandidates';
import EmployeerAllAppliedCandidates from './pages/employer/EmployeerAllAppliedCandidates';
import EmployeerProfileView from './pages/employer/EmployeerProfileView';
import EmployerForgotPassword from './pages/employer/EmployerForgotPassword';
import EmployerVerifyOTP from './pages/employer/EmployerVerifyOTP';
import EmployerChangePassword from './pages/employer/EmployerChangePassword';
import ForgotPasswordPage from './pages/public/Login/EmployeeForgotPasswordPage';
import OTPVerificationPage from './pages/public/Login/EmployeeOTPVerificationPage';
import ResetPasswordPage from './pages/public/Login/EmployeeResetPasswordPage';
import EmployeerCalenderEvents from './pages/employer/EmployeerCalenderEvents';
import EventDetails from './pages/public/EventDetails';
import EventRegistration from './pages/public/EventRegistration';
import EmployeerEvents from './pages/employer/EmployeerEvents.Jsx';
import EmployerSupportChatList from './pages/employer/EmployerSupportChatList';
import EmployerEventDetails from './pages/employer/EmployerEventDetails';
import EmployeerMessage from './pages/employer/EmployeerMessage';
import EmployeerPlans from './pages/employer/Plans/EmployeerPlans';
import EmployeerPlansGrid from './pages/employer/Plans/EmployeerPlansGrid';
import FAQs from './pages/employer/Faqs/FAQs';
import AdminLoginPage from './pages/admin/login/login';
import AdminRegister from './pages/admin/register/register';
import EmployerAdminLoginPage from './pages/employeradmin/Login/login';
import EmployerAdminRegister from './pages/employeradmin/Register/register';
import EmployerAdminForgotPassword from './pages/employeradmin/forgotpassword/EmployerAdminForgotPassword';
import EmployerAdminChangePassword from './pages/employeradmin/forgotpassword/EmployerAdminChangePassword';
import EmployerAdminVerifyOTP from './pages/employeradmin/forgotpassword/EmployerAdminVerifyOTP';
import EmployeerAdminAllAppliedCandidates from './pages/employeradmin/candidate/EmployeerAdminAllAppliedCandidates';
import EmployeerAdminAppliedCandidates from './pages/employeradmin/candidate/EmployeerAdminAppliedCandidates';
import EmployeerAdminJobIdShortlistedCandidates from './pages/employeradmin/candidate/EmployeerAdminJobIdShortlistedCandidates';
import EmployeerAdminSavedCandidates from './pages/employeradmin/candidate/EmployeerAdminSavedCandidates';
import EmployeerAdminShortlisedCandidates from './pages/employeradmin/candidate/EmployeerAdminShortlisedCandidates';
import EmployerAdminCandidates from './pages/employeradmin/candidate/EmployerAdminCandidates';
import EmployeerAdminCandidatesSearch from './pages/employeradmin/candidate/EmployeerAdminCandidatesSearch';
import EmployerAdminobDetailsPage from './pages/employeradmin/job/EmployerAdminobDetailsPage';
import EmployeerAdminPostJob from './pages/employeradmin/job/EmployeerAdminPostJob';
import EmployeerAdminProfileView from './pages/employeradmin/job/EmployeerAdminProfileView';
import EmployeerAdminMessage from './pages/employeradmin/message/EmployeerAdminMessage';
import EmployeerAdminPlansGrid from './pages/employeradmin/plan/EmployeerAdminPlansGrid';
import EmployeerAdminPlans from './pages/employeradmin/plan/EmployeerAdminPlans';
import EmployerAdminCalendarEvents from './pages/employeradmin/events/EmployerAdminCalendarEvents';
import EmployerAdminFAQs from './pages/employeradmin/Faqs/EmployerAdminFAQs';
import EmployerAdminSupportChatList from './pages/employeradmin/support/EmployerAdminSupportChatList';
import EmployerAdminEnrollment from './pages/employeradmin/events/EmployerAdminEnrollment';
import SubUnitsModalUse from './pages/employeradmin/subunits/SubUnitsModalUse';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes without Layout */}
        {/* <Route path='/' element={<HomePage />} /> */}


        <Route element={<EmployerLayout />}>
          <Route path='/employer/new-candidate' element={<EmployerCandidates />} />
          <Route path='/employer/shortlisted-candidates' element={<EmployeerShortlisedCandidates />} />
          <Route path='/employer/applied-candidates' element={<EmployeerAllAppliedCandidates />} />
          <Route path='/employer/applied-candidates/:id' element={<EmployeerAppliedCandidates />} />
          <Route path='/employer/saved-candidates' element={<EmployeerSavedCandidates />} />
          <Route path='/employer/shortlisted-candidate-byjob/:id' element={<EmployeerJobIdShortlistedCandidates />} />

          <Route path='/employer/login' element={<EmployerLoginPage />} />
          <Route path='/employer/forgot-password' element={<EmployerForgotPassword />} />
          <Route path='/employer/reset-password' element={<EmployerChangePassword />} />
          <Route path='/employer/verify-otp' element={<EmployerVerifyOTP />} />
          <Route path='/employer/register' element={<EmployeerRegister />} />

          <Route path='/employer/search' element={<EmployeerCandidatesSearch />} />
          <Route path='/employer/post-jobs' element={<EmployeerPostJob />} />
          <Route path='/employer/view-job/:id' element={<EmployeerJobDetails />} />
          <Route path='/employer/profile' element={<EmployeerProfileView />} />

          <Route path='/employer/calendar-events' element={<EmployeerCalenderEvents />} />
          <Route path='/employer/events' element={<EmployeerEvents />} />
          <Route path='/employer/events-details/:eventId' element={<EmployerEventDetails />} />
          <Route path='/employer/support' element={<EmployerSupportChatList />} />
          <Route path='/employer/messages' element={<EmployeerMessage />} />
          <Route path='/employer/plans' element={<EmployeerPlans />} />
          <Route path='/employer/plans-grid' element={<EmployeerPlansGrid />} />
          <Route path='/employer/FAQs' element={<FAQs />} />

          {/* Admin routes */}

          <Route path='/admin/login' element={<AdminLoginPage />} />
          <Route path='/admin/register' element={<AdminRegister />} />

          {/* Employer-Admin routes */}

          <Route path='/employer-admin/login' element={<EmployerAdminLoginPage />} />
          <Route path='/employer-admin/register' element={<EmployerAdminRegister />} />
          <Route path='/employer-admin/forgot-password' element={<EmployerAdminForgotPassword />} />
          <Route path='/employer-admin/reset-password' element={<EmployerAdminChangePassword />} />
          <Route path='/employer-admin/verify-otp' element={<EmployerAdminVerifyOTP />} />
          <Route path='/employer-admin/profile' element={<EmployeerAdminProfileView />} />
          <Route path='/employer-admin/units-grid' element={<SubUnitsModalUse />} />

          <Route path='/employer-admin/new-candidate' element={<EmployerAdminCandidates />} />
          <Route path='/employer-admin/shortlisted-candidates' element={<EmployeerAdminShortlisedCandidates />} />
          <Route path='/employer-admin/applied-candidates' element={<EmployeerAdminAllAppliedCandidates />} />
          <Route path='/employer-admin/applied-candidates/:id' element={<EmployeerAdminAppliedCandidates />} />
          <Route path='/employer-admin/saved-candidates' element={<EmployeerAdminSavedCandidates />} />
          <Route path='/employer-admin/shortlisted-candidate-byjob/:id' element={<EmployeerAdminJobIdShortlistedCandidates />} />
          <Route path='/employer-admin/search' element={<EmployeerAdminCandidatesSearch />} />

          <Route path='/employer-admin/post-jobs' element={<EmployeerAdminPostJob />} />
          <Route path='/employer-admin/view-job/:id' element={<EmployerAdminobDetailsPage />} />
          <Route path='/employer-admin/messages' element={<EmployeerAdminMessage />} />
          <Route path='/employer-admin/plans' element={<EmployeerAdminPlans />} />
          <Route path='/employer-admin/plans-grid' element={<EmployeerAdminPlansGrid />} />
          <Route path='/employer-admin/calendar-events' element={<EmployerAdminCalendarEvents />} />
          <Route path='/employer-admin/enrollment' element={<EmployerAdminEnrollment />} />
          <Route path='/employer-admin/FAQs' element={<EmployerAdminFAQs />} />
          <Route path='/employer-admin/support' element={<EmployerAdminSupportChatList />} />

        </Route>

        {/* All other routes with Layout */}
        <Route path='*' element={
          <Layout>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/about-us' element={<AboutPage />} />
              <Route path='/careers' element={<CareersPage />} />
              <Route path='/blogs' element={<BlogsPage />} />
              <Route path='/blog-details' element={<BlogDetailsPage />} />
              <Route path='/job-vacancies' element={<JobsPage />} />
              <Route path='/job-vacancies-list' element={<JobsPageList />} />
              <Route path='/job-vacancies-map' element={<JobPageMapGrid />} />
              <Route path='/job-filter' element={<JobsFilter />} />
              <Route path='/job-details/:id' element={<JobDetails />} />
              <Route path="/saved-jobs" element={<SavedJobs />} />
              <Route path='/dashboard' element={<UserDashboard />} />
              <Route path='/employee-profile' element={<EmployeProfile />} />
              <Route path='/employee/edit/:id' element={<EditEmployerProfile />} />
              <Route path='/candidate-profile' element={<CandidateProfile />} />
              <Route path='/resume-builder' element={<ResumeBuilder />} />
              <Route path='/search' element={<PremiumAdvancedSearch />} />
              <Route path='/job-vacancies-grid-with-map' element={<JobVacanciesListWthMap />} />
              <Route path='/job-alerts' element={<JobAlert />} />
              <Route path='/applied-jobs' element={<AppliedJobs />} />
              <Route path='/shortlisted' element={<Shortlisted />} />
              <Route path='/certificates-trainings' element={<CertificatesTrainings />} />
              <Route path='/events' element={<Events />} />
              <Route path="/events-details/:eventId" element={<EventDetails />} />
              <Route path="/event-register/:eventId" element={<EventRegistration />} />
              <Route path='/refer-us' element={<ReferAndEarn />} />
              <Route path='/notifications' element={<Notifications />} />
              <Route path='/support' element={<Inbox />} />
              <Route path='/employer' element={<EmployersPage />} />
              <Route path='/subscription-plan' element={<PlansAndSubscription />} />
              <Route path='/post-job' element={<PostJob />} />
              <Route path='/candidate-apply-list' element={<CandidatesListEmployeer />} />
              <Route path='/apply/:id' element={<ApplyJob />} />


              <Route path='/login' element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/verify-otp" element={<OTPVerificationPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path='/signup' element={<SignupPage />} />
              <Route path='/employee-registration' element={<EmployeeRegistration />} />
              <Route path='/school-registration' element={<SchoolRegistration />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
