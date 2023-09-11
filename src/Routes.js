import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/:id",
        element: <DetailsPage />,
    },
]);

export default router;
