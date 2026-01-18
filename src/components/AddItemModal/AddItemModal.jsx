import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalwithForm";
import useForm from "../../hooks/useForm";
import { useEffect } from "react";

function AddItemModal({ isOpen, onAddItem, onCloseModal}) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values, resetForm);
  };

  return (
    <ModalWithForm
      name="add-garment"
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      handleModalClose={onCloseModal}
      onSubmit={handleSubmit}
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
      </fieldset>
      </div>
    </ModalWithForm>
  );
}

export default AddItemModal;
