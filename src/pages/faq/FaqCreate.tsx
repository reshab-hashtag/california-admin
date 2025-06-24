import React, { useState } from "react";
import { Button, Row, Col, Form, Input, Switch, message } from "antd";
import { useNavigate } from "react-router-dom";
import { addFaq } from "../../../src/config/apiFunctions";

const FaqCreate: React.FC = () => {
  const [formData, setFormData] = useState<any>({
    isPublished: true
  });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await addFaq(formData);
      message.success("FAQ successfully added");
      navigate("/faq"); 
    } catch (err: any) {
      console.error("Error adding FAQ:", err);
      const errorMessage =
        err.response?.data?.error || "Something went wrong. Please try again.";
      message.error(errorMessage);
    }
  };

  return (
    <div className="faq_sec_wrap common_wrp">
      <Form layout="vertical" onFinish={handleSubmit}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              label="Question"
              name="question"
              rules={[{ required: true, message: "Please enter a question!" }]}
            >
              <Input.TextArea
                placeholder="Enter question"
                style={{ height: "40px" }}
                onChange={(e) =>
                  setFormData((prev: any) => ({ ...prev, question: e.target.value }))
                }
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Answer"
              name="answer"
              rules={[{ required: true, message: "Please enter an answer!" }]}
            >
              <Input.TextArea
                placeholder="Enter answer"
                style={{ height: "40px" }}
                onChange={(e) =>
                  setFormData((prev: any) => ({ ...prev, answer: e.target.value }))
                }
              />
            </Form.Item>
          </Col>
        </Row>

        

        <Row>
          <Col span={4}>
            <Form.Item>
              <Button className="cssbuttons-io-button" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FaqCreate;
