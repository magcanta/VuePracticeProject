import Vue from "vue";
import VueRouter from "vue-router";
import AppView from "../views/AppView.vue";
import { auth } from "../store/store.js";

Vue.use(VueRouter);

const routeGuard = (to , from, next) => {
  var isAuthenticated = auth.isLoggedIn
  console.log(isAuthenticated)
  if((to.name !== "login" && to.name !== "register") && !isAuthenticated) {
    console.log("redirect")
    next({name: "login"})
  } else if((to.name === "login" || to.name === "register") && isAuthenticated) {
    next({name: "/"})
  }
   else next()
}

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "/",
      beforeEnter: routeGuard,
      redirect: { name: 'app'}
    },
    {
      path: '/app',
      name: 'app',
      component: AppView,
      redirect: { name: 'dashboard'},
      children: [
          {
            path: 'dashboard',
            name: 'dashboard',
            beforeEnter: routeGuard,
            component: () => import("../views/DashboardView.vue")
          },
          {
            path: 'about',
            name: 'about',
            beforeEnter: routeGuard,
            component: () => import("../views/AboutView.vue")
          }
      ]
    },
    {
      path: "/login",
      name: "login",
      beforeEnter: routeGuard,
      component: () => import("@/views/LoginView.vue")
    },
    {
      path: '/register',
      name: 'register',
      beforeEnter: routeGuard,
      component: () => import('../views/RegisterView.vue')
    },
    {
      // Unknown path
      // TODO: Rediret to UnknownPath component
      path:'*',
      redirect: '/'
    }
  ],
});

export default router;
