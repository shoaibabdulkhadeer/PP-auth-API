import { Navigate } from "react-router";
import { decode } from "../common/common";
import { useDispatch } from "react-redux";
import { LogOut } from "../redux/features/authentication/logoutSlice";
import { reset } from "../redux/features/authentication/loginSlice";
import { ErrorPages } from "../shared/enums";

const PrivateRoute = ({
  children,
  roles,
}: {
  children: JSX.Element;
  roles: any;
}) => {
  const dispatch = useDispatch();
  const isAuthenticated = sessionStorage.getItem("token") ? true : false;
  const isRole = sessionStorage.getItem("role") ? true : false;

  if (!isAuthenticated || !isRole) {
    window.location.replace("/");
  }

  const getRole = sessionStorage.getItem("role");
  const userRole = getRole ? getRole : "";
  const userHasRequiredRole = roles.includes(userRole);
  const token = sessionStorage.getItem("token");
  let deodedToken: any;
  //#region on token expaires navigate to login
  if (token) {
    deodedToken = decode(token);
    if (deodedToken.expTokenTime) {
      dispatch(reset());
      dispatch(LogOut());
      sessionStorage.clear();
      return <Navigate to="/" />;
    }
  }
  //#endregion

  //#region checking Token and user Role

  if (!userHasRequiredRole && isAuthenticated) {
    return <Navigate to={ErrorPages.ERROR_403} />;
  }
  return children;
};
//#endregion

export default PrivateRoute;
