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
    <>
      <div className='flex flex-col items-center gap-10'>
        <div>
          <p className='text-center font-bold'>Vous souhaitez ?</p>
          <div className='flex gap-3 my-5'>
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
          <p className='text-center font-bold'>Quel(s) type(s) de bien ?</p>
          <div className='flex my-5 flex-wrap gap-5 justify-center'>
            {listTypeDeBien.map((type) => {
              const { id, name, label } = type;
              return (
                <FilterCheckbox
                  key={id}
                  name='typeDeBien'
                  value={name}
                  label={label}
                  handleInputChange={handleInputChange}
                  isChecked={typeDeBien.includes(name)}
                />
              );
            })}
          </div>
        </div>

        <div>
          <p className='text-center font-bold'>À quel endroit ?</p>
          <div className='relative flex gap-5 my-5'>
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
          <p className='text-center font-bold'>Combien de pièces ?</p>
          <div className='flex flex-wrap gap-3 my-5'>
            {nbRooms.map((nb) => {
              return (
                <button
                  id='filter-input'
                  name='nbPieces'
                  value={nb}
                  onClick={(e) => handleInputChange(e)}
                  className={
                    nbPieces.includes(nb)
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
    </>
  );
};

export default BasicSearch;
