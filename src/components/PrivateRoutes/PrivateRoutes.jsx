// src/routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Ui/Input/Loader/Loader";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, loading } = useSelector((state) => state.admin);

  // If loading is true, you can render a loading spinner or placeholder
  if (loading) {
    return (
      <div className="w-full flex justify-center">
        <Loader size="h-20 w-20" />
      </div>
    );
  }

  // If user is not logged in, redirect to the login page
  return isLoggedIn ? children : <Navigate to="/admin-login" />;
};

export default PrivateRoute;
