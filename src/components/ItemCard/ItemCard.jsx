import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, handleCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = Boolean(currentUser?._id);
  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  const onCardClick = () => {
    handleCardClick(item);
  };

  return (
    <li className="item-card">
      <div className="item-card__top">
        <h2 className="item-card__title">{item.name}</h2>
        {isLoggedIn && (
          <button
            type="button"
            className={`item-card__like-button ${isLiked ? "item-card__like-button_liked" : ""}`}
            onClick={handleLike}
          />
        )}
      </div>
      <img
        src={item.imageUrl}
        alt={item.name}
        className="item-card__image"
        onClick={onCardClick}
      />
    </li>
  );
}

export default ItemCard;
