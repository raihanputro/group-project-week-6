import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import AddUser from './components/AddUser';

import { getUserListData } from './actions';
import { selectUserListData } from './selectors';
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

const UserList = ({userListSelect, theme}) => {
  const dispatch = useDispatch();
  const [userListData, setUserListData] = useState([]);
  const [userMenu, setUserMenu] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState(0);
  const [isAddOpen, setAddOpen] = useState(false);

  useEffect(() => {
    dispatch(getUserListData());
  }, [dispatch]);

  useEffect(() => {
    setUserListData(userListSelect.response);
  }, [userListSelect]);

  const filteredUser = userListData?.filter(user => {
    if(user.name.toLowerCase().includes(search.toLocaleLowerCase()) && (role == 0 || user.role === role)) {
      return true;
    }
    return false;
  });

  const handleOpenUserMenu = (event, userId, roleUser) => {
    setUserMenu(event.currentTarget);
    setUserId(userId);
    setUserRole(roleUser);
  };

  const handleCloseUserMenu = () => {
    setUserMenu(null);
  };


  const handleAddOpen = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  return (
    <>
      <Typography variant='h1' component='div' className={classes.pageTitle}>
        <FormattedMessage id="user_list_title" />
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
            label="Role"
            variant="outlined"
            value={role}
            onChange={(e) => setRole(e.target.value)}
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
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={1}>Admin</MenuItem>
            <MenuItem value={2}>Manager</MenuItem>
            <MenuItem value={3}>User</MenuItem>
          </TextField>
      </Box>
      <Button variant="contained" onClick={handleAddOpen} className={classes.addButton}><AddIcon /><FormattedMessage id="add_button" /></Button>
      <AddUser isOpen={isAddOpen} onClose={handleAddClose} />
      <TableContainer component={Paper} sx={{ marginTop: '1%' }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table" className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" sx={{ fontWeight: '700' }}></StyledTableCell>
              <StyledTableCell align="center" sx={{ fontWeight: '700' }}><FormattedMessage id="id_table_row" /></StyledTableCell>
              <StyledTableCell align="center" sx={{ fontWeight: '700' }}><FormattedMessage id="name_table_row" /></StyledTableCell>
              <StyledTableCell align="center" sx={{ fontWeight: '700' }}><FormattedMessage id="role_table_row" /></StyledTableCell>
              <StyledTableCell align="center" sx={{ fontWeight: '700' }}><FormattedMessage id="action_table_row" /></StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                { filteredUser && filteredUser?.map((user, index) => (
                  <StyledTableRow key={index}>  
                    <StyledTableCell align="center" sx={{ display: 'flex', justifyContent: 'center' }}>
                      {user.imageUrl !== null ? (
                        <Box
                          component="img"
                          sx={{
                            objectFit: "contain",
                            height: "50px",
                            width: "50px",
                            borderRadius: "50%"
                          }}
                          src={user.imageUrl}
                        />
                      ) : (
                        <Avatar sx={{ height: "50px", width: "50px" }} />
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">{user.id}</StyledTableCell>
                    <StyledTableCell align="center">{user.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      {user.role === 1 && 'Admin'}
                      {user.role === 2 && 'Manager'}
                      {user.role === 3 && 'Member'}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button onClick={(e) => handleOpenUserMenu(e, user?.id, user?.role)}><ListIcon /></Button>
                      <Menu
                        sx={{ 
                          mt: '45px',
                          '& .MuiPaper-root': { 
                            backgroundColor: theme === 'light' ? '#fff' : '#4f4557', 
                          },
                        }}
                        id={`menu-appbar`}
                        anchorEl={userMenu}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={Boolean(userMenu)}
                        onClose={handleCloseUserMenu}
                      >
                        <MenuItem>
                          <Button><InfoIcon sx={{ color: 'yellow' }}/></Button>
                        </MenuItem>
                        {userRole === 1 && 
                          <>
                            <MenuItem>
                              <Button ><EditIcon /></Button>  
                            </MenuItem>
                            <MenuItem>
                              <Button sx={{ color: 'red' }}><DeleteIcon /></Button>
                            </MenuItem>
                          </>
                        }
                      </Menu>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

UserList.propTypes = {
  userListSelect: PropTypes.object,
  theme: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  userListSelect: selectUserListData,
  theme: selectTheme
});

export default connect(mapStateToProps)(UserList);