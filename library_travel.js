const LibraryTravel = {
  computedTitle: function (type, segments) {
    const head = ArrayExt.getHead(segments);
    const last = ArrayExt.getLast(segments);
    const suffix = ArrayExt.nonNull([
      head ? head.field("computed_start") : null,
      last ? last.field("computed_end") : null,
    ]).join(" → ");

    return [type, suffix].join(" | ");
  },
};
