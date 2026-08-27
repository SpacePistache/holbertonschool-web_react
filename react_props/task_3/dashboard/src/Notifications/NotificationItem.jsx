function NotificationItem({ type = 'default', html, value }) {
  const style = { color: type === 'urgent' ? 'red' : 'blue' };

  if (html) {
    const content = typeof html === 'string' ? { __html: html } : html;
    return (
      <li
        data-notification-type={type}
        style={style}
        dangerouslySetInnerHTML={content}
      />
    );
  }

  return (
    <li data-notification-type={type} style={style}>
      {value}
    </li>
  );
}

export default NotificationItem;
