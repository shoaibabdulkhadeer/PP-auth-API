import {
  ContainerOutlined,
  DesktopOutlined,
  DoubleLeftOutlined,
  StarOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import "./menu.css";
import myLogo from "../../../../assets/image/logo.png";
import { Drawer, Menu, MenuProps, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../../assets/styles/styles.css";
import {
  DashboardLink,
  EmployeeLink,
  MastersLink,
} from "../../../../shared/enums";

const Menubar = (props: any) => {
  const navigate = useNavigate();
  const { Title } = Typography;
  const { open, onClose } = props;
  const role = sessionStorage.getItem("role");
  const [selectedMenu, setMenu] = useState<any>("");
  type MenuItem = Required<MenuProps>["items"][number];
  const location: any = useLocation();

  useEffect(() => {
    const matchingItem: any = items.find((item: any) => {
      if (item?.children) {
        return item?.children.some(
          (child: any) => child?.key === location.pathname,
        );
      }
      return item?.key === location.pathname;
    });

    if (matchingItem) {
      if (matchingItem?.children) {
        setOpenKeys([matchingItem?.key]);
      } else {
        setOpenKeys([]);
      }
      setMenu(location.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, role]);

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    children?: MenuItem[],
    type?: "group",
  ): MenuItem {
    return {
      key,
      children,
      label,
      type,
    } as MenuItem;
  }

  //#region menubar list
  const items: MenuItem[] = [
    getItem(
      <Title level={5} className="menu-titles">
        <UserOutlined className="menu-icon" />
        &nbsp;&nbsp;My Profile
      </Title>,
      EmployeeLink.PROFILE,
    ),
    getItem(
      <Title level={5} className="menu-titles">
        <DesktopOutlined className="menu-icon" />
        &nbsp;&nbsp;Dashboard
      </Title>,
      "Dashboard",
      [
        getItem(
          <p className="sub-menu">Progress Highlights</p>,
          DashboardLink.PROGRESS_HIGHLIGHTS,
        ),
        getItem(
          <p className="sub-menu">Efficiency Analytics</p>,
          DashboardLink.EMP_EFFICIENCY,
        ),
      ],
    ),

    role === "Employee"
      ? null
      : getItem(
          <Title level={5} className="menu-titles">
            <StarOutlined className="menu-icon" />
            &nbsp;&nbsp;Masters
          </Title>,
          "Masters",
          [
            getItem(
              <p className="sub-menu">Projects</p>,
              MastersLink.MASTER_PROJECTS,
            ),
            getItem(
              <p className="sub-menu">Skills</p>,
              MastersLink.MASTER_SKILLS,
            ),
            getItem(
              <p className="sub-menu">Certificates</p>,
              MastersLink.MASTER_CERTIFICATE,
            ),
          ],
        ),

    role === "Employee"
      ? null
      : getItem(
          <Title level={5} className="menu-titles">
            <UsergroupAddOutlined className="menu-icon" />
            &nbsp;&nbsp;Manage Employees
          </Title>,
          EmployeeLink.EMP_MANAGEMENT,
        ),

    role === "Reporting Manager"
      ? getItem(
          <Title level={5} className="menu-titles">
            <ContainerOutlined className="menu-icon" />
            &nbsp;&nbsp;Monthly Report
          </Title>,
          EmployeeLink.MONTHLY_REPORT,
        )
      : null,
  ];
  //#endregion
  const [openKeys, setOpenKeys] = useState<any>([]);

  const handleOpenChange = (newOpenKeys: any) => {
    setOpenKeys(newOpenKeys);
  };

  //#region page navigation
  const onClick: MenuProps["onClick"] = (e: any) => {
    navigate(e.key);
    onClose();
  };
  //#endregion

  return (
    <div>
      <Drawer
        title={
          <div
            style={{
              color: "black",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "25px", alignItems: "center" }}
              src={myLogo}
              alt="logo"
            />{" "}
            Performance <span style={{ color: "green" }}>Pulse</span>
          </div>
        }
        onClose={onClose}
        width={250}
        closable={false}
        style={{ backgroundColor: "#FFF" }}
        placement="left"
        extra={
          <Space>
            <DoubleLeftOutlined onClick={onClose} />
          </Space>
        }
        open={open}
      >
        <div>
          <Menu
            onClick={onClick}
            selectedKeys={[selectedMenu]}
            openKeys={openKeys}
            onOpenChange={handleOpenChange}
            mode="inline"
            items={items}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default Menubar;
