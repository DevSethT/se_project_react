import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalwithForm";
import useFormWithValidation from "../../hooks/useFormWithValidation";

function AddItemModal({ isOpen, onAddItem, onCloseModal}) {
  const { values, handleChange, resetForm, errors, isValid, validateForm } = useFormWithValidation({
    name: "",
    imageUrl: "",
    weather: "",
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onAddItem(values, resetForm);
    } else {
      validateForm(values);
    }
  };

  return (
    <ModalWithForm
      name="add-garment"
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      handleModalClose={onCloseModal}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <div className="form__inputs">

      <label className="form__label">
        Name
        <input
          type="text"
          className="form__input"
          name="name"
          placeholder="Name"
          required
          value={values.name}
          onChange={handleChange}
          />
        {errors.name && <span className="form__error">{errors.name}</span>}
      </label>

      <label className="form__label">
        Image
        <input
          type="url"
          className="form__input"
          name="imageUrl"
          required
          placeholder="Image Url"
          value={values.imageUrl}
          onChange={handleChange}
          />
        {errors.imageUrl && <span className="form__error">{errors.imageUrl}</span>}
      </label>

      <fieldset className="form__radio-buttons">
        <legend className="form__legend">Select the weather type:</legend>

        {["hot", "warm", "cold"].map((type) => (
          <label key={type} className="form__radio-label">
            <input
              type="radio"
              name="weather"
              value={type}
              className="form__radio-input"
              checked={values.weather === type}
              onChange={handleChange}
              required
              />
            <span className="form__radio-text">{type[0].toUpperCase() + type.slice(1)}</span>
          </label>
        ))}
        {errors.weather && <span className="form__error">{errors.weather}</span>}
      </fieldset>
      </div>
    </ModalWithForm>
  );
}

export default AddItemModal;
