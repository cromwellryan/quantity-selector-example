var assert = require('assert')

const { Store, init } = require('../../index');

module.exports = {
  updatesStoreWhenAComponentIsChanged() {
    let valueThatCanChange = 1;
    const selectorA = {
      id() { return 'a' },
      value() { return valueThatCanChange; },
      range() { return {min: 1, max: 5 } },
      setValue() {},
      setQuantity() {},
    }

    const selectorB = {
      id() { return 'b' },
      value() { return 1; },
      range() { return {min: 1, max: 5 } },
      setValue() {},
      setQuantity() {},
    }

    const store = new Store({a: 0, b: 0}, () => {});

    init([selectorA, selectorB], store);

    // Act
    valueThatCanChange = 4;
    selectorA.onChange();

    assert.equal(store.state['a'], '4');
  }
}

