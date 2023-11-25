import React from "react";
import { App, Avatar, Button, Image, Space, Tooltip, Typography } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const Content = () => (
    <Space direction="vertical">
        <Typography.Text strong>Web Application</Typography.Text>
        <Space>
            <Avatar src='/react.png' size={30} />
            <Typography.Text>React A JavaScript library</Typography.Text>
        </Space>
        <Space>
            <Avatar src='/antd.png' size={30} />
            <Typography.Text>Ant Design React UI library</Typography.Text>
        </Space>
        <Typography.Text strong>Data structures and algorithms</Typography.Text>
        <Typography.Text>Circular Doubly Linked List</Typography.Text>
    </Space>
)

const Credit = () => {
    const { modal } = App.useApp();

    const showCredit = () => {
        modal.success({
            title: 'Credit',
            content: Content(),
            okText: 'เข้าใจแล้ว'
        });
    };
    return (
        <Tooltip title='Credit'>
            <Button type="text" shape="circle" size="large" icon={<QuestionCircleOutlined />} onClick={showCredit} />
        </Tooltip>
    )
}

export default Credit;