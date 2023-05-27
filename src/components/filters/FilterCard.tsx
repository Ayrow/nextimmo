'use client';

const FilterCard = ({
  handleInputChange,
  name,
  value,
  title,
  children,
  closeAllCards,
}) => {
  return (
    <div className='absolute border p-4 mt-4 z-50 rounded-xl bg-sky-950'>
      <p className='text-center font-bold'>{title}</p>
      {children}
      <div className='flex justify-between gap-10 mt-5'>
        <button name={name} value={value} onClick={(e) => handleInputChange(e)}>
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
