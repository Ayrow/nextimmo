const Contact = () => {
  return (
    <section className=' bg-gray-900'>
      <div className='py-8 lg:py-16 px-4 mx-auto max-w-screen-md'>
        <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-center text-white'>
          Nous contacter
        </h2>
        <p className='mb-8 lg:mb-16 font-light text-center text-gray-400 sm:text-xl'>
          Vous avez une question? Vous souhaitez plus de renseignements? Vous
          souhaitez vendre votre maison? Dites nous tout.
        </p>
        <form action='#' className='space-y-8'>
          <div>
            <label className='block mb-2 text-sm font-medium text-gray-300'>
              Votre email
            </label>
            <input
              type='email'
              id='email'
              className='shadow-sm border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500 shadow-sm-light'
              placeholder='jean@gmail.com'
              required
            />
          </div>
          <div>
            <label className='block mb-2 text-sm font-medium text-gray-300'>
              Sujet
            </label>
            <input
              type='text'
              id='subject'
              className='block p-3 w-full text-sm rounded-lg border shadow-sm bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500 shadow-sm-light'
              placeholder='Dites nous comment vous aider.'
              required
            />
          </div>
          <div className='sm:col-span-2'>
            <label className='block mb-2 text-sm font-medium text-gray-400'>
              Votre message
            </label>
            <textarea
              id='message'
              rows={6}
              className='block p-2.5 w-full text-sm rounded-lg shadow-sm border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500'
              placeholder='Laissez un message...'></textarea>
          </div>
          <button
            type='submit'
            className='py-3 px-5 text-sm font-medium text-center rounded-lg sm:w-fit focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'>
            Envoyer
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
