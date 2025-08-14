import React, { useState, useEffect } from 'react';
import logo from '../../../assets/employer-admin/assets/img/logo.svg';
import AdminHeader from '../Layout/AdminHeader';
import AdminFooter from '../Layout/AdminFooter';

const AdminSubscribers = () => {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subscribersData, setSubscribersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalTransaction: 0,
    totalSubscribers: 0,
    activeSubscribers: 0,
    expiredSubscribers: 0
  });

  const toggleInvoiceModal = () => setShowInvoiceModal(!showInvoiceModal);
  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await fetch('https://edujobzbackend.onrender.com/admin/getsubscribedemployers');
        if (!response.ok) {
          throw new Error('Failed to fetch subscribers');
        }
        const data = await response.json();
        
        if (data.success && data.data) {
          // Transform API data to match our component structure
          const transformedData = data.data.map(subscriber => ({
            id: subscriber._id,
            company: subscriber.schoolName || 'No Name Provided',
            logo: subscriber.userProfilePic || 'https://via.placeholder.com/50',
            plan: subscriber.currentSubscription?.planDetails?.name || 'Free',
            billingCycle: subscriber.currentSubscription?.planDetails?.validityDays 
              ? `${subscriber.currentSubscription.planDetails.validityDays} Days` 
              : 'N/A',
            paymentMethod: 'Credit Card', // Not provided in API, using placeholder
            amount: subscriber.currentSubscription?.planDetails?.price 
              ? `$${subscriber.currentSubscription.planDetails.price}` 
              : '$0',
            createdDate: new Date(subscriber.createdAt).toLocaleDateString('en-GB', {
              day: '2-digit', month: 'short', year: 'numeric'
            }),
            expiringOn: subscriber.subscriptionenddate 
              ? new Date(subscriber.subscriptionenddate).toLocaleDateString('en-GB', {
                  day: '2-digit', month: 'short', year: 'numeric'
                })
              : 'N/A',
            status: subscriber.blockstatus === 'unblock' ? 'Active' : 'Blocked',
            statusClass: subscriber.blockstatus === 'unblock' ? 'success' : 'danger',
            subscriptionData: subscriber // Store the original data for reference
          }));
          
          setSubscribersData(transformedData);
          
          // Calculate stats
          const totalSubscribers = data.count || 0;
          const activeSubscribers = transformedData.filter(s => s.status === 'Active').length;
          const expiredSubscribers = transformedData.filter(s => {
            if (s.subscriptionData.subscriptionenddate) {
              return new Date(s.subscriptionData.subscriptionenddate) < new Date();
            }
            return false;
          }).length;
          
          const totalTransaction = transformedData.reduce((sum, sub) => {
            return sum + (sub.subscriptionData.currentSubscription?.planDetails?.price || 0);
          }, 0);
          
          setStats({
            totalTransaction,
            totalSubscribers,
            activeSubscribers,
            expiredSubscribers
          });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  if (loading) {
    return (
      <>
        <AdminHeader />
        <div className="content">
          <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <AdminFooter />
      </>
    );
  }

  if (error) {
    return (
      <>
        <AdminHeader />
        <div className="content">
          <div className="alert alert-danger">{error}</div>
        </div>
        <AdminFooter />
      </>
    );
  }

  return (
    <>
      <AdminHeader />
      <div className="content">
        {/* Breadcrumb */}
        <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
          <div className="my-auto">
            <h2>Subscribers</h2>
          </div>
          <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
            <div className="me-2">
              <div className="input-icon-end position-relative">
                <input type="text" className="form-control date-range bookingrange" placeholder="dd/mm/yyyy - dd/mm/yyyy" />
                <span className="input-icon-addon">
                  <i className="ti ti-chevron-down"></i>
                </span>
              </div>
            </div>
            <div className="dropdown me-2">
              <a href="javascript:void(0);" className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                Select Plan
              </a>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1">Advanced (Monthly)</a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1">Basic (Yearly)</a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1">Enterprise (Monthly)</a>
                </li>
              </ul>
            </div>
            <div className="dropdown me-2">
              <a href="javascript:void(0);" className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                Select Status
              </a>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1">Active</a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1">Blocked</a>
                </li>
              </ul>
            </div>
            <div className="dropdown me-2">
              <a href="javascript:void(0);" className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                Sort By : Last 7 Days
              </a>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1">Recently Added</a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1">Ascending</a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1">Desending</a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1">Last Month</a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1">Last 7 Days</a>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <a href="javascript:void(0);" className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                <i className="ti ti-file-export me-1"></i>Export
              </a>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1"><i className="ti ti-file-type-pdf me-1"></i>Export as PDF</a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1"><i className="ti ti-file-type-xls me-1"></i>Export as Excel </a>
                </li>
              </ul>
            </div>
            <div className="head-icons">
              <a href="javascript:void(0);" className="" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Collapse" id="collapse-header">
                <i className="ti ti-chevrons-up"></i>
              </a>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}

        {/* Stats Cards */}
        <div className="row">
          <div className="col-xl-3 col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-body">
                <div className="border-bottom pb-3 mb-3">
                  <div className="row align-items-center">
                    <div className="col-7">
                      <div>
                        <span className="fs-14 fw-normal text-truncate mb-1">Total Transaction</span>
                        <h5>${stats.totalTransaction}</h5>
                      </div>
                    </div>
                    <div className="col-5">
                      <div>
                        <span className="subscription-line-1" data-width="100%">6,2,8,4,3,8,1,3,6,5,9,2,8,1,4,8,9,8,2,1</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                    <span className="text-primary fs-12 d-flex align-items-center me-1">
                      <i className="ti ti-arrow-wave-right-up me-1"></i>+19.01%</span>from
                    last week
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-body">
                <div className="border-bottom pb-3 mb-3">
                  <div className="row align-items-center">
                    <div className="col-7">
                      <div>
                        <span className="fs-14 fw-normal text-truncate mb-1">Total Subscribers</span>
                        <h5>{stats.totalSubscribers}</h5>
                      </div>
                    </div>
                    <div className="col-5">
                      <div>
                        <span className="subscription-line-2" data-width="100%">6,2,8,4,3,8,1,3,6,5,9,2,8,1,4,8,9,8,2,1</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                    <span className="text-primary fs-12 d-flex align-items-center me-1">
                      <i className="ti ti-arrow-wave-right-up me-1"></i>+19.01%</span>from
                    last week
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-body">
                <div className="border-bottom pb-3 mb-3">
                  <div className="row align-items-center">
                    <div className="col-7">
                      <div>
                        <span className="fs-14 fw-normal text-truncate mb-1">Active Subscribers</span>
                        <h5>{stats.activeSubscribers}</h5>
                      </div>
                    </div>
                    <div className="col-5">
                      <div>
                        <span className="subscription-line-3" data-width="100%">6,2,8,4,3,8,1,3,6,5,9,2,8,1,4,8,9,8,2,1</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                    <span className="text-primary fs-12 d-flex align-items-center me-1">
                      <i className="ti ti-arrow-wave-right-up me-1"></i>+19.01%</span>from
                    last week
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-body">
                <div className="border-bottom pb-3 mb-3">
                  <div className="row align-items-center">
                    <div className="col-7">
                      <div>
                        <span className="fs-14 fw-normal text-truncate mb-1">Expired Subscribers</span>
                        <h5>{stats.expiredSubscribers}</h5>
                      </div>
                    </div>
                    <div className="col-5">
                      <div>
                        <span className="subscription-line-4" data-width="100%">6,2,8,4,3,8,1,3,6,5,9,2,8,1,4,8,9,8,2,1</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                    <span className="text-primary fs-12 d-flex align-items-center me-1">
                      <i className="ti ti-arrow-wave-right-up me-1"></i>+19.01%</span>from
                    last week
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subscribers Table */}
        <div className="card">
          <div className="card-body p-0">
            <div className="custom-datatable-filter table-responsive">
              <table className="table datatable">
                <thead className="thead-light">
                  <tr>
                    <th className="no-sort">
                      <div className="form-check form-check-md">
                        <input className="form-check-input" type="checkbox" id="select-all" />
                      </div>
                    </th>
                    <th>Subscriber</th>
                    <th>Plan</th>
                    <th>Billing Cycle</th>
                    <th>Payment Method</th>
                    <th>Amount</th>
                    <th>Created Date</th>
                    <th>Expiring On</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {subscribersData.map((subscriber) => (
                    <tr key={subscriber.id}>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center file-name-icon">
                          <a href="#" className="avatar avatar-md border rounded-circle">
                            <img src={subscriber.logo} className="img-fluid" alt="img" />
                          </a>
                          <div className="ms-2">
                            <h6 className="fw-medium"><a href="#">{subscriber.company}</a></h6>
                          </div>
                        </div>
                      </td>
                      <td>{subscriber.plan}</td>
                      <td>{subscriber.billingCycle}</td>
                      <td>{subscriber.paymentMethod}</td>
                      <td>{subscriber.amount}</td>
                      <td>{subscriber.createdDate}</td>
                      <td>{subscriber.expiringOn}</td>
                      <td>
                        <span className={`badge badge-${subscriber.statusClass} d-flex align-items-center badge-xs`}>
                          <i className="ti ti-point-filled me-1"></i>{subscriber.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-icon d-inline-flex">
                          <a href="#" className="me-2" onClick={toggleInvoiceModal}><i className="ti ti-file-invoice"></i></a>
                          <a href="#" className="me-2"><i className="ti ti-download"></i></a>
                          <a href="#" onClick={toggleDeleteModal}><i className="ti ti-trash text-danger"></i></a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* View Invoice Modal */}
        {showInvoiceModal && (
          <div className="modal fade show" id="view_invoice" style={{ display: 'block', paddingRight: '17px' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-body p-5">
                  <div className="row justify-content-between align-items-center mb-3">
                    <div className="col-md-6">
                      <div className="mb-4">
                        <img src={logo} className="img-fluid" alt="logo" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="text-end mb-3">
                        <h5 className="text-dark mb-1">Invoice</h5>
                        <p className="mb-1 fw-normal"><i className="ti ti-file-invoice me-1"></i>INV0287</p>
                        <p className="mb-1 fw-normal"><i className="ti ti-calendar me-1"></i>Issue date : 12 Sep 2024</p>
                        <p className="fw-normal"><i className="ti ti-calendar me-1"></i>Due date : 12 Oct 2024</p>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3 d-flex justify-content-between">
                    <div className="col-md-7">
                      <p className="text-dark mb-2 fw-medium fs-16">Invoice From :</p>
                      <div>
                        <p className="mb-1">SmartHR</p>
                        <p className="mb-1">367 Hillcrest Lane, Irvine, California, United States</p>
                        <p className="mb-1"><a href="mailto:info@example.com" className="__cf_email__">[email&#160;protected]</a></p>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <p className="text-dark mb-2 fw-medium fs-16">Invoice To :</p>
                      <div>
                        <p className="mb-1">BrightWave Innovations</p>
                        <p className="mb-1">367 Hillcrest Lane, Irvine, California, United States</p>
                        <p className="mb-1"><a href="mailto:info@example.com" className="__cf_email__">[email&#160;protected]</a></p>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="table-responsive mb-3">
                      <table className="table">
                        <thead className="thead-light">
                          <tr>
                            <th>Plan</th>
                            <th>Billing Cycle</th>
                            <th>Created Date</th>
                            <th>Expiring On</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Advanced (Monthly)</td>
                            <td>30 Days</td>
                            <td>12 Sep 2024</td>
                            <td>12 Oct 2024</td>
                            <td>$200</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="row mb-3 d-flex justify-content-between">
                    <div className="col-md-4">
                      <div>
                        <h6 className="mb-4">Payment info:</h6>
                        <p className="mb-0">Credit Card - 123***********789</p>
                        <div className="d-flex justify-content-between align-items-center mb-2 pe-3">
                          <p className="mb-0">Amount</p>
                          <p className="text-dark fw-medium mb-2">$200.00</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex justify-content-between align-items-center pe-3">
                        <p className="text-dark fw-medium mb-0">Sub Total</p>
                        <p className="mb-2">$200.00</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center pe-3">
                        <p className="text-dark fw-medium mb-0">Tax</p>
                        <p className="mb-2">$0.00</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center pe-3">
                        <p className="text-dark fw-medium mb-0">Total</p>
                        <p className="text-dark fw-medium mb-2">$200.00</p>
                      </div>
                    </div>
                  </div>
                  <div className="card border mb-0">
                    <div className="card-body">
                      <p className="text-dark fw-medium mb-2">Terms & Conditions:</p>
                      <p className="fs-12 fw-normal d-flex align-items-baseline mb-2"><i className="ti ti-point-filled text-primary me-1"></i>All payments must be made according to the agreed schedule. Late payments may incur additional fees.</p>
                      <p className="fs-12 fw-normal d-flex align-items-baseline"><i className="ti ti-point-filled text-primary me-1"></i>We are not liable for any indirect, incidental, or consequential damages, including loss of profits, revenue, or data.</p>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={toggleInvoiceModal}>Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="modal fade show" id="delete_modal" style={{ display: 'block', paddingRight: '17px' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <span className="avatar avatar-xl bg-transparent-danger text-danger mb-3">
                    <i className="ti ti-trash text-danger-x fs-36"></i>
                  </span>
                  <h4 className="mb-1">Confirm Delete</h4>
                  <p className="mb-3">You want to delete all the marked items, this cant be undone once you delete.</p>
                  <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-light me-3" onClick={toggleDeleteModal}>Cancel</button>
                    <button type="button" className="btn btn-danger">Yes, Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Backdrop for modals */}
        {(showInvoiceModal || showDeleteModal) && (
          <div className="modal-backdrop fade show"></div>
        )}
      </div>
      <AdminFooter />
    </>
  );
};

export default AdminSubscribers;