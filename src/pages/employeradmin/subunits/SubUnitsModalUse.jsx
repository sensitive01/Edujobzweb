import React, { useState } from 'react';

// Import company logos
import company01 from '../../../assets/employer-admin/assets/img/company/company-01.svg';
import company02 from '../../../assets/employer-admin/assets/img/company/company-02.svg';
import company03 from '../../../assets/employer-admin/assets/img/company/company-03.svg';
import company04 from '../../../assets/employer-admin/assets/img/company/company-04.svg';
import company05 from '../../../assets/employer-admin/assets/img/company/company-05.svg';
import company06 from '../../../assets/employer-admin/assets/img/company/company-06.svg';
import company07 from '../../../assets/employer-admin/assets/img/company/company-07.svg';
import company08 from '../../../assets/employer-admin/assets/img/company/company-08.svg';

// Import profile avatars
import avatar01 from '../../../assets/employer-admin/assets/img/profiles/avatar-01.jpg'
import avatar02 from '../../../assets/employer-admin/assets/img/profiles/avatar-02.jpg';
import avatar03 from '../../../assets/employer-admin/assets/img/profiles/avatar-03.jpg';
import avatar04 from '../../../assets/employer-admin/assets/img/profiles/avatar-03.jpg';
import avatar05 from '../../../assets/employer-admin/assets/img/profiles/avatar-05.jpg';
import avatar06 from '../../../assets/employer-admin/assets/img/profiles/avatar-06.jpg';
import avatar07 from '../../../assets/employer-admin/assets/img/profiles/avatar-07.jpg';
import avatar08 from '../../../assets/employer-admin/assets/img/profiles/avatar-08.jpg';
import avatar09 from '../../../assets/employer-admin/assets/img/profiles/avatar-09.jpg';
import avatar10 from '../../../assets/employer-admin/assets/img/profiles/avatar-11.jpg';
import avatar11 from '../../../assets/employer-admin/assets/img/profiles/avatar-11.jpg';
import avatar12 from '../../../assets/employer-admin/assets/img/profiles/avatar-12.jpg';
import avatar13 from '../../../assets/employer-admin/assets/img/profiles/avatar-13.jpg';
import avatar14 from '../../../assets/employer-admin/assets/img/profiles/avatar-14.jpg';
import avatar15 from '../../../assets/employer-admin/assets/img/profiles/avatar-15.jpg';
import avatar16 from '../../../assets/employer-admin/assets/img/profiles/avatar-16.jpg';
import avatar17 from '../../../assets/employer-admin/assets/img/profiles/avatar-17.jpg';
import avatar18 from '../../../assets/employer-admin/assets/img/profiles/avatar-18.jpg';
import avatar19 from '../../../assets/employer-admin/assets/img/profiles/avatar-19.jpg';
import avatar20 from '../../../assets/employer-admin/assets/img/profiles/avatar-29.jpg';
import avatar21 from '../../../assets/employer-admin/assets/img/profiles/avatar-27.jpg';
import avatar22 from '../../../assets/employer-admin/assets/img/profiles/avatar-25.jpg';
import avatar23 from '../../../assets/employer-admin/assets/img/profiles/avatar-23.jpg';
import avatar24 from '../../../assets/employer-admin/assets/img/profiles/avatar-24.jpg';
import avatar25 from '../../../assets/employer-admin/assets/img/profiles/avatar-25.jpg';
import avatar26 from '../../../assets/employer-admin/assets/img/profiles/avatar-23.jpg';
import avatar27 from '../../../assets/employer-admin/assets/img/profiles/avatar-27.jpg';
import avatar28 from '../../../assets/employer-admin/assets/img/profiles/avatar-29.jpg';
import avatar29 from '../../../assets/employer-admin/assets/img/profiles/avatar-29.jpg';
import avatar30 from '../../../assets/employer-admin/assets/img/profiles/avatar-30.jpg';
import EmployerAdminHeader from '../Layout/EmployerAdminHeader';
import EmployerAdminFooter from '../Layout/EmployerAdminFooter';
import AddUnitModal from './Modals/AddUnitModal';
import EditUnitModal from './Modals/EditUnitModal';
import DeleteConfirmationModal from './Modals/DeleteConfirmationModal';
import UnitDetailModal from './Modals/UnitDetailModal';
import UpgradePackageModal from './Modals/UpgradePackageModal';

const SubUnitsModalUse = () => {
  const [showAddUnitModal, setShowAddUnitModal] = useState(false);
  const [showEditUnitModal, setShowEditUnitModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showUnitDetail, setShowUnitDetail] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const units = [
    {
      id: 1,
      name: "Unit1",
      image: company01,
      email: "email@school.com",
      phone: "(163) 2459 315",
      location: "Mysuru",
      rating: 4.2,
      members: [avatar05, avatar06, avatar07, avatar08, avatar09]
    },
    {
      id: 2,
      name: "Unit2",
      image: company02,
      email: "email@school.com",
      phone: "(146) 1249 296",
      location: "Mysuru",
      rating: 5.0,
      members: [avatar01, avatar02, avatar03, avatar04, avatar05]
    },
    {
      id: 3,
      name: "Unit3",
      image: company03,
      email: "email@school.com",
      phone: "(158) 3459 596",
      location: "Mysuru",
      rating: 4.5,
      members: [avatar06, avatar07, avatar03, avatar04, avatar05]
    },
    {
      id: 4,
      name: "Unit4",
      image: company04,
      email: "email@school.com",
      phone: "(135) 3489 516",
      location: "Mysuru",
      rating: 4.5,
      members: [avatar08, avatar09, avatar10, avatar11, avatar12]
    },
    {
      id: 5,
      name: "Unit5",
      image: company05,
      email: "email@school.com",
      phone: "(196) 4862 196",
      location: "Bengaluru",
      rating: 3.0,
      members: [avatar13, avatar14, avatar15, avatar16, avatar17]
    },
    {
      id: 6,
      name: "Unit6",
      image: company06,
      email: "email@school.com",
      phone: "(163) 6498 256",
      location: "Bengaluru",
      rating: 5.0,
      members: [avatar18, avatar19, avatar20, avatar21, avatar22]
    },
    {
      id: 7,
      name: "Unit7",
      image: company07,
      email: "email@school.com",
      phone: "(154) 6481 075",
      location: "Bengaluru",
      rating: 3.5,
      members: [avatar23, avatar24, avatar25, avatar26, avatar27]
    },
    {
      id: 8,
      name: "Unit8",
      image: company08,
      email: "email@school.com",
      phone: "(184) 6348 195",
      location: "Bengaluru",
      rating: 4.5,
      members: [avatar28, avatar29, avatar30, avatar01, avatar02]
    }
  ];

  return (
    <>
      <EmployerAdminHeader />
      <div className="content m-2">
        {/* Breadcrumb */}
        <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
          <div className="my-auto">
            <h2>Units</h2>
          </div>
          <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
            <div className="me-2">
              <div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
                <a href="/employer-admin/units" className="btn btn-icon btn-sm me-1">
                  <i className="ti ti-search"></i>
                </a>
                <a href="/employer-admin/units" className="btn btn-icon btn-sm me-1">
                  <i className="ti ti-list-tree"></i>
                </a>
                <a href="/employer-admin/units-grid" className="btn btn-icon btn-sm active bg-primary text-white">
                  <i className="ti ti-layout-grid"></i>
                </a>
              </div>
            </div>
            <div className="me-2">
              <div className="dropdown">
                <a href="javascript:void(0);" className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                  <i className="ti ti-file-export me-1"></i>Export
                </a>
                <ul className="dropdown-menu dropdown-menu-end p-3">
                  <li>
                    <a href="javascript:void(0);" className="dropdown-item rounded-1">
                      <i className="ti ti-file-type-pdf me-1"></i>Export as PDF
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0);" className="dropdown-item rounded-1">
                      <i className="ti ti-file-type-xls me-1"></i>Export as Excel
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="me-2">
              <button
                onClick={() => setShowAddUnitModal(true)}
                className="btn btn-primary d-flex align-items-center"
              >
                <i className="ti ti-circle-plus me-2"></i>Add New Unit
              </button>
            </div>
            <div className="dropdown">
              <a href="javascript:void(0);" className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center " data-bs-toggle="dropdown"  style={{fontSize: '15px', paddingTop:'8px', paddingBottom: '8px'}}>
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
          </div>
        </div>
        {/* /Breadcrumb */}

        <div className="row">
          {units.map((unit) => (
            <div key={unit.id} className="col-xl-3 col-lg-4 col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="form-check form-check-md">
                      <input className="form-check-input" type="checkbox" />
                    </div>
                    <div>
                      <a href="/employer-admin/school-details" className="avatar avatar-xl avatar-rounded online border rounded-circle">
                        <img src={unit.image} className="img-fluid h-auto w-auto" alt="img" />
                      </a>
                    </div>
                    <div className="dropdown">
                      <button className="btn btn-icon btn-sm rounded-circle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="ti ti-dots-vertical"></i>
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end p-3">
                        <li>
                          <a className="dropdown-item rounded-1" onClick={() => setShowUnitDetail(true)}>
                            <i className="ti ti-eye me-1"></i>View Details
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item rounded-1"  onClick={() => setShowUpgradeModal(true)}>
                            <i className="ti ti-arrow-up me-1"></i>Upgrade
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item rounded-1" onClick={() => setShowEditUnitModal(true)}>
                            <i className="ti ti-edit me-1"></i>Edit
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item rounded-1" onClick={() => setItemToDelete(true)}>
                            <i className="ti ti-trash text-danger text-danger me-1"></i>Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="text-center mb-3">
                    <h6 className="mb-1">
                      <a href="/employer-admin/school-details">{unit.name}</a>
                    </h6>
                    <div className="avatar-list-stacked avatar-group-sm">
                      {unit.members.slice(0, 5).map((member, index) => (
                        <span key={index} className="avatar avatar-rounded">
                          <img className="border border-white" src={member} alt={`Member ${index + 1}`} />
                        </span>
                      ))}
                      {unit.members.length > 5 && (
                        <span className="avatar bg-primary avatar-rounded text-fixed-white fs-12">
                          +{unit.members.length - 5}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="d-flex flex-column">
                    <p className="text-dark d-inline-flex align-items-center mb-2">
                      <i className="ti ti-mail text-danger-forward text-gray-5 me-2"></i>
                      <a href="" className="__cf_email__" data-cfemail={unit.email}>
                        {unit.email}
                      </a>
                    </p>
                    <p className="text-dark d-inline-flex align-items-center mb-2">
                      <i className="ti ti-phone text-gray-5 me-2"></i>
                      {unit.phone}
                    </p>
                    <p className="text-dark d-inline-flex align-items-center">
                      <i className="ti ti-map-pin text-gray-5 me-2"></i>
                      {unit.location}
                    </p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between border-top bg-light p-3 mt-3">
                    <div className="icons-social d-flex align-items-center">
                      <a href="#" className="avatar avatar-rounded avatar-sm me-1">
                        <i className="ti ti-mail text-danger"></i>
                      </a>
                      <a href="#" className="avatar avatar-rounded avatar-sm me-1">
                        <i className="ti ti-phone-call text-success"></i>
                      </a>
                      <a href="#" className="avatar avatar-rounded avatar-sm me-1">
                        <i className="ti ti-message-2"></i>
                      </a>
                      <a href="#" className="avatar avatar-rounded avatar-sm me-1">
                        <i className="ti ti-brand-skype"></i>
                      </a>
                      <a href="#" className="avatar avatar-rounded avatar-sm">
                        <i className="ti ti-brand-facebook"></i>
                      </a>
                    </div>
                    <span className="d-inline-flex align-items-center">
                      <i className="ti ti-star-filled text-warning me-1"></i>
                      {unit.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mb-4">
          <a href="#" className="btn btn-white border">
            <i className="ti ti-loader-3 text-primary me-2"></i>Load More
          </a>
        </div>
        <AddUnitModal
          show={showAddUnitModal}
          onClose={() => setShowAddUnitModal(false)}
        />
        <UnitDetailModal
          show={showUnitDetail}
          onClose={() => setShowUnitDetail(false)}
        />
        <UpgradePackageModal
          show={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
        />
        <EditUnitModal
          show={showEditUnitModal}
          onClose={() => setShowEditUnitModal(false)}
        />
        <DeleteConfirmationModal
          show={itemToDelete}
          onClose={() => setItemToDelete(false)}
        />
      </div>
      <EmployerAdminFooter />
    </>
  );
};

export default SubUnitsModalUse;