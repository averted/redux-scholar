import React from 'react';
import {connect} from 'react-redux';
import Winner from './winner';
import Vote from './vote';
import * as actionCreators from '../action_creators';

export class Voting extends React.Component {
  render() {
    return <div>
      {this.props.winner ?
        <Winner ref="winner" winner={this.props.winner} /> :
        <Vote {...this.props} />}
    </div>;
  }
}

@connect((state) => {
  return {
    pair: state.vote ? state.vote.pair : [],
    hasVoted: state.hasVoted,
    winner: state.winner,
  }
}, actionCreators)
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
//     pair: state.vote ? state.vote.pair : [],
//     hasVoted: state.hasVoted,
//     winner: state.winner,
//   };
// }
//
// export const VotingContainer = connect(
//   mapStateToProps,
//   actionCreators
// )(Voting);
