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
      const { id } = el.dataset;
      const qty = el.querySelector('.qty');

      qty.value = store.state[id];
    });
  }

  quantitySelectors.forEach((container) => {
    const { id } = container.dataset;

    const qty = container.querySelector('.qty');
    const inc = container.querySelector('.inc');
    const dec = container.querySelector('.dec');

    qty.addEventListener('change', () => {
      myStore.mergeState({ [id]: withinRange(parseInt(qty.value, 10), qty) });
    });
    inc.addEventListener('click', () => {
      myStore.mergeState({ [id]: withinRange(parseInt(qty.value, 10) + 1, qty) });
    });
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
