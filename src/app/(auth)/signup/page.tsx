'use client';

import Link from 'next/link';
import { useAuthContext } from '../../../context/user/authContext';
import {
  AlertCategories,
  useAppContext,
} from '../../../context/app/appContext';
import Alert from '../../../components/Alert';
import { useState } from 'react';

type Data = {
  email: string;
  password: string;
  confirmPassword: string;
};

const initialCredentials = {
  email: '',
  password: '',
  confirmPassword: '',
};

const Signin = () => {
  const { registerUserWithEmail } = useAuthContext();
  const { state, actions } = useAppContext();
  const { displayAlert } = actions;
  const { showAlert } = state.alert;
  const [values, setValues] = useState<Data>(initialCredentials);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const clearForm = () => {
    setValues(initialCredentials);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { email, password, confirmPassword } = values;
    e.preventDefault();
    if (!email && !password && !confirmPassword) {
      displayAlert({
        category: AlertCategories.Error,
        msg: 'Please complete all fields',
      });
    } else if (password !== confirmPassword) {
      displayAlert({
        category: AlertCategories.Error,
        msg: 'Passwords do not match',
      });
    } else if (password.length < 6) {
      displayAlert({
        category: AlertCategories.Error,
        msg: 'Password must be at least 6 characters.',
      });
    } else {
      registerUserWithEmail(email, password);
      displayAlert({
        category: AlertCategories.Success,
        msg: 'Successfully registered',
      });
      clearForm();
    }
  };

  return (
    <section className=' bg-gray-900'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <h2 className='text-xl font-bold leading-tight tracking-tight md:text-2xl text-white mb-5'>
          Create a new account
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
                  value={values.email}
                  onChange={(e) => handleChange(e)}
                  className='sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                  placeholder='name@company.com'
                  required={true}
                />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-white'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  value={values.password}
                  onChange={(e) => handleChange(e)}
                  placeholder='••••••••'
                  className='border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                  required={true}
                />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-white'>
                  Confirm Password
                </label>
                <input
                  type='password'
                  name='confirmPassword'
                  value={values.confirmPassword}
                  onChange={(e) => handleChange(e)}
                  placeholder='••••••••'
                  className='border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                  required={true}
                />
              </div>
              <button
                type='submit'
                className='border border-white w-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800'>
                Create account
              </button>
              <p className='text-sm font-light text-gray-400'>
                Already have an account ? {}
                <Link
                  href='/signin'
                  className='font-medium hover:underline text-primary-500'>
                  Sign in
                </Link>
              </p>
            </form>
            {/* 
            <div className='px-6 sm:px-0 max-w-sm'>
              <button
                type='button'
                onClick={connectWithGoogle}
                className='text-white w-full bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-[#4285F4]/55 mr-2 mb-2'>
                <div className='flex w-full justify-center'>
                  <svg
                    className='mr-2 -ml-1 w-4 h-4'
                    aria-hidden='true'
                    focusable='false'
                    data-prefix='fab'
                    data-icon='google'
                    role='img'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 488 512'>
                    <path
                      fill='currentColor'
                      d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'></path>
                  </svg>
                  <span>Sign up with Google</span>
                </div>
              </button>
            </div>

            */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
