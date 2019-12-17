import React from 'react';

export default function WeatherInfoConponent(props) {
	var { country, city, temp, iconUrl } = props;
	return (
		<div className="weatherInfo">
            <div>
			<img src={iconUrl} alt="weatherIcon" />
            </div>
			<div className="stats">
				<div className="headerText">
					Temperature in {city}, {country}
				</div>
				<div className="tempText">{temp} °C</div>
			</div>
		</div>
	);
}
