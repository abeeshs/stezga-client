import {
  Box,
  Button,
  InputAdornment,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ContactsIcon from '@mui/icons-material/Contacts';
import SearchIcon from '@mui/icons-material/Search';
import UseTable from '../../components/Extra Components/UseTable';
import * as contactService from '../../services/contactService';
import Sidebar, { DrawerHeader } from '../../components/Admin/Sidebar/Sidebar';
import DialogBox from '../../components/Extra Components/DialogBox';
import AddContactForm from '../../components/Admin/AdminForm/ContactForm/AddContactForm';

function AdminContacts() {
  const { token } = JSON.parse(localStorage.getItem('admin-auth'));
  const [contacts, setContacts] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => items,
  });

  const getContactHandle = async () => {
    const response = await contactService.getAllContactAdmin(token);
    if (response) {
      setContacts(response);
    }
  };
  // getContactHandle();
  const headCells = [
    { id: 'first', label: 'First Name' },
    { id: 'last', label: 'Last Name' },
    { id: 'mobile', label: 'Mobile Number' },
    { id: 'email', label: 'Email ID' },
  ];

  useEffect(() => {
    getContactHandle();
  }, []);

  const { TblContainer, TblHead, TblPagination, recordAfterPagingAndSorting } =
    UseTable(contacts, headCells, filterFn);
  const handleSearch = (e) => {
    const target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === '') return items;
        else
          return items.filter((x) =>
            x.firstname.toLowerCase().includes(target.value)
          );
      },
    });
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Paper elevation={2} sx={{ marginBottom: '15px' }}>
            <Typography padding={3}>
              <ContactsIcon sx={{ color: 'blue', justifyContent: 'center' }} />
              All Contacts
            </Typography>
          </Paper>

          <Paper elevation={4}>
            <Toolbar>
              <TextField
                fullWidth
                size="small"
                label="Search Contacts"
                onChange={handleSearch}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              >
                Search
              </TextField>
              <Button
                onClick={() => setOpenPopup(true)}
                variant="outlined"
                sx={{ width: '150px', marginLeft: '150px' }}
              >
                + Add New
              </Button>
            </Toolbar>
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordAfterPagingAndSorting().map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.firstname}</TableCell>
                    <TableCell>{item.lastname}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.mobile}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TblContainer>
            <TblPagination />
          </Paper>
        </Box>
      </Box>
      <DialogBox
        title="Add Contact"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AddContactForm />
      </DialogBox>
    </>
  );
}

export default AdminContacts;
