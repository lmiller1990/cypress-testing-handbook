import SignUp from "./SignUp.vue";

describe("SignUp", () => {
  it("renders without any errors by default", () => {
    cy.mount(SignUp);

    // Submit - errors are shown
    cy.get("button").contains("Submit").click();

    // Assert errors are shown
    cy.get('[role="alert"]').contains("Name is required.");
    cy.get('[role="alert"]').contains("Must be a valid email.");

    // Fill in form
    cy.get('[name="username"]').type("Lachlan");
    cy.get('[name="email"]').type("test@cypress.io");

    // Intercept request - backend doesn't exist
    cy.intercept("/users/sign_up", "OK").as("submit");

    // Assert correct payload
    cy.get("button").contains("Submit").click();
    cy.wait("@submit")
      .its("request.body")
      .should(
        "eql",
        JSON.stringify({
          username: "Lachlan",
          email: "test@cypress.io",
        })
      );
  });
});
