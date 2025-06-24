import React, { useState } from "react";
import { Form, Input, Upload, Button, message, Switch, DatePicker, Select } from "antd";
import { UploadOutlined, CodeOutlined, EyeOutlined } from "@ant-design/icons";
import { createBlog } from "../../config/apiFunctions";
import dayjs from "dayjs";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const BlogCreate = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [isCodeMode, setIsCodeMode] = useState(false);
  
  // Enhanced content cleaning function
  const cleanContent = (htmlContent) => {
    if (!htmlContent) return "";
    
    // Remove empty paragraphs and nbsp
    let clean = htmlContent.replace(/<p>&nbsp;<\/p>/g, '');
    clean = clean.replace(/<p>\s*<\/p>/g, '');
    
    // Remove extra spaces between tags
    clean = clean.replace(/>\s+</g, '><');
    
    // Remove unnecessary line breaks
    clean = clean.replace(/\n\s*/g, '');
    
    // Replace multiple spaces with a single space
    clean = clean.replace(/\s{2,}/g, ' ');
    
    // Remove trailing/leading whitespace
    clean = clean.trim();
    
    return clean;
  };
  
  // Modified handleEditorChange with enhanced spacing fixes
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(cleanContent(data));
  };

  // Auto-fill logic for URL and meta fields based on Title input
  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    form.setFieldsValue({
      blogurl: slug,
      metatitle: title,
      metadescription: ``,
      canonical: `${process.env.REACT_APP_FRONT_URL}${slug}`,
    });
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("shortdescription", values.shortdescription);
      
      // Clean content once more before submitting
      formData.append("content", cleanContent(content));
      
      formData.append("blogdate", values.blogdate.format("YYYY-MM-DD"));
      formData.append("blogplace", values.blogplace);
      formData.append("blogurl", values.blogurl);
      formData.append("metatitle", values.metatitle);
      formData.append("metadescription", values.metadescription);
      formData.append("canonical", values.canonical);
      formData.append("metakeyword", values.metakeyword || "");
      formData.append("category", values.category);
      formData.append("bannerurl", values.bannerurl);
      
      if (values.bannerimage && values.bannerimage[0]) {
        formData.append("bannerimage", values.bannerimage[0].originFileObj);
      }

      await createBlog(formData);
      message.success("Blog created successfully!");
      form.resetFields();
      setContent("");
    } catch (error) {
      console.error("Error creating blog:", error);
      message.error("Failed to create blog. Please try again.");
    }
    setLoading(false);
  };

  // Improved editor configuration with spacing controls
  const editorConfig = {
    removePlugins: ['MediaEmbed'],
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
      ]
    },
    // Add these settings to further control spacing
    typing: {
      transformations: {
        remove: [
          // Disable two spaces conversion to a period + space
          'twoSpacesToPeriodSpace',
        ]
      }
    }
  };

  return (
    <div className="blog-create common_wrp">
      <h1>Create a New Blog</h1>
      <Form
        name="create-blog"
        onFinish={onFinish}
        initialValues={{ blogdate: dayjs() }}
        layout="vertical"
        style={{ maxWidth: 800, margin: "0 auto" }}
        form={form}
      >
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select placeholder="Select a category">
            <Select.Option value="California Limo Wine Tours">California Limo Wine Tours</Select.Option>          
          </Select>
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter the blog title!" }]}
        >
          <Input placeholder="Enter blog title" onChange={handleTitleChange} />
        </Form.Item>

        <Form.Item
          label="Short Description"
          name="shortdescription"
          rules={[{ required: true, message: "Please enter short description!" }]}
        >
          <Input.TextArea rows={2} placeholder="A short summary of the blog..." />
        </Form.Item>

        <Form.Item
          label={
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Description</span>
              <div>
                <CodeOutlined style={{ marginRight: 8 }} />
                <Switch
                  checked={isCodeMode}
                  onChange={setIsCodeMode}
                  checkedChildren={<EyeOutlined />}
                  unCheckedChildren={<CodeOutlined />}
                />
                <EyeOutlined style={{ marginLeft: 8 }} />
              </div>
            </div>
          }
          required
        >
          {isCodeMode ? (
            <textarea
              value={content}
              onChange={(e) => setContent(cleanContent(e.target.value))}
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
            <div style={{ overflow: 'hidden' }}>
              <style>
                {`
                  .ck-editor__editable {
                    min-height: 300px !important;
                    line-height: 1.4 !important;
                  }
                  .ck-editor__editable p {
                    margin: 0.3em 0 !important;
                  }
                  /* Reduce paragraph spacing */
                  .ck-editor__editable p + p {
                    margin-top: 0.5em !important;
                  }
                  /* Remove empty paragraph styling */
                  .ck-editor__editable p:empty {
                    display: none !important;
                  }
                `}
              </style>
              <CKEditor
                editor={ClassicEditor}
                data={content}
                onChange={handleEditorChange}
                config={editorConfig}
              />
            </div>
          )}
        </Form.Item>

        <Form.Item label="Blog Date" name="blogdate">
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Blog Place"
          name="blogplace"
          rules={[{ required: true, message: "Please enter blog place!" }]}
        >
          <Input placeholder="e.g. New York, Online, etc." />
        </Form.Item>

        <Form.Item
          label="Blog URL"
          name="blogurl"
          rules={[{ required: true, message: "Blog URL is required!" }]}
        >
          <Input placeholder="Auto-generated slug, editable" />
        </Form.Item>

        <Form.Item
          label="Meta Title"
          name="metatitle"
          rules={[{ required: true, message: "Please enter meta title!" }]}
        >
          <Input placeholder="Meta title for SEO" />
        </Form.Item>

        <Form.Item
          label="Meta Description"
          name="metadescription"
          rules={[{ required: true, message: "Please enter meta description!" }]}
        >
          <Input.TextArea rows={2} placeholder="Meta description for search engines" />
        </Form.Item>

        <Form.Item
          label="Meta Keyword"
          name="metakeyword"
          rules={[{ message: "Please enter Meta Keyword!" }]}
        >
          <Input placeholder="Please enter Meta Keyword" />
        </Form.Item>
        <Form.Item
          label="Canonical URL"
          name="canonical"
          rules={[{ required: true, message: "Please enter canonical URL!" }]}
        >
          <Input placeholder="Canonical URL (e.g. https://yourdomain.com/blog/my-title)" />
        </Form.Item>
        <Form.Item
          label="Banner Url"
          name="bannerurl"
          // rules={[{ required: true, message: "Please enter canonical URL!" }]}
        >
          <Input placeholder="Enter Banner Url" />
        </Form.Item>

        <Form.Item
          label="Banner Image"
          name="bannerimage"
          valuePropName="fileList"
          getValueFromEvent={(e) => e?.fileList}
          // rules={[{ required: true, message: "Please upload an image!" }]}
        >
          <Upload beforeUpload={() => false} listType="picture">
            <Button icon={<UploadOutlined />}>Upload Banner</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button className="cssbuttons-io-button" type="primary" htmlType="submit" loading={loading} style={{ width: "100%" }}>
            Create Blog
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BlogCreate;