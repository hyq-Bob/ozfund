import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name:"rootLayout",
    component: () => import("@/components/Layout"),
    // redirect: "/homes",
    children: [
      // {
      //   path: "/homes",
      //   name: "Homes",
      //   component: () => import("@/views/Home/index.vue"),
      //   meta: { title: "首页" }
      // },
      
      // {
      //   path: "/zoology",
      //   name: "Zoology",
      //   component: () => import("@/views/Zoology/index.vue"),
      //   meta: { title: "生态" }
      // },
      // {
      //   path: "/purchase",
      //   name: "Purchase",
      //   component: () => import("@/views/Purchase/index.vue"),
      //   meta: { title: "购买与质押" }
      // },
      // {
      //   path: "/presale",
      //   name: "Presale",
      //   component: () => import("@/views/Presell/index.vue"),
      //   meta: { title: "TOTO预售" }
      // },
      // {
      //   path: "/progress",
      //   name: "Progress",
      //   component: () => import("@/views/Progress/index.vue"),
      //   meta: { title: "进程" }
      // },
      // {
      //   path: "/dynamic",
      //   name: "Dynamic",
      //   component: () => import("@/views/Dynamic/index.vue"),
      //   meta: { title: "动态" }
      // },
      {
        path: "/notice",
        name: "Notice",
        component: () => import("@/views/Notice/index.vue"),
        meta: { title: "公告" }
      },
      {
        path: "/qa",
        name: "Qa",
        component: () => import("@/views/Qa/index.vue"),
        meta: { title: "常见问题" }
      },
      // {
      //   path: "/test",
      //   name: "Test",
      //   component: () => import("@/views/Test"),
      //   meta: { title: "测试mobile" }
      // }
    ]
  },
  {
    path: "/home/zoology",
    name: "HomeZoology",
    component: () => import("@/views/HomeZoology/index.vue"),
    meta: { title: "生态通证" }
  },
  {
    path: "/home/toto",
    name: "HomeToto",
    component: () => import("@/views/HomeToto/index.vue"),
    meta: { title: "TOTO兑换" }
  },
  {
    path: "/purchase/ozc",
    name: "PurchaseOzc",
    component: () => import("@/views/Purchase/Conversion/index.vue"),
    meta: { title: "OZC兑换" }
  },
  {
    path: "/purchase/plan",
    name: "PurchasePlan",
    component: () => import("@/views/Purchase/Plan/index.vue"),
    meta: { title: "分配计划" }
  },
  {
    path: "/purchase/Pledge",
    name: "PurchasePledge",
    component: () => import("@/views/Purchase/Pledge/index.vue"),
    meta: { title: "质押" }
  },
  {
    path: "/purchase/Extract",
    name: "PurchaseExtract",
    component: () => import("@/views/Purchase/Extract/index.vue"),
    meta: { title: "提取" }
  },
  {
    path: "/qa/mobile",
    name: "QaMobile",
    component: () => import("@/views/QaMobile/index.vue"),
    meta: { title: "常见问题" }
  },
  {
    path: "/view-pdf",
    name: "view-pdf",
    component: () => import("@/views/pdfViewer/index.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  scrollBehavior:()=>({x:0,y:0}),
  base: process.env.BASE_URL,
  routes
});

export default router;
