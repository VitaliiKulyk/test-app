export async function getCurrentGeoLocation() {
	if (!navigator.geolocation) return Promise.reject({ error: 'Geolocation is not supported by this browser.' });

	try {
        const position = await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
        if (position.coords) {
            const { latitude, longitude } = position.coords;
            return Promise.resolve({ latitude, longitude });
        }
    }
    catch (error) {
        var message;
        switch (error.code) {
            case error.PERMISSION_DENIED:
                message = 'User denied the request for Geolocation.';
                break;
            case error.POSITION_UNAVAILABLE:
                message = 'Location information is unavailable.';
                break;
            case error.TIMEOUT:
                message = 'The request to get user location timed out.';
                break;
            default:
                message = 'An unknown error occurred.';
                break;
        }
        return Promise.reject({ message });
    }
}
