import "./Main.css";
import WeatherCard from "../WetherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main() {
  return (
    <main className="main">
      <WeatherCard />
      <section className="cards">
        <p className="cards__text">
          Today is 75 &deg; F / You may want to wear:
        </p>
        <ItemCard />
      </section>
    </main>
  );
}

export default Main;
