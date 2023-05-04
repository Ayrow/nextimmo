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
                placeholder='Indiquer la référence du bien'
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
                <option selected=''>Sélectionner un type</option>
                <option value='maison'>Maison</option>
                <option value='appartement'>Appartement</option>
                <option value='terrain'>Terrain</option>
                <option value='immeuble'>Immeuble</option>
                <option value='parking'>Parking</option>
                <option value='garage'>Garage</option>
                <option value='bureau'>Bureau</option>
              </select>
            </div>
            <div className='w-full'>
              <label className='block mb-2 text-sm font-medium text-white'>
                Année construction
              </label>
              <input
                type='number'
                name='anneeConstruction'
                id='anneeConstruction'
                className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'
                placeholder='1900'
                required
              />
            </div>
            <div className='w-full'>
              <label className='block mb-2 text-sm font-medium text-white'>
                Prix
              </label>
              <input
                type='number'
                name='prix'
                id='prix'
                className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'
                placeholder='10000'
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
                placeholder='5'
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
                placeholder='2'
                required
              />
            </div>
            <div>
              <label className='block mb-2 text-sm font-medium text-white'>
                Nombre de salle de bain
              </label>
              <input
                type='number'
                name='nbSDB'
                id='nbSDB'
                className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'
                placeholder='1'
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
                placeholder='1'
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

          <div className='border-t border-sky-900 mt-12'>
            <h3 className='py-5 uppercase'>Equipements Intérieurs</h3>
            <div className='gap-4 flex'>
              <div>
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
            </div>
          </div>

          <div className='border-t border-sky-900 mt-12'>
            <h3 className='py-5 uppercase'>Equipements Extérieurs</h3>
            <div className='gap-4 flex'>
              <div>
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

          <button
            type='submit'
            className='inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-gray-900 hover:bg-gray-800'>
            Ajouter le bien
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddListing;
