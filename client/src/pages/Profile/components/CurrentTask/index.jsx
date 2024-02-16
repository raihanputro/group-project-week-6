import { FormattedMessage } from 'react-intl';

import classes from './style.module.scss';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

const CurrentTask = ({ myTask, token, myTaskManager }) => {
    return (
        <div className={classes.container}>
            <h2>
                <FormattedMessage id='profile_currentTask' />
            </h2>
            <div className={classes.containerTextField}>
                {
                    token?.role === 2 ?
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>No</TableCell>
                                    <TableCell>Nama Task</TableCell>
                                    <TableCell>status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    myTaskManager?.length !== 0 ?
                                        myTaskManager?.map((data, index) => {
                                            return (
                                                <TableRow>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{data?.name}</TableCell>
                                                    <TableCell>
                                                        {
                                                            data?.status === 'ToDo'
                                                            &&
                                                            <Typography variant='p' component='div' className={classes.statusTodo}>
                                                                ToDo
                                                            </Typography>
                                                        }
                                                        {
                                                            data?.status === 'Progress'
                                                            &&
                                                            <Typography variant='p' component='div' className={classes.statusProgress}>
                                                                Progress
                                                            </Typography>
                                                        }
                                                        {
                                                            data?.status === 'Completed'
                                                            &&
                                                            <Typography variant='p' component='div' className={classes.statusCompleted}>
                                                                Completed
                                                            </Typography>
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                        :
                                        <TableRow>
                                            <TableCell colSpan={3} align='center'>DATA EMPTY</TableCell>
                                        </TableRow>
                                }
                            </TableBody>
                        </Table>
                        :
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
                                {
                                    myTask?.length !== 0 ?
                                        myTask?.map((data, index) => {
                                            return (
                                                <TableRow>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{data?.Task?.name}</TableCell>
                                                    <TableCell>{data?.User?.name}</TableCell>
                                                    <TableCell>
                                                        {
                                                            data?.Task?.status === 'ToDo'
                                                            &&
                                                            <Typography variant='p' component='div' className={classes.statusTodo}>
                                                                ToDo
                                                            </Typography>
                                                        }
                                                        {
                                                            data?.Task?.status === 'Progress'
                                                            &&
                                                            <Typography variant='p' component='div' className={classes.statusProgress}>
                                                                Progress
                                                            </Typography>
                                                        }
                                                        {
                                                            data?.Task?.status === 'Completed'
                                                            &&
                                                            <Typography variant='p' component='div' className={classes.statusCompleted}>
                                                                Completed
                                                            </Typography>
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                        :
                                        <TableRow>
                                            <TableCell colSpan={3} align='center'>DATA EMPTY</TableCell>
                                        </TableRow>
                                }
                            </TableBody>
                        </Table>
                }
            </div>
        </div>
    )
}

export default CurrentTask