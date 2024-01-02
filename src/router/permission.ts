// import type { Router, RouteRecordNormalized } from "vue-router";
import { usethemeStore } from "@/stores/themeStore";
import router from "./index";

router.beforeEach(async (to, from, next) => {
  // 从localStorage中获取主题
  let theme = JSON.parse(localStorage.getItem("theme") as string);
  const themeStore = usethemeStore();
  if (!theme) {
    // 如果没用主题设置默认主题为dark
    theme = "dark";
    localStorage.setItem("theme", JSON.stringify(theme));
  }
  themeStore.switchTheme(theme);

  next();
});
