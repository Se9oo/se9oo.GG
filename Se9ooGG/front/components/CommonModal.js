import React from 'react';
import { Modal } from 'antd';

export function errorModal(msg) {
  Modal.error({
    title: 'ERROR',
    content: `${msg}`,
    okText: '닫기',
  })
}

const CommonModal = ({ title, visible, onOk, onCancel, content }) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText='예'
      cancelText='아니요'
    >
      <p>
        {
          content.split('\n').map((line) => {
            return (<span>{line}<br/></span>)
          })
        }
      </p>
    </Modal>
  );
};

export default CommonModal;