import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayOut from "./components/global/RootLayOut";
import Home from "./Pages/User/Home";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayOut />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]

  }

]);

export default function App() {
  return <RouterProvider router={router} />
}