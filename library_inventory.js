var LibraryInventory = {
  computedTitle: function () {
    const title = field("Title");
    const brand = field("Brand");
    const model = field("Model");
    const identifier = field("Identifier");

    return ArrayExt.nonNull([title, brand, model, identifier]).join(" ");
  },
};
