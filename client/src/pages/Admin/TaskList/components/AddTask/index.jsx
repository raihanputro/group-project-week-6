import React, { useState, useEffect, useRef } from 'react';
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
import ImageIcon from '@mui/icons-material/Image';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { selectUserListData } from '@pages/Admin/UserList/selectors';
import { getUserListData } from '@pages/Admin/UserList/actions';
import { createTask } from '../../actions';

import classes from './style.module.scss';

const AddTask = ({ isOpen, onClose, userListSelect }) => {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState([]);
    const { handleSubmit, control, reset } = useForm();

    useEffect(() => {
      dispatch(getUserListData());
    }, [dispatch]);

    useEffect(() => {
      setUserData(userListSelect.response);
    }, [userListSelect]);

    const managerUser = userData?.filter(user => user.role === 2);

    const onSubmit = (data) => {
        dispatch(createTask({name: data.name, description: data.description, start_date: data.start_date, end_date: data.end_date, status: data.status, user_id: data.user_id }));
        reset();
        onClose();
    };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className={classes.modalContainer}>
        <Typography variant="h5" align="center" gutterBottom>
          <FormattedMessage id="add_task_modal_title" />
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
                defaultValue=""
                rules={{ required: 'Name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    margin="normal"
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
                defaultValue=""
                rules={{ required: 'Description is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
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
                defaultValue=""
                rules={{ required: 'Status is required' }}
                render={({ field }) => (
                  <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Role"
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
                defaultValue=""
                rules={{ required: 'Manager is required' }}
                render={({ field }) => (
                  <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Role"
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
                <FormattedMessage id="add_task_modal_button" />
            </Button>
          </Box> 
        </form>
      </Box>
    </Modal>
  )
}

AddTask.propTypes = {
  userListSelect: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  userListSelect: selectUserListData,
});

export default connect(mapStateToProps)(AddTask);
