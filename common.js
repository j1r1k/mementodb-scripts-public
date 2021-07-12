var Monoid = {
  sum: {
    empty: 0,
    combine: function (a, b) {
      return a + b;
    },
  },
  array: {
    empty: [],
    combine: function (a, b) {
      return a.concat(b);
    },
  },
};

var ArrayExt = {
  getHead: function (items) {
    return items[0];
  },
  getLast: function (items) {
    return items[items.length - 1];
  },
  nonEmpty: function (str) {
    return str !== "";
  },
  nonNull: function (items) {
    return items.filter(function (i) {
      return i !== undefined && i !== null;
    });
  },
  combine: function (items, monoid) {
    return items.reduce(monoid.combine, monoid.empty);
  },
  sum: function (items) {
    return ArrayExt.combine(items, Monoid.sum);
  },
  removeAdjacentDuplicates: function (array) {
    return array.filter((i, idx) => array[idx - 1] !== i);
  },
};

var EntriesExt = {
  combineRelated: function (entries, relatedField, monoid) {
    return ArrayExt.combine(
      entries.map(function (e) {
        return e.field(relatedField);
      }),
      monoid
    );
  },
  sumRelated: function (entries, relatedField) {
    return this.combineRelated(entries, Monoid.sum);
  },
};
