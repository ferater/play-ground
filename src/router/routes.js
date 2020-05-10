const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("pages/Login.vue"),
  },
  /** Sayfa içi menu rotaları */
  /*************************************************** */
  /*************************************************** */
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { label: "home", icon: "la la-chrome" },
        component: () => import("pages/Index.vue")
      },
      {
        path: "/users",
        name: "users",
        meta: { label: "users", icon: "las la-user-tie" },
        component: () => import("pages/Users.vue")
      },
      {
        path: "/products",
        name: "products",
        meta: { label: "products", icon: "las la-barcode" },
        component: () => import("pages/Products.vue")
      },
      {
        path: "/categories",
        name: "categories",
        meta: { label: "categories", icon: "las la-dragon" },
        component: () => import("pages/Categories.vue")
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
