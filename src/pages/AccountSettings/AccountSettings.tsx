import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import { addGallery, getUserAndCompany, updateUserAndCompany } from "../../config/apiFunctions";
import GalleryModal from "../GalleryModal";

const Account: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState<any>(null);
  const [isChanged, setIsChanged] = useState(false);
  // Add in your component's state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [uploadSection, setUploadSection] = useState(""); // will be "companyLogo"
  const [uploading, setUploading] = useState(false);
  const [galleryForm] = Form.useForm();

  const fetchUserAndCompany = async () => {
    try {
      const res = await getUserAndCompany();

      const mergedData = {
        username: res.data.user.username,
        email: res.data.user.email,
        companyName: res.data.company.companyName || "",
        companyAddress: res.data.company.companyAddress || "",
        companyPhone: res.data.company.companyPhone || "",
        companyEmail: res.data.company.companyEmail || "",
        companyLogo: res.data.company.companyLogo || "",
      };

      form.setFieldsValue(mergedData);
      setInitialValues(mergedData);
      setIsChanged(false);
      setLoading(false);
    } catch (err) {
      console.error(err);
      message.error("Failed to load user and company data");
      setLoading(false);
    }
  };


  const openGalleryModal = (section: string) => {
    setUploadSection(section);
    setIsModalOpen(true);
  };

  const handleGalleryCancel = () => {
    setIsModalOpen(false);
    setFileList([]);
  };

  const handleUploadChange = ({ fileList }: { fileList: any[] }) => {
    setFileList(fileList);
  };

  const handleSubmitGallery = async (values: any) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("alttag", values.alttag);
      fileList.forEach((file) => {
        formData.append("images", file.originFileObj);
      });

      const res = await addGallery(formData);
      const image = res.data[0].image;

      if (uploadSection === "companyLogo") {
        form.setFieldsValue({ companyLogo: image });
        setIsChanged(true);
      }

      galleryForm.resetFields();
      setFileList([]);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      message.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };


  const onFinish = async (values: any) => {
    if (!isChanged) {
      message.warning("Change something to update.");
      return;
    }

    const payload = {
      user: {
        username: values.username,
        email: values.email,
      },
      company: {
        companyName: values.companyName,
        companyAddress: values.companyAddress,
        companyPhone: values.companyPhone,
        companyEmail: values.companyEmail,
        companyLogo: values.companyLogo,
      },
    };

    try {
      await updateUserAndCompany(payload);
      message.success("Profile and company info updated");
      setInitialValues(values);
      setIsChanged(false);
    } catch (err) {
      console.error(err);
      message.error("Failed to update profile");
    }
  };

  const handleFormChange = () => {
    const currentValues = form.getFieldsValue();
    setIsChanged(false);
    Object.entries(initialValues as Record<string, any>).map(([key, value]) => {
      if (currentValues[key] !== value) {
        console.log("initialValues[key]", initialValues[key])
        setIsChanged(true);
      }
    });

  };

  useEffect(() => {
    fetchUserAndCompany();
  }, []);

  if (loading) return <Spin tip="Loading account..." />;

  return (
    <div className="container" style={{ maxWidth: 700, margin: "auto" }}>
      <h2>User & Company Account Settings</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onChange={handleFormChange}
      >
        {/* User Info */}
        <h3>User Info</h3>
        <Form.Item label="Name" name="username" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
          <Input />
        </Form.Item>

        {/* Company Info */}
        <h3 style={{ marginTop: 30 }}>Company Info</h3>
        <Form.Item label="Company Name" name="companyName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Company Address" name="companyAddress">
          <Input />
        </Form.Item>
        <Form.Item label="Company Phone" name="companyPhone">
          <Input />
        </Form.Item>
        <Form.Item label="Company Email" name="companyEmail" rules={[{ type: "email" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Company Logo URL" required>
          <Input.Group compact>
            <Form.Item
              name="companyLogo"
              noStyle
              rules={[{ type: "url", message: "Enter a valid URL" }]}
            >
              <Input style={{ width: "calc(100% - 100px)" }} placeholder="https://..." />
            </Form.Item>
            <Button onClick={() => openGalleryModal("companyLogo")} type="default">
              Upload
            </Button>
          </Input.Group>
        </Form.Item>


        <GalleryModal
          isModalOpen={isModalOpen}
          handleSubmit={handleSubmitGallery}
          handleCancel={handleGalleryCancel}
          handleUploadChange={handleUploadChange}
          fileList={fileList}
          loading={uploading}
          maxupload={1}
          form={galleryForm}
        />


        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={!isChanged}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Account;
