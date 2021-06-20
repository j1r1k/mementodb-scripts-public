const LibraryEvents = {
  autofillAll: function () {
    autofillTime(entry());
  },
  onUpdatePost: function () {
    LibraryTravel.autofillAll();
  },
  onCreatePost: function () {
    LibraryTravel.autofillAll();
  },
};
