import { useEffect } from "react";
import { GameStateContext } from "./context/GameStateContext";
import Canvas from "./components/Canvas";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Mask from "./components/Mask";
import HeaderBar from "./components/HeaderBar";
import FallingObject from "./components/FallingObject";
import UI from "./components/UI";
import {
  FRAME_RATE,
  MASK_FACTOR,
  OBJECT_SIZE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "./utils/variables";
import spawnFallingObjectsLogic from "./logic/spawnFallingObjectsLogic";
import damageCalculationLogic from "./logic/damageCalculationLogic";
import powerUpsLogic from "./logic/powerUpsLogic";
import heroMovementLogicX from "./logic/heroMovementLogicX";
import heroMovementLogicY from "./logic/heroMovementLogicY";
import objectGravityLogic from "./logic/objectGravityLogic";
import gameOverLogic from "./logic/gameOverLogic";
import frameCounterLogic from "./logic/frameCounterLogic";
import useContextValues from "./hooks/useContextValues";
import useUpdatingRefsForObject from "./hooks/useUpdatingRefsForObject";
import specialMeteorLogic from "./logic/specialMeteorLogic";

function App() {
  const contextValues = useContextValues();

  const {
    isMainMenu,
    players,
    isGameOver,
    fallingObjectPositions,
    highScore,
    setHighScore,
  } = contextValues;

  const contextRefs = useUpdatingRefsForObject(contextValues, isGameOver);

  useEffect(() => {
    const gameStopped = isGameOver || isMainMenu;
    const points = contextRefs.players.current[0].points;
    const pointsTwo = contextRefs.players.current[1].points;
    gameOverLogic(
      isGameOver,
      points > pointsTwo ? points : pointsTwo,
      contextRefs.highScore.current,
      setHighScore
    );
    if (gameStopped) return;

    const frameIntervalId = setInterval(() => {
      const { slowCount, gameStage, gameStageMultiplier } = frameCounterLogic(
        contextRefs,
        contextValues
      );

      heroMovementLogicX(contextRefs, contextValues);
      heroMovementLogicY(contextRefs, contextValues);

      damageCalculationLogic(contextRefs, contextValues);

      spawnFallingObjectsLogic(contextRefs, contextValues, gameStageMultiplier);
      specialMeteorLogic(contextRefs, contextValues);

      const hitObject = objectGravityLogic(contextRefs, gameStageMultiplier);
      powerUpsLogic(contextValues, hitObject, gameStage, slowCount);
    }, FRAME_RATE);
    return () => {
      clearInterval(frameIntervalId);
    };
  }, [players[0].lives, players[1].lives, isMainMenu, isGameOver]);

  const borderWidth = 4 * 2;

  return (
    <GameStateContext.Provider value={contextValues}>
      <div className="flex h-screen w-full items-center justify-center overflow-hidden font-pix-con">
        <div
          className="relative"
          style={{
            height: SCREEN_HEIGHT + borderWidth,
            width: SCREEN_WIDTH + borderWidth,
          }}
        >
          <Mask top={-(OBJECT_SIZE * MASK_FACTOR)}>
            <HeaderBar highScore={highScore} />
          </Mask>
          <Canvas>
            {/* {!isGameOver && !isMainMenu &&  */}
            <UI />
            {/* //  */}
            {(isGameOver || isMainMenu) && <Menu />}
            {players.map((player, i) => {
              return <Hero key={i} player={player} isPlayerTwo={i !== 0} />;
            })}
            {fallingObjectPositions.map((object) => (
              <FallingObject key={object.id} object={object} />
            ))}
          </Canvas>
          <Mask top={SCREEN_HEIGHT} className="border-t-4 border-black" />
        </div>
      </div>
    </GameStateContext.Provider>
  );
}

export default App;
