import React from 'react';
import Winner from './winner';

export default React.createClass({
  getPair: function() {
    return this.props.pair || [];
  },
  getVotes: function(entry) {
    if (this.props.score && this.props.score[entry]) {
      return this.props.score[entry];
    }
    return 0;
  },
  render: function() {
    return this.props.winner ?
      <Winner ref="winner" winner={this.props.winner} /> :
      <div className="results">
        <div className="tally">
          {this.getPair().map(entry =>
            <div key={entry} className="entry">
              <h1>{entry}</h1>
              <div className="voteCount">
                {this.getVotes(entry)}
              </div>
            </div>
          )}
        </div>
        <div className="management">
          <button ref="next"
                   className="next"
                   onClick={this.props.next}>
            Next
          </button>
        </div>
      </div>;
  }
});
