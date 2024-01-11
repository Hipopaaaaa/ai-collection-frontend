import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
    component: () => import("@/layouts/index.vue"),
    children: []
  }
];
const asyncModule = import.meta.glob("@/views/**/*.vue");
const autoImportRoutes: {}[] = [];
//遍历模块,生成路由
Object.keys(asyncModule).forEach((path: string) => {
  if (path.includes("/components")) return;
  // console.log(path);
  // 去掉 [] 符号
  const replaceBracket = path.replace(/\[(.*?)\]/g, (match, param) => `:${param}`);
  // 去掉'/views'前缀
  const routePath = replaceBracket.replace("/src/views", "").replace("/index", "").replace(".vue", "");
  // const regex = /\/([^/]+)\/index\.vue$/;
  // const reg = regex.exec(path) as RegExpExecArray;
  // const routePath = reg[1];
  const route = {
    name: routePath.toUpperCase().slice(1),
    path: routePath,
    component: asyncModule[path],
    children: []
  };
  autoImportRoutes.push(route);
  routes[0]?.children?.push(route);
});

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
