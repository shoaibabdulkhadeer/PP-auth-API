import {
  LogoutOutlined,
  MenuUnfoldOutlined,
  StarFilled,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  Modal,
  Space,
  Typography,
  message,
} from "antd";
import { useEffect, useState } from "react";
import myLogo from "../../../../assets/image/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../../../assets/styles/styles.css";
import { decode, getTitleCase } from "../../../../common/common";
import { reset } from "../../../../redux/features/authentication/loginSlice";
import { LogOut } from "../../../../redux/features/authentication/logoutSlice";
import {
  getRolesEmp,
  isDefaultPatch,
  switchRolesThunk,
} from "../../../../redux/features/employee-management/switchRolesSlice";
import "./Header.css";
import Menubar from "./Menubar";
import { DashboardLink, ErrorPages } from "../../../../shared/enums";

const Header = () => {
  const token: any = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Header } = Layout;
  const { Title } = Typography;
  const [open, setOpen] = useState(false);
  const tokenData: any = decode(token);
  const [userRoles, setUserRoles] = useState([]);
  const [defaultRole, setdefaultRole] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logOutRes } = useSelector((state: any) => state.LogOutAction);

  useEffect(() => {
    const getempRoles = async () => {
      const Roles = await dispatch(getRolesEmp());
      const RolesCode = Roles.payload.code;
      if (RolesCode === 200) {
        const LatestRoles = await Roles.payload.data?.empRoleMappings;
        setUserRoles(LatestRoles);

        const defaultRole = LatestRoles.find(
          (Role: any) => Role.IsDefault === true,
        );
        const latestdefaultRole = defaultRole?.MasterRoleId?.RoleName;
        const defaultRoleName = latestdefaultRole;
        setdefaultRole(defaultRoleName);
      } else {
        navigate(ErrorPages.ERROR_500);
      }
    };

    getempRoles();
  }, [dispatch, navigate]);

  const empName = getTitleCase(tokenData.myDecodedToken?.FullName);

  //#region time for header greet
  let greet;
  let myDate = new Date();
  let hrs = myDate.getHours();
  if (hrs < 12) greet = "Good Morning!";
  else if (hrs >= 12 && hrs <= 17) greet = "Good Afternoon ! ";
  else if (hrs >= 17 && hrs <= 24) greet = "Good Evening ! ";

  //#endregion

  useEffect(() => {
    if (logOutRes?.request?.status === 200) {
      dispatch(reset());
      window.location.replace("/");
      sessionStorage.clear();
    } else if (logOutRes?.request?.status === 500) {
      navigate(ErrorPages.ERROR_500);
    }
  }, [logOutRes, dispatch, navigate]);

  //#region logout function
  async function logout() {
    await dispatch(LogOut());
  }
  //#endregion

  //#region menu drawer
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose: any = (): any => {
    setOpen(false);
  };
  //#endregion

  //#region Profile Model

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //#endregion

  function handleButtonClick(e: any, roleName: any) {
    toast.success(`Switched to ${roleName} Successfully`);
  }
  function errAlertSwitch(e: any, roleName: any) {
    toast.error(`Failed to Switch Role ${roleName}`);
    navigate(ErrorPages.ERROR_500);
  }
  function errmessage() {
    message.error("Something Went Wrong");
    navigate(ErrorPages.ERROR_500);
  }
  function errAlertDefault(e: any) {
    message.error("Failed to switch Default Role");
    navigate(ErrorPages.ERROR_500);
  }

  function handleMenuClick(e: any) {
    toast.success("Default Role changed successfully ✅");
  }

  //#region changing default role

  const ChangeDefaultRole = async (
    roleid: Number,
    roleName: string,
    e: any,
  ) => {
    const defaultResponse = await dispatch(isDefaultPatch(roleid));

    if (
      defaultResponse &&
      defaultResponse.payload &&
      defaultResponse.payload.data
    ) {
      const statusCodeDefault = defaultResponse.payload.data.code;
      if (statusCodeDefault === 200) {
        setdefaultRole(roleName);
        handleMenuClick(e);
      } else {
        errAlertDefault(e);
      }
    } else {
      errmessage();
    }
  };
  //#endregion

  //#region changing roles

  const handleRolechange = async (roleName: any, roleId: any, e: any) => {
    const responseToken = await dispatch(
      switchRolesThunk({ roleid: roleId, roleName: roleName }),
    );

    if (responseToken && responseToken.payload && responseToken.payload.data) {
      const newtoken = responseToken.payload.data.data;
      const statusSwitchCode = responseToken.payload.data.code;
      if (statusSwitchCode === 200) {
        sessionStorage.setItem("token", newtoken);
        sessionStorage.setItem("role", roleName);

        handleButtonClick(e, roleName);
        navigate(DashboardLink.PROGRESS_HIGHLIGHTS);
      } else {
        errAlertSwitch(e, roleName);
      }
    } else {
      errmessage();
    }
  };
  //#endregion
  const extractInitialAndLastLetter = (inputSentence: any) => {
    const words = inputSentence?.split(" "); // Split the sentence into words
    const initialLetter = words[0]?.charAt(0); // Get the initial letter of the first word
    const lastWord = words[words?.length - 1]; // Get the last word
    const lastLetter = lastWord?.charAt(0); // Get the initial letter of the last word

    return initialLetter + lastLetter;
  };

  const menu = (
    <Menu style={{ position: "relative" }} className="switchMenu">
      {userRoles.map((role: any) => {
        return (
          <Menu.Item
            className="dropmenuitems"
            key={role.RoleID}
            style={{
              position: "relative",
              paddingRight: "15px",
            }}
          >
            {role.MasterRoleId.RoleName ===
            tokenData.myDecodedToken?.RoleName ? (
              <div
                style={{
                  cursor: "not-allowed",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    color: "rgb(102, 108, 255)",
                    fontFamily: "Poppins",
                    fontWeight: "500",
                  }}
                >
                  {role.MasterRoleId.RoleName}
                </span>
              </div>
            ) : (
              <div
                onClick={(e: any) =>
                  handleRolechange(role.MasterRoleId?.RoleName, role.RoleID, e)
                }
                title={`Switch to ${role.MasterRoleId.RoleName}`}
              >
                <span
                  style={{
                    fontSize: "13px",
                    color: "rgba(75, 78, 100, 0.87)",
                    fontFamily: "Poppins",
                    fontWeight: "500",
                  }}
                >
                  {role.MasterRoleId.RoleName}
                </span>
              </div>
            )}
            {role.MasterRoleId.RoleName === defaultRole ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "140px",
                  padding: "0px",
                  cursor: "pointer",
                }}
              >
                <StarFilled
                  className="staricon"
                  style={{
                    fontWeight: "bold",
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "15px",
                  }}
                />
              </div>
            ) : (
              <div>
                <StarOutlined
                  title={`Change Default Role`}
                  className="staricon"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "15px",
                  }}
                  onClick={(e) =>
                    ChangeDefaultRole(
                      role.RoleID,
                      role.MasterRoleId.RoleName,
                      e,
                    )
                  }
                />
              </div>
            )}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <Header className="header">
      <div
        style={{
          display: "inline-flex",
          columnGap: "10px",
          alignItems: "center",
        }}
      >
        <Button
          className="header-btn"
          type="text"
          color="#04364A"
          style={{ padding: 0, fontSize: "20px" }}
          onClick={showDrawer}
        >
          <MenuUnfoldOutlined size={500} />
        </Button>
        <Link to={DashboardLink.PROGRESS_HIGHLIGHTS}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "40px", alignItems: "center" }}
              src={myLogo}
              alt="logo"
            />
            &nbsp;&nbsp;
            <Title
              level={1}
              className="title-header"
              style={{
                margin: 0,
                textAlign: "center",
                color: "black",
                display: "inline",
                fontFamily: "'Poppins',sans-serif",
                fontWeight: "400",
                fontSize: "1.3rem",
                padding: 0,
              }}
            >
              <span>Performance</span>{" "}
              <span style={{ color: "green" }}>Pulse</span>
            </Title>
          </div>
        </Link>
        <Menubar onClose={onClose} open={open} tokenData={tokenData} />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          // width: "50%",
          justifyContent: "right",
        }}
      >
        <div>
          {userRoles.length > 1 ? (
            <Dropdown overlay={menu}>
              <Button className="dropbtn">
                <Space
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "500",
                  }}
                >
                  <UserOutlined />
                  Switch Role
                </Space>
              </Button>
            </Dropdown>
          ) : null}
        </div>
        &nbsp;&nbsp;&nbsp;
        <div className="parent_greet_name_header">
          <div className="header_greet_name">
            {/* <p  > */}
            {greet}&nbsp;
            <span style={{ color: "#008000" }}>{empName}&nbsp;</span>
            <span style={{ color: "#008000" }}>
              {`[${tokenData.myDecodedToken?.RoleName}]`}
            </span>
            &nbsp;
          </div>
          {/* </p> */}
        </div>
        <Button
          type="text"
          onClick={showModal}
          style={{ height: "90%" }}
          className="header-btn"
        >
          <Avatar
            className="header-avatar"
            style={{ fontSize: "14px" }}
            size={{ xs: 30, sm: 35, md: 38, lg: 38, xl: 38, xxl: 40 }}
          >
            {extractInitialAndLastLetter(tokenData.myDecodedToken?.FullName)}
          </Avatar>
        </Button>
        <Modal
          onCancel={handleCancel}
          width={250}
          closable={false}
          style={{ position: "absolute", top: 75, right: 20 }}
          open={isModalOpen}
          footer={null}
        >
          <div className="header_model_text">
            <div className="header-model-fn">
              {tokenData.myDecodedToken?.FullName}
            </div>
            <div className="header-model-un">
              {tokenData.myDecodedToken?.Username}
            </div>
          </div>
          <hr />
          <br />
          <Button
            className="logout-btn"
            onClick={logout}
            type="primary"
            style={{
              width: "100%",
              fontSize: "17px",
              padding: 0,
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Logout
            <LogoutOutlined />
          </Button>
        </Modal>
      </div>
    </Header>
  );
};

export default Header;
