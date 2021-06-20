function sum(items) {
  return items.reduce(function (a, b) {
    return a + b;
  }, 0);
}

function getSegmentsLength(segments) {
  return segments.map(function (segment) {
    return segment.field("Length");
  });
}

function getSegmentsElevationUp(segments) {
  return segments.map(function (segment) {
    if (segment.attr("inverted")) {
      return segment.field("Elevation Down");
    } else {
      return segment.field("Elevation Up");
    }
  });
}

function getSegmentsElevationDown(segments) {
  return segments.map(function (segment) {
    if (segment.attr("inverted")) {
      return segment.field("Elevation Up");
    } else {
      return segment.field("Elevation Down");
    }
  });
}

if (entry().field("Type") === "Combined") {
  const le = entry()
    .field("Segments")
    .map(function (segment) {
      return segment.field("length");
    })
    .reduce(function (a, b) {
      return a + b;
    }, 0);

  const segments = entry().field("segments");

  entry().set("Length", sum(getSegmentsLength(segments)));
  entry().set("Elevation Up", sum(getSegmentsElevationUp(segments)));
  entry().set("Elevation Down", sum(getSegmentsElevationDown(segments)));
}

// computed_start
function computedStart() {
  if (field("type") === "Simple") {
    const start = field("Related locations").find(function (item) {
      return item.attr("Type") == "Start";
    });
    return start && start.field("Name");
  } else {
    const first = field("Segments")[0];
    return first.attr("inverted")
      ? first.field("computed_end")
      : first.field("computed_start");
  }
}

// computed_end
function getLast(items) {
  return items[items.length - 1];
}
function computedEnd() {
  if (field("type") === "Simple") {
    const end = field("Related locations").find(function (item) {
      return item.attr("Type") == "End";
    });
    return end && end.field("Name");
  } else {
    const last = getLast(field("Segments"));
    return last.attr("inverted")
      ? last.field("computed_start")
      : last.field("computed_end");
  }
}

// computed_title

field("computed_start") + " -> " + field("computed_end");

// computed_points
function removeAdjacentDuplicates(array) {
  return array.filter((i, idx) => array[idx - 1] !== i);
}
function computePoints() {
  if (field("type") === "Simple") {
    var others = field("Related locations")
      .filter(function (item) {
        return item.attr("Type") == "Other";
      })
      .map(function (item) {
        return item.field("Name");
      });

    return [field("computed_start")]
      .concat(others)
      .concat([field("computed_end")])
      .join(" | ");
  } else {
    var segments = field("Segments");

    return removeAdjacentDuplicates(
      segments
        .map(function (segment) {
          const points = segment.field("computed_points").split(" | ");
          if (segment.attr("inverted")) {
            return points.reverse();
          } else {
            return points;
          }
        })
        .reduce(function (a, b) {
          return a.concat(b);
        })
    ).join(" | ");
  }
}

computePoints();
