import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const useWeather = (country: string) => {
	const WEATHER_API_KEY = "b3d26897b61b48d8952203112241912";
	
	return useQuery({
		queryKey: ["weather", country],
		queryFn: () => {
			if (country) return axios.get(`http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${country}&aqi=no`);
			else return null
		},
		staleTime: 300000, // Fresh time (5 minutes before being obsolete/no-fresh)
		gcTime: 600000, // Cache time (10 minutes before deleting data from cache)
	});
}