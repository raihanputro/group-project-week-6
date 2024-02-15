import { FormattedMessage } from 'react-intl';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';

import classes from './style.module.scss';

const MyProfile = ({ data }) => {

  const [name, setName] = useState('')

  return (
    <div className={classes.container}>
      <h2>
        <FormattedMessage id='profile_myProfile' />
      </h2>
      <div className={classes.containerTextField}>
        <TextField onChange={(e) => setName(e.target.value)} className={classes.name} defaultValue={data?.name ? data?.name : null} id="outlined-basic" label={<FormattedMessage id='profile_name' />} variant="outlined" />
        <TextField className={classes.email} defaultValue={data?.email ? data?.email : null} disabled id="outlined-basic" label={<FormattedMessage id='profile_email' />} variant="outlined" />
        <Button variant='contained'>
          <FormattedMessage id='profile_update' />
        </Button>
      </div>
    </div>
  )
}

export default MyProfile