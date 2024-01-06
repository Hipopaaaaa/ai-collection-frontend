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
const asyncModule = import.meta.glob("@/views/**/index.vue");
const autoImportRoutes: {}[] = [];
//遍历模块,生成路由
Object.keys(asyncModule).forEach((path: string) => {
  if (path.includes("/components")) return;
  // console.log(path);
  // 去掉'/views'前缀
  const routePath = path.replace("/src/views", "").replace("/index.vue", "");
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
console.log(autoImportRoutes);
const lastRoutes: any[] = [];
const layerRoutes: any[] = [];
// 组装路由，根据上下级组装
function stratifyRoutes(route: any) {
  // 根据 '/' 数量分割，别放入对应的数组
  const index = route.path.split("/").length - 2;
  if (layerRoutes[index]) {
    layerRoutes[index].push({ ...route });
  } else {
    layerRoutes[index] = [];
    layerRoutes[index].push({ ...route });
  }
}
// 组装路由

autoImportRoutes.map((route) => {
  stratifyRoutes(route);
});
function getChildrenRoutes(path, index) {
  console.log(path, index);

  if (layerRoutes[index]) {
    const children = [];
    layerRoutes[index].map((item) => {
      if (item.path.includes(path)) {
        children.push(item);
      }
    });
    return children;
  }
  return [];
}
layerRoutes.map((array, index) => {
  const a = array.map((route, index) => {
    route.children = getChildrenRoutes(route.path, index + 1);
  });
  console.log(a, "a");
});
// console.log(layerRoutes);

// 调用函数进行路由组装
// 假设 layerRoutes 已经填充好了数据

// const assembledRoutes = buildHierarchy(layerRoutes);
// console.log(assembledRoutes);

// routes[0].children = layerRoutes[0];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
