const LibraryEntities = {
  autofillImage: function () {
    switch (entry().field("type")) {
      case "Board Game":
        entry().set("image", entry().field("Board Games")[0].field("Image"));
        break;
      case "Book":
        entry().set("image", entry().field("Books")[0].field("Cover"));
        break;
      case "Coffee":
        entry().set("image", entry().field("Coffee")[0].field("image"));
        break;
      case "Game":
        entry().set("image", entry().field("Games")[0].field("Cover"));
        break;
      case "Movie":
        entry().set("image", entry().field("Movies")[0].field("Poster"));
        break;
    }
  },
  computedTitle: function () {
    switch (field("type")) {
      case "Board Game":
        return field("movies")[0].field("Title");
      case "Book":
        return field("movies")[0].field("Title");
      case "Coffee":
        return field("coffee")[0].field("Title");
      case "Game":
        return field("games")[0].field("Title");
      case "Location":
        return field("locations")[0].field("Title");
      case "Movie":
        return field("movies")[0].field("Title");
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
