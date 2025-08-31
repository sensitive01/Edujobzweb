import React, { useState, useEffect } from "react";
import EmployerHeader from "../EmployerHeader";
import EmployerFooter from "../EmployerFooter";

const EmployeerPlansGrid = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(
          "https://api.edprofio.com/admin/getallplans"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch plans");
        }
        const data = await response.json();
        if (data.success) {
          setPlans(data.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const togglePlanType = () => {
    setIsPremium(!isPremium);
  };

  const getFeatureList = (plan) => {
    return [
      { text: `Daily Limit: ${plan.perDayLimit} actions`, included: true },
      { text: `Profile Views: ${plan.profileViews}`, included: true },
      { text: `Resume Downloads: ${plan.downloadResume}`, included: true },
      { text: "Verified Candidates", included: plan.verifiedCandidateAccess },
      { text: `Job Postings: ${plan.jobPostingLimit}`, included: true },
      { text: `Validity: ${plan.validityDays} days`, included: true },
      { text: "Dedicated Manager", included: plan.hasDRM },
      { text: `Interview Type: ${plan.interviewType}`, included: true },
      { text: "Customer Support", included: plan.customerSupport },
      { text: "Priority Support", included: plan.fastTrackSupport },
      { text: "Live Chat", included: plan.candidatesLiveChat },
      { text: "Webinar Access", included: plan.accessToWebinars },
      { text: "Recruitment Fair", included: plan.accessToRecruitmentFair },
      { text: "Ad-Free Experience", included: !plan.hasAds }, // Inverted for hasAds
    ];
  };

  const calculateTotalPrice = (price, gstPercentage) => {
    if (price === 0) return "₹0";
    const gstAmount = (price * gstPercentage) / 100;
    const total = price + gstAmount;
    return `₹${total.toFixed(2)} (incl. GST)`;
  };

  if (loading) {
    return (
      <>
        <EmployerHeader />
        <div className="content">
          <div className="card">
            <div className="card-body text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading plans...</p>
            </div>
          </div>
        </div>
        <EmployerFooter />
      </>
    );
  }

  if (error) {
    return (
      <>
        <EmployerHeader />
        <div className="content">
          <div className="card">
            <div className="card-body text-center py-5 text-danger">
              <i className="ti ti-alert-circle fs-1"></i>
              <p className="mt-2">Error: {error}</p>
              <button
                className="btn btn-primary"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          </div>
        </div>
        <EmployerFooter />
      </>
    );
  }

  return (
    <>
      <EmployerHeader />
      <div className="content">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-center align-items-center mb-4">
              <p className="mb-0 me-2">Standard Plans</p>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  checked={isPremium}
                  onChange={togglePlanType}
                />
              </div>
              <p className="mb-0">Premium Plans</p>
            </div>

            <div className="row justify-content-center">
              {plans.map((plan, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-12 d-flex mb-4"
                  key={plan._id}
                >
                  <div
                    className={`card flex-fill ${
                      isPremium && plan.price >= 6999
                        ? "border border-primary"
                        : ""
                    }`}
                  >
                    <div className="card-body bg-light shadow">
                      <div className="card shadow">
                        <div className="card-body">
                          <h4>
                            {index + 1}. {plan.name}
                          </h4>
                          <h1 className="text-primary">
                            {plan.price === 0 ? "₹0" : `₹${plan.price}`}
                            <span className="fs-14 fw-normal text-gray">
                              /{plan.validityDays} days
                            </span>
                          </h1>
                          {plan.price > 0 && (
                            <p className="text-muted small mb-0">
                              GST: {plan.gstPercentage}%
                            </p>
                          )}
                          <p className="text-muted small">
                            {calculateTotalPrice(
                              plan.price,
                              plan.gstPercentage
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="pricing-content rounded bg-white border border-grey shadow mb-3">
                        <div className="price-hdr">
                          <h6 className="fs-14 fw-medium text-primary w-100">
                            Features Includes
                          </h6>
                        </div>
                        <div
                          className="features-list"
                          style={{ maxHeight: "300px", overflowY: "auto" }}
                        >
                          {getFeatureList(plan).map((feature, idx) => (
                            <div
                              className="text-dark d-flex align-items-center mb-2"
                              key={idx}
                            >
                              <i
                                className={`ti ${
                                  feature.included
                                    ? "ti-discount-check-filled text-success"
                                    : "ti-circle-x-filled text-danger"
                                } me-2`}
                              ></i>
                              <span>{feature.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <a href="#" className="btn btn-secondary w-100">
                        Choose Plan
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <EmployerFooter />
    </>
  );
};

export default EmployeerPlansGrid;
