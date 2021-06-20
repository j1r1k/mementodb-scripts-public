const LibraryEntities = {
  autofillImage: function () {
    switch (entry().field("type")) {
      case "Coffee":
        entry().set("image", entry().field("coffee")[0].field("image"));
        break;
      case "Game":
        entry().set("image", entry().field("games")[0].field("Cover"));
        break;
    }
  },
  autofillAll: function () {
    LibraryEntities.autofillImage();
  },
  onCreatePost: function () {
    LibraryEntities.autofillAll();
  },
  onUpdatePost: function () {
    LibraryEntities.autofillAll();
  },
};
