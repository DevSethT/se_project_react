import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalwithForm";

function LoginModal({ activeModal, handleModalClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isOpen = activeModal === "login";

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  // simple validity for now
  const isValid = email.trim() && password.trim();

  return (
    <ModalWithForm
      name="login"
      title="Log in"
      buttonText="Log in"
      isOpen={isOpen}
      handleModalClose={handleModalClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="form__label">
        Email
        <input
          type="email"
          className="form__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label className="form__label">
        Password
        <input
          type="password"
          className="form__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

       <a href="/login" className="form-modal__switch-link" onClick={handleModalClose}>
        or Sign up
      </a>
    </ModalWithForm>
  );
}

export default LoginModal;