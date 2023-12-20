import { Layout } from "antd";
import { Outlet } from "react-router-dom";
const { Content } = Layout;
export default function EmployeeManagement() {
  return (
    <Layout className="gx-app-layout">
      <Content className={`gx-layout-content`} style={{ borderRadius: "2rem" }}>
        <Outlet />
      </Content>
    </Layout>
  );
}
