var assert = require('assert')

const { Store } = require('../../index');

module.exports = {
  storeStateIsChangedOnMergeState: function() {
    const store = new Store({value: 0}, () => {});

    store.mergeState({value: 10});

    assert.deepEqual(store.state, {value: 10});
  },

  storeStateIsAppendedToOnMergeState: function() {
    const store = new Store({a: 1}, () => {});

    store.mergeState({b: 2});

    assert.deepEqual(store.state, {a: 1, b: 2});
  },

  storeInvokesCallbackOnMergeState() {
    let wasCalled = false;

    const store = new Store({value: 10}, () => wasCalled = true);

    store.mergeState({});

    assert.ok(wasCalled, "Callback wasn't called ☹️");
  }
}

