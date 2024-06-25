import Header from '@/components/Header';
import React from 'react';
import { Outlet } from 'react-router';

const Applayout = () => {
  return (
    <div>
      <main className="min-h-screen container">
        <Header/>
        <Outlet />
      </main>
      <div className='p-10 text-center bg-gray-800 mt-10'>
        Made with 💖 by Ratikant Mohanta
      </div>
    </div>
  );
};

export default Applayout;
