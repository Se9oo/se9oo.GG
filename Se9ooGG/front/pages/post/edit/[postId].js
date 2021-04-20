import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';
import AppLayout from '../../../components/AppLayout';
import EditPostForm from '../../../components/community/EditPostForm';
import { loadEditPostInfoRequestAction } from '../../../reducer/post';

const editPostById = () => {
  const router = useRouter();
  const dispatch = useDispatch('');
  const { editPostInfo } = useSelector((state) => state.post);

  useEffect(() => {
    if (router.query.postId) {
      dispatch(loadEditPostInfoRequestAction(router.query.postId));
    }
  }, [router.query.postId]);

  return (
    <AppLayout>
      <Head>
        <title>se9oo | 글 수정</title>
      </Head>
      {editPostInfo && <EditPostForm data={editPostInfo} />}
    </AppLayout>
  );
};

export default editPostById;
