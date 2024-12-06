import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function Protected({ children, authentication = true }) {
   const authStatus = useSelector((state) => state.auth.status);
   const [loader, setLoading] = useState(true);
   const navigate = useNavigate();

   useEffect(() => {
      //TODO: make it more easy to understand

      // if (authStatus === true) {
      //    navigate("/");
      // }
      // if (authStatus === false) {
      //    navigate("/login");
      // }

      //let authValue = authStatus === true ? true : false

      if (authentication && authStatus !== authentication) {
         navigate("/login");
      } else if (!authentication && authStatus !== authentication) {
         navigate("/");
      }
      setLoading(false);
   }, [authStatus, navigate, authentication]);

   return loader ? <Loader /> : <>{children}</>;
}
