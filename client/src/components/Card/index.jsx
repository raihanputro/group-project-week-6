import classes from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

const Card = ({ data  }) => {
  const navigate = useNavigate();
  const gotToDetail = () => {
    navigate(`/member/task/${data?.task_id}`);
  };

  return (
    <div className={classes.container} onClick={gotToDetail}>
      <div className={classes.content}>
        <p className={classes.title}>{data?.Task?.name} ({data?.Task?.User?.name})</p>
        <p className={classes.date}>{data?.Task?.start_date.substring(0,10)} s/d {data?.Task?.end_date.substring(0,10)}</p>
        <p className={classes.shortdesc}>{data?.Task?.description}</p>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps)(Card);