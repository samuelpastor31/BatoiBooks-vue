import { createWebHistory, createRouter } from "vue-router";

import BooksList from "@/components/BooksList.vue";
import AddBooks from "@/components/AddBooks.vue";
import AboutView from "../views/AboutView.vue";
import AppCart from "@/components/AppCart.vue";

const routes = [
  { path: "/", component: BooksList },
  { path: "/form", component: AddBooks },
  { path: "/about", component: AboutView },
  { path: "/cart", component: AppCart },
  { path: "/edit/:id", component: AddBooks, props: true },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// router.afterEach("/edit/:id", "/form") {
//   console.log('Vengo de ' + from + ' y voy a ' + to);
// }

export default router
