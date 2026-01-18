import "./ModalWithForm.css";

function ModalWithForm({
  name,
  children,
  buttonText,
  title,
  isOpen,
  handleModalClose,
  onSubmit,
}) {
  return (
    <div
      className={`modal modal-overlay modal_${name} ${
        isOpen ? "modal__is-opened" : ""
      }`}
    >
      <div className="form-modal__container">
        <button
          type="button"
          className="form-modal__close-btn"
          onClick={handleModalClose}
        />
        <p className="form-modal__title">{title}</p>

        <form className="form" noValidate onSubmit={onSubmit}>
          {children}
          <button type="submit" className="form-modal__smt-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
