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
import { useEffect, useState } from "react";
import { logCred } from "../../utils/interfaces";
import { DashboardLink } from "../../shared/enums";
import { encryption } from "../../common/common";
import { OAuth } from "../../environment/environment";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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
    height: 400,
    justifyContent: "space-around",
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: "10px",
    border: "2px solid white",
    boxShadow: "rgba(76, 78, 100, 0.22) 0px 2px 10px 0px",
  };
  //#endregion

  //#region ----- to submit login ---------------
  const onFinish = async (values: logCred) => {
    values.Username = values.Username.trim();
    window.location.replace(
      `https://login.microsoftonline.com/${OAuth.TENANT_ID}/oauth2/v2.0/authorize?client_id=${OAuth.CLIENT_ID}&prompt=select_account&response_type=code&redirect_uri=${OAuth.REDIRECT_URL}&response_mode=query&scope=${OAuth.NEXT_PUBLIC_SCOPE}&state=state&login_hint=${values.Username}`,
    );
  };
  //#endregion

  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${BImage})`,
        minHeight: "100vh",
      }}
    >
      <div style={style} className="login-background">
        <div style={{ width: 500, padding: "0px 20px" }}>
          <h1 className="log-text">
            <img
              style={{ width: "40px", alignItems: "center" }}
              src={myLogo}
              alt="logo"
            />
            <span>
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
            <Form.Item style={{ display: "flex", justifyContent: "center" }}>
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
