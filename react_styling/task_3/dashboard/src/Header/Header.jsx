import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <div className="App-header flex items-center gap-4 p-5">
      <img src={holbertonLogo} alt="holberton logo" classname="w-[200px]"/>
      <h1 classname="text(--main-color) text-4xl font-bold">School dashboard</h1>
    </div>
  );
}

export default Header;
