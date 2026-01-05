import { useState, useEffect } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import { location, apiKey } from "../../utils/constants";
import { defaultClothingItems } from "../../utils/constants";
import { Routes, Route } from 'react-router-dom';
import Profile from '../Profile/Profile';


function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    location: "",
  });

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
  setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
};

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  // modal open/close functions
  const [selectedCard, setSelectedCard] = useState({});

  const [activeModal, setActiveModal] = useState("");

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const handleCardClick = (card) => {
    setActiveModal("item-modal");
    setSelectedCard(card);
  };

  const handleAddCard = () => {
    setActiveModal("add-garment");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened((prev) => !prev);
  };

  const handleModalClose = () => {
    setActiveModal("");
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        handleModalClose();
      }
    };
    if (activeModal) {
      window.addEventListener("keydown", handleEscapeKey);
    }
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [activeModal, handleModalClose]);

  useEffect(() => {
    const handleClickOutsideModal = (e) => {
      if (e.target.classList.contains("modal")) {
        handleModalClose();
      }
    };
    if (activeModal) {
      window.addEventListener("mousedown", handleClickOutsideModal);
    }
    return () => {
      window.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, [activeModal]);

  // weather api
  useEffect(() => {
    getWeather(location, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => {
        console.error("Failed to fetch weather data:", err);
      });
  }, []);

  // form submit
  const onSubmit = (modal) => {
    modal.preventDefault();
    handleModalClose();
  };

  return (
 <CurrentTemperatureUnitContext.Provider
    value={{ currentTemperatureUnit, handleToggleSwitchChange }}
  >
    <div className="page">
      <div className="page__content">
        <Header
          weatherData={weatherData}
          handleAddCard={handleAddCard}
          toggleMobileMenu={toggleMobileMenu}
          isMobileMenuOpened={isMobileMenuOpened}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                weatherData={weatherData}
                handleCardClick={handleCardClick}
                clothingItems={clothingItems}
              />
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>

        <Footer />
      </div>

      <ModalWithForm
        name="add-garment"
        isOpen={activeModal === "add-garment"}
        handleModalClose={handleModalClose}
        onSubmit={onSubmit}
        title="New garment"
        buttonText="Add garment"
      >
      </ModalWithForm>

      <ItemModal
        activeModal={activeModal}
        selectedCard={selectedCard}
        handleModalClose={handleModalClose}
      />
    </div>
  </CurrentTemperatureUnitContext.Provider>
);
}

export default App;
