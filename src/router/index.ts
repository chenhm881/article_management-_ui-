import Index from "../views/Index";
import Articles from "../views/Articles";
import Publish from "../views/Publish";

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
