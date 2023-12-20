import { useEffect, useState } from "react";
import "./AutnLoader.css";
import { useLocation, useNavigate } from "react-router-dom";
import { OAuth } from "../../environment/environment";
import { useDispatch, useSelector } from "react-redux";
import { loginApi } from "../../redux/features/authentication/loginSlice";
import { toast } from "react-toastify";
import { DashboardLink } from "../../shared/enums";

const AuthLoader = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { loggedIn } = useSelector((state: any) => state.LoginAction);

  useEffect(() => {
    console.log(location);
    
    const code = new URLSearchParams(location.search).get("code");
    let perameter = {
      authType: "Microsoft",
      authKey: code,
      state: {
        uniqueid: Math.floor(Math.random() * 0xffffff * 1000000).toString(16),
        return_uri: "http://localhost:3000/",
        redirect_uri: OAuth.REDIRECT_URL,
      },
    };
    dispatch(loginApi(perameter));
  }, [location.search]);

  useEffect(() => {
    if (loggedIn?.request?.status === 200) {
      sessionStorage.setItem("token", loggedIn?.data?.data.token);
      sessionStorage.setItem("role", loggedIn?.data?.data.role);
      setLoading(false);
      navigate(DashboardLink.PROGRESS_HIGHLIGHTS);
    } else if (
      loggedIn?.request?.status >= 400 &&
      loggedIn?.request?.status <= 499
    ) {
      setLoading(false);
      toast.warning("Please enter valid Username / Password");
    } else {
      setLoading(false);
      toast.error(loggedIn?.data?.message);
    }
  }, [loggedIn, navigate]);
  return (
    <div className="loading-container">
      <div>
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default AuthLoader;
