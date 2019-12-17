import React, { useState, useEffect } from 'react';

import GeoInfoConponent from './components/GeoInfo';
import WeatherInfoComponent from './components/WeatherInfo';

import { getCurrentGeoLocation } from './modules/geo';
import { getWeatherByLocation } from './modules/weather';

function App() {
	const [geoLocation, setGeoLocation] = useState();
	const [weatherData, setWeatherData] = useState();

	useEffect(() => {
		async function getLocation() {
			try {
				var { latitude, longitude } = await getCurrentGeoLocation();
				setGeoLocation({ latitude, longitude });
			} catch (error) {
				setGeoLocation({ error: error.message });
			}
		}

		if (!geoLocation) getLocation();
	});

	useEffect(() => {
		async function getWeather() {
			try {
				var { latitude, longitude } = geoLocation;
				var weatherData = await getWeatherByLocation({ latitude, longitude });
				setWeatherData(weatherData);
			} catch (error) {
				setGeoLocation({ error: 'error' });
			}
		}

		if (geoLocation) getWeather();
	}, [geoLocation]);

	function getColor() {
		var temp = weatherData && weatherData.temp;
		if (temp < -10) return '#0ffff';
		if (temp > 10) return '#ff8c00';
		return '#fff700';
	}

	return (
		<div className="app" style={{ backgroundColor: getColor() }}>
			<GeoInfoConponent {...geoLocation} />
			{weatherData && <WeatherInfoComponent {...weatherData} />}
		</div>
	);
}

export default App;
