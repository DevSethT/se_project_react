import ModalWithForm from "../ModalWithForm/ModalwithForm";
import useFormWithValidation from "../../hooks/useFormWithValidation";

function RegisterModal({ isOpen, handleModalClose, onRegister, onSwitch }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onRegister({
        name: values.name,
        avatar: values.avatar,
        email: values.email,
        password: values.password,
      });
    }
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign up"
      isOpen={isOpen}
      handleModalClose={handleModalClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      secondaryButton={
        <button
          type="button"
          className="form-modal__secondary-button_registermodal"
          onClick={onSwitch}
        >
          or Log In
        </button>
      }
    >
      <label className="form__label">
        Email*
        <input
          type="email"
          name="email"
          className="form__input"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
        <span className="form__input-error">{errors.email}</span>
      </label>

      <label className="form__label">
        Password*
        <input
          type="password"
          name="password"
          className="form__input"
          value={values.password || ""}
          onChange={handleChange}
          minLength={6}
          required
        />
        <span className="form__input-error">{errors.password}</span>
      </label>

      <label className="form__label">
        Name*
        <input
          type="text"
          name="name"
          className="form__input"
          value={values.name || ""}
          onChange={handleChange}
          minLength={2}
          maxLength={30}
          required
        />
        <span className="form__input-error">{errors.name}</span>
      </label>

      <label className="form__label">
        Avatar URL
        <input
          type="url"
          name="avatar"
          className="form__input"
          value={values.avatar || ""}
          onChange={handleChange}
          placeholder="https://..."
        />
        <span className="form__input-error">{errors.avatar}</span>
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
