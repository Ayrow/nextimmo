'user client';

// import { FaHeart, FaSuitcase, FaUserEdit, FaChalkboard } from 'react-icons/fa';

const userLinks = [
  {
    id: 1,
    label: 'account',
    path: '/account',
    segmentTarget: 'account',
    //  icon: <FaChalkboard />,
  },
  {
    id: 2,
    label: 'saved listings',
    path: '/saved-listings',
    segmentTarget: 'saved-listings',
    //  icon: <FaUserEdit />,
  },
];

const agentLinks = [
  {
    id: 1,
    label: 'dashboard',
    path: '/dashboard',
    segmentTarget: 'dashboard',
    //  icon: <FaChalkboard />,
  },
  {
    id: 2,
    label: 'add listing',
    path: '/add-listing',
    segmentTarget: 'add-listing',
    //  icon: <FaSuitcase />,
  },
  {
    id: 3,
    label: 'manage listings',
    path: '/manage-listings',
    segmentTarget: 'manage-listings',
    //  icon: <FaSuitcase />,
  },
];

const adminLinks = [
  {
    id: 1,
    label: 'dashboard',
    path: '/dashboard',
    //  icon: <FaChalkboard />,
  },
  {
    id: 2,
    label: 'account',
    path: '/account',
    //  icon: <FaUserEdit />,
  },
  {
    id: 3,
    label: 'users',
    path: '/users',
    //  icon: <FaSuitcase />,
  },
  {
    id: 4,
    label: 'agents',
    path: '/agents',
    // icon: <FaHeart />,
  },
  {
    id: 5,
    label: 'add listing',
    path: '/add-listings',
    //  icon: <FaSuitcase />,
  },
  {
    id: 6,
    label: 'manage listings',
    path: '/manage-listings',
    //  icon: <FaSuitcase />,
  },
];

export { userLinks, agentLinks, adminLinks };
