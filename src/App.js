import React, { useState, useEffect } from 'react';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';

import GeoInfoConponent from './components/GeoInfo';
import WeatherInfoComponent from './components/WeatherInfo';

import { getCurrentGeoLocation } from './modules/geo';
import { getWeatherByLocation } from './modules/weather';

function App() {
	const [geoLocation, setGeoLocation] = useState();
	const [weatherData, setWeatherData] = useState();
	const [changedTemp, setChangedTemp] = useState(null);

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

		if (geoLocation && geoLocation.latitude) getWeather();
	}, [geoLocation]);

	function getColor() {
		var temp = Number.isFinite(changedTemp) ? changedTemp : weatherData && weatherData.temp;
		if (temp < -10) return '#00ffff';
		if (temp > 10) return '#ff8c00';
		return '#fff700';
	}

	return (
		<div className="app" style={{ backgroundColor: getColor() }}>
			<GeoInfoConponent {...geoLocation} />
			{weatherData && (
				<React.Fragment>
					<WeatherInfoComponent {...weatherData} changedTemp={changedTemp} />
					<div className="sliderContainer">
						<Slider
							track={false}
							aria-labelledby="discrete-slider"
							valueLabelDisplay="auto"
							getAriaValueText={x => `${x}°C`}
							defaultValue={Math.floor(weatherData.temp)}
							marks={[
								{ value: -30, label: '-30°C' },
								{ value: 30, label: '30°C' }
							]}
							min={-30}
							max={30}
							value={Number.isFinite(changedTemp) ? changedTemp : weatherData.temp}
							valueLabelFormat={x => parseInt(x) + '°C'}
							onChange={(e, v) => setChangedTemp(v)}
						/>
						{Number.isFinite(changedTemp) && (
							<Button onClick={() => setChangedTemp(null)} color="primary">
								Reset to real data
							</Button>
						)}
					</div>
				</React.Fragment>
			)}
		</div>
	);
}

export default App;
