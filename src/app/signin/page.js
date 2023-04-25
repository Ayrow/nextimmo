import Link from 'next/link';
import Image from 'next/image';

const Signin = () => {
  return (
    <section class=' bg-gray-900'>
      <div class='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <h2 class='text-xl font-bold leading-tight tracking-tight md:text-2xl text-white mb-5'>
          Sign in to your account
        </h2>
        <div class='w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700'>
          <div class='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <form class='space-y-4 md:space-y-6' action='#'>
              <div>
                <label
                  for='email'
                  class='block mb-2 text-sm font-medium text-white'>
                  Your email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  class='sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                  placeholder='name@company.com'
                  require='true'
                />
              </div>
              <div>
                <label
                  for='password'
                  class='block mb-2 text-sm font-medium text-white'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  class='border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                  require='true'
                />
              </div>
              <div class='flex items-center justify-between'>
                <div class='flex items-start'>
                  <div class='flex items-center h-5'>
                    <input
                      id='remember'
                      aria-describedby='remember'
                      type='checkbox'
                      class='w-4 h-4 border rounded focus:ring-3 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800'
                      require='false'
                    />
                  </div>
                  <div class='ml-3 text-sm'>
                    <label for='remember' class=' text-gray-300'>
                      Remember me
                    </label>
                  </div>
                </div>
                <Link
                  href='#'
                  class='text-sm font-medium hover:underline text-primary-500'>
                  Forgot password?
                </Link>
              </div>
              <button
                type='submit'
                class='w-full  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800'>
                Sign in
              </button>
              <p class='text-sm font-light text-gray-400'>
                Don’t have an account yet? {}
                <Link
                  href='#'
                  class='font-medium hover:underline text-primary-500'>
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
