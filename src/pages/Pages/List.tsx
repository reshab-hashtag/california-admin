import React, { useEffect, useState } from 'react';
import { Table, Button, message, Spin } from "antd";
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { ListPages } from "../../config/apiFunctions";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";

const List: React.FC = () => {
  const navigate = useNavigate();
  const [pageslist, setpageList] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleCreate = () => {
    navigate("/pages/create")
  }
  const fetchBlogs = async () => {
    try {
      const response = await ListPages();
      //console.log("response====",response);
      setpageList(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      message.error("Failed to fetch blogs. Please try again.");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  const handleEdit = (pageslug: string) => {
    console.log("Edit pageslug:", pageslug);
    // switch (pageslug) {
    //   case "home":
    //     navigate("/pages/home")
    //     break;
    //   case "about":
    //     navigate("/pages/about")
    //     break;
    //   default:
    //     console.log("Editing Default Page");
    //     break;
    // }
   navigate(`/pages/${pageslug}`);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "page",
      key: "page",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Button className='edit_btn' type="link" onClick={() => handleEdit(record.pageslug)}>
          <EditOutlined /> Edit
        </Button>
      ),
    },
  ];

  // const filteredData = pageslist?.filter(
  //   (record: any) => record?.pagedata && Object.keys(record?.pagedata).length > 0
  // );
  const filteredData = pageslist?.filter(
    (record: any) => record?.pagedata // skip checking length
  );


  return (
    <div className='common_wrp searchpnl'>
      <h1>Pages List</h1>
      {/* <Button className='cssbuttons-io-button' type="primary" onClick={handleCreate} style={{ marginBottom: "20px" }}>
                Create New Page
            </Button> */}
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={pageslist}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      )}
      <Outlet />
    </div>
  );
};

export default List;