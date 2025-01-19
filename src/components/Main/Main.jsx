import React from "react";
import pencil from "../../images/editPencil.svg";
import editButton from "../../images/button__edit.svg";
import addButton from "../../images/button__add-post.svg";

import Popup from "./components/Popup/Popup.jsx";
import NewCard from "./components/Popup/components/NewCard/NewCard.jsx";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile.jsx";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar.jsx";

import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { useContext } from "react";

import Card from "./components/Card/Card.jsx";

const NewCardPopup = { title: "Novo lugar", children: <NewCard /> };
const EditProfilePopup = {
  title: "Editar perfil",
  children: <EditProfile />,
};
const EditAvatarPopup = {
  title: "Alterar foto de perfil",
  children: <EditAvatar />,
};

export default function Main({
  cards,
  handleCardLike,
  handleCardDelete,
  popup,
  handleOpenPopup,
  handleClosePopup,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <div className="profile__info-photo-portrait">
            <img
              onClick={() => {
                handleOpenPopup(EditAvatarPopup);
              }}
              src={pencil}
              alt="Ícone de lápis"
              className="profile__edit-pencil"
            />
            <img
              src={currentUser.avatar}
              alt="Foto de perfil"
              className="profile__photo"
            />
          </div>
          <div>
            <div className="profile__info-content">
              <h1 className="profile__info-name">{currentUser.name}</h1>
              <button type="button" className="profile__button-open-form">
                <img
                  onClick={() => {
                    handleOpenPopup(EditProfilePopup);
                  }}
                  src={editButton}
                  alt="Botão de editar perfil"
                  className="profile__button-open-form-img"
                />
              </button>
            </div>
            <p className="profile__info-bio">{currentUser.about}</p>
          </div>
        </div>

        <button
          onClick={() => {
            handleOpenPopup(NewCardPopup);
          }}
          type="button"
          className="profile__button-add-post"
        >
          <img
            src={addButton}
            className="profile__button-add-post-img"
            alt="caractere de adição"
          />
        </button>
      </section>

      <ul className="grid">
        {cards.map((card, index) => (
          <Card
            key={card._id || index}
            card={card}
            onCardDelete={() => handleCardDelete(card)}
            handleCardLike={() => handleCardLike(card)}
            isLiked={
              card.likes
                ? card.likes.some((like) => like._id === currentUser._id)
                : false
            }
            isOwn={card.owner._id === currentUser._id}
          />
        ))}
      </ul>

      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
