/**
 * Main entry point for Vue app
 */
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router/index.js";
import "./assets/main.css";

const app = createApp(App);

// Setup Pinia
app.use(createPinia());

// Setup Vue Router
app.use(router);

// Mount app
app.mount("#app");
