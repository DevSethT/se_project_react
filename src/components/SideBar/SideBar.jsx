import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";


function SideBar({ onSignOut, onEditProfile, }) {
  const currentUser = useContext(CurrentUserContext);
  
  const name = currentUser?.name || "";
  const avatarUrl = currentUser?.avatar || "";
  const firstLetter = name ? name[0].toUpperCase() : "?";
  return (
    
    <div className="sidebar">
      <div className="sidebar__user">
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
    </div>
        
      <button 
      onClick={onSignOut} 
      className="sidebar__logout-button"
      type="button"
      >
      Log out
      </button>

      <button 
      onClick={onEditProfile} 
      className="sidebar__edit-profile-button"
      type="button"
      >
      Edit profile
      </button>
    </div>
    
  );
}

export default SideBar;
