import {
  Avatar,
  Collapse,
  IconButton,
  InputBase,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import toast, { Toaster } from 'react-hot-toast';
import { deepPurple } from '@mui/material/colors';
import dayjs from 'dayjs';
import Header from '../../components/User/Header/Header';
import Chat from '../../components/User/ChatBox/Chat';
import * as chatService from '../../services/chatService';
import Loading from '../../components/Extra Components/Loading/Loading';

function Conversation() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState('');
  const [chats, setChats] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [loggedUser, setLoggedUser] = useState();
  const [sender, setSender] = useState({});

  const getAllChats = async () => {
    try {
      const response = await chatService.getChatService();

      if (response.status === 'success') {
        setChats(response.allChats);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllChats();
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    setLoggedUser(user.user);
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSearch = async () => {
    if (!search) {
      toast.error('Please enter text');
    }
    try {
      setLoading(true);
      const response = await chatService.searchUserService(search);
      if (response && response.status === 'Success') {
        setLoading(false);
        setSearchResult(response.user);
      } else {
        setLoading(false);
        toast.error('No users found');
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getSenderDetails = (loggedUser2, users) => {
    return users[0]._id === loggedUser2._id ? users[1] : users[0];
  };
  const accessChat = async (userId) => {
    try {
      const response = await chatService.createChatService(userId);
      console.log(response);
      if (response.status === 'success') {
        if (!chats.find((c) => c._id === response.createdChat._id)) {
          setSelectedChat(response.createdChat);
          setSender({
            user: getSenderDetails(loggedUser, response.createdChat.users),
          });
          setChats((state) => [...state, response.createdChat]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getSender = (loggedUser1, users) => {
    console.log(loggedUser1, users);
    return users[0]._id === loggedUser1._id
      ? users[1].username
      : users[0].username;
  };

  return (
    <>
      <Header />
      <Toaster />
      <Box
        sx={{
          height: '70px',
          border: '1px solid rgb(223, 227, 235)',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Box sx={{ padding: '55px' }}>
          <p className="page-heading">Conversation</p>
        </Box>
      </Box>
      <Box
        sx={{
          height: '78vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '10px',
          backgroundColor: 'white',
        }}
      >
        <Box sx={{ width: '17%', border: '1px solid rgb(223, 227, 235)' }}>
          <List>
            <ListItemButton sx={{ backgroundColor: '#EAF0F6' }}>
              <ListItemText primary="Chat" />
            </ListItemButton>

            <ListItemButton onClick={handleClick}>
              <ListItemText primary="Users" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div">
                <Box sx={{ border: '1px solid grey', m: 1 }}>
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search contact"
                    inputProps={{ 'aria-label': 'search ' }}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  <IconButton
                    onClick={handleSearch}
                    type="button"
                    sx={{ p: '1px' }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </Box>
              </List>
              {loading ? (
                <Loading />
              ) : (
                searchResult?.map((item) => (
                  <List key={item._id} component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={() => accessChat(item._id)}
                    >
                      <ListItemIcon>
                        <Avatar />
                      </ListItemIcon>
                      <ListItemText primary={item?.username} />
                    </ListItemButton>
                  </List>
                ))
              )}
            </Collapse>
          </List>
        </Box>
        <Box
          sx={{
            width: '20%',
            border: '1px solid rgb(223, 227, 235)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '50px',
              alignContent: 'center',
              boxSizing: 'border-box',
              border: '1px solid rgb(223, 227, 235)',
            }}
          >
            <Typography
              className="commen-font"
              sx={{
                textAlign: 'center',
                p: 2,
                color: '#33475b',
                fontWeight: 600,
              }}
            >
              Chats
            </Typography>
          </Box>
          {chats?.map((item) => (
            <Box
              key={item._id}
              onClick={() =>
                setSelectedChat({
                  ...item,
                  user: getSenderDetails(loggedUser, item.users),
                })
              }
              sx={{
                width: '95%',
                height: '50px',
                display: 'flex',
                backgroundColor: 'rgb(229, 245, 248)',
                boxSizing: 'border-box',
                border: '1px solid rgb(223, 227, 235)',
                borderRadius: '5px',
                m: 1,
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  padding: '8px 8px',
                  width: '20%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Avatar sx={{ bgcolor: deepPurple[500] }}>A</Avatar>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <Typography
                    className="commen-font"
                    sx={{ fontSize: '13px', color: 'black' }}
                  >
                    {item.isGroupChat === true
                      ? item.chatName
                      : getSender(loggedUser, item.users)}
                  </Typography>
                  <Typography
                    className="commen-font"
                    sx={{
                      paddingRight: '5px',
                      fontSize: '10px',
                      color: 'black',
                    }}
                  >
                    {dayjs(item.latestMessage?.createdAt).format('LT')}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    className="commen-font"
                    sx={{ fontSize: '11px', color: '#33475b' }}
                  >
                    {item.latestMessage?.contend}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
        <Chat
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          fetchAgain={fetchAgain}
          loggedUser={loggedUser}
          setFetchAgain={setFetchAgain}
        />
        <Box sx={{ width: '23%', border: '1px solid rgb(223, 227, 235)' }}>
          <Box
            sx={{
              height: '80px',
              width: '100%',
              borderBottom: '1px solid rgb(223, 227, 235)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
              <Avatar />
              <span style={{ paddingLeft: '10px' }} className="sub-heading">
                {selectedChat?.user?.username}
              </span>
            </Box>
          </Box>
          <Box className="contact-info">
            <Box>
              <span>Email</span>
              {selectedChat ? <p>{selectedChat?.user.email}</p> : ''}
            </Box>
            <Box>
              <span>Phone Number</span>
              <p>{selectedChat?.user?.mobile}</p>
            </Box>
            <Box>
              <span>Created On</span>
              <p>{dayjs(selectedChat?.user?.createdAt).format('DD/MM/YYYY')}</p>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Conversation;
