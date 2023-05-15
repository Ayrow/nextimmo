import Image from 'next/image';
import { IListingDocument } from '../../../types/listingTypes';

const ListCard = ({ listing }: { listing: IListingDocument }) => {
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
    <div className='relative border rounded-2xl flex flex-col sm:flex-row flex-wrap items-center justify-between gap-5 p-5'>
      <div className='flex flex-wrap flex-col gap-2'>
        <p className='font-bold'>ref: {ref}</p>

        <Image
          src={photos.length > 0 ? photos[0] : '/house.jpg'}
          alt={`photo ref: ${ref}`}
          width='100'
          height='100'
          className='rounded-xl'
        />
      </div>

      <div className='text-center'>
        <p className='capitalize'>
          {typeDeBien} - {nbPieces} pièces - {surfaceInt}m2
        </p>

        <p className=''>
          {lieu.ville}, {lieu.codePostal}
        </p>
      </div>

      <p className='text-red-500 font-bold'>{prix} €</p>

      <div className='flex flex-wrap gap-5'>
        <button
          type='button'
          className='border rounded-xl py-2 px-5 border-blue-500 shadow-blue-500 shadow-md'>
          See
        </button>
        <button
          type='button'
          className='border rounded-xl py-2 px-5 border-orange-500 shadow-orange-500 shadow-md'>
          Edit
        </button>
        <button
          type='button'
          className='border rounded-xl py-2 px-5 border-red-500 shadow-red-500 shadow-md'>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ListCard;
