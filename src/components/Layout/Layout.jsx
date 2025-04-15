import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header always on top */}
      <Header />

      {/* Main content area, centered and spaced */}
      <main className="flex-grow max-w-[1200px] mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Layout;
