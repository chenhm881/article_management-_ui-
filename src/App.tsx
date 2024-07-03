import React from 'react';
import Publish from "./views/Publish";
import Index from './views/Index';
import Register from "./views/Register";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Index />,
    },
    {
        path: '/About',
        element: <Index />,
    },
    {
        path: '/Articles',
        element: <Index />,
    },
    {
        path: '/Archive',
        element: <Index />,
    }
]);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
