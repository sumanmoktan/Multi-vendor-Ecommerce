import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../component/Layout/Loader";

const SellerProtectedRoute = ({ children }) => {
  const { isLoading, isSeller } = useSelector((state) => state.seller);

  if (isLoading === true) {
    // Loading state, you might want to render a loading spinner or component
    return <Loader />;; // Or render a loading spinner or component here
  }

  if (!isSeller) {
    // User is not a seller, redirect to shop login page
    return <Navigate to={`/shop-login`} replace />;
  }

  // User is a seller, render the protected route's children
  return children;
};

export default SellerProtectedRoute;
