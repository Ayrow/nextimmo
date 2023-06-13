'use client';

import { useEffect, useRef, useState } from 'react';
import ManageUsers from '../../../components/dashboard/ManageUsers';
import ActionModal from '../../../components/modals/ActionModal';
import {
  ModalCategories,
  useAppContext,
} from '../../../context/app/appContext';
import { UserFromDB } from '../../../context/user/authContext';
import FiltersUsers from '../../../components/filters/FiltersUsers';
import { useCloseOnOutsideClick } from '../../../hooks/useCloseOnOutsideClick';
import {
  EventTargetType,
  HandleInputChangeType,
} from '../../../../types/functionTypes';
import PageBtnContainer from '../../../components/buttons/PageBtnContainer';
import DropdownButtons from '../../../components/buttons/DropdownButtons';
import NotificationModal from '../../../components/modals/NotificationModal';

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
  const [newUserData, setNewUserData] = useState<UserFromDB>(null);
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
      actions.displayModal({
        modalTitle: 'Succès',
        modalCategory: ModalCategories.Success,
        modalMsg: `L'utilisateur ${user.username} a été supprimé avec succès`,
      });
    } catch (error) {
      actions.displayModal({
        modalTitle: 'Erreur',
        modalCategory: ModalCategories.Error,
        modalMsg:
          "Erreur pour la suppression de l'utilisateur, veuillez réessayer ultérieurement.",
      });
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
      actions.displayModal({
        modalTitle: 'Erreur',
        modalCategory: ModalCategories.Error,
        modalMsg:
          'Erreur dans la récupération des utilisateurs, veuillez réessayer ultérieurement.',
      });
    }
  };

  const handleUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewUserData({ ...newUserData, [name]: value });
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
    setNewUserData(user);
  };

  const updateUser = async () => {
    try {
      const res = await fetch(`/api/user?userId=${newUserData._id}`, {
        method: 'PATCH',
        body: JSON.stringify({ newUserData }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data: UserFromDB = await res.json();
      if (data) {
        let userIndex = allUsers.findIndex((user) => user._id === data._id);
        allUsers[userIndex] = data;
        setAllUsers(allUsers);
        actions.displayModal({
          modalTitle: 'Succès',
          modalCategory: ModalCategories.Success,
          modalMsg: `L'utilisateur ${data.username} a été mis à jour.`,
        });
      }
    } catch (error) {
      actions.displayModal({
        modalTitle: 'Erreur',
        modalCategory: ModalCategories.Error,
        modalMsg:
          "Erreur pour modifier l'utilisateur, veuillez réessayer ultérieurement.",
      });
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
    <div className='p-10 bg-gray-900 w-full'>
      {state.modal.showModal &&
        state.modal.modalCategory === ModalCategories.Delete && <ActionModal />}

      {state.modal.showModal &&
        state.modal.modalCategory !== ModalCategories.Error &&
        state.modal.modalCategory !== ModalCategories.Delete && (
          <NotificationModal />
        )}
      <h2 className='text-center text-xl font-bold'>Manage Users</h2>
      <div className='flex items-center md:flex-col gap-5 md:gap-1 md:items-center justify-center'>
        <FiltersUsers
          valuesQueries={valuesQueries}
          handleFilterChange={handleFilterChange}
          sortOptions={sortOptions}
        />
        <DropdownButtons
          displayName={`tri: ${valuesQueries.sort}`}
          name='sort'
          handleFilterChange={handleFilterChange}
          options={sortOptions}
        />
      </div>

      <p className='font-bold text-center my-5'>
        {totalNumberUsers}{' '}
        {totalNumberUsers > 1 ? 'utilisateurs trouvés' : 'utilisateur trouvé'}
      </p>
      <ManageUsers
        allUsers={allUsers}
        isEditing={state.isEditing}
        newUserData={newUserData}
        handleUserChange={handleUserChange}
        stopEditingItem={actions.stopEditingItem}
        displayModal={actions.displayModal}
        editUser={editUser}
        updateUser={updateUser}
        deleteUser={deleteUser}
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
