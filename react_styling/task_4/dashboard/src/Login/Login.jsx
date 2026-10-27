import WithLogging from '../HOC/WithLogging';

function Login() {
  return (
    <div className="flex items-center gap-2 max-[912px]:flex-col max-[912px]:items-start">
      <p className="mb-4">Login to access the full dashboard</p>
      <label className="flex items-center gap-2" htmlFor="email">Email: </label>
      <input className="border border-gray-400 rounded-sm px-1 max-[912px]:w-[60%]" type="email" id="email" name="email" />
      <label htmlFor="password">Password: </label>
      <input className="border border-gray-400 rounded-sm px-1 max-[912px]:w-[60%]" type="password" id="password" name="password" />
      <button className="border border-gray-400 rounded-sm px-1" type="button">OK</button>
    </div>
  );
}

export default WithLogging(Login);
