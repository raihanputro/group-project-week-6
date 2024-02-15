import { FormattedMessage } from 'react-intl';
import classes from './style.module.scss'


const Home = () => {
  return (
    <div className={classes["page-container"]}>
      <div className={classes["content-container"]}>
        <h1>Taskmaster</h1>
        <h3>We will assist you in building your projects</h3>
        <button>
          LOGIN
        </button>
        <button>
          REGISTER
        </button>
      </div>
    </div>
  );
};

export default Home;
