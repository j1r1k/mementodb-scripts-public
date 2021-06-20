var LibraryFood = {
  computedProperty: function (key) {
    return field("Products")
      .map(function (item) {
        var weight = 0;
        if (item.attr("Weight") > 0) {
          weight = item.attr("Weight");
        } else {
          weight =
            item.attr("Quantity") *
            item.field("computed_" + item.attr("serving"));
        }
        return (item.field("computed_" + key) / 100.0) * weight;
      })
      .reduce(function (a, b) {
        return a + b;
      }, 0)
      .toFixed(2);
  },

  computedDescription: function () {
    return [
      "pr:",
      field("computed_protein"),
      "| f:",
      field("computed_fat"),
      "| ch:",
      field("computed_carbohydrate"),
    ].join(" ");
  },

  computedCaloriesLabel: function () {
    return field("computed_calories") + "cal";
  },

  computedTitle: function () {
    return field("Products")
      .map(function (item) {
        item.field("Title");
      })
      .join(" | ");
  },
};
