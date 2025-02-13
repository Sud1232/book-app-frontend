import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";
import SingleBook from "../pages/books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import OrdersPage from "../pages/books/OrdersPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import AddBook from "../pages/dashboard/addBook/AddBook";
import UpdateBook from "../pages/dashboard/EditBook/UpdateBook";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/orders",
        element: <PrivateRoute><OrdersPage /></PrivateRoute>
      },
      {
        path: "/about",
        element: <div>About</div>
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/cart",
        element: <CartPage />
      },
      {
        path: "/checkout",
        element: <PrivateRoute>
          <CheckoutPage />
        </PrivateRoute>
      },
      {
        path: "/books/:id",
        element: <SingleBook />
      }
    ]
  },
  {
    path: "/admin",
    element: <AdminLogin />
  },
  {
    path: "/dashboard",
    element: <AdminRoute>
      <DashboardLayout />
    </AdminRoute>,
    children: [
      {
        path: "",
        element: <AdminRoute><Dashboard /></AdminRoute>
      },
      {
        path: "add-new-book",
        element: <AdminRoute><AddBook /></AdminRoute>
      },
      {
        path: "edit-book/:id",
        element: <AdminRoute><UpdateBook /></AdminRoute>
      },
      {
        path: "manage-books",
        element: <AdminRoute><div>Manage Book</div></AdminRoute>
      },
    ]
  }
]);

export default router;