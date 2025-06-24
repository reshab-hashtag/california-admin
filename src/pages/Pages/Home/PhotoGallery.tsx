import React, { useState, useEffect } from "react"
import { Button, Row, Col, Form, Input, InputNumber } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
interface Photo {
    image: string;
}
interface photogallary {
    content: string;
    images: Photo[];
};
interface GalleryData {
    photogallery: photogallary
    openAddGalPopup:(id:number,maxupload:number,uploadsec:string)=>void
    handleInputChange:(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string)=>void;
    updateSliderCount:(action: "add" | "remove", idToRemove?: number, section?: string)=>void
    PhotoGalInputChangeArray: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key:string, index: number, seckey: string)=>void
}
const PhotoGallery: React.FC<GalleryData> = ({
    photogallery,
    openAddGalPopup,
    handleInputChange,
    updateSliderCount,
    PhotoGalInputChangeArray
}) => {
    let hors = 7
    let convrtminut = hors * 60
    let convrtsec = convrtminut * 60
    const [getTime, setTime] = useState<string>()
    const getTimeDifference = () => {
        let now = new Date();
        let target = new Date();
        //console.log("now===>",now)

        target.setHours(7, 30, 0, 0);


        let diffMs = target.getTime() - now.getTime();


        if (diffMs < 0) {
            target.setDate(target.getDate() + 1);
            diffMs = target.getTime() - now.getTime();
        }


        let diffSec = Math.floor(diffMs / 1000);
        let hours = Math.floor(diffSec / 3600);
        let minutes = Math.floor((diffSec % 3600) / 60);
        let seconds = diffSec % 60;

        return { hours, minutes, seconds };
    }
    useEffect(() => {
        setInterval(() => {
            let { hours, minutes, seconds } = getTimeDifference();
            //setTime(`${hours}:${minutes}:${seconds}`);
            // console.log(`${hours}:${minutes}:${seconds}`)
        }, 1000)
    },[])

    return (
        <>
            {/* {console.log("ourvehicles======",ourvehicles)} */}
            <h1>Gallery Section</h1>
            {                
                <>
                   <div className="our_gallery">
                    <Row
                        
                        gutter={[16, 16]}
                        align="middle"
                        style={{ marginBottom: "10px", display: "flex", flexWrap: "nowrap" }}
                    >
                        <Col span={20}>
                            <Form.Item label="Content" style={{ marginBottom: 0 }}>
                                <Input
                                    placeholder="Enter Content"
                                    style={{ height: "40px" }}
                                    name="content"
                                    value={photogallery.content}
                                    onChange={(e) => handleInputChange(e,"photogallary")}

                                />
                            </Form.Item>
                        </Col>                        
                    </Row>
                    {photogallery?.images?.map((item: any, key: number) => (
                        // {console.log(item)}
                        <Row
                            key={key}
                            gutter={[16, 16]}
                            align="middle"
                        //style={{ marginBottom: "10px", display: "flex", flexWrap: "nowrap" }}
                        >
                            <Col span={20}>
                                <Form.Item label="Image" style={{ marginBottom: 0 }}>
                                    <Input
                                        placeholder="Enter Image Name"
                                        style={{ height: "40px" }}
                                        name="image"
                                        value={item.image}
                                        onChange={(e) => PhotoGalInputChangeArray(e, "photogallary", key,"images")}
                                        suffix={
                                            <Button
                                                type="default"
                                                shape="circle"
                                                size="small"
                                                icon={<PaperClipOutlined />}
                                                onClick={() => openAddGalPopup(key,5,"photogallery")}
                                            />
                                        }
                                    />
                                </Form.Item>
                            </Col>                               
                            <Col span={4} style={{ display: "flex", alignItems: "center" }}>
                                <Button
                                    type="primary"
                                    danger={key !== 0}
                                    onClick={() =>
                                        key === 0 ? updateSliderCount("add", key, "photogalarry") : updateSliderCount("remove", key, "photogalarry")
                                    }
                                    style={{ height: "40px", width: "100%", marginTop: "30px" }}
                                >
                                    {key === 0 ? "Add" : "Remove"}
                                </Button>
                            </Col>
                        </Row>
                    ))}
</div>
                </>
            }
        </>
    );
}
export default PhotoGallery;


