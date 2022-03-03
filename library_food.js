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
    return field("computed_weight") + "g";
  },

  computedDescription: function () {
    return [
      "pr:",
      field("computed_protein"),
      "| f:",
      field("computed_fat"),
      "| ch:",
      field("computed_carbohydrate"),
      "| fi:",
      field("computed_fiber"),
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
      } else if (h >= 9) {
        type = "Snack 1";
      }

      entryDefault().set("Type", type);
    }
  },

  fillEvent: function (currentEntry, eventEntry) {
    eventEntry.set("Start Date", currentEntry.field("Date and Time"));
    eventEntry.set("Start Time", currentEntry.field("End Time"));
    eventEntry.set("autofill_start", currentEntry.field("Date and Time"));
    eventEntry.set("type", "Meal");
    eventEntry.set("Food", [currentEntry]);
    eventEntry.set("Title", currentEntry.field("Type"));
    eventEntry.recalc();
  },

  onCreatePost: function () {
    LibraryFood.fillEvent(entry(), libByName("events").create({}));
  },

  onUpdatePost: function () {
    const current = entry();
    const events = current.linksFrom("Events", "Food");

    events.map(function (event) {
      LibraryFood.fillEvent(current, event);
    });
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
