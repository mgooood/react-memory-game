import { useEffect, useRef } from 'react';
import RegularButton from './RegularButton';
import SelectField from './SelectField';

function Form({ handleSubmit, handleChange, isFirstRender }) {
  const formDiv = useRef(null);

  useEffect(() => {
    if (!isFirstRender) {
      formDiv.current.focus();
    }
  }, [isFirstRender]);
  return (
    <div className='form-container' ref={formDiv} tabIndex={-1}>
      <p className='p--regular'>
        Customize the game by selecting an emoji category and a number of memory
        cards.
      </p>
      <form className='wrapper'>
        <SelectField handleChange={handleChange} />
        <RegularButton handleClick={handleSubmit}>Start Game</RegularButton>
      </form>
    </div>
  );
}

export default Form;
