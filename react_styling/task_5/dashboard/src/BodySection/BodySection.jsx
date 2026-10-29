import { Component } from 'react';

class BodySection extends Component {
  render() {
    const { title, children } = this.props;

    return (
      <div className="bodySection">
        <h2 className="font-bold mb-1 max-[912px]:mb-0 max-[912px]:text-xl">{title}</h2>
        {children}
      </div>
    );
  }
}

export default BodySection;
