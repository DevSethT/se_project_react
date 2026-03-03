import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalwithForm";

function RegisterModal({ activeModal, handleModalClose, onRegister }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isOpen = activeModal === "register";

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, avatar, email, password });
  };

  // basic validation: required fields must not be empty
  // (avatar can be optional depending on your requirements; set it required if needed)
  const isValid = name.trim() && email.trim() && password.trim();

  return (
    <ModalWithForm
      name="register"
      title="Sign up"
      buttonText={"sign up"}
      isOpen={isOpen}
      handleModalClose={handleModalClose}
      onSubmit={handleSubmit}
      isValid={isValid}
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

        <a href="/login" className="form-modal__switch-link" onClick={handleModalClose}>
        or Log in
      </a>
    </ModalWithForm>
    
  );
}

export default RegisterModal;