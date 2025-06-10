import { useState } from 'react';
import { FaCrown, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const PlansAndSubscription = () => {
  const [activeTab, setActiveTab] = useState('tab01');
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const subscriptionPlans = [
    {
      name: "FREE",
      price: "₹0",
      features: [
        { label: "Profile View or Download", value: "2 days" },
        { label: "Upgrade", value: "upgrade" },
        { label: "Resume Requests", value: "5" },
        { label: "Verified Candidate Access", value: true },
        { label: "Job Post(s) Allowed", value: "1" },
        { label: "Plan Validity", value: "14" },
        { label: "DRM (Dedicated Resource Manager)", value: true },
        { label: "Webinars & Seminars Access", value: true },
        { label: "Online or Campus Interview", value: true },
        { label: "Help & Support", value: true }
      ]
    },
    {
      name: "BASIC",
      price: "₹3,999",
      features: [
        { label: "Profile View or Download", value: "1 day" },
        { label: "Resume Requests", value: "Unlimited" },
        { label: "Verified Candidate Access", value: true },
        { label: "Job Post(s) Allowed", value: "1" },
        { label: "Plan Validity", value: "14" },
        { label: "DRM (Dedicated Resource Manager)", value: true },
        { label: "Webinars & Seminars Access", value: true },
        { label: "Online or Campus Interview", value: true },
        { label: "Help & Support", value: true }
      ],
      bgClass: "bg-light-sky"
    },
    {
      name: "STANDARD",
      price: "₹6,999",
      features: [
        { label: "Profile View or Download", value: "1 day" },
        { label: "Resume Requests", value: "Unlimited" },
        { label: "Verified Candidate Access", value: true },
        { label: "Job Post(s) Allowed", value: "1" },
        { label: "Plan Validity", value: "14" },
        { label: "DRM (Dedicated Resource Manager)", value: true },
        { label: "Webinars & Seminars Access", value: true },
        { label: "Online or Campus Interview", value: true },
        { label: "Help & Support", value: true }
      ]
    },
    {
      name: "PREMIUM",
      price: "₹9,999",
      features: [
        { label: "Profile View or Download", value: "2 days" },
        { label: "Resume Requests", value: "5" },
        { label: "Verified Candidate Access", value: true },
        { label: "Job Post(s) Allowed", value: "1" },
        { label: "Plan Validity", value: "14" },
        { label: "DRM (Dedicated Resource Manager)", value: true },
        { label: "Webinars & Seminars Access", value: true },
        { label: "Online or Campus Interview", value: true },
        { label: "Help & Support", value: true }
      ],
      bgClass: "bg-light"
    }
  ];

  const crownPlans = [
    {
      name: "CROWN A",
      price: "₹35,999",
      features: [
        { label: "Profile View or Download", value: "1 day" },
        { label: "Upgrade", value: "upgrade" }, 
        { label: "Resume Requests", value: "Unlimited" },
        { label: "Verified Candidate Access", value: true },
        { label: "Job Post(s) Allowed", value: "1" },
        { label: "Plan Validity", value: "14" },
        { label: "DRM (Dedicated Resource Manager)", value: true },
        { label: "Webinars & Seminars Access", value: true },
        { label: "Online or Campus Interview", value: true },
        { label: "Help & Support", value: true }
      ],
      bgClass: "bg-light-gray"
    },
    {
      name: "CROWN B",
      price: "8.33% on CTC per candidate",
      features: [
        { label: "Profile View or Download", value: "1 day" },
        { label: "Resume Requests", value: "Unlimited" },
        { label: "Verified Candidate Access", value: true },
        { label: "Job Post(s) Allowed", value: "1" },
        { label: "Plan Validity", value: "14" },
        { label: "DRM (Dedicated Resource Manager)", value: true },
        { label: "Webinars & Seminars Access", value: true },
        { label: "Online or Campus Interview", value: true },
        { label: "Help & Support", value: true }
      ],
      bgClass: "bg-light-yellow"
    }
  ];

  const faqs = [
    {
      question: "Do you design Minimalistic logos only?",
      answer: "No, Minimalistic is just one type of logo that I am offering. I can design any type of logo for instance Brandmark logo design."
    },
    {
      question: "Which Software do you use to design a logo?",
      answer: "No, Minimalistic is just one type of logo that I am offering. I can design any type of logo for instance Brandmark logo design."
    },
    {
      question: "Will you provide you vector files?",
      answer: "No, Minimalistic is just one type of logo that I am offering. I can design any type of logo for instance Brandmark logo design."
    },
    {
      question: "In what format will you deliver final files?",
      answer: "No, Minimalistic is just one type of logo that I am offering. I can design any type of logo for instance Brandmark logo design."
    },
    {
      question: "What are the revisions?",
      answer: "No, Minimalistic is just one type of logo that I am offering. I can design any type of logo for instance Brandmark logo design."
    }
  ];

  return (
    <>
      {/* Sub Visual of the page */}
      <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 pt-lg-150 pb-30 text-white">
        <div className="container position-relative text-center">
          <div className="row">
            <div className="col-12">
              <div className="subvisual-textbox">
                <h1 className="text-primary mb-0">Plan & Subscription</h1>
                <p>Feel free to get in touch with us. Need Help?</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Jobs */}
      <section className="section section-theme-9 featured_Jobs_Block" style={{ padding: "80px 0px" }}>
        <div className="container">
          <div className="jobs_info_wrap" style={{ marginBottom: "0px" }}>
            <header className="section-header d-flex flex-column text-center">
              <p>Find the right Subscription Plan suits you</p>
              <h2>
                <span className="text-outlined text-secondary">Featured Plans</span>
              </h2>
            </header>
            <div className="tabs-bar">
              <ul className="nav nav-tabs bg-white border border-grey shadow">
                <li>
                  <button 
                    className={`nav-link ${activeTab === 'tab01' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('tab01')}
                  >
                    Subscription Plans
                  </button>
                </li>
                <li>
                  <button 
                    className={`nav-link ${activeTab === 'tab02' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('tab02')}
                  >
                    Crown Plans
                  </button>
                </li>
              </ul>
            </div>
            <div className="tab-content">
              {/* Subscription Plans Tab */}
              <div className={`tab-pane fade ${activeTab === 'tab01' ? 'show active' : ''}`} id="nav-tab01">
                <div className="row">
                  <div className="col-12 col-lg-12 mb-15 mb-sm-30">
                    <div className="jobplugin__catalog">
                      <div className="jobplugin__catalog-content">
                        <div className="jobplugin__catalog-block">
                          <div className="jobplugin__settings-head">
                            <h2 className="h5 text-primary">Pricing</h2>
                            <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                          </div>
                          <ul className="jobplugin__catalog-pricing">
                            <li>
                              <div className="jobplugin__catalog-pricing__col text-secondary">Service Packages</div>
                              {subscriptionPlans.map((plan, index) => (
                                <div key={index} className={`jobplugin__catalog-pricing__col ${plan.bgClass || ''}`}>
                                  <b>{plan.name}</b>
                                  <strong className="jobplugin__catalog-pricing__text jobplugin__text-primary">
                                    {plan.price}
                                  </strong>
                                  + 18% GST
                                </div>
                              ))}
                            </li>
                            {subscriptionPlans[0].features.map((feature, featureIndex) => (
                              <li key={featureIndex}>
                                <div className="jobplugin__catalog-pricing__col text-secondary">{feature.label}</div>
                                {subscriptionPlans.map((plan, planIndex) => (
                                  <div key={planIndex} className={`jobplugin__catalog-pricing__col ${plan.bgClass || ''}`}>
                                    {feature.label === "Upgrade" ? (
                                      <button className="border border-gray shadow bg-white" style={{ padding: "5px 10px", borderRadius: "10px" }}>
                                        <FaCrown className="text-primary" />&nbsp;Upgrade
                                      </button>
                                    ) : typeof feature.value === 'boolean' ? (
                                      feature.value && <span className="jobplugin__catalog-pricing__check jobplugin__text-primary">✓</span>
                                    ) : (
                                      feature.value
                                    )}
                                  </div>
                                ))}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Crown Plans Tab */}
              <div className={`tab-pane fade ${activeTab === 'tab02' ? 'show active' : ''}`} id="nav-tab02">
                <div className="row">
                  <div className="col-12 col-lg-12 mb-15 mb-xl-30">
                    <div className="jobplugin__catalog">
                      <div className="jobplugin__catalog-content">
                        <div className="jobplugin__catalog-block">
                          <div className="jobplugin__settings-head">
                            <h2 className="h5 text-primary">Pricing</h2>
                            <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                          </div>
                          <ul className="jobplugin__catalog-pricing">
                            <li>
                              <div className="jobplugin__catalog-pricing__col text-secondary">Service Packages</div>
                              {crownPlans.map((plan, index) => (
                                <div key={index} className={`jobplugin__catalog-pricing__col ${plan.bgClass || ''}`}>
                                  <b>{plan.name}</b>
                                  <strong className="jobplugin__catalog-pricing__text jobplugin__text-primary">
                                    {plan.price}
                                  </strong>
                                  + 18% GST
                                </div>
                              ))}
                            </li>
                            {crownPlans[0].features.map((feature, featureIndex) => (
                              <li key={featureIndex}>
                                <div className="jobplugin__catalog-pricing__col text-secondary">{feature.label}</div>
                                {crownPlans.map((plan, planIndex) => (
                                  <div key={planIndex} className={`jobplugin__catalog-pricing__col ${plan.bgClass || ''}`}>
                                    {feature.label === "Upgrade" ? (
                                      <button className="border border-gray shadow bg-white" style={{ padding: "5px 10px", borderRadius: "10px" }}>
                                        <FaCrown className="text-primary" />&nbsp;Upgrade
                                      </button>
                                    ) : typeof feature.value === 'boolean' ? (
                                      feature.value && <span className="jobplugin__catalog-pricing__check jobplugin__text-primary">✓</span>
                                    ) : (
                                      feature.value
                                    )}
                                  </div>
                                ))}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <main className="jobplugin__main">
        <div className="jobplugin__main-holder">
          <div className="jobplugin__container">
            <div className="jobplugin__catalog">
              <div className="jobplugin__catalog-content">
                <div className="jobplugin__catalog-block">
                  <div className="jobplugin__settings-head">
                    <h2 className="h5 text-secondary">Frequently asked questions</h2>
                    <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                  </div>
                  <ul className="jobplugin__accorion">
                    {faqs.map((faq, index) => (
                      <li key={index}>
                        <div 
                          className="jobplugin__accorion-opener" 
                          onClick={() => toggleAccordion(index)}
                          style={{ cursor: 'pointer' }}
                        >
                          <span className="jobplugin__accorion-title">{faq.question}</span>
                          <span className="jobplugin__accorion-arrow">
                            {openAccordion === index ? <FaChevronUp /> : <FaChevronDown />}
                          </span>
                        </div>
                        {openAccordion === index && (
                          <div className="jobplugin__accorion-slide">
                            <p>{faq.answer}</p>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PlansAndSubscription;