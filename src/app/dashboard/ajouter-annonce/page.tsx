'use client';

import { IListing } from '../../../../types/listingTypes';
import BasicInputWithLabel from '../../../components/listingsForm/BasicInputWithLabel';
import SectionWithTitle from '../../../components/listingsForm/SectionWithTitle';
import AddPhotosForm from '../../../components/listingsForm/AddPhotosForm';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../context/user/authContext';
import {
  listEquipementsExterieur,
  listEquipementsInterieur,
  listExpositionsBien,
  listTypeDeBien,
  listTypeChauffage,
} from '../../../../utils/listingDetails';
import { useListingsContext } from '../../../context/listings/listingsContext';
import {
  ModalCategories,
  useAppContext,
} from '../../../context/app/appContext';

import BackButton from '../../../components/buttons/BackButton';

import { HandleInputChangeType } from '../../../../types/functionTypes';
import { useSearchParams } from 'next/navigation';
import NotificationModal from '../../../components/modals/NotificationModal';

const initialState: IListing = {
  ref: '',
  etat: '',
  typeDeBien: 'maison',
  transaction: 'vente',
  location: {
    loyerMensuel: 0,
    caution: 0,
  },
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
  statut: 'disponible',
  surfaceInt: 0,
  surfaceExt: 0,
  equipements: {
    interieur: [],
    exterieur: [],
  },
  typeChauffage: '',
  exposition: '',
  description: '',
  consoEnergetique: 0,
  ges: 0,
  photos: [],
  honoraires: {
    aCharge: 'acheteur',
    taux: 0,
    fraisAgence: 0,
  },
};

const AddListing = () => {
  const searchParams = useSearchParams();
  const { firebaseUser } = useAuthContext();
  const { state, actions } = useAppContext();
  const { getSingleListing, singleListing } = useListingsContext();
  const [values, setValues] = useState(initialState);

  const handleChange: HandleInputChangeType = (e) => {
    let data = { ...values };
    const { name, value } = e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;

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
    } else if (
      (name.startsWith('interieur') && value !== '') ||
      (name.startsWith('exterieur') && value !== '')
    ) {
      const typeOfEquipement = name.split('.')[0];
      const newValue = value.replace(/\s/g, '').replace('é', 'e');

      let newArray: string[];
      if (values.equipements[typeOfEquipement] === '') {
        newArray = [];
      } else if (
        typeof values.equipements[typeOfEquipement] === 'string' &&
        values.equipements[typeOfEquipement] !== ''
      ) {
        newArray.push(values.equipements[typeOfEquipement] as string);
      } else {
        newArray = values.equipements[typeOfEquipement] as string[];
      }

      if (values.equipements[typeOfEquipement].includes(newValue)) {
        newArray = newArray.filter((item) => item !== newValue);
      } else {
        if (values.equipements[typeOfEquipement]) {
          newArray.push(newValue);
        }
      }

      data = {
        ...data,
        equipements: {
          ...data.equipements,
          [typeOfEquipement]: newArray,
        },
      };
    } else {
      data = { ...data, [name]: value };
    }
    setValues(data);
  };

  const clearForm = () => {
    setValues(initialState);
    actions.stopEditingItem();
  };

  const addNewListing = async () => {
    if (firebaseUser) {
      const { email } = firebaseUser;
      const { etat } = values;

      try {
        await fetch('/api/listing', {
          method: 'POST',
          body: JSON.stringify({ values, email, etat }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        actions.displayModal({
          modalMsg:
            etat === 'publiée'
              ? `L'annonce ${values.ref} a été créée et est en ligne`
              : `L'annonce ${values.ref} a été créée et est en brouillon`,
          modalCategory: ModalCategories.Success,
          modalTitle: 'Succès',
          refItem: values.ref,
        });
        // clearForm();
      } catch (error) {
        actions.displayModal({
          modalMsg: 'Une erreur est survenue, veuillez réessayer',
          modalCategory: ModalCategories.Error,
          modalTitle: 'Erreur',
          refItem: values.ref,
        });
      }
    } else {
      console.log('not an agent or admin');
      //display error as agent/admin is not connected
    }
    console.log('values', values);
  };

  const updateListing = async () => {
    if (firebaseUser) {
      const { email } = firebaseUser;
      const listingId = singleListing._id;
      const { etat } = values;
      try {
        await fetch(`/api/listing?listingId=${listingId}`, {
          method: 'PATCH',
          body: JSON.stringify({ values, email, etat }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        actions.displayModal({
          modalMsg:
            etat === 'publiée'
              ? `L'annonce ${values.ref} est en ligne et mise à jour`
              : `L'annonce ${values.ref} est en brouillon et mise à jour`,
          modalCategory: ModalCategories.Success,
          modalTitle: 'Succès',
          refItem: values.ref,
        });

        // Add Modal to confirm it has been added
      } catch (error) {
        actions.displayModal({
          modalMsg: 'Une erreur est survenue, veuillez réessayer',
          modalCategory: ModalCategories.Error,
          modalTitle: 'Erreur',
          refItem: values.ref,
        });
        // Add Modal for error
      }
    } else {
      console.log('not an agent or admin');
      //display error as agent/admin is not connected
    }
  };

  useEffect(() => {
    const isEditingParams = searchParams.get('editing');

    if (isEditingParams) {
      const controller = new AbortController();
      const signal = controller.signal;
      getSingleListing(isEditingParams, signal);
      if (singleListing) {
        const { __v, _id, createdBy, ...rest } = singleListing;
        setValues(rest);
      }
      return () => {
        controller.abort();
      };
    } else {
      clearForm();
      actions.stopEditingItem();
    }
    return () => {
      actions.stopEditingItem();
      clearForm();
    };
  }, [state.isEditing, state.refItem]);

  useEffect(() => {
    if (state.isEditing && singleListing) {
      setValues(singleListing);
    }

    return () => {
      setValues(initialState);
    };
  }, [singleListing]);

  const saveListingAsDraft = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    values.etat = 'brouillon';
    handleSubmit();
  };

  const pulishListing = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    values.etat = 'publiée';
    handleSubmit();
  };

  const handleSubmit = () => {
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
      nbSDB,
      etat,
    } = values;
    if (transaction === 'vente') {
      console.log('etat', etat);
      if (
        !ref ||
        !prix ||
        !typeDeBien ||
        !lieu.ville ||
        !lieu.codePostal ||
        !nbPieces ||
        !surfaceInt ||
        !nbChambres ||
        !nbSDB
      ) {
        alert('missing vente fields');
      } else {
        if (state.isEditing) {
          updateListing();
        } else {
          addNewListing();
        }
      }
    } else {
      if (
        !ref ||
        !location.loyerMensuel ||
        !location.caution ||
        !typeDeBien ||
        !lieu.ville ||
        !nbPieces ||
        !lieu.codePostal ||
        !surfaceInt ||
        !nbChambres ||
        !nbSDB
      ) {
        alert('missing fields location');
      } else {
        if (state.isEditing) {
          updateListing();
        } else {
          addNewListing();
        }
      }
    }
  };

  return (
    <section className='bg-gray-900'>
      <div className='py-8 px-4 mx-auto max-w-2xl lg:py-16'>
        <BackButton />
        {state.modal.showModal && <NotificationModal />}
        <h2 className='mb-4 text-xl text-center font-bold text-white'>
          {singleListing && state.isEditing
            ? `Modifier l'annonce: ${state.refItem}`
            : 'Créer une annonce'}
        </h2>

        <form className='mt-10'>
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
                Type de Bien <span className='text-red-500'>*</span>
              </label>
              <select
                onChange={handleChange}
                name='typeDeBien'
                required
                value={values.typeDeBien}
                className='border capitalize text-sm rounded-lg block w-full p-2.5 bg-gray-900 border-gray-900 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'>
                <option disabled>Sélectionnez le type de bien</option>
                {listTypeDeBien.map((bien) => {
                  const { id, name, label } = bien;
                  return (
                    <option key={id} value={name}>
                      {label}
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
                  isRequired={false}
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
            {listEquipementsInterieur.map((equip) => {
              const { id, label, name } = equip;
              return (
                <div key={id} className='flex'>
                  <input
                    type='checkbox'
                    onChange={handleChange}
                    name={`interieur.${name}`}
                    value={name}
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
                value={
                  values.typeChauffage
                    ? values.typeChauffage
                    : 'Sélectionnez le type de chauffage'
                }
                className='border text-sm rounded-lg block w-full p-2.5 bg-gray-900 border-gray-900 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'>
                <option disabled>Sélectionnez le type de chauffage</option>
                {listTypeChauffage.map((item) => {
                  const { id, label, name } = item;
                  return (
                    <option key={id} value={name}>
                      {label}
                    </option>
                  );
                })}
              </select>
            </div>
          </SectionWithTitle>

          <SectionWithTitle title='Equipements Extérieurs'>
            {listEquipementsExterieur.map((equip) => {
              const { id, name, label } = equip;
              return (
                <div key={id} className='flex'>
                  <input
                    type='checkbox'
                    onChange={handleChange}
                    name={`exterieur.${name}`}
                    value={name}
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
                value={
                  values.exposition
                    ? values.exposition
                    : "Sélectionnez l'exposition"
                }
                className='border text-sm rounded-lg block w-full p-2.5 bg-gray-900 border-gray-900 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'>
                <option disabled>Sélectionnez l'exposition</option>
                {listExpositionsBien.map((exposition) => {
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
              onClick={saveListingAsDraft}
              className='inline-flex items-center px-5 py-2.5 mt-4 sm:mt-10 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-gray-900 hover:bg-gray-800 border-sky-800 border-2'>
              Sauvegarder Brouillon
            </button>
            <button
              type='button'
              onClick={pulishListing}
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
