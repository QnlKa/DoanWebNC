import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";
const ProtectedRouter = ({ children, allowedRoles }) => {
  const { token, role } = useContext(authContext);

  const isAllowed = allowedRoles.includes(role);

  const accessibleRoute =
    token && isAllowed ? children : <Navigate to="/loginadmin" replace={true} />;
  return accessibleRoute;
};

export default ProtectedRouter;
