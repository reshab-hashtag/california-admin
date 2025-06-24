import React,{useState,useEffect} from "react";
import { Button, Row, Col, Form, Input,Select,message } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
import { ListPages,addSeoData } from "../../../src/config/apiFunctions";
import { useNavigate } from "react-router-dom";
const SeoCreate: React.FC = ({}) => {
    const [pageList,setPageList]=useState<any[]>([])
    const [formData,setFormData] = useState<any[]>([])
    const navigate = useNavigate();
        const getSeoList = async () => {
            try {
                const response = await ListPages();
                //console.log("response====>", response);
                setPageList(response);
            } catch (err) {
                console.error("Error fetching SEO list:", err);
            }
        };
        useEffect(()=>{
            getSeoList()
        },[pageList.length])
        const handleSubmit = async()=>{
            try {
                const response = await addSeoData(formData);
                message.success('Seo successfully added');
                navigate('/seo')
                //console.log("response====>", response);
            }catch(err:any){
                console.error("Error add SEO :", err);
                const errorMessage = err.response?.data?.error || "Something went wrong. Please try again.";

                message.error(errorMessage);
            }
        }
    return(
        <>
      <div className="add_seo common_wrp">
            <Form layout="vertical" onFinish={handleSubmit}>
                <Row                                    
                    gutter={[16, 16]}
                    align="middle"
                    style={{ display: "flex", flexWrap: "nowrap" }}
                >
                    <Col span={12}>
                        <Form.Item label="Select Page"  name="page" style={{ marginBottom: 0 }}
                        rules={[{ required: true, message: "Please select a page!" }]}>
                            <Select
                                placeholder="Select Page"
                                style={{ height: "40px", width: "100%" }}        
                                onChange={(value)=>setFormData((prev =>({ ...prev, page:value })))}                
                            >
                                <Select.Option key={0} value="">Select Page</Select.Option>
                                {
                                    pageList?.map((val:any,index:number)=>(
                                        <Select.Option key={index+1} value={val._id}>{val.page}</Select.Option>
                                    ))
                                }                            
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Title" name="title" style={{ marginBottom: 0 }}>
                            <Input.TextArea
                                placeholder="Enter Title"
                                style={{ height: "40px" }}
                                onChange={(e)=>setFormData((prev =>({ ...prev, title:e.target.value })))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row                                    
                    gutter={[16, 16]}
                    align="middle"
                    style={{ marginBottom: "10px", display: "flex", flexWrap: "nowrap" }}
                >
                    <Col span={12}>
                        <Form.Item label="Description" name="description" style={{ marginBottom: 0 }}>
                            <Input.TextArea
                                placeholder="Enter Description"
                                style={{ height: "40px" }}                                
                                onChange={(e)=>setFormData((prev =>({ ...prev, description:e.target.value })))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Keyword" style={{ marginBottom: 0 }}>
                            <Input.TextArea
                                placeholder="Enter Keyword"
                                style={{ height: "40px" }}
                                name="keyword"
                                onChange={(e)=>setFormData((prev =>({ ...prev, [e.target.name]:e.target.value })))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row                                    
                    gutter={[16, 16]}
                    align="middle"
                    style={{ marginBottom: "10px", display: "flex", flexWrap: "nowrap" }}
                >
                    <Col span={24}>
                        <Form.Item label="Canonical tag" style={{ marginBottom: 0 }}>
                            <Input.TextArea
                                placeholder="Enter canonical tag"
                                style={{ height: "40px" }}
                                name="canonical"
                                onChange={(e)=>setFormData((prev =>({ ...prev, [e.target.name]:e.target.value })))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row                                    
                    gutter={[16, 16]}
                    align="middle"
                    style={{ marginBottom: "10px", display: "flex", flexWrap: "nowrap" }}
                >
                    <Col span={4}>
                        <Form.Item>
                            <Button className="cssbuttons-io-button" type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Col>                        
                </Row>
            </Form>
            </div>
        </>
    )
}
export default SeoCreate;
