const DirectoryFood = {
  computedProperty: function (key) {
    if (field("Type") === "Combined") {
      var [value, weight] = field("Multiple")
        .map(function (item) {
          var weight = 0;
          if (item.attr("Weight") > 0) {
            weight = item.attr("Weight");
          } else {
            weight =
              item.attr("Quantity") *
              item.field("computed_" + item.attr("serving"));
          }
          return [(item.field("computed_" + key) / 100.0) * weight, weight];
        })
        .reduce(
          function (a, b) {
            return [a[0] + b[0], a[1] + b[1]];
          },
          [0, 0]
        );

      return (value / (weight / 100.0)).toFixed(2);
    } else {
      return field(key);
    }
  },

  computedAverageServing: function () {
    if (field("Average")) {
      return field("Average");
    } else if (field("Type") === "Combined") {
      return ArrayExt.sum(
        field("Multiple").map(function (item) {
          var weight = 0;
          if (item.attr("Weight") > 0) {
            weight = item.attr("Weight");
          } else {
            weight =
              item.attr("Quantity") *
              item.field("computed_" + item.attr("Serving"));
          }
          return weight;
        })
      );
    }
  },

  computedServing: function (key, positive) {
    if (field(key)) {
      return field(key);
    } else {
      return (
        field("computed_Average") *
        (1 + (positive ? 1 : -1) * field("serving_factor"))
      );
    }
  },
};
