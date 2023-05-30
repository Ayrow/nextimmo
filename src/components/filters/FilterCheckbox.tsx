const FilterCheckbox = ({ name, value, isChecked, handleInputChange }) => {
  return (
    <div className='flex my-3 items-center'>
      <input
        type='checkbox'
        id='filter-input'
        name={name}
        value={value}
        onChange={handleInputChange}
        checked={isChecked}
        className='border m-2 p-5 rounded-lg'
      />
      <label className='capitalize'>{value}</label>
    </div>
  );
};

export default FilterCheckbox;
