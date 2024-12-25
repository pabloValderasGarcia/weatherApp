import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from "../components/dropdown";
import { useWeather } from "../hooks/use-weather";
import { countryCodes } from '../utils/countries';
import { useCountry } from "../hooks/use-country";
import { useWeatherConditionImg } from "../hooks/use-weather-condition-img";
import { useWeatherGradient } from "../hooks/use-weather-gradients";
import { useClickOutside } from "../hooks/use-click-outside";
import { faCopy } from '@fortawesome/free-solid-svg-icons';

interface WeatherData {
	current: {
		is_day: boolean,
		condition: {
			code: number,
			icon: string,
			text: string,
		},
		temp_c: number,
	},
	location: {
		name: string
	},
}

export default function CountryInfo() {
	// Country
	const country = useCountry() || "Spain";
	const [selectedCountry, setSelectedCountry] = useState(country || "Spain");
	// Weather
	const weatherQuery = useWeather(selectedCountry);
	const [weatherData, setWeatherData] = useState<WeatherData>();
	const [fontSize, setFontSize] = useState('3xl');
	// Tooltip
	const [showTooltip, setShowTooltip] = useState(false);
	const tooltipRef = useRef<HTMLDivElement>(null);

	// Set query
	useEffect(() => {
		if (weatherQuery.isSuccess) setWeatherData(weatherQuery.data.data);
	}, [weatherQuery.isSuccess, weatherQuery.data]);

	// Trigger refetch when the selected country changes
	useEffect(() => {
		weatherQuery.refetch();
	}, [selectedCountry]);

	// Change font size depending on how long the condition is
	useEffect(() => {
		if (weatherData) {
			const length = weatherData.current.condition.text.length;
			if (length < 10) setFontSize('text-3xl');
			else if (length < 20) setFontSize('text-2xl');
			else if (length < 30) setFontSize('text-xl');
			else setFontSize('text-lg');
		}
	}, [weatherData]);

	// Close tooltip clicking outside
	useClickOutside(tooltipRef, () => {
		if (showTooltip) setShowTooltip(false);
	});

	return (
		<div className='flex-1 flex flex-col w-full max-w-xl mx-auto'>
			<Dropdown
				options={Object.values(countryCodes).reduce<{ [key: string]: string }>((acc, countryName) => {
					acc[countryName] = countryName;
					return acc;
				}, {})} onOptionSelect={setSelectedCountry}>
				{country}
			</Dropdown>
			{weatherData && (
				<div
					className={`transition-bg ${useWeatherGradient(weatherData.current.condition.code, weatherData.current.is_day)} 
					p-4 text-white min-h-[28rem] flex flex-col justify-center items-center text-center mt-2 rounded-3xl relative`}
				>
					{weatherQuery.isPending && <p className='font-bold text-2xl drop-shadow-[0_1px_1.5px_rgba(0,0,0,1)] tracking-wide'>Loading...</p>}
					{weatherData && !weatherQuery.isPending && (
						<>
							<img className="w-16 mb-5" src={useWeatherConditionImg({ code: weatherData.current.condition.code, isDay: weatherData.current.is_day })} />
							<p className='drop-shadow-[0_1px_1.5px_rgba(0,0,0,1)]'>{weatherData.location.name}</p>
							<p className={`font-bold ${fontSize} drop-shadow-[0_1px_1.5px_rgba(0,0,0,1)] tracking-wide`}>
								{weatherData.current.condition.text.toUpperCase()}
							</p>
							<p className={`font-bold text-3xl drop-shadow-[0_1px_1.5px_rgba(0,0,0,1)] mt-5 bg-clip-text text-transparent ${weatherData.current.temp_c <= 0 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : weatherData.current.temp_c <= 15 ? 'bg-gradient-to-r from-cyan-500 to-yellow-500' : weatherData.current.temp_c <= 25 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-orange-500 to-red-500'}`}>
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
						</>
					)}
				</div>
			)}
		</div>
	);
}
