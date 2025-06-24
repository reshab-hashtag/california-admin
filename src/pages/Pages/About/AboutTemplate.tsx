import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { GetPageData, updatePageData } from "../../../config/apiFunctions";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AboutPageCreate: React.FC = () => {
    const [form] = Form.useForm();
    const [isCodeMode, setIsCodeMode] = useState(false);
    const [htmlContent, setHtmlContent] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();


            await updatePageData("about", {
                banner: {
                    header: values.header || "",
                    subheader: values.subheader || "",
                },
                content: htmlContent,
            });

            message.success("About Us page updated successfully");
            navigate("/pages");
        } catch (err) {
            message.error("Failed to submit About Us page");
        }
    };


    const getPageDetails = async () => {
        try {
            const response = await GetPageData("about");
            if (response?.pagedata) {
                const data = response.pagedata;

                // Normalize legacy structure if banner is missing
                const bannerData = data.banner || { header: "", subheader: "" };
                const contentData = data.content || data.banner?.content || "";

                form.setFieldsValue({
                    header: bannerData.header,
                    subheader: bannerData.subheader,
                });
                setHtmlContent(contentData);
            }
        } catch (error) {
            message.error("Failed to load About Us page");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getPageDetails();
    }, []);

    const cleanContent = (htmlContent: string): string => {
        if (!htmlContent) return "";
        let clean = htmlContent.replace(/<p>&nbsp;<\/p>/g, '');
        clean = clean.replace(/<p>\s*<\/p>/g, '');
        clean = clean.replace(/>\s+</g, '><');
        clean = clean.replace(/\n\s*/g, '');
        clean = clean.replace(/\s{2,}/g, ' ');
        return clean.trim();
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="common_wrp line_wrp">
            <h1 style={{ marginBottom: 20 }}>About Us Page</h1>
            <Form layout="vertical" form={form} onFinish={handleSubmit}>
                <h2>Banner Section</h2>
                <Form.Item label="Header" name="header" rules={[{ required: true, message: "Please enter header" }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Subheader" name="subheader" rules={[{ required: true, message: "Please enter subheader" }]}>
                    <Input />
                </Form.Item>

                <h2>Content Section</h2>
                <Form.Item label="Content">
                    <Button onClick={() => setIsCodeMode(!isCodeMode)} style={{ marginBottom: 10 }}>
                        Switch to {isCodeMode ? "Editor" : "Code"} Mode
                    </Button>
                    {isCodeMode ? (
                        <textarea
                            value={htmlContent}
                            onChange={(e) => setHtmlContent(cleanContent(e.target.value))}
                            rows={12}
                            style={{
                                width: "100%",
                                fontFamily: "monospace",
                                fontSize: "14px",
                                padding: "10px",
                                border: "1px solid #d9d9d9",
                                borderRadius: "4px",
                            }}
                            placeholder="Write or edit raw HTML content..."
                        />
                    ) : (
                        <div style={{ overflow: "hidden" }}>
                            <style>{`
                .ck-editor__editable {
                  min-height: 300px !important;
                  line-height: 1.4 !important;
                }
              `}</style>
                            <CKEditor
                                editor={ClassicEditor}
                                data={htmlContent}
                                onChange={(_, editor) => {
                                    const data = editor.getData();
                                    setHtmlContent(data);
                                }}
                            />
                        </div>
                    )}
                </Form.Item>

                <Form.Item>
                    <Button className="cssbuttons-io-button" type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AboutPageCreate;
