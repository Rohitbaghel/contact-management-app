import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block p-2 rounded transition duration-200 ${
      isActive ? 'bg-blue-700 text-white' : 'hover:bg-blue-700 text-blue-100'
    }`;

  return (
    <>
      <nav className='bg-blue-600 text-white lg:h-screen lg:w-64 fixed left-0 top-0 p-4 z-50 w-full'>
        <div className="flex justify-between items-center lg:block">
          <h1 className='text-xl lg:text-2xl font-bold mb-0 lg:mb-8'>Contact Management</h1>
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
        <ul className={`mt-4 lg:mt-0 space-y-2 lg:space-y-4 ${isOpen ? 'block' : 'hidden'} lg:block`}>
          <li>
            <h2 className='text-base lg:text-lg font-semibold mb-1 lg:mb-2'>Contacts</h2>
            <ul className='pl-2 lg:pl-4 space-y-1 lg:space-y-2'>
              <li>
                <NavLink to='/' className={navLinkClass} end onClick={() => setIsOpen(false)}>
                  Show Contacts
                </NavLink>
              </li>
              <li>
                <NavLink to='/create-contact' className={navLinkClass} onClick={() => setIsOpen(false)}>
                  Create Contact
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink to='/map-and-chart' className={navLinkClass} onClick={() => setIsOpen(false)}>
              Chart and Map
            </NavLink>
          </li>
        </ul>
      </nav>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;