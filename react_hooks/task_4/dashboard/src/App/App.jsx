import { useState, useCallback, useMemo, useEffect } from 'react';
import axios from 'axios';
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

function App() {
  const [displayDrawer, setDisplayDrawer] = useState(true);
  const [user, setUser] = useState({ ...defaultUser });
  const [notifications, setNotifications] = useState([]);
  const [courses, setCourses] = useState([]);

  const handleDisplayDrawer = useCallback(() => {
    setDisplayDrawer(true);
  }, []);

  const handleHideDrawer = useCallback(() => {
    setDisplayDrawer(false);
  }, []);

  const logIn = useCallback((email, password) => {
    setUser({ email, password, isLoggedIn: true });
  }, []);

  const logOut = useCallback(() => {
    setUser({ ...defaultUser });
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  useEffect(() => {
    let ignore = false;

    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5173/notifications.json');
        if (ignore) return;
        const list = Array.isArray(response.data) ? response.data : response.data.notifications;
        const data = list.map((notification) =>
          notification.html
            ? { ...notification, html: { __html: getLatestNotification() } }
            : notification
        );
        setNotifications(data);
      } catch (error) {
        if (!ignore) console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!user.isLoggedIn) return;

    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5173/courses.json');
        const list = Array.isArray(response.data) ? response.data : response.data.courses;
        setCourses(list);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [user]);

  const contextValue = useMemo(() => ({ user, logOut }), [user, logOut]);

  return (
    <newContext.Provider value={contextValue}>
      <div className="App relative min-h-screen flex flex-col px-3">
        <div className="root-notifications max-[912px]:absolute max-[912px]:top-0 max-[912px]:inset-x-3">
          <Notifications
            notifications={notifications}
            displayDrawer={displayDrawer}
            handleDisplayDrawer={handleDisplayDrawer}
            handleHideDrawer={handleHideDrawer}
            markNotificationAsRead={markNotificationAsRead}
          />
        </div>
        <Header />
        {user.isLoggedIn ? (
          <BodySectionWithMarginBottom title="Course list">
            <CourseList courses={courses} />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title="Log in to continue">
            <Login logIn={logIn} email={user.email} password={user.password} />
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

export default App;
