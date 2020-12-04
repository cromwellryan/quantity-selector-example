function Store(initialState = {}, callback) {
  this.state = initialState;
  this.mergeState = function mergeState(partialState) {
    Object.assign(this.state, partialState);
    callback(this);
  };
}

function withinRange(value, range) {
  if (value >= range.max) return range.max
  if (value <= range.min) return range.min
  return value;
}

function init(quantitySelectors) {
  const myStore = new Store({ a: 2, b: 4 }, syncAllSelectors);

  function syncAllSelectors(store) {
    quantitySelectors.forEach((el) => {
      /* Need to know the id of the quantity selector */
      const { id } = el.dataset;
      const qty = el.querySelector('.qty');

      /* Need to set the quantity value it should be at */
      qty.value = store.state[id];
    });
  }

  quantitySelectors.forEach((container) => {
    const { id } = container.dataset;

    const qty = container.querySelector('.qty');
    const inc = container.querySelector('.inc');
    const dec = container.querySelector('.dec');

    /* Need to know when the quantity selector is changed */
    qty.addEventListener('change', () => {
      myStore.mergeState({ [id]: withinRange(parseInt(qty.value, 10), qty) });
    });
    /* Need to know when the quantity selector is incremented */
    inc.addEventListener('click', () => {
      myStore.mergeState({ [id]: withinRange(parseInt(qty.value, 10) + 1, qty) });
    });
    /* Need to know when the quantity selector is decremented */
    dec.addEventListener('click', () => {
      myStore.mergeState({ [id]: withinRange(parseInt(qty.value, 10) - 1, qty) });
    });
  });

  syncAllSelectors(myStore);
}

export {
  Store,
  withinRange,
  init
}
