import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import ContactsTable from '../../components/User/ContactsTable/ContactsTable';
import Header from '../../components/User/Header/Header';

function Contacts() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  // const token = useSelector((state) => state.userAuth.token);
  const token = user?.token;

  useEffect(() => {
    if (token === undefined || token === null) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Typography component="div" variant="h6" marginTop="10px">
          Contacts
        </Typography>
        <ContactsTable />
      </Container>
    </>
  );
}

export default Contacts;
