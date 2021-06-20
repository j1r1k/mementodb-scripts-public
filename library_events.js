var LibraryEvents = {
  autofillAll: function () {
    LibraryCommon.autofillTime(entry());
  },
  onUpdatePost: function () {
    LibraryEvents.autofillAll();
  },
  onCreatePost: function () {
    LibraryEvents.autofillAll();
  },
};
