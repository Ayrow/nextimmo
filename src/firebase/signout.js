import { auth } from './config';

const logout = () => {
  signOut(auth);
};

export default logout;
