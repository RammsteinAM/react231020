import React from "react";

const ControlPanel = (props) => {
  return (
    <div className="game-control-panel">
      <div>
        <input
          id="colorBlind"
          name="colorBlind"
          type="checkbox"
          checked={props.colorBlind.state}
          onChange={props.colorBlind.callback}
        />{" "}
        <label htmlFor="colorBlind">Color Blind Mode</label>
      </div>
      <div>
        <button onClick={props.onReset} disabled={props.resetDisabled} className={props.resetDisabled ? "disabled" : ""}>
          {props.isFinished ? "Play Again" : "Reset"}
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
