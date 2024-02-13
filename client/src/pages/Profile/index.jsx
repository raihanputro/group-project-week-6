import { Button } from '@mui/material';
import classes from './style.module.scss';
import { useState } from 'react';
import MyProfile from './components/MyProfile';
import ChangePass from './components/ChangePass';
import CurrentTask from './components/CurrentTask';
import { FormattedMessage } from 'react-intl';

const Profile = () => {

    const [part, setPart] = useState(1)

    const renderedComponent = () => {
        switch (part) {
            case 1:
                return <MyProfile />;
            case 2:
                return <ChangePass />;
            case 3:
                return <CurrentTask />;
            default:
                break;
        }
    }

    const handlerPart = (e) => {
        setPart(Number(e.target.value))
    }

    return (
        <div className={classes.container}>
            <div className={classes.atas}>
            </div>
            <div className={classes.bawah}>
                <div className={classes.containerContent}>
                    <div className={classes.sidebar}>
                        <div className={classes.containerImage}>
                            <img className={classes.profilePicture} src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=338&ext=jpg&ga=GA1.1.87170709.1707782400&semt=ais" alt="Profile Picture" />
                            <p className={classes.name}>
                                Nama Akun
                            </p>
                        </div>
                        <div className={classes.containerButton}>
                            <Button value={1} onClick={handlerPart}>
                                <FormattedMessage id='profile_myProfile' />
                            </Button>
                            <Button value={2} onClick={handlerPart}>
                                <FormattedMessage id='profile_changePass' />
                            </Button>
                            <Button value={3} onClick={handlerPart}>
                                <FormattedMessage id='profile_currentTask' />
                            </Button>
                        </div>
                    </div>
                    <div className={classes.content}>
                        {renderedComponent()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile