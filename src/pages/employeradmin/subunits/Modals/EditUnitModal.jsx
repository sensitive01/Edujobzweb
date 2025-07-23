
// import React, { useState } from 'react';
// import AddPositionsModal from './AddPositionsModal';
// import AddAccessModal from './AddAccessModal';
// import EditAccessModal from './EditAccessModal';
// import AccessModal from './AccessModal';
// import EditStageModal from './EditStageModal';
// import AddStageModal from './AddStageModal ';
// import AddUserModal from './AddUserModal';


// const EditUnitModal = ({ show, onClose }) => {
//     const [activeTab, setActiveTab] = useState('basic-info');
//     const [showPositionsModal, setShowPositionsModal] = useState(false);
//     const [showAccessModal, setShowAccessModal] = useState(false);
//     const [showAddAccessModal, setShowAddAccessModal] = useState(false);
//     const [showEditAccessModal, setShowEditAccessModal] = useState(false);
//     const [showStageModal, setShowStageModal] = useState(false);
//     const [showEditStageModal, setShowEditStageModal] = useState(false); 
//     const [showAddUserModal, setShowAddUserModal] = useState(false);

   
//     const [formData, setFormData] = useState({
//         name: 'Example Unit',
//         email: 'darlee@example.com',
//         phone: '(146) 1249 296',
//         phone2: '(146) 1249 321',
//         fax: '',
//         website: '',
//         reviews: '4.5',
//         owner: 'Hendry Milner',
//         tags: 'Collab',
//         positions: 'Collins',
//         industry: 'Retail Industry',
//         source: 'Social Media',
//         currency: 'Dollar',
//         language: 'English',
//         about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam nisi numquam vitae consequatur impedit rem laboriosam iusto sapiente ex mollitia voluptate ullam laudantium, vel atque ducimus blanditiis magni perspiciatis nulla.',
//         users: ['Sharon Roy', 'Vaughan'],
//         address: '',
//         country: 'USA',
//         state: 'California',
//         city: 'Los Angeles',
//         zipcode: '',
//         facebook: '',
//         twitter: '',
//         linkedin: '',
//         skype: '',
//         whatsapp: '',
//         instagram: '',
//         visibility: 'private',
//         status: ''
//     });
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(formData);
//         onClose();
//     };

//     if (!show) {
//         return null;
//     }

//     return (
//         <>
//             {/* Main Edit Unit Modal */}
//            <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
//                 <div className="modal-dialog modal-dialog-centered modal-lg">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h4 className="modal-title">Edit New Unit</h4>
//                             <button
//                                 type="button"
//                                 className="btn-close custom-btn-close"
//                                 onClick={onClose}
//                                 aria-label="Close"
//                             >
//                                 <i className="ti ti-x"></i>
//                             </button>
//                         </div>

//                         <form onSubmit={handleSubmit}>
//                             <div className="contact-grids-tab">
//                                 <ul className="nav nav-underline" id="myTab2" role="tablist">
//                                     <li className="nav-item" role="presentation">
//                                         <button
//                                             className={`nav-link ${activeTab === 'basic-info' ? 'active' : ''}`}
//                                             onClick={() => setActiveTab('basic-info')}
//                                             type="button"
//                                         >
//                                             Basic Information
//                                         </button>
//                                     </li>
//                                     <li className="nav-item" role="presentation">
//                                         <button
//                                             className={`nav-link ${activeTab === 'address' ? 'active' : ''}`}
//                                             onClick={() => setActiveTab('address')}
//                                             type="button"
//                                         >
//                                             Address
//                                         </button>
//                                     </li>
//                                     <li className="nav-item" role="presentation">
//                                         <button
//                                             className={`nav-link ${activeTab === 'social-profile' ? 'active' : ''}`}
//                                             onClick={() => setActiveTab('social-profile')}
//                                             type="button"
//                                         >
//                                             Social Profiles
//                                         </button>
//                                     </li>
//                                     <li className="nav-item" role="presentation">
//                                         <button
//                                             className={`nav-link ${activeTab === 'access' ? 'active' : ''}`}
//                                             onClick={() => setActiveTab('access')}
//                                             type="button"
//                                         >
//                                             Access
//                                         </button>
//                                     </li>
//                                 </ul>
//                             </div>

//                             <div className="tab-content" id="myTabContent2">
//                                 {/* Basic Info Tab */}
//                                 <div className={`tab-pane fade ${activeTab === 'basic-info' ? 'show active' : ''}`} id="basic-info2" role="tabpanel" aria-labelledby="info-tab2" tabIndex="0">
//                                     <div className="modal-body pb-0">
//                                         <div className="row">
//                                             <div className="col-md-12">
//                                                 <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
//                                                     <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
//                                                         <img src="assets/img/profiles/avatar-30.jpg" alt="img" className="rounded-circle" />
//                                                     </div>
//                                                     <div className="profile-upload">
//                                                         <div className="mb-2">
//                                                             <h6 className="mb-1">Upload Profile Image</h6>
//                                                             <p className="fs-12">Image should be below 4 mb</p>
//                                                         </div>
//                                                         <div className="profile-uploader d-flex align-items-center">
//                                                             <div className="drag-upload-btn btn btn-sm btn-primary me-2">
//                                                                 Upload
//                                                                 <input type="file" className="form-control image-sign" multiple />
//                                                             </div>
//                                                             <button type="button" className="btn btn-light btn-sm">Cancel</button>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label className="form-label">Unit Name <span className="text-danger">*</span></label>
//                                                     <input
//                                                         type="text"
//                                                         className="form-control"
//                                                         value={formData.name}
//                                                         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label className="form-label">Email</label>
//                                                     <input
//                                                         type="text"
//                                                         className="form-control"
//                                                         value={formData.email}
//                                                         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label className="form-label">Phone Number <span className="text-danger">*</span></label>
//                                                     <input
//                                                         type="text"
//                                                         className="form-control"
//                                                         value={formData.phone}
//                                                         onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label className="form-label">Phone Number 2</label>
//                                                     <input
//                                                         type="text"
//                                                         className="form-control"
//                                                         value={formData.phone2}
//                                                         onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label className="form-label">Fax</label>
//                                                     <input
//                                                         type="text"
//                                                         className="form-control"
//                                                         value={formData.fax}
//                                                         onChange={(e) => setFormData({ ...formData, fax: e.target.value })}
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label className="form-label">Website</label>
//                                                     <input
//                                                         type="text"
//                                                         className="form-control"
//                                                         value={formData.website}
//                                                         onChange={(e) => setFormData({ ...formData, website: e.target.value })}
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label className="form-label">Reviews <span className="text-danger">*</span></label>
//                                                     <input
//                                                         type="text"
//                                                         className="form-control"
//                                                         value={formData.reviews}
//                                                         onChange={(e) => setFormData({ ...formData, reviews: e.target.value })}
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label className="form-label">Owner <span className="text-danger">*</span></label>
//                                                     <select
//                                                         className="form-select"
//                                                         value={formData.owner}
//                                                         onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
//                                                     >
//                                                         <option>Select</option>
//                                                         <option selected>Hendry Milner</option>
//                                                         <option>Guilory Berggren</option>
//                                                         <option>Jami Carlile</option>
//                                                     </select>
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label className="form-label">Tags <span className="text-danger">*</span> </label>
//                                                     <input
//                                                         className="form-control"
//                                                         placeholder="Add new"
//                                                         type="text"
//                                                         name="Label"
//                                                         value={formData.tags}
//                                                         onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <div className="d-flex justify-content-between align-items-center mb-2">
//                                                         <label className="col-form-label p-0">Positions <span className="text-danger">*</span></label>
//                                                         <button
//                                                             type="button"
//                                                             className="add-new text-primary"
//                                                             onClick={() => setShowPositionsModal(true)}
//                                                         >
//                                                             <i className="ti ti-plus text-primary me-1"></i>Add New
//                                                         </button>
//                                                     </div>
//                                                     <select
//                                                         className="form-select"
//                                                         value={formData.positions}
//                                                         onChange={(e) => setFormData({ ...formData, positions: e.target.value })}
//                                                     >
//                                                         <option>Select</option>
//                                                         <option selected>Collins</option>
//                                                         <option>Konopelski</option>
//                                                         <option>Adams</option>
//                                                     </select>
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label className="form-label">Industry <span className="text-danger">*</span></label>
//                                                     <select
//                                                         className="form-select"
//                                                         value={formData.industry}
//                                                         onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
//                                                     >
//                                                         <option>Select</option>
//                                                         <option selected>Retail Industry</option>
//                                                         <option>Banking</option>
//                                                         <option>Hotels</option>
//                                                         <option>Financial Services</option>
//                                                         <option>Insurance</option>
//                                                     </select>
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label className="form-label">Source <span className="text-danger">*</span> </label>
//                                                     <select
//                                                         className="form-select"
//                                                         value={formData.source}
//                                                         onChange={(e) => setFormData({ ...formData, source: e.target.value })}
//                                                     >
//                                                         <option>Select</option>
//                                                         <option>Phone Calls</option>
//                                                         <option selected>Social Media</option>
//                                                         <option>Refferal Sites</option>
//                                                         <option>Web Analytics</option>
//                                                         <option>Previous Purchase</option>
//                                                     </select>
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label className="form-label">Currency <span className="text-danger">*</span></label>
//                                                     <select
//                                                         className="form-select"
//                                                         value={formData.currency}
//                                                         onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
//                                                     >
//                                                         <option>Select</option>
//                                                         <option selected>Dollar</option>
//                                                         <option>Euro</option>
//                                                     </select>
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label className="form-label">Language <span className="text-danger">*</span></label>
//                                                     <select
//                                                         className="form-select"
//                                                         value={formData.language}
//                                                         onChange={(e) => setFormData({ ...formData, language: e.target.value })}
//                                                     >
//                                                         <option>Select</option>
//                                                         <option selected>English</option>
//                                                         <option>Arabic</option>
//                                                     </select>
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-12">
//                                                 <div className="mb-3">
//                                                     <label className="form-label">About <span className="text-danger">*</span></label>
//                                                     <textarea
//                                                         className="form-control"
//                                                         value={formData.about}
//                                                         onChange={(e) => setFormData({ ...formData, about: e.target.value })}
//                                                     ></textarea>
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-12">
//                                                 <div className="mb-3">
//                                                     <div className="d-flex justify-content-between align-items-center mb-2">
//                                                         <label className="col-form-label p-0">User <span className="text-danger">*</span></label>
//                                                         <button
//                                                             type="button"
//                                                             className="add-new text-primary"
//                                                             onClick={() => setShowAddUserModal(true)}
//                                                         >
//                                                             <i className="ti ti-plus text-primary me-1"></i>Add New
//                                                         </button>
//                                                     </div>
//                                                     <select
//                                                         className="form-select"
//                                                         multiple
//                                                         value={formData.users}
//                                                         onChange={(e) => {
//                                                             const options = [...e.target.selectedOptions].map(opt => opt.value);
//                                                             setFormData({ ...formData, users: options });
//                                                         }}
//                                                     >
//                                                         <option>Darlee Robertson</option>
//                                                         <option selected>Sharon Roy</option>
//                                                         <option selected>Vaughan</option>
//                                                         <option>Jessica</option>
//                                                         <option>Carol Thomas</option>
//                                                     </select>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="modal-footer">
//                                         <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
//                                         <button type="submit" className="btn btn-primary">Save</button>
//                                     </div>
//                                 </div>

//                                 {/* Address Tab */}
//                                 <div className={`tab-pane fade ${activeTab === 'address' ? 'show active' : ''}`} id="address2" role="tabpanel" aria-labelledby="address-tab2" tabIndex="0">
//                                     <div className="modal-body pb-0">
//                                         <div className="row">
//                                             <div className="col-md-12">
//                                                 <div className="mb-3">
//                                                     <label className="form-label">Address <span className="text-danger">*</span></label>
//                                                     <input
//                                                         type="text"
//                                                         className="form-control"
//                                                         value={formData.address}
//                                                         onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label className="form-label">Country <span className="text-danger"> *</span></label>
//                                                     <select
//                                                         className="form-select"
//                                                         value={formData.country}
//                                                         onChange={(e) => setFormData({ ...formData, country: e.target.value })}
//                                                     >
//                                                         <option>Select</option>
//                                                         <option selected>USA</option>
//                                                         <option>Canada</option>
//                                                         <option>Germany</option>
//                                                         <option>France</option>
//                                                     </select>
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label className="form-label">State <span className="text-danger"> *</span></label>
//                                                     <select
//                                                         className="form-select"
//                                                         value={formData.state}
//                                                         onChange={(e) => setFormData({ ...formData, state: e.target.value })}
//                                                     >
//                                                         <option>Select</option>
//                                                         <option selected>California</option>
//                                                         <option>New York</option>
//                                                         <option>Texas</option>
//                                                         <option>Florida</option>
//                                                     </select>
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label className="form-label">City <span className="text-danger"> *</span></label>
//                                                     <select
//                                                         className="form-select"
//                                                         value={formData.city}
//                                                         onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//                                                     >
//                                                         <option>Select</option>
//                                                         <option selected>Los Angeles</option>
//                                                         <option>San Diego</option>
//                                                         <option>Fresno</option>
//                                                         <option>San Francisco</option>
//                                                     </select>
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label className="form-label">Zipcode  <span className="text-danger">*</span></label>
//                                                     <input
//                                                         type="text"
//                                                         className="form-control"
//                                                         value={formData.zipcode}
//                                                         onChange={(e) => setFormData({ ...formData, zipcode: e.target.value })}
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="modal-footer">
//                                         <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
//                                         <button type="submit" className="btn btn-primary">Save</button>
//                                     </div>
//                                 </div>

//                                 {/* Social Profiles Tab */}
//                                 <div className={`tab-pane fade ${activeTab === 'social-profile' ? 'show active' : ''}`} id="social-profile2" role="tabpanel" aria-labelledby="social-profile-tab2" tabIndex="0">
//                                     <div className="modal-body pb-0">
//                                         <div className="row">
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label className="form-label">Facebook</label>
//                                                     <input
//                                                         type="text"
//                                                         className="form-control"
//                                                         value={formData.facebook}
//                                                         onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label className="form-label">Twitter</label>
//                                                     <input
//                                                         type="email"
//                                                         className="form-control"
//                                                         value={formData.twitter}
//                                                         onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label className="form-label">LinkedIn</label>
//                                                     <input
//                                                         type="email"
//                                                         className="form-control"
//                                                         value={formData.linkedin}
//                                                         onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label className="form-label">Skype</label>
//                                                     <input
//                                                         type="email"
//                                                         className="form-control"
//                                                         value={formData.skype}
//                                                         onChange={(e) => setFormData({ ...formData, skype: e.target.value })}
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label className="form-label">Whatsapp</label>
//                                                     <input
//                                                         type="email"
//                                                         className="form-control"
//                                                         value={formData.whatsapp}
//                                                         onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label className="form-label">Instagram</label>
//                                                     <input
//                                                         type="email"
//                                                         className="form-control"
//                                                         value={formData.instagram}
//                                                         onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="modal-footer">
//                                         <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
//                                         <button type="submit" className="btn btn-primary">Save</button>
//                                     </div>
//                                 </div>

//                                 {/* Access Tab */}
//                                 <div className={`tab-pane fade ${activeTab === 'access' ? 'show active' : ''}`} id="access2" role="tabpanel" aria-labelledby="access-tab2" tabIndex="0">
//                                     <div className="modal-body pb-0">
//                                         <div className="mb-4">
//                                             <h6 className="fs-14 fw-medium mb-1">Visibility</h6>
//                                             <div className="d-flex align-items-center">
//                                                 <div className="form-check me-3">
//                                                     <input
//                                                         className="form-check-input"
//                                                         type="radio"
//                                                         name="flexRadioDefault"
//                                                         id="flexRadioDefault11"
//                                                         checked={formData.visibility === 'public'}
//                                                         onChange={() => setFormData({ ...formData, visibility: 'public' })}
//                                                     />
//                                                     <label className="form-check-label text-dark" htmlFor="flexRadioDefault11">
//                                                         Public
//                                                     </label>
//                                                 </div>
//                                                 <div className="form-check me-3">
//                                                     <input
//                                                         className="form-check-input"
//                                                         type="radio"
//                                                         name="flexRadioDefault"
//                                                         id="flexRadioDefault21"
//                                                         checked={formData.visibility === 'private'}
//                                                         onChange={() => setFormData({ ...formData, visibility: 'private' })}
//                                                     />
//                                                     <label className="form-check-label text-dark" htmlFor="flexRadioDefault21">
//                                                         Private
//                                                     </label>
//                                                 </div>
//                                                 <div className="form-check">
//                                                     <input
//                                                         className="form-check-input"
//                                                         type="radio"
//                                                         name="flexRadioDefault"
//                                                         id="flexRadioDefault31"
//                                                         checked={formData.visibility === 'select-people'}
//                                                         onChange={() => setFormData({ ...formData, visibility: 'select-people' })}
//                                                     />
//                                                     <label className="form-check-label text-dark" htmlFor="flexRadioDefault31">
//                                                         Select People
//                                                     </label>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         {formData.visibility === 'select-people' && (
//                                             <div className="p-3 bg-gray br-5 mb-4">
//                                                 <div className="d-flex align-items-center mb-3">
//                                                     <input className="form-check-input me-1" type="checkbox" value="" id="user-006" />
//                                                     <div className="d-flex align-items-center file-name-icon">
//                                                         <a href="#" className="avatar avatar-md border avatar-rounded">
//                                                             <img src="assets/img/reports/user-01.jpg" className="img-fluid" alt="img" />
//                                                         </a>
//                                                         <div className="ms-2">
//                                                             <h6 className="fw-normal"><a href="#">Michael Walker</a></h6>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="d-flex align-items-center mb-3">
//                                                     <input className="form-check-input me-1" type="checkbox" value="" id="user-007" />
//                                                     <div className="d-flex align-items-center file-name-icon">
//                                                         <a href="#" className="avatar avatar-md border avatar-rounded">
//                                                             <img src="assets/img/reports/user-02.jpg" className="img-fluid" alt="img" />
//                                                         </a>
//                                                         <div className="ms-2">
//                                                             <h6 className="fw-normal"><a href="#">Sophie Headrick</a></h6>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="d-flex align-items-center mb-3">
//                                                     <input className="form-check-input me-1" type="checkbox" value="" id="user-008" />
//                                                     <div className="d-flex align-items-center file-name-icon">
//                                                         <a href="#" className="avatar avatar-md border avatar-rounded">
//                                                             <img src="assets/img/reports/user-03.jpg" className="img-fluid" alt="img" />
//                                                         </a>
//                                                         <div className="ms-2">
//                                                             <h6 className="fw-normal"><a href="#">Cameron Drake</a></h6>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="d-flex align-items-center mb-3">
//                                                     <input className="form-check-input me-1" type="checkbox" value="" id="user-009" />
//                                                     <div className="d-flex align-items-center file-name-icon">
//                                                         <a href="#" className="avatar avatar-md border avatar-rounded">
//                                                             <img src="assets/img/reports/user-04.jpg" className="img-fluid" alt="img" />
//                                                         </a>
//                                                         <div className="ms-2">
//                                                             <h6 className="fw-normal"><a href="#">Doris Crowley</a></h6>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="d-flex align-items-center mb-3">
//                                                     <input className="form-check-input me-1" type="checkbox" value="" id="user-100" />
//                                                     <div className="d-flex align-items-center file-name-icon">
//                                                         <a href="#" className="avatar avatar-md border avatar-rounded">
//                                                             <img src="assets/img/profiles/avatar-12.jpg" className="img-fluid" alt="img" />
//                                                         </a>
//                                                         <div className="ms-2">
//                                                             <h6 className="fw-normal"><a href="#">Thomas Bordelon</a></h6>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="d-flex align-items-center justify-content-center">
//                                                     <button type="button" className="btn btn-primary">Confirm</button>
//                                                 </div>
//                                             </div>
//                                         )}
//                                         <div className="mb-3">
//                                             <label className="form-label">Status</label>
//                                             <select
//                                                 className="form-select"
//                                                 value={formData.status}
//                                                 onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//                                             >
//                                                 <option>Select</option>
//                                                 <option>Active</option>
//                                                 <option>Inactive</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                     <div className="modal-footer">
//                                         <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
//                                         <button type="button" className="btn btn-primary">Save</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>

//             {/* Child Modals */}
//             <AddPositionsModal 
//                 show={showPositionsModal} 
//                 onClose={() => setShowPositionsModal(false)}
//                 onAddAccess={() => {
//                     setShowPositionsModal(false);
//                     setShowAddAccessModal(true);
//                 }}
//             />

//             <AddAccessModal
//                 show={showAddAccessModal}
//                 onClose={() => setShowAddAccessModal(false)}
//                 onAddStage={() => {
//                     setShowAddAccessModal(false);
//                     setShowStageModal(true);
//                 }}
//                 onEditStage={() => {
//                     setShowAddAccessModal(false);
//                     setShowEditStageModal(true);
//                 }}
//             />

//             <EditAccessModal
//                 show={showEditAccessModal}
//                 onClose={() => setShowEditAccessModal(false)}
//                 onAddStage={() => {
//                     setShowEditAccessModal(false);
//                     setShowStageModal(true);
//                 }}
//                 onEditStage={() => {
//                     setShowEditAccessModal(false);
//                     setShowEditStageModal(true);
//                 }}
//             />

//             <AccessModal
//                 show={showAccessModal}
//                 onClose={() => setShowAccessModal(false)}
//             />

//             <AddStageModal
//                 show={showStageModal}
//                 onClose={() => setShowStageModal(false)}
//             />

//             <EditStageModal
//                 show={showEditStageModal}
//                 onClose={() => setShowEditStageModal(false)}
//             />

//             <AddUserModal
//                 show={showAddUserModal}
//                 onClose={() => setShowAddUserModal(false)}
//                 onAddPositions={() => {
//                     setShowAddUserModal(false);
//                     setShowPositionsModal(true);
//                 }}
//             />
//         </>
//     );
// };

// export default EditUnitModal;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUnitModal = ({ show, onClose, unit, onSave }) => {
    const [activeTab, setActiveTab] = useState('basic-info');
    const [formData, setFormData] = useState({
        schoolName: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        institutionName: '',
        board: '',
        institutionType: '',
        website: '',
        userEmail: '',
        userMobile: '',
        employerType: '',
        userProfilePic: ''
    });

    useEffect(() => {
        if (unit && unit.originalData) {
            setFormData({
                schoolName: unit.originalData.schoolName || '',
                firstName: unit.originalData.firstName || '',
                lastName: unit.originalData.lastName || '',
                address: unit.originalData.address || '',
                city: unit.originalData.city || '',
                state: unit.originalData.state || '',
                pincode: unit.originalData.pincode || '',
                institutionName: unit.originalData.institutionName || '',
                board: unit.originalData.board || '',
                institutionType: unit.originalData.institutionType || '',
                website: unit.originalData.website || '',
                userEmail: unit.originalData.userEmail || '',
                userMobile: unit.originalData.userMobile || '',
                employerType: unit.originalData.employerType || '',
                userProfilePic: unit.originalData.userProfilePic || ''
            });
        }
    }, [unit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `https://edujobzbackend.onrender.com/employer/updateemployer/${unit.id}`,
                formData
            );
            
            if (response.data.success) {
                onSave(response.data.data);
                onClose();
            }
        } catch (error) {
            console.error('Error updating unit:', error);
        }
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Edit Unit</h4>
                        <button
                            type="button"
                            className="btn-close custom-btn-close"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            <i className="ti ti-x"></i>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="contact-grids-tab">
                            <ul className="nav nav-underline" id="myTab2" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={`nav-link ${activeTab === 'basic-info' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('basic-info')}
                                        type="button"
                                    >
                                        Basic Information
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={`nav-link ${activeTab === 'address' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('address')}
                                        type="button"
                                    >
                                        Address
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div className="tab-content" id="myTabContent2">
                            {/* Basic Info Tab */}
                            <div className={`tab-pane fade ${activeTab === 'basic-info' ? 'show active' : ''}`} id="basic-info2" role="tabpanel" aria-labelledby="info-tab2" tabIndex="0">
                                <div className="modal-body pb-0">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
                                                <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                                                    <img src={unit.image} alt="img" className="rounded-circle" />
                                                </div>
                                                <div className="profile-upload">
                                                    <div className="mb-2">
                                                        <h6 className="mb-1">Upload Profile Image</h6>
                                                        <p className="fs-12">Image should be below 4 mb</p>
                                                    </div>
                                                    <div className="profile-uploader d-flex align-items-center">
                                                        <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                                                            Upload
                                                            <input 
                                                                type="file" 
                                                                className="form-control image-sign" 
                                                                onChange={(e) => {
                                                                    if (e.target.files && e.target.files[0]) {
                                                                        setFormData({
                                                                            ...formData,
                                                                            userProfilePic: URL.createObjectURL(e.target.files[0])
                                                                        });
                                                                    }
                                                                }}
                                                            />
                                                        </div>
                                                        <button 
                                                            type="button" 
                                                            className="btn btn-light btn-sm"
                                                            onClick={() => setFormData({...formData, userProfilePic: ''})}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">School Name <span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="schoolName"
                                                    value={formData.schoolName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Institution Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="institutionName"
                                                    value={formData.institutionName}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">First Name <span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Last Name <span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Email <span className="text-danger">*</span></label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    name="userEmail"
                                                    value={formData.userEmail}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Mobile <span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="userMobile"
                                                    value={formData.userMobile}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Board</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="board"
                                                    value={formData.board}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Institution Type</label>
                                                <select
                                                    className="form-select"
                                                    name="institutionType"
                                                    value={formData.institutionType}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select</option>
                                                    <option value="School">School</option>
                                                    <option value="College">College</option>
                                                    <option value="University">University</option>
                                                    <option value="Coaching Center">Coaching Center</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Employer Type</label>
                                                <select
                                                    className="form-select"
                                                    name="employerType"
                                                    value={formData.employerType}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Teacher">Teacher</option>
                                                    <option value="Principal">Principal</option>
                                                    <option value="Administrator">Administrator</option>
                                                    <option value="HR">HR</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Website</label>
                                                <input
                                                    type="url"
                                                    className="form-control"
                                                    name="website"
                                                    value={formData.website}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </div>

                            {/* Address Tab */}
                            <div className={`tab-pane fade ${activeTab === 'address' ? 'show active' : ''}`} id="address2" role="tabpanel" aria-labelledby="address-tab2" tabIndex="0">
                                <div className="modal-body pb-0">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label className="form-label">Address <span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">City <span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">State <span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="state"
                                                    value={formData.state}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Pincode <span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="pincode"
                                                    value={formData.pincode}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUnitModal;