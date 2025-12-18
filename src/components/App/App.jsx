import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalwithForm";
import { getWeather } from "../../utils/weatherAPI";
import { location, apiKey } from "../../utils/constants";
// import ItemModel from "../ItemModal/ItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "hot",
    temp: { F: 999, C: 999 },
  });

  useEffect(() => {
    getWeather(location, apiKey)
      .then((data) => {
        if (data.main.temp >= 86) {
          return "hot";
        } else if (data.main.temp >= 66) {
          return "warm";
        } else {
          return "cold";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="app">
      <div className="app__content">
        <Header />
        <Main weatherData={weatherData} />
        <Footer />
      </div>
      <ModalWithForm />
    </div>
  );
}

export default App;
