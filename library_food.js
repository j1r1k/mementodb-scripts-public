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
        return item.field("Title");
      })
      .join(" | ");
  },

  onCreatePost: function () {
    var created = entry();
    var newEntity = libByName("events").create({});

    newEntity.set("Start Date", created.field("Date and Time"));
    newEntity.set("Start Time", created.field("Date and Time"));
    newEntity.set("autofill_start", created.field("Date and Time"));
    newEntity.set("type", "Meal");
    newEntity.set("Food", [created]);
    newEntity.set("Title", created.field("Type"));
    newEntity.recalc();
  },

  // onDeletePre: function () {
  //   var toDelete = entry();
  //   var relatedEvent = libByName("events")
  //     .entries()
  //     .filter(function (e) {
  //       return (
  //         e.field("Type") === "Meal" && e.field("Food")[0].id === toDelete.id
  //       );
  //     });

  //   relatedEvent.delete();
  // },
};
