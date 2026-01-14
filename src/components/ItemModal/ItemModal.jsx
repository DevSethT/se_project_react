import "./ItemModal.css";

function ItemModal({
  activeModal,
  selectedCard,
  handleModalClose,
  onDeleteClick,
}) {
  if (activeModal !== "item-modal") return null;

  return (
    <div className="item-modal modal-overlay item-modal__is-opened">
      <div className="item-modal__container">
        <button
          type="button"
          className="item-modal__close-button"
          onClick={handleModalClose}
        />
        <img
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
          className="item-modal__image"
        />
        <div className="item-modal__content">
          <div>
            <h2 className="item-modal__title">{selectedCard.name}</h2>
            <p className="item-modal__weather">
              Weather: {selectedCard.weather}
            </p>
          </div>
          <button
            type="button"
            className="item-modal__delete-btn"
            onClick={() => onDeleteClick(selectedCard)}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
