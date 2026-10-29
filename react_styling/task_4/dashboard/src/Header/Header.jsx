import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <div className="App-header flex items-center gap-4 p-5 max-[912px]:flex-col max-[912px]:text-center max-[912px]:gap-2 max-[912px]:pt-2 max-[912px]:pb-10">
      <img src={holbertonLogo} alt="holberton logo" className="w-[200px] max-[912px]:w-60" />
      <h1 className="text-(--main-color) text-4xl font-bold">School Dashboard</h1>
    </div>
  );
}

export default Header;
