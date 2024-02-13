import { FormattedMessage } from 'react-intl';
import classes from './style.module.scss';
import { TextField } from '@mui/material';

const MyProfile = () => {
  return (
    <div>
      <h2>
        <FormattedMessage id='profile_myProfile' />
      </h2>
      <div>
        <TextField id="outlined-basic" label="Nama" variant="outlined"/>
      </div>
    </div>
  )
}

export default MyProfile