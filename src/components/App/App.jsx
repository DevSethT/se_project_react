import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import DeleteModal from "../DeleteModal/DeleteModal";

import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";

import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import { location, apiKey } from "../../utils/constants";

import { getItems, addItem, deleteItem } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    location: "",
  });

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const [clothingItems, setClothingItems] = useState([]);

  const [selectedCard, setSelectedCard] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("item-modal");
  };

  const handleAddCard = () => {
    setActiveModal("add-garment");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened((prev) => !prev);
  };

  const handleModalClose = () => {
    setActiveModal("");
    setSelectedCard({});
  };

  const openDeleteModal = (card) => {
    setSelectedCard(card);
    setActiveModal("delete-modal");
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        handleModalClose();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [activeModal]);

  useEffect(() => {
    if (!activeModal) return;

    const handleClickOutsideModal = (e) => {
      if (e.target.classList.contains("modal")) {
        handleModalClose();
      }
    };

    window.addEventListener("mousedown", handleClickOutsideModal);
    return () =>
      window.removeEventListener("mousedown", handleClickOutsideModal);
  }, [activeModal]);

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

  useEffect(() => {
    getItems()
      .then((items) => setClothingItems(items))
      .catch((err) => console.error("Failed to fetch items:", err));
  }, []);

  const handleAddItem = (itemData, resetForm) => {
    addItem(itemData)
      .then((newItem) => {
        setClothingItems((prev) => [newItem, ...prev]);
        if (typeof resetForm === "function") resetForm();
        handleModalClose();
      })
      .catch((err) => console.error("Failed to add item:", err));
  };

  const handleDeleteItem = (item) => {
    if (!item?._id) return;

    deleteItem(item._id)
      .then(() => {
        setClothingItems((prev) => prev.filter((i) => i._id !== item._id));
        handleModalClose();
        setSelectedCard({});
      })
      .catch((err) => console.error("Failed to delete item:", err));
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
          onOpenDelete={openDeleteModal}
        />

        <DeleteModal
          activeModal={activeModal}
          onClose={handleModalClose}
          onCardDelete={handleDeleteItem}
          selectedCard={selectedCard}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
