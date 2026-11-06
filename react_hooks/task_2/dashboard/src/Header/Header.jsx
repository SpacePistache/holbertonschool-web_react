import { useContext } from 'react';
import holbertonLogo from '../assets/holberton-logo.jpg';
import newContext from '../Context/context';

function Header() {
  const { user, logOut } = useContext(newContext);

  const handleLogOut = (event) => {
    event.preventDefault();
    logOut();
  };

  return (
    <>
      <div className="App-header flex items-center gap-4 p-5 max-[912px]:flex-col max-[912px]:text-center max-[912px]:gap-2 max-[912px]:pt-2 max-[912px]:pb-10">
        <img src={holbertonLogo} alt="holberton logo" className="w-50 max-[912px]:w-60" />
        <h1 className="text-(--main-color) text-4xl font-bold">School Dashboard</h1>
      </div>
      {user.isLoggedIn && (
        <section id="logoutSection" className="px-5 mb-4">
          Welcome <b>{user.email}</b> (
          <a href="#" onClick={handleLogOut} className="italic cursor-pointer">
            logout
          </a>
          )
        </section>
      )}
    </>
  );
}

export default Header;
