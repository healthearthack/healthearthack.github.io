async function loadForecast() {

    try {

        const response =
            await fetch(
                "https://api.weather.gov/gridpoints/MKX/82,72/forecast"
            );

        const data =
            await response.json();

        const period =
            data.properties.periods[0];

        const text = `
            Forecast issued every 6 hours.

            ${period.name}

            Temperature:
            ${period.temperature}°

            Wind:
            ${period.windSpeed}

            Conditions:
            ${period.detailedForecast}
        `;

        document.getElementById(
            "forecastText"
        ).innerText = text;

        document.getElementById(
            "issuedTime"
        ).innerText =
            "Last Updated: " +
            new Date().toLocaleString();

    } catch(error) {

        console.error(error);

        document.getElementById(
            "forecastText"
        ).innerText =
            "Forecast unavailable.";
    }
}

function refreshSatellite() {

    const img =
        document.getElementById(
            "goesImage"
        );

    img.src =
        "https://cdn.star.nesdis.noaa.gov/GOES19/ABI/CONUS/GEOCOLOR/1250x750.jpg?t="
        + Date.now();
}

loadForecast();

refreshSatellite();

setInterval(
    loadForecast,
    21600000
);

setInterval(
    refreshSatellite,
    300000
);
