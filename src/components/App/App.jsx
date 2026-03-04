import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";

import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { getItems, addItem, deleteItem, addCardLike, removeCardLike, updateUser } from "../../utils/api";
import { location, apiKey } from "../../utils/constants";
import { authorize, register, checkToken } from "../../utils/auth";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem("jwt");
  if (!token) return;



  checkToken(token)
    .then((userData) => {
      setCurrentUser(userData);
      setIsLoggedIn(true);
    })
    .catch((err) => {
      console.log(err);
      localStorage.removeItem("jwt");
      setIsLoggedIn(false);
      setCurrentUser({});
    });
}, []);

  const handleRegister = ({ name, avatar, email, password }) => {
  register({ name, avatar, email, password })
    .then(() => {
      // auto-login after successful registration
      return authorize({ email, password });
    })
    .then((res) => {
      localStorage.setItem("jwt", res.token);
      setIsLoggedIn(true);
      return checkToken(res.token);
    })
    .then((userData) => {
      setCurrentUser(userData);
      handleModalClose();
    })
    .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    authorize({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        return checkToken(res.token);
      })
      .then((userData) => {
       setCurrentUser(userData);
       handleModalClose();
      })
      .catch(console.error);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    setActiveModal("");
    navigate("/");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("item-modal");
  };

  const handleAddCard = () => {
    if (!isLoggedIn) {
     setActiveModal("login");
      return;
    }
    setActiveModal("add-garment");
  };

  const handleModalClose = () => {
    setActiveModal("");
    setSelectedCard({});
  };

  const openDeleteModal = (card) => {
    setSelectedCard(card);
    setActiveModal("delete-modal");
  };
  
  const handleCardLike = ({ id, isLiked }) => {
  const token = localStorage.getItem("jwt");
  if (!token) return;

  const request = !isLiked ? addCardLike(id, token) : removeCardLike(id, token);

  request
    .then((updatedCard) => {
      setClothingItems((cards) =>
        cards.map((item) => (item._id === id ? updatedCard : item))
      );
    })
    .catch(console.error);
};

const handleUpdateUser = ({ name, avatar }) => {
  const token = localStorage.getItem("jwt");
  if (!token) return;

  updateUser({ name, avatar }, token)
    .then((updatedUser) => {
      setCurrentUser(updatedUser);
      handleModalClose();
    })
    .catch(console.error);
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
  const token = localStorage.getItem("jwt");

  addItem(item, token)
    .then((newItem) => {
      setClothingItems((prev) => [newItem, ...prev]);
      resetForm();
      handleModalClose();
    })
    .catch(console.error);
};

const handleDeleteItem = (item) => {
  if (item == null || item._id == null) return;

  const token = localStorage.getItem("jwt");

  deleteItem(item._id, token)
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
    <CurrentUserContext.Provider value={currentUser}>
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
            isLoggedIn={isLoggedIn}
            onLoginClick={() => setActiveModal("login")}
            onRegisterClick={() => setActiveModal("register")}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                  handleCardLike={handleCardLike}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile
                  clothingItems={clothingItems}
                  handleAddCard={handleAddCard}
                  handleCardClick={handleCardClick}
                  currentUser={currentUser}
                  onSignOut={handleSignOut}
                  onEditProfile={() => setActiveModal("edit-profile")}
                />
                </ProtectedRoute>
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

        <LoginModal
          activeModal={activeModal}
          handleModalClose={handleModalClose}
          onLogin={handleLogin}
        />

        <RegisterModal
          activeModal={activeModal}
          handleModalClose={handleModalClose}
          onRegister={handleRegister}
        />
        <EditProfileModal
          activeModal={activeModal}
          handleModalClose={handleModalClose}
          onUpdateUser={handleUpdateUser}
        />

      </div>
    </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
