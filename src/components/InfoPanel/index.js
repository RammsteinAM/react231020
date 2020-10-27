import React from "react";

const InfoPanel = (props) => {
  if (props.isFinished) {
    return (
      <div className="game-info-panel">
        <div>
          <img alt="PagChomp" src="PagChomp.png" title="PagChomp"></img>
        </div>
        <div>You won!</div>
        <div>Total Steps: {props.stepCount}</div>
      </div>
    );
  }

  if (props.invalidMove) {
    return (
      <div className="game-info-panel">
        <div>
          <img alt="Pepega" src="Pepega.png" title="Pepega"></img>
        </div>
        <div>You can't do that.</div>
        <div>Steps: {props.stepCount}</div>
      </div>
    );
  }

  if (props.stepCount >= 30) {
    return (
      <div className="game-info-panel">
        <div>
          <img alt="KEKW" src="KEKW.png" title="KEKW"></img>
        </div>
        <div>Steps: {props.stepCount}</div>
      </div>
    );
  }

  return (
    <div className="game-info-panel">
      <div>Steps: {props.stepCount}</div>
    </div>
  );
};

export default InfoPanel;
