var LibraryCoffee = {
  onCreatePost: function () {
    var created = entry();

    var newEntity = libByName("entities").create({});

    newEntity.set("type", "Coffee");
    newEntity.set("coffee", [created]);
    newEntity.set("image", created.field("image"));
  },
};
