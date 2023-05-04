'use client';

const AddListing = () => {
  return (
    <section className='bg-gray-900'>
      <div className='py-8 px-4 mx-auto max-w-2xl lg:py-16'>
        <h2 className='mb-4 text-xl text-center font-bold text-white'>
          Créer une annonce
        </h2>

        <form action='#'>
          <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>
            <div className='sm:col-span-2'>
              <label className='block mb-2 text-sm font-medium text-white'>
                Référence
              </label>
              <input
                type='text'
                name='ref'
                id='ref'
                className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'
                placeholder='Indiquez la référence du bien'
                required
              />
            </div>
            <div className='sm:col-span-2'>
              <label className='block mb-2 text-sm font-medium text-white'>
                Type de Bien
              </label>
              <select
                id='typeBien'
                className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'>
                <option selected=''>Sélectionnez un type de bien</option>
                <option value='maison'>Maison</option>
                <option value='appartement'>Appartement</option>
                <option value='terrain'>Terrain</option>
                <option value='immeuble'>Immeuble</option>
                <option value='parking'>Parking</option>
                <option value='garage'>Garage</option>
                <option value='bureau'>Bureau</option>
              </select>
            </div>
            <div className='sm:col-span-2'>
              <label className='block mb-2 text-sm font-medium text-white'>
                Type de transaction
              </label>
              <select
                id='typeBien'
                className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'>
                <option selected=''>Sélectionnez le type de transaction</option>
                <option value='maison'>Vente</option>
                <option value='appartement'>Location</option>
              </select>
            </div>

            <div className='sm:col-span-2 flex flex-col gap-4 sm:gap-6'>
              <div>
                <label className='block mb-2 text-sm font-medium text-white'>
                  Année construction
                </label>
                <input
                  type='number'
                  name='anneeConstruction'
                  id='anneeConstruction'
                  className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'
                  required
                />
              </div>
              <div className='sm:col-span-2'>
                <label className='block mb-2 text-sm font-medium text-white'>
                  Nombre de Pièces
                </label>
                <input
                  type='number'
                  name='nbPieces'
                  id='nbPieces'
                  className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'
                  required
                />
              </div>
            </div>

            <div className='sm:col-span-2 flex gap-4 sm:gap-6'>
              <div className='sm:col-span-2'>
                <label className='block mb-2 text-sm font-medium text-white'>
                  Quartier
                </label>
                <input
                  type='text'
                  name='quartier'
                  id='quartier'
                  className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'
                  required
                />
              </div>
              <div className='sm:col-span-2'>
                <label className='block mb-2 text-sm font-medium text-white'>
                  Vile
                </label>
                <input
                  type='tex'
                  name='ville'
                  id='ville'
                  className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'
                  required
                />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-white'>
                  Code Postal
                </label>
                <input
                  type='number'
                  name='codePostal'
                  id='codePostal'
                  className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'
                  required
                />
              </div>
            </div>

            <div className='sm:col-span-2'>
              <label className='block mb-2 text-sm font-medium text-white'>
                Prix
              </label>
              <input
                type='number'
                name='prix'
                id='prix'
                className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'
                required
              />
            </div>
          </div>

          <div className='border-t border-sky-900 mt-12'>
            <h3 className='py-5 uppercase'>Détails</h3>
            <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>
              <div>
                <label className='block mb-2 text-sm font-medium text-white'>
                  Année construction
                </label>
                <input
                  type='number'
                  name='anneeConstruction'
                  id='anneeConstruction'
                  className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'
                  required
                />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-white'>
                  Nombre de Pièces
                </label>
                <input
                  type='number'
                  name='nbPieces'
                  id='nbPieces'
                  className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'
                  required
                />
              </div>
              <div className='w-full'>
                <label className='block mb-2 text-sm font-medium text-white'>
                  Nombre de Chambres
                </label>
                <input
                  type='number'
                  name='nbChambre'
                  id='nbChambre'
                  className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'
                  required
                />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-white'>
                  Nombre de salle de bain / salle d'eau
                </label>
                <input
                  type='number'
                  name='nbSDB'
                  id='nbSDB'
                  className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'
                  required
                />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-white'>
                  Nombre d'étages
                </label>
                <input
                  type='number'
                  name='nbEtage'
                  id='nbEtage'
                  className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'
                  required
                />
              </div>
              <div className='sm:col-span-2'>
                <label className='block mb-2 text-sm font-medium text-white'>
                  Description
                </label>
                <textarea
                  id='description'
                  rows='8'
                  className='block p-2.5 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'
                  placeholder='Description du bien'></textarea>
              </div>
            </div>
          </div>

          <div className='border-t border-sky-900 mt-12'>
            <h3 className='py-5 uppercase'>Equipements Intérieurs</h3>
            <div className='flex flex-col gap-6'>
              <div className='gap-4 flex'>
                <input
                  id='default-checkbox'
                  type='checkbox'
                  value=''
                  class='w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600'
                />
                <label
                  for='default-checkbox'
                  class='ml-2 text-sm font-medium text-gray-300'>
                  Equipement 1
                </label>
              </div>

              <div>
                <label className='block mb-2 text-sm font-medium text-white'>
                  Surface intérieure
                </label>
                <input
                  type='number'
                  name='surfaceInt'
                  id='surfaceInt'
                  className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'
                  required
                />
              </div>

              <div className='sm:col-span-2'>
                <label className='block mb-2 text-sm font-medium text-white'>
                  Type de chauffage
                </label>
                <select
                  id='typeChauffage'
                  className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'>
                  <option selected=''>Sélectionnez un type de chauffage</option>
                  <option value='gaz'>gaz</option>
                  <option value='pac'>Pompe à chaleur</option>
                </select>
              </div>
            </div>
          </div>

          <div className='border-t border-sky-900 mt-12'>
            <h3 className='py-5 uppercase'>Equipements Extérieurs</h3>
            <div className='flex flex-col gap-6'>
              <div className='gap-4 flex'>
                <input
                  id='default-checkbox'
                  type='checkbox'
                  value=''
                  class='w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600'
                />
                <label
                  for='default-checkbox'
                  class='ml-2 text-sm font-medium text-gray-300'>
                  Equipement 1
                </label>
              </div>

              <div>
                <label className='block mb-2 text-sm font-medium text-white'>
                  Surface extérieure
                </label>
                <input
                  type='number'
                  name='surfaceExt'
                  id='surfaceExt'
                  className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'
                  required
                />
              </div>

              <div className='sm:col-span-2'>
                <label className='block mb-2 text-sm font-medium text-white'>
                  Exposition
                </label>
                <select
                  id='exposition'
                  className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'>
                  <option selected=''>Sélectionnez une exposition</option>
                  <option value='nord'>nord</option>
                  <option value='sud'>sud</option>
                </select>
              </div>
            </div>
          </div>

          <div className='border-t border-sky-900 mt-12'>
            <h3 className='py-5 uppercase'>Bilan énergétique</h3>
            <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>
              <div className='w-full'>
                <label className='block mb-2 text-sm font-medium text-white'>
                  Consommation Enérgétique (en kWh/m2.an)
                </label>
                <input
                  type='number'
                  name='consoEnergetique'
                  id='onsoEnergetique'
                  className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'
                  placeholder='500'
                  required
                />
              </div>
              <div className='w-full'>
                <label className='block mb-2 text-sm font-medium text-white'>
                  Emission de gaz (en kgeqCO2/m².an)
                </label>
                <input
                  type='number'
                  name='ges'
                  id='ges'
                  className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'
                  placeholder='50'
                  required
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
                  id='photo'
                  className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'
                  placeholder='https://maphoto.com'
                  required
                />
              </div>
            </div>
          </div>

          <div className='border-t border-sky-900 mt-12'>
            <h3 className='py-5 uppercase'>Honoraires</h3>
            <div className='flex flex-col gap-4'>
              <div className='w-full'>
                <label className='block mb-2 text-sm font-medium text-white'>
                  Type de transaction
                </label>
                <select
                  id='typeBien'
                  className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'>
                  <option selected=''>
                    Sélectionnez le type de transaction
                  </option>
                  <option value='maison'>Vente</option>
                  <option value='appartement'>Location</option>
                </select>
              </div>

              <div className='w-full'>
                <label className='block mb-2 text-sm font-medium text-white'>
                  Taux d'honoraires (en %)
                </label>
                <input
                  type='number'
                  name='taux'
                  id='taux'
                  className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'
                  placeholder='50'
                  required
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
