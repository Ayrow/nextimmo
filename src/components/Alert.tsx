import { useAppContext } from '../context/app/appContext';

const Alert = () => {
  const { state } = useAppContext();
  const { alertText, alertType } = state;

  const colorVariants = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-orange-500',
    notification: 'bg-blue-500',
  };

  return (
    <div
      className={` rounded ${colorVariants[alertType]} text-white text-center p-2 m-4`}>
      {alertText}
    </div>
  );
};
export default Alert;
