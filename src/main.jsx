import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Test from "./components/test";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Feed from "./components/Feed";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/test",
        element: <Test />,
      },
      {
        path: "/",
        element: <Feed />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={appStore}>
    <RouterProvider router={appRouter} />
  </Provider>
);
