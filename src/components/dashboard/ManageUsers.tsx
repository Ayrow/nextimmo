'use client';

import { ModalTypes } from '../../context/app/appContext';
import { UserFromDB } from '../../context/user/authContext';

const ManageUsers = ({
  allUsers,
  isEditing,
  userToEdit,
  handleUserChange,
  stopEditingItem,
  displayModal,
  editUser,
  updateUser,
}) => {
  return (
    <div className='flex flex-col gap-5 mt-10'>
      {allUsers &&
        allUsers?.map((user: UserFromDB) => {
          const { email, username, role, _id } = user;
          return (
            <div
              key={user.email}
              className='relative w-full border rounded-2xl flex flex-col lg:grid lg:grid-cols-7 items-center gap-5 p-5'>
              {isEditing && userToEdit._id === _id ? (
                <>
                  <div className='flex flex-nowrap gap-3 col-span-2'>
                    <label htmlFor='' className='lg:hidden'>
                      Utilisateur
                    </label>
                    <input
                      type='text'
                      name='username'
                      onChange={handleUserChange}
                      value={userToEdit.username}
                      className='text-black pl-2 rounded-lg'
                    />
                  </div>
                  <div className='flex gap-3 col-span-2'>
                    <label htmlFor='' className='lg:hidden'>
                      Email
                    </label>
                    <input
                      type='text'
                      name='email'
                      onChange={handleUserChange}
                      value={userToEdit.email}
                      className='text-black pl-2 rounded-lg '
                    />
                  </div>
                  <div className='relative flex gap-2 text-gray-700 col-span-1'>
                    <label className='text-white lg:hidden'>Rôle</label>
                    <select
                      name='role'
                      onChange={handleUserChange}
                      value={userToEdit.role}
                      className='border text-sm rounded-lg block w-full pr-10 p-2.5'>
                      <option value='user'>Utilisateur</option>
                      <option value='agent'>Agent</option>
                      <option value='admin'>Admin</option>
                    </select>
                  </div>
                  <div className='flex flex-wrap gap-5 col-span-2'>
                    <button
                      type='button'
                      onClick={stopEditingItem}
                      className='border rounded-xl py-2 px-5 border-gray-500 shadow-gray-500 shadow-md'>
                      Annuler
                    </button>
                    <button
                      type='button'
                      onClick={updateUser}
                      className='border rounded-xl py-2 px-5 border-green-500 shadow-green-500 shadow-md'>
                      Enregister
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className=' col-span-2'>
                    <span className='lg:hidden'> Utilisateur:</span>{' '}
                    <span className='font-bold'>{username}</span>
                  </p>
                  <p className='col-span-2'>
                    <span className='lg:hidden'> Email:</span>{' '}
                    <span className='font-bold'>{email}</span>
                  </p>
                  <p className='col-span-1'>
                    <span className='lg:hidden'> Rôle:</span>{' '}
                    <span className='font-bold capitalize'>
                      {role === 'user' ? 'Utilisateur' : `${role}`}
                    </span>
                  </p>
                  <div className='flex flex-wrap gap-5 col-span-2'>
                    <button
                      type='button'
                      onClick={() => editUser(user)}
                      className='border rounded-xl py-2 px-5 border-orange-500 shadow-orange-500 shadow-md'>
                      Modifier
                    </button>
                    <button
                      type='button'
                      onClick={() =>
                        displayModal({
                          modalMsg: `Êtes-vous sûr(e) de vouloir supprimer l'utilisateur`,
                          modalTitle: "Suppression d'utilisateur",
                          modalType: ModalTypes.Delete,
                          refItem: `${username}`,
                        })
                      }
                      className='border rounded-xl py-2 px-5 border-red-500 shadow-red-500 shadow-md'>
                      Supprimer
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default ManageUsers;
