var LibraryMovies = {
  autofillImage: function () {
    switch (entry().field("type")) {
      case "Movie":
        entry().set("image", entry().field("Movies")[0].field("Poster"));
        break;
      case "Show":
        entry().set("image", entry().field("Shows")[0].field("Poster"));
        break;
    }
  },
  autofillAll: function () {
    LibraryMovies.autofillImage();
  },
  onCreatePost: function () {
    LibraryMovies.autofillAll();
  },
  onUpdatePost: function () {
    LibraryMovies.autofillAll();
  },
};
