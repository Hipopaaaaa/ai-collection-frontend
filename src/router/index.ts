import { createRouter, createWebHashHistory } from "vue-router";
import type {RouteRecordRaw} from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "home",
        component: () => import("@/views/home/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
