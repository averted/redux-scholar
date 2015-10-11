import React from 'react';
import Winner from './winner';
import {connect} from 'react-redux';
import Vote from './vote';

export const Voting = React.createClass({
  render: function() {
    return <div>
      {this.props.winner ?
        <Winner ref="winner" winner={this.props.winner} /> :
        <Vote {...this.props} />}
    </div>;
  }
});

@connect((state) => ({
  pair: state.vote.pair,
  winner: state.winner,
}))
export class VotingContainer extends Voting { }


// WITHOUT DECORATORS:
// ==================
// export const Voting = React.createClass({
//   render: function() {
//     return <div>
//       {this.props.winner ?
//         <Winner ref="winner" winner={this.props.winner} /> :
//         <Vote {...this.props} />}
//     </div>;
//   }
// });
//
// function mapStateToProps(state) {
//   return {
//     pair: state.vote.pair,
//     winner: state.winner,
//   };
// }
//
// connect(mapStateToProps)(Voting);
//
// export const VotingContainer = connect(mapStateToProps)(Voting);
