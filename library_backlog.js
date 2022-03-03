var LibraryBacklog = {
  autofillImage: function () {
    switch (entry().field("type")) {
      case "Book":
        entry().set("image", entry().field("Books")[0].field("Cover"));
        break;
      case "Game":
        entry().set("image", entry().field("Games")[0].field("Cover"));
        break;
      case "Movie":
        entry().set("image", entry().field("Movies")[0].field("Poster"));
        break;
      case "TV Show":
        entry().set("image", entry().field("TV Shows")[0].field("Poster"));
        break;
    }
  },
  computedTitle: function () {
    switch (field("type")) {
      case "Book":
        return field("Books")[0].field("Title");
      case "Game":
        return field("Games")[0].field("Title");
      case "Movie":
        return field("Movies")[0].field("Title");
      case "TV Show":
        return field("TV Shows")[0].field("Title");
      default:
        return field("Title");
    }
  },
  autofillAll: function () {
    LibraryBacklog.autofillImage();
  },
  onCreatePost: function () {
    LibraryBacklog.autofillAll();
  },
  onUpdatePost: function () {
    LibraryBacklog.autofillAll();
  },
};
