/* eslint-disable react/prop-types */
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Item from './Item';

function Column({ col: { list, id, name, data } }) {
  let total = 0;
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'block',
              width: '100%',
              minHeight: '30px',
              backgroundColor: 'rgb(245, 248, 250)',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgb(223, 227, 235)',
            }}
          >
            <h2
              style={{
                fontSize: '0.8rem',
                fontFamily:
                  'var(--uicomponents-font-family,"Avenir Next W02","Lexend Deca",Helvetica,Arial,sans-serif)',
                color: '#33475b',
              }}
            >
              {name}
            </h2>
          </div>
          <div
            style={{
              backgroundColor: '#fff',
              padding: 16,
              width: '15rem',
              height: '100%',
              overflowX: 'auto',
              marginTop: 0,
              border: '1px solid rgb(223, 227, 235)',
            }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {data?.map((text, index) => {
              total += text.amount;
              return (
                <Item
                  key={text._id}
                  value={text}
                  text={text.deal_name}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: '4rem',
              backgroundColor: 'rgb(245, 248, 250)',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgb(223, 227, 235)',
            }}
          >
            <span>
              <span>Total:</span>
              <span>₹{total}.00</span>
            </span>
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default Column;
