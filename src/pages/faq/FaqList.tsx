import React, { useEffect, useState } from 'react';
import { Table, Button, message, Spin, Switch, Popconfirm } from "antd";
import { useNavigate } from 'react-router-dom';
import { ListFaq, updateFaq, deleteFaq } from "../../config/apiFunctions"; // Ensure deleteFaq exists
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";

const List: React.FC = () => {
  const navigate = useNavigate();
  const [faqlist, setfaqList] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCreate = () => {
    navigate("/faq/create");
  };

  const fetchFaq = async () => {
    try {
      const response = await ListFaq();
      setfaqList(response);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      message.error("Failed to fetch FAQs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/faq/${id}`);
  };

  const handlePublishToggle = async (checked: boolean, record: any) => {
    try {
      await updateFaq(record._id, { isPublished: checked });
      message.success(`FAQ ${checked ? 'published' : 'unpublished'} successfully.`);
      setfaqList((prev: any) =>
        prev.map((faq: any) =>
          faq._id === record._id ? { ...faq, isPublished: checked } : faq
        )
      );
    } catch (err) {
      console.error("Error updating publish status:", err);
      message.error("Failed to update status. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFaq(id);
      setfaqList((prev: any) => prev.filter((faq: any) => faq._id !== id));
      message.success("FAQ deleted successfully.");
    } catch (err) {
      console.error("Error deleting FAQ:", err);
      message.error("Failed to delete FAQ. Please try again.");
    }
  };

  useEffect(() => {
    fetchFaq();
  }, []);

  const columns = [
    {
      title: "Sl No",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Answer",
      dataIndex: "answer",
      key: "answer",
    },
    {
      title: "Published",
      dataIndex: "isPublished",
      key: "isPublished",
      render: (_: any, record: any) => (
        <Switch
          checked={record.isPublished}
          onChange={(checked) => handlePublishToggle(checked, record)}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div className='action_btn common_wrp'>
          <Button className='edit_btn' type="link" onClick={() => handleEdit(record._id)} >
                 <EditOutlined />
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this FAQ?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
            
          >
            <Button className='dlt_btn' type="link" danger>
   
            <DeleteOutlined /> Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
    <div className='common_wrp'>
      <h1>FAQ List</h1>
      <Button className="cssbuttons-io-button" type="primary" onClick={handleCreate} style={{ marginBottom: "20px" }}>
        Create FAQ
      </Button>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={faqlist}
          rowKey="_id"
          pagination={false}
        />
      )}
      </div>
    </>
  );
};

export default List;
