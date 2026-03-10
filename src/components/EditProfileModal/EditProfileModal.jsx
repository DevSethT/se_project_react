import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalwithForm";

function EditProfileModal({ isOpen, handleModalClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setName(currentUser?.name || "");
    setAvatar(currentUser?.avatar || "");
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name, avatar });
  };

  const isValid = name.trim() && avatar.trim();

  return (
    <ModalWithForm
      name="edit-profile"
      title="Change profile data"
      buttonText="Save"
      isOpen={isOpen}
      handleModalClose={handleModalClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="form__label">
        Name
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
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
