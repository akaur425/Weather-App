// Carousel functionality
let currentIndex = 0;
const cards = document.querySelectorAll('.weather-card');
const dots = document.querySelectorAll('.dot');
const totalCards = cards.length;

function updateCarousel() {
    cards.forEach((card, index) => {
        card.classList.remove('center', 'left', 'right', 'hidden');

        if (index === currentIndex) {
            card.classList.add('center');
        } else if (index === (currentIndex - 1 + totalCards) % totalCards) {
            card.classList.add('left');
        } else if (index === (currentIndex + 1) % totalCards) {
            card.classList.add('right');
        } else {
            card.classList.add('hidden');
        }
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function selectCard(index) {
    currentIndex = index;
    updateCarousel();
}

function nextCard() {
    currentIndex = (currentIndex + 1) % totalCards;
    updateCarousel();
}

function prevCard() {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateCarousel();
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevCard();
    if (e.key === 'ArrowRight') nextCard();
});
const getWeather = (city) => {
    const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=' + city;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'd62180dff7mshe4815cd3d89efdcp14589fjsn3f603aa54c3a',
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    cityName.innerHTML = city;

    async function fetchData() {
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);

            const {
                wind_mph, wind_kph, wind_degree, wind_dir, pressure_mb, pressure_in,
                precip_mm, precip_in, humidity, cloud, feelslike_c, feelslike_f,
                windchill_c, windchill_f, heatindex_c, heatindex_f, dewpoint_c,
                dewpoint_f, vis_km, vis_miles, uv, gust_mph, gust_kph, temp_c, temp_f
            } = result.current;

            // Updating HTML elements
            document.getElementById('wind_mph').innerHTML = wind_mph;
            document.getElementById('wind_degree').innerHTML = wind_degree;
            document.getElementById('wind_dir').innerHTML = wind_dir;
            document.getElementById('pressure_in').innerHTML = pressure_in;
            document.getElementById('precip_in').innerHTML = precip_in;
            document.getElementById('humidity').innerHTML = humidity;
            document.getElementById('cloud').innerHTML = cloud;
            document.getElementById('feelslike_c').innerHTML = feelslike_c;
            document.getElementById('windchill_c').innerHTML = windchill_c;
            document.getElementById('heatindex_c').innerHTML = heatindex_c;
            document.getElementById('dewpoint_c').innerHTML = dewpoint_c;
            document.getElementById('vis_km').innerHTML = vis_km;
            document.getElementById('uv').innerHTML = uv;
            document.getElementById('UV').innerHTML = uv;
            document.getElementById('gust_mph').innerHTML = gust_mph;
            document.getElementById('temp_f').innerHTML = temp_c;
            document.getElementById('temp').innerHTML = temp_c;

            // *** APPLY WEATHER EFFECTS HERE - INSIDE fetchData() ***
            const weatherCondition = result.current.condition.text;
            console.log('Weather Condition:', weatherCondition); // Debug log
            if (window.weatherEffects) {
                weatherEffects.detectAndApplyWeather(weatherCondition);
            }

            document.getElementById('units1').addEventListener("click", () => {
                document.getElementById('temp_f').innerHTML = temp_c + "°C";
                document.getElementById('wind_degree').innerHTML = wind_degree + "°";
                document.getElementById('heatindex_c').innerHTML = heatindex_c + "°C";
                document.getElementById('gust_mph').innerHTML = gust_mph + "mph";
            });

            document.getElementById('units2').addEventListener("click", () => {
                document.getElementById('dewpoint_c').innerHTML = dewpoint_c + "°C";
                document.getElementById('uv').innerHTML = uv;
                document.getElementById('feelslike_c').innerHTML = feelslike_c + "°C";
                document.getElementById('cloud').innerHTML = cloud + "%";
            });

            document.getElementById('units3').addEventListener("click", () => {
                document.getElementById('humidity').innerHTML = humidity + "%";
                document.getElementById('precip_in').innerHTML = precip_in + "in";
                document.getElementById('vis_km').innerHTML = vis_km + "km";
                document.getElementById('windchill_c').innerHTML = windchill_c + "°C";
                document.getElementById('pressure_in').innerHTML = pressure_in + "in";
                document.getElementById('wind_dir').innerHTML = wind_dir;
            });

        } catch (error) {
            console.error(error);
        }
    }
    fetchData();
}

submit.addEventListener("click", (event) => {
    event.preventDefault();
    getWeather(city.value);
});

getWeather("Vancouver");

const weather = (cityN) => {
    const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=' + cityN;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'd62180dff7mshe4815cd3d89efdcp14589fjsn3f603aa54c3a',
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    async function fetchData() {
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);

            const {
                wind_mph, wind_kph, wind_degree, wind_dir, pressure_mb, pressure_in,
                precip_mm, precip_in, humidity, cloud, feelslike_c, feelslike_f,
                windchill_c, windchill_f, heatindex_c, heatindex_f, dewpoint_c,
                dewpoint_f, vis_km, vis_miles, uv, gust_mph, gust_kph, temp_c, temp_f
            } = result.current;

            document.getElementById(cityN + '_Cloud_Pct').innerHTML = cloud + "%";
            document.getElementById(cityN + '_Feels_Like').innerHTML = feelslike_c + "°C";
            document.getElementById(cityN + '_Humidity').innerHTML = humidity + "%";
            document.getElementById(cityN + '_UV index').innerHTML = uv;
            document.getElementById(cityN + '_Dew Point').innerHTML = dewpoint_c + "°C";
            document.getElementById(cityN + '_Heat index').innerHTML = heatindex_c + "°C";
            document.getElementById(cityN + '_Gust in mph').innerHTML = gust_mph + "mph";
            document.getElementById(cityN + '_Temp').innerHTML = temp_c + "°C";
            document.getElementById(cityN + '_Wind_degrees').innerHTML = wind_degree + "°";
            document.getElementById(cityN + '_Wind_dir').innerHTML = wind_dir;
        }
        catch (error) {
            console.error(error);
        }
    }
    fetchData();
}

weather("Princeton");
weather("Boston");
weather("Surrey");
weather("New York");
weather("Punjab");
weather("Switzerland");

document.getElementById('Delhi').addEventListener('click', () => getWeather('Delhi'));
document.getElementById('Vancouver').addEventListener('click', () => getWeather('Vancouver'));
document.getElementById('Seattle').addEventListener('click', () => getWeather('Seattle'));
document.getElementById('Home').addEventListener('click', () => getWeather('Vancouver'));
document.getElementById('Weather App').addEventListener('click', () => getWeather('Vancouver'));