import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

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
          <Box>
            <Typography variant='p' component='div' className={classes.textContainer} sx={{ textAlign: 'center' }}>
              <FormattedMessage id="number_taks_title" />
              {taskData?.length}
            </Typography>
          </Box>
        </Card>
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