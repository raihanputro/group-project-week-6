import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import classes from './style.module.scss';

const DashboardAdmin = () => {
  return (
    <>
      <Typography variant='h1' component='div' className={classes.pageTitle}>
        <FormattedMessage id="dashboard_title" />
      </Typography>
      <Box>
        <Card>
          <Box>
            <Typography variant='h1' component='div' className={classes.summaryTitle} sx={{ textAlign: 'center' }}>
              <FormattedMessage id="number_users_title" />
            </Typography>
          </Box>
        </Card>
      </Box>
    </>
  )
}

export default DashboardAdmin