const apiKey = 'cd2545b06dd383830b4799f6b8d3e5c4';
let currentPage = 1;
const itemsPerPage = 1;

async function fetchWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const errorDiv = document.getElementById('error');
    errorDiv.innerHTML = "";

    if (city === "") {
        errorDiv.textContent = "Please enter a city name.";
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error("City not found or API limit reached");

        const data = await response.json();
        displayWeatherData([data]);
    } catch (error) {
        errorDiv.textContent = error.message;
    }
}

function displayWeatherData(dataArray) {
    const weatherData = document.getElementById('weatherData');
    weatherData.innerHTML = ""; 

    const pageData = dataArray.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    pageData.forEach(data => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.name}</td>
            <td>${data.main.temp} °C</td>
            <td>${data.main.humidity} %</td>
            <td>${data.weather[0].description}</td>
        `;
        weatherData.appendChild(row);
    });
}

function nextPage() {
    currentPage++;
    fetchWeather();
}

function previousPage() {
    if (currentPage > 1) currentPage--;
    fetchWeather();
}