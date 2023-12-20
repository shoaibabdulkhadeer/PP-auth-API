import { Layout } from "antd";
import { Outlet } from "react-router-dom";
const { Content } = Layout;
const AdminLayout = () => {
  return (
    <Layout className="gx-app-layout">
      <Layout>
        <Content className={`gx-layout-content`} style={{ margin: "0,20px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
