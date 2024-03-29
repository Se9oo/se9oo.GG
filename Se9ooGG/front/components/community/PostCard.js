import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import router from 'next/router';
import crypto from 'crypto-js';
import { deletePostRequestAction, likeRequestAction, reportRequestAction } from '../../reducer/post';
import { Avatar, Button, Card, Popover } from 'antd';
import { SmileOutlined, EllipsisOutlined, CommentOutlined, SmileTwoTone } from '@ant-design/icons';
import CommonModal, { infoModal } from '../CommonModal';
import CommentCard from './CommentCard';
import styled from 'styled-components';

const PostCard = memo(({ data }) => {
  const dispatch = useDispatch('');
  const { me } = useSelector((state) => state.user);
  // modal content
  const [modalContent, setModalContent] = useState('');
  // modal 노출 여부
  const [showModal, setShowModal] = useState(false);
  // popover 노출 여부
  const [showPopOver, setShowPopOver] = useState(false);
  // tablet 이상 comment component 노출 여부
  const [showComment, setShowComment] = useState(false);
  // 좋아요 버튼
  const [liked, setLiked] = useState(data.isLike || false);

  const onClickComment = useCallback(() => {
    // 500px 이하에서는 comment 페이지로 이동
    if (window.innerWidth < 500) {
      router.push({
        pathname: '/comment/[postId]',
        query: { postId: data.postId },
      });
    } else {
      setShowComment((prevShowComment) => !prevShowComment);
    }
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
  }, [data.postId]);

  // 게시글 삭제 modal cancel
  const onCancelDeletePost = useCallback(() => {
    setShowModal(false);
  }, []);

  // 게시글 수정
  const onClickEditPostBtn = useCallback(() => {
    const encryptedPostId = crypto.AES.encrypt(String(data.postId), process.env.CRYPTO_SECRET).toString();
    
    router.push({
      pathname: '/post/edit/[postId]',
      query: { postId: encryptedPostId },
    });
  }, []);

  // 게시글 좋아요 등록/해제
  const onToggleSmile = useCallback(() => {
    dispatch(likeRequestAction({ postId: data.postId, action: liked ? 'cancel' : 'add'}));

    setLiked((prevLiked) => !prevLiked);
  }, [liked]);

  // 신고하기
  const onClickReport = () => {
    if (!me) {
      infoModal('신고 기능은 로그인이 필요합니다.\n로그인 페이지로 이동합니다.');
      router.push('/login');
    } else {
      setModalContent({
        title: '게시글 신고',
        onOk: onOkReport,
        onCancel: onCancelReport,
        content: '해당 게시글을 신고 하시겠습니까?',
      });
      setShowPopOver(false);
      setShowModal(true);
    }
  }

  // 신고 하기 ok
  const onOkReport = () => {
    dispatch(reportRequestAction({ postId: data.postId }));
    setShowModal(false);
  };

  // 신고 하기 cancel
  const onCancelReport = () => {
    setShowModal(false);
  };

  return (
    <>
      <Card
        style={{
          marginTop: '1rem',
          border: '1px solid rgba(206, 212, 218, .5)',
        }}
        actions={[
          <CommentOutlined key="comment" onClick={onClickComment} />,
          me ? (
            liked ? (
              <SmileTwoTone twoToneColor="#eb2f96" key="heartTwo" onClick={onToggleSmile} />
            ) : (
              <SmileOutlined key="like" onClick={onToggleSmile} />
            )
          ) : null,
          <Popover
            trigger="click"
            visible={showPopOver}
            onVisibleChange={onChangeShowPopOver}
            content={
              <div>
                {me && me.email === data.email && (
                  <>
                    <Button onClick={onClickEditPostBtn}>수정</Button>
                    <Button onClick={onClickDeletePostBtn}>삭제</Button>
                  </>
                )}
                <Button type="primary" danger onClick={onClickReport}>
                  신고
                </Button>
              </div>
            }
          >
            <EllipsisOutlined key="ellipsis" />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{data.nickname.slice(0, 1)}</Avatar>}
          title={data.title}
          description={data.nickname}
        />
        <PostCardContentContainer>
          {data &&
            data.content.split('\n').map((list, i) => {
              return (
                <span key={i}>
                  {list}
                  <br />
                </span>
              );
            })}
          <PostCommentCount>{`댓글 ${data.comments.length}개`}</PostCommentCount>
          <PostLikeCount>{`좋아요 ${data.likeCount || 0}개`}</PostLikeCount>
        </PostCardContentContainer>
      </Card>
      {showComment && data.comments && <CommentCard commentList={data.comments} postId={data.postId} />}
      <CommonModal modalContent={modalContent} visible={showModal} />
    </>
  );
});

const PostCardContentContainer = styled.div`
  margin-top: 2rem;
`;

const PostCommentCount = styled.span`
  display: block;
  margin-top: 2rem;
  color: #ced4da;
`;

const PostLikeCount = styled.span`
  color: #ced4da;
`;

export default PostCard;
