import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import UserForm from "./Components/UserForm";
import UserList from "./Components/UserList";
import UserDetail from "./Components/UserDetail";
import UpdateUser from "./Components/UpdateUser.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/userform",
    element: <UserForm />,
  },
  {
    path: "/userlist",
    element: <UserList />,
  },
  {
    path: `/userdetail/:id`,
    element: <UserDetail />,
  },
  {
    path: "/updateuser/:id",
    element: <UpdateUser />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RouterProvider>
);
