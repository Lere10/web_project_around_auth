import React from "react";
import { useState } from "react";
import Header from "../Header/Header.jsx";
import { NavLink } from "react-router-dom";
import "../../blocks/form.css";
import "../../blocks/popup.css";

export default function Login({ handleLogin }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
  };

  return (
    <div className="page__content-auth">
      <Header />
      <NavLink to="/signup" className="page__navlink-sign">
        Inscreva-se
      </NavLink>
      <h2 className="popup__title-auth">Entrar</h2>
      <form className="form popup__form" onSubmit={handleSubmit}>
        <fieldset className="form__fieldset">
          <input
            onChange={handleChange}
            type="email"
            id="email"
            className="form__input form__input-auth"
            placeholder="E-mail"
            name="email"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="form__input-error-message form__title-error"></span>
          <input
            onChange={handleChange}
            type="password"
            id="password"
            className="form__input form__input-bio-auth"
            name="password"
            placeholder="Senha"
            required
          />
          <span className="form__input-error-message form__imageURL-error"></span>
        </fieldset>
        <button type="submit" className="form__button form__button-auth">
          Entrar
        </button>
      </form>
      <NavLink to="/signup" className="page__navlink-call">
        Ainda não é membro? Inscreva-se aqui
      </NavLink>
    </div>
  );
}
