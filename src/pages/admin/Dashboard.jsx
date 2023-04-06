import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Usertable from '../../components/Admin/Usertable/Usertable';
import Sidebar, { DrawerHeader } from '../../components/Admin/Sidebar/Sidebar';

function Dashboard() {
  const navigate = useNavigate();

  const adminToken = JSON.parse(localStorage.getItem('admin-auth'));

  useEffect(() => {
    if (!adminToken?.token) {
      navigate('/admin/login');
    }
  }, []);
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Box sx={{ display: 'flex' }}>
          <h2>Users</h2>
        </Box>
        <Usertable />
      </Box>
    </Box>
  );
}

export default Dashboard;
