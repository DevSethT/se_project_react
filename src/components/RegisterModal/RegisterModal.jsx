import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalwithForm";

function RegisterModal({ isOpen, handleModalClose, onRegister, onSwitch }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, avatar, email, password });
  };

  const isValid = name.trim() && email.trim() && password.trim();

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
          className="form__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label className="form__label">
        Password*
        <input
          type="password"
          className="form__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
      </label>

      <label className="form__label">
        Name*
        <input
          type="text"
          className="form__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength={2}
          maxLength={30}
          required
        />
      </label>

      <label className="form__label">
        Avatar URL
        <input
          type="url"
          className="form__input"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="https://..."
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
