import React from 'react';

const pair = ['Trainspotting', '28 Days Later'];
const score = {'Trainspotting': 5, '28 Days Later': 4};

export default React.createClass({
  render: function() {
    return React.cloneElement(this.props.children, {
      pair: pair,
      score: score,
    });
  }
});
