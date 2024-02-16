import { FormattedMessage } from 'react-intl';

import classes from './style.module.scss';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const CurrentTask = () => {
    return (
        <div className={classes.container}>
            <h2>
                <FormattedMessage id='profile_currentTask' />
            </h2>
            <div className={classes.containerTextField}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Nama Task</TableCell>
                            <TableCell>Manager</TableCell>
                            <TableCell>status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>[HTML/CSS]</TableCell>
                            <TableCell>Hilman</TableCell>
                            <TableCell>ToDo</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>2</TableCell>
                            <TableCell>[HTML/CSS]</TableCell>
                            <TableCell>Hilman</TableCell>
                            <TableCell>ToDo</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default CurrentTask