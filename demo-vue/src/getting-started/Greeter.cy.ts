import Greeter from "./Greeter.vue";

describe("<Greeter />", () => {
  it("renders a default message when no name prop is provided", () => {
    cy.mount(Greeter);
    cy.get("h1").contains("Hello, World");
  });

  it("renders a message with the name", () => {
    cy.mount(Greeter, {
      props: {
        name: "Lachlan",
      },
    });
    cy.get("h1").contains("Hello, Lachlan");
  });
});
