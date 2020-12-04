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

  const qty = this.el.querySelector('.qty');
  const inc = this.el.querySelector('.inc');
  const dec = this.el.querySelector('.dec');


  qty.addEventListener('change', () => {
    if (this.onChange) this.onChange();
  });
  inc.addEventListener('click', () => {
    if (this.onIncrement) this.onIncrement();
  })
  dec.addEventListener('click', () => {
    if (this.onDecrement) this.onDecrement();
  });

  this.id = function() {
    return el.dataset.id;
  }

  this.range = function() {
    const qty = this.el.querySelector('.qty');

    return { min: qty.min, max: qty.max };
  }

  this.value = function() {
    const qty = this.el.querySelector('.qty');

    return parseInt(qty.value, 10);
  }

  this.setQuantity = function(newQuantity) {
    const qty = this.el.querySelector('.qty');
    qty.value = newQuantity;
  }

}


function syncAllSelectors(store, selectorComponents) {
  selectorComponents.forEach((selectorComponent) => {

    /* Need to know the id of the quantity selector */
    const id = selectorComponent.id();

    /* Need to set the quantity value it should be at */
    selectorComponent.setQuantity(store.state[id]);
  });
}

function init(selectorComponents, store) {

  selectorComponents.forEach((selectorComponent) => {
    const id = selectorComponent.id();

    /* Need to know the quantity selector range */
    const range = selectorComponent.range();

    /* Need to know when the quantity selector is changed */
    selectorComponent.onChange = () => {
      store.mergeState({ [id]: withinRange(selectorComponent.value(), range) });
    }
    /* Need to know when the quantity selector is incremented */
    selectorComponent.onIncrement = () => {
      store.mergeState({ [id]: withinRange(selectorComponent.value()+ 1, range) });
    };
    /* Need to know when the quantity selector is decremented */
    selectorComponent.onDecrement = () => {
      store.mergeState({ [id]: withinRange(selectorComponent.value()- 1, range) });
    };
  });

  syncAllSelectors(store, selectorComponents);
}

module.exports = {
  Store,
  withinRange,
  SelectorComponent,
  syncAllSelectors,
  init
}
