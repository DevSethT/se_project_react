import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

function AddItemModal({ isOpen, onAddItem, onCloseModal }) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    resetForm({ name: "", imageUrl: "", weather: "" });
    setErrors({ name: "", imageUrl: "", weather: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const setFieldError = (field, message) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const checkName = (name) => {
    if (!name) return "Name is required";
    if (name.length < 2) return "Name must be at least 2 characters";
    if (name.length > 30) return "Name must be 30 characters or less";
    return "";
  };

  const checkImageUrl = (url) => {
    if (!url) return "Image URL is required";
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return "Image URL must start with http:// or https://";
    }
    return "";
  };

  const checkWeather = (weather) => {
    if (!weather) return "Pick a weather type";
    return "";
  };

  const validateOneField = (name, value) => {
    let message = "";

    if (name === "name") message = checkName(value);
    if (name === "imageUrl") message = checkImageUrl(value);
    if (name === "weather") message = checkWeather(value);

    setFieldError(name, message);
    return message;
  };

  const handleValidatedChange = (e) => {
    handleChange(e);
    validateOneField(e.target.name, e.target.value);
  };

  const isFormValid = () => {
    return (
      checkName(values.name) === "" &&
      checkImageUrl(values.imageUrl) === "" &&
      checkWeather(values.weather) === ""
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameErr = validateOneField("name", values.name);
    const urlErr = validateOneField("imageUrl", values.imageUrl);
    const weatherErr = validateOneField("weather", values.weather);

    if (nameErr || urlErr || weatherErr) return;

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
      onValidation={isFormValid}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          className={`modal__input ${errors.name ? "modal__input_error" : ""}`}
          placeholder="Name"
          name="name"
          minLength="2"
          maxLength="30"
          required
          value={values.name}
          onChange={handleValidatedChange}
        />
        {errors.name && (
          <span className="modal__input-error">{errors.name}</span>
        )}
      </label>

      <label className="modal__label">
        Image
        <input
          type="url"
          className={`modal__input ${
            errors.imageUrl ? "modal__input_error" : ""
          }`}
          placeholder="Image URL"
          name="imageUrl"
          required
          value={values.imageUrl}
          onChange={handleValidatedChange}
        />
        {errors.imageUrl && (
          <span className="modal__input-error">{errors.imageUrl}</span>
        )}
      </label>

      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>

        <label className="modal__radio-label">
          <input
            id="hot"
            type="radio"
            name="weather"
            value="hot"
            className="modal__radio-input"
            checked={values.weather === "hot"}
            onChange={handleValidatedChange}
            required
          />
          <span>Hot</span>
        </label>

        <label className="modal__radio-label">
          <input
            id="warm"
            type="radio"
            name="weather"
            value="warm"
            className="modal__radio-input"
            checked={values.weather === "warm"}
            onChange={handleValidatedChange}
            required
          />
          <span>Warm</span>
        </label>

        <label className="modal__radio-label">
          <input
            id="cold"
            type="radio"
            name="weather"
            value="cold"
            className="modal__radio-input"
            checked={values.weather === "cold"}
            onChange={handleValidatedChange}
            required
          />
          <span>Cold</span>
        </label>

        {errors.weather && (
          <span className="modal__input-error modal__input-error_radio">
            {errors.weather}
          </span>
        )}
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
