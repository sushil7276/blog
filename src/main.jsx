import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import { Protected } from "./components/index.js";

/* ---------  Pages --------------- */
import Home from "./components/pages/Home.jsx";
import Login from "./components/pages/Login.jsx";
import SignUp from "./components/pages/SignUp.jsx";
import AllPosts from "./components/pages/AllPosts.jsx";
import AddPost from "./components/pages/AddPost.jsx";
import EditPost from "./components/pages/EditPost.jsx";
import Post from "./components/pages/Post.jsx";

const router = createBrowserRouter([
   {
      path: "/",
      element: <App />,
      children: [
         {
            path: "/",
            element: <Home />,
         },
         {
            path: "/login",
            element: (
               <Protected authentication={false}>
                  <Login />
               </Protected>
            ),
         },
         {
            path: "/signup",
            element: (
               <Protected authentication={false}>
                  <SignUp />
               </Protected>
            ),
         },
         {
            path: "/all-posts",
            element: (
               <Protected authentication>
                  <AllPosts />
               </Protected>
            ),
         },
         {
            path: "/add-post",
            element: (
               <Protected authentication>
                  <AddPost />
               </Protected>
            ),
         },
         {
            path: "/edit-post/:slug",
            element: (
               <Protected authentication>
                  <EditPost />
               </Protected>
            ),
         },
         {
            path: "/post/:slug",
            element: <Post />,
         },
      ],
   },
]);

createRoot(document.getElementById("root")).render(
   <StrictMode>
      <Provider store={store}>
         <RouterProvider router={router} />
      </Provider>
   </StrictMode>
);
