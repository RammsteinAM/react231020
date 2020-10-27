import React, { useState, useEffect } from "react";
import { cloneArray, generateRenderData } from "../../helpers";
import ControlPanel from "../ControlPanel";
import InfoPanel from "../InfoPanel";
import Tile from "../Tile";
import TileContainer from "../TileContainer";

const Game = (props) => {
  const [step, setStep] = useState(0);
  const [tiles, setTiles] = useState();
  const [selectedTile, setSelectedTile] = useState();
  const [beforeClickedTiles, setBeforeClickedTiles] = useState();
  const [finished, setFinished] = useState(false);
  const [invalidMove, setInvalidMove] = useState(false);
  const [colorBlind, setColorBlind] = useState(false);

  const { maxCount } = props.data;

  useEffect(() => {
    if (props.data && props.data.tiles) setTiles(props.data.tiles);
  }, [props.data]);

  useEffect(() => {
    if (!selectedTile && tiles) {
      let status = true;
      tiles.forEach((tilesArr) => {
        const colorArr = tilesArr.map((tile) => tile.colorCode);
        if (colorArr.length) {
          if (colorArr.length === maxCount) {
            const colorSet = new Set(colorArr);
            if (colorSet.size !== 1) {
              status = false;
            }
            return;
          }
          status = false;
        }
      });

      if (status) {
        setFinished(true);
      }
    }
  }, [selectedTile, tiles, maxCount]);

  const handleTileClick = (index) => {
    if (finished) return;
    const tilesClone = cloneArray(tiles);
    const clickedTilesArray = tilesClone[index];
    const clickedTile = clickedTilesArray[clickedTilesArray.length - 1];
    if (!selectedTile) {
      setBeforeClickedTiles(tiles);
      clickedTilesArray.pop();
      setSelectedTile(clickedTile);
      setTiles(tilesClone);      
      setStep(step + 1);
      return;
    }
    if (selectedTile) {
      if (
        clickedTilesArray.length < maxCount &&
        (!clickedTile || clickedTile.colorCode === selectedTile.colorCode)
      ) {
        clickedTilesArray.push(selectedTile);
        setSelectedTile();
        setTiles(tilesClone);
        setInvalidMove(false);
        return;
      }
      setInvalidMove(true);
    }
  };

  const handleSelectedTileClick = () => {
    if (selectedTile && selectedTile.colorCode) {
      setSelectedTile();
      setTiles(beforeClickedTiles);
      setInvalidMove(false);
    }
  };

  const handleReset = () => {
    setTiles(props.data.tiles);
    setSelectedTile();
    setBeforeClickedTiles();
    setFinished(false);
    setInvalidMove(false);
    setStep(0);
  };

  const toggleColorBlindMode = () => {
    setColorBlind(!colorBlind);
  };

  const data = tiles && generateRenderData(tiles, maxCount);

  return (
    <div className="game">
      <div className="game-panel-container">
        <InfoPanel
          isFinished={finished}
          invalidMove={invalidMove}
          stepCount={step}
        />
        <ControlPanel
          onReset={handleReset}
          isFinished={finished}
          colorBlind={{ state: colorBlind, callback: toggleColorBlindMode }}
        />
      </div>
      {/* <div className="game-info-panel">

        {finished ? (
          <>
            <img alt="Pog" src="Pog.png" title="Pog"></img>
            <div>You won!</div>
            <div>Total Steps: {step}</div>
            <div>
              <button onClick={handleReset}>Play Again</button>
            </div>
          </>
        ) : (
          <>
            <div>Step: {step}</div>
            <div>
              <input
                id="colorBlind"
                name="colorBlind"
                type="checkbox"
                checked={colorBlind}
                onChange={toggleColorBlindMode}
              />{" "}
              <label htmlFor="colorBlind">Color Blind Mode</label>
            </div>
            <div>
              <button onClick={handleReset}>Reset</button>
            </div>
          </>
        )}
      </div> */}
      {!finished && (
        <div
          className="tile-selected-container"
          onClick={handleSelectedTileClick}
        >
          {selectedTile && selectedTile.colorCode && (
            <Tile tileData={selectedTile} colorBlindMode={colorBlind} />
          )}
        </div>
      )}

      <div className="game-container">
        {data &&
          data.map((tiles, i) => (
            <TileContainer
              key={i}
              index={i}
              tiles={tiles}
              onTileClick={handleTileClick}
              colorBlindMode={colorBlind}
            />
          ))}
      </div>
    </div>
  );
};

export default Game;
