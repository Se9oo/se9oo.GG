import React from 'react';
import { Avatar, Card } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const PostCard = ({ data }) => {
  return (
    <Card 
      style={{ marginBottom: '1rem' }}
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{data.nickname.slice(0, 1)}</Avatar>}
        title={data.title}
        description={data.nickname}
      />
      
    </Card>
  );
};

export default PostCard;