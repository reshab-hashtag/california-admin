import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";

const { Header } = Layout;

const AppHeader = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.href = process.env.REACT_APP_URL; 
  };

  return (
    <>
      <Header
        style={{
          backgroundColor: "#fff",
          padding: 0,
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: "0 20px" }}>Admin Panel</h2>
        <div style={{ marginRight: 20, display: "flex", gap: "20px", alignItems: "center" }}>
          <Link to="/account-settings" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <SettingOutlined style={{fontSize:"1.5rem",color:"black"}} />
          </Link>
          <Link  onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: 6,marginLeft:"2rem" }}>
            <LogoutOutlined style={{fontSize:"1.5rem",color:"red"}}/>
          </Link>
        </div>
      </Header>
    </>
  );
};

export default AppHeader;
