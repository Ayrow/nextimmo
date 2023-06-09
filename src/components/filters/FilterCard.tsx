'use client';

const FilterCard = ({
  handleInputChange,
  name,
  resetValue,
  children,
  closeAllCards,
}) => {
  return (
    <div className='absolute border p-4 mt-4 mx-5 z-50 rounded-xl bg-sky-950'>
      {children}
      <div className='flex justify-between gap-10 mt-5'>
        <button
          name={name}
          value={resetValue}
          onClick={(e) => handleInputChange(e)}>
          Réinitialiser
        </button>
        <button
          onClick={closeAllCards}
          className='border-b border-b-transparent hover:border-b hover:border-white'>
          Valider
        </button>
      </div>
    </div>
  );
};

export default FilterCard;
