function RegularButton({ children, handleClick }) {
  return (
    <button className='btn btn--text' onClick={handleClick}>
      {children}
    </button>
  );
}

export default RegularButton;
