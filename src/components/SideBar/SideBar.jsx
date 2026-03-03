import "./SideBar.css";

function SideBar({ currentUser, onSignOut }) {
    const name = currentUser?.name || "";
  const avatarUrl = currentUser?.avatar || "";
  const firstLetter = name ? name[0].toUpperCase() : "?";
  return (
    
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={avatarUrl}
        alt="User avatar"
      />
      <p className="sidebar__username">{firstLetter}</p>
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
