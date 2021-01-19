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
    // 되돌린 item은 최종 구매 배열에서 제외되도록
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
      } else if (item.type === 'ITEM_SOLD') {
        finalItemArr.push(item);
      }
    });
  }
  // 시간(분)
  const time = finalItemArr[0].time;
  
  return (
    finalItemArr.length > 0 
    ? (
    <div>
      <ItemList>
        {
          finalItemArr.map((i, idx) => {
            return (
              <Item>
                {i.type === 'ITEM_PURCHASED' && <PurchasedItem key={idx} src={`/img/item/${i.itemId}.png`} alt="purchased item" />}
                {
                  i.type === 'ITEM_SOLD' && 
                  <>
                    <SoldItem key={idx} src={`/img/item/${i.itemId}.png`} alt="sold item" />
                    <SoldIcon />
                  </>
                }
              </Item>
            );
          })
        }
      </ItemList>
      <Time>{`${time}분`}</Time>
    </div>
    )
    : null
  );
};

export default BuildItems;

const ItemList = styled.ol`
  display: flex;
  padding: .5rem 0;
`;

const Item = styled.li`
  position: relative;
`;

const PurchasedItem = styled.img`
  width: 2rem;
`;

const SoldItem = styled.img`
  width: 2rem;
  opacity: .7;
`;

const SoldIcon = styled(CloseOutlined)`
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 1.5rem;
  color: #e03131;
`;

const Time = styled.div`
  text-align: center;
`;