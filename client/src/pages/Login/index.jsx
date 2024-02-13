import { FormattedMessage } from 'react-intl';
import { useForm } from "react-hook-form";
import { doLogin } from './actions'
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import encryptPayload from '@utils/encryptionHelper';

import classes from './style.module.scss'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const notifyError = (message) => toast.error(message, {
    position: 'bottom-right'
  });

  const notifySuccess = (message) => toast.success(message, {
    position: 'bottom-right'
  });

  const onSubmit = async (data) => {
    try {
      const encryptedData = encryptPayload(data);
      dispatch(doLogin({ encryptedData }, async () => {
        notifySuccess("Login Successful");
        await delay(1500);
        navigate('/');
      }, (error) => {
        console.log(error)
        notifyError(error || "An error occurred");
      }))
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={classes["login-page-wrapper"]}>
        <div className={classes["login-box-container"]}>
          <h3>
            <FormattedMessage id='login_title' />
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className={classes["login-form-container"]}>
            <label htmlFor='email'>Email:</label><br />
            <input type='email' id='email' name='email' required {...register("user_email")} /><br />
            <label htmlFor='password'>Password:</label><br />
            <input type='password' id='password' name='password' required  {...register("user_password")} /><br />
            <button type='submit'>Login</button>
            <Toaster />
          </form>
          <p className={classes["register-text"]}>
            <FormattedMessage id='login_to_register' />&nbsp;
            <Link to="/register"><FormattedMessage id='register_now' /></Link>
          </p>
          <p className={classes["register-text"]}>
            <FormattedMessage id='login_to_forgot_password' />&nbsp;
            <Link to="/register"><FormattedMessage id='click_here' /></Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login