function SelectFieldOption({ optionsArray }) {
  const options = optionsArray.map(({ name, value }) => (
    <option key={value} value={value}>
      {name || value}
    </option>
  ));
  return <>{options}</>;
}

export default SelectFieldOption;
