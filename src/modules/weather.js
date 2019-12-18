import axios from 'axios';

export async function getWeatherByLocation({ latitude, longitude }) {
	var response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			lat: latitude,
			lon: longitude,
			units: 'metric',
			appid: '46a990336fddc7a7d9a1dc020c179d83'
		}
	});
	var { data } = response;
	var city = data.name;
	var country = data.sys.country;
	var temp = data.main.temp;
	var icon = data.weather[0].icon;
	var iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

	return {
		country,
		city,
		temp,
		icon,
		iconUrl
	};
}
