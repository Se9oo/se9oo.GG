import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Button, Card, Popover } from 'antd';
import { SmileOutlined, EllipsisOutlined, CommentOutlined, SmileTwoTone } from '@ant-design/icons';
import { PostCardContentContainer } from '../styles/components/Components';

const PostCard = ({ data }) => {
  console.log(JSON.stringify(data));
  const { me } = useSelector((state) => (state.user));
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
        <Popover
          trigger="click"
          content={
            <div>
              {
                me && (me.email === data.user.email) && <Button>수정</Button>
              }
              <Button type="primary" danger>신고</Button>
            </div>
          }
        >
          <EllipsisOutlined key="ellipsis" />
        </Popover>
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{data.user.nickname.slice(0, 1)}</Avatar>}
        title={data.title}
        description={data.user.nickname}
      />
      <PostCardContentContainer>
        <p>{data.content}</p>
      </PostCardContentContainer>
    </Card>
  );
};

export default PostCard;