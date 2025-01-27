import "../../../../blocks/popup.css";
import closeIcon from "../../../../images/popup__closeicon.png";
import PropTypes from "prop-types";

export default function Popup(props) {
  const { onClose, title, children } = props;
  const classNamePopup =
    children && children.type && children.type.name === "InfoTooltip"
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

Popup.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};
