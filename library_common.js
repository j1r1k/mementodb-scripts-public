var LibraryCommon = {
  combineDateAndTime: function (dateStr, timeStr) {
    const date = moment(dateStr).startOf("day");
    const time = timeStr ? moment(new Date(timeStr)) : null;

    if (time) {
      date.hours(time.hours());
      date.minutes(time.minutes());
      date.seconds(time.seconds());
      date.milliseconds(time.milliseconds());
    }

    return date;
  },

  getDuration: function (e) {
    const duration = e.field("Duration");

    if (duration) {
      return duration;
    }

    const startDate = e.field("Start Date");
    const startTime = e.field("Start Time");
    const endDate = e.field("End Date");
    const endTime = e.field("End Time");

    if (startDate || endDate) {
      const start = LibraryCommon.combineDateAndTime(
        startDate || endDate,
        startTime || endTime
      );
      const end = LibraryCommon.combineDateAndTime(
        endDate || startDate,
        endTime || startTime
      );

      return moment.duration(end - start, "milliseconds").as("milliseconds");
    }

    return 0;
  },

  getStart: function (e) {
    const duration = e.field("Duration");
    const startDate = e.field("Start Date");
    const startTime = e.field("Start Time");
    const endDate = e.field("End Date");
    const endTime = e.field("End Time");

    if (startDate || startTime) {
      return LibraryCommon.combineDateAndTime(
        startDate || endDate,
        startTime || endTime
      );
    }

    if (endDate || endTime) {
      const date = LibraryCommon.combineDateAndTime(
        endDate || startDate,
        endTime || startTime
      );

      if (duration) {
        return date.subtract(duration, "milliseconds");
      } else {
        return date;
      }
    }
  },

  getEnd: function (e) {
    const duration = e.field("Duration");
    const startDate = e.field("Start Date");
    const startTime = e.field("Start Time");
    const endDate = e.field("End Date");
    const endTime = e.field("End Time");

    if (endDate || endTime) {
      return LibraryCommon.combineDateAndTime(
        endDate || startDate,
        endTime || startTime
      );
    }

    if (startDate || startTime) {
      const date = LibraryCommon.combineDateAndTime(
        startDate || endDate,
        startTime || endTime
      );

      if (duration) {
        return date.add(duration, "milliseconds");
      } else {
        return date;
      }
    }
  },

  autofillTime: function (e) {
    e.set("autofill_duration", LibraryCommon.getDuration(e));
    e.set("autofill_start", LibraryCommon.getStart(e).toDate());
    e.set("autofill_end", LibraryCommon.getEnd(e).toDate());
    e.set("autofill_instant", e.field("autofill_duration") === 0);
  },
};
