const weatherContainer = document.getElementById("weather");

// Reemplaza con tu clave real:
const apiKey = "4490783907341695b55069d1b7679505";
const city = "Alcala de Henares,ES";

const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

async function getWeather() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    const current = data.list[0];
    const currentTemp = current.main.temp;
    const description = current.weather[0].description;

    let forecastHtml = `
      <p><strong>Now:</strong> ${currentTemp.toFixed(1)}°C - ${description}</p>
      <ul>
    `;

    // Mostrar los próximos 3 días a las 12:00h
    const forecastDays = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(1, 4);

    forecastDays.forEach(item => {
      const date = new Date(item.dt_txt).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
      const temp = item.main.temp.toFixed(1);
      forecastHtml += `<li><strong>${date}:</strong> ${temp}°C</li>`;
    });

    forecastHtml += `</ul>`;
    weatherContainer.innerHTML = forecastHtml;

  } catch (error) {
    weatherContainer.innerHTML = "<p>Weather data unavailable.</p>";
    console.error("Weather error:", error);
  }
}

getWeather();
