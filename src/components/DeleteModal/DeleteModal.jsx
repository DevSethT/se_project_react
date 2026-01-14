import "./DeleteModal.css";

function DeleteModal({ activeModal, onClose, onCardDelete, selectedCard }) {
  if (activeModal !== "delete-modal") return null;

  return (
    <div className="delete-modal modal-overlay delete-modal__is-opened">
      <div className="delete-modal__container">
        <button
          type="button"
          className="delete-modal__close-button"
          onClick={onClose}
        />
        <p className="delete-modal__text">
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
        </p>
        <button
          type="button"
          className="delete-modal__confirm"
          onClick={() => onCardDelete(selectedCard)}
        >
          Yes, delete item
        </button>
        <button
          type="button"
          className="delete-modal__cancel"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteModal;
