import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Protected = ({ children, authenticated = true }) => {
   const authStatus = useSelector((state) => state.auth.status);
   const [loading, setLoading] = useState(true);
   const navigate = useNavigate();

   useEffect(() => {
      if (authenticated && authStatus !== authenticated) {
         navigate("/login");
      } else if (!authenticated && authStatus !== authenticated) {
         navigate("/");
      }
      setLoading(false);
   }, [authStatus, navigate, authenticated]);

   return loading ? <Loader /> : <>{children}</>;
};

export default Protected;
