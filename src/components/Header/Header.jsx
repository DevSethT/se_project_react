import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.webp";
import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  weatherData,
  handleAddCard,
  toggleMobileMenu,
  isMobileMenuOpened,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const location = weatherData.location;

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__container_logo-date">
          {/* Logo -> main route */}
          <Link to="/" className="header__logo-link">
            <img className="header__logo" src={logo} alt="WTWR logo" />
          </Link>

          <p className="header__date-location">
            {currentDate}, {location}
          </p>
        </div>

        {/* Desktop */}
        <div className="header__container_profile-details header__container_profile-details_desktop">
          {/* ToggleSwitch is now its own component */}
          <ToggleSwitch />

          <button
            type="button"
            className="header__button"
            onClick={handleAddCard}
          >
            + Add Clothes
          </button>

          {/* Profile -> /profile route */}
          <Link to="/profile" className="header__profile-link">
            <p className="header__name">Terrence Tegegne</p>
            <img src={avatar} alt="profile picture" className="header__avatar" />
          </Link>
        </div>

        {!isMobileMenuOpened && (
          <button
            type="button"
            className="header__container_profile-details header__container_profile-details_mobile-button"
            onClick={toggleMobileMenu}
          />
        )}

        {/* Mobile */}
        {isMobileMenuOpened && (
          <div className="header__container_profile-details header__container_profile-details_mobile-modal">
            <button
              type="button"
              className="profile-modal__close-button"
              onClick={toggleMobileMenu}
            />

            {/* ToggleSwitch in mobile modal too */}
            <ToggleSwitch />

            <button
              type="button"
              className="header__button"
              onClick={handleAddCard}
            >
              + Add Clothes
            </button>

            <Link to="/profile" className="header__details-mobile header__profile-link">
              <p className="header__name">Terrence Tegegne</p>
              <img
                src={avatar}
                alt="profile picture"
                className="header__avatar"
              />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
