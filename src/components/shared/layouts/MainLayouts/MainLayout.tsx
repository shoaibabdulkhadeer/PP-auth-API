// import Footer from "./Footer";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout className="layout">
      <Header />
      <Content style={{ background: "inhiret" }}>
        <div
          style={{
            padding: "1.5rem 1.5rem",
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainLayout;
