import React, { useEffect, useRef } from 'react';
import RegularButton from './RegularButton';

function ErrorCard({ handleReset }) {
  const errorCardRef = useRef(null); // Create a ref for the main div

  useEffect(() => {
    // Focus the error card div when the component mounts
    if (errorCardRef.current) {
      errorCardRef.current.focus();
    }
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div
      ref={errorCardRef} // Assign the ref to the div
      className='wrapper wrapper--accent'
      role='alertdialog' // Still good for indicating an important, interactive alert
      aria-live='assertive' // Ensures screen readers announce its content
      aria-labelledby='error-card-title'
      aria-describedby='error-card-description'
      tabIndex='-1' // Make the div programmatically focusable, but not part of natural tab order
    >
      <p className='p--large' id='error-card-title'>
        Sorry, there was an error.
      </p>
      <p className='p--small' id='error-card-description'>
        Please come back later or click the button below to try restarting the
        game.
      </p>
      {/* No ref needed on the button unless you have other reasons for it */}
      <RegularButton handleClick={handleReset}>Reset Game</RegularButton>
    </div>
  );
}

export default ErrorCard;
