import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayOut from "./components/global/RootLayOut";
import Shop from "./Pages/User/Shop";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayOut />,
    children: [
      {
        index: true,
        element: <Shop />
      }
    ]

  }

]);

export default function App() {
  return <RouterProvider router={router} />
}