import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/admin/Dashboard';
import Login from './pages/admin/Login';
import Register from './pages/admin/Register';
import UserRegister from './pages/user/Register';
import UserLogin from './pages/user/Login';
import Home from './pages/user/Home';
import TasksPage from './pages/user/TasksPage';
import './App.css';
import Contacts from './pages/user/Contacts';
import Conversation from './pages/user/Conversation';
import PendingTask from './pages/user/PendingTask';
import CompletedTask from './pages/user/CompletedTask';
import OtpEmail from './pages/user/OtpEmail';
import VarifyOTP from './pages/user/VarifyOTP';
import Deals from './pages/user/Deals';
import Meetings from './pages/user/Meetings';
import AdminContacts from './pages/admin/AdminContacts';
import Profile from './pages/user/Profile';
import UsersPage from './pages/user/UsersPage';

// export default App;
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/register" element={<Register />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/" element={<Home />} />
          <Route path="/otp-login" element={<OtpEmail />} />
          <Route path="/verify-otp" element={<VarifyOTP />} />
          <Route path="/signup" element={<UserRegister />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/task" element={<TasksPage />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/conversation" element={<Conversation />} />
          <Route path="/task/pending-task" element={<PendingTask />} />
          <Route path="/task/completed-task" element={<CompletedTask />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/contacts" element={<AdminContacts />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
