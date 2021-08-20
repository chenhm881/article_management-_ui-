import Index from "../views/Index";
import BFooter from "../components/BFooter";
import BTab from "../views/BTab";
import Articles from "../views/Articles";

export default [
  {
    path:"/",
    component: Index,
    routes: [
      {
        path: "/",
        exact: true,
        component: Articles
      },
      {
        path: "/2",
        component: BFooter,
      },
      {
        path: "/3",
        component: BTab,
        routes: [
          {
            path: "/child/:id/grand-child",
            component: Index
          }
        ]
      }
    ]
  },
  {
    path:"/logout",
    component: Index
  }
];
