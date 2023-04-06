import React, { useState } from 'react';
import { Container } from '@mui/system';
import { Button, TableBody, Toolbar, TableRow, TableCell } from '@mui/material';
import Popup from '../Popup/Popup';
import MeetingForm from '../Forms/MeetingForm/MeetingForm';
import UseTable from '../../Extra Components/UseTable';
import SingleViewModal from '../../Extra Components/SingleViewModal/SingleViewModal';
import ViewMeeting from '../ViewMeeting/ViewMeeting';

function MeetingsTable({ meetings, getMeetings, users }) {
  const [openPopup, setOpenPopup] = useState('');
  const [singleView, setSingleView] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState({});
  const { user } = JSON.parse(localStorage.getItem('user'));

  const handleSearch = () => {};

  const handleClick = (item) => {
    setSelectedMeeting(item);
    setSingleView(true);
  };
  const headCells = [
    { id: 'name', label: 'NAME' },
    { id: 'organizer', label: 'ORGANIZER' },
    { id: 'startdate', label: 'START DATE' },
    { id: 'enddate', label: 'END DATE' },
    { id: 'type', label: 'TYPE' },
  ];

  const { TblContainer, TblHead, TblPagination, recordAfterPagingAndSorting } =
    UseTable(meetings, headCells);
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{ backgroundColor: 'white', marginTop: '10px' }}
      >
        <Toolbar>
          {/* <TextField
						fullWidth
						size="small"
						label="Search Meetings"
						onChange={handleSearch}
						InputProps={{
							endAdornment: (
								<InputAdornment>
									<SearchIcon />
								</InputAdornment>
							)
						}}></TextField> */}
          {user?.user_type === 'owner' ? (
            <Button
              onClick={() => setOpenPopup(true)}
              variant="outlined"
              sx={{ width: '150px', marginLeft: '150px' }}
            >
              + Add New
            </Button>
          ) : (
            ''
          )}
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {meetings?.map((item) => (
              <TableRow
                hover
                cursor="pointer"
                onClick={() => {
                  handleClick(item);
                }}
                sx={{ ':hower': { cursor: 'pointer !important' } }}
              >
                <TableCell>{item.event_title}</TableCell>
                <TableCell>{item.organizer.username}</TableCell>
                <TableCell>{item.start_date}</TableCell>
                <TableCell>{item.end_date}</TableCell>
                <TableCell>{item.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
      </Container>
      <Popup
        title="Create Meeting"
        width="md"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <MeetingForm
          users={users}
          setOpenPopup={setOpenPopup}
          getMeetings={getMeetings}
        />
      </Popup>
      <SingleViewModal
        selectedMeeting={selectedMeeting}
        title="Meeting"
        singleView={singleView}
      >
        <ViewMeeting
          getMeetings={getMeetings}
          selectedMeeting={selectedMeeting}
          setSingleView={setSingleView}
        />
      </SingleViewModal>
    </>
  );
}

export default MeetingsTable;
