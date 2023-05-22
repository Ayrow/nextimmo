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
    console.log('photos', photos);
  }, [photos]);

  return (
    <div className=' text-black w-full'>
      <div className='flex flex-wrap gap-2'>
        <input
          className='border border-black px-2 py-1 w-3/4 rounded'
          placeholder='https://www.photo.com/azerty'
          type='url'
          name='photo'
          onChange={(e) => setPhotoLink(e.target.value)}
          value={photoLink}
        />
        <button
          className='p-2 text-blue-800 hover:text-blue-600 text-xl border border-blue-800 hover:border-blue-600 rounded-md bg-white px-2'
          type='button'
          onClick={addLinktophotosSet}>
          Add
        </button>
      </div>

      <div className='mt-5 flex flex-col gap-2'>
        {photosArray.map((photo, index) => {
          return (
            <div key={index} className='flex gap-3 items-center'>
              <Image src={photo} alt={`${index}`} width='100' height='100' />
              <p>{photo}</p>
              <button
                className='text-red-800 hover:text-red-600 text-xl border border-red-800 hover:border-red-600 rounded-md px-2'
                type='button'
                onClick={() => removePhoto(index)}>
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddPhotosForm;
