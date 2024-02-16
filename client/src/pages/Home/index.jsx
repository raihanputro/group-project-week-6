import { FormattedMessage } from 'react-intl';
import classes from './style.module.scss'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const userDetails = useSelector((state) => state.client.userDetails);
  return (
    <div className={classes["page-container"]}>
      <div className={classes["content-container"]}>
        <h1>Taskmaster</h1>
        <h3><FormattedMessage id='hero_sub_text' /></h3>
        <div>
          {!userDetails && (
            <>
              <Link to={'/login'}>
                <button>
                  <FormattedMessage id='login' />
                </button>
              </Link>
              <Link to={'/register'}>
                <button className={classes["button-right"]}>
                  <FormattedMessage id='register' />
                </button>
              </Link>
            </>
          )}
          {userDetails && (
            <>
              {userDetails?.role == 1 &&
                <Link to="/admin">
                  <button>
                    <FormattedMessage id='dashboard_title' />
                  </button>
                </Link>
              }
              {userDetails?.role == 2 &&
                <Link to="/manager">
                  <button>
                    <FormattedMessage id='dashboard_title' />
                  </button>
                </Link>
              }
              {userDetails?.role == 3 &&
                <Link to="/member">
                  <button>
                    <FormattedMessage id='dashboard_title' />
                  </button>
                </Link>
              }
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
