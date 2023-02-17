import "./commands";

import { mount } from "cypress/vue";
import "../../src/style.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { defineComponent, DefineComponent } from "vue";

const vuetify = createVuetify({
  components,
  directives,
});

function mountWithVuetify(
  Comp: DefineComponent,
  options?: Parameters<typeof mount>[1]
): Cypress.Chainable {
  return mount(Comp, {
    ...options,
    global: {
      ...options?.global,
      plugins: [...(options?.global?.plugins ?? []), vuetify],
    },
  });
}

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      mountWithVuetify: typeof mountWithVuetify;
      mountWithPinia: typeof mountWithPinia;
      mountWithRouter: typeof mountWithRouter;
    }
  }
}

import { createPinia, Pinia, setActivePinia } from "pinia";
import {
  createMemoryHistory,
} from "vue-router";
import { buildRouter } from "../../src/vue-router/router";

let pinia: Pinia;

beforeEach(() => {
  pinia = createPinia();
  setActivePinia(pinia);
});

function mountWithPinia(
  Comp: DefineComponent,
  options?: Parameters<typeof mount>[1]
): Cypress.Chainable {
  return mount(Comp, {
    ...options,
    global: {
      ...options?.global,
      plugins: [...(options?.global?.plugins ?? []), pinia],
    },
  });
}

function mountWithRouter(
  Comp: DefineComponent,
  options: Parameters<typeof mount>[1] = {}
) {
  const router = buildRouter(createMemoryHistory());
  router.push("/books");
  cy.wrap(router.isReady()).then(() => {
    return mount(Comp, {
      ...options,
      global: {
        ...options?.global,
        plugins: [...(options?.global?.plugins ?? []), router],
      },
    });
  });
}

Cypress.Commands.add("mountWithVuetify", mountWithVuetify);
Cypress.Commands.add("mount", mount);
Cypress.Commands.add("mountWithPinia", mountWithPinia);
Cypress.Commands.add("mountWithRouter", mountWithRouter);
