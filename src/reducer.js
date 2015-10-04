import { setEntries, next, vote, INITIAL_STATE } from './seed';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT':
      return next(state);
    case 'VOTE':
      state.vote = vote(state.vote, action.entry);
      return state;
  }
  return state;
}
