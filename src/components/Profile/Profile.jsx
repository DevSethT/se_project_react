import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./profile.css"

function Profile({ clothingItems, handleAddCard, handleCardClick }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        handleAddCard={handleAddCard}
        handleCardClick={handleCardClick}
      />
    </div>
  );
}

export default Profile;
