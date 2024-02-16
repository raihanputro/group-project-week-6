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

import { doRegister } from '@pages/Register/actions';

import classes from './style.module.scss';

const AddUser = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const { handleSubmit, control, reset } = useForm();

    const onSubmit = (data) => {
        dispatch(doRegister({email: data.email, password: data.password, confirmPassword: data.confirmPassword, name: data.name, role: 1 }));
        reset();
        onClose();
    };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className={classes.modalContainer}>
        <Typography variant="h5" align="center" gutterBottom>
          <FormattedMessage id="add_admin_modal_title" />
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className={classes.uploaderContainer}>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="email_modal_input" />
              </Typography>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: 'Email is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='email'
                    autoComplete='false'
                    margin="normal"
                    error={!!field.error}
                    helperText={field.error ? field.error.message : null}
                  />
                )}
              />
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="password_modal_input" />
              </Typography>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: 'Password is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='password'
                    margin="normal"
                    error={!!field.error}
                    helperText={field.error ? field.error.message : null}
                  />
                )}
              />
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="confirmPass_modal_input" />
              </Typography>
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                rules={{ required: 'Confirm Password is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='password'
                    margin="normal"
                    error={!!field.error}
                    helperText={field.error ? field.error.message : null}
                  />
                )}
              />
            </Box>
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              className={classes.addButton}
            >
                <FormattedMessage id="add_admin_modal_button" />
            </Button>
          </Box> 
        </form>
      </Box>
    </Modal>
  )
}

AddUser.propTypes = {
};

const mapStateToProps = createStructuredSelector({
});

export default connect(mapStateToProps)(AddUser);
