import React, { useState, useEffect } from "react";
import EmployerAdminFooter from "../Layout/EmployerAdminFooter";
import EmployerAdminHeader from "../Layout/EmployerAdminHeader";
import {
  purchaseEmployerPlan,
  fetchAllPlans,
  createRazorpayOrder,
} from "../../../api/services/projectServices";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PlanSubscription = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [showPlanModal, setShowPlanModal] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoadingPlans(true);
        const response = await fetchAllPlans();
        if (response.success) {
          setPlans(response.data);
        } else {
          toast.error("Failed to load plans from server");
        }
      } catch (err) {
        console.error("Error fetching plans:", err);
        // Fallback to hardcoded plans if backend fails
        setPlans([
          {
            _id: "68905a25316f4272451852f7",
            name: "Free",
            price: 0,
            validityDays: 7,
            jobPostingLimit: 1,
            profileViews: 10,
            downloadResume: 5,
            planType: "Free",
          },
        ]);
      } finally {
        setLoadingPlans(false);
      }
    };

    fetchPlans();
    // Show modal on entry
    setShowPlanModal(true);
  }, []);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePurchase = async (plan) => {
    try {
      setLoading(true);
      const adminData = JSON.parse(localStorage.getItem("EmployerAdminData"));

      if (!adminData || !adminData._id) {
        toast.error("User session not found. Please log in again.");
        navigate("/employer-admin/login");
        return;
      }

      // 1. If plan is Free, activate immediately
      if (plan.price === 0) {
        const payload = {
          adminId: adminData._id,
          planId: plan._id,
          validityDays: plan.validityDays,
        };
        const response = await purchaseEmployerPlan(payload);
        toast.success(`${plan.name} Plan Activated Successfully!`);
        localStorage.setItem(
          "EmployerAdminData",
          JSON.stringify(response.data),
        );
        setTimeout(() => navigate("/employer-admin/dashboard"), 2000);
        return;
      }

      // 2. If plan is Paid, initiate Razorpay
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        toast.error("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const basePrice = Number(plan.price);
      const gstPercent = Number(plan.gstPercentage || 18);
      const totalAmount = basePrice + (basePrice * gstPercent) / 100;

      // Create Order in backend
      const orderResponse = await createRazorpayOrder({
        amount: totalAmount,
        employerid: adminData._id,
        plan_id: plan._id,
      });

      if (!orderResponse.success) {
        toast.error("Failed to create payment order");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderResponse.order.amount,
        currency: orderResponse.order.currency,
        name: "EdProfio",
        description: `${plan.name} Plan Subscription`,
        order_id: orderResponse.order.id,
        handler: async function (response) {
          try {
            const activationPayload = {
              adminId: adminData._id,
              planId: plan._id,
              paymentDetails: {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
            };
            const result = await purchaseEmployerPlan(activationPayload);
            toast.success("Payment Successful! Plan Activated.");
            localStorage.setItem(
              "EmployerAdminData",
              JSON.stringify(result.data),
            );
            navigate("/employer-admin/dashboard");
          } catch (err) {
            console.error("Activation failed:", err);
            toast.error(
              "Payment received but activation failed. Contact support.",
            );
          }
        },
        prefill: {
          name: adminData.employeradminUsername,
          email: adminData.employeradminEmail,
          contact: adminData.employeradminMobile,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error(error.message || "Something went wrong during purchase");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <EmployerAdminHeader />
      <div className="content">
        <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3 text-center">
          <div className="mx-auto mb-2">
            <h2 className="mb-1">Select Your Plan</h2>
            <p>
              Choose a plan to activate your dashboard and start posting jobs.
            </p>
          </div>
        </div>

        {loadingPlans ? (
          <div className="text-center p-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading plans...</span>
            </div>
          </div>
        ) : (
          <div className="row justify-content-center">
            {plans.map((plan) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mt-3" key={plan._id}>
                <div className="card flex-fill h-100 shadow-sm border-0">
                  <div className="card-body bg-light rounded text-center">
                    <div className="mb-4">
                      <h4 className="text-uppercase tracking-wider">
                        {plan.name}
                      </h4>
                      <h1 className="text-primary mt-2">
                        ₹{plan.price}
                        <span className="fs-14 fw-normal text-gray">
                          /{plan.validityDays} Days
                        </span>
                      </h1>
                    </div>

                    <div className="pricing-content rounded bg-white border border-grey shadow-sm mb-4 p-3 text-start">
                      <div className="price-hdr border-bottom mb-3 pb-2">
                        <h6 className="fs-14 fw-medium text-primary w-100 mb-0">
                          What's Included
                        </h6>
                      </div>
                      <ul className="list-unstyled">
                        <li className="text-dark d-flex align-items-center mb-3">
                          <i className="ti ti-discount-check-filled text-success me-2"></i>
                          {plan.jobPostingLimit} Job Postings
                        </li>
                        <li className="text-dark d-flex align-items-center mb-3">
                          <i className="ti ti-discount-check-filled text-success me-2"></i>
                          {plan.profileViews} Profile Views
                        </li>
                        <li className="text-dark d-flex align-items-center mb-3">
                          <i className="ti ti-discount-check-filled text-success me-2"></i>
                          {plan.downloadResume} Resume Downloads
                        </li>
                        <li className="text-dark d-flex align-items-center mb-3">
                          <i className="ti ti-discount-check-filled text-success me-2"></i>
                          Basic Support
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={() => handlePurchase(plan)}
                      className={`btn btn-${plan.price === 0 ? "outline-primary" : "primary"} w-100 py-2 fs-16`}
                      disabled={loading}
                    >
                      {loading
                        ? "Processing..."
                        : plan.price === 0
                          ? "Get Started"
                          : "Activate Now"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <EmployerAdminFooter />

      {/* Subscription Guidance Modal */}
      {showPlanModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-success text-white border-0">
                <h5 className="modal-title">
                  <i className="ti ti-circle-check me-2"></i> Profile Completed!
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowPlanModal(false)}
                ></button>
              </div>
              <div className="modal-body p-4 text-center">
                <div
                  className="mb-3 d-inline-flex align-items-center justify-content-center bg-success-transparent rounded-circle"
                  style={{ width: "80px", height: "80px" }}
                >
                  <i className="ti ti-credit-card fs-1 text-success"></i>
                </div>
                <h4>Select Your Plan</h4>
                <p className="text-muted">
                  Your profile is ready! Now, please{" "}
                  <b>select a subscription plan</b> to activate your dashboard.
                  You can start with the
                  <b> Free Plan</b> for 7 days or choose a paid plan for more
                  features.
                </p>
                <div className="alert alert-info border-0 mb-0">
                  <i className="ti ti-rocket me-2"></i>
                  Activating a plan will unlock job postings, candidate search,
                  and your full analytics dashboard.
                </div>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button
                  type="button"
                  className="btn btn-success w-100 py-2 fw-semibold text-white"
                  onClick={() => setShowPlanModal(false)}
                >
                  Show Me the Plans
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlanSubscription;
