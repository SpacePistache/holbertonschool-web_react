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

  if (html) {
    const content = typeof html === 'string' ? { __html: html } : html;
    return (
      <li
        data-notification-type={type}
        className={colorClass}
        dangerouslySetInnerHTML={content}
        onClick={() => markAsRead(id)}
      />
    );
  }

  return (
    <li
      data-notification-type={type}
      className={colorClass}
      onClick={() => markAsRead(id)}
    >
      {value}
    </li>
  );
  }
}

export default NotificationItem;
