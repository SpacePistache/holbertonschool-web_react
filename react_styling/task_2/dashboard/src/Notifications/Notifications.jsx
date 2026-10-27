import { Component } from 'react';
import closeIcon from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

class Notifications extends Component {
  static defaultProps = {
    displayDrawer: false,
    notifications: [],
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.notifications.length !== this.props.notifications.length;
  }

  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
  };

  render() {
    const { displayDrawer, notifications } = this.props;

    return (
      <>
        <div className="menuItem text-right">Your notifications</div>

        {displayDrawer && (
          <div className="Notifications relative ml-auto w-full lg:w-1/4 p-1.5 border-2 border-dashed border-(--main-color)">
            {notifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <>
                <p>Here is the list of notifications</p>
                <ul className="list-[square] pl-8">
                  {notifications.map(({ id, type, html, value }) => (
                    <NotificationItem
                      key={id}
                      id={id}
                      type={type}
                      html={html}
                      value={value}
                      markAsRead={this.markAsRead}
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
                  onClick={() => console.log('Close button has been clicked')}
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
