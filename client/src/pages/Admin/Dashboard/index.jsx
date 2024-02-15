import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';  
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { PieChart, pieArcLabelClasses  } from '@mui/x-charts/PieChart';

import { selectUserListData } from '../UserList/selectors';
import { selectTaskListData } from '../TaskList/selectors';
import { getUserListData } from '../UserList/actions';
import { getTaskListData } from '../TaskList/actions';

import classes from './style.module.scss';

const DashboardAdmin = ({userListSelect, taskListSelect}) => {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState([]);
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    dispatch(getUserListData());
    dispatch(getTaskListData());
  }, [dispatch]);

  useEffect(() => {
    setUserData(userListSelect.response);
    setTaskData(taskListSelect.response);
  }, [userListSelect, taskListSelect]);

  const adminUserDataLength = userData?.filter(user => user.role === 1).length;
  const managerUserDataLength = userData?.filter(user => user.role === 2).length;
  const memberUserDataLength = userData?.filter(user => user.role === 3).length;

  const completedTaskDataLength = taskData?.filter(task => task.status === 'Completed').length;
  const progressTaskDataLength = taskData?.filter(task => task.status === 'Progress').length;
  const todoTaskDataLength = taskData?.filter(task => task.status === 'ToDo').length;
  const expiredTaskDataLength = taskData?.filter(task => task.status === 'Expired').length;

  return (
    <>
      <Typography variant='h1' component='div' className={classes.pageTitle}>
        <FormattedMessage id="dashboard_title" />
      </Typography>
      <Box className={classes.InfoContainer}>
        <Box className={classes.info}>
          <Card className={classes.cardInfoContainer}>
            <Box className={classes.cardInfo}>
              <PeopleAltIcon />
              <Box className={classes.textContainer} >
                <Typography variant='p' component='div'>
                  <FormattedMessage id="number_users_title" />
                </Typography>
                {userData?.length}
              </Box>
            </Box>
          </Card>
          <Box className={classes.chartInfo}>
            <Typography variant='p' component='div' className={classes.chartTitle}>
              Perbandingan Pengguna
            </Typography>
            <PieChart
              series={[
                {
                  arcLabel: (item) => `${item.label} (${item.value})`,
                  data: [
                    { id: 1, value: adminUserDataLength, label: 'Admin' },
                    { id: 2, value: managerUserDataLength, label: 'Manajer' },
                    { id: 3, value: memberUserDataLength, label: 'User' },
                  ],
                },
              ]}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fontSize: '15px',
                },
                padding: 0,
              }}
              width={400}
              height={200}
            />
          </Box>
        </Box>
        <Box className={classes.info}>
          <Card className={classes.cardInfoContainer}>
            <Box className={classes.cardInfo}>
              <PeopleAltIcon />
              <Box className={classes.textContainer} >
                <Typography variant='p' component='div'>
                  <FormattedMessage id="number_taks_title" />
                </Typography>
                {taskData?.length}
              </Box>
            </Box>
          </Card>
          <Box className={classes.chartInfo}>
            <Typography variant='p' component='div' className={classes.chartTitle}>
              Perbandingan Tugas
            </Typography>
            <PieChart
              series={[
                {
                  data: [
                    { id: 1, value: expiredTaskDataLength, label: 'Expired' },
                    { id: 2, value: todoTaskDataLength, label: 'ToDo' },
                    { id: 3, value: progressTaskDataLength, label: 'Progress' },
                    { id: 4, value: completedTaskDataLength, label: 'Completed' },
                  ],
                  arcLabel: (item) => `${item.label} (${item.value})`,
                },
              ]}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fontSize: '15px',
                },
              }}
              width={400}
              height={200}
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}

DashboardAdmin.propTypes = {
  userListSelect: PropTypes.object,
  taskListSelect: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  userListSelect: selectUserListData,
  taskListSelect: selectTaskListData
});

export default connect(mapStateToProps)(DashboardAdmin);