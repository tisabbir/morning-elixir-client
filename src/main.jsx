import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./Components/Error";
import Login from "./Components/Login";
import Register from "./Components/Register";
import "./index.css";
import Home from "./Layouts/Home";
import Root from "./routes/Root";
import AddCoffee from "./Components/AddCoffee";
import UpdateCoffe from "./Components/UpdateCoffe";
import AuthProvider from "./Providers/AuthProvider";
import Users from "./Components/Users";

// Tanstack imports
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Users2 from "./Components/Users2";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: ()=>fetch('http://localhost:5000/coffee')
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/add",
        element: <AddCoffee />,
      },
      {
        path: "/update/:id",
        element: <UpdateCoffe />,
        loader: ({params}) =>fetch(`http://localhost:5000/coffee/${params.id}`)
      },
      {
        path: "/users",
        element: <Users />,
        loader: ()=>fetch('http://localhost:5000/users')
      },
      {
        path: "/users2",
        element: <Users2 />,
        loader: ()=>fetch('http://localhost:5000/users')
      },
    ],
  },
]);


// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
    </QueryClientProvider>
    
  </React.StrictMode>
);
