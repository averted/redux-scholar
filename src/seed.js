import union from 'lodash/array/union';

function getWinner(vote) {
  if (!vote) return [];

  const [a, b] = vote.pair;
  const aVotes = vote.score[a];
  const bVotes = vote.score[b];

  if (aVotes > bVotes) {
    return [a];
  } else if (bVotes > aVotes) {
    return [b];
  } else {
    return [a, b];
  }
}

export const INITIAL_STATE = {};

export function setEntries(state, entries) {
  state.entries = entries;
  return state;
}

export function next(state) {
  const entries = union(state.entries, getWinner(state.vote));

  if (entries.length === 1) {
    return {
      winner: entries[0],
    }
  }

  let vote = {
    pair: entries.slice(0, 2),
  };

  return {
    ...state,
    entries: entries.slice(2, entries.length),
    vote: vote,
  };
}

export function vote(voteState, entry) {
  voteState.score = {...voteState.score};
  voteState.score[entry] = (voteState.score[entry] || 0) + 1
  return voteState;
}
