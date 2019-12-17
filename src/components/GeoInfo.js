import React from 'react';

export default function GeoInfoConponent(props) {
	return (
		<div className="geoInfo">
			{props.error && <div className="error">{props.error}</div>}
			{props.latitude && (
				<div className="positionInfo">
					<div className="positionText">Latitude: {props.latitude.toFixed(4)}</div>
					<div className="positionText">Longitude: {props.longitude.toFixed(4)}</div>
				</div>
			)}
		</div>
	);
}
