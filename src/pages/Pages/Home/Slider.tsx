import React from "react";
import { Button, Row, Col, Form, Input } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";

interface SliderValue {
  slider: string;
  sliderheader: string;
  bannercontent: string;
  bnrbtnnm: string;
  bnrbtnlink: string;
}

interface InputBox {
  id: number;
  value: SliderValue; 
}

interface SliderProps {
  sliderData: InputBox[];
  slideronChange: (id: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  updateSliderCount: (action: "add" | "remove", idToRemove?: number, section?: string) => void;
//   isModalOpen: boolean;
//   handleSubmitModal: (values: any) => void;
//   handleCancel: () => void;
//   handleUploadChange: ({ fileList }: { fileList: any[] }) => void;
//   fileList: any[];
//   loading: boolean;
  openAddGalPopup: (id: number,maxupload:number,uploadsec:string) => void;
}

const Slider: React.FC<SliderProps> = ({
  sliderData,
  slideronChange,
  updateSliderCount,
//   isModalOpen,
//   handleSubmitModal,
//   handleCancel,
//   handleUploadChange,
//   fileList,
//   loading,
  openAddGalPopup,
}) => {
  return (
    <>
        <h1>Slider Section</h1>
    
    <div className="sec_wrap">
    {sliderData?.map((val: InputBox, index) => (
            <Row
            key={val.id}
            gutter={[16, 16]}
            align="middle"
            style={{ marginBottom: "10px", display: "flex", flexWrap: "nowrap" }}
            >
            <Col span={4}>
                <Form.Item label={`Slider ${index + 1}`} style={{ marginBottom: 0 }}>
                <Input
                    placeholder="Enter image name"
                    style={{ height: "40px" }}
                    name="slider"
                    value={val.value.slider || ""}
                    onChange={(e) => slideronChange(val.id, e)}
                    suffix={
                    <Button
                        type="default"
                        shape="circle"
                        size="small"
                        icon={<PaperClipOutlined />}
                        onClick={() => openAddGalPopup(index,5,"slider")}
                    />
                    }
                />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item label={`Banner Header ${index + 1}`} style={{ marginBottom: 0 }}>
                <Input
                    placeholder="Enter Banner Header"
                    style={{ height: "40px" }}
                    value={val.value.sliderheader || ""}
                    onChange={(e) => slideronChange(val.id, e)}
                    name="sliderheader"
                />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item label={`Banner Content ${index + 1}`} style={{ marginBottom: 0 }}>
                <Input
                    placeholder="Enter banner content"
                    style={{ height: "40px" }}
                    value={val.value.bannercontent || ""}
                    onChange={(e) => slideronChange(val.id, e)}
                    name="bannercontent"
                />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item label={`Slider Button Name ${index + 1}`} style={{ marginBottom: 0 }}>
                <Input
                    placeholder="Enter button name"
                    style={{ height: "40px" }}
                    value={val.value.bnrbtnnm || ""}
                    onChange={(e) => slideronChange(val.id, e)}
                    name="bnrbtnnm"
                />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item label={`Button link ${index + 1}`} style={{ marginBottom: 0 }}>
                <Input
                    placeholder="Enter button link"
                    style={{ height: "40px" }}
                    value={val.value.bnrbtnlink || ""}
                    onChange={(e) => slideronChange(val.id, e)}
                    name="bnrbtnlink"
                />
                </Form.Item>
            </Col>

            <Col span={4} style={{ display: "flex", alignItems: "center" }}>
                <Button
                type="primary"
                danger={index !== 0}
                onClick={() =>
                    index === 0
                    ? updateSliderCount("add", index,"slider")
                    : updateSliderCount("remove", index,"slider")
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

export default Slider;
