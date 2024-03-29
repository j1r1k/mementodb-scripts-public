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

  computedWeight: function () {
    return field("Products")
      .map(function (item) {
        if (item.attr("Weight") > 0) {
          return item.attr("Weight");
        } else {
          return (
            item.attr("Quantity") *
            item.field("computed_" + item.attr("serving"))
          );
        }
      })
      .reduce(function (a, b) {
        return a + b;
      }, 0)
      .toFixed(0);
  },

  computedWeightLabel: function () {
    return Math.round(field("computed_weight")) + " g";
  },

  computedCaloriesRatio: function (key, field_calories) {
    var calories = LibraryFood.computedProperty("calories");
    var field = LibraryFood.computedProperty(key);

    return ((100 * (field * field_calories)) / calories).toFixed(2);
  },

  computedDescription: function () {
    var makeLine = function (prefix, unit) {
      return [
        "pr: ",
        Math.trunc(field(prefix + "protein")),
        unit,
        " | f: ",
        Math.trunc(field(prefix + "fat")),
        unit,
        " (sf: ",
        Math.trunc(field(prefix + "saturatedFattyAcid")),
        unit,
        ") | ch: ",
        Math.trunc(field(prefix + "carbohydrate")),
        unit,
        " | fi: ",
        Math.trunc(field(prefix + "fiber")),
        unit,
      ].join("");
    };

    var l1 = makeLine("computed_", "g");
    var l2 = makeLine("computed_calories_ratio_", "%");

    return [l1, l2].join("\n");
  },

  computedCaloriesLabel: function () {
    return Math.round(field("computed_calories")) + " cal";
  },

  computedTitle: function () {
    return field("Products")
      .map(function (item) {
        return item.field("Title");
      })
      .join(" | ");
  },

  onCreatePre: function () {
    if (entryDefault()) {
      const h = new Date().getHours();

      var type = "Breakfast";

      if (h >= 17) {
        type = "Dinner";
      } else if (h >= 15) {
        type = "Snack 2";
      } else if (h >= 11) {
        type = "Lunch";
      } else if (h >= 10) {
        type = "Snack 1";
      }

      entryDefault().set("Type", type);
    }
  },
};
