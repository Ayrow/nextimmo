'use client';

import { useEffect, useRef, useState } from 'react';
import ManageUsers from '../../../components/dashboard/ManageUsers';
import ConfirmDeletionModal from '../../../components/modals/ConfirmDeletionModal';
import { useAppContext } from '../../../context/app/appContext';
import { UserFromDB } from '../../../context/user/authContext';
import FiltersUsers from '../../../components/filters/FiltersUsers';
import { useCloseOnOutsideClick } from '../../../hooks/useCloseOnOutsideClick';
import {
  EventTargetType,
  HandleInputChangeType,
} from '../../../../types/functionTypes';
import PageBtnContainer from '../../../components/buttons/PageBtnContainer';

const initialUserFilter = {
  username: '',
  email: '',
  role: '',
  sort: 'A-Z',
  page: 1,
};

const sortOptions = ['A-Z', 'Z-A', 'plus récent', 'plus ancien'];

const Utilisateurs = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { state, actions } = useAppContext();
  const [allUsers, setAllUsers] = useState<UserFromDB[]>(null);
  const [userToEdit, setUserToEdit] = useState<UserFromDB>(null);
  const [valuesQueries, setValuesQueries] = useState(initialUserFilter);
  const [isSortingDropdownOpen, setIsSortingDropdownOpen] = useState(false);
  const [totalPages, setTotalPages] = useState<number>(null);
  const [totalNumberUsers, setTotalNumberUsers] = useState<number>(null);

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

  const closeSortingDropdown = () => {
    setIsSortingDropdownOpen(false);
  };

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
        email: '',
        username: '',
        role: '',
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

  useCloseOnOutsideClick(closeSortingDropdown, ref);

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
      <ManageUsers
        allUsers={allUsers}
        isEditing={state.isEditing}
        userToEdit={userToEdit}
        handleUserChange={handleUserChange}
        stopEditingItem={actions.stopEditingItem}
        displayModal={actions.displayModal}
        editUser={editUser}
        updateUser={updateUser}
      />

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

export default Utilisateurs;
