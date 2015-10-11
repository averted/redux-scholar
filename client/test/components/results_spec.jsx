import React from 'react/addons';
import ReactDOM from 'react-dom';
import {Results} from '../../src/components/results';
import {expect} from 'chai';

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate,
} = React.addons.TestUtils;

describe('Results', () => {
  it('renders entries with vote counts or zero', () => {
    const pair = ['Trainspotting', '28 Days Later'];
    const score = {'Trainspotting': 5};
    const component = renderIntoDocument(
      <Results pair={pair} score={score} />
    );
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [train, days] = entries.map(e => e.textContent);

    expect(entries.length).to.equal(2);
    expect(train).to.contain('Trainspotting');
    expect(train).to.contain('5');
    expect(days).to.contain('28 Days Later');
    expect(days).to.contain('0');
  });

  it('invokes the next callback when next button is clicked', () => {
    let nextInvoked = false;
    const next = () => nextInvoked = true;

    const pair = ['Trainspotting', '28 Days Later'];
    const component = renderIntoDocument(
      <Results pair={pair}
               score={{}}
               next={next}/>
    );
    Simulate.click(ReactDOM.findDOMNode(component.refs.next));

    expect(nextInvoked).to.equal(true);
  });


  it('renders the winner when there is one', () => {
    const component = renderIntoDocument(
      <Results winner="Trainspotting"
               pair={["Trainspotting", "28 Days Later"]}
               score={{}} />
    );
    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Trainspotting');
  });
});
