import './Notifications.css';
import closeIcon from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

function Notifications({ notifications = [] }) {
  return (
    <div className="notification-items">
      <p>Here is the list of notifications</p>
      <ul>
        {notifications.map(({ id, type, html, value }) => (
          <NotificationItem key={id} type={type} html={html} value={value} />
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
    </div>
  );
}

export default Notifications;
