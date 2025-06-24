import React from "react";
import { Button, Row, Col, Form, Input } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
interface formData {
    aboutus: {
      image: string;
      header: string;
      secondheader: string;
      content: string;
      btnname: string;
      btnlink: string;
    };
  }
interface inputType {
    openAddGalPopup: (id: number, maxupload: number, uploadsec: string) => void;
    formData: formData;
    handleInputChange:(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,key: keyof formData)=>void
  }

const AboutUs: React.FC<inputType> = ({
    openAddGalPopup,
    formData,
    handleInputChange
}) => {
    return(
        <>
     
            <h1>About Us Section</h1>
            <div className="about_pnl">
            <Row
            gutter={[16, 16]}
            align="middle"
            style={{ marginBottom: "10px", display: "flex", flexWrap: "nowrap" }}
            >
                <Col span={8}>
                <Form.Item label={`About us image`} style={{ marginBottom: 0 }}>
                <Input
                    placeholder="Enter image name"
                    style={{ height: "40px" }}
                    name="image"
                    // value={val.value.slider || ""}
                    onChange={(event)=> handleInputChange(event,"aboutus") }
                    value = {formData?.aboutus?.image || ""}
                    suffix={
                    <Button
                        type="default"
                        shape="circle"
                        size="small"
                        icon={<PaperClipOutlined />}                        
                        onClick={() => openAddGalPopup(0,1,"about")}
                    />
                    }
                />
                </Form.Item>
            </Col>            
            <Col span={8}>
                <Form.Item label="First header" style={{ marginBottom: 0 }}>
                <Input
                    placeholder="Enter header"
                    style={{ height: "40px" }}
                    name="header"
                    value={formData?.aboutus?.header}
                    onChange={(event)=> handleInputChange(event,"aboutus") }
                />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label="Second header" style={{ marginBottom: 0 }}>
                <Input
                    placeholder="Enter second Header"
                    style={{ height: "40px" }}
                    name="secondheader"
                    value={formData?.aboutus?.secondheader}
                    onChange={(event)=> handleInputChange(event,"aboutus") }
                />
                </Form.Item>
            </Col>
            </Row>
            <Row
            gutter={[16, 16]}
            align="middle"
            style={{ marginBottom: "10px", display: "flex", flexWrap: "nowrap" }}
            >
            <Col span={8}>
                <Form.Item label="Content" style={{ marginBottom: 0 }}>
                    <Input.TextArea
                        placeholder="Enter content"
                        style={{ height: "80px", resize: "none" }}
                        name="content"
                        value={formData?.aboutus?.content}
                        onChange={(event)=> handleInputChange(event,"aboutus") }
                    />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label={`Button Name`} style={{ marginBottom: 0 }}>
                <Input
                    placeholder="Enter button name"
                    style={{ height: "40px" }}
                    name="btnname"
                    value={formData?.aboutus?.btnname}
                    onChange={(event)=> handleInputChange(event,"aboutus") }
                />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label={`Button link`} style={{ marginBottom: 0 }}>
                <Input
                    placeholder="Enter button link"
                    style={{ height: "40px" }}
                    name="btnlink"
                    value={formData?.aboutus?.btnlink}
                    onChange={(event)=> handleInputChange(event,"aboutus") }
                />
                </Form.Item>
            </Col>

            
            </Row>
            </div>
        </>
    )
}
export default AboutUs