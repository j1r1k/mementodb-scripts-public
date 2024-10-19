var LibraryEvents = {
  computedStatus: function (e) {
    const durationHours = e.field("autofill_duration") / 3600000;

    if (durationHours >= 24) {
      const days = e.field("computed_days");
      return days + " day" + (days > 1 ? "s" : "");
    } else {
      const duration = moment.duration(e.field("autofill_duration"));
      return [
        StringExt.padStart(String(duration.hours()), 2, "0"),
        StringExt.padStart(String(duration.minutes()), 2, "0"),
        StringExt.padStart(String(duration.seconds()), 2, "0"),
      ].join(":");
    }
  },
  autofillAll: function (e) {
    LibraryCommon.autofillTime(e);
  },
  onUpdatePost: function (e) {
    LibraryEvents.autofillAll(e);
  },
  onCreatePost: function (e) {
    LibraryEvents.autofillAll(e);
  },
};
