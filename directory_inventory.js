var DirectoryInventory = {
  onCreatePost: function () {
    var created = entry();

    var newEntity = libByName("entities").create({});

    newEntity.set("type", "Item");
    newEntity.set("inventory", [created]);
    newEntity.set("image", created.field("image"));
    newEntity.set("computed_title", created.field("Title"));

    var newEvent = libByName("events").create({});
    newEvent.set("type", "Inventory");
    newEvent.set("title", "Added '" + created.field("title") + "'");
    newEvent.set("start date", created.field("date added"));
    newEvent.set(
      "autofill_start",
      moment(created.field("date added")).startOf("day").toDate()
    );
    newEvent.set("autofill_instant", true);
    newEvent.set("inventory", [created]);
  },
};
