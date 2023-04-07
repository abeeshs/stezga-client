import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import { Box } from '@mui/material';
import * as contactService from '../../../services/contactService';
import RightSideBar from './RightSideBar';
import * as userService from '../../../services/userService';
import SingleViewModal from '../../Extra Components/SingleViewModal/SingleViewModal';
import ViewContact from '../ViewContact/ViewContact';
import Progress from '../../Extra Components/Progress/Progress';

export default function ContactsTable() {
  const [rows, setRows] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedContact, setSelectedContact] = useState({});
  const [singleView, setSingleView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  const getAllUsers = async () => {
    const userlist = await userService.viwAllusers(token);
    console.log(userlist);
    if (userlist?.status === 'Success') {
      setUsers(userlist.users);
    }
  };

  const handleClick = (item) => {
    setSelectedContact(item);
    setSingleView(true);
  };

  // get all contacts
  const getAllcontacts = async () => {
    try {
      setIsLoading(true);
      const response = await contactService.getAllContact();
      if (response) {
        setIsLoading(false);
        setRows(response);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(users);
  useEffect(() => {
    getAllUsers();
    getAllcontacts();
  }, []);

  if (isLoading) {
    return <Progress />;
  } else {
    return (
      <>
        <RightSideBar users={users} getAllContacts={getAllcontacts} />
        {rows.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead
                sx={{
                  backgroundColor: 'black',
                  fontWeight: '900',
                }}
              >
                <TableRow>
                  <TableCell
                    sx={{ fontSize: '15PX', fontWeight: '500', color: 'white' }}
                  >
                    SL NO
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: '15PX', fontWeight: '500', color: 'white' }}
                  >
                    NAME
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: '15PX', fontWeight: '500', color: 'white' }}
                    align="center"
                  >
                    EMAIL
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: '15PX', fontWeight: '500', color: 'white' }}
                    align="right"
                  >
                    PHONE NUMBER
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: '15PX', fontWeight: '500', color: 'white' }}
                    align="right"
                  >
                    CONTACT OWNER
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: '15PX', fontWeight: '500', color: 'white' }}
                    align="right"
                  >
                    CREATED AT
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={row.firstname}
                    onClick={() => handleClick(row)}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.firstname}
                    </TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="right">{row.mobile}</TableCell>
                    <TableCell align="right">
                      {row.contact_owner?.username}
                    </TableCell>
                    <TableCell align="right">
                      {dayjs(row.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ widht: '100%', height: '600px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}
            >
              <img
                src="/images/empty.jpg"
                style={{ width: '400px', height: '400px' }}
                alt=""
              />
              <h2 className="commen-font" style={{ fontWeight: '800' }}>
                No Contacts yet
              </h2>
            </div>
          </Box>
        )}

        <SingleViewModal singleView={singleView} setSingleView={setSingleView}>
          <ViewContact
            singleView={singleView}
            setSingleView={setSingleView}
            selectedContact={selectedContact}
            users={users}
            getAllcontacts={getAllcontacts}
          />
        </SingleViewModal>
      </>
    );
  }
}
