import React from 'react';
import './privacypolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-page">
      <h1>Privacy Policy</h1>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Edprofio ("we", "us", or "our") is a career partner for educational institutions and edtech companies. 
          We help organizations discover and connect with qualified talent and provide job seekers with meaningful career opportunities.
        </p>
        <p>
          By accessing our website or services, you consent to the collection, use, and disclosure of your information 
          as described in this Privacy Policy.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        
        <h3>a. Personal Data</h3>
        <ul>
          <li>Full name</li>
          <li>Contact information (email address, phone number)</li>
          <li>Educational background</li>
          <li>Employment history</li>
          <li>Resume/CV and job preferences</li>
          <li>Professional profile links</li>
        </ul>
        
        <h3>b. Organizational Data</h3>
        <ul>
          <li>Institution or company name</li>
          <li>Contact person details</li>
          <li>Job postings and role descriptions</li>
          <li>Hiring requirements</li>
        </ul>
        
        <h3>c. Technical and Usage Data</h3>
        <ul>
          <li>IP address</li>
          <li>Device and browser details</li>
          <li>Access logs and usage patterns</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>
      </section>

      <section>
        <h2>3. Purpose of Data Collection</h2>
        <p>We collect and use your information for the following lawful purposes:</p>
        <ul>
          <li>To match job seekers with career opportunities</li>
          <li>To assist institutions and companies with recruitment</li>
          <li>To communicate job alerts, updates, and services</li>
          <li>To improve our platform and services</li>
          <li>To comply with applicable legal obligations</li>
        </ul>
      </section>

      <section>
        <h2>4. Lawful Basis for Processing</h2>
        <p>
          Under the Digital Personal Data Protection Act, 2023 (DPDP Act), we process personal data with your consent 
          or where necessary for:
        </p>
        <ul>
          <li>Employment-related purposes</li>
          <li>Legal compliance</li>
          <li>Service delivery</li>
        </ul>
        <p>You may withdraw your consent at any time.</p>
      </section>

      <section>
        <h2>5. Data Storage and Security</h2>
        <p>
          We use reasonable security practices and technical safeguards to protect your data. 
          Data is stored securely on servers located in India or jurisdictions with equivalent protection.
        </p>
      </section>

      <section>
        <h2>6. Data Sharing and Disclosure</h2>
        <p>We may share your data with:</p>
        <ul>
          <li>Partnering employers and institutions</li>
          <li>Third-party service providers</li>
          <li>Regulatory or legal authorities as required</li>
        </ul>
        <p>We do not sell or rent your personal information to marketers or unrelated third parties.</p>
      </section>

      <section>
        <h2>7. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and tracking technologies to enhance your experience, understand user behavior, 
          and optimize site performance. You can control cookies through your browser settings.
        </p>
      </section>

      <section>
        <h2>8. Your Rights</h2>
        <p>As a Data Principal, you have rights under the DPDP Act, including:</p>
        <ul>
          <li>Accessing and correcting your data</li>
          <li>Withdrawing consent</li>
          <li>Nominating a representative</li>
          <li>Filing a grievance</li>
        </ul>
      </section>

      <section>
        <h2>9. Data Retention</h2>
        <p>
          We retain your data only as long as necessary for business or legal purposes, 
          after which it is securely deleted or anonymised.
        </p>
      </section>

      <section>
        <h2>10. Grievance Redressal and Contact</h2>
        <p>If you have questions or concerns, please contact our Grievance Officer:</p>
        <p>
          <strong>Name:</strong> Dhivakara Rao<br />
          <strong>Email:</strong> <a href="mailto:info@edprofio.com">info@edprofio.com</a><br />
        </p>
      </section>

      <section>
        <h2>11. Updates to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page with the revised date.
        </p>
      </section>

      <section>
        <h2>12. Governing Law</h2>
        <p>
          This policy is governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Karnataka, India.
        </p>
      </section>

      <footer className="privacy-policy-footer">
        &copy; 2025 Edprofio. All rights reserved.
      </footer>
    </div>
  );
};

export default PrivacyPolicy;