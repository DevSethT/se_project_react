import "./WeatherCard.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { weatherImages } from "../../utils/constants";
const defaultWeatherImage = new URL(
  "../../assets/default.webp",
  import.meta.url
).href;

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const tempF = weatherData?.temp?.F; // ✅ capital F
  const tempC = tempF != null ? Math.round(((tempF - 32) * 5) / 9) : null;

  const displayTemp = currentTemperatureUnit === "F" ? tempF : tempC;

  const filteredOptions = weatherImages.filter((item) => {
    return (
      item.day === weatherData.isDay && item.condition === weatherData.condition
    );
  });

  const weatherOption = filteredOptions[0]?.image || defaultWeatherImage;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {displayTemp}°{currentTemperatureUnit}
      </p>
      <img
        src={weatherOption}
        alt={weatherData.condition}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
