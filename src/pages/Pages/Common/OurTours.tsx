import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { GetPageData, updatePageData } from "../../../config/apiFunctions";
import { useParams } from "react-router-dom";

interface PageFormProps {
  title: string;
  redirectAfterSubmit?: () => void;
}

const PageForm: React.FC<PageFormProps> = ({
  title,
  redirectAfterSubmit
}) => {
  const [form] = Form.useForm();
  const [isCodeMode, setIsCodeMode] = useState(false);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState<any>({});
  const [isChanged, setIsChanged] = useState(false);
  const slug = useParams().slug || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetPageData(slug);
        console.log(response);

        if (response?.pagedata) {
          const { header = "", subheader = "", content = "" } = response.pagedata;

          const formValues: any = { header };
          if (subheader?.trim()) formValues.subheader = subheader;

          form.setFieldsValue(formValues);
          setHtmlContent(content);
          setInitialValues({ ...formValues, content });
        }
      } catch (error) {
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
      };

      if (!isChanged) {
        message.warning("Change something to update.");
        return;
      }

      await updatePageData(slug, newPayload);
      message.success("Page updated successfully");
      setInitialValues({ ...values, content: htmlContent });
      setIsChanged(false);
      if (redirectAfterSubmit) redirectAfterSubmit();
    } catch (error) {
      message.error("Failed to submit page data");
    }
  };

  const cleanContent = (html: string): string => {
    if (!html) return "";
    let clean = html.replace(/<p>&nbsp;<\/p>/g, "");
    clean = clean.replace(/<p>\s*<\/p>/g, "");
    clean = clean.replace(/>\s+</g, "><");
    clean = clean.replace(/\n\s*/g, "");
    clean = clean.replace(/\s{2,}/g, " ");
    return clean.trim();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="common_wrp line_wrp">
      <h1 style={{ marginBottom: 20 }}>{title}</h1>
      <Form layout="vertical" form={form} onFinish={handleSubmit} onValuesChange={handleFormChange}>
        <h2>Banner Section</h2>
        <Form.Item label="Header" name="header">
          <Input />
        </Form.Item>

        <Form.Item label="Subheader" name="subheader">
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
              onChange={(e) => {
                setHtmlContent(cleanContent(e.target.value));
                handleFormChange();
              }}
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
                  handleFormChange();
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

export default PageForm;
