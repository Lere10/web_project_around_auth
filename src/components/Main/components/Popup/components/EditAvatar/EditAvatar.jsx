import React from "react";
import "../../../../../../blocks/form.css";
import "../../../../../../blocks/popup.css";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext.js";
import { useContext, useRef } from "react";

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateAvatar({ link: avatarRef.current.value });
  }

  return (
    <form className="form popup__form" onSubmit={handleSubmit}>
      <fieldset className="form__fieldset">
        <input
          ref={avatarRef}
          id="avatarLink"
          type="url"
          className="form__input form__input-bio"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="form__input-error-message form__avatarLink-error"></span>
      </fieldset>
      <button type="submit" className="form__button">
        Salvar
      </button>
    </form>
  );
}
