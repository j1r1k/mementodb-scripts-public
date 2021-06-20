const LibraryTravel = {
  computedTitle: function (getField) {
    const segments = getField("Segments");
    const head = ArrayExt.getHead(segments);
    const last = ArrayExt.getLast(segments);

    const prefix = getField("Type");
    const suffix = ArrayExt.nonNull([
      head ? head.field("computed_start") : null,
      last ? last.field("computed_end") : null,
    ]).join(" → ");

    return [prefix, suffix].join(" | ");
  },
};
