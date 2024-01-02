import { defineStore } from "pinia";

export const useLayout = defineStore("LayoutSetting", () => {
  function toggle() {
    const sider = document.querySelector(".SiderContent .content") as Element;
    const siderContent = document.querySelector(".SiderContent") as Element;
    sider.classList.toggle("hide");
    siderContent.classList.toggle("hide");
  }
  function add() {
    const sider = document.querySelector(".SiderContent .content") as Element;
    const siderContent = document.querySelector(".SiderContent") as Element;
    sider.classList.add("hide");
    siderContent.classList.add("hide");
  }
  function remove() {
    const sider = document.querySelector(".SiderContent .content") as Element;
    const siderContent = document.querySelector(".SiderContent") as Element;
    sider.classList.remove("hide");
    siderContent.classList.remove("hide");
  }
  return { toggle, add, remove };
});
