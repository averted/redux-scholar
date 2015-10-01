import { expect, should } from 'chai';

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
      state[field] = value;
      return state;
    }

    it('is not immutable', () => {
      let state = { id: 42, name: 'Immutable' };
      let nextState = addField(state, 'field', 'value');

      expect(nextState.id).to.equal(42);
      expect(nextState['field']).to.be.a('string');
      expect(state['field']).to.be.a('string');
    });
  });
});
