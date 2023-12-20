import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import EmployeeManagementHeader from "./Header";

const { Content } = Layout;

const EmployeeDetailsLayout = () => {
  return (
    <div
      style={{
        borderRadius: "1rem",
      }}
    >
      <Layout className="layout" style={{ borderRadius: "1rem" }}>
        {/* <div className="empInfo_mob">
          <EmployeeInfo />
        </div> */}

        <EmployeeManagementHeader />

        <Content
          style={{
            background: "#fff",
            marginTop: "0.2rem",

            paddingBottom: "1.5rem",
            minHeight: "350px",
            borderRadius: "1rem",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </div>
  );
};

export default EmployeeDetailsLayout;
