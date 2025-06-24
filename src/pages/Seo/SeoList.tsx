import React, { useEffect, useState } from "react";
import { Button, Table, Spin } from "antd";
import { ListSeo } from "../../../src/config/apiFunctions";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

const SeoList: React.FC = ({ }) => {
    const [seoList, setSeoList] = useState<any[]>([])
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const getSeoList = async () => {
        try {
            const response = await ListSeo();
            setSeoList(response);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching SEO list:", err);
            setLoading(false);
        }
    };
    useEffect(() => {
        getSeoList()
    }, [seoList.length])
    const handleEdit = (pageslug: any) => {
        navigate(`${pageslug}`)
    }
    const columns = [
        {
            title: "Page",
            dataIndex: "page",
            key: "page",
            render: (page: any) => page?.page || "-"
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: any) => (
                <Button className='edit_btn' type="link" onClick={() => handleEdit(record._id)}>
                    <EditOutlined /> Edit
                </Button>
            ),
        },
    ];
    return (
        <>
            <div className="searchpnl blog-list common_wrp">
                <h1>Seo</h1>
                <Button className="cssbuttons-io-button" type="primary" style={{ marginBottom: "20px" }}>
                    <Link to="/seo/create">Add Seo</Link>
                </Button>
                {loading ? (
                    <Spin size="large" />
                ) : (
                    <Table
                        columns={columns}
                        dataSource={seoList}
                        rowKey="id"
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                        }}
                    />
                )}

            </div>
        </>
    )
}
export default SeoList;
