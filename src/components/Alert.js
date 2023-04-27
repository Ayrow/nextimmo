import { useState } from 'react';
import { useAppContext } from '../context/app/appContext';

const Alert = () => {
  const { alertType, alertText } = useAppContext();

  return (
    <div className={` rounded ${alertType} text-white text-center p-2 m-4`}>
      {alertText}
    </div>
  );
};
export default Alert;
