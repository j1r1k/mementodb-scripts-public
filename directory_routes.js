var DirectoryRoutes = {
  getSegmentsElevationUp: function (segments) {
    return segments.map(function (segment) {
      if (segment.attr("inverted")) {
        return segment.field("Elevation Down");
      } else {
        return segment.field("Elevation Up");
      }
    });
  },
  getSegmentsElevationDown: function (segments) {
    return segments.map(function (segment) {
      if (segment.attr("inverted")) {
        return segment.field("Elevation Up");
      } else {
        return segment.field("Elevation Down");
      }
    });
  },
  autofillAll: function () {
    if (entry().field("Type") === "Combined") {
      const segments = entry().field("segments");

      entry().set("Length", EntriesExt.sumRelated(segments, "Length"));
      entry().set(
        "Elevation Up",
        ArrayExt.sum(DirectoryRoutes.getSegmentsElevationUp(segments))
      );
      entry().set(
        "Elevation Down",
        ArrayExt.sum(DirectoryRoutes.getSegmentsElevationDown(segments))
      );
    }
  },
  /**
   *
   */
  computedTitle: function () {
    const startAndEnd = ArrayExt.nonEmpty([
      field("computed_start"),
      field("computed_end"),
    ]).join(" → ");

    const name = field("name") || "";

    if (name && startAndEnd) {
      return name + " (" + startAndEnd + ")";
    }

    return name || startAndEnd || "";
  },

  computedStart: function () {
    if (field("type") === "Simple") {
      const start = field("Related locations").find(function (item) {
        return item.attr("Type") == "Start";
      });
      return start ? start.field("Title") : "";
    } else {
      const first = field("Segments")[0];
      return first.attr("inverted")
        ? first.field("computed_end")
        : first.field("computed_start");
    }
  },
  computedEnd: function () {
    if (field("type") === "Simple") {
      const end = field("Related locations").find(function (item) {
        return item.attr("Type") == "End";
      });
      return end ? end.field("Title") : "";
    } else {
      const last = ArrayExt.getLast(field("Segments"));
      return last.attr("inverted")
        ? last.field("computed_start")
        : last.field("computed_end");
    }
  },

  computedPoints: function () {
    if (field("type") === "Simple") {
      var others = field("Related locations")
        .filter(function (item) {
          return item.attr("Type") == "Other";
        })
        .map(function (item) {
          return item.field("Title");
        });

      return ArrayExt.nonEmpty(
        [field("computed_start")].concat(others).concat([field("computed_end")])
      ).join(" | ");
    } else {
      var segments = field("Segments");

      return ArrayExt.nonEmpty(
        ArrayExt.removeAdjacentDuplicates(
          ArrayExt.combine(
            segments.map(function (segment) {
              const points = segment.field("computed_points").split(" | ");
              if (segment.attr("inverted")) {
                return points.reverse();
              } else {
                return points;
              }
            }),
            Monoid.array
          )
        )
      ).join(" | ");
    }
  },

  onCreatePost: function () {
    DirectoryRoutes.autofillAll();
  },
  onUpdatePost: function () {
    DirectoryRoutes.autofillAll();
  },
};
