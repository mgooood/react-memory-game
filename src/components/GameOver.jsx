import { useEffect, useState, useRef } from 'react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import RegularButton from './RegularButton';

function GameOver({ handleReset }) {
  const { height, width } = useWindowSize();
  const [shouldConfettiRun, setShouldConfettiRun] = useState(true);
  const gameOverRef = useRef(null);

  useEffect(() => {
    if (shouldConfettiRun) {
      const timer = setTimeout(() => {
        setShouldConfettiRun(false);
      }, 10000); // Confetti runs for 5 seconds

      return () => clearTimeout(timer); // Cleanup the timer if component unmounts or state changes
    }
  }, [shouldConfettiRun]);

  useEffect(() => {
    gameOverRef.current.focus();
  }, []);

  return (
    <>
      {shouldConfettiRun && (
        <Confetti
          height={height}
          width={width}
          numberOfPieces={500}
          recycle={false}
        />
      )}
      <div className='wrapper wrapper--accent' ref={gameOverRef} tabIndex={-1}>
        <p className='p--large'>You've matched all the cards!</p>
        <RegularButton handleClick={handleReset}>Play Again</RegularButton>
      </div>
    </>
  );
}

export default GameOver;
