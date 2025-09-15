import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Test from "./components/Test";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Feed from "./components/Feed";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import About from "./components/About";
import Chat from "./components/Chat";

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
        path:"/connections",
        element:<Connections/>
      },
      {
        path:"/requests",
        element:<Requests/>
      },
      {
        path: "/test",
        element: <Test />,
      },
      {
        path:"/about",
        element:<About/>
      },
      {
        path:"/profile",
        element:<Profile/>
      },
      {
        path:"/chat/:targetUserId",
        element:<Chat/>
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
