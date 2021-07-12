var LibraryInventory = {
  computedTitle: function () {
    const title = field("Title");
    const brand = field("Brand");
    const model = field("Model");

    return ArrayExt.nonNull([title, brand, model]).join(" ");
  },
};
