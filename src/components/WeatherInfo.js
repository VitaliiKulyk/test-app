import React from 'react';

export default function WeatherInfoConponent(props) {
	var { country, city, temp, changedTemp, iconUrl } = props;
	return (
		<div className="weatherInfo">
			<div>
				<img src={iconUrl} alt="weatherIcon" />
			</div>
			<div className="stats">
				<div className="headerText">
					Temperature in {city}, {country}
				</div>
				<div className="tempText">
					{Number.isFinite(changedTemp) && '*'} {Number.isFinite(changedTemp) ? changedTemp : temp} °C
				</div>
			</div>
		</div>
	);
}
