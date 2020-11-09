import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import router from 'next/router';
import { deletePostRequestAction } from '../reducer/post';
import { Avatar, Button, Card, Popover } from 'antd';
import { SmileOutlined, EllipsisOutlined, CommentOutlined, SmileTwoTone } from '@ant-design/icons';
import { PostCardContentContainer, PostCommentCount } from '../styles/components/Components';
import CommonModal from './CommonModal';

const PostCard = ({ data }) => {
  //console.log(JSON.stringify(data));
  const dispatch = useDispatch('');
  const { me } = useSelector((state) => (state.user));
  // modal content
  const [modalContent, setModalContent] = useState('');
  // modal 노출 여부
  const [showModal, setShowModal] = useState(false);
  // popover 노출 여부
  const [showPopOver, setShowPopOver] = useState(false);
  const [liked, setLiked] = useState(false);

  const onClickComment = useCallback(() => {
    router.push({
      pathname: '/comment',
      query: { postId: data.postId }
    });
  }, []);

  const onToggleSmile = useCallback(() => {
    setLiked((prevLiked) => !prevLiked);
  }, []);

  const onChangeShowPopOver = useCallback(() => {
    setShowPopOver((prevShowPopOver) => !prevShowPopOver);
  }, []);

  // 게시글 삭제
  const onClickDeletePostBtn = useCallback(() => {
    setModalContent({
      title: '게시글 삭제',
      onOk: onOkDeletePost,
      onCancel: onCancelDeletePost,
      content: '해당 게시글을 삭제하시겠습니까?',
    });
    setShowPopOver(false);
    setShowModal(true);
  }, []);

  // 게시글 삭제 modal ok
  const onOkDeletePost = useCallback(() => {
    dispatch(deletePostRequestAction({ postId: data.postId }));
    setShowModal(false);
  }, []);

  // 게시글 삭제 modal cancel
  const onCancelDeletePost = useCallback(() => {
    setShowModal(false);
  }, []);
  
  return (
    <>
      <Card 
        style={{ marginBottom: '1rem' }}
        actions={[
          <CommentOutlined key="comment" onClick={onClickComment}/>,
          liked
          ? <SmileTwoTone twoToneColor="#eb2f96" key="heartTwo" onClick={onToggleSmile}/>
          : <SmileOutlined key="like" onClick={onToggleSmile}/>,
          <Popover
            trigger="click"
            visible={showPopOver}
            onVisibleChange={onChangeShowPopOver}
            content={
              <div>
                {
                  me && (me.email === data.user.email) &&
                  <> 
                    <Button>수정</Button>
                    <Button 
                      onClick={onClickDeletePostBtn}
                    >
                      삭제
                    </Button>
                  </>
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
          {
            data && data.content.split('\n').map((list, i) => {
              return (<span key={i}>{list}<br /></span>)
            })
          }
          <PostCommentCount>
            {`댓글 ${data.comments.length}개`}
          </PostCommentCount>
        </PostCardContentContainer>
      </Card>
      <CommonModal
        modalContent={modalContent}
        visible={showModal}
      />
    </>
  );
};

export default PostCard;