import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { GetPageData, updatePageData, addGallery } from "../../../config/apiFunctions";
import { useParams } from "react-router-dom";
import { PaperClipOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import GalleryModal from "../../GalleryModal";

interface PageFormProps {
    title: string;
    redirectAfterSubmit?: () => void;
}

const PageFormWithGallery: React.FC<PageFormProps> = ({ title, redirectAfterSubmit }) => {
    const [form] = Form.useForm();
    const [htmlContent, setHtmlContent] = useState<string>("");
    const [gallery, setGallery] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [initialValues, setInitialValues] = useState<any>({});
    const [isChanged, setIsChanged] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileList, setFileList] = useState<any[]>([]);
    const [uploading, setUploading] = useState(false);
    const [uploadIndex, setUploadIndex] = useState<number | null>(null);
    const [galleryForm] = Form.useForm();

    const slug = useParams().slug || "";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetPageData(slug);
                if (response?.pagedata) {
                    const { header = "", subheader = "", content = "", gallery = [] } = response.pagedata;

                    const formValues: any = { header, subheader };
                    form.setFieldsValue(formValues);
                    setHtmlContent(content);
                    setGallery(gallery);
                    setInitialValues({ ...formValues, content, gallery });
                }
            } catch {
                message.error("Failed to load page data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [slug, form]);

    const handleFormChange = () => {
        const currentValues = form.getFieldsValue();
        const hasChanged = Object.entries(initialValues).some(([key, value]) => {
            if (key === "content") return htmlContent !== value;
            if (key === "gallery") return JSON.stringify(gallery) !== JSON.stringify(value);
            return currentValues[key] !== value;
        });
        setIsChanged(hasChanged);
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const newPayload = {
                header: values.header || "",
                subheader: values.subheader || "",
                content: htmlContent,
                gallery,
            };

            if (!isChanged) {
                message.warning("Change something to update.");
                return;
            }

            await updatePageData(slug, newPayload);
            message.success("Page updated successfully");
            setInitialValues({ ...values, content: htmlContent, gallery });
            setIsChanged(false);
            if (redirectAfterSubmit) redirectAfterSubmit();
        } catch {
            message.error("Failed to submit page data");
        }
    };

    const updateGalleryItem = (index: number, field: string, value: string) => {
        const updatedGallery = [...gallery];
        updatedGallery[index] = {
            ...updatedGallery[index],
            [field]: value,
        };
        setGallery(updatedGallery);
        handleFormChange();
    };

    const addGalleryItem = () => {
        setGallery([...gallery, { url: "", head: "", subhead: "" }]);
        setIsChanged(true);
    };

    const removeGalleryItem = (index: number) => {
        const updatedGallery = [...gallery];
        updatedGallery.splice(index, 1);
        setGallery(updatedGallery);
        setIsChanged(true);
    };

    const openUploadModal = (index: number) => {
        setUploadIndex(index);
        setIsModalOpen(true);
    };

    const handleUploadChange = ({ fileList }: { fileList: any[] }) => {
        setFileList(fileList);
    };

    const handleUploadSubmit = async (values: any) => {
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("alttag", values.alttag);
            fileList.forEach((file) => {
                formData.append("images", file.originFileObj);
            });

            const res = await addGallery(formData);
            const imageUrl = res.data[0]?.image;

            if (uploadIndex !== null) {
                updateGalleryItem(uploadIndex, "url", imageUrl);
            }

            galleryForm.resetFields();
            setFileList([]);
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
            message.error("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="common_wrp line_wrp">
            <h1 style={{ marginBottom: 20 }}>{title}</h1>
            <Form layout="vertical" form={form} onFinish={handleSubmit} onValuesChange={handleFormChange}>
                <h2>Banner Section</h2>
                <Form.Item label="Header" name="header"><Input /></Form.Item>
                <Form.Item label="Subheader" name="subheader"><Input /></Form.Item>

                <h2>Gallery Section</h2>
                {gallery.map((item, index) => (
                    <div key={index} style={{ marginBottom: 20, border: "1px solid #ddd", padding: 10, borderRadius: 4 }}>
                        <Form.Item label={`Image URL ${index + 1}`}>
                            <Input
                                value={item.url}
                                onChange={(e) => updateGalleryItem(index, "url", e.target.value)}
                                addonAfter={
                                    <Button
                                        type="default"
                                        icon={<PaperClipOutlined />}
                                        onClick={() => openUploadModal(index)}
                                    >
                                        Upload
                                    </Button>
                                }
                            />
                        </Form.Item>
                        <Form.Item label={`Headline ${index + 1}`}>
                            <Input
                                value={item.head}
                                onChange={(e) => updateGalleryItem(index, "head", e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item label={`Subhead ${index + 1}`}>
                            <Input
                                value={item.subhead}
                                onChange={(e) => updateGalleryItem(index, "subhead", e.target.value)}
                            />
                        </Form.Item>
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => removeGalleryItem(index)}
                        >
                            Remove
                        </Button>
                    </div>
                ))}
                <Form.Item>
                    <Button icon={<PlusOutlined />} onClick={addGalleryItem} type="dashed">
                        Add Gallery Item
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button className="cssbuttons-io-button" type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

            {/* Image Upload Modal */}
            <GalleryModal
                isModalOpen={isModalOpen}
                handleSubmit={handleUploadSubmit}
                handleCancel={() => setIsModalOpen(false)}
                handleUploadChange={handleUploadChange}
                fileList={fileList}
                loading={uploading}
                maxupload={1}
                form={galleryForm}
            />
        </div>
    );
};

export default PageFormWithGallery;
