import merge from 'lodash/object/merge';

function setState(state, newState) {
  return merge(state, newState);
}

export default function(state = {}, action) {
  switch (action.type) {
  case 'SET_STATE':
    return setState(state, action.state);
  }
  return state;
}
