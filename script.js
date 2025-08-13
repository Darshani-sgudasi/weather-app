
const apiKey = "c448dd096297fd58bc1e802d5ada0a27";

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const weatherDiv = document.getElementById("weatherResult");

    if (!city) {
        weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found ❌");
        }

        const data = await response.json();

        const { temp, feels_like, humidity } = data.main;
        const desc = data.weather[0].description;
        const icon = data.weather[0].icon;
        const wind = data.wind.speed;

        const weatherMain = data.weather[0].main.toLowerCase();
        const isNight = icon.includes("n");
        changeBackground(weatherMain, isNight);

        // Create container with time placeholder
        weatherDiv.innerHTML = `
            <div class="fade-in">
                <h3>${data.name}, ${data.sys.country}</h3>
                <p id="timeNow"></p> <!-- Live time here -->
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
                <p>🌡 Temperature: ${temp}°C</p>
                <p>🤔 Feels Like: ${feels_like}°C</p>
                <p>📝 Condition: ${desc}</p>
                <p>💧 Humidity: ${humidity}%</p>
                <p>💨 Wind Speed: ${wind} m/s</p>
            </div>
        `;

        // Start updating time without refreshing weather
        startClock();
    } catch (error) {
        weatherDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}

function changeBackground(weather, night) {
    let bg;
    if (weather.includes("clear")) {
        bg = night ? "#2c3e50" : "linear-gradient(to right, #fbc531, #e1b12c)";
    } else if (weather.includes("cloud")) {
        bg = night ? "#34495e" : "linear-gradient(to right, #d7d2cc, #304352)";
    } else if (weather.includes("rain")) {
        bg = "linear-gradient(to right, #00c6fb, #005bea)";
    } else if (weather.includes("snow")) {
        bg = "linear-gradient(to right, #e6dada, #274046)";
    } else {
        bg = "linear-gradient(to right, #6dd5fa, #2980b9)";
    }
    document.body.style.background = bg;
}

// Live time updater
function startClock() {
    function updateTime() {
        const now = new Date();
        document.getElementById("timeNow").textContent =
            now.toLocaleDateString() + " " + now.toLocaleTimeString();
    }
    updateTime(); // Initial call
    setInterval(updateTime, 1000);
}

document.getElementById("cityInput").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});
// Live time updater with day
function startClock() {
    function updateTime() {
        const now = new Date();
        const dayName = now.toLocaleDateString(undefined, { weekday: 'long' });
        const dateStr = now.toLocaleDateString();
        const timeStr = now.toLocaleTimeString();

        document.getElementById("timeNow").textContent =
            `${dayName}, ${dateStr} ${timeStr}`;
    }
    updateTime(); // Initial call
    setInterval(updateTime, 1000);
}
