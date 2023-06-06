'use client';

import { useEffect, useRef, useState } from 'react';
import { ModalTypes, useAppContext } from '../../context/app/appContext';
import { UserFromDB } from '../../context/user/authContext';
import ConfirmDeletionModal from '../modals/ConfirmDeletionModal';
import FiltersUsers from '../filters/FiltersUsers';
import {
  EventTargetType,
  HandleInputChangeType,
} from '../../../types/functionTypes';
import PageBtnContainer from '../buttons/PageBtnContainer';

const initialUserFilter = {
  username: '',
  email: '',
  role: '',
  sort: 'A-Z',
  page: 1,
};

const sortOptions = ['A-Z', 'Z-A', 'plus récent', 'plus ancient'];

const Users = ({ userRole }: { userRole: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { state, actions } = useAppContext();
  const [allUsers, setAllUsers] = useState<UserFromDB[]>(null);
  const [userToEdit, setUserToEdit] = useState<UserFromDB>(null);
  const [valuesQueries, setValuesQueries] = useState(initialUserFilter);
  const [isSortingDropdownOpen, setIsSortingDropdownOpen] = useState(false);
  const [totalPages, setTotalPages] = useState<number>(null);
  const [totalNumberUsers, setTotalNumberUsers] = useState<number>(null);

  const fetchAllUsers = async (signal: AbortSignal) => {
    const searchParams = new URLSearchParams();
    Object.entries(valuesQueries).forEach(([key, value]) => {
      if (value) {
        searchParams.append(key, String(value));
      }
    });
    const queryParams = searchParams.toString();

    try {
      const res = await fetch(`/api/allUsers?${queryParams}`, {
        method: 'GET',
        signal: signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const {
        allUsers,
        totalUsersFound,
        numOfPages,
      }: {
        allUsers: UserFromDB[];
        totalUsersFound: number;
        numOfPages: number;
      } = await res.json();
      setAllUsers(allUsers);
      setTotalNumberUsers(totalUsersFound);
      setTotalPages(numOfPages);
    } catch (error) {
      // display error
    }
  };

  const handleUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserToEdit({ ...userToEdit, [name]: value });
  };

  const handleFilterChange: HandleInputChangeType = (e) => {
    const { name, value } = e.target as EventTargetType;
    if (name === 'resetAll') {
      setValuesQueries((prevValues) => ({
        ...prevValues,
        sort: '',
        email: '',
        username: '',
      }));
    } else {
      setValuesQueries((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
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
        headers: {
          'Content-Type': 'application/json',
        },
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

  const deleteUser = async (user: UserFromDB) => {
    try {
      await fetch(`/api/user?id=${user._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      allUsers.filter((singleUser) => singleUser._id !== user._id);
    } catch (error) {
      // display error
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchUsers = async (): Promise<void> => {
      await fetchAllUsers(signal);
    };

    const debounceFetchUsers = (): void => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(fetchUsers, 200); // Adjust the delay as needed
    };

    debounceFetchUsers();

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [valuesQueries]);

  return (
    <div className='p-10 bg-gray-900 w-full relative'>
      {state.showModal && <ConfirmDeletionModal deleteItem={deleteUser} />}
      <h2 className='text-center text-xl font-bold'>Manage Users</h2>
      <FiltersUsers
        valuesQueries={valuesQueries}
        handleFilterChange={handleFilterChange}
        isSortingDropdownOpen={isSortingDropdownOpen}
        setIsSortingDropdownOpen={setIsSortingDropdownOpen}
        sortOptions={sortOptions}
      />
      <div className='flex gap-10 items-center'>
        <p className='font-bold ml-10'>
          {totalNumberUsers}{' '}
          {totalNumberUsers > 1 ? 'utilisateurs trouvés' : 'utilisateur trouvé'}
        </p>
        <div className='hidden relative md:grid' ref={ref}>
          <button
            className='border capitalize rounded-xl px-2 py-1 w-40 flex gap-5 justify-around'
            onClick={() => setIsSortingDropdownOpen(!isSortingDropdownOpen)}>
            {valuesQueries.sort} {isSortingDropdownOpen ? '⇑' : '⇓'}
          </button>
          {isSortingDropdownOpen && (
            <div className='absolute border rounded-md left-0 mt-10 z-50 bg-sky-950 flex flex-col items-start pl-2 gap-2 w-full'>
              {sortOptions.map((sort, index) => {
                return (
                  <button
                    key={index}
                    className='capitalize'
                    name='sort'
                    value={sort}
                    onClick={handleFilterChange}>
                    {sort}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
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
                        onChange={handleUserChange}
                        value={userToEdit.username}
                        className='text-black pl-2 rounded-lg'
                      />
                    </div>
                    <div className='flex gap-3'>
                      <label htmlFor=''>Email</label>
                      <input
                        type='text'
                        name='email'
                        onChange={handleUserChange}
                        value={userToEdit.email}
                        className='text-black pl-2 rounded-lg '
                      />
                    </div>
                    <div className='relative flex gap-2 text-gray-700'>
                      <label className='text-white'>Rôle</label>
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
                      role:{' '}
                      <span className='font-bold'>
                        {role === 'user' ? 'Utilisateur' : `${role}`}
                      </span>
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
      {totalPages > 0 && (
        <PageBtnContainer
          numOfPages={totalPages}
          page={valuesQueries.page}
          handleInputChange={handleFilterChange}
        />
      )}
    </div>
  );
};

export default Users;
