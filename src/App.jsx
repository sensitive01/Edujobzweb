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

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes without Layout */}
        {/* <Route path='/' element={<HomePage />} /> */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        {/* <Route path='/employee-registration' element={<EmployeeRegistration />} /> */}
        <Route path='/school-registration' element={<SchoolRegistration />} />

        <Route element={<EmployerLayout />}>
          <Route path='/employer/new-candidate' element={<EmployerCandidates />} />
          <Route path='/employer/login' element={<EmployerLoginPage />} />
          <Route path='/employer/register' element={<EmployeerRegister />} />
          <Route path='/employer/search' element={<EmployeerCandidatesSearch />} />
          <Route path='/employer/post-jobs' element={<EmployeerPostJob />} />
          <Route path='/employer/view-job/:id' element={<EmployeerJobDetails />} />
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
              <Route path='/refer-us' element={<ReferAndEarn />} />
              <Route path='/notifications' element={<Notifications />} />
              <Route path='/support' element={<Inbox />} />
              <Route path='/employer' element={<EmployersPage />} />
              <Route path='/subscription-plan' element={<PlansAndSubscription />} />
              <Route path='/post-job' element={<PostJob />} />
              <Route path='/candidate-apply-list' element={<CandidatesListEmployeer />} />
              <Route path='/apply/:id' element={<ApplyJob />} />
                <Route path='/employee-registration' element={<EmployeeRegistration />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
