import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

function AddItemModal({ isOpen, onAddItem, onCloseModal }) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  useEffect(() => {
    if (!isOpen) return;
    resetForm({ name: "", imageUrl: "", weather: "" });
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values, () => resetForm({ name: "", imageUrl: "", weather: "" }));
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
      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          placeholder="Name"
          name="name"
          minLength="1"
          maxLength="30"
          required
          value={values.name}
          onChange={handleChange}
        />
      </label>

      <label className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          placeholder="Image URL"
          name="imageUrl"
          required
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>

      <fieldset className="add-item-modal__radio-group">
        <legend className="add-item-modal__legend">
          Select the weather type:
        </legend>

        <label className="add-item-modal__radio-label">
          <input
            id="hot"
            type="radio"
            name="weather"
            value="hot"
            className="add-item-modal__radio-input"
            checked={values.weather === "hot"}
            onChange={handleChange}
            required
          />
          <span className="add-item-modal__radio-text">Hot</span>
        </label>

        <label className="add-item-modal__radio-label">
          <input
            id="warm"
            type="radio"
            name="weather"
            value="warm"
            className="add-item-modal__radio-input"
            checked={values.weather === "warm"}
            onChange={handleChange}
            required
          />
          <span className="add-item-modal__radio-text">Warm</span>
        </label>

        <label className="add-item-modal__radio-label">
          <input
            id="cold"
            type="radio"
            name="weather"
            value="cold"
            className="add-item-modal__radio-input"
            checked={values.weather === "cold"}
            onChange={handleChange}
            required
          />
          <span className="add-item-modal__radio-text">Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
