var LibraryCommon = {
  combineDateAndTime: function (dateStr, timeStr) {
    const date = moment(dateStr).startOf("day");
    const time = moment
      .duration(new Date(timeStr).getTime(), "milliseconds")
      .add(1, "hour");

    return date.add(time);
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
      const start = combineDateAndTime(
        startDate || endDate,
        startTime || endTime
      );
      const end = combineDateAndTime(
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
      return combineDateAndTime(startDate || endDate, startTime || endTime);
    }

    if (endDate || endTime) {
      const date = combineDateAndTime(
        endDate || startDate,
        endTime || startTime
      );

      if (duration) {
        return date.substract(duration, "milliseconds");
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
      return combineDateAndTime(endDate || startDate, endTime || startTime);
    }

    if (startDate || startTime) {
      const date = combineDateAndTime(
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
    e.set("autofill_duration", getDuration(e));
    e.set("autofill_start", getStart(e).toDate());
    e.set("autofill_end", getEnd(e).toDate());
    e.set("autofill_instant", e.field("autofill_duration") === 0);
  },
};
