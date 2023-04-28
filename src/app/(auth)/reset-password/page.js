'use client';

import Link from 'next/link';
import Image from 'next/image';
import Alert from '@/components/Alert';
import { useUserContext } from '@/context/user/userContext';
import { useAppContext } from '@/context/app/appContext';

const Signin = () => {
  const { handleChange, email, sendPasswordReset } = useUserContext();
  const { displayAlert, showAlert } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      sendPasswordReset(email);
      displayAlert({
        type: 'success',
        msg: 'Reset password email has been sent',
      });
    } else {
      displayAlert({ type: 'error', msg: 'Email is missing' });
    }
  };

  return (
    <section className=' bg-gray-900'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <h2 className='text-xl font-bold leading-tight tracking-tight md:text-2xl text-white mb-5'>
          Reset password
        </h2>
        <div className='w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700'>
          {showAlert && <Alert />}
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
              <div>
                <label className='block mb-2 text-sm font-medium text-white'>
                  Your email
                </label>
                <input
                  type='email'
                  name='email'
                  value={email}
                  onChange={(e) => handleChange(e)}
                  className='sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                  placeholder='name@company.com'
                  require='true'
                />
              </div>
              <button
                type='submit'
                className='border border-white w-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800'>
                Send password reset email
              </button>
              <p className='text-sm font-light text-gray-400'>
                Don't have an account yet? {}
                <Link
                  href='/signup'
                  className='font-medium hover:underline text-primary-500'>
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
