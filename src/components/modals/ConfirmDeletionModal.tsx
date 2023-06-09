import { useAppContext } from '../../context/app/appContext';

const ConfirmDeletionModal = ({ deleteItem }) => {
  const { state, actions } = useAppContext();
  const { modalCategory, modalMsg, modalTitle, refItem } = state.modal;

  const colorVariants = {
    success: 'bg-green-500 hover:bg-green-600 focus:ring-green-900',
    delete: 'bg-red-500 hover:bg-red-600 focus:ring-red-900',
    edit: 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-900',
    notification: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-900',
  };

  return (
    <div
      aria-hidden='true'
      className='bg-gray-500 bg-opacity-80 fixed z-50 inset-0'>
      <div className='relative p-4 max-w-md md:h-auto top-1/3 left-16 sm:left-1/4 sm:right-1/2 sm:top-1/4 lg:top-1/4 lg:left-1/3'>
        <div className='relative p-4 text-center rounded-lg shadow-xl shadow-black bg-gray-800 sm:p-5'>
          <div className='mb-5 text-xl'>{modalTitle}</div>
          <button
            type='button'
            className='text-gray-400 absolute top-2.5 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white'
            data-modal-toggle='deleteModal'
            onClick={actions.closeModal}>
            <svg
              aria-hidden='true'
              className='w-5 h-5'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'></path>
            </svg>
            <span className='sr-only'>Close modal</span>
          </button>

          <p className='mb-5 text-gray-300'>
            {modalMsg} <span className=' font-bold italic'>{refItem}</span> ?
          </p>
          <div className='flex justify-center items-center space-x-4'>
            <button
              data-modal-toggle='deleteModal'
              type='button'
              onClick={actions.closeModal}
              className='py-2 px-3 text-sm font-medium rounded-lg border focus:ring-4 focus:outline-none focus:ring-primary-300 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600'>
              Non, annuler
            </button>
            <button
              type='button'
              onClick={() => deleteItem(refItem)}
              className={`${colorVariants[modalCategory]} py-2 px-3 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none`}>
              Oui, j'en suis sûr(e)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletionModal;
