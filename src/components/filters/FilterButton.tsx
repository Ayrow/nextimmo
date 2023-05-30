const FilterButton = ({
  handleInputChange,
  name,
  value,
  classCheck,
  displayName,
}) => {
  return (
    <button
      id='filter-input'
      name={name}
      value={value}
      onClick={handleInputChange}
      className={
        classCheck
          ? 'border m-2 p-5 rounded-lg bg-gray-600'
          : 'border m-2 p-5 rounded-lg'
      }>
      {displayName}
    </button>
  );
};

export default FilterButton;
