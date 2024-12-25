interface WeatherCondition {
	code: number;
	day: string;
	night: string;
};

// Define weather conditions
const weatherConditions: WeatherCondition[] = [
	{ code: 1000, day: "Sunny", night: "Clear" }, // Sunny - Clear
	{ code: 1003, day: "Partly cloudy", night: "Cloudy" }, // Partly cloudy
	{ code: 1006, day: "Cloudy", night: "Cloudy" }, // Cloudy
	{ code: 1009, day: "Cloudy", night: "Cloudy" }, // Overcast
	{ code: 1030, day: "Foggy", night: "Foggy" }, // Mist
	{ code: 1063, day: "Rainy", night: "Rainy" }, // Patchy rain possible
	{ code: 1066, day: "Snow", night: "Snow" }, // Patchy snow possible
	{ code: 1069, day: "Sleet", night: "Sleet" }, // Patchy sleet possible
	{ code: 1072, day: "Drizzle", night: "Drizzle" }, // Patchy freezing drizzle possible
	{ code: 1087, day: "Thunder", night: "Thunder" }, // Thundery outbreaks possible
	{ code: 1114, day: "Snow", night: "Snow" }, // Blowing snow
	{ code: 1117, day: "Snow", night: "Snow" }, // Blizzard
	{ code: 1135, day: "Foggy", night: "Foggy" }, // Fog
	{ code: 1147, day: "Foggy", night: "Foggy" }, // Freezing fog
	{ code: 1150, day: "Drizzle", night: "Drizzle" }, // Patchy light drizzle
	{ code: 1153, day: "Drizzle", night: "Drizzle" }, // Light drizzle
	{ code: 1168, day: "Drizzle", night: "Drizzle" }, // Freezing drizzle
	{ code: 1171, day: "Drizzle", night: "Drizzle" }, // Heavy freezing drizzle
	{ code: 1180, day: "Rainy", night: "Rainy" }, // Patchy light rain
	{ code: 1183, day: "Rainy", night: "Rainy" }, // Light rain
	{ code: 1186, day: "Rainy", night: "Rainy" }, // Moderate rain at times
	{ code: 1189, day: "Rainy", night: "Rainy" }, // Moderate rain
	{ code: 1192, day: "Rainy", night: "Rainy" }, // Heavy rain at times
	{ code: 1195, day: "Rainy", night: "Rainy" }, // Heavy rain
	{ code: 1198, day: "Rainy", night: "Rainy" }, // Light freezing rain
	{ code: 1201, day: "Rainy", night: "Rainy" }, // Moderate or heavy freezing rain
	{ code: 1204, day: "Sleet", night: "Sleet" }, // Light sleet
	{ code: 1207, day: "Sleet", night: "Sleet" }, // Moderate or heavy sleet
	{ code: 1210, day: "Snow", night: "Snow" }, // Patchy light snow
	{ code: 1213, day: "Snow", night: "Snow" }, // Light snow
	{ code: 1216, day: "Snow", night: "Snow" }, // Patchy moderate snow
	{ code: 1219, day: "Snow", night: "Snow" }, // Moderate snow
	{ code: 1222, day: "Snow", night: "Snow" }, // Patchy heavy snow
	{ code: 1225, day: "Snow", night: "Snow" }, // Heavy snow
	{ code: 1237, day: "Ice", night: "Ice" }, // Ice pellets
	{ code: 1240, day: "Rainy", night: "Rainy" }, // Light rain shower
	{ code: 1243, day: "Rainy", night: "Rainy" }, // Moderate or heavy rain shower
	{ code: 1246, day: "Rainy", night: "Rainy" }, // Torrential rain shower
	{ code: 1249, day: "Sleet", night: "Sleet" }, // Light sleet showers
	{ code: 1252, day: "Sleet", night: "Sleet" }, // Moderate or heavy sleet showers
	{ code: 1255, day: "Snow", night: "Snow" }, // Light snow showers
	{ code: 1258, day: "Snow", night: "Snow" }, // Moderate or heavy snow showers
	{ code: 1261, day: "Ice", night: "Ice" }, // Light showers of ice pellets
	{ code: 1264, day: "Ice", night: "Ice" }, // Moderate or heavy showers of ice pellets
	{ code: 1273, day: "Thunder", night: "Thunder" }, // Patchy light rain with thunder
	{ code: 1276, day: "Thunder", night: "Thunder" }, // Moderate or heavy rain with thunder
	{ code: 1279, day: "Snow", night: "Snow" }, // Patchy light snow with thunder
	{ code: 1282, day: "Snow", night: "Snow" }, // Moderate or heavy snow with thunder
];

// Custom hook
export const useWeatherConditionImg = ({ code, isDay }: { code: number; isDay: boolean }) => {
	const condition = weatherConditions.find((condition) => condition.code === code);

	if (!condition) return "/src/assets/img/weather-icons/no-entry.png";

	const timeOfDay = isDay ? "day" : "night";
	const conditionName = isDay ? condition.day : condition.night;

	return `/src/assets/img/weather-icons/${timeOfDay}/${conditionName.toLowerCase().replace(/\s+/g, '-')}.png`;
};
