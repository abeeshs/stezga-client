import React, { useEffect } from 'react';
import {
  Typography,
} from '@mui/material';
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

  // right sidebar
  // function List({ anchor }) {
  //   return (
  //     <Box
  //       sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
  //       role="presentation"
  //     >
  //       <List>
  //         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
  //           <ListItem key={text} disablePadding>
  //             <ListItemButton>
  //               <ListItemIcon></ListItemIcon>
  //               <ListItemText primary={text} />
  //             </ListItemButton>
  //           </ListItem>
  //         ))}
  //       </List>
  //       <Divider />
  //     </Box>
  //   );
  // }

  return (
    <div>
      <Header />
      <Container maxWidth="xl">
        <Typography component="div" variant="h6" marginTop="10px">
          Contacts
        </Typography>
        <ContactsTable />
      </Container>
    </div>
  );
}

export default Contacts;
