import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from "../components/dropdown";
import { useWeather } from "../hooks/use-weather";
import { locations } from '../utils/locations';
import { useWeatherConditionImg } from "../hooks/use-weather-condition-img";
import { useWeatherGradient } from "../hooks/use-weather-gradients";
import { useClickOutside } from "../hooks/use-click-outside";
import { faCopy } from '@fortawesome/free-solid-svg-icons';

// Get necessary data
interface WeatherData {
	current: {
		condition: {
			code: number,
			icon: string,
			text: string,
		},
		is_day: boolean,
		temp_c: number,
	},
	location: {
		name: string
	},
}

export default function LocationInfo() {
	const [selectedLocation, setSelectedLocation] = useState<string | null>();
	// Weather
	const weatherQuery = useWeather(selectedLocation ?? "");
	const [weatherData, setWeatherData] = useState<WeatherData>();
	// Tooltip
	const [showTooltip, setShowTooltip] = useState(false);
	const tooltipRef = useRef<HTMLDivElement>(null);

	// Set query
	useEffect(() => {
		if (weatherQuery.isSuccess) setWeatherData(weatherQuery.data?.data);
	}, [weatherQuery.isSuccess, weatherQuery.data]);

	// Trigger refetch when the selected location changes
	useEffect(() => {
		weatherQuery.refetch();
	}, [selectedLocation]);

	// Close tooltip clicking outside
	useClickOutside(tooltipRef, () => {
		if (showTooltip) setShowTooltip(false);
	});

	return (
		<div className='flex-1 flex flex-col w-full max-w-xl mx-auto'>
			<Dropdown
				options={Object.values(locations).reduce<{ [key: string]: string }>((acc, locationName) => {
					acc[locationName] = locationName;
					return acc;
				}, {})} onOptionSelect={setSelectedLocation}>
				{"Select location"}
			</Dropdown>
			{weatherQuery.isPending && (
				<div className="transition-bg p-4 bg-white text-black min-h-[28rem] flex flex-col justify-center items-center text-center mt-3 rounded-3xl relative shadow-lg drop-shadow">
					<p className='font-bold text-2xl tracking-wide'>Loading...</p>
				</div>
			)}
			{!weatherQuery.isPending && weatherData && (
				<div
					className={`transition-bg ${useWeatherGradient(weatherData.current.condition.code, weatherData.current.is_day)} 
					p-4 text-white min-h-[28rem] flex flex-col justify-center items-center text-center mt-3 rounded-3xl relative shadow-lg drop-shadow`}
				>
					<img className="w-16 mb-5" src={useWeatherConditionImg({ code: weatherData.current.condition.code, isDay: weatherData.current.is_day })} />
					<p className='font-bold drop-shadow-[0_0_1px_rgba(0,0,0,1)]'>{weatherData.location.name}</p>
					<p className={`font-bold ${weatherData.current.condition.text.length < 10 ? 'text-3xl' : weatherData.current.condition.text.length < 20 ? 'text-2xl' : weatherData.current.condition.text.length < 30 ? 'text-xl' : 'text-lg'} drop-shadow-[0_0_1px_rgba(0,0,0,1)] tracking-wide`}>
						{weatherData.current.condition.text.toUpperCase()}
					</p>
					<p className={`font-bold text-3xl drop-shadow-[0_0_1px_rgba(0,0,0,1)] mt-5 bg-clip-text text-transparent ${weatherData.current.temp_c <= 0 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : weatherData.current.temp_c <= 15 ? 'bg-gradient-to-r from-cyan-500 to-yellow-500' : weatherData.current.temp_c <= 25 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-orange-500 to-red-500'}`}>
						{weatherData.current.temp_c}°
					</p>
					<div className="absolute top-5 right-5" ref={tooltipRef}>
						<FontAwesomeIcon icon={faCopy} className="text-white text-xl cursor-pointer shadow-lg drop-shadow transition-transform transform hover:scale-90" onClick={() => setShowTooltip(!showTooltip)} />
						{showTooltip && (
							<div className="absolute right-0 bg-white text-black p-4 rounded-md text-sm mt-1 text-left min-w-fit shadow-lg drop-shadow flex flex-col gap-2">
								<p className="flex flex-col w-max"><b>Capital</b> {weatherData.location.name}</p>
								<p className="flex flex-col w-max"><b>Condition</b> {weatherData.current.condition.text}</p>
								<p className="flex flex-col w-max"><b>Temperature</b> {weatherData.current.temp_c}°C</p>
								<p className="flex flex-col w-max"><b>Time of day</b> {weatherData.current.is_day ? "Day" : "Night"}</p>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
