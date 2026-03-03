import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./profile.css";

function Profile({ clothingItems, handleAddCard, handleCardClick, currentUser, onSignOut }) {
  
    return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar currentUser={currentUser} onSignOut={onSignOut} />
      </section>

      <div className="profile__content">
        <ClothesSection
          clothingItems={clothingItems}
          handleAddCard={handleAddCard}
          handleCardClick={handleCardClick}
        />
      </div>
    </div>
  );
}

export default Profile;
