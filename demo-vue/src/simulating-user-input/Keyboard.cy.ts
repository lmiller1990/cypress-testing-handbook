import Keyboard from "./Keyboard.vue";

describe("<Keyboard />", () => {
  it("greets the user", () => {
    cy.mount(Keyboard);
    cy.get("input[name='username']").type("Lachlan");
    cy.get("p").should("have.text", "Hello, Lachlan!");

    cy.get("input[name='username']").clear().type("Lily");
    cy.get("p").should("have.text", "Hello, Lily!");

    // Intercept *before* request is made.
    // Use .as('sign_up') so we can cy.wait() later.
    cy.intercept("/sign_up", (req) => {
      expect(req.body).to.eq(
        JSON.stringify({
          username: "Lily",
        })
      );
      req.reply("OK");
    }).as("sign_up");

    cy.get("input[name='username']").type("{enter}");

    cy.wait("@sign_up");
  });
});
