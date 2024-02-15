import { useEffect, useState } from 'react';

import classes from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

const Card = ({ data  }) => {
  const navigate = useNavigate();
  const gotToDetail = () => {
    navigate(`/user/my-project/${data?.id}`);
  };

  return (
    <div className={classes.container} onClick={gotToDetail}>
      <img src={data?.project?.imageUrl} className={classes.image} />
      <div className={classes.content}>
        <p className={classes.title}>test</p>
        <p className={classes.date}>test</p>
        <p className={classes.shortdesc}>dawda</p>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps)(Card);