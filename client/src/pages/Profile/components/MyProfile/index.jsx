import { FormattedMessage } from 'react-intl';
import { TextField } from '@mui/material';

import classes from './style.module.scss';

const MyProfile = () => {
  return (
    <div className={classes.container}>
      <h2>
        <FormattedMessage id='profile_myProfile' />
      </h2>
      <div className={classes.containerTextField}>
        <TextField className={classes.name} id="outlined-basic" label={<FormattedMessage id='profile_name' />} variant="outlined" />
        <TextField className={classes.email} disabled id="outlined-basic" label={<FormattedMessage id='profile_email' />} variant="outlined" />
      </div>
    </div>
  )
}

export default MyProfile