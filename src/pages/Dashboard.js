import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography } from "antd";
import { FaFileAlt } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { FaBlog } from "react-icons/fa";
import { ListBlog, listGallery, ListPages } from "../config/apiFunctions";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
const { Title } = Typography;


const Dashboard = () => {
  const [pageCount,setpageCount] = useState(0);
  const [mediaCount,setmediaCount] = useState(0);
  const [blogCount,setblogCount] = useState(0);
  const countSet = async()=>{
    const blogresponse = await ListBlog();
    setblogCount(blogresponse.length)
    const mediaresponse = await listGallery();
    setmediaCount(mediaresponse.length)
    const pageresponse = await ListPages();
    setpageCount(pageresponse.length)
  }
  useEffect(()=>{
    countSet();
  },[])
  return (
    <div className="dashboard">
      <div className="ant-typography css-dev-only-do-not-override-1yacf91">
        <h1>Dashboard</h1>
      </div>
      
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Title level={5}>Pages</Title>
                <Title level={4}>
                  <Link to='/pages'>
                     <CountUp end={pageCount} duration={1.2} separator="," />
                  </Link>
                  </Title>
              </div>
              <div className="icons">
                <FaFileAlt />
              </div>
            </div>
          </Card>
        </Col>
        
        <Col span={8}>
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Title level={5}>Media</Title>
                <Title level={4}>
                    <Link to='/pages'>
                        <CountUp end={mediaCount} duration={1.2} separator="," />
                    </ Link >
                  </Title>
              </div>
              <div className="icons">
                <FaImage />
              </div>
            </div>
          </Card>
        </Col>
        
        <Col span={8}>
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Title level={5}>Blog</Title>
                <Title level={4}>
                    <Link to='/pages'>
                      <CountUp end={blogCount} duration={1.2} separator="," />
                    </ Link >
                  </Title>
              </div>
              <div className="icons">
                <FaBlog />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      
    </div>
  );
};

export default Dashboard;