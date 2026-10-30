import { Component } from 'react';
import holbertonLogo from '../assets/holberton-logo.jpg';
import newContext from '../Context/context';

class Header extends Component {
  static contextType = newContext;

  handleLogOut = (event) => {
    event.preventDefault();
    this.context.logOut();
  };

  render() {
    const { user } = this.context;

    return (
      <>
        <div className="App-header flex items-center gap-4 p-5 max-[912px]:flex-col max-[912px]:text-center max-[912px]:gap-2 max-[912px]:pt-2 max-[912px]:pb-10">
          <img src={holbertonLogo} alt="holberton logo" className="w-[200px] max-[912px]:w-60" />
          <h1 className="text-(--main-color) text-4xl font-bold">School Dashboard</h1>
        </div>
        {user.isLoggedIn && (
          <section id="logoutSection" className="px-5 mb-4">
            Welcome <b>{user.email}</b> (
            <a href="#" onClick={this.handleLogOut} className="italic cursor-pointer">
              logout
            </a>
            )
          </section>
        )}
      </>
    );
  }
}

export default Header;
