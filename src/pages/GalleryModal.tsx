import React from "react";
import { Modal, Button, Form, Input, Upload,FormInstance } from "antd";
import { UploadOutlined } from "@ant-design/icons";
interface ModalProps {
    isModalOpen: boolean;
    handleSubmit: (values: any) => void;
    handleUploadChange: ({ fileList }: { fileList: any[] }) => void;
    fileList:any[];
    handleCancel:() => void;
    loading:boolean;
    maxupload:number;
    form:FormInstance 
}
const GalleryModal: React.FC<ModalProps> = ({
    isModalOpen, 
    handleSubmit,
    handleUploadChange,
    fileList,
    handleCancel,
    loading,
    maxupload,
    form
}) => { 
        return(
            <>
                <Modal title="Upload Form"  open={isModalOpen} onCancel={handleCancel} footer={null}>
                    <Form form={form} layout="vertical" onFinish={handleSubmit}>
                        <Form.Item
                            label="Alt tag"
                            name="alttag"
                            rules={[{ required: true, message: "Please enter your name" }]}
                        >
                            <Input placeholder="Enter your name" />
                        </Form.Item>

                        <Form.Item label="Upload File" name="image" rules={[{ required: true, message: "Please upload an image!" }]}>
                            <Upload
                            beforeUpload={() => false} 
                            onChange={handleUploadChange}
                            fileList={fileList}
                            maxCount={maxupload} 
                            >
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                            Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        )
}
export default GalleryModal