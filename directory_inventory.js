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
    newEvent.set("title", "Added to inventory");
    newEvent.set("start date", created.field("added"));
    newEvent.set(
      "computed_start",
      moment(created.field("date added")).startOf("day")
    );
    newEntity.set("inventory", [created]);
  },
};
