const LibraryTravel = {
  computedDescription: function () {
    return [
      "Σ",
      field("autofill_length"),
      "km ↑",
      field("autofill_elevation_up"),
      "m ↓",
      field("autofill_elevation_down"),
      "m",
    ].join(" ");
  },
  computedTitle: function () {
    const type = field("Type");
    const routes = field("Routes");
    const head = ArrayExt.getHead(routes);
    const last = ArrayExt.getLast(routes);
    const suffix = ArrayExt.nonNull([
      head ? head.field("computed_start") : null,
      last ? last.field("computed_end") : null,
    ]).join(" → ");

    return [type, suffix].join(" | ");
  },
  autofillAll: function () {
    autofillTime(entry());

    const routes = entry().field("Routes");
    entry().set("autofill_length", EntriesExt.sumRelated(routes, "length"));
    entry().set(
      "autofill_elevation_up",
      EntriesExt.sumRelated(routes, "Elevation Up")
    );
    entry().set(
      "autofill_elevation_down",
      EntriesExt.sumRelated(routes, "Elevation Down")
    );
  },
  onUpdatePost: function () {
    LibraryTravel.autofillAll();
  },
  onCreatePost: function () {
    LibraryTravel.autofillAll();
  },
};

/**
 * computed_description:
 *
 *
 */
