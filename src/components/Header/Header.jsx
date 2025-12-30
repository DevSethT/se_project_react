import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.webp";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Header({
  weatherData,
  handleAddCard,
  toggleMobileMenu,
  isMobileMenuOpened,
}) {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const location = weatherData.location;

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__container_logo-date">
          <img className="header__logo" src={logo} alt="WTWR logo" />
          <p className="header__date-location">
            {currentDate}, {location}
          </p>
        </div>

        {/* Desktop */}
        <div className="header__container_profile-details header__container_profile-details_desktop">
          <div className="header__temp-switch">
            <span
              className={
                currentTemperatureUnit === "F"
                  ? "header__temp-unit header__temp-unit_active"
                  : "header__temp-unit"
              }
            >
              F
            </span>

            <button
              type="button"
              className="header__temp-toggle"
              onClick={handleToggleSwitchChange}
            />

            <span
              className={
                currentTemperatureUnit === "C"
                  ? "header__temp-unit header__temp-unit_active"
                  : "header__temp-unit"
              }
            >
              C
            </span>
          </div>

          <button
            type="button"
            className="header__button"
            onClick={handleAddCard}
          >
            + Add Clothes
          </button>
          <p className="header__name">Terrence Tegegne</p>
          <img src={avatar} alt="profile picture" className="header__avatar" />
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

            <div className="header__temp-switch">
              <span
                className={
                  currentTemperatureUnit === "F"
                    ? "header__temp-unit header__temp-unit_active"
                    : "header__temp-unit"
                }
              >
                F
              </span>

              <button
                type="button"
                className="header__temp-toggle"
                onClick={handleToggleSwitchChange}
              />

              <span
                className={
                  currentTemperatureUnit === "C"
                    ? "header__temp-unit header__temp-unit_active"
                    : "header__temp-unit"
                }
              >
                C
              </span>
            </div>

            <button
              type="button"
              className="header__button"
              onClick={handleAddCard}
            >
              + Add Clothes
            </button>

            <div className="header__details-mobile">
              <p className="header__name">Terrence Tegegne</p>
              <img
                src={avatar}
                alt="profile picture"
                className="header__avatar"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
