import "./Header.css";
import logo from "../../assets/logo.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  weatherData,
  handleAddCard,
  toggleMobileMenu,
  isMobileMenuOpened,
  isLoggedIn,
  onLoginClick,
  onRegisterClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  
  const currentUser = useContext(CurrentUserContext);

  const location = weatherData?.location || "";
  const name = currentUser?.name || "";
  const avatarUrl = currentUser?.avatar || "";
  const firstLetter = name ? name[0].toUpperCase() : "?";

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__container_logo-date">
          <Link to="/" className="header__logo-link">
            <img className="header__logo" src={logo} alt="WTWR logo" />
          </Link>

          <p className="header__date-location">
            {currentDate}
            {location ? `, ${location}` : ""}
          </p>
        </div>

<div className="header__container_profile-details header__container_profile-details_desktop">
  <ToggleSwitch />

  {isLoggedIn ? (
    <>
      <button
        type="button"
        className="header__button"
        onClick={handleAddCard}
      >
        + Add Clothes
      </button>

      <Link to="/profile" className="header__profile-link">
        <p className="header__name">{name}</p>

        {avatarUrl ? (
          <img src={avatarUrl} alt="profile" className="header__avatar" />
        ) : (
          <div className="header__avatar-placeholder">{firstLetter}</div>
        )}
      </Link>
    </>
  ) : (
    <div className="header__auth">
      <button type="button" className="header__auth-button" onClick={onRegisterClick}>
        Sign up
      </button>
      <button type="button" className="header__auth-button" onClick={onLoginClick}>
        Log in
      </button>
    </div>
  )}
</div>

        {!isMobileMenuOpened && (
          <button
            type="button"
            className="header__mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Open menu"
          />
        )}

        {isMobileMenuOpened && (
          <div className="header__container_profile-details header__container_profile-details_mobile-modal">
            <button
              type="button"
              className="profile-modal__close-button"
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            />

            <ToggleSwitch />

{isLoggedIn ? (
  <>
    <button
      type="button"
      className="header__button"
      onClick={handleAddCard}
    >
      + Add Clothes
    </button>

    <Link
      to="/profile"
      className="header__details-mobile header__profile-link"
      onClick={toggleMobileMenu}
    >
      <p className="header__name">{name}</p>

      {avatarUrl ? (
        <img src={avatarUrl} alt="profile" className="header__avatar" />
      ) : (
        <div className="header__avatar-placeholder">{firstLetter}</div>
      )}
    </Link>
  </>
) : (
  <div className="header__auth header__auth_mobile">
    <button
      type="button"
      className="header__auth-button"
      onClick={() => {
        toggleMobileMenu();
        onRegisterClick();
      }}
    >
      Sign up
    </button>

    <button
      type="button"
      className="header__auth-button"
      onClick={() => {
        toggleMobileMenu();
        onLoginClick();
      }}
    >
      Log in
    </button>
  </div>
)}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
