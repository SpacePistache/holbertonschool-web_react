import { PureComponent } from "react";

class NotificationItem extends PureComponent {

  static defaultProps = {
    type: 'default',  
  };

  render() {

    const { type, html, value, id, markAsRead } = this.props;
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
}

export default NotificationItem;
