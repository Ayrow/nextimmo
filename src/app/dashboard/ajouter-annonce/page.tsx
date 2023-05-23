'use client';

import { IListing } from '../../../../types/listingTypes';
import BasicInputWithLabel from '../../../components/listingsForm/BasicInputWithLabel';
import SectionWithTitle from '../../../components/listingsForm/SectionWithTitle';
import AddPhotosForm from '../../../components/listingsForm/AddPhotosForm';
import { useState } from 'react';
import { useAuthContext } from '../../../context/user/authContext';
import {
  equipementsExterieur,
  equipementsInterieur,
  expositionsBien,
} from '../../../../utils/listingDetails';

const initialState: IListing = {
  ref: '',
  typeDeBien: 'Sélectionnez le type de bien',
  transaction: 'vente',
  location: {
    loyerMensuel: undefined,
    caution: undefined,
  },
  lieu: {
    quartier: '',
    ville: '',
    codePostal: undefined,
  },
  prix: undefined,
  dateConstruction: undefined,
  nbPieces: 0,
  nbChambres: 0,
  nbSDB: 0,
  nbEtages: 0,
  statut: 'disponible',
  surfaceInt: undefined,
  surfaceExt: undefined,
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
      interphone: false,
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
  typeChauffage: 'Sélectionnez le type de chauffage',
  exposition: '',
  description: '',
  consoEnergetique: undefined,
  ges: undefined,
  photos: [],
  honoraires: {
    aCharge: 'acheteur',
    taux: 0,
    fraisAgence: 0,
  },
  draft: false,
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

const typesDeChauffage = [
  'gaz',
  'fioul',
  'electrique',
  'solaire',
  'bois',
  'pac',
];

const AddListing = () => {
  const { firebaseUser } = useAuthContext();
  const [values, setValues] = useState(initialState);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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
    } else if (name.startsWith('location')) {
      let locationField = name.split('.')[1];
      data = {
        ...data,
        location: {
          ...data.location,
          [locationField]: value,
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

  const addListing = async () => {
    if (firebaseUser) {
      const { email } = firebaseUser;
      try {
        await fetch('/api/listing', {
          method: 'POST',
          body: JSON.stringify({ values, email }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // Add Modal to confirm it has been added
        // clearForm();
      } catch (error) {
        alert(error);
        // Add Modal for error
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      transaction,
      ref,
      prix,
      typeDeBien,
      nbPieces,
      lieu,
      surfaceInt,
      location,
      nbChambres,
      nbEtages,
      nbSDB,
    } = values;

    if (transaction === 'vente') {
      if (
        !ref ||
        !prix ||
        !typeDeBien ||
        !lieu.quartier ||
        !lieu.ville ||
        !lieu.codePostal ||
        !nbPieces ||
        !surfaceInt ||
        !nbChambres ||
        !nbEtages ||
        !nbSDB
      ) {
        alert('missing fields vente');
      } else {
        addListing();
      }
    } else {
      if (
        !ref ||
        !location.loyerMensuel ||
        !location.caution ||
        !typeDeBien ||
        !lieu.quartier ||
        !lieu.ville ||
        !nbPieces ||
        !lieu.codePostal ||
        !surfaceInt ||
        !nbChambres ||
        !nbEtages ||
        !nbSDB
      ) {
        alert('missing fields location');
      } else {
        addListing();
      }
    }
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
                name='typeDeBien'
                value={values.typeDeBien}
                className='border capitalize text-sm rounded-lg block w-full p-2.5 bg-gray-900 border-gray-900 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'>
                <option disabled>Sélectionnez le type de bien</option>
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
                name='transaction'
                onChange={handleChange}
                value={values.transaction}
                className='border text-sm rounded-lg block w-full p-2.5 bg-gray-900 border-gray-900 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'>
                <option value='vente'>Vente</option>
                <option value='location'>Location</option>
              </select>
            </div>

            <div className='sm:col-span-2 capitalize'>
              <label className='block mb-2 text-sm font-medium text-white'>
                Statut
              </label>
              <select
                name='statut'
                onChange={handleChange}
                value={values.statut}
                className='border text-sm rounded-lg block w-full p-2.5 bg-gray-900 border-gray-900 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'>
                <option value='bientot'>Bientôt</option>
                <option value='disponible'>Disponible</option>
                <option value='offreEnCours'>Offre en cours</option>
                <option value='vendu'>Vendu</option>
                <option value='loué'>Loué</option>
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
                  value={
                    values.lieu.codePostal === undefined
                      ? ''
                      : values.lieu.codePostal
                  }
                />
              </div>
            </div>

            {values.transaction === 'vente' ? (
              <div className='sm:col-span-2'>
                <BasicInputWithLabel
                  label='Prix'
                  placeholder=''
                  isRequired={true}
                  name='prix'
                  type='number'
                  handleChange={handleChange}
                  value={values.prix === undefined ? '' : values.prix}
                />
              </div>
            ) : (
              <>
                <div className='sm:col-span-2'>
                  <BasicInputWithLabel
                    label='Loyer Mensuel'
                    placeholder=''
                    isRequired={true}
                    name='location.loyerMensuel'
                    type='number'
                    handleChange={handleChange}
                    value={
                      values.location.loyerMensuel
                        ? undefined
                        : values.location.loyerMensuel
                    }
                  />
                </div>

                <div className='sm:col-span-2'>
                  <BasicInputWithLabel
                    label='Caution'
                    placeholder=''
                    isRequired={true}
                    name='location.caution'
                    type='number'
                    handleChange={handleChange}
                    value={
                      values.location.caution === undefined
                        ? ''
                        : values.location.caution
                    }
                  />
                </div>
              </>
            )}
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
                value={
                  values.dateConstruction === undefined
                    ? ''
                    : values.dateConstruction
                }
              />
            </div>
            <div className='sm:col-span-2'>
              <BasicInputWithLabel
                label='Nombre de Pièces'
                placeholder=''
                isRequired={true}
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
                isRequired={true}
                name='nbChambres'
                type='number'
                handleChange={handleChange}
                value={values.nbChambres}
              />
            </div>

            <div className='sm:col-span-2'>
              <BasicInputWithLabel
                label="Nombre de salle de bain / salle d'eau"
                placeholder=''
                isRequired={true}
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
                isRequired={true}
                name='nbEtages'
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
                onChange={handleChange}
                rows={8}
                className='block p-2.5 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'
                placeholder='Description du bien'
                name='description'
                value={values.description}></textarea>
            </div>
          </SectionWithTitle>

          <SectionWithTitle title='Equipements Intérieurs'>
            {equipementsInterieur.map((equip) => {
              const { id, name, label } = equip;
              return (
                <div key={id} className='flex'>
                  <input
                    type='checkbox'
                    onChange={handleChange}
                    name={`equipementsInt.${name}`}
                    className='w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600'
                  />
                  <label className='ml-2 text-sm font-medium text-gray-300'>
                    {label}
                  </label>
                </div>
              );
            })}

            <div className='mt-5 sm:col-span-2'>
              <BasicInputWithLabel
                label='Surface intérieure'
                placeholder=''
                isRequired={true}
                name='surfaceInt'
                type='number'
                handleChange={handleChange}
                value={values.surfaceInt === undefined ? '' : values.surfaceInt}
              />
            </div>

            <div className='sm:col-span-2'>
              <label className='block mb-2 text-sm font-medium text-white'>
                Type de chauffage
              </label>
              <select
                onChange={handleChange}
                name='typeChauffage'
                value={values.typeChauffage}
                className='border text-sm rounded-lg block w-full p-2.5 bg-gray-900 border-gray-900 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'>
                <option disabled>Sélectionnez le type de chauffage</option>
                <option value='gaz'>gaz</option>
                <option value='pac'>Pompe à chaleur</option>
              </select>
            </div>
          </SectionWithTitle>

          <SectionWithTitle title='Equipements Extérieurs'>
            {equipementsExterieur.map((equip) => {
              const { id, name, label } = equip;
              return (
                <div key={id} className='flex'>
                  <input
                    type='checkbox'
                    onChange={handleChange}
                    name={`equipementsInt.${name}`}
                    className='w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600'
                  />
                  <label className='ml-2 text-sm font-medium text-gray-300'>
                    {label}
                  </label>
                </div>
              );
            })}

            <div className='sm:col-span-2'>
              <BasicInputWithLabel
                label='Surface extérieure'
                placeholder=''
                isRequired={false}
                name='surfaceExt'
                type='number'
                handleChange={handleChange}
                value={values.surfaceExt === undefined ? '' : values.surfaceExt}
              />
            </div>

            <div className='sm:col-span-2'>
              <label className='block mb-2 text-sm font-medium text-white'>
                Exposition
              </label>
              <select
                onChange={handleChange}
                name='exposition'
                value={values.exposition}
                className='border text-sm rounded-lg block w-full p-2.5 bg-gray-900 border-gray-900 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'>
                {expositionsBien.map((exposition) => {
                  const { id, name, label } = exposition;
                  return (
                    <option key={id} value={name}>
                      {label}
                    </option>
                  );
                })}
              </select>
            </div>
          </SectionWithTitle>

          <SectionWithTitle title='Bilan Énergétique'>
            <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>
              <div className='sm:col-span-2'>
                <BasicInputWithLabel
                  label='Consommation Enérgétique (en kWh/m2.an)'
                  placeholder='500'
                  isRequired={false}
                  name='consoEnergetique'
                  type='number'
                  handleChange={handleChange}
                  value={
                    values.consoEnergetique === undefined
                      ? ''
                      : values.consoEnergetique
                  }
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
                  value={values.ges === undefined ? '' : values.ges}
                />
              </div>
            </div>
          </SectionWithTitle>

          <SectionWithTitle title='Photos'>
            <AddPhotosForm
              values={values}
              setValues={setValues}
              photos={values.photos}
            />
          </SectionWithTitle>

          <SectionWithTitle title='Honoraires'>
            {values.transaction === 'vente' ? (
              <div className='flex flex-col gap-4'>
                <div className='w-full capitalize'>
                  <label className='block mb-2 text-sm font-medium text-white'>
                    A Charge:
                  </label>
                  <select
                    onChange={handleChange}
                    name='honoraires.aCharge'
                    value={values.honoraires.aCharge}
                    className='border text-sm rounded-lg block w-full p-2.5 bg-gray-900 border-gray-900 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'>
                    <option value='acheteur'>Acheteur</option>
                    <option value='vendeur'>Vendeur</option>
                  </select>
                </div>

                <div className='sm:col-span-2'>
                  <BasicInputWithLabel
                    label="Taux d'honoraires (en %)"
                    placeholder=''
                    isRequired={true}
                    name='honoraires.taux'
                    type='number'
                    handleChange={handleChange}
                    value={values.honoraires.taux}
                  />
                </div>
              </div>
            ) : (
              <div className='sm:col-span-2'>
                <BasicInputWithLabel
                  label="Frais d'Agence"
                  placeholder=''
                  isRequired={true}
                  name='honoraires.fraisAgence'
                  type='number'
                  handleChange={handleChange}
                  value={values.honoraires.fraisAgence}
                />
              </div>
            )}
          </SectionWithTitle>

          <div className='flex flex-wrap gap-5'>
            <button
              type='button'
              className='inline-flex items-center px-5 py-2.5 mt-4 sm:mt-10 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-gray-900 hover:bg-gray-800 border-sky-800 border-2'>
              Sauvegarder Brouillon
            </button>
            <button
              type='submit'
              className='inline-flex items-center px-5 py-2.5 mt-4 sm:mt-10 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-900 hover:bg-blue-800 border-sky-800 border-2'>
              Publier le bien
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddListing;
