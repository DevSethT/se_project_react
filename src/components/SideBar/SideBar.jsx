import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";


function SideBar({ onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  
  const name = currentUser?.name || "";
  const avatarUrl = currentUser?.avatar || "";
  const firstLetter = name ? name[0].toUpperCase() : "?";
  return (
    
    <div className="sidebar">
    {avatarUrl ? (
      <img
      className="sidebar__avatar"
      src={avatarUrl}
      alt="User avatar"
    />
    ) : (
    <div className="sidebar__avatar-placeholder">
      {firstLetter}
    </div>
    )}
      <p className="sidebar__username">{name}</p>
      <button 
      onClick={onSignOut} 
      className="sidebar__logout-button"
      type="button"
      >
      Log out
      </button>
    </div>
    
  );
}

export default SideBar;
