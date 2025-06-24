import React, { useEffect, useState } from "react";
import { useParams, useNavigate,Outlet } from "react-router-dom";
import { Form, Input, Row, Col, Button, Switch, Spin, message } from "antd";
import { FaqDetails, updateFaq } from "../../../src/config/apiFunctions";

const FaqEdit: React.FC = () => {
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      fetchFaqDetails(id);
    }
  }, [id]);

  const fetchFaqDetails = async (faqId: string) => {
    try {
      const res = await FaqDetails(faqId);
      console.log("res",res);
      setFormData(res);
      form.setFieldsValue(res); 
    } catch (err) {
      console.error("Error fetching FAQ:", err);
      message.error("Failed to load FAQ details");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      await updateFaq(id as string, values);
      message.success("FAQ successfully updated");
      navigate("/faq");
    } catch (err: any) {
      console.error("Error updating FAQ:", err);
      const errorMessage =
        err.response?.data?.error || "Something went wrong. Please try again.";
      message.error(errorMessage);
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="our_pnl common_wrp">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              label="Question"
              name="question"
              rules={[{ required: true, message: "Please enter a question!" }]}
            >
              <Input.TextArea placeholder="Enter question" style={{ height: "40px" }} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Answer"
              name="answer"
              rules={[{ required: true, message: "Please enter an answer!" }]}

            >
              <Input.TextArea placeholder="Enter answer" style={{ height: "40px" }} />
            </Form.Item>
          </Col>          
        </Row>

        <Row>
          <Col span={4}>
            <Form.Item>
              <Button className="cssbuttons-io-button" type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Outlet />
    </div>
  );
};

export default FaqEdit;
