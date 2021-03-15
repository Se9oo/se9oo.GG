import React from 'react';
import { Modal } from 'antd';

export function errorModal(msg) {
  Modal.error({
    title: 'ERROR',
    content: (
      <p>
        {msg &&
          msg.split('\n').map((line, i) => {
            return (
              <span key={i}>
                {line}
                <br />
              </span>
            );
          })}
      </p>
    ),
    okText: '닫기',
  });
}

export function infoModal(msg) {
  Modal.info({
    title: 'INFO',
    content: (
      <p>
        {msg &&
          msg.split('\n').map((line, i) => {
            return (
              <span key={i}>
                {line}
                <br />
              </span>
            );
          })}
      </p>
    ),
    okText: '닫기',
  });
}

const CommonModal = ({ modalContent, visible }) => {
  return (
    <Modal
      title={modalContent.title}
      visible={visible}
      onOk={modalContent.onOk}
      onCancel={modalContent.onCancel}
      okText="예"
      cancelText="아니요"
    >
      <p>
        {modalContent.content &&
          modalContent.content.split('\n').map((line, i) => {
            return (
              <span key={i}>
                {line}
                <br />
              </span>
            );
          })}
      </p>
    </Modal>
  );
};

export default CommonModal;
