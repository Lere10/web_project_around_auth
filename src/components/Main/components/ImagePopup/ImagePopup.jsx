import React from "react";
import "../../../../blocks/grid.css";
import closeIcon from "../../../../images/popup__closeicon.png";

export default function ImagePopup(props) {
  const { name, link, onClose } = props;
  return (
    <div className="grid__display" id="popupOverlay">
      <div className="grid__display-container">
        <img
          onClick={onClose}
          src={closeIcon}
          alt="Ícone para fechar popup"
          className="grid__display-closer popup__closer"
        />
        <img className="grid__display-image" src={link} />
        <p className="grid__display-title">{name}</p>
      </div>
    </div>
  );
}
