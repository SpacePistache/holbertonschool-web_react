import { useReducer, useCallback, useEffect } from 'react';
import axios from 'axios';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import { appReducer, initialState, APP_ACTIONS } from './appReducer';

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { displayDrawer, user, notifications, courses } = state;

  const handleDisplayDrawer = useCallback(() => {
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER });
  }, []);

  const handleHideDrawer = useCallback(() => {
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER });
  }, []);

  const logIn = useCallback((email, password) => {
    dispatch({ type: APP_ACTIONS.LOGIN, payload: { email, password } });
  }, []);

  const logOut = useCallback(() => {
    dispatch({ type: APP_ACTIONS.LOGOUT });
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    dispatch({ type: APP_ACTIONS.MARK_NOTIFICATION_READ, payload: id });
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
        dispatch({ type: APP_ACTIONS.SET_NOTIFICATIONS, payload: data });
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
        dispatch({ type: APP_ACTIONS.SET_COURSES, payload: list });
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [user]);

  return (
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
      <Header user={user} logOut={logOut} />
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
      <Footer user={user} />
    </div>
  );
}

export default App;
