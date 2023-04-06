import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import {
  Box,
  Container,
  IconButton,
  InputBase,
  MenuItem,
  Select,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Column from '../../components/User/DealColumn/Column';
import CreateDeal from '../../components/User/DealColumn/CreateDeal';
import * as dealService from '../../services/dealService';
import Header from '../../components/User/Header/Header';

function Deals() {
  const initialColumns = {
    SHEDULED: {
      id: 'SHEDULED',
      list: [],
      data: [],
      name: 'APPOINTMENT SCHEDULED',
    },
    QUALIFIED: {
      id: 'QUALIFIED',
      list: [],
      data: [],
      name: 'QUALIFIED TO BUY',
    },
    PRESENTATION: {
      id: 'PRESENTATION',
      list: [],
      data: [],
      name: 'PRESENTATION SHEDULED',
    },
    DECISION: {
      id: 'DECISION',
      list: [],
      data: [],
      name: 'DECISION MAKER BOUGHT-IN',
    },
    SENT: {
      id: 'SENT',
      list: [],
      data: [],
      name: 'CONTRACT SENT',
    },
    WON: {
      id: 'WON',
      list: [],
      data: [],
      name: 'CLOSED WON',
    },
    LOST: {
      id: 'LOST',
      data: [],
      name: 'CLOSED LOST',
      list: [],
    },
  };
  const [deals, setDeals] = useState([]);
  const [columns, setColumns] = useState(initialColumns);
  const getAllDeals = async () => {
    const response = await dealService.getAllDealService();
    console.log(response);
    if (response) {
      response.map((item) => {
        if (item.deal_stage === 'APPOINTMENT SCHEDULED') {
          initialColumns.SHEDULED.list.push(item.deal_stage);
          initialColumns.SHEDULED.data.push(item);
        } else if (item.deal_stage === 'QUALIFIED TO BUY') {
          initialColumns.QUALIFIED.list.push(item.deal_stage);
          initialColumns.QUALIFIED.data.push(item);
        } else if (item.deal_stage === 'PRESENTATION SHEDULED') {
          initialColumns.PRESENTATION.list.push(item.deal_stage);
          initialColumns.PRESENTATION.data.push(item);
        } else if (item.deal_stage === 'DECISION MAKER BOUGHT-IN') {
          initialColumns.DECISION.list.push(item.deal_stage);
          initialColumns.DECISION.data.push(item);
        } else if (item.deal_stage === 'CONTRACT SENT') {
          initialColumns.SENT.list.push(item.deal_stage);
          initialColumns.SENT.data.push(item);
        } else if (item.deal_stage === 'CLOSED WON') {
          initialColumns.WON.list.push(item.deal_stage);
          initialColumns.WON.data.push(item);
        } else {
          initialColumns.LOST.list.push(item.deal_stage);
          initialColumns.LOST.data.push(item);
        }
      });
      setDeals(response);
      setColumns(initialColumns);
    }
  };
  const [deal, setDeal] = React.useState('allDeal');
  useEffect(() => {
    getAllDeals();
  }, []);

  const handleChange = (event) => {
    setDeal(event.target.value);
  };

  const onDragEnd = (DropResult) => {
    const { source, destination } = DropResult;
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    ) {
      return null;
    }

    // Set start and end variables
    const start = columns[source.droppableId]; // todo
    const end = columns[destination.droppableId]; // doing

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = [];
      start.list.forEach((val, idx) => {
        if (idx !== source.index && idx <= 2) {
          newList.push(val);
        }
      });

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList,
        name: start.name,
        data: start.data,
      };

      // Update the state
      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    }
    // If start is different from end, we need to update multiple columns
    // Filter the start list like before
    const newStartList = start.list.filter(
      (value, idx) => idx !== source.index
    );
    const newStartData = start.data.filter(
      (value, idx) => idx !== source.index
    );

    // droping item data

    // Create a new start column
    const newStartCol = {
      id: start.id,
      list: newStartList,
      name: start.name,
      data: newStartData,
    };

    // Make a new end list array
    const newEndList = end.list;
    const newEndData = end.data;

    // Insert the item into the end list
    newEndList.splice(destination.index, 0, start.list[source.index]);
    newEndData.splice(destination.index, 0, start.data[source.index]);

    // Create a new end column
    const newEndCol = {
      id: end.id,
      list: newEndList,
      name: end.name,
      data: newEndData,
    };

    // Update the state
    setColumns((state) => ({
      ...state,
      [newStartCol.id]: newStartCol,
      [newEndCol.id]: newEndCol,
    }));
    const dropData = start.data[source.index];
    const dropDataId = dropData._id;
    const dropColName = newEndCol.name;
    dealService.updateDeal(dropColName, dropDataId);
    return null;
  };
  return (
    <>
      <Header />
      <Box
        sx={{
          width: '100%',
          height: '80px',
          border: '1px solid rgb(223, 227, 235)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'white',
        }}
      >
        <Box
          sx={{
            width: '43rem',
            height: '2.5rem',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <span
            className="commen-font"
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'rgb(0, 145, 174)',
            }}
          >
            Deals
          </span>
          <Box
            sx={{
              width: '12rem',
              height: '2.5rem',
              mr: '12px',
              border: '1px solid #F5F8FA',
              borderRadius: '5px',
            }}
          >
            <Select
              sx={{ width: '100%', height: '100%', backgroundColor: '#F5F8FA' }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={deal}
              defaultValue="allDeal"
              onChange={handleChange}
            >
              <MenuItem value="allDeal">All Deals</MenuItem>
              <MenuItem value="myDeal">My Deals</MenuItem>
            </Select>
          </Box>
        </Box>
        <Box sx={{ width: '20rem', height: '2.5rem', mr: '20px' }}>
          <CreateDeal getAllDeals={getAllDeals} />
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box sx={{ border: '1px solid grey', ml: '25px' }}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Deal"
            inputProps={{ 'aria-label': 'search ' }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

      <DragDropContext onDragEnd={onDragEnd}>
        <Container maxWidth="xl">
          <div>
            <div
              style={{
                display: 'flex',
                width: '100',
                minHeight: '68vh',
                // gap: '1px',
                border: '1px solid rgb(223, 227, 235)',
                backgroundColor: 'grey',
                overflowX: 'scroll',
              }}
            >
              {Object.values(columns).map((col) => (
                <Column col={col} key={col.id} />
              ))}
            </div>
          </div>
        </Container>
      </DragDropContext>
    </>
  );
}

export default Deals;
