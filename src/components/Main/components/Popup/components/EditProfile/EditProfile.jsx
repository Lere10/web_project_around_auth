import React from "react";
import "../../../../../../blocks/form.css";
import "../../../../../../blocks/popup.css";
import { useState } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext.js";
import { useContext } from "react";

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAboutChange = (e) => {
    setAbout(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser({ name, about });
  };

  return (
    <form className="form popup__form" onSubmit={handleSubmit}>
      <fieldset className="form__fieldset">
        <input
          value={name}
          onChange={handleNameChange}
          id="name"
          type="text"
          className="form__input form__input-name"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="form__input-error-message form__name-error"></span>
        <input
          value={about}
          onChange={handleAboutChange}
          id="bio"
          type="text"
          className="form__input form__input-bio"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="form__input-error-message form__bio-error"></span>
      </fieldset>
      <button type="submit" className="form__button">
        Salvar
      </button>
    </form>
  );
}
