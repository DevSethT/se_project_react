import "./ModalWithForm.css";

function ModalWithForm() {
  return (
    <div className="form-modal">
      <button className="form-modal__closebtn" type="button"></button>
      <h2 className="form-modal__title"></h2>
      <form className="form">
        <fieldset className="form__fielset">
          <label htmlFor="name_input" className="form__label"></label>
          <input
            type="text"
            className="form__input"
            placeholder="Name"
            minlength="2"
            maxlength="30"
            required
          />
        </fieldset>
        <button className="form__button"></button>
      </form>
    </div>
  );
}

export default ModalWithForm;
