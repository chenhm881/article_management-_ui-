import Index from "../views/Index";
import Articles from "../views/Articles";

export default [
    {
        component: Index,
        routes: [
            {
                path: "/articles",
                component: Articles,
                exact: true
            }
        ]
    }

];
