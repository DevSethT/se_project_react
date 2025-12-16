import "./Header.css";

function Header() {
  return (
    <header className="header">
      <img src="" alt="" className="header__logo" />
      <p className="header__date-location">Date, location</p>
      <div className="header__user-container">
        <button className="header__add-clothes-btn">+ Add clothes</button>
        <p className="header__username">Name</p>
        <img src="" alt="" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
