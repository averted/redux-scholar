import clone from 'lodash/lang/clone';
import extend from 'lodash/object/extend';
import includes from 'lodash/collection/includes';

function setState(state, newState) {
  return clone(extend(state, newState));
}

function vote(state, entry) {
  const currentPair = state.vote ? state.vote.pair : null;

  if (currentPair && includes(currentPair, entry)) {
    state.hasVoted = entry;
  }
  return state;
}

function resetVote(state) {
  const hasVoted = state.hasVoted;
  const currentPair = state.vote ? state.vote.pair : [];

  if (hasVoted && !includes(currentPair, hasVoted)) {
    delete state.hasVoted;
    delete state.vote.score;
  }

  return state;
}

export default function(state = {}, action) {
  switch (action.type) {
  case 'SET_STATE':
    return resetVote(setState(state, action.state));
  case 'VOTE':
    return vote(state, action.entry);
  }
  return state;
}
