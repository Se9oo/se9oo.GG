import React, { useCallback, useState } from 'react';
import { Avatar, Card } from 'antd';
import { SmileOutlined, EllipsisOutlined, CommentOutlined, SmileTwoTone } from '@ant-design/icons';

const PostCard = ({ data }) => {
  const [liked, setLiked] = useState(false);

  const onToggleSmile = useCallback(() => {
    setLiked((prevLiked) => !prevLiked);
  }, []);
  
  return (
    <Card 
      style={{ marginBottom: '1rem' }}
      actions={[
        <CommentOutlined key="comment"/>,
        liked
        ? <SmileTwoTone twoToneColor="#eb2f96" key="heartTwo" onClick={onToggleSmile}/>
        : <SmileOutlined key="like" onClick={onToggleSmile}/>,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{data.user.nickname.slice(0, 1)}</Avatar>}
        title={data.title}
        description={data.user.nickname}
      />
    </Card>
  );
};

export default PostCard;