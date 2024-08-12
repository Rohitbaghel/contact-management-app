import React from "react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block p-2 rounded transition duration-200 ${
      isActive ? 'bg-blue-700 text-white' : 'hover:bg-blue-700 text-blue-100'
    }`;

  return (
		<nav className='bg-blue-600 text-white h-screen w-64 fixed left-0 top-0 p-4'>
			<h1 className='text-2xl font-bold mb-8'>Contact Management</h1>
			<ul className='space-y-4'>
				<li>
					<h2 className='text-lg font-semibold mb-2'>Contacts</h2>
					<ul className='pl-4 space-y-2'>
						<li>
							<NavLink to='/' className={navLinkClass} end>
								Show Contacts
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/create-contact'
								className={navLinkClass}
							>
								Create Contact
							</NavLink>
						</li>
					</ul>
				</li>
				<li>
					<NavLink to='/map-and-chart' className={navLinkClass}>
						Chart and Map
					</NavLink>
				</li>
			</ul>
		</nav>
  );
};

export default Navbar;