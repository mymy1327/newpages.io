const ACCESS_KEY = "e0e6f67d290f588bf2b1b853ee40663e";
const locationQuery = "Riihimäki";
const units = "m";

const endpoint = `https://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=${locationQuery}&units=${units}`;

const displayElement = document.getElementById('weather-info');

async function fetchWeatherData() {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            displayElement.innerHTML = `<p>Error: Unable to fetch weather data. Status: ${response.status}</p>`;
            return;
        }

        const data = await response.json();

        if (data.error) {
            displayElement.innerHTML = `
                <h2>Error API WeatherStack</h2>
                <p>Code: ${data.error.code}, ${data.error.type}</p>
                <p>Info: ${data.error.info}</p>
            `;
            displayElement.style.color = 'red';
            return;
        }

        const city = data.location.name;
        const country = data.location.country;
        const temperature = data.current.temperature;
        const descripsion = data.current.weather_descriptions[0];
        const humidity = data.current.humidity;
        const localtime = data.location.localtime;

        displayElement.innerHTML = `
            <h2>Weather in ${city}, ${country}</h2>
            <p class='temperature'>Temperature: ${temperature} °C</p>
            <p class='description'>Description: ${descripsion}</p>
            <p class='humidity'>Humidity: ${humidity}%</p>
            <p class='local-time'>Local Time: ${localtime}</p>
        `;
    } catch (error) {
        console.error('Fetch Error:', error);
        displayElement.innerHTML = `<p>Error: Unable to fetch weather data.</p>`;
    }
}

fetchWeatherData();
