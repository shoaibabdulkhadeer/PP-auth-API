import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../redux/features/authentication/loginSlice";
import myImage from "../../assets/image/logimg.png";
import myLogo from "../../assets/image/logo.png";
import BImage from "../../assets/image/login_bg.png";
import { toast } from "react-toastify";
import "./LoginCss.css";
import "react-toastify/dist/ReactToastify.css";
import { logCred } from "../../utils/interfaces";
import { DashboardLink } from "../../shared/enums";
import { JSEncrypt } from "jsencrypt";
import { key } from "../../utils/keys";
import msicon from "../../assets/image/windows logo.webp";
import { GoogleLogin } from "react-google-login";
import { useLocation } from "react-router-dom";


import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { googleAuth } from "../../environment/environment";

export default function LoginCred() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: googleAuth.CLIENT_ID,
        scope: "profile",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { loggedIn } = useSelector((state: any) => state.LoginAction);

  // const clientId =
  //   "764511151007-bfaubmu33e41gmludj73cfgjcgss14jv.apps.googleusercontent.com";

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

  //#region ------- Styling ----------------
  const style2 = {
    width: 500,
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    width: "55%",
    height: 480,
    justifyContent: "space-around",
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: "10px",
    border: "2px solid white",
    boxShadow: "rgba(76, 78, 100, 0.22) 0px 2px 10px 0px",
  };
  //#endregion

  function encryptPassword(Password: string): any {
    var jsEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(key.PUBLIC_KEY);
    return jsEncrypt.encrypt(Password);
  }

  //#region ----- to submit login ---------------
  const onFinish = async (values: logCred) => {
    setLoading(true);
    values.authType = "Credentials";
    values.Username = values.Username.trim();
    values.Password = await encryptPassword(values.Password.trim());
    await dispatch(loginApi(values));
  };
  //#endregion

  const ongoogleSuccess = async (res: any) => {
    const prof = res.profileObj;
    let perameter = {
      res: res,
      prof: res.profileObj,
      authType: "Google",
      email: prof.email,
    };
    console.log(perameter);
    
    await dispatch(loginApi(perameter));
  };

  const ongoogleFailure = (res: any) => {
    if (res.error) {
      console.log("Login Failed !", res.error);
    } else {
      console.log("Login Failed for an unknown reason. Full response:", res);
    }
  };

  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${BImage})`,
        minHeight: "100vh",
      }}
    >
      <div style={style} className="login-background">
        <div style={{ width: 600, padding: "0px 20px" }}>
          <h1 className="log-text">
            <img
              style={{ width: "40px", alignItems: "center" }}
              src={myLogo}
              alt="logo"
            />
            <span style={{ marginTop: "15px" }}>
              Performance <span style={{ color: "green" }}>Pulse</span>
            </span>
          </h1>
          <br />
          <p
            className="log-text"
            style={{
              fontFamily: "'Roboto',sans-serif",
              fontSize: "15PX",
              color: "grey",
            }}
          >
            Performance Metrics at your Fingertips
          </p>
          <hr />
          <br />
          <br />
          <Form
            name="normal_login"
            className="login-form"
            autoComplete="off"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="Username"
              rules={[
                {
                  required: true,
                  message: "Please enter your Username!",
                },
                {
                  required: false,
                  pattern: new RegExp(/.*@g7cr\.com$/),
                  message: "Please enter valid g7cr Username!",
                },
              ]}
            >
              <Input
                autoFocus
                prefix={<UserOutlined className="site-form-item-icon" />}
                style={{
                  height: 50,
                  border: "1px solid #ddd",
                  color: "rgb(14 194 160)",
                }}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="Password"
              rules={[
                {
                  required: true,
                  message: "Please enter your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                style={{
                  height: 50,
                  border: "1px solid #ddd",
                  color: "rgb(14 194 160)",
                }}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "0",
              }}
            >
              <Button
                type="primary"
                loading={loading}
                style={{
                  width: 200,
                  height: 40,
                  backgroundColor: "rgb(14 194 160)",
                  border: "1px solid white",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
                htmlType="submit"
                className="login-form-button "
              >
                {loading ? "Redirecting" : "Login"}
              </Button>
            </Form.Item>
            <p style={{ margin: "0px", textAlign: "center" }}>or</p>
            <Form.Item style={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="primary"
                style={{
                  width: 200,
                  height: 40,
                  border: "1.5px solid rgb(14 194 160)",
                  backgroundColor: "#EEF5FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgb(14 194 160)",
                }}
                className="login-form-button "
                onClick={() => navigate("/loginMs")}
              >
                {<img style={{ width: "25px" }} src={msicon} alt="icon" />}
                &nbsp; &nbsp;&nbsp;
                <span style={{ fontWeight: "500" }}>Microsoft</span>
              </Button>
              <p style={{ margin: "0px", textAlign: "center" }}>or</p>

              <GoogleLogin
                clientId={googleAuth.CLIENT_ID}
                buttonText="Login"
                onSuccess={ongoogleSuccess}
                onFailure={ongoogleFailure}
                theme="light"
                cookiePolicy={"single_host_origin"}
                className="custom-google-login"
              />

            </Form.Item>
          </Form>
        </div>
        <span style={style2} className="login-image">
          <Image
            style={{ height: 400, borderRadius: "10px" }}
            preview={false}
            src={myImage}
          />
        </span>
      </div>
    </div>
  );
}
