import { listTypeDeBien, nbRooms } from '../../../utils/listingDetails';
import FilterButton from './FilterButton';
import FilterCheckbox from './FilterCheckbox';
import FilterText from './FilterText';

const BasicSearch = ({
  handleInputChange,
  transaction,
  typeDeBien,
  quartier,
  ville,
  codePostal,
  nbPieces,
}) => {
  return (
    <div className='flex flex-col gap-10'>
      <div className=''>
        <p className='font-bold mb-3'>Vous souhaitez ?</p>
        <div className='flex gap-3'>
          <FilterButton
            name='transaction'
            value='vente'
            displayName='Acheter'
            handleInputChange={handleInputChange}
            classCheck={transaction === 'vente'}
          />
          <FilterButton
            name='transaction'
            value='location'
            displayName='Louer'
            handleInputChange={handleInputChange}
            classCheck={transaction === 'location'}
          />
        </div>
      </div>

      <div>
        <p className=' font-bold mb-3'>Quel(s) type(s) de bien ?</p>
        <div className='flex flex-wrap gap-5'>
          {listTypeDeBien.map((type) => {
            const { id, name, label } = type;
            return (
              <FilterCheckbox
                key={id}
                name='typeDeBien'
                value={name}
                label={label}
                handleInputChange={handleInputChange}
                isChecked={typeDeBien?.includes(name)}
              />
            );
          })}
        </div>
      </div>

      <div>
        <p className=' font-bold mb-3'>À quel endroit ?</p>
        <div className='relative flex gap-5'>
          <FilterText
            name='quartier'
            value={quartier}
            handleInputChange={handleInputChange}
            placeholder='quartier'
            symbol=''
          />
          <FilterText
            name='ville'
            value={ville}
            handleInputChange={handleInputChange}
            placeholder='Ville'
            symbol=''
          />
          <FilterText
            name='codePostal'
            value={codePostal}
            handleInputChange={handleInputChange}
            placeholder='Code Postal'
            symbol=''
          />
        </div>
      </div>

      <div>
        <p className=' font-bold mb-3'>Combien de pièces ?</p>
        <div className='flex flex-wrap gap-3'>
          {nbRooms.map((nb) => {
            return (
              <button
                key={nb}
                id='filter-input'
                name='nbPieces'
                value={nb}
                onClick={(e) => handleInputChange(e)}
                className={
                  nbPieces?.includes(nb)
                    ? 'border px-3 py-1 rounded-lg bg-gray-600'
                    : 'border px-3 py-1 rounded-lg'
                }>
                {nb !== '6' ? nb : '6 +'}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BasicSearch;
