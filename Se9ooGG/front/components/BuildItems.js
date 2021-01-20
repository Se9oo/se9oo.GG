import React from 'react';
import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

const BuildItems = ({ items }) => {
  // 시간(분)
  const time = items[0].time;

  return (
    items.length > 0 
    ? (
    <div>
      <ItemList>
        {
          items.map((i, idx) => {
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