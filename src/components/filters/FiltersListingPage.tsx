import React, { useEffect, useState } from 'react';

const FiltersListingPage = () => {
  const FiltersCards = {
    transaction: false,
    typeDeBien: false,
    localisation: false,
    prix: false,
    surface: false,
    pieces: false,
    rechercheAvancee: false,
  };

  const [isCardOpen, setIsCardOpen] = useState(FiltersCards);

  useEffect(() => {
    setIsCardOpen(FiltersCards);
  }, []);

  return (
    <div className='m-5'>
      {/* Mobile */}
      <div>
        <div className='md:hidden flex justify-end gap-5'>
          <button className='border px-2 rounded-lg'>Filtrer</button>
          <button className='border px-2 rounded-lg'>Plus récent </button>
        </div>
      </div>

      {/* Desktop*/}
      <div>
        <div className='hidden md:flex m-5 border justify-between rounded-xl p-5 shadow-xl shadow-black'>
          <button className='px-2 border rounded-lg'>Acheter</button>
          <button className='px-2 border rounded-lg'>Type de Bien</button>
          <button className='px-2 border rounded-lg'>Localisation</button>
          <button className='px-2 border rounded-lg'>Prix</button>
          <button className='px-2 border rounded-lg'>Surface</button>
          <button className='px-2 border rounded-lg'>Pièces</button>
          <button className='px-2 text-red-500'>Recherche Avancée</button>
        </div>
      </div>
    </div>
  );
};

export default FiltersListingPage;
