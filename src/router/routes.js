const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        meta: { icon: "people" },
        component: () => import("pages/Index.vue")
      }
    ]
  },
  /** Sayfa içi menu rotaları */
  /*************************************************** */
  /*************************************************** */
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "dashboard",
        meta: { label: "home", icon: "view_day" },
        component: () => import("pages/Index.vue")
      },
      {
        path: "/users",
        name: "users",
        meta: { label: "users", icon: "people" },
        component: () => import("pages/Users.vue")
      },
      {
        path: "/products",
        name: "products",
        meta: { label: "products", icon: "donut_large" },
        component: () => import("pages/Products.vue")
      }
    ]
  },
  /** Tekil sayfa rotaları */
  /*************************************************** */
  {
    path: "/login",
    component: () => import("pages/Login.vue"),
  },
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
