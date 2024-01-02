import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/scss/index.scss";
import "@/assets/iconfont/index.scss";

// Toast
import "vant/es/toast/style";
// Dialog
import "vant/es/dialog/style";
// Notify
import "vant/es/notify/style";
// ImagePreview
import "vant/es/image-preview/style";

const app = createApp(App);

import router from "./router";
import "@/router/permission";

app.use(router);

import store from "./stores";

app.use(store);

app.mount("#app");
