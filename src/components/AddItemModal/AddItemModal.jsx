import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

function AddItemModal({ isOpen, onAddItem, onCloseModal }) {
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
      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          name="name"
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
          name="imageUrl"
          required
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>

      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>

        {["hot", "warm", "cold"].map((type) => (
          <label key={type} className="modal__radio-label">
            <input
              type="radio"
              name="weather"
              value={type}
              className="modal__radio-input"
              checked={values.weather === type}
              onChange={handleChange}
              required
            />
            <span>{type[0].toUpperCase() + type.slice(1)}</span>
          </label>
        ))}
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
