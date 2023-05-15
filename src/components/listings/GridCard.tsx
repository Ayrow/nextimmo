import { IListingDocument } from '../../../types/listingTypes';
import Image from 'next/image';

const GridCard = ({ listing }: { listing: IListingDocument }) => {
  const {
    ref,
    nbPieces,
    prix,
    location,
    typeDeBien,
    lieu,
    surfaceInt,
    statut,
    photos,
  } = listing;
  return (
    <div className='relative border rounded-2xl'>
      <Image
        src={photos.length > 1 ? photos[0] : '/house.jpg'}
        alt='house under a magnifying glass'
        width='500'
        height='500'
        className=' rounded-t-2xl'
      />

      <div className='p-5'>
        <div className='flex flex-wrap justify-between'>
          <p className='capitalize'>
            {typeDeBien} - {nbPieces} pièces - {surfaceInt}m2
          </p>
          <p className='text-red-500 font-bold'>{prix} €</p>
        </div>

        <p className='mt-5'>
          {lieu.ville}, {lieu.codePostal}
        </p>

        <div className='flex flex-wrap justify-around mt-5'>
          <button
            type='button'
            className='border rounded-xl py-2 px-5 border-red-500 text-red-500 bg-gray-950'>
            Favoris
          </button>
          <button type='button' className='border rounded-xl py-2 px-5'>
            Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default GridCard;
