const LibraryEvents = {
  autofillAll: function () {
    autofillTime(entry());
  },
  onUpdatePost: function () {
    LibraryEvents.autofillAll();
  },
  onCreatePost: function () {
    LibraryEvents.autofillAll();
  },
};
