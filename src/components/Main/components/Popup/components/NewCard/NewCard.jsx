import React from "react";
import { useContext, useRef } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext.js";
import "../../../../../../blocks/form.css";
import "../../../../../../blocks/popup.css";

export default function NewCard() {
  const { handleAddPlace } = useContext(CurrentUserContext);
  const namePlaceRef = useRef();
  const imagePlaceRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    handleAddPlace({
      name: namePlaceRef.current.value,
      link: imagePlaceRef.current.value,
    });
  }

  return (
    <form className="form popup__form" onSubmit={handleSubmit}>
      <fieldset className="form__fieldset">
        <input
          ref={namePlaceRef}
          type="text"
          id="title"
          className="form__input form__input-name"
          placeholder="Título da postagem"
          name="title"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="form__input-error-message form__title-error"></span>
        <input
          ref={imagePlaceRef}
          type="url"
          id="imageURL"
          className="form__input form__input-bio"
          name="imageLink"
          placeholder="URL da Imagem"
          required
        />
        <span className="form__input-error-message form__imageURL-error"></span>
      </fieldset>
      <button type="submit" className="form__button">
        Salvar
      </button>
    </form>
  );
}
