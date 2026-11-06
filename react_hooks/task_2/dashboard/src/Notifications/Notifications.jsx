import { PureComponent } from 'react';
import closeIcon from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

class Notifications extends PureComponent {
  
  static defaultProps = {
    displayDrawer: false,
    notifications: [],
    handleDisplayDrawer: () => {},
    handleHideDrawer: () => {},
    markNotificationAsRead: () => {},
  };

  

  render() {
    
    const { displayDrawer, notifications, handleDisplayDrawer, handleHideDrawer, markNotificationAsRead } = this.props;
    const shouldBounce = notifications.length > 0 && !displayDrawer;

    return (
      <>
        <div onClick={handleDisplayDrawer} className={`menuItem notification-title text-right px-2.5 py-1 max-[912px]:px-3 
          ${shouldBounce ? 'animate-bounce' : ''}`}>Your notifications</div>

        {displayDrawer && (
          <div className="Notifications absolute right-2.5 top-[30px] w-1/4 bg-white p-1.5 
            border-2 border-dashed border-(--main-color) 
            max-[912px]:fixed max-[912px]:inset-0 max-[912px]:w-full 
            max-[912px]:h-screen max-[912px]:p-3 max-[912px]:z-50">
            {notifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <>
                <p>Here is the list of notifications</p>
                <ul className="list-[square] pl-8 my-1 max-[912px]:list-none max-[912px]:pl-0">
                  {notifications.map(({ id, type, html, value }) => (
                    <NotificationItem
                      key={id}
                      id={id}
                      type={type}
                      html={html}
                      value={value}
                      markAsRead={markNotificationAsRead}
                    />
                  ))}
                </ul>
                <button
                  type="button"
                  aria-label="Close"
                  style={{
                    position: 'absolute',
                    right: '20px',
                    top: '20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => {console.log('Close button has been clicked'); handleHideDrawer();}}
                >
                  <img src={closeIcon} alt="close icon" width="15" height="15" />
                </button>
              </>
            )}
          </div>
        )}
      </>
    );
  }
}

export default Notifications;
