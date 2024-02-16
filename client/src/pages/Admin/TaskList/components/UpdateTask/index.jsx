import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { getTaskDetailData, updateTask } from '../../actions';
import { selectTaskDetailData } from '../../selectors';
import { selectUserListData } from '@pages/Admin/UserList/selectors';

import classes from './style.module.scss';

const UpdateTask = ({ isOpen, onClose, id, taskDataSelect, userListSelect }) => {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState([]);
    const [taskData, setTaskData] = useState([]);

    const { handleSubmit, control, reset, setValue } = useForm();

    console.log(taskData, 'test')
    console.log(id, 'test')
    console.log(taskDataSelect, 'test')

    useEffect(() => {
      if(id) {
        dispatch(getTaskDetailData(id));
      }
    }, [id]);

    useEffect(() => {
      setUserData(userListSelect.response);
    }, [userListSelect]);

    useEffect(() => {
      setTaskData(taskDataSelect.data);
    }, [taskDataSelect]);

    useEffect(() => {
      if (isOpen && taskData) {
        setValue('name', taskData?.name);
        setValue('description', taskData?.description);
        setValue('status', taskData?.status);
        setValue('user_id', taskData?.user_id);
      }
    }, [isOpen, taskDataSelect]);

    const managerUser = userData?.filter(user => user.role === 2);

    const onSubmit = (data) => {
      console.log(data, 'kntl')
        // dispatch(updateTask(id, {name: data.name, description: data.description, start_date: data.start_date, end_date: data.end_date, status: data.status, user_id: data.user_id }));
        reset();
        onClose();
    };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className={classes.modalContainer}>
        <Typography variant="h5" align="center" gutterBottom>
          <FormattedMessage id="update_task_modal_title" /> 
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className={classes.uploaderContainer}>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="name_modal_input" />
              </Typography>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    margin="normal"
                    value={field.value}     
                    error={!!field.error}
                    helperText={field.error ? field.error.message : null}
                  />
                )}
              />
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="description_modal_input" />
              </Typography>
              <Controller
                name="description"
                control={control}
                rules={{ required: 'Description is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    value={field.value}     
                    margin="normal"
                    error={!!field.error}
                    helperText={field.error ? field.error.message : null}
                  />
                )}
              />
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="startdate_modal_input" />
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                      name="start_date"
                      control={control}
                      defaultValue={null}
                      rules={{ required: 'Start date is required' }}
                      render={({ field }) => (
                        <DateTimePicker
                          {...field}
                          sx={{ width: '100%', marginBottom: '10px' }}
                          error={!!field.error}
                          helperText={field.error ? field.error.message : null}
                        />
                      )}
                  />
                </LocalizationProvider>
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="enddate_modal_input" />
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                      name="end_date"
                      control={control}
                      defaultValue={null}
                      rules={{ required: 'End date is required' }}
                      render={({ field }) => (
                        <DateTimePicker
                          {...field}
                          error={!!field.error}
                          helperText={field.error ? field.error.message : null}
                          sx={{ width: '100%', marginBottom: '10px' }}
                        />
                      )}
                  />
                </LocalizationProvider>
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="status_modal_input" />
              </Typography>
              <Controller
                name="status"
                control={control}
                rules={{ required: 'Status is required' }}
                render={({ field }) => (
                  <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Role"
                  value={field.value}  
                  sx={{ mb: '1%' }}   
                  fullWidth
                >
                  <MenuItem value={'ToDo'}>ToDo</MenuItem>
                  <MenuItem value={'Progress'}>Progress</MenuItem>
                  <MenuItem value={'Completed'}>Completed</MenuItem>
                  <MenuItem value={'Expired'}>Expired</MenuItem>
                </Select>
                )}
              />
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="manager_modal_input" />
              </Typography>
              <Controller
                name="user_id"
                control={control}
                rules={{ required: 'Manager is required' }}
                render={({ field }) => (
                  <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Role"
                  value={field.value}     
                  fullWidth
                >
                  {managerUser && Array.isArray(managerUser) && managerUser?.map(manager =>(
                    <MenuItem key={manager.id} value={manager.id}>
                      {manager.name}
                    </MenuItem>
                  ))}
                </Select>
                )}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              className={classes.addButton}
            >
                <FormattedMessage id="update_task_modal_button" />
            </Button>
          </Box> 
        </form>
      </Box>
    </Modal>
  )
}

UpdateTask.propTypes = {
  taskDataSelect: PropTypes.object,
  userListSelect: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  taskDataSelect: selectTaskDetailData,
  userListSelect: selectUserListData,
});

export default connect(mapStateToProps)(UpdateTask);
