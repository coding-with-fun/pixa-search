import React from 'react';
import Burger from './Burger';
import './Navbar.css';
function Navbar() {
	return (
		<div className='nav'>
			<div className='logo'>Nav Bar</div>
			<Burger />
		</div>
	);
}

export default Navbar;
