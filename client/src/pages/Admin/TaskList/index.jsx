import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InfoIcon from '@mui/icons-material/Info';
import TextField from '@mui/material/TextField';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import AddTask from './components/AddTask';
import UpdateTask from './components/UpdateTask';

import { getTaskListData, deleteTask } from './actions';
import { selectTaskListData } from './selectors';
import { selectTheme } from '@containers/App/selectors';

import classes from './style.module.scss';

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));

const TaskList = ({taskListSelect, theme}) => {
  const dispatch = useDispatch();
  const [taskListData, setTaskListData] = useState([]);
  const [taskId, setTaskId] = useState(null);
  const [taskMenu, setTaskMenu] = useState(null);
  const [isAddOpen, setAddOpen] = useState(false);
  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    dispatch(getTaskListData());
  }, [dispatch]);

  useEffect(() => {
    setTaskListData(taskListSelect?.response);
  }, [taskListSelect]);

  const filteredTask = taskListData?.filter(task => {
    if(task.name.toLowerCase().includes(search.toLocaleLowerCase()) && (status == '' || task.status === status)) {
      return true;
    }
    return false;
  });

  const handleOpenTaskMenu = (event, taskId) => {
    setTaskMenu(event.currentTarget);
    setTaskId(taskId);
  };

  const handleCloseTaskMenu = () => {
    setTaskMenu(null);
  };

  const handleAddOpen = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  const handleUpdateOpen = () => {
    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };

  const deleteItem = () => {
    dispatch(deleteTask(taskId));
    setTaskMenu(null);
  };

  return (
    <>
      <Typography variant='h1' component='div' className={classes.pageTitle}>
        <FormattedMessage id="task_list_title" />
      </Typography>
      <Box className={classes.filterContainer}>
        <TextField
            label="Search Task"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={classes.search}
          />
          <TextField
            select
            label="Status"
            variant="outlined"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={classes.status}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    backgroundColor: theme === 'light' ? '#fff' : '#4f4557', 
                  },
                },
              },
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="ToDo">ToDo</MenuItem>
            <MenuItem value="Progress">Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Expired">Expired</MenuItem>
          </TextField>
      </Box>
      <Button variant="contained" onClick={handleAddOpen} className={classes.addButton}><AddIcon /><FormattedMessage id="add_button" /></Button>
      <AddTask isOpen={isAddOpen} onClose={handleAddClose} />
      <TableContainer component={Paper} sx={{ marginTop: '1%' }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table" className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" sx={{ fontWeight: '700' }}><FormattedMessage id="id_table_row" /></StyledTableCell>
              <StyledTableCell align="center" sx={{ fontWeight: '700' }}><FormattedMessage id="name_table_row" /></StyledTableCell>
              <StyledTableCell align="center" sx={{ fontWeight: '700' }}><FormattedMessage id="start_date_table_row" /></StyledTableCell>
              <StyledTableCell align="center" sx={{ fontWeight: '700' }}><FormattedMessage id="end_date_table_row" /></StyledTableCell>
              <StyledTableCell align="center" sx={{ fontWeight: '700' }}><FormattedMessage id="status_table_row" /></StyledTableCell>
              <StyledTableCell align="center" sx={{ fontWeight: '700' }}><FormattedMessage id="action_table_row" /></StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
              { filteredTask && Array.isArray(filteredTask) && filteredTask?.map((task, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">{task?.id}</StyledTableCell>
                  <StyledTableCell align="center">{task?.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {moment(task?.start_date).format('dddd, DD MMMM YYYY')}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                  {moment(task?.end_date).format('dddd, DD MMMM YYYY')}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                  { 
                      task?.status === 'ToDo' 
                        && 
                      <Typography variant='p' component='div' className={classes.statusTodo}>
                        ToDo
                      </Typography>
                    }
                    { 
                      task?.status === 'Progress' 
                        && 
                      <Typography variant='p' component='div' className={classes.statusProgress}>
                        Progress
                      </Typography>
                    }
                    { 
                      task?.status === 'Completed' 
                        && 
                      <Typography variant='p' component='div' className={classes.statusCompleted}>
                        Completed
                      </Typography>
                    }
                    { 
                      task?.status === 'Expired' 
                        && 
                      <Typography variant='p' component='div' className={classes.statusExpired}>
                        Expired
                      </Typography>
                    }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button onClick={(e) => handleOpenTaskMenu(e, task?.id)}><ListIcon /></Button>
                    <Menu
                      sx={{ 
                        mt: '45px',
                        '& .MuiPaper-root': { 
                          backgroundColor: theme === 'light' ? '#fff' : '#4f4557', 
                        },
                      }}
                      id={`menu-appbar`}
                      anchorEl={taskMenu}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(taskMenu)}
                      onClose={handleCloseTaskMenu}
                      >
                      <MenuItem>
                        <Button ><EditIcon onClick={() => handleUpdateOpen()}/></Button>                      
                      </MenuItem>
                      <MenuItem>
                          <Button sx={{ color: 'red' }} onClick={() => deleteItem()}><DeleteIcon /></Button>                    
                      </MenuItem>
                    </Menu>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
        </Table>
      </TableContainer>
      <UpdateTask isOpen={isUpdateOpen} onClose={handleUpdateClose} id={taskId}/>
    </>
  )
}

TaskList.propTypes = {
  taskListSelect: PropTypes.object,
  theme: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  taskListSelect: selectTaskListData,
  theme: selectTheme
});

export default connect(mapStateToProps)(TaskList);