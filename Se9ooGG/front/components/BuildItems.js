import React from 'react';

const BuildItems = ({ items, time }) => {
  return (
    <>
      {
        items.map((i) => {
          return <div>{`${time} : ${i.type}`}</div>
        })
      }
    </>
  );
};

export default BuildItems;