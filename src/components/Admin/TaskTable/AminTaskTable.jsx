// import * as React from 'react';
// import Select from 'react-select';
// import makeAnimated from 'react-select/animated';
// import { useState, useEffect } from 'react';
// import Button from '@mui/material/Button';
// import './AdminTaskTable.css';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import TextField from '@mui/material/TextField';
// import InputLabel from '@mui/material/InputLabel';
// import { Box } from '@mui/system';
// import ClearIcon from '@mui/icons-material/Clear';
// import EditIcon from '@mui/icons-material/Edit';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableSortLabel,
//   Typography,
// } from '@mui/material';
// import { useSelector } from 'react-redux';
// import * as taskService from '../../../services/taskService';
// import Popup from '../../User/Popup/Popup';
// import * as contactService from '../../../services/contactService';
// import EditTaskForm from '../AdminForm/TaskForm/EditTaskForm';
// import * as userService from '../../../services/userService';
// import DeleteModal from '../../Extra Components/DeleteModal';
// // import AdminTaskView from './AdminTaskView';

// const taskType = [
//   { value: 'To-do', label: 'To-do' },
//   { value: 'Call', label: 'Call' },
//   { value: 'Email', label: 'Email' },
// ];
// const priorityy = [
//   { value: 'Low', label: 'Low' },
//   { value: 'Medium', label: 'Medium' },
//   { value: 'High', label: 'High' },
// ];

// export default function AdminTaskTable() {
//   const [deleteTask, setDeleteTask] = useState('');
//   const [tasks, setTasks] = useState([]);
//   const [editTask, setEditTask] = useState({});
//   const [openPopup, setOpenPopup] = useState(false);
//   const [allContacts, setAllContacts] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [buttonDesable, setButtonDesable] = useState(false);
//   const [assignedUser, setAssignedUser] = useState([]);
//   const [priority, setPriority] = useState([]);
//   const [types, setType] = useState([]);
//   const [associated, setAssociated] = useState({});
//   //modal state
//   const [status, setStatus] = useState('');
//   const [open, setOpen] = useState(false);
//   const [users, setUsers] = useState([]);

//   const [newTask, setNewTask] = useState({
//     title: '',
//     dueDate: '',
//     time: '',
//     description: '',
//   });

//   const animatedComponents = makeAnimated();
//   const { title, dueDate, time, description } = newTask;
//   // onchange function
//   const onchange = (e) => {
//     setNewTask((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   //to get all user data
//   const { token } = useSelector((state) => state.adminAuth);

//   const handleClickOpen = async () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   //calling function to get all tasks
//   const getAllTasks = async () => {
//     const response = await taskService.getAllTask();
//     const contacts = await contactService.getAllContactAdmin(token);

//     if (response) {
//       setTasks(response);
//     }
//     if (contacts) {
//       let arrObj = contacts.map((item) => {
//         return {
//           label: item.firstname,
//           value: item._id,
//         };
//       });
//       setAllContacts(arrObj);
//     }
//     //get user data to display in input field
//     const userData = await userService.getAllUser();

//     if (userData) {
//       let arrObj = userData.map((item) => {
//         return {
//           label: item.username,
//           value: item._id,
//         };
//       });

//       setUsers(arrObj);
//     }
//   };

//   useEffect(() => {
//     getAllTasks();
//   }, []);

//   //-------Creating new task

//   const createTask = async (e) => {
//     e.preventDefault();
//     if (newTask) {
//     }
//     let taskAssingnedTo = assignedUser.map((item) => {
//       return {
//         name: item.label,
//         id: item.value,
//       };
//     });
//     newTask.assignedTo = taskAssingnedTo;
//     newTask.priority = priority.value;
//     newTask.type = types.value;
//     newTask.associated = associated.value;

//     const data = await taskService.createTask(newTask);
//     if (data) {
//       handleClose();
//       getAllTasks();
//     }
//   };
//   //edit handler
//   const editHandler = (data) => {
//     setEditTask(data);
//     setOpenPopup(true);
//   };
//   //select box

//   const handleChange = (event) => {
//     setStatus(event.target.value);
//   };
//   //select multippile option
//   const selectMulti = (assignedUser) => {
//     setAssignedUser(assignedUser);
//   };
//   const selectPriority = (priority) => {
//     setPriority(priority);
//   };
//   const selectType = (types) => {
//     setType(types);
//   };
//   const selectAssociated = (associated) => {
//     setAssociated(associated);
//   };

//   const deleteHandler = (id) => {
//     setDeleteTask(id);
//     setOpenModal(true);
//   };
//   const confirmDelete = async () => {
//     try {
//       const response = await taskService.deleteTaskAdmin(token, deleteTask);
//       if (response) {
//         setOpenModal(false);
//         getAllTasks();
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   //Change Status
//   const changeStatus = async (taskId) => {
//     try {
//       const response = await taskService.changeTaskStatusAdmin(token, taskId);
//       if (response) {
//         setButtonDesable(true);
//         getAllTasks();
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <Button
//         className="create-task-btn"
//         variant="contained"
//         onClick={handleClickOpen}
//       >
//         Create Task
//       </Button>

//       <h2>Task</h2>
//       <Box sx={{ width: '100%', height: '50px', backgroundColor: '' }}></Box>
//       <TableContainer>
//         <Table sx={{ minWidth: 650 }}>
//           <TableHead>
//             <TableRow
//               sx={{
//                 fontSize: '25px30px',
//                 fontWeight: '900',
//                 backgroundColor: '#9e9e9e',
//               }}
//             >
//               <TableCell>
//                 <TableSortLabel>Title</TableSortLabel>
//               </TableCell>
//               <TableCell>
//                 {' '}
//                 <TableSortLabel>Task Type</TableSortLabel>
//               </TableCell>
//               <TableCell>
//                 <TableSortLabel>Assigned To</TableSortLabel>
//               </TableCell>
//               <TableCell>
//                 <TableSortLabel>Priority</TableSortLabel>
//               </TableCell>
//               <TableCell>
//                 <TableSortLabel>Due Date</TableSortLabel>
//               </TableCell>
//               <TableCell>
//                 <TableSortLabel>Task Status</TableSortLabel>
//               </TableCell>
//               <TableCell>Action</TableCell>
//               <TableCell>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {tasks?.map((item) => (
//               <TableRow key={item._id}>
//                 <TableCell>{item.title}</TableCell>
//                 <TableCell>{item.task_type}</TableCell>
//                 <TableCell>
//                   {item.assigned_to.map((ele) => {
//                     return <p>{ele.name}</p>;
//                   })}
//                 </TableCell>
//                 <TableCell>{item.priority}</TableCell>
//                 <TableCell>{item.due_date}</TableCell>
//                 <TableCell>{item.task_status}</TableCell>
//                 <TableCell>
//                   <Button
//                     sx={{ width: '10px' }}
//                     variant="outlined"
//                     onClick={() => editHandler(item)}
//                   >
//                     <EditIcon />
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     color="error"
//                     onClick={() => deleteHandler(item._id)}
//                   >
//                     <ClearIcon />{' '}
//                   </Button>
//                 </TableCell>
//                 <TableCell>
//                   {item.task_status === 'Completed' ? (
//                     <Button
//                       variant="outlined"
//                       style={{ textTransform: 'Capitalize ' }}
//                       disabled
//                       onClick={() => changeStatus(item._id)}
//                     >
//                       Mark Completed
//                     </Button>
//                   ) : (
//                     <Button
//                       variant="outlined"
//                       style={{ textTransform: 'Capitalize ' }}
//                       disabled={buttonDesable}
//                       onClick={() => changeStatus(item._id)}
//                     >
//                       Mark Completed
//                     </Button>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             paddingRight: '26px',
//           }}
//         >
//           <DialogTitle id="alert-dialog-title">{'Create Task'}</DialogTitle>
//           <Button
//             className="close-btn"
//             variant="contained"
//             onClick={handleClose}
//           >
//             X
//           </Button>
//         </Box>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             <form
//               onSubmit={(e) => createTask(e)}
//               style={{ display: 'flex', flexDirection: 'column' }}
//             >
//               <InputLabel
//                 id="demo-simple-select-autowidth-label"
//                 style={{
//                   marginLeft: '10px',
//                   paddingTop: '10px',
//                   color: 'black',
//                 }}
//               >
//                 Title
//               </InputLabel>
//               <TextField
//                 id="outlined-basic"
//                 className="outlined-basic1"
//                 fullWidth
//                 variant="outlined"
//                 name="title"
//                 value={title}
//                 onChange={onchange}
//               />
//               <InputLabel
//                 id="demo-simple-select-autowidth-label"
//                 style={{
//                   marginLeft: '10px',
//                   paddingTop: '10px',
//                   color: 'black',
//                 }}
//               >
//                 Type
//               </InputLabel>
//               <Select
//                 className="basic-single"
//                 value={types}
//                 onChange={selectType}
//                 options={taskType}
//               />
//               <InputLabel
//                 id="demo-simple-select-autowidth-label"
//                 style={{
//                   marginLeft: '10px',
//                   paddingTop: '10px',
//                   color: 'black',
//                 }}
//               >
//                 Priority
//               </InputLabel>
//               <Select
//                 className="basic-single"
//                 value={priority}
//                 onChange={selectPriority}
//                 options={priorityy}
//               />
//               <InputLabel
//                 id="demo-simple-select-autowidth-label"
//                 style={{
//                   marginLeft: '10px',
//                   paddingTop: '10px',
//                   color: 'black',
//                 }}
//               >
//                 Associated with records
//               </InputLabel>
//               <Select
//                 className="basic-single"
//                 value={associated}
//                 onChange={selectAssociated}
//                 options={allContacts}
//               />

//               <InputLabel
//                 id="demo-simple-select-autowidth-label"
//                 style={{
//                   marginLeft: '10px',
//                   paddingTop: '10px',
//                   color: 'black',
//                 }}
//               >
//                 Assigned to
//               </InputLabel>
//               <Select
//                 isMulti
//                 value={assignedUser}
//                 components={animatedComponents}
//                 onChange={selectMulti}
//                 options={users}
//               />

//               <InputLabel
//                 id="demo-simple-select-autowidth-label"
//                 style={{ width: '100px', paddingTop: '10px', color: 'black' }}
//               >
//                 Due Date
//               </InputLabel>
//               <TextField
//                 id="outlined-basic"
//                 className="outlined-basic"
//                 variant="outlined"
//                 fullWidth
//                 type="date"
//                 name="dueDate"
//                 value={dueDate}
//                 onChange={onchange}
//               />
//               <InputLabel
//                 id="demo-simple-select-autowidth-label"
//                 style={{
//                   marginLeft: '10px',
//                   width: '100px',
//                   paddingTop: '10px',
//                   color: 'black',
//                 }}
//               >
//                 Time
//               </InputLabel>
//               <TextField
//                 id="outlined-basic"
//                 className="outlined-basic"
//                 type="time"
//                 variant="outlined"
//                 name="time"
//                 fullWidth
//                 value={time}
//                 onChange={onchange}
//               />
//               <Box>
//                 <InputLabel
//                   id="demo-simple-select-autowidth-label"
//                   style={{ marginLeft: '10px', width: '100px', color: 'black' }}
//                 >
//                   Note
//                 </InputLabel>

//                 <TextField
//                   sx={{
//                     paddingTop: '20px',
//                     marginBottom: '10px',
//                     maxHeight: '100px',
//                     overflowY: 'scroll',
//                   }}
//                   multiline
//                   name="description"
//                   fullWidth
//                   id="outlined-basic"
//                   className="note"
//                   variant="outlined"
//                   value={description}
//                   onChange={onchange}
//                 />
//               </Box>

//               <Button
//                 type="submit"
//                 className="create-task-btn"
//                 variant="contained"
//                 autoFocus
//               >
//                 Create
//               </Button>
//             </form>
//           </DialogContentText>
//         </DialogContent>
//       </Dialog>
//       <Popup
//         title="Edit Task"
//         openPopup={openPopup}
//         setOpenPopup={setOpenPopup}
//       >
//         <EditTaskForm
//           users={users}
//           editTask={editTask}
//           setEditTask={setEditTask}
//           openPopup={openPopup}
//           setOpenPopup={setOpenPopup}
//           getAllTasks={getAllTasks}
//           allContacts={allContacts}
//           taskType={taskType}
//           priorityy={priorityy}
//         />
//       </Popup>
//       <DeleteModal
//         title={'Delete Task'}
//         openModal={openModal}
//         setOpenModal={setOpenModal}
//         confirmDelete={confirmDelete}
//         message={'Do you want to delete this task ?'}
//       >
//         <ModalBody />
//       </DeleteModal>

//       <Popup>
//         <AdminTaskView />
//       </Popup>
//     </div>
//   );
// }

// function ModalBody() {
//   return (
//     <Box>
//       <Typography>Do you want to delete?</Typography>
//     </Box>
//   );
// }
