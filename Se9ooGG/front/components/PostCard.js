import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import router from 'next/router';
import { deletePostRequestAction } from '../reducer/post';
import { Avatar, Button, Card, Popover } from 'antd';
import { SmileOutlined, EllipsisOutlined, CommentOutlined, SmileTwoTone } from '@ant-design/icons';
import { PostCardContentContainer, PostCommentCount } from '../styles/components/Components';
import CommonModal from './CommonModal';
import CommentCard from './CommentCard';

const PostCard = memo(({ data }) => {
  //console.log(JSON.stringify(data));
  const dispatch = useDispatch('');
  const { me } = useSelector((state) => (state.user));
  // modal content
  const [modalContent, setModalContent] = useState('');
  // modal 노출 여부
  const [showModal, setShowModal] = useState(false);
  // popover 노출 여부
  const [showPopOver, setShowPopOver] = useState(false);
  // tablet 이상 comment component 노출 여부
  const [showComment, setShowComment] = useState(false);
  // 좋아요 버튼
  const [liked, setLiked] = useState(false);

  const onClickComment = useCallback(() => {
    // 500px 이하에서는 comment 페이지로 이동
    if (window.innerWidth < 500) {
      router.push({
        pathname: '/comment',
        query: { postId: data.postId }
      });
    } else {
      setShowComment((prevShowComment) => !prevShowComment);
    }
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
    dispatch(deletePostRequestAction({ postId: data.post_id }));
    setShowModal(false);
  }, []);

  // 게시글 삭제 modal cancel
  const onCancelDeletePost = useCallback(() => {
    setShowModal(false);
  }, []);
  
  return (
    <>
      <Card
        style={{ marginTop: '1rem', border: '1px solid rgba(206, 212, 218, .5)' }}
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
                  me && (me.email === data.user_email) &&
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
          avatar={<Avatar>{data.user_nickname.slice(0, 1)}</Avatar>}
          title={data.post_title}
          description={data.user_nickname}
        />
        <PostCardContentContainer>
          {
            data && data.post_content.split('\n').map((list, i) => {
              return (<span key={i}>{list}<br /></span>)
            })
          }
          <PostCommentCount>
            {`댓글 ${data.comment.length}개`}
          </PostCommentCount>
        </PostCardContentContainer>
      </Card>
      {
        showComment 
        && data.comment
        && <CommentCard commentList={data.comment} postId={data.postId} />
      }
      <CommonModal
        modalContent={modalContent}
        visible={showModal}
      />
    </>
  );
});

export default PostCard;