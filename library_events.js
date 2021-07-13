var LibraryEvents = {
  computedStatus: function () {
    const durationHours = field("autofill_duration") / 3600000;

    if (durationHours >= 24) {
      return field("computed_days") + " days";
    } else {
      const duration = moment.duration(field("autofill_duration"));
      return [
        String(duration.hours()).padStart(2, "0"),
        String(duration.minutes()).padStart(2, "0"),
        String(duration.seconds()).padStart(2, "0"),
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
