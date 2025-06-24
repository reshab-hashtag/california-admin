import React from "react";
import { Button, Row, Col, Form, Input,InputNumber  } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
interface vehicles {
    vehicletype: string;
}
interface vehicleData {
    ourvehicles: vehicles[];
    updateSliderCount: (action: "add" | "remove", idToRemove?: number, section?: string) => void;
    ourVehiclehandleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number,type: string,seckey:number) => void;
    openAddGalPopup:(index:number,maxupload:number,uploadsec:string,secId:number) => void;
    vehicleDataAddRow:(action: "add" | "remove", idToRemove?: number, section?: string, seckey?: number)=> void;
}
const OurVehicles: React.FC<vehicleData> = ({
    ourvehicles,
    updateSliderCount,
    ourVehiclehandleInputChange,
    openAddGalPopup,
    vehicleDataAddRow
}) => {
    return (
        <>
        {/* {console.log("ourvehicles======",ourvehicles)} */}
            <h1>Our Vehicles Section</h1>
            <div className="our_fleet">
            {
            ourvehicles?.map((val:any,index:number)=>
            <>
                <Row
                    key={index}
                    gutter={[16, 16]}
                    align="middle"
                    style={{ marginBottom: "10px", display: "flex", flexWrap: "nowrap" }}
                    >
                        <Col span={10}>
                            <Form.Item label="Vehicle Type" style={{ marginBottom: 0 }}>
                            <Input
                                placeholder="Enter Vehicle Type"
                                style={{ height: "40px" }}
                                name="vehicletype"
                                value={val.vehicletype}                        
                                onChange={(e) => ourVehiclehandleInputChange(e, index,"firstkey",0)}
                                
                            />
                            </Form.Item>                
                        </Col>
                        <Col span={10}>
                            <Form.Item label="Vehicle Slug" style={{ marginBottom: 0 }}>
                            <Input
                                placeholder="Enter Vehicle Slug"
                                style={{ height: "40px" }}
                                name="vehicleslug"
                                value={val.vehicleslug}                        
                                onChange={(e) => ourVehiclehandleInputChange(e, index,"firstkey",0)}
                                
                            />
                            </Form.Item>                
                        </Col>
                        <Col span={4} style={{ display: "flex", alignItems: "center" }}>
                            <Button
                            type="primary"
                            danger={index !== 0}
                            onClick={() =>
                                index === 0 ? updateSliderCount("add", index, "ourvehicle") : updateSliderCount("remove", index, "ourvehicle")
                            }
                            style={{ height: "40px", width: "100%", marginTop: "30px" }}
                            >
                            {index === 0 ? "Add" : "Remove"}
                            </Button>
                        </Col>                    
                    </Row>
                    {val?.vehicledata?.map((item:any,key:number)=>(
                        // {console.log(item)}
                        <Row
                        key={key}
                        gutter={[16, 16]}
                        align="middle"
                        //style={{ marginBottom: "10px", display: "flex", flexWrap: "nowrap" }}
                        >
                            <Col span={5}>
                                <Form.Item label="Image" style={{ marginBottom: 0 }}>
                                <Input
                                    placeholder="Enter Image Name"
                                    style={{ height: "40px" }}
                                    name="image"
                                    value={item.image}                        
                                    onChange={(e) => ourVehiclehandleInputChange(e, index,"secondkey",key)}
                                    suffix={
                                        <Button
                                            type="default"
                                            shape="circle"
                                            size="small"
                                            icon={<PaperClipOutlined />}
                                            onClick={() => openAddGalPopup(index,1,"ourvehicle",key)}
                                        />
                                        }
                                />
                                </Form.Item>                
                            </Col>
                            <Col span={5}>
                                <Form.Item label="Header" style={{ marginBottom: 0 }}>
                                <Input
                                    placeholder="Enter Header"
                                    style={{ height: "40px" }}
                                    name="header"
                                    value={item.header}                        
                                    onChange={(e) => ourVehiclehandleInputChange(e, index,"secondkey",key)}                                    
                                />
                                </Form.Item>                
                            </Col>
                            <Col span={3}>
                                <Form.Item label="Passenger capacity" style={{ marginBottom: 0 }}>
                                <Input
                                    placeholder="Enter passenger capacity"
                                    style={{ height: "40px" }}
                                    name="passengercount"
                                    value={item.passengercount}                        
                                    onChange={(e) =>{ ourVehiclehandleInputChange(e, index,"secondkey",key)}}
                                />
                                </Form.Item>                
                            </Col>
                            <Col span={9}>
                                <Form.Item label="Content" style={{ marginBottom: 0 }}>
                                <Input.TextArea
                                    placeholder="Enter Content"
                                    style={{ height: "80px", resize: "none" }}
                                    name="content"
                                    value={item.content}                        
                                    onChange={(e) => ourVehiclehandleInputChange(e, index,"secondkey",key)}                                    
                                />
                                </Form.Item>                
                            </Col>
                            <Col span={2} style={{ display: "flex", alignItems: "center" }}>
                                <Button
                                type="primary"
                                danger={key !== 0}
                                onClick={() =>
                                    key === 0 ? vehicleDataAddRow("add", index, "ourvehicledata",key) : vehicleDataAddRow("remove", index, "ourvehicledata",key)
                                }
                                style={{ height: "40px", width: "100%", marginTop: "30px" }}
                                >
                                {key === 0 ? "Add" : "Remove"}
                                </Button>
                            </Col>
                        </Row>
                    ))}
                    
                </>
           
            )}
                 </div>
        </>
    );
}

export default OurVehicles;

