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

function SelectorComponent(el) {
  this.el = el;

  this.id = function() {
    return el.dataset.id;
  }

  this.range = function() {
    const qty = this.el.querySelector('.qty');

    return { min: qty.min, max: qty.max };
  }

  this.setQuantity = function(newQuantity) {
    const qty = this.el.querySelector('.qty');
    qty.value = newQuantity;
  }

}

function init(quantitySelectors) {
  const myStore = new Store({ a: 2, b: 4 }, syncAllSelectors);

  function syncAllSelectors(store) {
    quantitySelectors.forEach((el) => {
      const selectorComponent = new SelectorComponent(el);

      /* Need to know the id of the quantity selector */
      const id = selectorComponent.id();

      /* Need to set the quantity value it should be at */
      selectorComponent.setQuantity(store.state[id]);
    });
  }

  quantitySelectors.forEach((container) => {
    const selectorComponent = new SelectorComponent(container);

    const id = selectorComponent.id();

    const qty = container.querySelector('.qty');
    const inc = container.querySelector('.inc');
    const dec = container.querySelector('.dec');

    /* Need to know the quantity selector range */
    const range = selectorComponent.range();

    /* Need to know when the quantity selector is changed */
    qty.addEventListener('change', () => {
      myStore.mergeState({ [id]: withinRange(parseInt(qty.value, 10), range) });
    });
    /* Need to know when the quantity selector is incremented */
    inc.addEventListener('click', () => {
      myStore.mergeState({ [id]: withinRange(parseInt(qty.value, 10) + 1, range) });
    });
    /* Need to know when the quantity selector is decremented */
    dec.addEventListener('click', () => {
      myStore.mergeState({ [id]: withinRange(parseInt(qty.value, 10) - 1, range) });
    });
  });

  syncAllSelectors(myStore);
}

export {
  Store,
  withinRange,
  init
}
