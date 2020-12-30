import { createRouter, createWebHashHistory } from "vue-router";
import Meeting from "../views/Meeting.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Space from "../views/Space.vue";

const routes = [
  {
    path: "/",
    name: "Meeting",
    component: Meeting
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/space",
    name: "Space",
    component: Space
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
