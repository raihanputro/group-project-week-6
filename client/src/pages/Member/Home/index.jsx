import PropTypes from 'prop-types';

import classes from './style.module.scss';
import { FormattedMessage, useIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Card from '@components/Card';

const HomeMember = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  //   useEffect(() => {
  //     dispatch(setMyTeam(null));
  //     dispatch(getFetchMyTeam());
  //   }, [dispatch]);

  //   useEffect(() => {
  //     dispatch(getFetchProfile());
  //   }, [dispatch]);

  //   useEffect(() => {
  //     setData(myTeam);
  //   }, [myTeam]);

  //   useEffect(() => {
  //   const dataToken = jwtDecode(token);
  //     if (dataToken.isAdmin === true) {
  //       navigate('/admin'); // Jika user adalah admin, navigasi ke halaman admin
  //     }
  //   }, [navigate]);

  return (
    <div className={classes.container}>
      <div className={classes.title}></div>
      <Card />
    </div>
  );
};

export default HomeMember;
