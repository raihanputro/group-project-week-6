import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import MyProfile from './components/MyProfile';
import ChangePass from './components/ChangePass';
import CurrentTask from './components/CurrentTask';

import { changeImage, changePassword, getProfile, getTask, getTaskManager, setProfile, setStep, updateProfile } from './action';
import { selectProfile, selectTask, selectTaskManager } from './selector';
import encryptPayload from '@utils/encryptionHelper';

import classes from './style.module.scss';
import { selectToken } from '@containers/Client/selectors';
import { jwtDecode } from 'jwt-decode';

const Profile = ({ data, myTask, token, myTaskManager }) => {

    const decryptData = jwtDecode(token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentStep = useSelector((state) => state.profile.step);
    const profileState = useSelector((state) => state.profile.data)
    const [name, setName] = useState(profileState?.name);
    const [password, setPassword] = useState({
        old_password: '',
        new_password: '',
        new_confirm_password: ''
    });
    const [image, setImage] = useState(null);

    const onHandlerImage = (e) => {
        setImage(e.target.files[0]);
        const formData = new FormData();
        formData.append("imageUrl", e.target.files[0])

        dispatch(changeImage(formData, () => {
            dispatch(getProfile())
        }))
    }

    const onSubmitChangePassword = () => {
        const encryptData = {
            old_password: encryptPayload(password.old_password),
            new_password: encryptPayload(password.new_password),
            new_confirm_password: encryptPayload(password.new_confirm_password)
        }
        dispatch(changePassword(encryptData, () => {
            setPassword({
                old_password: '',
                new_password: '',
                new_confirm_password: ''
            })
        }))
    };

    const onSubmitUpdateProfile = () => {
        dispatch(updateProfile({ name }, () => {
            dispatch(getProfile())
        }))
    };

    const renderedComponent = () => {
        switch (currentStep) {
            case 1:
                return <MyProfile
                    data={data}
                    onChangeName={(e) => setName(e.target.value)}
                    onSubmit={onSubmitUpdateProfile}
                    onChangeFile={onHandlerImage}
                />;
            case 2:
                return <ChangePass password={password}
                    onChangeOld={(e) => setPassword({ ...password, old_password: e.target.value })}
                    onChangeNew={(e) => setPassword({ ...password, new_password: e.target.value })}
                    onChangeNewConfirm={(e) => setPassword({ ...password, new_confirm_password: e.target.value })}
                    onSubmit={onSubmitChangePassword}
                />;
            case 3:
                return <CurrentTask myTask={myTask} token={decryptData} myTaskManager={myTaskManager} />;
            default:
                break;
        }
    };

    const handlerPart = (e) => {
        dispatch(setStep(Number(e.target.value)));
    };

    if (decryptData?.role === 2) {
        useEffect(() => {
            dispatch(getProfile())
            dispatch(getTaskManager())

        }, [])
    } else if (decryptData?.role === 3) {
        useEffect(() => {
            dispatch(getProfile())
            dispatch(getTask())
        }, [])
    } else {
        useEffect(() => {
            dispatch(getProfile())
        }, [])
    }

    return (
        <div className={classes.container}>
            <div className={classes.atas}>
            </div>
            <div className={classes.bawah}>
                <div className={classes.containerContent}>
                    <div className={classes.sidebar}>
                        <div className={classes.containerImage}>
                            <img className={classes.profilePicture} src={data?.imageUrl ? data?.imageUrl : "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=338&ext=jpg&ga=GA1.1.87170709.1707782400&semt=ais"} alt="Profile Picture" />
                        </div>
                        <div className={classes.containerButton}>
                            <Button value={1} onClick={handlerPart}>
                                <FormattedMessage id='profile_myProfile' />
                            </Button>
                            <Button value={2} onClick={handlerPart}>
                                <FormattedMessage id='profile_changePass' />
                            </Button>
                            {
                                decryptData?.role === 1 ?
                                    null
                                    :
                                    <Button value={3} onClick={handlerPart}>
                                        <FormattedMessage id='profile_currentTask' />
                                    </Button>
                            }
                        </div>
                    </div>
                    <div className={classes.content}>
                        {renderedComponent()}
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

Profile.propTypes = {
    data: PropTypes.object,
    myTask: PropTypes.array,
    token: PropTypes.object,
    myTaskManager: PropTypes.array
}

const mapStateToProps = createStructuredSelector({
    data: selectProfile,
    myTask: selectTask,
    token: selectToken,
    myTaskManager: selectTaskManager
})

export default connect(mapStateToProps)(Profile);