import { contains } from "cypress/types/jquery";
import Numbers from "./Numbers.vue";

describe("<Numbers />", () => {
  it("renders", () => {
    cy.mount(Numbers, {
      props: {
        parity: "odd",
      },
    });

    for (const i of [1, 3, 5, 7, 9]) {
      cy.get("li").contains(i).should("exist");
    }

    for (const i of [-1, 0, 2, 4, 6, 8, 10, 11]) {
      cy.get("li").contains(i).should("not.exist");
    }
  });
});
