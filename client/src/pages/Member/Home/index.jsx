import PropTypes from 'prop-types';

import classes from './style.module.scss';
import { FormattedMessage, useIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import Card from '@components/Card';
import { selectmyTask } from './selector';
import { getFetchMyTask, setMyTask } from './actions';

const HomeMember = ({ myTask }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(setMyTask(null));
    dispatch(getFetchMyTask());
  }, [dispatch]);

  useEffect(() => {
    setData(myTask);
  }, [myTask]);

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <FormattedMessage id="app_text_task" />{' '}
      </div>
      {!data?.length > 0 ? (
        <div className={classes.noContent}>No data</div>
      ) : (
        <div className={classes.content}>
          {data.map((item) => {
            return <Card data={item} key={item.id} />;
          })}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  myTask: selectmyTask,
});

export default connect(mapStateToProps)(HomeMember);
