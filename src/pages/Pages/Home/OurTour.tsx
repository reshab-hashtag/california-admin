import React from "react";
import { Button, Row, Col, Form, Input } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
interface TourData {    
    image: string;
    slug: string;
    header: string;
    content: string;     
}

// interface ourTourData {
//   header: string;
//   content: string;
//   ourtourdata: TourData[];
// }

interface formData {     
    header: string;    
    content: string;
    ourtourdata: TourData[];     
}

interface ourTour {
  updateSliderCount: (action: "add" | "remove", idToRemove?: number, section?: string) => void;
  formData: formData;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => void;
  handleInputChangeArray: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
    key:string,  
    index: number,
    seckey: keyof formData
  ) => void;
  openAddGalPopup:(index:number,maxupload:number,uploadsec:string)=>void
}

const OurTour: React.FC<ourTour> = ({
  updateSliderCount,
  formData,
  handleInputChange,
  handleInputChangeArray,
  openAddGalPopup
}) => {
  return (
    <>
      <h1>Our Tour Section</h1>
      <div className="our_pnl">
      <Row gutter={[16, 16]} align="middle" style={{ marginBottom: "10px", display: "flex", flexWrap: "nowrap" }}>
        <Col span={12}>
          <Form.Item label="Heading" style={{ marginBottom: 0 }}>
            <Input
              placeholder="Enter heading"
              style={{ height: "40px" }}
              name="header"
              value={formData.header}
              onChange={(event) => handleInputChange(event, "ourtour")}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Content" style={{ marginBottom: 0 }}>
            <Input
              placeholder="Enter content"
              style={{ height: "40px" }}
              name="content"
              value={formData.content}
              onChange={(event) => handleInputChange(event, "ourtour")}
            />
          </Form.Item>
        </Col>
      </Row>

      {formData.ourtourdata.map((val, index) => (
        <Row
          key={index}
          gutter={[16, 16]}
          align="middle"
          style={{ marginBottom: "10px", display: "flex", flexWrap: "nowrap" }}
        >
            <Col span={4}>
              <Form.Item label="Image URL" style={{ marginBottom: 0 }}>
                <Input
                  placeholder="Enter image URL"
                  style={{ height: "40px" }}
                  name="image"
                  value={val.image}
                  onChange={(e) => handleInputChangeArray(e, "ourtour", index,"ourtourdata")}
                  suffix={
                      <Button
                          type="default"
                          shape="circle"
                          size="small"
                          icon={<PaperClipOutlined />}
                          onClick={() => openAddGalPopup(index,5,"ourtour")}
                      />
                      }
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Slug" style={{ marginBottom: 0 }}>
                <Input
                  placeholder="Enter image URL"
                  style={{ height: "40px" }}
                  name="slug"
                  value={val.slug}
                  onChange={(e) => handleInputChangeArray(e, "ourtour", index,"ourtourdata")}                
                />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item label="Header" style={{ marginBottom: 0 }}>
                <Input
                  placeholder="Enter header"
                  style={{ height: "40px" }}
                  name="header"
                  value={val.header}
                  onChange={(e) => handleInputChangeArray(e, "ourtour", index,"ourtourdata")}
                />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item label="Content" style={{ marginBottom: 0 }}>
                <Input.TextArea
                  placeholder="Enter content"
                  style={{ height: "80px", resize: "none" }}
                  name="content"
                  value={val.content}
                  onChange={(e) => handleInputChangeArray(e, "ourtour", index,"ourtourdata")}
                />
              </Form.Item>
            </Col>
          
          
            <Col span={2} style={{ display: "flex", alignItems: "center" }}>
              <Button
                type="primary"
                danger={index !== 0}
                onClick={() =>
                  index === 0 ? updateSliderCount("add", index, "ourtour") : updateSliderCount("remove", index, "ourtour")
                }
                style={{ height: "40px", width: "100%", marginTop: "30px" }}
              >
                {index === 0 ? "Add" : "Remove"}
              </Button>
            </Col>
        </Row>
      ))}
      </div>
    </>
  );
};

export default OurTour;
