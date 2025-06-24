import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Upload, message, Row, Col, Card, Popconfirm } from "antd";

import { addGallery, listGallery, deleteGallery } from "../config/apiFunctions";
import { DeleteOutlined, CopyOutlined } from "@ant-design/icons";
import GalleryModal from "./GalleryModal";
const Gallery: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [fileList, setFileList] = useState<any[]>([]);
    const [gallery, setGallery] = useState<any[]>([]);
    const [form] = Form.useForm();
    const openAddGalPopup = () => {
        setIsModalOpen(true);
    }
    const handleCancel = () => {
        form.resetFields();
        setFileList([]);
        setIsModalOpen(false);
    };
    const handleSubmit = async (values: any) => {
        setLoading(true)
        //console.log(values)
        try {
            let formData = new FormData();
            formData.append("alttag", values.alttag)
            //console.log(values.image);return false;
            fileList.forEach((file, index) => {
                formData.append(`images`, file.originFileObj);
            });
            let saveGallery = await addGallery(formData)
            //console.log(saveGallery) 
            message.success("Image uploaded successfully!");
            setGallery((prevData) => [...prevData, saveGallery.data]);
            form.resetFields();
            setIsModalOpen(false);
            setLoading(false)
            setFileList([]);
        }
        catch (err) {
            console.log(err)
            setLoading(true)
        }
    }
    const handleUploadChange = ({ fileList }: { fileList: any[] }) => {
        setFileList(fileList);
    };
    const getGalleryList = async () => {
        try {
            const response = await listGallery();
            if (Array.isArray(response)) {
                setGallery(response);
            } else if (Array.isArray(response.data)) {
                setGallery(response.data);
            } else {
                console.error("Unexpected response format for gallery:", response);
                setGallery([]); // fallback to empty array
            }
        } catch (error) {
            console.error("Error fetching gallery:", error);
            setGallery([]); // fallback to prevent future errors
        }
    };

    useEffect(() => {
        getGalleryList()
    }, [gallery.length])
    const imageDelete = async (id: string) => {
        try {
            deleteGallery(id)
            message.success("Image Deleted successfully!");
            setGallery((prevData) => prevData.filter((item) => item._id !== id));
        } catch (error) {
            message.error("Something went wrong");
        }

    }
    const handleCopy = (imagename: string) => {
        navigator.clipboard.writeText(imagename).then(() => {
            message.success('Image name copied to clipboard');
        }).catch(() => {
            message.error('Failed to copy name');
        });
    };
    return (
        <>
            <div className="blog-list common_wrp">
                <h1>Media</h1>
                <Button className="cssbuttons-io-button" type="primary" onClick={openAddGalPopup} style={{ marginBottom: "20px" }}>
                    Add New Media
                </Button>

                <Row gutter={[16, 16]}>
                    {gallery.length > 0 ? (
                        gallery
                            .map((item) => (
                                <Col key={item.id || item.image} xs={12} sm={8} md={6} lg={3} xl={3}>
                                    <Card
                                        hoverable
                                        cover={
                                            <img
                                                alt={item.alttag}
                                                src={item.image}
                                                style={{ height: "200px", objectFit: "cover" }}
                                            />
                                        }
                                        actions={[
                                            <Popconfirm
                                                title="Are you sure you want to delete this image?"
                                                onConfirm={() => imageDelete(item._id)}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <DeleteOutlined style={{ color: "red", cursor: "pointer" }} key="delete" />
                                            </Popconfirm>,
                                            <CopyOutlined
                                                style={{ cursor: "pointer" }}
                                                key="copy"
                                                onClick={() => handleCopy(item.imagename)}
                                            />
                                        ]}
                                    >
                                        {/* <Card.Meta title={item.alttag} /> */}
                                    </Card>
                                </Col>
                            ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </Row>


                <GalleryModal isModalOpen={isModalOpen} handleSubmit={handleSubmit} handleCancel={handleCancel} handleUploadChange={handleUploadChange} fileList={fileList} loading={loading} maxupload={5} form={form} />



            </div>
        </>
    )
};
export default Gallery;
