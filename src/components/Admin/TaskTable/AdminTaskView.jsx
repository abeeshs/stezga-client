// import React from 'react';
// import {
//   Box,
//   Button,
//   Chip,
//   MenuItem,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
// } from '@mui/material';
// import { useState } from 'react';
// import * as taskService from '../../../services/taskService';
// import { useSelector } from 'react-redux';

// function AdminTaskView(props) {
//   const { viewTask, setViewTask } = props;
//   const [status, setStatus] = useState('');

//   const { token } = useSelector((state) => state.userAuth);

//   //change the task status
//   const changeStatus = async (e) => {
//     viewTask.task_status = e.target.value;
//     setStatus(e.target.value);
//     const response = await taskService.changeTaskStatus(
//       token,
//       e.target.value,
//       viewTask._id
//     );
//   };

//   return (
//     <Box>
//       <TableContainer>
//         <Table sx={{ minWidth: 550 }}>
//           <TableBody>
//             <TableRow key={'1'}>
//               <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
//               <TableCell>{viewTask.title}</TableCell>
//             </TableRow>
//             <TableRow key={'1'}>
//               <TableCell sx={{ fontWeight: 700 }}>Task Type</TableCell>
//               <TableCell>{viewTask.task_type}</TableCell>
//             </TableRow>
//             <TableRow key={'1'}>
//               <TableCell sx={{ fontWeight: 700 }}>Created By</TableCell>
//               <TableCell>{viewTask.created_by}</TableCell>
//             </TableRow>
//             <TableRow key={'1'}>
//               <TableCell sx={{ fontWeight: 700 }}>Priority</TableCell>
//               <TableCell>{viewTask.priority}</TableCell>
//             </TableRow>
//             <TableRow key={'1'}>
//               <TableCell sx={{ fontWeight: 700 }}>Due Date</TableCell>
//               <TableCell>{viewTask.due_date}</TableCell>
//             </TableRow>
//             <TableRow key={'1'}>
//               <TableCell sx={{ fontWeight: 700 }}>Descrition</TableCell>
//               <TableCell>{viewTask.description}</TableCell>
//             </TableRow>
//             <TableRow key={'1'}>
//               <TableCell sx={{ fontWeight: 700 }}>Task Status</TableCell>
//               <TableCell>
//                 {' '}
//                 <Chip
//                   label={viewTask.task_status}
//                   color="primary"
//                   variant="outlined"
//                 />
//               </TableCell>
//             </TableRow>
//             <TableRow key={'1'}>
//               <TableCell sx={{ fontWeight: 700 }}>Change Status</TableCell>
//               {viewTask.task_status === 'Compleated' ? (
//                 <TableCell>Compleated</TableCell>
//               ) : (
//                 <TableCell>
//                   <TextField
//                     onChange={changeStatus}
//                     color="secondary"
//                     fullWidth
//                     id="outlined-select-currency"
//                     select
//                     defaultValue={viewTask.task_status}
//                   >
//                     <MenuItem value={'Pending'}>Pending</MenuItem>
//                     <MenuItem value={'Task varifying'}>Compleated</MenuItem>
//                   </TextField>
//                 </TableCell>
//               )}
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// }

// export default AdminTaskView;
