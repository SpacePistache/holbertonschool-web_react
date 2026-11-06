import { memo } from "react";

const mobileClasses = 'max-[912px]:text-lg max-[912px]:p-2 max-[912px]:border-b max-[912px]:border-black';

const NotificationItem = memo(function NotificationItem({
  type = 'default',
  html,
  value,
  id,
  markAsRead = () => {},
}) {
  const colorClass =
    type === 'urgent'
      ? 'text-[var(--urgent-notification-item)]'
      : 'text-[var(--default-notification-item)]';

    if (html) {
    const content = typeof html === 'string' ? { __html: html } : html;
    return (
      <li
        data-notification-type={type}
        className={`${colorClass} ${mobileClasses}`}
        dangerouslySetInnerHTML={content}
        onClick={() => markAsRead(id)}
      />
    );
  }

  return (
    <li
      data-notification-type={type}
      className={`${colorClass} ${mobileClasses}`}
      onClick={() => markAsRead(id)}
    >
      {value}
    </li>
  );
});


export default NotificationItem;
