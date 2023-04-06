/* eslint-disable react/prop-types */
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import LensIcon from '@mui/icons-material/Lens';

function Item({ text, value, index }) {
  return (
    <Draggable draggableId={text} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            style={{
              textAlign: 'center',
              backgroundColor: '#EAF0F4',
              width: '20rem !importent',
              borderRadius: 4,
              transition: 'background-color .8s ease-out',
              height: '6rem',
              alignItems: 'center',
              border: '1px solid #509aa887',
              marginTop: '8px',
            }}
          >
            <span
              className="commen-font"
              style={{ float: 'right', fontSize: '12px', padding: '5px' }}
            >
              {value.priority === 'low' ? (
                <LensIcon sx={{ fill: 'green', fontSize: '10px' }} />
              ) : value.priority === 'Medium' ? (
                <LensIcon sx={{ fill: 'orange', fontSize: '10px' }} />
              ) : (
                <LensIcon sx={{ fill: 'red', fontSize: '10px' }} />
              )}

              {value.priority}
            </span>
            <p style={{ color: '#0091ae', fontWeight: '700' }}>{text}</p>
            <span style={{ color: '#33475B' }}>
              <b>Amount:₹</b>
              {value.amount}
            </span>
            <br />
            <span style={{ color: '#33475B' }}>
              <b>Close Date:</b>
              {value.close_date}
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Item;
