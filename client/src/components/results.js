import React from 'react';
import {connect} from 'react-redux';
import Winner from './winner';
import * as actionCreators from '../action_creators';

export class Results extends React.Component {
  getPair() {
    return this.props.pair || [];
  }

  getVotes(entry) {
    if (this.props.score && this.props.score[entry]) {
      return this.props.score[entry];
    }
    return 0;
  }

  render() {
    return this.props.winner ?
      <Winner ref="winner" winner={this.props.winner} /> :
      <div className="results">
        <div className="score">
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
          <button ref="next" className="next" onClick={this.props.next}>Next</button>
        </div>
      </div>;
  }
}

@connect((state) => {
  return {
    pair: state.vote ? state.vote.pair : null,
    score: state.vote ? state.vote.score : null,
    winner: state.winner,
  }
}, actionCreators)
export class ResultsContainer extends Results { }

// WITHOUT DECORATORS:
// ==================
// export const Results = React.createClass({
//   getPair: function() {
//     return this.props.pair || [];
//   },
//   getVotes: function(entry) {
//     if (this.props.score && this.props.score[entry]) {
//       return this.props.score[entry];
//     }
//     return 0;
//   },
//   render: function() {
//     return this.props.winner ?
//       <Winner ref="winner" winner={this.props.winner} /> :
//       <div className="results">
//         <div className="score">
//           {this.getPair().map(entry =>
//             <div key={entry} className="entry">
//               <h1>{entry}</h1>
//               <div className="voteCount">
//                 {this.getVotes(entry)}
//               </div>
//             </div>
//           )}
//         </div>
//         <div className="management">
//           <button ref="next"
//                    className="next"
//                    onClick={this.props.next}>
//             Next
//           </button>
//         </div>
//       </div>;
//   }
// });
//
// function mapStateToProps(state) {
//   return {
//     pair: state.vote.pair,
//     score: state.vote.score,
//     winner: state.winner,
//   }
// }
//
// export const ResultsContainer = connect(mapStateToProps)(Results);
