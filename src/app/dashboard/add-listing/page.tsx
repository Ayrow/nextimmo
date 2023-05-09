'use client';

import { IListing } from '../../../../types/listingTypes';
import BasicInputWithLabel from '../../../components/listingsForm/BasicInputWithLabel';
import SectionWithTitle from '../../../components/listingsForm/SectionWithTitle';
import { useState } from 'react';

const initialState: IListing = {
  ref: '',
  typeDeBien: '',
  transaction: 'vente',
  lieu: {
    quartier: '',
    ville: '',
    codePostal: 0,
  },
  prix: 0,
  dateConstruction: 0,
  nbPieces: 0,
  nbChambres: 0,
  nbSDB: 0,
  nbEtages: 0,
  statut: '',
  surfaceInt: 0,
  surfaceExt: 0,
  equipements: {
    interieur: {
      cave: false,
      garage: false,
      veranda: false,
      ascenseur: false,
      plainPied: false,
      accessibilitePMR: false,
      digiCode: false,
      alarme: false,
      Interphone: false,
      cheminee: false,
      climatisation: false,
      gardien: false,
      toiletteSepare: false,
      cuisineEquipee: false,
    },
    exterieur: {
      balcon: false,
      terrasse: false,
      piscine: false,
      jardin: false,
      stationnement: false,
      portail: false,
    },
  },
  typeChauffage: '',
  exposition: '',
  description: '',
  consoEnergetique: 0,
  ges: 0,
  location: {
    loyerMensuel: 0,
    caution: 0,
  },
  photos: [''],
  honoraires: {
    chargeVendeur: false,
    taux: 0,
  },
};

const biens = [
  'maison',
  'appartement',
  'terrain',
  'immeuble',
  'parking',
  'garage',
  'bureau',
];

const AddListing = () => {
  const [values, setValues] = useState(initialState);
  const [isLocation, setIsLocation] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let data = { ...values };
    const { name, value } = e.target;

    if (name.startsWith('lieu')) {
      let lieuField = name.split('.')[1];
      data = {
        ...data,
        lieu: {
          ...data.lieu,
          [lieuField]: value,
        },
      };
    } else if (name.startsWith('honoraires')) {
      let honorairesField = name.split('.')[1];
      data = {
        ...data,
        honoraires: {
          ...data.honoraires,
          [honorairesField]: value,
        },
      };
    } else if (name.startsWith('equipementsInt')) {
      let equipementsIntField = name.split('.')[1];
      data = {
        ...data,
        equipements: {
          ...data.equipements,
          interieur: {
            ...data.equipements.interieur,
            [equipementsIntField]: value,
          },
        },
      };
    } else if (name.startsWith('equipementsExt')) {
      let equipementsExtField = name.split('.')[1];
      data = {
        ...data,
        equipements: {
          ...data.equipements,
          exterieur: {
            ...data.equipements.exterieur,
            [equipementsExtField]: value,
          },
        },
      };
    } else {
      data = { ...data, [name]: value };
    }
    setValues(data);
    console.log('values', values);
  };

  const clearForm = () => {
    setValues(initialState);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearForm();
  };

  return (
    <section className='bg-gray-900'>
      <div className='py-8 px-4 mx-auto max-w-2xl lg:py-16'>
        <h2 className='mb-4 text-xl text-center font-bold text-white'>
          Créer une annonce
        </h2>

        <form onSubmit={handleSubmit} className='mt-10'>
          <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>
            <div className='sm:col-span-2'>
              <BasicInputWithLabel
                label='Référence'
                placeholder='Indiquez la référence du bien'
                isRequired={true}
                name='ref'
                type='text'
                handleChange={handleChange}
                value={values.ref}
              />
            </div>

            <div className='sm:col-span-2'>
              <label className='block mb-2 text-sm font-medium text-white'>
                Type de Bien
              </label>
              <select
                onChange={handleChange}
                className='border text-sm rounded-lg block w-full p-2.5 bg-gray-900 border-gray-900 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'>
                <option selected={true}>Sélectionnez un type de bien</option>
                {biens.map((bien) => {
                  return (
                    <option key={bien} value={bien}>
                      {bien}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='sm:col-span-2 capitalize'>
              <label className='block mb-2 text-sm font-medium text-white'>
                Type de transaction
              </label>
              <select
                id='typeTransaction'
                className='border text-sm rounded-lg block w-full p-2.5 bg-gray-900 border-gray-900 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'>
                <option selected={true}>
                  Sélectionnez le type de transaction
                </option>
                <option value='vente'>Vente</option>
                <option value='location'>Location</option>
              </select>
            </div>

            <div className='sm:col-span-2 flex flex-wrap sm:flex-nowrap gap-4 sm:gap-6'>
              <div className='sm:col-span-2'>
                <BasicInputWithLabel
                  label='Quartier'
                  placeholder=''
                  isRequired={true}
                  name='lieu.quartier'
                  type='text'
                  handleChange={handleChange}
                  value={values.lieu.quartier}
                />
              </div>
              <div className='sm:col-span-2'>
                <BasicInputWithLabel
                  label='Ville'
                  placeholder=''
                  isRequired={true}
                  name='lieu.ville'
                  type='text'
                  handleChange={handleChange}
                  value={values.lieu.ville}
                />
              </div>
              <div className='sm:col-span-2'>
                <BasicInputWithLabel
                  label='Code Postal'
                  placeholder=''
                  isRequired={true}
                  name='lieu.codePostal'
                  type='number'
                  handleChange={handleChange}
                  value={values.lieu.codePostal}
                />
              </div>
            </div>
            <div className='sm:col-span-2'>
              <BasicInputWithLabel
                label='Prix'
                placeholder=''
                isRequired={true}
                name='prix'
                type='number'
                handleChange={handleChange}
                value={values.prix}
              />
            </div>
          </div>

          <SectionWithTitle title='Details'>
            <div className='sm:col-span-2'>
              <BasicInputWithLabel
                label='Date de construction'
                placeholder=''
                isRequired={false}
                name='dateConstruction'
                type='number'
                handleChange={handleChange}
                value={values.dateConstruction}
              />
            </div>
            <div className='sm:col-span-2'>
              <BasicInputWithLabel
                label='Nombre de Pièces'
                placeholder=''
                isRequired={false}
                name='nbPieces'
                type='number'
                handleChange={handleChange}
                value={values.nbPieces}
              />
            </div>

            <div className='sm:col-span-2'>
              <BasicInputWithLabel
                label='Nombre de Chambres'
                placeholder=''
                isRequired={false}
                name='nbChambre'
                type='number'
                handleChange={handleChange}
                value={values.nbChambres}
              />
            </div>

            <div className='sm:col-span-2'>
              <BasicInputWithLabel
                label="Nombre de salle de bain / salle d'eau"
                placeholder=''
                isRequired={false}
                name='nbSDB'
                type='number'
                handleChange={handleChange}
                value={values.nbSDB}
              />
            </div>

            <div className='sm:col-span-2'>
              <BasicInputWithLabel
                label="Nombre d'étages"
                placeholder=''
                isRequired={false}
                name='nbEtage'
                type='number'
                handleChange={handleChange}
                value={values.nbEtages}
              />
            </div>

            <div className='sm:col-span-2'>
              <label className='block mb-2 text-sm font-medium text-white'>
                Description
              </label>
              <textarea
                id='description'
                rows={8}
                className='block p-2.5 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'
                placeholder='Description du bien'
                name='description'
                value={values.description}></textarea>
            </div>
          </SectionWithTitle>

          <SectionWithTitle title='Equipements Intérieurs'>
            <div className='gap-4 flex'>
              <input
                type='checkbox'
                onChange={handleChange}
                name='equipementsInt.cave'
                className='w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600'
              />
              <label className='ml-2 text-sm font-medium text-gray-300'>
                Cave
              </label>
            </div>

            <div className='sm:col-span-2'>
              <BasicInputWithLabel
                label='Surface intérieure'
                placeholder=''
                isRequired={true}
                name='surfaceInt'
                type='number'
                handleChange={handleChange}
                value={values.surfaceInt}
              />
            </div>

            <div className='sm:col-span-2'>
              <label className='block mb-2 text-sm font-medium text-white'>
                Type de chauffage
              </label>
              <select
                onChange={handleChange}
                className='border text-sm rounded-lg block w-full p-2.5 bg-gray-900 border-gray-900 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'>
                <option selected={true}>
                  Sélectionnez un type de chauffage
                </option>
                <option value='gaz'>gaz</option>
                <option value='pac'>Pompe à chaleur</option>
              </select>
            </div>
          </SectionWithTitle>

          <div className='border-t border-sky-900 mt-12'>
            <h3 className='py-5 uppercase'>Equipements Extérieurs</h3>
            <div className='flex flex-col gap-6'>
              <div className='gap-4 flex'>
                <input
                  type='checkbox'
                  name='equipementsExt.balcon'
                  onChange={handleChange}
                  className='w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600'
                />
                <label className='ml-2 text-sm font-medium text-gray-300'>
                  Balcon
                </label>
              </div>

              <div className='sm:col-span-2'>
                <BasicInputWithLabel
                  label='Surface extérieure'
                  placeholder=''
                  isRequired={false}
                  name='surfaceExt'
                  type='number'
                  handleChange={handleChange}
                  value={values.surfaceExt}
                />
              </div>

              <div className='sm:col-span-2'>
                <label className='block mb-2 text-sm font-medium text-white'>
                  Exposition
                </label>
                <select
                  onChange={handleChange}
                  className='border text-sm rounded-lg block w-full p-2.5 bg-gray-900 border-gray-900 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'>
                  <option selected={true}>Sélectionnez une exposition</option>
                  <option value='nord'>nord</option>
                  <option value='sud'>sud</option>
                </select>
              </div>
            </div>
          </div>

          <div className='border-t border-sky-900 mt-12'>
            <h3 className='py-5 uppercase'>Bilan énergétique</h3>
            <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>
              <div className='sm:col-span-2'>
                <BasicInputWithLabel
                  label='Consommation Enérgétique (en kWh/m2.an)'
                  placeholder='500'
                  isRequired={false}
                  name='consoEnergetique'
                  type='number'
                  handleChange={handleChange}
                  value={values.consoEnergetique}
                />
              </div>

              <div className='sm:col-span-2'>
                <BasicInputWithLabel
                  label='Emission de gaz (en kgeqCO2/m².an)'
                  placeholder='50'
                  isRequired={false}
                  name='ges'
                  type='number'
                  handleChange={handleChange}
                  value={values.ges}
                />
              </div>
            </div>
          </div>

          <div className='border-t border-sky-900 mt-12'>
            <h3 className='py-5 uppercase'>Photos</h3>
            <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>
              <div className='w-full'>
                <input
                  type='text'
                  name='photos'
                  value={values.photos}
                  id='photo'
                  onChange={handleChange}
                  className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'
                  placeholder='https://maphoto.com'
                  required={false}
                />
              </div>
            </div>
          </div>

          <div className='border-t border-sky-900 mt-12'>
            <h3 className='py-5 uppercase'>Honoraires</h3>
            <div className='flex flex-col gap-4'>
              <div className='w-full capitalize'>
                <label className='block mb-2 text-sm font-medium text-white'>
                  A Charge:
                </label>
                <select
                  onChange={handleChange}
                  className='border text-sm rounded-lg block w-full p-2.5 bg-gray-900 border-gray-900 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'>
                  <option selected={true}>
                    Sélectionnez qui prend en charge.
                  </option>
                  <option value='acheteur'>Acheteur</option>
                  <option value='vendeur'>Vendeur</option>
                </select>
              </div>

              <div className='sm:col-span-2'>
                <BasicInputWithLabel
                  label="Taux d'honoraires (en %)"
                  placeholder=''
                  isRequired={true}
                  name='taux'
                  type='number'
                  handleChange={handleChange}
                  value={values.honoraires.taux}
                />
              </div>
            </div>
          </div>

          <button
            type='submit'
            className='inline-flex items-center px-5 py-2.5 mt-4 sm:mt-10 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-gray-900 hover:bg-gray-800 border-sky-800 border-2'>
            Ajouter le bien
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddListing;
