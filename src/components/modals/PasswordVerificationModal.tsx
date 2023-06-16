'use client';

import { FaEye, FaEyeSlash, FaTrash } from 'react-icons/fa';
import { ModalCategories, useAppContext } from '../../context/app/appContext';
import { useState } from 'react';
import { useAuthContext } from '../../context/user/authContext';

const PasswordVerificationAccountModal = ({
  needPasswordVerification,
  newEmail,
  newPassword,
  newUsername,
}) => {
  const { state, actions } = useAppContext();
  const { updateAccount, deleteAccount } = useAuthContext();
  const { modalCategory, modalMsg, modalTitle, refItem } = state.modal;

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const colorVariants = {
    success: 'bg-green-500 hover:bg-green-600 focus:ring-green-900',
    delete: 'bg-red-500 hover:bg-red-600 focus:ring-red-900',
    edit: 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-900',
    notification: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-900',
  };

  let cancelText = 'Annuler';
  let confirmationText = 'Confirmer';

  return (
    <div
      aria-hidden='true'
      className='bg-gray-500 bg-opacity-80 fixed z-50 inset-0'>
      <div className='relative p-4 max-w-md md:h-auto top-1/3 left-16 sm:left-1/4 sm:right-1/2 sm:top-1/4 lg:top-1/4 lg:left-1/3'>
        <div className='relative p-4 text-center rounded-lg shadow-xl shadow-black bg-gray-800 sm:p-5'>
          <FaTrash className='text-center text-3xl flex justify-center my-5' />
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

          {needPasswordVerification && (
            <div className='flex flex-col mt-4 mb-4'>
              <label className='block text-sm font-semibold text-white'>
                Veuillez entrer mot de passe actuel pour vérification.
              </label>
              <div className='flex relative '>
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  autoComplete='new-password'
                  className=' relative block w-full px-4 py-2 mt-2 text-orange-700 bg-white border rounded-md focus:border-orange-400 focus:ring-orange-300 focus:outline-none focus:ring focus:ring-opacity-40 '
                  name='password'
                />
                <div className='absolute inset-y-0 right-0 flex items-center'>
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className=' pr-4 text-black text-xl'>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className='flex justify-center items-center space-x-4'>
            <button
              data-modal-toggle='deleteModal'
              type='button'
              onClick={actions.closeModal}
              className='py-2 px-3 text-sm font-medium rounded-lg border focus:ring-4 focus:outline-none focus:ring-primary-300 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600'>
              {cancelText}
            </button>

            {modalCategory === ModalCategories.Delete ? (
              <button
                type='button'
                onClick={() => deleteAccount(password)}
                className={`${colorVariants[modalCategory]} py-2 px-3 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none`}>
                Supprimer
              </button>
            ) : (
              <button
                type='button'
                onClick={() =>
                  updateAccount(newEmail, password, newPassword, newUsername)
                }
                className={`${colorVariants[modalCategory]} py-2 px-3 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none`}>
                Mettre à jour
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordVerificationAccountModal;
