import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/seed';

describe('application logic', () => {
  describe('setEntries', () => {
    it('adds the entries to the state', () => {
      const state = {};
      const entries = ['Trainspotting', '28 Days Later'];
      const nextState = setEntries(state, entries);

      expect(nextState).to.deep.equal({
        entries: ['Trainspotting', '28 Days Later'],
      });
    });
  });

  describe('next', () => {
    it('takes the next two entries under vote', () => {
      const state = {
        entries: ['Trainspotting', '28 days later', 'Sunshine' ]
      };
      const nextState = next(state);

      expect(nextState).to.deep.equal({
        vote: {
          pair: ['Trainspotting', '28 days later' ]
        },
        entries: ['Sunshine' ],
      });
    });

    it('puts winner of current vote back to entries', () => {
      const state = {
        vote: {
          pair: ['Trainspotting', '28 days later'],
          score: {
            'Trainspotting': 4,
            '28 days later': 2
          },
        },
        entries: ['Sunshine', 'Millions', '127 Hours'],
      };
      const nextState = next(state);

      expect(nextState).to.deep.equal({
        vote: {
          pair: ['Sunshine', 'Millions'],
        },
        entries: ['127 Hours', 'Trainspotting'],
      });
    });

    it('puts both from tied vote back to entries', () => {
      const state = {
        vote: {
          pair: ['Trainspotting', '28 days later'],
          score: {
            'Trainspotting': 3,
            '28 days later': 3,
          },
        },
        entries: ['Sunshine', 'Millions', '127 Hours'],
      };
      const nextState = next(state);

      expect(nextState).to.deep.equal({
        vote: {
          pair: ['Sunshine', 'Millions']
        },
        entries: ['127 Hours', 'Trainspotting', '28 days later']
      });
    });

    it('marks winner when just one entry left', () => {
      const state = {
        vote: {
          pair: ['Trainspotting', '28 days later'],
          score: {
            'Trainspotting': 2,
            '28 days later': 4,
          },
        },
        entries: [],
      };
      const nextState = next(state);

      expect(nextState).to.deep.equal({
        winner: '28 days later'
      });
    });
  });

  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later')
        }),
        entries: List()
      });
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 1
          })
        }),
        entries: List()
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 3,
            '28 Days Later': 2
          })
        }),
        entries: List()
      });
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 4,
            '28 Days Later': 2
          })
        }),
        entries: List()
      }));
    });
  });
});
