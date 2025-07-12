import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmployerAdminHeader from '../Layout/EmployerAdminHeader';
import EmployerAdminFooter from '../Layout/EmployerAdminFooter';

const Blog = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Blog data
  const blogs = [
    {
      id: 1,
      title: "The Evolution of HRMS: Manual to Digital",
      image: "https://smarthr.dreamstechnologies.com/html/template/assets/img/blogs/blog-01.jpg",
      category: "Evlovution",
      date: "05 Oct 2024",
      author: "Gertrude Bowie",
      authorImage: "https://smarthr.dreamstechnologies.com/html/template/assets/img/users/user-02.jpg",
      likes: "3000",
      comments: "454",
      shares: "102",
      reviews: "350",
      status: "Active"
    },
    {
      id: 2,
      title: "HRMS Implementation: Step-by-Step Guide",
      image: "https://smarthr.dreamstechnologies.com/html/template/assets/img/blogs/blog-02.jpg",
      category: "Guide",
      date: "05 Oct 2024",
      author: "Edward Marcus",
      authorImage: "https://smarthr.dreamstechnologies.com/html/template/assets/img/users/user-03.jpg",
      likes: "2458",
      comments: "524",
      shares: "248",
      reviews: "450",
      status: "Active"
    },
    {
      id: 3,
      title: "Data Security in HRMS: What Matters",
      image: "https://smarthr.dreamstechnologies.com/html/template/assets/img/blogs/blog-03.jpg",
      category: "Security",
      date: "05 Oct 2024",
      author: "Mark Phillips",
      authorImage: "https://smarthr.dreamstechnologies.com/html/template/assets/img/users/user-05.jpg",
      likes: "3000",
      comments: "454",
      shares: "102",
      reviews: "350",
      status: "Active"
    },
    {
      id: 4,
      title: "Improving Recruitment with HRMS",
      image: "https://smarthr.dreamstechnologies.com/html/template/assets/img/blogs/blog-04.jpg",
      category: "Recruitment",
      date: "05 Oct 2024",
      author: "Nidia Hale",
      authorImage: "https://smarthr.dreamstechnologies.com/html/template/assets/img/users/user-04.jpg",
      likes: "3200",
      comments: "424",
      shares: "402",
      reviews: "250",
      status: "Active"
    },
    {
      id: 5,
      title: "Impact of HRMS on Company Culture",
      image: "https://smarthr.dreamstechnologies.com/html/template/assets/img/blogs/blog-05.jpg",
      category: "Implementation",
      date: "05 Oct 2024",
      author: "Rebecca Dale",
      authorImage: "https://smarthr.dreamstechnologies.com/html/template/assets/img/users/user-06.jpg",
      likes: "2200",
      comments: "224",
      shares: "122",
      reviews: "450",
      status: "Active"
    },
    {
      id: 6,
      title: "Key Benefits of Implementing HRMS",
      image: "https://smarthr.dreamstechnologies.com/html/template/assets/img/blogs/blog-06.jpg",
      category: "Benefits",
      date: "05 Oct 2024",
      author: "Jimmy Johnson",
      authorImage: "https://smarthr.dreamstechnologies.com/html/template/assets/img/users/user-08.jpg",
      likes: "2800",
      comments: "284",
      shares: "182",
      reviews: "680",
      status: "Active"
    },
    {
      id: 7,
      title: "Why Your Company Needs a HRMS",
      image: "https://smarthr.dreamstechnologies.com/html/template/assets/img/blogs/blog-07.jpg",
      category: "Management",
      date: "05 Oct 2024",
      author: "Stanley Pierre",
      authorImage: "https://smarthr.dreamstechnologies.com/html/template/assets/img/users/user-07.jpg",
      likes: "4800",
      comments: "484",
      shares: "490",
      reviews: "850",
      status: "Active"
    },
    {
      id: 8,
      title: "Scaling Your HR Operations with HRMS",
      image: "https://smarthr.dreamstechnologies.com/html/template/assets/img/blogs/blog-08.jpg",
      category: "Management",
      date: "05 Oct 2024",
      author: "Alice Garcia",
      authorImage: "https://smarthr.dreamstechnologies.com/html/template/assets/img/users/user-10.jpg",
      likes: "3000",
      comments: "454",
      shares: "102",
      reviews: "350",
      status: "Active"
    },
    {
      id: 9,
      title: "How HRMS Drives Organizational Success",
      image: "https://smarthr.dreamstechnologies.com/html/template/assets/img/blogs/blog-09.jpg",
      category: "Management",
      date: "05 Oct 2024",
      author: "James Currier",
      authorImage: "https://smarthr.dreamstechnologies.com/html/template/assets/img/users/user-09.jpg",
      likes: "4000",
      comments: "554",
      shares: "202",
      reviews: "450",
      status: "Active"
    }
  ];

  return (
         <>
      <EmployerAdminHeader />
    <div className="content">
      {/* Breadcrumb */}
      <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <div className="my-auto mb-2">
          <h2 className="mb-1">Blogs</h2>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
          <div className="me-3">
            <div className="input-icon-end position-relative">
              <input type="text" className="form-control date-range bookingrange" placeholder="dd/mm/yyyy - dd/mm/yyyy" />
              <span className="input-icon-addon">
                <i className="ti ti-chevron-down"></i>
              </span>
            </div>
          </div>
          <div className="dropdown me-3">
            <button className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
              Sort By : Last 7 Days
            </button>
            <ul className="dropdown-menu dropdown-menu-end p-3">
              <li>
                <Link to="#" className="dropdown-item rounded-1">Recently Added</Link>
              </li>
              <li>
                <Link to="#" className="dropdown-item rounded-1">Ascending</Link>
              </li>
              <li>
                <Link to="#" className="dropdown-item rounded-1">Desending</Link>
              </li>
            </ul>
          </div>
          <div>
            <button onClick={() => setShowAddModal(true)} className="btn btn-primary d-flex align-items-center">
              <i className="ti ti-circle-plus me-2"></i>Add Blog
            </button>
          </div>
        </div>
      </div>
      {/* /Breadcrumb */}

      <div className="row justify-content-center">
        {blogs.map((blog) => (
          <div key={blog.id} className="col-xxl-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="img-sec w-100 position-relative mb-3">
                  <Link to="#">
                    <img src={blog.image} className="img-fluid rounded w-100" alt="img" />
                  </Link>
                  <div className="">
                    <Link to="#" className="trend-tag badge bg-info-transparent fs-10 fw-medium">{blog.category}</Link>
                    <span className="badge badge-success dot-icon">
                      <i className="ti ti-point-filled"></i> {blog.status}
                    </span>
                  </div>
                </div>   
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center">
                    <span className="me-2 d-flex align-items-center">
                      <i className="ti ti-calendar me-1"></i> {blog.date}
                    </span>
                    <Link to="#" className="border-start link-default fs-14 fw-normal ps-2 me-2 text-truncate">
                      <img src={blog.authorImage} className="avatar avatar-xs rounded-circle me-2 flex-shrink-0" alt="Img" />
                      {blog.author}
                    </Link>
                  </div>
                  <div className="d-flex align-items-center">
                    <Link to="#" className="link-default me-2" onClick={() => setShowEditModal(true)}>
                      <i className="ti ti-edit"></i>
                    </Link>
                    <Link to="#" className="link-default" onClick={() => setShowDeleteModal(true)}>
                      <i className="ti ti-trash text-danger"></i>
                    </Link>
                  </div>
                </div>
                <div className="border-bottom mb-3">
                  <h5 className="mb-3">
                    <Link to="#" className="fs-16 fw-medium text-truncate">{blog.title}</Link>
                  </h5>                                   
                </div>   
                <div className="d-flex align-items-center justify-content-between text-center">
                  <div className="me-3">
                    <h6 className="fs-14 fw-medium">{blog.likes}</h6>
                    <span className="fs-12 fw-normal">Likes</span>
                  </div>
                  <div className="border-start text-gray ps-3 me-3">
                    <h6 className="fs-14 fw-medium">{blog.comments}</h6>
                    <span className="fs-12 fw-normal">Comments</span>
                  </div>
                  <div className="border-start text-gray ps-3 me-3">
                    <h6 className="fs-14 fw-medium">{blog.shares}</h6>
                    <span className="fs-12 fw-normal">Share</span>
                  </div>
                  <div className="border-start text-gray ps-3">
                    <h6 className="fs-14 fw-medium">{blog.reviews}</h6>
                    <span className="fs-12 fw-normal">Reviews</span>
                  </div>
                </div>                          
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mb-4">
        <button className="btn btn-white border">
          <i className="ti ti-loader-3 text-primary me-2"></i>Load More
        </button>
      </div>

      {/* Add Blog Modal */}
      {showAddModal && (
        <div className="modal fade show" style={{ display: 'block' }} id="add_blog">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add Blog</h4>
                <button type="button" className="btn-close custom-btn-close" onClick={() => setShowAddModal(false)}>
                  <i className="ti ti-x"></i>
                </button>
              </div>
              <form>
                <div className="modal-body pb-0">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">                                                
                        <div className="d-flex align-items-center justify-content-center avatar avatar-xxl bg-white rounded border border-dashed me-2 flex-shrink-0 text-dark frames">
                          <i className="ti ti-photo text-gray-2 fs-16"></i>
                        </div>                                              
                        <div className="profile-upload">
                          <div className="mb-2">
                            <h6 className="mb-1">Featured Image</h6>
                            <p className="fs-12">Image should be below 4 mb</p>
                          </div>
                          <div className="profile-uploader d-flex align-items-center">
                            <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                              Upload
                              <input type="file" className="form-control image-sign" multiple="" />
                            </div>
                            <button type="button" className="btn btn-light btn-sm">Cancel</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Blog Title <span className="text-danger"> *</span></label>
                        <input type="text" className="form-control" />
                      </div>                                  
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Category <span className="text-danger"> *</span></label>
                        <select className="select">
                          <option>Select</option>
                          <option>Evlovution</option>
                          <option>Guide</option>
                          <option>Security</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Tags <span className="text-danger"> *</span></label>
                        <input className="input-tags form-control" placeholder="Add new" type="text" data-role="tagsinput" name="Label" value="HRMS,Recruitment" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <label className="form-label">Description</label>
                        <div className="summernote">
                          <p className="text-gray fw-normal">Write a new comment, send your team notification by typing @ followed by their name</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select className="select">
                          <option>Select</option>
                          <option>Active</option>
                          <option>Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light me-2" onClick={() => setShowAddModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Add Blog</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* /Add Blog Modal */}
      
      {/* Edit Blog Modal */}
      {showEditModal && (
        <div className="modal fade show" style={{ display: 'block' }} id="edit_blog">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Blog</h4>
                <button type="button" className="btn-close custom-btn-close" onClick={() => setShowEditModal(false)}>
                  <i className="ti ti-x"></i>
                </button>
              </div>
              <form>
                <div className="modal-body pb-0">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">                                                
                        <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                          <img src="https://smarthr.dreamstechnologies.com/html/template/assets/img/blogs/blog-07.jpg" alt="img" className="rounded" />
                        </div>                                              
                        <div className="profile-upload">
                          <div className="mb-2">
                            <h6 className="mb-1">Featured Image</h6>
                            <p className="fs-12">Image should be below 4 mb</p>
                          </div>
                          <div className="profile-uploader d-flex align-items-center">
                            <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                              Upload
                              <input type="file" className="form-control image-sign" multiple="" />
                            </div>
                            <button type="button" className="btn btn-light btn-sm">Cancel</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Blog Title <span className="text-danger"> *</span></label>
                        <input type="text" className="form-control" />
                      </div>                                  
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Category <span className="text-danger"> *</span></label>
                        <select className="select">
                          <option>Select</option>
                          <option selected>Evlovution</option>
                          <option>Guide</option>
                          <option>Security</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Tags <span className="text-danger"> *</span></label>
                        <input className="input-tags form-control" placeholder="Add new" type="text" data-role="tagsinput" name="Label" value="HRMS,Recruitment" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <label className="form-label">Description</label>
                        <div className="summernote">                                            
                          <p className="text-gray fw-normal">Write a new comment, send your team notification by typing @ followed by their name</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select className="select">
                          <option>Select</option>
                          <option selected>Active</option>
                          <option>Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light me-2" onClick={() => setShowEditModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* /Edit Blog Modal */}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal fade show" style={{ display: 'block' }} id="delete_modal">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center">
                <span className="avatar avatar-xl bg-transparent-danger text-danger mb-3">
                  <i className="ti ti-trash text-danger-x fs-36"></i>
                </span>
                <h4 className="mb-1">Confirm Deletion</h4>
                <p className="mb-3">You want to delete all the marked items, this cant be undone once you delete.</p>
                <div className="d-flex justify-content-center">
                  <button onClick={() => setShowDeleteModal(false)} className="btn btn-light me-3">Cancel</button>
                  <button className="btn btn-danger">Yes, Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* /Delete Modal */}
    </div>
     <EmployerAdminFooter />
    </>
  );
};

export default Blog;