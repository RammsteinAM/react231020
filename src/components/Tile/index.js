import React, { useMemo } from "react";

const Tile = (props) => {    
  const computeExpensiveValue = ({tileData, style, colorBlindMode}) => {
    const tileStyle = {...style, backgroundColor: tileData.colorCode};
    if(colorBlindMode) {
        tileStyle.filter = "grayscale(1) contrast(1.2)"
    }
    return (
    <div
      className={`tile ${!tileData.colorCode ? "tile-empty" : ""}`}
      style={tileStyle}
    >
        {colorBlindMode && <span>{tileData.colorName}</span>}
    </div>
  )};

  return useMemo(
    () => computeExpensiveValue(props),
    [props]
  );
};

export default Tile;
