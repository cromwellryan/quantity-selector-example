const assert = require('assert');

const { withinRange } = require('../../index');

module.exports = {
  returnsMinWhenValueIsLess() {
    const range = { min: 2, max: 5 };

    const result = withinRange(1, range);

    assert.equal(2, result);
  },

  returnsMaxWhenValueIsGreater() {
    const range = { min: 2, max: 5 };

    const result = withinRange(9, range);

    assert.equal(5, result);
  },

  returnsValueWhenValueIsWithinRange() {
    const range = { min: 2, max: 5 };

    const result = withinRange(3, range);

    assert.equal(3, result);
  },
}
