// import { FaHeart, FaSuitcase, FaUserEdit, FaChalkboard } from 'react-icons/fa';

export type LinksTypes = {
  id: number;
  label: string;
  path: string;
};

const userLinks: LinksTypes[] = [
  {
    id: 1,
    label: 'Compte',
    path: '/compte',
    //  icon: <FaChalkboard />,
  },
  {
    id: 2,
    label: 'Favoris',
    path: '/favoris',
    //  icon: <FaUserEdit />,
  },
];

const agentLinks: LinksTypes[] = [
  {
    id: 1,
    label: 'Tableau de Bord',
    path: '/dashboard',
    //  icon: <FaChalkboard />,
  },
  {
    id: 2,
    label: 'Ajouter Annonce',
    path: '/dashboard/ajouter-annonce',
    //  icon: <FaSuitcase />,
  },
  {
    id: 3,
    label: 'Modifier Annonces',
    path: '/dashboard/modifier-annonces',
    //  icon: <FaSuitcase />,
  },
];

const adminLinks: LinksTypes[] = [
  {
    id: 1,
    label: 'Tableau de Bord',
    path: 'dashboard',
    //  icon: <FaChalkboard />,
  },
  {
    id: 2,
    label: 'Compte',
    path: 'dashboard/compte',
    //  icon: <FaUserEdit />,
  },
  {
    id: 3,
    label: 'Utilisateurs',
    path: 'dashboard/utilisateurs',
    //  icon: <FaSuitcase />,
  },
  {
    id: 4,
    label: 'Agents',
    path: 'dashboard/agents',
    // icon: <FaHeart />,
  },
  {
    id: 5,
    label: 'Ajouter Annonce',
    path: 'dashboard/ajouter-annonce',
    //  icon: <FaSuitcase />,
  },
  {
    id: 6,
    label: 'Modifier Annonces',
    path: 'dashboard/modifier-annonces',
    //  icon: <FaSuitcase />,
  },
];

export { userLinks, agentLinks, adminLinks };
