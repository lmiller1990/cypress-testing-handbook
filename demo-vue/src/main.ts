import { createApp } from "vue";
import "./style.css";
import { RouterView } from 'vue-router'

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { buildRouter } from "./vue-router/router";

const vuetify = createVuetify({
  components,
  directives,
});

const router = buildRouter();

const app = createApp(RouterView);
app.use(vuetify);
app.use(router);

app.mount("#app");
