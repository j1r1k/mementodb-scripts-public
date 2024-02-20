var LibraryReading = {
  autofillImage: function () {
    entry().set("image", entry().field("Books")[0].field("Cover"));
  },
  autofillAll: function () {
    LibraryReading.autofillImage();
  },
  onCreatePost: function () {
    LibraryReading.autofillAll();
  },
  onUpdatePost: function () {
    LibraryReading.autofillAll();
  },
};
