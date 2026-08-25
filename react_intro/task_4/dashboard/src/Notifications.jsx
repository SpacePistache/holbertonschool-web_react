import './Notifications.css';
import closeIcon from './assets/close-button.png';
import { getLatestNotification } from './utils';

function Notifications() {
  return (
    <div className="notification-items">
      <p>Here is the list of notifications</p>
      <ul>
        <li data-priority="default">New course available</li>
        <li data-priority="urgent">New resume available</li>
        <li
          data-priority="urgent"
          dangerouslySetInnerHTML={{ __html: getLatestNotification() }}
        />
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
