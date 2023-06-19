import { FaBan, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { ModalCategories, useAppContext } from '../../context/app/appContext';

const NotificationModal = () => {
  const { state, actions } = useAppContext();
  const { modalCategory, modalMsg, modalTitle } = state.modal;

  const colorVariants = {
    success: 'text-green-500',
    error: 'text-red-500',
    delete: 'text-red-500',
    edit: 'text-orange-500',
    notification: 'text-blue-500',
  };

  return (
    <div
      id='successModal'
      tabIndex={-1}
      aria-hidden='true'
      className='bg-black bg-opacity-60 overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full'>
      <div className='relative p-4 w-full max-w-md h-full md:h-auto'>
        <div className='relative p-4 text-center rounded-lg shadow bg-gray-800 sm:p-5'>
          <button
            type='button'
            onClick={actions.closeModal}
            className='text-gray-400 absolute top-2.5 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white'
            data-modal-toggle='successModal'>
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

          <div className='w-12 h-12 rounded-full p-2 flex items-center justify-center mx-auto mb-3.5'>
            {modalCategory === ModalCategories.Success && (
              <FaCheckCircle className='text-center text-3xl flex justify-center my-5 text-green-500' />
            )}
            {modalCategory === ModalCategories.Error && (
              <FaBan className='text-center text-3xl flex justify-center my-5 text-red-500' />
            )}

            {modalCategory === ModalCategories.Notification && (
              <FaExclamationCircle className='text-center text-3xl flex justify-center my-5 text-blue-500' />
            )}
            <span className='sr-only'>{modalTitle}</span>
          </div>
          <p className='mb-4 text-lg font-semibold text-white'>{modalMsg}</p>
          <button
            data-modal-toggle='successModal'
            type='button'
            onClick={actions.closeModal}
            className='border py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 focus:ring-primary-900'>
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
