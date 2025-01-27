import React, { Children } from "react";
import { useState } from "react";
import Header from "../Header/Header.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import "../../blocks/form.css";
import "../../blocks/popup.css";

export default function Register({ handleRegistration }) {
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
    handleRegistration(data);
  };

  return (
    <div className="page__content-auth">
      <Header />
      <NavLink to="/signin" className="page__navlink-sign">
        Faça o login
      </NavLink>
      <h2 className="popup__title-auth">Inscrever-se</h2>
      <form className="form popup__form" onSubmit={handleSubmit}>
        <fieldset className="form__fieldset">
          <input
            type="email"
            id="email"
            className="form__input form__input-auth"
            placeholder="E-mail"
            name="email"
            minLength="2"
            maxLength="30"
            onChange={handleChange}
            required
          />
          <span className="form__input-error-message form__title-error"></span>
          <input
            type="password"
            id="password"
            className="form__input form__input-bio-auth"
            name="password"
            placeholder="Senha"
            onChange={handleChange}
            required
          />
          <span className="form__input-error-message form__imageURL-error"></span>
        </fieldset>
        <button type="submit" className="form__button form__button-auth">
          Inscrever-se
        </button>
      </form>
      <NavLink to="/signin" className="page__navlink-call">
        Já é um membro? Faça o login aqui
      </NavLink>
    </div>
  );
}
