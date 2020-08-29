import Axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL, IMAGE_TYPE, KEY, PER_PAGE } from '../../api/images.api';

export default function GetImageData(query, pageNumber) {
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		setImages([]);
	}, [query]);

	useEffect(() => {
		setLoading(true);
		setError(false);
		let cancel;
		Axios({
			method: 'GET',
			url: `${BASE_URL}?key=${KEY}&q=${query}&image_type=${IMAGE_TYPE}&per_page=${PER_PAGE}&page=${pageNumber}&editors_choice=true&safesearch=true&pretty=true`,
			cancelToken: new Axios.CancelToken((c) => (cancel = c)),
		})
			.then((res) => {
				setImages((prevImages) => {
					return [...prevImages, ...res.data.hits];
				});
				setLoading(false);
			})
			.catch((e) => {
				if (Axios.isCancel(e)) return;
				setError(true);
			});
		return () => cancel();
	}, [pageNumber, query]);

	return { images, loading, error };
}
