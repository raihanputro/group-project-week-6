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

import { selectUserListData } from '../../Admin/UserList/selectors';
import { selectTaskListData } from '../../Admin/TaskList/selectors';
import { getUserListData } from '../../Admin/UserList/actions';
import { getTaskListData } from '../../Admin/TaskList/actions';

import classes from './style.module.scss';

const DashboardManager = ({ userListSelect, taskListSelect }) => {
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


  return (
    <>
      <Typography variant='h1' component='div' className={classes.pageTitle}>
        <FormattedMessage id="dashboard_title" />
      </Typography>
      <Box className={classes.cardInfoContainer}>
        <Card className={classes.cardInfo}>
          <Box className={classes.info}>
            <PeopleAltIcon />
            <Box className={classes.textContainer} >
              <Typography variant='p' component='div'>
                <FormattedMessage id="number_users_title" />
              </Typography>
              {userData?.length}
            </Box>
          </Box>
        </Card>
        <Card className={classes.cardInfo}>
          <Box className={classes.info}>
            <AssignmentIcon />
            <Box className={classes.textContainer} >
              <Typography variant='p' component='div'>
                <FormattedMessage id="number_taks_title" />
              </Typography>
              {taskData?.length}
            </Box>
          </Box>
        </Card>
      </Box>
    </>
  )
}

DashboardManager.propTypes = {
  userListSelect: PropTypes.object,
  taskListSelect: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  userListSelect: selectUserListData,
  taskListSelect: selectTaskListData
});

export default connect(mapStateToProps)(DashboardManager);