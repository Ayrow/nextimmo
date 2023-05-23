'use client';

import { useAuthContext } from '../../../context/user/authContext';

const Account = () => {
  const { user } = useAuthContext();

  if (!user) {
    return <div>You need to be logged in to view this page</div>;
  } else {
    return (
      <div className='relative bg-gray-900 p-20'>
        <h2 className='text-center text-xl'>Account details</h2>
        <form action='#' className='mt-5'>
          <div className='overflow-hidden shadow rounded-md border'>
            <div className='px-4 py-5 sm:p-6 bg-gray-800'>
              <div className='grid grid-cols-6 gap-6'>
                <div className='col-span-6 sm:col-span-4'>
                  <label
                    htmlFor='email-address'
                    className='block text-sm font-medium'>
                    Email address
                  </label>
                  <input
                    type='text'
                    name='email'
                    id='email'
                    autoComplete='off'
                    placeholder={user.email}
                    className='relative block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </div>

                <div className='col-span-6 sm:col-span-4'>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium'>
                    New Password
                  </label>
                  <div className='flex relative '>
                    <input
                      required
                      type='password'
                      id='password'
                      autoComplete='new-password'
                      className='relative block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                      name='password'
                    />
                    <div className='absolute inset-y-0 right-0 flex items-center'>
                      <button
                        type='button'
                        className=' pr-4 text-black text-xl'>
                        show
                      </button>
                    </div>
                  </div>
                </div>
                <div className='col-span-6 sm:col-span-4'>
                  <label
                    htmlFor='delete-account'
                    className='block text-sm font-medium '>
                    Delete my account and all my data
                  </label>
                  <button
                    type='button'
                    className=' mt-1 block justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'>
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <div className=' bg-sky-950 px-4 py-3 text-right sm:px-6 flex justify-end gap-2'>
              <button
                type='submit'
                className='inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default Account;
