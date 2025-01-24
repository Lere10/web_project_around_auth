import React from "react";
import stateOk from "../../../../../../images/stateOk.png";
import stateNotOk from "../../../../../../images/denied.png";
import "../../../../../../blocks/popup.css";

export default function InfoTooltip({ state }) {
  return (
    <div style={{ textAlign: "center" }}>
      {state ? (
        <>
          <img src={stateOk} style={{ maxWidth: "120px", width: "100%" }} />
          <h2 className="popup__title">Vitória! Agora você só precisa logar</h2>
        </>
      ) : (
        <>
          <img src={stateNotOk} style={{ maxWidth: "120px", width: "100%" }} />
          <h2 className="popup__title">
            Ops, algo saiu deu errado! Por favor, tente novamente.
          </h2>
        </>
      )}
    </div>
  );
}
