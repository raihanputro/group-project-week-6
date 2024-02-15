import { FormattedMessage } from 'react-intl';

import classes from './style.module.scss';

const CurrentTask = () => {
    return (
        <div className={classes.container}>
            <h2>
                <FormattedMessage id='profile_currentTask' />
            </h2>
            <div className={classes.containerTextField}>
            </div>
        </div>
    )
}

export default CurrentTask