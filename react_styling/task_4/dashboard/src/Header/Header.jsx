import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <div className="App-header flex items-center gap-4 p-5 max-[912px]:flex-col max-[912px]:text-center">
      <img src={holbertonLogo} alt="holberton logo" className="w-[200px] max-[520px]:w-[150px]" />
      <h1 className="text-(--main-color) text-4xl font-bold max-[520px]:text-3xl">School Dashboard</h1>
    </div>
  );
}

export default Header;
