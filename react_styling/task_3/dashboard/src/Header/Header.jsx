import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <div className="App-header flex items-center gap-4 p-5">
      <img src={holbertonLogo} alt="holberton logo" className="w-[200px]"/>
      <h1 className="text(--main-color) text-4xl font-bold">School dashboard</h1>
    </div>
  );
}

export default Header;
