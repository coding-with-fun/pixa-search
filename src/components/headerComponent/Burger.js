import React, { useState } from 'react';
import RightNav from './RightNav';

function Burger() {
	const [isOpen, setIsOpen] = useState(false);

	let burgerState = '';
	if (!isOpen) burgerState = 'burger-lines burger-closed';
	else burgerState = 'burger-lines burger-open';

	return (
		<>
			<div className='burger' onClick={() => setIsOpen(!isOpen)}>
				<div className={burgerState}></div>
				<div className={burgerState}></div>
				<div className={burgerState}></div>
			</div>
			{console.log(isOpen)}
			<RightNav isOpen={isOpen} />
		</>
	);
}

export default Burger;
