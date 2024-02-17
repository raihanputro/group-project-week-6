import { FormattedMessage } from 'react-intl';
import { Box, Button, Input, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { CloudUpload } from '@mui/icons-material';

import classes from './style.module.scss';

const MyProfile = ({ data, onChangeName, onSubmit, onChangeFile }) => {

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <div className={classes.container}>
      <h2>
        <FormattedMessage id='profile_myProfile' />
      </h2>
      <div className={classes.containerTextField}>
        <TextField onChange={onChangeName} className={classes.name} defaultValue={data?.name ? data?.name : null} id="outlined-basic" label={<FormattedMessage id='profile_name' />} variant="outlined" />
        <TextField className={classes.email} defaultValue={data?.email ? data?.email : null} disabled id="outlined-basic" label={<FormattedMessage id='profile_email' />} variant="outlined" />
        <Button onClick={onSubmit} variant='contained'>
          <FormattedMessage id='profile_update' />
        </Button>
        <Button onChange={onChangeFile} className={classes.buttonUpload} component="label" startIcon={<CloudUpload />}>
          Upload file
          <VisuallyHiddenInput type="file" accept="image/png, image/jpeg" />
        </Button>
      </div>
    </div>
  )
}

export default MyProfile