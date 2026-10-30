import { PureComponent } from "react";

class NotificationItem extends PureComponent {

  static defaultProps = {
    type: 'default',
    markAsRead: () => {},  
  };

  render() {
  const { type, html, value, id, markAsRead } = this.props;
  const colorClass =
    type === 'urgent'
      ? 'text-[var(--urgent-notification-item)]'
      : 'text-[var(--default-notification-item)]';
  const mobileClass = 'max-[912px]:text-lg max-[912px]:p-2 max-[912px]:border-b max-[912px]:border-black';

  if (html) {
    const content = typeof html === 'string' ? { __html: html } : html;
    return (
      <li
        data-notification-type={type}
        className={`${colorClass} ${mobileClass}`}
        dangerouslySetInnerHTML={content}
        onClick={() => markAsRead(id)}
      />
    );
  }

  return (
    <li
      data-notification-type={type}
      className={`${colorClass} ${mobileClass}`}
      onClick={() => markAsRead(id)}
    >
      {value}
    </li>
  );
  }
}

export default NotificationItem;
