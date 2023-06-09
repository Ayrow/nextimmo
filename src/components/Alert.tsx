import { useAppContext } from '../context/app/appContext';

const Alert = () => {
  const { state } = useAppContext();
  const { alert } = state;

  const colorVariants = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-orange-500',
    notification: 'bg-blue-500',
  };

  return (
    <div
      className={` rounded ${
        colorVariants[alert.alertCategory]
      } text-white text-center p-2 m-4`}>
      {alert.alertText}
    </div>
  );
};
export default Alert;
