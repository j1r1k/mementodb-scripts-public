const LibraryTravel = {
  /**
   * LibraryTravel.computedTitle(field("Type"), field("Routes"));
   */
  computedTitle: function (type, routes) {
    const head = ArrayExt.getHead(routes);
    const last = ArrayExt.getLast(routes);
    const suffix = ArrayExt.nonNull([
      head ? head.field("computed_start") : null,
      last ? last.field("computed_end") : null,
    ]).join(" → ");

    return [type, suffix].join(" | ");
  },
  autofillAll: function (routes) {
    autofillTime(entry());
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
  onUpdate: function () {
    LibraryTravel.autofillAll(entry().field("Routes"));
  },
};

/**
 * computed_description:
 *
 * "Σ " + field('autofill_length') + " km ↑ " + field('autofill_elevation_up') + " m ↓ " + field('autofill_elevation_down') + " m"
 */
