import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Test from "./components/test";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Feed from "./components/Feed";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Profile from "./components/Profile";

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
      {
        path:"/profile",
        element:<Profile/>
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={appStore}>
    <RouterProvider router={appRouter} />
  </Provider>
);
