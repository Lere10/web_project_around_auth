import React from "react";
import stateOk from "../../../../../../images/stateOk.png";
import stateNotOk from "../../../../../../images/denied.png";
import "../../../../../../blocks/popup.css";

export default function InfoTooltip({ state }) {
  return (
    <div style={{ textAlign: "center" }}>
      {state ? (
        <>
          <img
            src={stateOk}
            style={{
              padding: "60px 0px 0px 0px",
              maxWidth: "120px",
              width: "100%",
            }}
          />
          <h2 className="popup__title" style={{ paddingBottom: "60px" }}>
            Vitória! Agora você só precisa logar
          </h2>
        </>
      ) : (
        <>
          <img
            src={stateNotOk}
            style={{
              padding: "60px 0px 32px 0px",
              maxWidth: "120px",
              width: "100%",
            }}
          />
          <h2 className="popup__title" style={{ paddingTop: "0px" }}>
            Ops, algo deu errado! Por favor, tente novamente.
          </h2>
        </>
      )}
    </div>
  );
}
