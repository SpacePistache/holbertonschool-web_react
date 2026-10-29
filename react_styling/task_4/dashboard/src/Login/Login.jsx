import WithLogging from '../HOC/WithLogging';

function Login() {
  return (
    <div className="App-body border-t-[3px] border-(--main-color) px-6 py-4 min-h-[40vh] max-[912px]:px-1">
      <p className="mb-4 max-[912px]:text-xl">Login to access the full dashboard</p>
      <div className="flex items-center gap-2 max-[912px]:flex-col max-[912px]:items-start">
        <label htmlFor="email">Email: </label>
        <input className="border border-gray-400 rounded-sm px-1 max-[912px]:w-[60%]" type="email" id="email" name="email" />
        <label htmlFor="password">Password: </label>
        <input className="border border-gray-400 rounded-sm px-1 max-[912px]:w-[60%]" type="password" id="password" name="password" />
        <button className="border border-gray-400 rounded-sm px-1" type="button">OK</button>
      </div>
    </div>
  );
}

export default WithLogging(Login);
