import React from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import AppHeader from "./Header";

const { Content } = Layout;

const AppLayout = ({ children }) => (
  <Layout style={{ minHeight: "100vh" }}>
    <Sidebar />
    <Layout>
      <AppHeader />
      <Content style={{ margin: "20px", backgroundColor: "#fff", padding: "20px" }}>
        {children}
      </Content>
    </Layout>
  </Layout>
);

export default AppLayout;
