import React from 'react';
import styled from 'styled-components';
import { ArrowRightOutlined, CloseOutlined } from '@ant-design/icons';

const BuildItems = ({ items, idx }) => {
  // 시간(분)
  const time = items[0].time;

  return items.length > 0 ? (
    <div>
      <ItemBlock>
        {idx !== 0 && <RightArrow />}
        <ItemList>
          {items.map((i, idx) => {
            return (
              <Item key={`${i.itemId + idx}`}>
                {i.type === 'ITEM_PURCHASED' && (
                  <PurchasedItem
                    key={idx}
                    src={`/img/item/${i.itemId}.png`}
                    alt="purchased item"
                  />
                )}
                {i.type === 'ITEM_SOLD' && (
                  <>
                    <SoldItem
                      key={idx}
                      src={`/img/item/${i.itemId}.png`}
                      alt="sold item"
                    />
                    <SoldIcon />
                  </>
                )}
              </Item>
            );
          })}
        </ItemList>
      </ItemBlock>
      <Time>{`${time}분`}</Time>
    </div>
  ) : null;
};

export default BuildItems;

const ItemBlock = styled.div`
  display: flex;
  align-items: center;
`;

const ItemList = styled.ol`
  display: flex;
  margin-bottom: 0.3rem;
  padding: 0.3rem;
  background-color: #e5e5e5;
`;

const Item = styled.li`
  position: relative;
  padding: 0 0.1rem;
`;

const PurchasedItem = styled.img`
  width: 2rem;
`;

const SoldItem = styled.img`
  width: 2rem;
  opacity: 0.7;
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

const RightArrow = styled(ArrowRightOutlined)`
  padding: 0 0.5rem;
`;
