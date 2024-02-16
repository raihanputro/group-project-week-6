import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import classes from './style.module.scss';
import { selectMyMember, selectMyTaskDetail } from './selector';
import { getMyMember, getMyTaskDetail } from './actions';
import { selectUserDetails } from '@containers/Client/selectors';

const Detail = ({ myDetail, myMember, myUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    dispatch(
      getMyTaskDetail(id, () => {
        navigate('/notfound/error');
      })
    );
    dispatch(
      getMyMember(id, () => {
        navigate('/notfound/error');
      })
    );
  }, [dispatch]);

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
          <p className={classes.userPost}>Creator: {data?.Task?.User?.name}</p>
        </div>
        <p className={classes.date}>
          {data?.Task?.start_date?.substring(0, 10)} s/d {data?.Task?.end_date?.substring(0, 10)}
        </p>
        <p
          className={
            data?.Task?.status === 'ToDo'
              ? classes.statusTodo
              : data?.Task?.status === 'Progress'
              ? classes.statusProgress
              : classes.statusCompleted
          }
        >
          {data?.Task?.status}
        </p>
        <div className={classes.desc}>{data?.Task?.description}</div>
        <div className={classes.member}>
          <FormattedMessage id="app_text_member" />:
          {!myMember?.length > 0 ? (
            <p>No data</p>
          ) : (
            <div>
              <ol>
                {myMember.map((item, index) => {
                  return (
                    <li key={index}>
                      {item?.User?.name}
                      {item?.User?.id === myUser.id ? ' (You)' : ''}
                    </li>
                  );
                })}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Detail.prototypes = {
  myDetail: PropTypes.array,
  myMember: PropTypes.array,
  myUser: PropTypes.array
};


const mapStateToProps = createStructuredSelector({
  myDetail: selectMyTaskDetail,
  myMember: selectMyMember,
  myUser: selectUserDetails,
});

export default connect(mapStateToProps)(Detail);
