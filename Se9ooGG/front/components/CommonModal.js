import React from 'react';
import { Modal } from 'antd';

export function errorModal(msg) {
  Modal.error({
    title: 'ERROR',
    content: `${msg}`,
    okText: '닫기',
  })
}

const CommonModal = ({ title, visible, onOk, onCancel, okText, cancelText, content }) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
    >
      <p>{content}</p>
    </Modal>
  );
};

export default CommonModal;