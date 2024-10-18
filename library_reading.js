var LibraryReading = {
  autofillImage: function (e) {
    e.set("image", e.field("Books")[0].field("Cover"));
  },
  autofillAll: function (e) {
    LibraryReading.autofillImage(e);
  },
  onCreatePost: function (e) {
    LibraryReading.autofillAll(e);
  },
  onUpdatePost: function (e) {
    LibraryReading.autofillAll(e);
  },
};
