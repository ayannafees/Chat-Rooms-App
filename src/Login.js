import React from 'react'
import './Login.css'
import { Button } from '@mui/material';
import { auth, provider } from './firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => {
              dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
              })
            })
            .catch((error)=>alert(error.message))
    };

  return (
    <div className='login'>
        <div className="login__container">
            <img
            src="https://i.pinimg.com/originals/25/d4/89/25d489c501c44e1b2b5e2db5f4bb6f3f.jpg"
            // src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt=""
            />
            <div className="login__text">
            <h1>Sign in to Ayan's Chat Rooms App</h1>
            </div>

            <Button type="submit" onClick={signIn}>
            <p>Sign in with Google</p>
            </Button>
        </div>
    </div>
  )
}

export default Login;