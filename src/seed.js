import { List, Map } from 'immutable';
import union from 'lodash/array/union';

function getWinners(vote) {
  if (!vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if      (aVotes > bVotes)  return [a];
  else if (aVotes < bVotes)  return [b];
  else                       return [a, b];
}

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

export function vote(state, entry) {
  return state.updateIn(
    ['vote', 'tally', entry],
    0,
    tally => tally + 1
  );
}
