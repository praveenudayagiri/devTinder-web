import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Test from "./components/test";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
          path: "/login",
          element: <Login />,
        },
        {
          path:"/test",
          element:<Test/>
        }
      ]
    },
  ]);



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);

