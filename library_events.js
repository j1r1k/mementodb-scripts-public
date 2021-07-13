var LibraryEvents = {
  computedStatus: function () {
    const durationHours = field("autofill_duration") / 3600000;

    if (durationHours >= 24) {
      const days = field("computed_days");
      return days + " day" + (days > 1 ? "s" : "");
    } else {
      const duration = moment.duration(field("autofill_duration"));
      return [
        StringExt.padStart(String(duration.hours()), 2, "0"),
        StringExt.padStart(String(duration.minutes()), 2, "0"),
        StringExt.padStart(String(duration.seconds()), 2, "0"),
      ].join(":");
    }
  },
  autofillAll: function () {
    LibraryCommon.autofillTime(entry());
  },
  onUpdatePost: function () {
    LibraryEvents.autofillAll();
  },
  onCreatePost: function () {
    LibraryEvents.autofillAll();
  },
};
