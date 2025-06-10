import React from 'react';
import Header from './Header';
import Footer from './Footer';
// import useScripts from '../../hooks/useScripts';


const Layout = ({ children }) => {
  // useScripts();
  return (
    <div className="main-wrapper">
      <Header />
      <main className="main-content">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;