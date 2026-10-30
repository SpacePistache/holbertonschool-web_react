import { Component } from 'react';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import newContext from '../Context/context';

const defaultUser = {
  email: '',
  password: '',
  isLoggedIn: false,
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayDrawer: false,
      user: { ...defaultUser },
      logOut: this.logOut,
    };
  }

  logIn = (email, password) => {
    this.setState({user: { email, password, isLoggedIn: true },});
  };

  logOut = () => {
    this.setState({user: { ...defaultUser } });
  }

  handleDisplayDrawer = () => {
    this.setState({ displayDrawer: true });
  };

  handleHideDrawer = () => {
    this.setState({ displayDrawer: false });
  };

  handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      this.logOut();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {

    const { user, displayDrawer } = this.state;


    const notificationsList = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
    ];

    const coursesList = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];

    return (
      <newContext.Provider value={this.state}>
        <div className="App relative min-h-screen flex flex-col px-3">
          <div className="root-notifications max-[912px]:absolute max-[912px]:top-0 max-[912px]:inset-x-3">
            <Notifications notifications={notificationsList}
              displayDrawer={displayDrawer}
              handleDisplayDrawer={this.handleDisplayDrawer}
              handleHideDrawer={this.handleHideDrawer}
            />
          </div>
          <Header />
            {user.isLoggedIn ? (
              <BodySectionWithMarginBottom title="Course list">
                <CourseList courses={coursesList} />
              </BodySectionWithMarginBottom>
            ) : (
                <BodySectionWithMarginBottom title="Log in to continue">
                  <Login logIn={this.logIn} email={user.email} password={user.password} />
                </BodySectionWithMarginBottom>
              )}
          <BodySection title="News from the School">
            <p>ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, asperiores architecto blanditiis fuga doloribus sit illum aliquid ea distinctio minus accusantium, impedit quo voluptatibus ut magni dicta. Recusandae, quia dicta?</p>
          </BodySection>
          <Footer />
        </div>
      </newContext.Provider>
    );
  }
}

export default App;
