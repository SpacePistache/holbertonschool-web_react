import WithLogging from '../HOC/WithLogging';

function Login() {
  return (
    <div className="App-body border-t-[3px] border-(--main-color) px-6 py-4 min-h-[40vh] max-[912px]:min-h-[419px] max-[912px]:px-1 max-[912px]:pt-5 max-[912px]:mt-0.5">
      <p className="mb-4 max-[912px]:text-xl max-[912px]:mb-8">Login to access the full dashboard</p>
      <div className="flex items-center gap-2 max-[912px]:flex-col max-[912px]:items-start max-[912px]:gap-0 max-[912px]:text-lg">
        <label htmlFor="email">Email</label>
        <input className="border border-gray-400 rounded-sm px-1 max-[912px]:w-[60%] max-[912px]:mb-1 max-[912px]:border-gray-600 max-[912px]:rounded-md" type="email" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input className="border border-gray-400 rounded-sm px-1 max-[912px]:w-[60%] max-[912px]:mb-1 max-[912px]:border-gray-600 max-[912px]:rounded-md" type="password" id="password" name="password" />
        <button className="border border-gray-400 rounded-sm px-1 max-[912px]:border-gray-600 max-[912px]:rounded-md max-[912px]:mt-0.5" type="button">OK</button>
      </div>
    </div>
  );
}

export default WithLogging(Login);
