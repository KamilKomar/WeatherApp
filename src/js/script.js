const inputCity = document.querySelector(".modal__city");
const searchBtn = document.querySelector(".modal__button");
const changeCityBtn = document.querySelector(".weather__city-btn");
const cityName = document.querySelector(".weather__city-name");
const modal = document.querySelector(".modal");
const modalError = document.querySelector(".modal__error");
const weather = document.querySelector(".weather");
const wrapper = document.querySelector(".wrapper");
const hum = document.querySelector(".weather__hum");
const press = document.querySelector(".weather__press");
const wind = document.querySelector(".weather__wind");
const weatherMain = document.querySelector(".weather__main");
const darkBtn = document.querySelectorAll(".darkModeBtn");

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&appid=9e76c597257586cd1d4bb74a74d2c9c7";
//
const units = "&units=metric";
let $city;
let $url;

const getWeather = () => {
    $city = inputCity.value;
    $url = apiUrl + $city + apiKey + units;
    console.log($url);
    axios
        .get($url)
        .then((res) => {
            console.log(res);
            modal.style.display = "none";
            cityName.textContent = res.data.name;
            const weatherBox = document.createElement("div");
            weatherBox.classList.add("weather__box");
            weatherBox.insertAdjacentHTML(
                "afterbegin",
                `
                <i class="weather__box-icon wi wi-owm-${
                    res.data.weather[0].id
                }"></i>
                <p class="weather__box-temp">${
                    res.data.main.temp.toFixed(1) + "°C"
                }</p>
                <p class="weather__box-name">${
                    res.data.weather[0].description
                }</p>
            `
            );
            weatherMain.appendChild(weatherBox);
            wind.textContent = `${res.data.wind.speed} m/s`;
            press.textContent = `${res.data.main.pressure} hPa`;
            hum.textContent = `${res.data.main.humidity} %`;
        })
        .catch(() => (modalError.textContent = "Enter the Correct City Name"));
};

const removeWeatherMain = () => {
    const boxToRemove = document.querySelector(".weather__box");
    weatherMain.removeChild(boxToRemove);
};

const changeCity = () => {
    modal.style.display = "block";
    inputCity.value = "";
    modalError.textContent = "";
    removeWeatherMain();
};

const enterCheck = () => {
    if (event.keyCode === 13) {
        getWeather();
    }
};

changeCityBtn.addEventListener("click", changeCity);
window.addEventListener("keyup", enterCheck);
searchBtn.addEventListener("click", getWeather);

//darkmode

function darkMode() {
    modal.classList.toggle("dark");
    weather.classList.toggle("dark");
    wrapper.classList.toggle("dark");
}

let setDarkMode = localStorage.getItem("dark");

darkBtn.forEach((btn) =>
    btn.addEventListener("click", () => {
        if (setDarkMode !== "on") {
            darkMode();
            setDarkMode = localStorage.setItem("dark", "on");
        } else {
            darkMode();
            setDarkMode = localStorage.setItem("dark", null);
        }
    })
);

if (setDarkMode === "on") {
    darkMode();
}
