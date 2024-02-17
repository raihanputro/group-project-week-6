import React from 'react';
import { Button, TextField } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import classes from './style.module.scss';

const ChangePass = ({ password, onChangeOld, onChangeNew, onChangeNewConfirm, onSubmit }) => {
    return (
        <div className={classes.container}>
            <h2>
                <FormattedMessage id='profile_changePass' />
            </h2>
            <div className={classes.containerTextField}>
                <TextField value={password.old_password} onChange={onChangeOld} className={classes.name} id="outlined-basic" label={<FormattedMessage id='profile_old_password' />} variant="outlined" />
                <TextField value={password.new_password} onChange={onChangeNew} className={classes.email} id="outlined-basic" label={<FormattedMessage id='profile_new_password' />} variant="outlined" />
                <TextField value={password.new_confirm_password} onChange={onChangeNewConfirm} className={classes.email} id="outlined-basic" label={<FormattedMessage id='profile_new_confirm_password' />} variant="outlined" />
                <Button onClick={onSubmit} variant='contained'>
                    <FormattedMessage id='profile_changePass' />
                </Button>
            </div>
        </div>
    )
}

export default ChangePass