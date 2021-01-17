import React from 'react';
import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

const BuildItems = ({ items }) => {
  // 되돌린 item list
  const undoItems = [];
  items.map((undo) => {
    if (undo.type === 'ITEM_UNDO') {
      undoItems.push(undo.beforeId);
    }
  });

  // 되돌린 아이템 수 체크 횟수
  let undoCount = undoItems.length;
  // 최종 구매/판매 item 배열
  let finalItemArr = [];
  // 되돌린 item이 없으면
  if (undoItems.length === 0) {
    // props로 받은 items 배열 최종 구매/판매 item 배열로 세팅
    finalItemArr = [...items];
  } else {
    // 되돌린 item은 최종 구매/판매 배열에서 제외되도록
    items.map((item) => {
      if (item.type === 'ITEM_PURCHASED') {
        if (undoCount === 0) {
          finalItemArr.push(item);
        } else {
          // 
          if (undoItems.includes(item.itemId)) {
            undoCount--;
          } else {
            finalItemArr.push(item);
          }
        }
      }
    });
  }
  
  return (
    <Item>
      {
        finalItemArr.map((i) => {
          if (i.type === 'ITEM_PURCHASED') {
            return <PurchasedItem src={`/img/item/${i.itemId}.png`} alt="purchased item" />
          } else if (i.type === 'ITEM_SOLD') {
            return (
              <Sold>
                <SoldItem src={`/img/item/${i.itemId}.png`} alt="sold item" />
                <SoldIcon />
              </Sold>
            )
          }
        })
      }
    </Item>
  );
};

export default BuildItems;

const Item = styled.div`
  display: flex;
`;

const PurchasedItem = styled.img`
  width: 50px;
  height: 50px;
`;

const Sold = styled.div`
  position: relative;
`;

const SoldItem = styled.img`
  width: 50px;
  height: 50px;
  opacity: .7;
`;

const SoldIcon = styled(CloseOutlined)`
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 2.5rem;
  color: #e03131;
`;