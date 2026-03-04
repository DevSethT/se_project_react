import "./ItemCard.css";

function ItemCard({ item, handleCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  const onCardClick = () => {
    handleCardClick(item);
  };
  
  return (
    <li className="item-card">
      <h2 className="item-card__title">{item.name}</h2>
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
