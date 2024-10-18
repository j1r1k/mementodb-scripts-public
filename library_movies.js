var LibraryMovies = {
  autofillImage: function (e) {
    switch (e.field("type")) {
      case "Movie":
        e.set("image", e.field("Movies")[0].field("Poster"));
        break;
      case "Show":
        e.set("image", e.field("Shows")[0].field("Poster"));
        break;
    }
  },
  autofillAll: function (e) {
    LibraryMovies.autofillImage(e);
  },
  onCreatePost: function (e) {
    LibraryMovies.autofillAll(e);
  },
  onUpdatePost: function (e) {
    LibraryMovies.autofillAll(e);
  },
};
