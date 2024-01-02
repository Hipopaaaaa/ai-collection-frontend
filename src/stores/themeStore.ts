import { defineStore } from "pinia";
import { selectTheme } from "@/utils/theme";
import { ref } from "vue";
export const usethemeStore = defineStore("themeStore", () => {
  const theme = ref("dark");
  const darkLogo = "";
  const lightLogo = "";
  const themeLogo = ref(darkLogo);
  function switchTheme(data: string) {
    selectTheme(data);
    theme.value = data;
    data == "dark"
      ? (themeLogo.value = darkLogo)
      : (themeLogo.value = lightLogo);
  }
  return { theme, switchTheme, themeLogo };
});
