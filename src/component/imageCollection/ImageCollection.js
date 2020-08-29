import React, { useCallback, useRef, useState } from 'react';
import GetImageData from './GetImageData';
import './ImageCollection.css';

function ImageCollection() {
	const [query, setQuery] = useState('');
	const [pageNumber, setPageNumber] = useState(1);

	const { images, loading, error } = GetImageData(query, pageNumber);

	const observer = useRef();
	const lastImageElementRef = useCallback(
		(node) => {
			if (loading) return;
			if (images.length === 0) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && !error) {
					console.log('Reached end...');
					setPageNumber((prevNumber) => prevNumber + 1);
				}
			});
			if (node) observer.current.observe(node);
		},
		[loading, error, images.length],
	);

	return (
		<>
			<div className='container'>
				<div className='search__box'>
					<input
						type='text'
						placeholder='Search...'
						name='imageSearchInput'
						onChange={(e) => setQuery(e.target.value)}
					/>
				</div>
				<div className='check-condition'>
					{loading ? (
						<div className='loading'>
							<div className='dot'></div>
							<div className='dot'></div>
							<div className='dot'></div>
							<div className='dot'></div>
							<div className='dot'></div>
						</div>
					) : images.length === 0 ? (
						<h1 className='no-results'>No results found!!</h1>
					) : null}
				</div>

				<div className='photo__container'>
					{images?.map((image, index) => {
						if (images.length === index + 1) {
							return (
								<div
									className='photo__card'
									ref={lastImageElementRef}
									key={image.id}
								>
									<img
										src={image.largeImageURL}
										alt={image.user}
										loading='eager'
									/>
								</div>
							);
						} else {
							return (
								<div className='photo__card' key={image.id}>
									<img src={image.largeImageURL} alt={image.user} />
								</div>
							);
						}
					})}
				</div>
			</div>
		</>
	);
}

export default ImageCollection;
