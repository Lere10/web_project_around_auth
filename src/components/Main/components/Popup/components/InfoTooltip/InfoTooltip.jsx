import stateOk from "../../../../../../images/stateOk.png";
import stateNotOk from "../../../../../../images/denied.png";
import "../../../../../../blocks/popup.css";
import PropTypes from "prop-types";

export default function InfoTooltip({ state }) {
  return (
    <div className="popup__infotooltip">
      {state ? (
        <>
          <img src={stateOk} className="popup__infotooltip-image" />
          <h2 className="popup__title popup__infotooltip-title">
            Vitória! Agora você só precisa logar
          </h2>
        </>
      ) : (
        <>
          <img src={stateNotOk} className="popup__infotooltip-image" />
          <h2 className="popup__title popup__infotooltip-title">
            Ops, algo deu errado! Por favor, tente novamente.
          </h2>
        </>
      )}
    </div>
  );
}

InfoTooltip.propTypes = {
  state: PropTypes.bool.isRequired,
};
