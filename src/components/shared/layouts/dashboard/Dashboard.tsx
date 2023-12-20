import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
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

export default Dashboard;
