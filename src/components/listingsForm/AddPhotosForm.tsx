'use client';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IListing } from '../../../types/listingTypes';
import Image from 'next/image';

type PropsType = {
  values: IListing;
  setValues: Dispatch<SetStateAction<IListing>>;
  photos: string[];
};

const AddPhotosForm: React.FC<PropsType> = ({ values, setValues, photos }) => {
  const [photoLink, setPhotoLink] = useState('');
  const [photosArray, setPhotosArray] = useState<string[]>([]);

  const handleChange = ({ name, value }) => {
    let data = { ...values };
    data = {
      ...data,
      [name]: value,
    };
    setValues(data);
  };

  const addLinktophotosSet = () => {
    const linkExists = photosArray.find((photo) => photo === photoLink);

    if (!photoLink) {
      alert('Please enter a url');
    } else if (!photoLink.includes('.') && !photoLink.includes('https://')) {
      alert('please enter a correct url');
    } else if (linkExists) {
      alert('this photo is already added');
      setPhotoLink('');
    } else {
      let newPhotosArray = [...photosArray, photoLink];
      handleChange({ name: 'photos', value: newPhotosArray });
      setPhotosArray(newPhotosArray);
      setPhotoLink('');
    }
  };

  const removePhoto = (photoIndex: number) => {
    let newArray = photosArray.filter((_, index) => index !== photoIndex);
    handleChange({ name: 'photos', value: newArray });
    setPhotosArray(newArray);
  };

  useEffect(() => {
    setPhotosArray(photos);
  }, [photos]);

  return (
    <div className='w-full text-black'>
      <div className='flex gap-2'>
        <input
          className='border border-black px-2 py-1 rounded'
          placeholder='https://www.photo.com/azerty'
          type='url'
          name='photo'
          onChange={(e) => setPhotoLink(e.target.value)}
          value={photoLink}
        />
        <button
          className='p-2 text-blue-600 hover:text-blue-800 text-xl border border-blue-800 hover:border-blue-600 rounded-md bg-gray-200 hover:bg-gray-400 px-2'
          type='button'
          onClick={addLinktophotosSet}>
          Ajouter
        </button>
      </div>

      <div className='mt-5 flex flex-col gap-2'>
        {photosArray.map((photo, index) => {
          return (
            <div key={index} className='flex gap-3 items-center'>
              <Image src={photo} alt={`${index}`} width='100' height='100' />
              <button
                className='text-red-500 hover:text-red-700 text-xl border border-red-500 hover:border-red-700 rounded-md px-2'
                type='button'
                onClick={() => removePhoto(index)}>
                Supprimer
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddPhotosForm;
