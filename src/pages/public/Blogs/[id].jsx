import React from 'react';

const BlogDetailsPage = () => {
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
                <h1>Blog Details</h1>
                <p>Feel free to get in touch with us. Need Help?</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="main">
        <div className="container">
          {/* Column Wrapper */}
          <div className="row column-wrapper section-theme-1 pt-35 pt-md-50 pt-lg-45 pb-35 pb-md-50 pb-lg-65 pt-xl-95">
            {/* Main Content Column */}
            <div className="col-12 col-lg-8 mb-35 mb-lg-0">
              {/* Article Post */}
              <article className="post singlepost-theme-1">
                <div className="post-image">
                  <img src="/images/post-image.jpg" alt="How to overcome economic crisis instantly" />
                </div>
                <strong className="subtitle">Developer, Code</strong>
                <h3 className="entry-title">Looking For A Highly Motivated Producer To Build</h3>
                
                {/* Post Meta */}
                <div className="post-meta-wrap">
                  <ul className="entry-meta">
                    <li><span className="subtext">December 31, 2024</span></li>
                    <li><span className="subtext">14 Comments</span></li>
                  </ul>
                  <div className="post-author-info">
                    <span className="author-image">
                      <img src="/images/avatar-03.jpg" width="52" height="52" alt="Thomas Smith" />
                    </span>
                    <span className="post-by">By <strong><a href="#">Thomas Smith</a></strong></span>
                  </div>
                </div>
                
                {/* Post Content */}
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt lab magna aliqua. Ut enim ad minim veniam, quisoris nisi ut aliquip ex ea commodo consequat. Duis dolor in reprehenderit in vol tate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sin idatat no roident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dol met, consectetur adipiscing elit,</p>
                <p>dolor in reprehenderit in vol tate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sin idatat no roident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dol met, consectetur adipiscing elit,</p>
                
                <h4>One touch of a red-hot stove is usually all we need to avoid that kind of discomfort in future</h4>
                <ul>
                  <li>Far curiosity incommode now led smallness allowance.</li>
                  <li>Favour bed assure son things yet.</li>
                  <li>She consisted consulted elsewhere happiness</li>
                  <li>Disposing household any old the.</li>
                  <li>Widow downs you new shade drift hopes small.</li>
                  <li>Interested discretion estimating on stimulated.</li>
                </ul>
                
                <blockquote>
                  <q>"A business consulting agency is involved in the planning, implementation, and education of businesses."</q>
                  <cite><span>Brian Reed,</span> front-end developer</cite>
                </blockquote>
                
                <p>Phasellus justo purus, dignissim fermentum turpis sit amet, fermentum porttitor ante. Praesent fermentum lectus ac ante posuere bibendum. Donec a orci vel risus feugiat iaculis vel eu mauris. Fusce viverra dui nec erat ullamcorper eleifend. In non pellentesque lacus. Cras at quam nec felis fermentum porttitor. Maecenas ac ligula at enim maximus commodo. Nunc condimentum magna nec libero lobortis euismod. Sed hendrerit nisl ut ipsum euismod euismod. Phasellus egestas bibendum eros, in dapibus nunc semper eget. Morbi elementum malesuada diam, at pretium nulla hendrerit a. Nulla semper tellus ipsum. Morbi sed elit sed ante volutpat viverra sed vitae sem. Nam in diam consectetur, facilisis ipsum eu, tempus lorem. Ut in aliquet nisl, non tincidunt nulla.</p>
                
                <h3>True as we experience</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt lab magna aliqua. Ut enim ad minim veniam, quisoris nisi ut aliquip ex ea commodo consequat. Duis dolor in reprehenderit in vol tate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum d olor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt lab magna aliqua. Ut enim ad minim veniam, quis</p>
                
                {/* Tags */}
                <div className="post-tags">
                  <strong className="title">Tags:</strong>
                  <div className="tagcloud">
                    <a href="#">business,</a>
                    <a href="#">makreting,</a>
                    <a href="#">tips</a>
                  </div>
                </div>
                
                {/* Social Sharing */}
                <div className="post-social">
                  <strong className="title">Share:</strong>
                  <ul className="social-share">
                    <li><a href="#"><i className="icon-facebook"></i></a></li>
                    <li><a href="#"><i className="icon-twitter"></i></a></li>
                    <li><a href="#"><i className="icon-instagram"></i></a></li>
                  </ul>
                </div>
                
                {/* Author Bio */}
                <div className="post-author">
                  <div className="author-avatar">
                    <img src="/images/img-candiate01.jpg" alt="Lara Miller" />
                  </div>
                  <div className="author-bio">
                    <strong className="title">Willimes Marko</strong>
                    <p>Integer sollicitudin ligula non enim sodales Sewid commodo risus ineuismod varius condimentum est libero</p>
                  </div>
                </div>
                
                {/* Comments Section */}
                <h4>Post Comments</h4>
                <div className="commentlist">
                  {/* Comment 1 */}
                  <div className="commentlist-item">
                    <div className="comment">
                      <div className="avatar-holder">
                        <img className="avatar avatar-48 photo avatar-default" 
                             src="/images/img-candiate03.jpg" 
                             width="93" 
                             height="80" 
                             alt="Willimes Marko" />
                      </div>
                      <div className="commentlist-holder">
                        <p className="meta">
                          <strong>Willimes Marko</strong> January 7, 2023 
                          <a href="#" className="comment-reply-link">Reply</a>
                        </p>
                        <p>Integer sollicitudin ligula non enim sodales, non lacinia Sewid comm a us in euismod varius nullam feugiat ultrices.</p>
                      </div>
                    </div>
                    
                    {/* Nested Comment */}
                    <div className="commentlist-item">
                      <div className="comment">
                        <div className="avatar-holder">
                          <img className="avatar avatar-48 photo avatar-default" 
                               src="/images/img-candiate02.jpg" 
                               width="93" 
                               height="80" 
                               alt="Thomas Walkar" />
                        </div>
                        <div className="commentlist-holder">
                          <p className="meta">
                            <strong>Thomas Walkar</strong> January 7, 2023 
                            <a href="#" className="comment-reply-link">Reply</a>
                          </p>
                          <p>Integer sollicitudin ligula non enim sodales, non lacinia Sewid comm a us in euismod varius nullam feugiat ultrices.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Comment 2 */}
                  <div className="commentlist-item">
                    <div className="comment">
                      <div className="avatar-holder">
                        <img className="avatar avatar-48 photo avatar-default" 
                             src="/images/img-candiate01.jpg" 
                             width="93" 
                             height="80" 
                             alt="Moniqa Petter" />
                      </div>
                      <div className="commentlist-holder">
                        <p className="meta">
                          <strong>Moniqa Petter</strong> January 7, 2023 
                          <a href="#" className="comment-reply-link">Reply</a>
                        </p>
                        <p>Integer sollicitudin ligula non enim sodales, non lacinia Sewid comm a us in euismod varius nullam feugiat ultrices.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Comment Form */}
                <div className="comment-respond">
                  <h4 className="comment-reply-title">Leave a Comments</h4>
                  <p><a href="#">Sign in</a> to post your comment or signup if you don't have any account.</p>
                  <form className="comment-form" action="#">
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <p className="comment-form-author">
                          <label className="d-none" htmlFor="f-name">First Name</label>
                          <input size="30" id="f-name" className="form-control" type="text" placeholder="Full Name" />
                        </p>
                      </div>
                      <div className="col-12 col-md-6">
                        <p className="comment-form-email">
                          <label className="d-none" htmlFor="l-name">Last Name <span className="required">*</span></label>
                          <input size="30" id="l-name" className="form-control" type="email" placeholder="Email Address" />
                        </p>
                      </div>
                      <div className="col-12">
                        <p className="comment-form-comment">
                          <label className="d-none" htmlFor="comment">Comment</label>
                          <textarea rows="8" cols="45" id="comment" className="form-control" placeholder="Comment"></textarea>
                        </p>
                      </div>
                      <div className="col-12">
                        <p className="form-submit">
                          <button id="submit" className="btn btn-green btn-sm" type="submit">
                            <span className="btn-text">Post Comment</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </article>
            </div>
            
            {/* Sidebar Column */}
            <div className="col-12 col-lg-4">
              <Sidebar />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

// Sidebar Component
const Sidebar = () => {
  return (
    <aside className="sidebar sidebar-theme-1">
      {/* Recent Posts Widget */}
      <div className="widget widget_recent_posts">
        <h4 className="h5">Recent Posts</h4>
        <ul className="recent-posts">
          {recentPosts.map((post, index) => (
            <li key={index}>
              <div className="thumbnail">
                <a href="#">
                  <img src={`/images/${post.image}`} width="66" height="66" alt={post.title} />
                </a>
              </div>
              <div className="textbox">
                <strong className="title"><a href="#">{post.title}</a></strong>
                <span className="date"><i className="icon-clock"></i> <span>{post.time}</span></span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Categories Widget */}
      <div className="widget widget_categories">
        <h4 className="h5">Categories</h4>
        <ul>
          {categories.map((category, index) => (
            <li key={index}>
              <a href="#">{category.name}</a> <span className="count">{category.count}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Links Widget */}
      <div className="widget widget_links">
        <h4 className="h5">Quick Links</h4>
        <ul>
          {quickLinks.map((link, index) => (
            <li key={index}><a href="#">{link}</a></li>
          ))}
        </ul>
      </div>
      
      {/* Meta Widget */}
      <div className="widget widget_meta">
        <h4 className="h5">Meta</h4>
        <ul>
          {metaLinks.map((link, index) => (
            <li key={index}><a href="#">{link}</a></li>
          ))}
        </ul>
      </div>
      
      {/* Newsletter Widget */}
      <div className="widget widget_newsletter">
        <h4 className="h5">Newsletter</h4>
        <p>Enter your email and get recent news &amp; recent offers update.</p>
        <form action="#" className="search-form" method="get">
          <fieldset>
            <input className="form-control" type="search" placeholder="Enter your email...." name="s" />
            <button className="btn-search">Subscribe</button>
          </fieldset>
        </form>
      </div>
    </aside>
  );
};

// Data for dynamic content
const recentPosts = [
  {
    image: "img-thumb01.jpg",
    title: "Aliquam ac orci nec mauris tristique pharetra",
    time: "15 mins ago"
  },
  {
    image: "img-thumb02.jpg",
    title: "Praesent eu nunc feugiat enim scelerisque",
    time: "15 mins ago"
  },
  {
    image: "img-thumb03.jpg",
    title: "Droin sodales nisi eu ornare facilisis",
    time: "15 mins ago"
  }
];

const categories = [
  { name: "Education", count: 30 },
  { name: "Job Seeking", count: 8 },
  { name: "Interview", count: 26 },
  { name: "Unique Ideas", count: 14 },
  { name: "Learning", count: 9 },
  { name: "Identity", count: 12 }
];

const quickLinks = [
  "Website Services",
  "Revamp Services",
  "Social Management",
  "Domain & Website",
  "Branding & Logo"
];

const metaLinks = [
  "Log in",
  "Entries feed",
  "Comments feed",
  "WordPress.org"
];

export default BlogDetailsPage;