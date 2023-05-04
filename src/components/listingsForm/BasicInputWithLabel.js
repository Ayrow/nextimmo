const BasicInputWithLabel = ({
  label,
  placeholder,
  isRequired,
  name,
  type,
}) => {
  return (
    <div className='sm:col-span-2'>
      <label className='block mb-2 text-sm font-medium text-white'>
        {label}
      </label>
      <input
        type={type}
        name={name}
        className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'
        placeholder={placeholder}
        required={isRequired}
      />
    </div>
  );
};

export default BasicInputWithLabel;
