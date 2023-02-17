import BookTable from "./BookTable.vue";

describe("BookTable", () => {
  it("bookmarks a book", () => {
    cy.intercept("/bookmarks", (req) => {
      expect(req.body).to.eq(
        JSON.stringify({
          book_id: "2",
        })
      );
      req.reply("OK");
    }).as("bookmarks");

    cy.mountWithRouter(BookTable, {
      global: {
        stubs: {
          RouterView: true,
        },
      },
    }).as("wrapper");

    cy.get("[data-cy='Snow White']").within(() => {
      cy.get("button").contains("Bookmark").click();
    });
    cy.wait("@bookmarks");

    cy.get("@wrapper").then(({ wrapper }) =>
      expect(wrapper.vm.$router.currentRoute.value.fullPath).to.eql("/")
    );
  });
});
