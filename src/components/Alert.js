import { useAppContext } from '../context/app/appContext';

const Alert = () => {
  const { alertType, alertText } = useAppContext();
  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};
export default Alert;
