import { checkResponse } from "./api";

export const getWeather = ({ latitude, longitude }, apiKey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  ).then(checkResponse);
};

export const filterWeatherData = (data) => {
  const tempF = Math.round(data.main.temp);

  return {
    location: data.name,
    temp: {
      F: tempF,
      C: Math.round(((tempF - 32) * 5) / 9),
    },
    type: getWeatherType(tempF),
    condition: data.weather[0].main.toLowerCase(),
    isDay: isDay(data.sys, Date.now()),
  };
};

const getWeatherType = (temp) => {
  if (temp >= 80) return "hot";
  if (temp >= 66) return "warm";
  return "cold";
};

const isDay = ({ sunrise, sunset }, now) => {
  return now > sunrise * 1000 && now < sunset * 1000;
};
