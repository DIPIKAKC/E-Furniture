import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayOut from "./components/global/RootLayOut";
import Shop from "./Pages/User/Shop";
import Home from "./Pages/User/Home";
import ProductDetail from "./Pages/User/ProductDetail";
import CartSidebar from "./components/global/CartSidebar";
import Cart from "./Pages/User/Cart";
import Authentication from "./Pages/User/Authentication";
import Checkout from "./Pages/User/Checkout";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayOut />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/shop',
        element: <Shop />
      },
      {
        path: '/product',
        element: <ProductDetail />
      },
      {
        path: '/cartside',
        element: <CartSidebar />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/authentication',
        element: <Authentication />
      },
      {
        path: '/checkout',
        element: <Checkout />
      }
    ]

  }

]);

export default function App() {
  return <RouterProvider router={router} />
}