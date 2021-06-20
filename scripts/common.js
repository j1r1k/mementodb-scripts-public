const Monoid = {
  sum: {
    empty: 0,
    combine: function (a, b) {
      return a + b;
    },
  },
};

const ArrayExt = {
  getHead: function (items) {
    return items[0];
  },
  getLast: function (items) {
    return items[items.length - 1];
  },
  nonNull: function (items) {
    return items.filter(function (i) {
      return Boolean(i);
    });
  },
  combine: function (items, monoid) {
    return items.reduce(monoid.combine, monoid.empty);
  },
  sum: function (items) {
    return ArrayExt.combine(items, Monoid.sum);
  },
};

const EntriesExt = {
  combineRelated: function (entries, relatedField, monoid) {
    return ArrayExt.combine(
      entries.map(function (e) {
        return e.field(relatedField);
      }),
      monoid
    );
  },
};
