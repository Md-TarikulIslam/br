import logo from "./logo.svg";
import "./App.css";
import Homepage from "./components/Pages/Homepage/Homepage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import router from "./Routes";

function App() {
  return (
    <div className="">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
