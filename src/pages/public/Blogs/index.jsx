import React from 'react';

const BlogsPage = () => {
  return (
    <>
      {/* Sub Visual Block */}
      <div className="subvisual-block subvisual-theme-1 bg-dark-blue d-flex pt-60 pt-md-90 pt-lg-150 pb-30 text-white">
        <div className="pattern-image">
          <img src="/images/bg-pattern-overlay.jpg" width="1920" height="570" alt="Pattern" />
        </div>
        <div className="container position-relative text-center">
          <div className="row">
            <div className="col-12">
              <div className="subvisual-textbox">
                <h1 className="text-primary mb-0">EdProfio Blogs</h1>
                <p>Feel free to get in touch with us. Need Help?</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="main">
        {/* Blogs Section */}
        <section className="section latest-news-block section-theme-1 pt-35 pt-md-50 pt-lg-75 pt-xl-100 pt-xxl-120 pb-35 bg-light">
          <div className="container">
            <div className="row">
              {blogPosts.map((post, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4 mb-35 mb-md-55">
                  <BlogPostCard {...post} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pagination Block */}
        <div className="pagination-block section-theme-1 pb-50 pb-md-50 bg-light">
          <div className="container d-flex align-items-center justify-content-center">
            <ul className="pagination">
              <li className="page-item disabled">
                <a className="page-link" href="#">
                  <i className="icon-arrow-left1"></i>
                </a>
              </li>
              <li className="page-item active"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <i className="icon-arrow-right"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Apps Block */}
        <section className="section section-theme-4 apps-block pt-0 pt-md-30 pt-lg-65 pb-35 pb-md-50 pb-lg-65">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-md-6">
                <div className="text">
                  <h2 className="text-secondary">Download the App</h2>
                  <p>Aliquam lorem ante, dapibus in, viverra quis, feu Aliquam lorem ante, dapibus orem ante, dapibus in, viverra.</p>
                  <ul className="list-unstyled list">
                    <li>Duis aute irure dolor in reprehenderit</li>
                    <li>Voluptate velit esse cillum dolore</li>
                    <li>Fugiat nulla pariatur. Excepteur sint occaecat</li>
                  </ul>
                  <div className="download-btns">
                    <a className="btn-app btn-play-store" href="#">
                      <div className="store-icon">
                        <img src="/images/icon-play-store.png" width="28" height="30" alt="Google Play" />
                      </div>
                      <div className="btn-text">
                        Download From <span>Google Play</span>
                      </div>
                    </a>
                    <a className="btn-app btn-app-store" href="#">
                      <div className="store-icon">
                        <img src="/images/icon-app-store.png" width="32" height="38" alt="App Store" />
                      </div>
                      <div className="btn-text">
                        Download From <span>App Store</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="image-holder">
                  <img src="/images/apps-image1.png" alt="App Screenshot" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

// Blog Post Card Component
const BlogPostCard = ({ image, title, subtitle, date, comments, authorImage, authorName }) => {
  return (
    <div className="news-post bg-white shadow border border-dark" style={{ borderRadius: "30px" }}>
      <a href="/blog-details">
        <div className="image-holder">
          <img src={`/images/${image}`} alt={title} />
        </div>
        <div className="textbox p-10">
          <strong className="subtitle text-secondary">{subtitle}</strong>
          <h3>{title}</h3>
          <ul className="post-meta">
            <li>{date}</li>
            <li>{comments} Comments</li>
          </ul>
          <div className="post-author">
            <span className="author-image">
              <img src={`/images/${authorImage}`} width="52" height="52" alt={authorName} />
            </span>
            <span className="post-by">By <strong>{authorName}</strong></span>
          </div>
        </div>
      </a>
    </div>
  );
};

// Blog posts data
const blogPosts = [
  {
    image: "image-news03.jpg",
    title: "Looking For A Highly Motivated Producer To Build",
    subtitle: "Developer, Code",
    date: "December 31, 2022",
    comments: 14,
    authorImage: "avatar-03.jpg",
    authorName: "Thomas Smith"
  },
  {
    image: "image-news11.jpg",
    title: "Collaboration: Best Practices, Challenges, and Tools",
    subtitle: "Developer, Code",
    date: "December 31, 2022",
    comments: 14,
    authorImage: "avatar-03.jpg",
    authorName: "Thomas Smith"
  },
  {
    image: "image-news04.jpg",
    title: "Print, publishing qui visual ux quis layout mockups.",
    subtitle: "Developer, Code",
    date: "December 31, 2022",
    comments: 14,
    authorImage: "avatar-03.jpg",
    authorName: "Thomas Smith"
  },
  {
    image: "image-news10.jpg",
    title: "Looking For A Highly Motivated Producer To Build",
    subtitle: "Developer, Code",
    date: "December 31, 2022",
    comments: 14,
    authorImage: "avatar-03.jpg",
    authorName: "Thomas Smith"
  },
  {
    image: "image-news14.jpg",
    title: "Collaboration: Best Practices, Challenges, and Tools",
    subtitle: "Developer, Code",
    date: "December 31, 2022",
    comments: 14,
    authorImage: "avatar-03.jpg",
    authorName: "Thomas Smith"
  },
  {
    image: "image-news13.jpg",
    title: "Print, publishing qui visual ux quis layout mockups.",
    subtitle: "Developer, Code",
    date: "December 31, 2022",
    comments: 14,
    authorImage: "avatar-03.jpg",
    authorName: "Thomas Smith"
  }
];

export default BlogsPage;