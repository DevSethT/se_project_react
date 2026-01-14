import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";

import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteModal from "../DeleteModal/DeleteModal";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { getItems, addItem, deleteItem } from "../../utils/api";
import { location, apiKey } from "../../utils/constants";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 0, C: 0 },
    location: "",
  });

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("item-modal");
  };

  const handleAddCard = () => setActiveModal("add-garment");

  const handleModalClose = () => {
    setActiveModal("");
    setSelectedCard({});
  };

  const openDeleteModal = (card) => {
    setSelectedCard(card);
    setActiveModal("delete-modal");
  };

  useEffect(() => {
    getWeather(location, apiKey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems().then(setClothingItems).catch(console.error);
  }, []);

  const handleAddItem = (item, resetForm) => {
    addItem(item)
      .then((newItem) => {
        setClothingItems((prev) => [newItem, ...prev]);
        resetForm();
        handleModalClose();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (item) => {
    if (item == null || item._id == null) return;

    deleteItem(item._id)
      .then(() => {
        setClothingItems((prev) => prev.filter((i) => i._id !== item._id));
        handleModalClose();
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") handleModalClose();
    };

    const handleClickOutside = (e) => {
      if (e.target.classList.contains("modal-overlay")) {
        handleModalClose();
      }
    };

    window.addEventListener("keydown", handleEscClose);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleEscClose);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeModal]);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            weatherData={weatherData}
            handleAddCard={handleAddCard}
            toggleMobileMenu={() => setIsMobileMenuOpened((p) => !p)}
            isMobileMenuOpened={isMobileMenuOpened}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleAddCard={handleAddCard}
                  handleCardClick={handleCardClick}
                />
              }
            />
          </Routes>

          <Footer />
        </div>

        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onAddItem={handleAddItem}
          onCloseModal={handleModalClose}
        />

        <ItemModal
          activeModal={activeModal}
          selectedCard={selectedCard}
          handleModalClose={handleModalClose}
          onDeleteClick={openDeleteModal}
        />

        <DeleteModal
          activeModal={activeModal}
          selectedCard={selectedCard}
          onClose={handleModalClose}
          onCardDelete={handleDeleteItem}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
