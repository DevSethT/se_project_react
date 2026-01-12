import "./ItemModal.css";

function ItemModal({
  activeModal,
  selectedCard,
  handleModalClose,
  onDeleteItem,
}) {
  const isOpen = activeModal === "item-modal";

  if (!isOpen) return null;
  if (!selectedCard) return null;

  const imageSrc = selectedCard.imageUrl || selectedCard.link || "";
  const name = selectedCard.name || "";
  const weather = selectedCard.weather || "";

  const handleDeleteClick = () => {
    if (typeof onDeleteItem === "function") {
      onDeleteItem(selectedCard);
    }
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          type="button"
          className="modal__close"
          onClick={handleModalClose}
          aria-label="Close modal"
        />

        <img className="modal__image" src={imageSrc} alt={name} />

        <div className="modal__footer">
          <div className="modal__caption">
            <p className="modal__item-name">{name}</p>
            <p className="modal__weather">Weather: {weather}</p>
          </div>

          <button
            type="button"
            className="modal__delete-button"
            onClick={handleDeleteClick}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
