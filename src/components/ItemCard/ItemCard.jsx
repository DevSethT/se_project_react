import "./ItemCard.css";

function ItemCard({ item }) {
  return (
    <>
      <li className="item-card">
        <p className="item-card__title">{item.name}</p>
        <img src={item.link} alt={item.name} className="item-card__image" />
      </li>
    </>
  );
}

export default ItemCard;
