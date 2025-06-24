import React, { useState, useEffect } from "react";
import { Button, Row, Col, Form, Input, Select, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { updateSeoData, addSeoData, seoPageDetails } from "../../../src/config/apiFunctions";

const SeoUpdate: React.FC = () => {
    const [formData, setFormData] = useState({
        page: "",
        title: "",
        description: "",
        keyword: "",
    });

    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm(); 
    useEffect(() => {
        getSeoList();
    }, [id]);

    useEffect(() => {
        form.setFieldsValue(formData); 
    }, [formData]);

    const getSeoList = async () => {
        try {
            const response = await seoPageDetails(id);
            let updatedata = {
                page: response?.page?.page || "",
                title: response?.title || "",
                description: response?.description || "",
                keyword: response?.keyword || "",
                canonical: response?.canonical || ""
            };
            setFormData(updatedata);
        } catch (err) {
            console.error("Error fetching SEO list:", err);
        }
    };

    

    const handleSubmit = async () => {
        try {
            await updateSeoData(id,formData);
            message.success("SEO successfully updated");
            navigate("/seo");
        } catch (err: any) {
            console.error("Error adding SEO:", err);
            message.error(err.response?.data?.error || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className="add_seo common_wrp">

                <Form layout="vertical" form={form} onFinish={handleSubmit}>
            <Row gutter={[16, 16]} align="middle">
                <Col span={12}>
                    <Form.Item
                        label="Select Page"
                        name="page"
                        rules={[{ required: true, message: "Please select a page!" }]}
                    >
                        <Select
                            value={formData.page} 
                            placeholder="Select Page"
                            style={{ height: "40px", width: "100%" }}
                            onChange={(value) => {
                                setFormData((prev) => ({ ...prev, page: value }));
                            }}                
                        >
                            <Select.Option key={0} value={formData.page} selected>{formData.page}</Select.Option>
                        </Select>                        
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Title" name="title">
                        <Input.TextArea placeholder="Enter Title" style={{ height: "40px" }} onChange={(e)=>setFormData((prev =>({ ...prev, title:e.target.value })))} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]} align="middle">
                <Col span={12}>
                    <Form.Item label="Description" name="description">
                        <Input.TextArea placeholder="Enter Description" style={{ height: "40px" }} onChange={(e)=>setFormData((prev =>({ ...prev, description:e.target.value })))} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Keyword" name="keyword">
                        <Input.TextArea placeholder="Enter Keyword" style={{ height: "40px" }} onChange={(e)=>setFormData((prev =>({ ...prev, keyword:e.target.value })))} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]} align="middle">
                <Col span={24}>
                    <Form.Item label="canonical" name="canonical">
                        <Input.TextArea placeholder="Enter canonical" style={{ height: "40px" }} onChange={(e)=>setFormData((prev =>({ ...prev, canonical:e.target.value })))} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]} align="middle">
                <Col span={4}>
                    <Form.Item>
                        <Button className="cssbuttons-io-button" type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
        </div>
    );
};

export default SeoUpdate;
