import React, { useState, useEffect } from 'react';
import { getCurrentGeoLocation } from './modules/geo';
import GeoInfoConponent from './components/GeoInfo';

import { getWeatherByLocation } from './modules/weather';


function App() {
	const [geoLocation, setGeoLocation] = useState();

	useEffect(() => {
		if (!geoLocation) {
			getLocation();
		}
	});

	async function getLocation() {
		try {
			var { latitude, longitude } = await getCurrentGeoLocation();
      setGeoLocation({ latitude, longitude });
      getWeatherByLocation({ latitude, longitude });
		} catch (error) {
			setGeoLocation({ error: error.message });
		}
	}

	return (
		<div className="app">
			<GeoInfoConponent {...geoLocation} />
		</div>
	);
}

export default App;
