/**
 * Main entry point for Vue app
 */
import { createApp } from "vue";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from "./App.vue";
import router from "./router/index.js";
import "./assets/main.css";

const app = createApp(App);

// Setup Pinia
app.use(createPinia());

// Setup Vue Router
app.use(router);

// Setup Toast
const toastOptions = {
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
};
app.use(Toast, toastOptions);

// Mount app
app.mount("#app");
