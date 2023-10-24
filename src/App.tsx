import {
  BrowserRouter as Router,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout children={undefined}></Layout>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },

      {
        path: "/about",
        element: <HomePage />,
      },

      {
        path: "/contact-us",
        element: <HomePage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
