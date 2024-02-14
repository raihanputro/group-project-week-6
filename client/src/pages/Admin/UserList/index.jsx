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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { getUserListData } from './actions';
import { selectUserListData } from './selectors';

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

const UserList = ({userListSelect}) => {
  const dispatch = useDispatch();
  const [userListData, setUserListData] = useState([]);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);

  useEffect(() => {
    dispatch(getUserListData());
  }, [dispatch]);

  useEffect(() => {
    setUserListData(userListSelect.response);
  }, [userListSelect])


  const handleModalOpen = () => {
    setIsModalAddOpen(true);
  };

  const handleModalClose = () => {
    setIsModalAddOpen(false);
  };

  const handleUpdateModalOpen = (userId) => {
    setSelectedUserId(userId);
    setIsModalUpdateOpen(true);
  };

  const handleUpdateModalClose = () => {
    setIsModalUpdateOpen(false);
  };

  const handleDetailModalOpen = (userId) => {
    setSelectedUserId(userId);
    setIsModalDetailOpen(true);
  };

  const handleDetailModalClose = () => {
    setIsModalDetailOpen(false);
  };

  return (
    <>
      <Typography variant='h1' component='div' className={classes.pageTitle}>
        <FormattedMessage id="user_list_title" />
      </Typography>
      <Button variant="contained" onClick={handleModalOpen} className={classes.addButton}><AddIcon /><FormattedMessage id="add_button" /></Button>
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
                { userListData && userListData?.map((user, index) => (
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
                      <Button><InfoIcon sx={{ color: 'yellow' }}/></Button>
                      {user.role === 1 && 
                        <>
                          <Button ><EditIcon /></Button>
                          <Button sx={{ color: 'red' }}><DeleteIcon /></Button>
                        </>
                      }
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
};

const mapStateToProps = createStructuredSelector({
  userListSelect: selectUserListData,
});

export default connect(mapStateToProps)(UserList);