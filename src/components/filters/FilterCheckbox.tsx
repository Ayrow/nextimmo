const FilterCheckbox = ({
  name,
  value,
  isChecked,
  handleInputChange,
  label,
}) => {
  return (
    <div className='flex gap-2 items-center'>
      <input
        type='checkbox'
        id='filter-input'
        name={name}
        value={value}
        onChange={handleInputChange}
        checked={isChecked}
        className='border rounded-lg'
      />
      <label className='capitalize'>{label}</label>
    </div>
  );
};

export default FilterCheckbox;
