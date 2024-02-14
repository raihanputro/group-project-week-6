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

const UserList = () => {
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);

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
              <StyledTableRow>  
                <StyledTableCell align="center">
                  <Box
                    component="img"
                    sx={{
                      objectFit: "contain",
                      height: "70px",
                      width: "70px",
                      borderRadius: "50%"
                    }}
                    src="/profiletest.jpg"
                  />
                </StyledTableCell>
                <StyledTableCell align="center">1</StyledTableCell>
                <StyledTableCell align="center">Raihan Putro Maulana Rizky</StyledTableCell>
                <StyledTableCell align="center">Admin</StyledTableCell>
                <StyledTableCell align="center">
                  <Button><InfoIcon sx={{ color: 'yellow' }}/></Button>
                  <Button ><EditIcon /></Button>
                  <Button sx={{ color: 'red' }}><DeleteIcon /></Button>
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default UserList