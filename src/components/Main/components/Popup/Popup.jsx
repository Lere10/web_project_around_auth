import React from "react";
import "../../../../blocks/popup.css";
import closeIcon from "../../../../images/popup__closeicon.png";

export default function Popup(props) {
  const { onClose, title, children } = props;
  const classNamePopup =
    children.type.name === "InfoTooltip"
      ? "popup__container-infotooltip"
      : "popup__container";
  return (
    <>
      <section className="popup" id="popupUser">
        <div className={classNamePopup} id="popupOverlay">
          {children ? (
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
