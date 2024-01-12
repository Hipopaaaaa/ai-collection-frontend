import type { RouteRecordRaw } from "vue-router";

const asyncModule = import.meta.glob("@page/**/*.vue");

export const autoRegistRoutes: RouteRecordRaw[] = [];
//遍历模块,生成路由
Object.keys(asyncModule).forEach((path: string) => {
  // 遇到包含组件文件夹名路径的 直接返回
  if (path.includes(`/${import.meta.env.VITE_VIEWS_COMPONENTS_URL}`)) return;

  // 替换 [] 符号 为 :  实现路由传参
  // 去掉'/views'前缀
  // 去掉 '.vue' 后缀，
  // 如果是index文件 需要将/index也去掉
  const routePath: string = path
    .replace(/\[(.*?)\]/g, (match, param) => `:${param}`)
    .replace(`/src/${import.meta.env.VITE_VIEWS_URL}`, "")
    .replace(".vue", "")
    .replace("/index", "");
  const route: RouteRecordRaw = {
    path: routePath,
    name: routePath.toUpperCase().slice(1).replace(/\//g, "_"), // 去掉路径开头的 '/' ，将所有 '/' 替换为 '-'
    component: asyncModule[path],
    children: []
  };
  autoRegistRoutes.push(route);
});
