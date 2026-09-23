import App from "../App"
import Login from "../pages/login";
import Register from "../pages/register";
import Home from "../pages/home";
import Profile from "./profile";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "profile",
        element: <Profile/>,
      },
    ],
  },
];

export default routes;
