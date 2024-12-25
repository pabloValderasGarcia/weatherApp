import { useState, useEffect } from 'react';
import { getCountryByCode } from '../utils/countries';
import axios from 'axios';

export const useCountry = () => {
	const [country, setCountry] = useState<string | null>(null);

	useEffect(() => {
		axios
			.get('https://ipinfo.io?token=82f7dfaa50d928')
			.then((res) => setCountry(getCountryByCode(res.data.country)))
			.catch(() => setCountry('Spain'));
	}, []);

	return country;
};