'use client';

import { useEffect, useState } from 'react';
import { useListingsContext } from '../../../context/listings/listingsContext';
import { ModalTypes, useAppContext } from '../../../context/app/appContext';
import ConfirmDeletionModal from '../../../components/modals/ConfirmDeletionModal';
import { UserFromDB } from '../../../context/user/authContext';

const Users = () => {
  const { deleteListing } = useListingsContext();
  const { state, actions } = useAppContext();
  const [allUsers, setAllUsers] = useState<UserFromDB[]>(null);
  const [userToEdit, setUserToEdit] = useState<UserFromDB>(null);
  const [userUpdated, setUserUpdated] = useState(false);

  const fetchAllUsers = async (role: string, signal: AbortSignal) => {
    try {
      const res = await fetch(`/api/allUsers?role=${role}`, {
        method: 'GET',
        signal: signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: UserFromDB[] = await res.json();
      setAllUsers(data);
    } catch (error) {
      // display error
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserToEdit({ ...userToEdit, [name]: value });
  };

  const editUser = (user: UserFromDB) => {
    actions.editItem(user._id);
    setUserToEdit(user);
  };

  const updateUser = async () => {
    try {
      const res = await fetch('/api/user', {
        method: 'PUT',
        body: JSON.stringify({ userToEdit }),
      });
      const data: UserFromDB = await res.json();
      if (data) {
        let userIndex = allUsers.findIndex((user) => user._id === data._id);
        allUsers[userIndex] = data;
        setAllUsers(allUsers);
      }
    } catch (error) {
      //display error
    }
    actions.stopEditingItem();
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchAllUsers('admin', signal);

    return () => {
      controller.abort();
      setUserUpdated(false);
      setAllUsers(null);
      setUserToEdit(null);
    };
  }, []);

  return (
    <div className='p-10 bg-gray-900 w-full relative'>
      {state.showModal && <ConfirmDeletionModal deleteItem={deleteListing} />}
      // Filter and sort section here
      <h2 className='text-center text-xl font-bold'>Manage Users</h2>
      <div className='flex flex-col gap-5 mt-10'>
        {allUsers &&
          allUsers?.map((user) => {
            const { email, username, role } = user;
            return (
              <div
                key={user.email}
                className='relative w-full border rounded-2xl flex flex-col lg:flex-row flex-wrap items-center justify-between gap-5 p-5'>
                {state.isEditing && userToEdit ? (
                  <>
                    <div className='flex gap-3'>
                      <label htmlFor=''>Utilisateur</label>
                      <input
                        type='text'
                        name='username'
                        onChange={handleChange}
                        value={userToEdit.username}
                        className='text-black'
                      />
                    </div>
                    <div className='flex gap-3'>
                      <label htmlFor=''>Email</label>
                      <input
                        type='text'
                        name='email'
                        onChange={handleChange}
                        value={userToEdit.email}
                        className='text-black'
                      />
                    </div>
                    <div className='flex gap-3 items-center text-black'>
                      <label className='text-white'>Rôle</label>
                      <select
                        name='role'
                        onChange={handleChange}
                        value={userToEdit.role}
                        className=''>
                        <option value='user'>Utilisateur</option>
                        <option value='agent'>Agent</option>
                        <option value='admin'>Admin</option>
                      </select>
                    </div>
                    <div className='flex flex-wrap gap-5'>
                      <button
                        type='button'
                        onClick={actions.stopEditingItem}
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
                    <p className=''>
                      Utilisateur: <span className='font-bold'>{username}</span>
                    </p>
                    <p className=''>
                      email: <span className='font-bold'>{email}</span>
                    </p>
                    <p className=''>
                      role: <span className='font-bold'>{role}</span>
                    </p>
                    <div className='flex flex-wrap gap-5'>
                      <button
                        type='button'
                        onClick={() => editUser(user)}
                        className='border rounded-xl py-2 px-5 border-orange-500 shadow-orange-500 shadow-md'>
                        Modifier
                      </button>
                      <button
                        type='button'
                        onClick={() =>
                          actions.displayModal({
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
    </div>
  );
};

export default Users;
