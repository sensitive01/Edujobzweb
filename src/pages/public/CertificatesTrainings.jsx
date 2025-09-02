// import React, { useState, useRef } from 'react';

// // Import all images
// import event1 from '../../../public/images/event1.jpg';
// import roboImage from '../../../public/images/robo.avif';
// import edujobzImage from '../../../public/images/edujobz.avif';
// import certificateImage from '../../../public/images/certificate.avif';
// import errorImage from '../../../public/images/404.avif';
// import avatar1 from '../../../public/images/img-avatar-01.png';
// import avatar2 from '../../../public/images/img-avatar-02.png';
// import avatar3 from '../../../public/images/img-avatar-03.png';
// import userImage from '../../../public/images/img-user01.png';

// const CertificatesTrainings = () => {
//   // State for slider functionality
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const sliderRef = useRef(null);

//   // State for gallery slider
//   const [currentGallerySlide, setCurrentGallerySlide] = useState(0);
//   const galleryImages = [event1, event1, event1, event1]; // Using event1 multiple times as placeholder

//   // State for service tier accordions
//   const [activeTier, setActiveTier] = useState('Advanced - $90');

//   // Slider items data
//   const sliderItems = [
//     {
//       id: 1,
//       image: roboImage,
//       title: "SEO Backlink | Manually Created High-Quality Backlinks",
//       duration: "4 Day Delivery",
//       price: "$50",
//       avatar: avatar1,
//       name: "Ronald Thomas",
//       rating: "4.1 (145)"
//     },
//     {
//       id: 2,
//       image: edujobzImage,
//       title: "Advanced Excel Training | Formulas & Macros",
//       duration: "7 Day Course",
//       price: "$75",
//       avatar: avatar2,
//       name: "Sarah Johnson",
//       rating: "4.5 (92)"
//     },
//     {
//       id: 3,
//       image: certificateImage,
//       title: "Web Development Bootcamp | HTML, CSS, JavaScript",
//       duration: "30 Day Intensive",
//       price: "$199",
//       avatar: avatar3,
//       name: "Michael Chen",
//       rating: "4.8 (210)"
//     },
//     {
//       id: 4,
//       image: errorImage,
//       title: "Data Science Fundamentals | Python & Machine Learning",
//       duration: "14 Day Program",
//       price: "$149",
//       avatar: avatar2,
//       name: "Emily Wilson",
//       rating: "4.3 (178)"
//     },
//     {
//       id: 5,
//       image: edujobzImage,
//       title: "Digital Marketing Certification | SEO & Social Media",
//       duration: "21 Day Course",
//       price: "$89",
//       avatar: avatar2,
//       name: "David Thompson",
//       rating: "4.6 (134)"
//     }
//   ];

//   const itemsPerSlide = 4;
//   const totalSlides = sliderItems.length;

//   // Handle slider navigation
//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   // Handle gallery navigation
//   const goToGallerySlide = (index) => {
//     setCurrentGallerySlide(index);
//   };

//   // Toggle service tier accordion
//   const toggleTier = (tier) => {
//     setActiveTier(activeTier === tier ? null : tier);
//   };

//   // Get current slide items - now returns 4 items starting from currentSlide index
//   const getCurrentSlideItems = () => {
//     const items = [];
//     for (let i = 0; i < itemsPerSlide; i++) {
//       const index = (currentSlide + i) % sliderItems.length;
//       items.push(sliderItems[index]);
//     }
//     return items;
//   };

//   return (
//     <div>
//       <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 pb-30 text-white">
//         <div className="container position-relative text-center">
//           <br />
//           <div className="row">
//             <div className="col-12">
//               <div className="subvisual-textbox">
//                 <h1>Certificates & Trainings</h1>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <main className="jobplugin__main" style={{padding: '0px 100px'}}>
//         <section className="jobplugin__section jobplugin__section-white jobplugin__section-trending">
//           <div className="jobplugin__container">
//             <div className="jobplugin__slider-container" style={{ overflow: 'hidden', position: 'relative' }}>
//               {/* Slider Grid */}
//               <div
//                 className="jobplugin__slider-grid"
//                 style={{
//                   display: 'grid',
//                   gridTemplateColumns: 'repeat(4, 1fr)',
//                   gap: '20px',
//                   padding: '20px 0',
//                   transition: 'opacity 0.5s ease'
//                 }}
//               >
//                 {getCurrentSlideItems().map((item, index) => (
//                   <div
//                     key={`${item.id}-${currentSlide}-${index}`}
//                     className="jobplugin__slider-slide"
//                   >
//                     <article className="jobplugin__article-box bg-light">
//                       <div className="jobplugin__article-image border-dark shadow">
//                         <a href="#"><img src={item.image} alt={item.title} style={{ width: '100%', height: 'auto' }} /></a>
//                       </div>
//                       <div className="jobplugin__article-textbox">
//                         <strong className="jobplugin__article-title hover:jobplugin__text-primary">
//                           <a href="#">{item.title}</a>
//                         </strong>
//                         <div className="jobplugin__article-duration">
//                           <span className="jobplugin__article-duration__icon jobplugin__text-primary rj-icon rj-clock"></span>
//                           <span className="jobplugin__article-duration__text">{item.duration}</span>
//                         </div>
//                         <strong className="jobplugin__article-pricing">
//                           From <span className="jobplugin__article-pricing__text">{item.price}</span>
//                         </strong>
//                       </div>
//                       <div className="jobplugin__article-foot bg-white">
//                         <a href="#" className="jobplugin__article-userinfo hover:jobplugin__text-primary">
//                           <div className="jobplugin__article-useravatar">
//                             <img src={item.avatar} alt={item.name} />
//                           </div>
//                           <div className="jobplugin__article-subtext">
//                             <strong className="jobplugin__article-username">{item.name}</strong>
//                           </div>
//                         </a>
//                         <span className="jobplugin__section-box__ratings jobplugin__bg-primary">
//                           <span className="rj-icon rj-star"></span>
//                           <span className="jobplugin__section-box__ratings-points">{item.rating}</span>
//                         </span>
//                       </div>
//                     </article>
//                   </div>
//                 ))}
//               </div>

//               {/* Slider navigation lines */}
//               <div style={{
//                 textAlign: 'center',
//                 marginTop: '20px',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 gap: '8px'
//               }}>
//                 {Array.from({ length: totalSlides }, (_, index) => (
//                   <div
//                     key={index}
//                     onClick={() => goToSlide(index)}
//                     style={{
//                       width: '40px',
//                       height: '4px',
//                       backgroundColor: currentSlide === index ? '#007bff' : '#ccc',
//                       cursor: 'pointer',
//                       transition: 'background-color 0.3s ease'
//                     }}
//                   ></div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         <div className="jobplugin__main-holder">
//           <div className="jobplugin__container">
//             <div className="jobplugin__main-head">
//               <ul className="jobplugin__breadcrumbs">
//                 <li className="jobplugin__breadcrumbs-home">
//                   <a className="hover:jobplugin__text-primary" href="#">
//                     <span className="rj-icon rj-home text-secondary"></span>
//                   </a>
//                 </li>
//                 <li><a className="hover:jobplugin__text-primary" href="#">Online</a></li>
//                 <li>Tools</li>
//               </ul>
//               <ul className="jobplugin__shares">
//                 <li>
//                   <a className="hover:jobplugin__bg-primary hover:jobplugin__border-primary" href="#">
//                     <span className="jobplugin__shares-icon rj-icon rj-heart"></span>
//                     <span className="jobplugin__shares-text">Save</span>
//                   </a>
//                 </li>
//                 <li>
//                   <a className="hover:jobplugin__bg-primary hover:jobplugin__border-primary" href="#">
//                     <span className="jobplugin__shares-icon rj-icon rj-share1"></span>
//                     <span className="jobplugin__shares-text">Share</span>
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <hr />

//             <div className="jobplugin__catalog">
//               <div className="jobplugin__catalog-content">
//                 <h1 className="h4 text-secondary">Excel Macros</h1>
//                 <div className="jobplugin__catalog-head">
//                   <div className="jobplugin__catalog-admin">
//                     <div className="jobplugin__catalog-admin__img">
//                       <img src={userImage} alt="Image Description" />
//                     </div>
//                     <strong className="jobplugin__catalog-admin__name">Ronald Thomas</strong>
//                   </div>
//                   <span className="jobplugin__section-box__ratings jobplugin__bg-primary">
//                     <span className="rj-icon rj-star"></span>
//                     <span className="jobplugin__section-box__ratings-points">5.0 (145 Reviews)</span>
//                   </span>
//                   <span className="jobplugin__article-toprated">Top Rated</span>
//                   <span className="jobplugin__catalog-inprogress">1 contract in progress</span>
//                 </div>

//                 {/* Custom Gallery Slider */}
//                 <div className="jobplugin__catalog-projects">
//                   <div className="jobplugin__catalog-gallery">
//                     <div className="gallery-main-slide">
//                       <img
//                         src={galleryImages[currentGallerySlide]}
//                         alt="Course preview"
//                         style={{ width: '100%', height: 'auto' }}
//                       />
//                     </div>
//                   </div>
//                   <div className="gallery-thumbnails" style={{ display: 'flex', marginTop: '10px' }}>
//                     {galleryImages.map((img, index) => (
//                       <div
//                         key={index}
//                         onClick={() => goToGallerySlide(index)}
//                         style={{
//                           margin: '0 5px',
//                           cursor: 'pointer',
//                           border: currentGallerySlide === index ? '2px solid #007bff' : '1px solid #ddd',
//                           opacity: currentGallerySlide === index ? 1 : 0.7,
//                           transition: 'all 0.3s ease'
//                         }}
//                       >
//                         <img
//                           src={img}
//                           alt={`Thumbnail ${index + 1}`}
//                           style={{ width: '60px', height: '40px', objectFit: 'cover' }}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="jobplugin__catalog-block">
//                   <div className="jobplugin__settings-head">
//                     <h2 className="h5 text-secondary">Course details</h2>
//                     <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
//                   </div>
//                   <p>Hi, welcome to my Creative Business logo design Project!</p>
//                   <strong className="jobplugin__catalog-block__subtitle text-secondary">Why Should I Join?</strong>
//                   <ul className="jobplugin__catalog-block__list">
//                     <li>Top Rated Logo designer </li>
//                     <li>Completed 2000+ logo design projects •</li>
//                     <li>24 hours delivery</li>
//                     <li>Custom and unique logo designs only</li>
//                   </ul>
//                   <strong className="jobplugin__catalog-block__subtitle text-secondary">**FREE Stationery and Software Tools</strong>
//                   <p align="justify">If you purchase the Advanced package, then you will get free Stationery which includes a Business card, Letterhead, and envelope designs. And free Social Media Assets, FB, and youtube cover designs with logos in DP sizes.</p>
//                   <strong className="jobplugin__catalog-block__subtitle text-secondary">What if I'm not satified with the Course?</strong>
//                   <p align="justify">I provide 100% satisfaction. I'll work with you until you are fully satisfied, so there will be no risk on your end.</p>
//                   <strong className="jobplugin__catalog-block__subtitle text-secondary">Working Strategy:</strong>
//                   <p align="justify">As soon as I get the project with the details, I will start researching the Client Business Industry to understand the different aspects. I will also explore competitors' Branding, so we will know how our competitors are working in the market.</p>
//                   <strong className="jobplugin__catalog-block__subtitle text-secondary">Have QUESTIONS?</strong>
//                   <p align="justify">I believe in communication, just message me or call me to discuss each and every possible solution for your Business.</p>
//                   <p>Thanks</p>
//                 </div>

//                 <div className="jobplugin__catalog-block no-padding">
//                   <div className="jobplugin__row jobplugin__three-column">
//                     <div className="jobplugin__column">
//                       <strong className="jobplugin__catalog-block__subtitle text-secondary">Logo Style</strong>
//                       <p>Minimalist, Vintage, Lettermark</p>
//                     </div>
//                     <div className="jobplugin__column">
//                       <strong className="jobplugin__catalog-block__subtitle text-secondary">Industry</strong>
//                       <p>Agriculture & Forestry, Automotive, Education, Fashion & Beauty, Finance & Accounting, Real Estate, Sports & Recreation, Supply Chain & Logistics, Tech & IT, Travel & Hospitality</p>
//                     </div>
//                     <div className="jobplugin__column">
//                       <strong className="jobplugin__catalog-block__subtitle text-secondary">File Format</strong>
//                       <p>AI, EPS, GIF, JPG, PDF, PNG, PSD, SVG, TIFF</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <aside className="jobplugin__catalog-aside">
//                 <strong className="jobplugin__catalog-aside__title">Select service tier</strong>

//                 {/* Starter Tier */}
//                 <div className={`jobplugin__results-aside__box ${activeTier === 'Starter - $36' ? 'active' : ''}`}>
//                   <div
//                     className="jobplugin__results-aside__head jobplugin__results-aside__boxopener"
//                     onClick={() => toggleTier('Starter - $36')}
//                     style={{ cursor: 'pointer' }}
//                   >
//                     <h3 className="h6">Starter - $36</h3>
//                     <span className="jobplugin__results-aside__button"></span>
//                   </div>
//                   <div
//                     className="jobplugin__results-aside__drop"
//                     style={{ display: activeTier === 'Starter - $36' ? 'block' : 'none' }}
//                   >
//                     <div className="jobplugin__catalog-aside__duration">
//                       <span className="rj-icon rj-time"></span>
//                       <strong>2 days delivery — Dec 18, 2023</strong>
//                     </div>
//                     <ul className="jobplugin__checkout-services">
//                       <li>
//                         <span className="jobplugin__checkout-services__subtitle">Delivery Time</span>
//                         <span className="jobplugin__checkout-services__text">2 Days</span>
//                       </li>
//                       <li>
//                         <span className="jobplugin__checkout-services__subtitle">Number of Revisions</span>
//                         <span className="jobplugin__checkout-services__text">Unlimited</span>
//                       </li>
//                       <li>
//                         <span className="jobplugin__checkout-services__subtitle">Number of Initial Concepts</span>
//                         <span className="jobplugin__checkout-services__text">
//                           <i className="jobplugin__checkout-services__check jobplugin__text-primary rj-icon rj-check"></i>
//                         </span>
//                       </li>
//                       <li>
//                         <span className="jobplugin__checkout-services__subtitle">Printable Resolution File</span>
//                         <span className="jobplugin__checkout-services__text">
//                           <i className="jobplugin__checkout-services__check jobplugin__text-primary rj-icon rj-check"></i>
//                         </span>
//                       </li>
//                       <li>
//                         <span className="jobplugin__checkout-services__subtitle">Logo Transparency</span>
//                         <span className="jobplugin__checkout-services__text">
//                           <i className="jobplugin__checkout-services__check jobplugin__text-primary rj-icon rj-check"></i>
//                         </span>
//                       </li>
//                       <li>
//                         <span className="jobplugin__checkout-services__subtitle">3D Mockup</span>
//                         <span className="jobplugin__checkout-services__text">
//                           <i className="jobplugin__checkout-services__check jobplugin__text-primary rj-icon rj-check"></i>
//                         </span>
//                       </li>
//                       <li>
//                         <span className="jobplugin__checkout-services__subtitle">Source Files</span>
//                         <span className="jobplugin__checkout-services__text">
//                           <i className="jobplugin__checkout-services__check jobplugin__text-primary rj-icon rj-check"></i>
//                         </span>
//                       </li>
//                       <li>
//                         <span className="jobplugin__checkout-services__subtitle">Vector File</span>
//                         <span className="jobplugin__checkout-services__text">
//                           <i className="jobplugin__checkout-services__check jobplugin__text-primary rj-icon rj-check"></i>
//                         </span>
//                       </li>
//                     </ul>
//                     <div className="jobplugin__catalog-aside__buttons">
//                       <a href="#" className="jobplugin__button jobplugin__bg-primary hover:jobplugin__bg-secondary">Proceed to Pay($36)</a>
//                       <a href="#" className="jobplugin__button jobplugin__bg-white jobplugin__border-primary hover:jobplugin__bg-white">
//                         <span className="rj-icon rj-message"></span>
//                         Send Message
//                       </a>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Standard Tier */}
//                 <div className={`jobplugin__results-aside__box ${activeTier === 'Standard - $59' ? 'active' : ''}`}>
//                   <div
//                     className="jobplugin__results-aside__head jobplugin__results-aside__boxopener"
//                     onClick={() => toggleTier('Standard - $59')}
//                     style={{ cursor: 'pointer' }}
//                   >
//                     <h3 className="h6">Standard - $59</h3>
//                     <span className="jobplugin__results-aside__button"></span>
//                   </div>
//                   <div
//                     className="jobplugin__results-aside__drop"
//                     style={{ display: activeTier === 'Standard - $59' ? 'block' : 'none' }}
//                   >
//                     <div className="jobplugin__catalog-aside__duration">
//                       <span className="rj-icon rj-time"></span>
//                       <strong>2 days delivery — Dec 18, 2023</strong>
//                     </div>
//                     <ul className="jobplugin__checkout-services">
//                       <li>
//                         <span className="jobplugin__checkout-services__subtitle">Delivery Time</span>
//                         <span className="jobplugin__checkout-services__text">2 Days</span>
//                       </li>
//                       <li>
//                         <span className="jobplugin__checkout-services__subtitle">Number of Revisions</span>
//                         <span className="jobplugin__checkout-services__text">Unlimited</span>
//                       </li>
//                       <li>
//                         <span className="jobplugin__checkout-services__subtitle">Number of Initial Concepts</span>
//                         <span className="jobplugin__checkout-services__text">
//                           <i className="jobplugin__checkout-services__check jobplugin__text-primary rj-icon rj-check"></i>
//                         </span>
//                       </li>
//                       <li>
//                         <span className="jobplugin__checkout-services__subtitle">Printable Resolution File</span>
//                         <span className="jobplugin__checkout-services__text">
//                           <i className="jobplugin__checkout-services__check jobplugin__text-primary rj-icon rj-check"></i>
//                         </span>
//                       </li>
//                       <li>
//                         <span className="jobplugin__checkout-services__subtitle">Logo Transparency</span>
//                         <span className="jobplugin__checkout-services__text">
//                           <i className="jobplugin__checkout-services__check jobplugin__text-primary rj-icon rj-check"></i>
//                         </span>
//                       </li>
//                       <li>
//                         <span className="jobplugin__checkout-services__subtitle">3D Mockup</span>
//                         <span className="jobplugin__checkout-services__text">
//                           <i className="jobplugin__checkout-services__check jobplugin__text-primary rj-icon rj-check"></i>
//                         </span>
//                       </li>
//                       <li>
//                         <span className="jobplugin__checkout-services__subtitle">Source Files</span>
//                         <span className="jobplugin__checkout-services__text">
//                           <i className="jobplugin__checkout-services__check jobplugin__text-primary rj-icon rj-check"></i>
//                         </span>
//                       </li>
//                       <li>
//                         <span className="jobplugin__checkout-services__subtitle">Vector File</span>
//                         <span className="jobplugin__checkout-services__text">
//                           <i className="jobplugin__checkout-services__check jobplugin__text-primary rj-icon rj-check"></i>
//                         </span>
//                       </li>
//                     </ul>
//                     <div className="jobplugin__catalog-aside__buttons">
//                       <a href="#" className="jobplugin__button jobplugin__bg-primary hover:jobplugin__bg-secondary">Proceed to Pay ($59)</a>
//                       <a href="#" className="jobplugin__button jobplugin__bg-white jobplugin__border-primary hover:jobplugin__bg-white">
//                         <span className="rj-icon rj-message"></span>
//                         Send Message
//                       </a>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Advanced Tier */}
//                 <div className={`jobplugin__results-aside__box ${activeTier === 'Advanced - $90' ? 'active' : ''}`}>
//                   <div
//                     className="jobplugin__results-aside__head jobplugin__results-aside__boxopener"
//                     onClick={() => toggleTier('Advanced - $90')}
//                     style={{ cursor: 'pointer' }}
//                   >
//                     <h3 className="h6">Advanced - $90</h3>
//                     <span className="jobplugin__results-aside__button"></span>
//                   </div>
//                   <div
//                     className="jobplugin__results-aside__drop"
//                     style={{ display: activeTier === 'Advanced - $90' ? 'block' : 'none' }}
//                   >
//                     <div className="jobplugin__catalog-aside__duration">
//                       <span className="rj-icon rj-time"></span>
//                       <strong>2 days delivery — Dec 18, 2023</strong>
//                     </div>
//                     <ul className="jobplugin__checkout-services">
//                       <li>
//                         <span className="jobplugin__checkout-services__subtitle">Delivery Time</span>
//                         <span className="jobplugin__checkout-services__text">2 Days</span>
//                       </li>
//                       <li>
//                         <span className="jobplugin__checkout-services__subtitle">Number of Revisions</span>
//                         <span className="jobplugin__checkout-services__text">Unlimited</span>
//                       </li>
//                       <li>
//                         <span className="jobplugin__checkout-services__subtitle">Number of Initial Concepts</span>
//                         <span className="jobplugin__checkout-services__text">
//                           <i className="jobplugin__checkout-services__check jobplugin__text-primary rj-icon rj-check"></i>
//                         </span>
//                       </li>
//                       <li>
//                         <span className="jobplugin__checkout-services__subtitle">Printable Resolution File</span>
//                         <span className="jobplugin__checkout-services__text">
//                           <i className="jobplugin__checkout-services__check jobplugin__text-primary rj-icon rj-check"></i>
//                         </span>
//                       </li>
//                       <li>
//                         <span className="jobplugin__checkout-services__subtitle">Logo Transparency</span>
//                         <span className="jobplugin__checkout-services__text">
//                           <i className="jobplugin__checkout-services__check jobplugin__text-primary rj-icon rj-check"></i>
//                         </span>
//                       </li>
//                       <li>
//                         <span className="jobplugin__checkout-services__subtitle">3D Mockup</span>
//                         <span className="jobplugin__checkout-services__text">
//                           <i className="jobplugin__checkout-services__check jobplugin__text-primary rj-icon rj-check"></i>
//                         </span>
//                       </li>
//                       <li>
//                         <span className="jobplugin__checkout-services__subtitle">Source Files</span>
//                         <span className="jobplugin__checkout-services__text">
//                           <i className="jobplugin__checkout-services__check jobplugin__text-primary rj-icon rj-check"></i>
//                         </span>
//                       </li>
//                       <li>
//                         <span className="jobplugin__checkout-services__subtitle">Vector File</span>
//                         <span className="jobplugin__checkout-services__text">
//                           <i className="jobplugin__checkout-services__check jobplugin__text-primary rj-icon rj-check"></i>
//                         </span>
//                       </li>
//                     </ul>
//                     <div className="jobplugin__catalog-aside__buttons">
//                       <a href="#" className="jobplugin__button jobplugin__bg-primary hover:jobplugin__bg-secondary">Proceed to Pay ($90)</a>
//                       <a href="#" className="jobplugin__button jobplugin__bg-white jobplugin__border-primary hover:jobplugin__bg-white">
//                         <span className="rj-icon rj-message"></span>
//                         Send Message
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </aside>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default CertificatesTrainings;

//when carosel clicked below section willl changed absed upon the carosel data

import React, { useState, useRef, useEffect } from "react";

// Import all images
import event1 from "../../../public/images/event1.jpg";
import roboImage from "../../../public/images/robo.avif";
import edujobzImage from "../../../public/images/edujobz.avif";
import certificateImage from "../../../public/images/certificate.avif";
import errorImage from "../../../public/images/404.avif";
import avatar1 from "../../../public/images/img-avatar-01.png";
import avatar2 from "../../../public/images/img-avatar-02.png";
import avatar3 from "../../../public/images/img-avatar-03.png";
import userImage from "../../../public/images/img-user01.png";

const CertificatesTrainings = () => {
  // State for training data from API
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTraining, setSelectedTraining] = useState(null);

  // State for slider functionality
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const sliderRef = useRef(null);

  // State for gallery slider
  const [currentGallerySlide, setCurrentGallerySlide] = useState(0);
  const galleryImages = [event1, event1, event1, event1];

  // State for service tier accordions
  const [activeTier, setActiveTier] = useState(null);

  // Fetch training data from API
  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await fetch(
          "https://api.edprofio.com/employer/fetchtraining"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch trainings");
        }
        const data = await response.json();
        setTrainings(data);
        if (data.length > 0) {
          setSelectedTraining(data[0]);
          setActiveTier(
            data[0].paymentStatus === "paid"
              ? `Premium - $${data[0].paidAmount}`
              : "Free Tier"
          );
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTrainings();
  }, []);

  // Generate slider items from training data
  const sliderItems = trainings.map((training, index) => ({
    id: training._id,
    image: [roboImage, edujobzImage, certificateImage, errorImage][index % 4],
    title: training.title,
    description: training.description,
    duration: `${training.subCategories?.length || 0} Modules`,
    price:
      training.paymentStatus === "paid" ? `$${training.paidAmount}` : "Free",
    avatar: [avatar1, avatar2, avatar3][index % 3],
    name: "EdProfio Instructor",
    rating:
      "4." + ((index % 5) + 1) + ` (${training.enrollerList?.length || 0})`,
    trainingData: training,
  }));

  // Infinite loop carousel logic
  const itemsPerSlide = 4;
  const totalSlides = 5;
  const totalItems = sliderItems.length;

  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay || totalItems === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [autoPlay, totalSlides, totalItems]);

  // Handle slider navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 5000);
  };

  // Get items for current slide with infinite loop
  const getCurrentSlideItems = () => {
    if (totalItems === 0) return [];

    let items = [];
    for (let i = 0; i < itemsPerSlide; i++) {
      const itemIndex = (currentSlide * itemsPerSlide + i) % totalItems;
      items.push(sliderItems[itemIndex]);
    }
    return items;
  };

  // Handle training selection
  const selectTraining = (training) => {
    if (!training?.trainingData) return;

    setSelectedTraining(training.trainingData);
    setActiveTier(
      training.trainingData.paymentStatus === "paid"
        ? `Premium - $${training.trainingData.paidAmount}`
        : "Free Tier"
    );
    setCurrentGallerySlide(0);
  };

  // Handle gallery navigation
  const goToGallerySlide = (index) => {
    setCurrentGallerySlide(index);
  };

  // Toggle service tier accordion
  const toggleTier = (tier) => {
    setActiveTier(activeTier === tier ? null : tier);
  };

  // Generate pricing tiers based on training data
  const generatePricingTiers = (training) => {
    if (!training) return [];

    if (training.paymentStatus === "Free") {
      return [
        {
          name: "Free Tier",
          price: "Free",
          duration: "Lifetime access",
          features: [
            "Full course access",
            `${training.subCategories?.length || 0} modules`,
            "Community support",
            "Email assistance",
            "Basic certificate",
          ],
        },
      ];
    } else {
      return [
        {
          name: "Basic",
          price: `$${Math.floor(parseInt(training.paidAmount || 0) * 0.5)}`,
          duration: "3 months access",
          features: [
            "Full course access",
            `${training.subCategories?.length || 0} modules`,
            "Community support",
            "Email assistance",
          ],
        },
        {
          name: "Standard",
          price: `$${training.paidAmount || 0}`,
          duration: "6 months access",
          features: [
            "Full course access",
            `${training.subCategories?.length || 0} modules`,
            "Priority support",
            "Practice exercises",
            "Basic certificate",
          ],
        },
        {
          name: "Premium",
          price: `$${Math.floor(parseInt(training.paidAmount || 0) * 1.5)}`,
          duration: "Lifetime access",
          features: [
            "Full course access",
            `${training.subCategories?.length || 0} modules`,
            "Priority support",
            "Practice exercises",
            "Premium certificate",
            "1-on-1 mentoring session",
            "Course materials download",
          ],
        },
      ];
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (trainings.length === 0 || !selectedTraining) {
    return <div className="no-trainings">No trainings available</div>;
  }

  const pricingTiers = generatePricingTiers(selectedTraining);
  const enrollmentCount = selectedTraining.enrollerList?.length || 0;
  const lastUpdated = new Date(selectedTraining.updatedAt).toLocaleDateString();

  return (
    <div className="certificates-trainings-container">
      {/* Header section */}
      <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 pb-30 text-white">
        <div className="container position-relative text-center">
          <div className="row">
            <div className="col-12">
              <div className="subvisual-textbox">
                <h1>Certificates & Trainings</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="jobplugin__main" style={{ padding: "0px 100px" }}>
        {/* Carousel Section */}
        <section className="jobplugin__section jobplugin__section-white jobplugin__section-trending">
          <div className="jobplugin__container">
            <div
              className="jobplugin__slider-container"
              style={{ overflow: "hidden", position: "relative" }}
            >
              {/* Slider Grid */}
              <div
                className="jobplugin__slider-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "20px",
                  padding: "20px 0",
                  transition: "transform 0.5s ease",
                }}
                ref={sliderRef}
              >
                {getCurrentSlideItems().map((item, index) => (
                  <div
                    key={`${item.id}-${currentSlide}-${index}`}
                    className="jobplugin__slider-slide"
                    onClick={() => selectTraining(item)}
                    style={{ cursor: "pointer" }}
                  >
                    <article className="jobplugin__article-box bg-light">
                      <div className="jobplugin__article-image border-dark shadow">
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                      <div className="jobplugin__article-textbox">
                        <strong className="jobplugin__article-title hover:jobplugin__text-primary">
                          {item.title}
                        </strong>
                        <div className="jobplugin__article-duration">
                          <span className="jobplugin__article-duration__icon jobplugin__text-primary rj-icon rj-clock"></span>
                          <span className="jobplugin__article-duration__text">
                            {item.duration}
                          </span>
                        </div>
                        <strong className="jobplugin__article-pricing">
                          From{" "}
                          <span className="jobplugin__article-pricing__text">
                            {item.price}
                          </span>
                        </strong>
                      </div>
                      <div className="jobplugin__article-foot bg-white">
                        <div className="jobplugin__article-userinfo hover:jobplugin__text-primary">
                          <div className="jobplugin__article-useravatar">
                            <img src={item.avatar} alt={item.name} />
                          </div>
                          <div className="jobplugin__article-subtext">
                            <strong className="jobplugin__article-username">
                              {item.name}
                            </strong>
                          </div>
                        </div>
                        <span className="jobplugin__section-box__ratings jobplugin__bg-primary">
                          <span className="rj-icon rj-star"></span>
                          <span className="jobplugin__section-box__ratings-points">
                            {item.rating}
                          </span>
                        </span>
                      </div>
                    </article>
                  </div>
                ))}
              </div>

              {/* Navigation dots - fixed to 5 */}
              <div
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                {Array.from({ length: totalSlides }, (_, index) => (
                  <div
                    key={index}
                    onClick={() => goToSlide(index)}
                    style={{
                      width: "40px",
                      height: "4px",
                      backgroundColor:
                        currentSlide === index ? "#007bff" : "#ccc",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Training Details Section */}
        <div className="jobplugin__main-holder">
          <div className="jobplugin__container">
            <div className="jobplugin__main-head">
              <ul className="jobplugin__breadcrumbs">
                <li className="jobplugin__breadcrumbs-home">
                  <a className="hover:jobplugin__text-primary" href="#">
                    <span className="rj-icon rj-home text-secondary"></span>
                  </a>
                </li>
                <li>
                  <a className="hover:jobplugin__text-primary" href="#">
                    Online
                  </a>
                </li>
                <li>{selectedTraining.title}</li>
              </ul>
              <ul className="jobplugin__shares">
                <li>
                  <a
                    className="hover:jobplugin__bg-primary hover:jobplugin__border-primary"
                    href="#"
                  >
                    <span className="jobplugin__shares-icon rj-icon rj-heart"></span>
                    <span className="jobplugin__shares-text">Save</span>
                  </a>
                </li>
                <li>
                  <a
                    className="hover:jobplugin__bg-primary hover:jobplugin__border-primary"
                    href="#"
                  >
                    <span className="jobplugin__shares-icon rj-icon rj-share1"></span>
                    <span className="jobplugin__shares-text">Share</span>
                  </a>
                </li>
              </ul>
            </div>
            <hr />

            <div className="jobplugin__catalog">
              <div className="jobplugin__catalog-content">
                <h1 className="h4 text-secondary">{selectedTraining.title}</h1>
                <div className="jobplugin__catalog-head">
                  <div className="jobplugin__catalog-admin">
                    <div className="jobplugin__catalog-admin__img">
                      <img src={userImage} alt="Training Instructor" />
                    </div>
                    <strong className="jobplugin__catalog-admin__name">
                      EdProfio Instructor
                    </strong>
                  </div>
                  <span className="jobplugin__section-box__ratings jobplugin__bg-primary">
                    <span className="rj-icon rj-star"></span>
                    <span className="jobplugin__section-box__ratings-points">
                      4.8 ({enrollmentCount} Reviews)
                    </span>
                  </span>
                  <span className="jobplugin__article-toprated">Top Rated</span>
                  <span className="jobplugin__catalog-inprogress">
                    {enrollmentCount}{" "}
                    {enrollmentCount === 1 ? "enrollment" : "enrollments"}
                  </span>
                </div>

                {/* Image Gallery */}
                <div className="jobplugin__catalog-projects">
                  <div className="jobplugin__catalog-gallery">
                    <div className="gallery-main-slide">
                      <img
                        src={galleryImages[currentGallerySlide]}
                        alt="Course preview"
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                  </div>
                  <div
                    className="gallery-thumbnails"
                    style={{ display: "flex", marginTop: "10px" }}
                  >
                    {galleryImages.map((img, index) => (
                      <div
                        key={index}
                        onClick={() => goToGallerySlide(index)}
                        style={{
                          margin: "0 5px",
                          cursor: "pointer",
                          border:
                            currentGallerySlide === index
                              ? "2px solid #007bff"
                              : "1px solid #ddd",
                          opacity: currentGallerySlide === index ? 1 : 0.7,
                          transition: "all 0.3s ease",
                        }}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          style={{
                            width: "60px",
                            height: "40px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Details */}
                <div className="jobplugin__catalog-block">
                  <div className="jobplugin__settings-head">
                    <h2 className="h5 text-secondary">Course details</h2>
                    <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                  </div>
                  <p>{selectedTraining.description}</p>

                  <strong className="jobplugin__catalog-block__subtitle text-secondary">
                    Course Modules
                  </strong>
                  <ul className="jobplugin__catalog-block__list">
                    {selectedTraining.subCategories.map((module, index) => (
                      <li key={index}>
                        <strong>{module.title}:</strong> {module.description}
                      </li>
                    ))}
                  </ul>

                  <strong className="jobplugin__catalog-block__subtitle text-secondary">
                    Enrollment Information
                  </strong>
                  <p>
                    This course has {enrollmentCount} enrolled participants:
                  </p>
                  <ul className="jobplugin__catalog-block__list">
                    {selectedTraining.enrollerList
                      .slice(0, 3)
                      .map((enroller, index) => (
                        <li key={index}>
                          {enroller.employername} (
                          {enroller.paidAmount === "0"
                            ? "Free"
                            : `Paid $${enroller.paidAmount}`}
                          )
                        </li>
                      ))}
                    {enrollmentCount > 3 && (
                      <li>...and {enrollmentCount - 3} more</li>
                    )}
                  </ul>

                  <strong className="jobplugin__catalog-block__subtitle text-secondary">
                    Course Status
                  </strong>
                  <p>
                    Status:{" "}
                    {selectedTraining?.status
                      ? selectedTraining.status.charAt(0).toUpperCase() +
                        selectedTraining.status.slice(1)
                      : "Status not available"}
                  </p>
                  <p>Last updated: {lastUpdated}</p>
                </div>

                {/* Course Stats */}
                <div className="jobplugin__catalog-block no-padding">
                  <div className="jobplugin__row jobplugin__three-column">
                    <div className="jobplugin__column">
                      <strong className="jobplugin__catalog-block__subtitle text-secondary">
                        Payment Type
                      </strong>
                      <p>
                        {selectedTraining.paymentStatus === "paid"
                          ? "Paid Course"
                          : "Free Course"}
                      </p>
                    </div>
                    <div className="jobplugin__column">
                      <strong className="jobplugin__catalog-block__subtitle text-secondary">
                        Course Fee
                      </strong>
                      <p>
                        {selectedTraining.paymentStatus === "paid"
                          ? `$${selectedTraining.paidAmount}`
                          : "Free"}
                      </p>
                    </div>
                    <div className="jobplugin__column">
                      <strong className="jobplugin__catalog-block__subtitle text-secondary">
                        Modules
                      </strong>
                      <p>
                        {selectedTraining?.subCategories?.length || 0} modules
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Tiers */}
              <aside className="jobplugin__catalog-aside">
                <strong className="jobplugin__catalog-aside__title">
                  Select service tier
                </strong>

                {pricingTiers.map((tier, index) => (
                  <div
                    key={index}
                    className={`jobplugin__results-aside__box ${
                      activeTier === tier.name + " - " + tier.price
                        ? "active"
                        : ""
                    }`}
                  >
                    <div
                      className="jobplugin__results-aside__head jobplugin__results-aside__boxopener"
                      onClick={() => toggleTier(tier.name + " - " + tier.price)}
                      style={{ cursor: "pointer" }}
                    >
                      <h3 className="h6">
                        {tier.name} - {tier.price}
                      </h3>
                      <span className="jobplugin__results-aside__button"></span>
                    </div>
                    <div
                      className="jobplugin__results-aside__drop"
                      style={{
                        display:
                          activeTier === tier.name + " - " + tier.price
                            ? "block"
                            : "none",
                      }}
                    >
                      <div className="jobplugin__catalog-aside__duration">
                        <span className="rj-icon rj-time"></span>
                        <strong>{tier.duration}</strong>
                      </div>
                      <ul className="jobplugin__checkout-services">
                        {tier.features.map((feature, featIndex) => (
                          <li key={featIndex}>
                            <span className="jobplugin__checkout-services__subtitle">
                              {feature}
                            </span>
                            <span className="jobplugin__checkout-services__text">
                              <i className="jobplugin__checkout-services__check jobplugin__text-primary rj-icon rj-check"></i>
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="jobplugin__catalog-aside__buttons">
                        <a
                          href="#"
                          className="jobplugin__button jobplugin__bg-primary hover:jobplugin__bg-secondary"
                        >
                          {tier.price === "Free"
                            ? "Enroll Now"
                            : `Proceed to Pay (${tier.price})`}
                        </a>
                        <a
                          href="#"
                          className="jobplugin__button jobplugin__bg-white jobplugin__border-primary hover:jobplugin__bg-white"
                        >
                          <span className="rj-icon rj-message"></span>
                          Send Message
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </aside>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CertificatesTrainings;
