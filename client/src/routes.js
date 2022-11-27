import App from "./App";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login.js";
import Home from "./pages/Home.js";
import Register from "./pages/Register";
import CheckAuth from "./utils/checkAuth";
import CheckGuest from "./utils/checkGuest";

export default createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <CheckAuth>
            <Home />
          </CheckAuth>
        ),
      },
      {
        path: "/login",
        element: (
          <CheckGuest>
            <Login />
          </CheckGuest>
        ),
      },

      {
        path: "/register",
        element: (
          <CheckGuest>
            <Register />
          </CheckGuest>
        ),
      },
    ],
  },
]);
