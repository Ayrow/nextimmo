const FilterText = ({
  name,
  value,
  symbol,
  placeholder,
  handleInputChange,
}) => {
  return (
    <div className='relative mb-6'>
      <input
        type='text'
        id='filter-input'
        name={name}
        value={value}
        onChange={handleInputChange}
        min={0}
        className='border text-sm rounded-lg block w-full pr-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
        placeholder={placeholder}
      />
      {symbol && (
        <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
          <span className='w-5 h-5'>{symbol}</span>
        </div>
      )}
    </div>
  );
};

export default FilterText;
