import React, { Children } from "react";
import { useState } from "react";
import Header from "../Header/Header.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import "../../blocks/form.css";
import "../../blocks/popup.css";
// import Popup from "../Main/components/Popup/Popup.jsx";
// import InfoTooltip from "../Main/components/Popup/components/InfoTooltip/InfoTooltip.jsx";

export default function Register({ handleRegistration }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  // const navigate = useNavigate();

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
    <div
      className="page__content"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <NavLink
        to="/signin"
        style={{
          textDecoration: "none",
          color: "#fff",
          position: "absolute",
          zIndex: "1",
          top: "55px",
          right: "0px",
        }}
      >
        Faça o login
      </NavLink>
      <h2
        className="popup__title"
        style={{
          color: "#fff",
          textAlign: "center",
          paddingBottom: "50px",
          paddingTop: "60px",
        }}
      >
        Inscrever-se
      </h2>
      <form className="form popup__form" onSubmit={handleSubmit}>
        <fieldset className="form__fieldset">
          <input
            style={{
              color: "#fff",
              backgroundColor: "#000",
              borderBottom: "1px solid #fff",
              marginBottom: "30px",
              maxWidth: "358px",
              width: "100%",
            }}
            //ref={namePlaceRef}
            type="email"
            id="email"
            className="form__input form__input-name"
            placeholder="E-mail"
            name="email"
            minLength="2"
            maxLength="30"
            onChange={handleChange}
            required
          />
          <span className="form__input-error-message form__title-error"></span>
          <input
            style={{
              margin: "0px",
              backgroundColor: "#000",
              color: "#fff",
              borderBottom: "1px solid #fff",
              maxWidth: "358px",
            }}
            // ref={imagePlaceRef}
            type="password"
            id="password"
            className="form__input form__input-bio"
            name="password"
            placeholder="Senha"
            onChange={handleChange}
            required
          />
          <span className="form__input-error-message form__imageURL-error"></span>
        </fieldset>
        <button
          type="submit"
          className="form__button"
          style={{
            marginTop: "216px",
            backgroundColor: "#fff",
            color: "#000",
            maxWidth: "358px",
            width: "100%",
            padding: "14px 0px",
            borderRadius: "2px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Inscrever-se
        </button>
      </form>
      <NavLink
        to="/signin"
        style={{
          textDecoration: "none",
          color: "#fff",
          margin: "0px auto",
          textAlign: "center",
        }}
      >
        Já é um membro? Faça o login aqui
      </NavLink>

      {/* {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )} */}
    </div>
  );
}
