import "./DeleteModal.css";

function DeleteModal({ isOpen, onCloseModal, onCardDelete, selectedCard }) {
  if (isOpen !== "delete-modal") return null;

  return (
    <div className="delete-modal modal-overlay delete-modal__is-opened">
      <div className="delete-modal__container">
        <button
          type="button"
          className="delete-modal__close-button"
          onClick={onCloseModal}
        />
        <div className="delete-modal__content">
          <p className="delete-modal__text">
            Are you sure you want to delete this item?
            <br />
            This action is irreversible.
          </p>
          <button
            type="button"
            className="delete-modal__buttons delete-modal__confirm"
            onClick={() => onCardDelete(selectedCard)}
          >
            Yes, delete item
          </button>
          <button
            type="button"
            className="delete-modal__buttons delete-modal__cancel"
            onClick={onCloseModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
