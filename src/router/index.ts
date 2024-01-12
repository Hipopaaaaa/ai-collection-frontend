import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { autoRegistRoutes } from "./autoRegistRoutes";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
    component: () => import("@/layouts/index.vue"),
    children: autoRegistRoutes
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
