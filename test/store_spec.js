import {expect} from 'chai';

import makeStore from '../src/store';

describe('store', () => {
  it('is a Redux store configured with the correct reducer', () => {
    const store = makeStore();
    expect(store.getState()).to.deep.equal({});

    store.dispatch({
      type: 'SET_ENTRIES',
      entries: ['Trainspotting', '28 Days Later'],
    });

    expect(store.getState()).to.deep.equal({
      entries: ['Trainspotting', '28 Days Later']
    });
  });
});
