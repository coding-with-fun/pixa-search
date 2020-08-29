import React from 'react';

function RightNav({ isOpen }) {
	let navClass = '';
	if (!isOpen) navClass = 'nav-closed';
	else navClass = 'nav-open';

	console.log(isOpen);
	return (
		<ul className={navClass}>
			<li>A</li>
			<li>B</li>
			<li>C</li>
			<li>D</li>
			<li>E</li>
		</ul>
	);
}

export default RightNav;
