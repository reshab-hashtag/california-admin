import React, { useEffect, useState } from "react";
import { Table, Button, message, Spin, Popconfirm, Input, Space } from "antd";
import { ListBlog,DeleteBlog } from "../../config/apiFunctions";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await ListBlog();
        
        // Add serial number to each blog for display
        const blogsWithIndex = response.map((blog, index) => ({
          ...blog,
          serialNumber: index + 1
        }));
        
        setBlogs(blogsWithIndex);
        setFilteredData(blogsWithIndex);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        message.error("Failed to fetch blogs. Please try again.");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Handle search functionality
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    
    if (value) {
      const filtered = blogs.filter(blog => 
        blog.title.toLowerCase().includes(value.toLowerCase()) || 
        (blog.blogdate && new Date(blog.blogdate).toLocaleDateString().includes(value))
      );
      
      // Update serial numbers for filtered data
      const filteredWithIndex = filtered.map((blog, index) => ({
        ...blog,
        serialNumber: index + 1
      }));
      
      setFilteredData(filteredWithIndex);
    } else {
      setFilteredData(blogs);
    }
  };

  // Columns for the Ant Design table
  const columns = [
    {
      title: "Sl No",
      dataIndex: "serialNumber",
      key: "serialNumber",
      width: 80
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title)
    },
    {
      title: "Blog Date",
      dataIndex: "blogdate",
      key: "blogdate",
      sorter: (a, b) => new Date(a.blogdate) - new Date(b.blogdate),
      render: (date) => {
        // Format the date as needed
        return date ? new Date(date).toLocaleDateString() : "N/A";
      }
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            size="small" 
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this blog?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              type="primary" 
              danger 
              icon={<DeleteOutlined />} 
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleEdit = (blog) => {
    console.log("Edit blog:", blog);
    navigate(`/blogs/edit/${blog._id}`);
  };

  const handleDelete = async(id) => {
    console.log("Delete blog with ID:", id);
    await DeleteBlog(id)    
    message.success("Blog deleted successfully");
    navigate('/blogs')
  };

  const handleCreate = () => {
    navigate("/blogs/create");
  };

  return (
    <div className="blog-list common_wrp searchpnl">
      <h1>Blog List</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <Button type="primary" onClick={handleCreate} className="cssbuttons-io-button">
          Create New Blog
        </Button>
        <Input.Search
  
          placeholder="Search blogs..."
          value={searchText}
          onChange={handleSearch}
          style={{ width: 300 }}
          allowClear
          prefix={<SearchOutlined />}
        />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 24 }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
          }}
          bordered
          size="middle"
          scroll={{ x: 'max-content' }}
        />
      )}
    </div>
  );
};

export default BlogList;