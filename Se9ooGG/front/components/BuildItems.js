import React from 'react';
import styled from 'styled-components';

const BuildItems = ({ items }) => {
  // 되돌린 item list
  const undoItems = [];
  items.map((undo) => {
    if (undo.type === 'ITEM_UNDO') {
      undoItems.push(undo.beforeId);
    }
  });

  let undoCount = undoItems.length;
  let finalItemArr = [];
  if (undoItems.length !== 0) {
     items.map((item) => {
      if (item.type === 'ITEM_PURCHASED') {
        if (undoCount === 0) {
          finalItemArr.push(item);
        } else {
          if (undoItems.includes(item.itemId)) {
            undoCount--;
          } else {
            finalItemArr.push(item);
          }
        }
      }
    });
  } else {
    finalItemArr = [...items];
  }
  
  return (
    <Item>
      {
        finalItemArr.map((i) => {
          if (i.type === 'ITEM_PURCHASED') {
            return <ItemImg src={`/img/item/${i.itemId}.png`} />
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

const ItemImg = styled.img`
  width: 50px;
  height: 50px;
`;