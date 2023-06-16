'use client';
import { useState } from 'react';
import { UserFromDB, useAuthContext } from '../../../context/user/authContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {
  ModalCategories,
  useAppContext,
} from '../../../context/app/appContext';

import PasswordVerificationAccountModal from '../../../components/modals/PasswordVerificationModal';
import NotificationModal from '../../../components/modals/NotificationModal';
import { useRouter } from 'next/navigation';

const Page = () => {
  const { user, updateCurrentUser, updateAccount, deleteAccount } =
    useAuthContext();
  const router = useRouter();
  const { state, actions } = useAppContext();
  const initialState = {
    username: user?.username,
    email: user?.email,
    password: '',
  };

  const [value, setValue] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const saveSettings = (e) => {
    const { email, password, username } = value;
    e.preventDefault();

    if (
      (!email || user.email === email) &&
      !password &&
      (!username || user.username === username)
    ) {
      // missing new email or new password so display alert
      alert('nothing to update');
    } else if ((!email || user.email === email) && password) {
      //email is empty, email not changed and new password given so update password
      actions.displayModal({
        modalMsg: 'Souhaitez-vous mettre à jour votre mot de passe',
        modalTitle: 'Mise à jour du mot de passe',
        modalCategory: ModalCategories.Edit,
      });
    } else if (!password && user.email !== email && !email) {
      // new password is missing and new email given so update email
      actions.displayModal({
        modalMsg: 'Souhaitez-vous mettre à jour votre email de connexion',
        modalTitle: "Mise à jour de l'email",
        modalCategory: ModalCategories.Edit,
      });
    } else {
      // update both email address and password
      actions.displayModal({
        modalMsg: 'Souhaitez-vous mettre à jour votre email et mot de passe',
        modalTitle: 'Mise à jour du compte',
        modalCategory: ModalCategories.Edit,
      });
    }
  };

  if (user && user.role === 'user') {
    return (
      <div className='relative bg-sky-950'>
        {state.modal.showModal &&
          (state.modal.modalCategory === ModalCategories.Edit ||
            state.modal.modalCategory === ModalCategories.Delete) && (
            <PasswordVerificationAccountModal
              needPasswordVerification={true}
              newEmail={value.email}
              newPassword={value.password}
              newUsername={value.username}
            />
          )}
        {state.modal.showModal &&
          state.modal.modalCategory !== ModalCategories.Edit &&
          state.modal.modalCategory !== ModalCategories.Delete && (
            <NotificationModal />
          )}
        <div className='p-7'>
          <div className='mt-10 sm:mt-0'>
            <div className='md:grid md:grid-cols-3 md:gap-6'>
              <div className='md:col-span-1 flex flex-col'>
                <div className='px-4 sm:px-0'>
                  <h3 className='text-lg font-medium leading-6 '>
                    Paramètres du compte
                  </h3>
                  <p className='mt-1 text-sm'>Gérez vos identifiants ici.</p>
                </div>
              </div>

              <div className='mt-5 md:col-span-2 md:mt-0'>
                <form onSubmit={saveSettings}>
                  <div className='overflow-hidden shadow rounded-md'>
                    <div className='bg-gray-900 px-4 py-5 sm:p-6'>
                      <div className='grid grid-cols-6 gap-6'>
                        <div className='col-span-6 sm:col-span-4'>
                          <label
                            htmlFor='username'
                            className='block text-sm font-medium text-gray-100'>
                            Nom d'utilisateur
                          </label>
                          <div className='mt-1 flex rounded-md shadow-sm '>
                            <input
                              type='text'
                              name='username'
                              id='username'
                              value={value.username}
                              onChange={handleChange}
                              className='relative block w-full px-4 py-2 mt-2 text-orange-700 bg-white border rounded-md focus:border-orange-400 focus:ring-orange-300 focus:outline-none focus:ring focus:ring-opacity-40'
                              placeholder={value.username}
                            />
                          </div>
                        </div>

                        <div className='col-span-6 sm:col-span-4'>
                          <label
                            htmlFor='email-address'
                            className='block text-sm font-medium text-gray-100'>
                            Adresse email
                          </label>
                          <input
                            type='text'
                            name='email'
                            id='email'
                            autoComplete='off'
                            value={value.email}
                            onChange={handleChange}
                            className='relative block w-full px-4 py-2 mt-2 text-orange-700 bg-white border rounded-md focus:border-orange-400 focus:ring-orange-300 focus:outline-none focus:ring focus:ring-opacity-40'
                          />
                        </div>

                        <div className='col-span-6 sm:col-span-4'>
                          <label
                            htmlFor='password'
                            className='block text-sm font-medium text-gray-100'>
                            Nouveau mot de passe
                          </label>
                          <div className='flex relative '>
                            <input
                              type={showPassword ? 'text' : 'password'}
                              id='password'
                              autoComplete='new-password'
                              onChange={handleChange}
                              value={value.password}
                              className='relative block w-full px-4 py-2 mt-2 text-orange-700 bg-white border rounded-md focus:border-orange-400 focus:ring-orange-300 focus:outline-none focus:ring focus:ring-opacity-40'
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

                        <div className='col-span-6 sm:col-span-4'>
                          <label
                            htmlFor='delete-account'
                            className='block text-sm font-medium text-gray-100'>
                            Supprimer mon compte et mes données
                          </label>
                          <button
                            type='button'
                            onClick={() =>
                              actions.displayModal({
                                modalMsg:
                                  'Êtes-vous sûr(e) de vouloir supprimer votre compte',
                                modalTitle: 'Suppression du compte',
                                modalCategory: ModalCategories.Delete,
                              })
                            }
                            className=' mt-1 block justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'>
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='bg-gray-800 px-4 py-3 text-right sm:px-6 flex justify-end gap-2'>
                      <button
                        type='submit'
                        disabled={
                          (!value.email || user.email === value.email) &&
                          !value.password &&
                          (!value.username || value.username === user.username)
                        }
                        className='inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Page;
