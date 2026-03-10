import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ isOpen, selectedCard, handleModalClose, onDeleteClick }) {
  if (isOpen !== "item-modal") return null;

  const currentUser = useContext(CurrentUserContext);
  const isOwn = selectedCard?.owner === currentUser?._id;

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
          {isOwn && (
            <button
              type="button"
              className="item-modal__delete-btn"
              onClick={() => onDeleteClick(selectedCard)}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
