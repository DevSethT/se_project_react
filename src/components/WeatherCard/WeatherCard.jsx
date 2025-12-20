import "./WeatherCard.css";
import cloudy from "../../assets/weathercardimages/cloudy.webp";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData}° F</p>
      <img src={cloudy} alt="" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
