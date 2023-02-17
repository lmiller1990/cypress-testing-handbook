import { createRouter, createWebHistory } from "vue-router";
import BookTable from "./BookTable.vue";
import App from "../App.vue";
import { defineComponent, h } from "vue";

export const buildRouter = (history = createWebHistory()) => {
  return createRouter({
    history,
    routes: [
      {
        path: "/",
        component: App,
      },
      {
        path: "/books",
        component: BookTable,
        children: [
          {
            path: ":id",
            component: defineComponent({
              setup() {
                // placeholder
                return () => h("div", "OK");
              },
            }),
          },
        ],
      },
    ],
  });
};
