const LibraryTravel = {
  computedTitle: function (e) {
    const segments = e.field("Segments");
    const head = ArrayExt.getHead(segments);
    const last = ArrayExt.getLast(segments);

    const prefix = e.field("Type");
    const suffix = ArrayExt.nonNull([
      head ? head.field("computed_start") : null,
      last ? last.field("computed_end") : null,
    ]).join(" → ");

    return [prefix, suffix].join(" | ");
  },
};
