import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth.service";
import { login, logout } from "./store/AuthSlice";
import { Footer, Header, Loader } from "./components/index";

function App() {
   const [loading, setLoading] = useState(false);
   const dispatch = useDispatch();

   useEffect(() => {
      authService
         .getCurrentUser()
         .then((userData) => {
            if (userData) {
               dispatch(login({ userData }));
            } else {
               dispatch(logout());
            }
         })
         .finally(() => setLoading(false));
   }, [dispatch]);

   return !loading ? (
      <>
         <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
            <div className='w-full block'>
               <Header />

               <main>{/* Outlet */}</main>

               <Footer />
            </div>
         </div>
      </>
   ) : (
      <Loader />
   );
}

export default App;
