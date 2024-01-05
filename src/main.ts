import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/scss/index.scss";
import "@/assets/iconfont/index.scss";
import "@/utils/vantStyle"

const app = createApp(App);

import router from "./router";
import "@/router/permission";

app.use(router);

import store from "./stores";

app.use(store);

app.mount("#app");
