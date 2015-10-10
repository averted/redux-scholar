import React from 'react';

export default React.createClass({
  render() {
    return <div className="winner">
      Winner is {this.props.winner}!
    </div>;
  }
});
