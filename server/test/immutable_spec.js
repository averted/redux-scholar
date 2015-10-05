import { expect, should } from 'chai';
import { List, Map } from 'immutable';

describe('immutability', () => {
  describe('a number', () => {
    function increment(state) {
      return state + 1;
    }

    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });

  describe('an object', () => {
    function addField(state, field, value) {
      return state.set(field, value);
    }

    it('is not immutable', () => {
      let state = Map({ id: 42, name: 'Immutable' });
      let nextState = addField(state, 'field', 'value');

      expect(nextState.get('id')).to.equal(42);
      expect(nextState.get('field')).to.be.a('string');
      expect(state.get('field')).to.be.undefined;
    });
  });
});
