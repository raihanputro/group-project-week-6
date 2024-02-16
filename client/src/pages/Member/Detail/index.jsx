import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import classes from './style.module.scss';
import { selectMyTaskDetail } from './selector';
import { getMyTaskDetail } from './actions';

const Detail = ({ myDetail }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    dispatch(
      getMyTaskDetail(id)
    );
  }, [dispatch]);
  console.log(myDetail)
  useEffect(() => {
    if (myDetail) {
      setData(myDetail);
    }
  }, [myDetail]);
  
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.title}>
          <p className={classes.titlePost}>{data?.Task?.name}</p>
          <p className={classes.userPost}>{data?.Task?.User?.name}</p>
        </div>
        <p className={classes.date}>
          {data?.Task?.start_date?.substring(0, 10)} s/d {data?.Task?.end_date?.substring(0, 10)}
        </p>
        <div className={classes.desc}>{data?.Task?.description}</div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  myDetail: selectMyTaskDetail,
});

export default connect(mapStateToProps)(Detail);
