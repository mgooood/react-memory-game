import SelectFieldOption from './SelectFieldOption';
import { data } from '../data/data';

function SelectField({ handleChange }) {
  const selectEl = Object.entries(data).map(([key, value]) => (
    <div key={key} className='form__inner-wrapper'>
      <label htmlFor={key}>Select a {key}</label>
      <select name={key} id={key} onChange={handleChange}>
        <SelectFieldOption optionsArray={value} />
      </select>
    </div>
  ));
  return <>{selectEl}</>;
}

export default SelectField;
