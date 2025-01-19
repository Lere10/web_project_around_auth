import React from "react";
import "../../../../blocks/popup.css";
import closeIcon from "../../../../images/popup__closeicon.png";

export default function Popup(props) {
  const { onClose, title, children } = props;
  return (
    <>
      <section className="popup" id="popupUser">
        <div className="popup__container" id="popupOverlay">
          {title ? (
            <img
              onClick={onClose}
              src={closeIcon}
              id="closeIcon"
              alt="Ícone para fechar popup"
              className="popup__closer"
            />
          ) : (
            ""
          )}
          {title ? <h2 className="popup__title">{title}</h2> : ""}
          {children}
        </div>
      </section>
    </>
  );
}
