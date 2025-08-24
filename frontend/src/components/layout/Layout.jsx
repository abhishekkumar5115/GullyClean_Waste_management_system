import React from 'react';
import Header from '../header/Header'; // adjust path if needed
import Footer from '../footer/Footer'; // optional
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 px-4 py-6 bg-gray-50">
        <Outlet />
      </main>

      {/* Optional footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
