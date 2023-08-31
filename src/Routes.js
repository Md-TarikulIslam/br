import { createBrowserRouter } from "react-router-dom";
import Homepage from "./components/Pages/Homepage/Homepage";
import Details from "./components/Pages/Homepage/Details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/:id",
    element: <Details />,
  },
]);
export default router;
