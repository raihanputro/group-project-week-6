import { FormattedMessage } from 'react-intl';
import classes from './style.module.scss'


const Home = () => {
  return (
    <div className={classes["page-container"]}>
      <div className={classes["content-container"]}>
        <h1>Taskmaster</h1>
        <h3><FormattedMessage id='hero_sub_text' /></h3>
        <button>
          <FormattedMessage id='login' />
        </button>
        <button className={classes["button-right"]}>
          <FormattedMessage id='register' />
        </button>
      </div>
    </div>
  );
};

export default Home;
