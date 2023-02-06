import "./commands";

import { mount } from "cypress/vue";
import "../../src/style.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import type { DefineComponent } from "vue";

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
      mount: typeof mountWithVuetify;
    }
  }
}

Cypress.Commands.add("mount", mountWithVuetify);
