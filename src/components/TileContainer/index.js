import React from "react";
import Tile from "../Tile";

const TileContainer = (props) => {
  const handleClick = () => {
      props.onTileClick(props.index);
  };

  return (
    <div className="tile-container" onClick={handleClick}>
      {props.tiles.map((data, j) => {
        return <Tile key={j} tileData={data} colorBlindMode={props.colorBlindMode} />;
      })}
    </div>
  );
};

export default TileContainer;
