import {expect} from 'chai';
import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles SET_STATE', () => {
    const initialState = {};
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          score: {Trainspotting: 1},
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.deep.equal({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        score: {Trainspotting: 1}
      }
    });
  });

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = {};
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          score: {Trainspotting: 1}
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.deep.equal({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        score: {Trainspotting: 1}
      }
    });
  });

  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          score: {Trainspotting: 1}
        }
      }
    };
    const nextState = reducer(undefined, action);

    expect(nextState).to.deep.equal({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        score: {Trainspotting: 1}
      }
    });
  });

});
