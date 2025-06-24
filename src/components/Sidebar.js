import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  ReadOutlined,
  PictureOutlined,
  FileTextOutlined,
  SearchOutlined,
  QuestionCircleOutlined,

} from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar = () => {
  
  return (
    <Sider className="admin_sidebar">
      <div style={{ color: "#fff", textAlign: "center", lineHeight: "64px" }}>
        <img 
          src={`${process.env.REACT_APP_IMAGE_URL}1744262744114-logo.png`} alt="Logo"
        />
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 64px)" }}>
        <Menu theme="dark" mode="inline" style={{ flex: 1 }}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          
          <Menu.Item key="2" icon={<ReadOutlined />}>
            <Link to="/blogs">Blogs</Link>
          </Menu.Item>
          
          <Menu.Item key="3" icon={<PictureOutlined />}>
            <Link to="/gallery">Media</Link>
          </Menu.Item>
          
          <Menu.Item key="4" icon={<FileTextOutlined />}>
            <Link to="/pages">Pages</Link>
          </Menu.Item>
          
          <Menu.Item key="5" icon={<SearchOutlined />}>
            <Link to="/seo">Seo</Link>
          </Menu.Item>
          
          <Menu.Item key="6" icon={<QuestionCircleOutlined />}>
            <Link to="/faq">Faq</Link>
          </Menu.Item>
        </Menu>
        

      </div>
    </Sider>
  );
};

export default Sidebar;