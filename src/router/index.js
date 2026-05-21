/**
 * Vue Router configuration
 */
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/authStore.js";

// Placeholder pages - will be created later
const routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/Login.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../pages/Register.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../pages/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: () => import("../pages/Tasks.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/**
 * Navigation guard - check authentication
 */
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to login if trying to access protected route
    next("/login");
  } else if (!to.meta.requiresAuth && isAuthenticated && (to.path === "/login" || to.path === "/register")) {
    // Redirect to dashboard if already logged in and trying to access login/register
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
