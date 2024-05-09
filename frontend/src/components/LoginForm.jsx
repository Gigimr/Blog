import PropTypes from 'prop-types';

const LoginForm = ({
  username,
  password,
  handleLogin,
  setUsername,
  setPassword,
}) => (
  <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to application
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username" className="block  text-sm font-medium leading-6 text-gray-900">
            Username
            </label>
            <div className=" flex mt-2 block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <input
                id='username'
                type="text"
                autoComplete="username"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
                className="mx-2 border-0  w-full"
              />
            </div>
          </div>

          <div  className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
            </label>
            <div className=" flex mt-2 block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <input
                id='password'
                type="password"
                autoComplete="current-password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
                className="mx-2 border-0  w-full"
              />
            </div>
          </div>

          <button id="login-button"
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        login
          </button>
        </form>
      </div>
    </div>
  </>
);
LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
};
export default LoginForm;
