// for user authorization
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, useHistory } from 'react-router-dom';
import * as auth from '../../utils/Auth';
import { PopupWithForm } from '../popupwithform/PopupWithForm';
import '../../blocks/credentials-page/credentials-page.css';

function Login({ handleLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const history = useHistory();

    const resetForm = (e) => {
        setEmail('')
        setPassword('')
        setMessage('')
    }

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            history.push('/home');
        }
    }, [history]);

    function handleSubmit(e) {
                e.preventDefault();
        
                if (!email || !password){
                    return;
                }

                auth.authorize(email, password)
                .then((data) => {
                    if (!data){
                        throw new Error('We cannot seem to find that user -- are you sure they exist?')
                    }
                    // if (data.jwt){
                    //     handleLogin();
                    // }
                })
                .then(resetForm)
                .then(() => history.push('/home'))
                .catch(err => setMessage(err.message));
            }

    // function logout() {
    //     localStorage.removeItem('jwt');
    //     history.push('/signin');
    // }

    return(
        <>
            <Link className='credentials-page__swap-btn' to='/signup'>
                Sign up
            </Link>
            <PopupWithForm name='credentials' title='Log in' isOpen={true} text="Log in" onSubmit={handleSubmit} to='/home'>
                <input type='email' id='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required />
                <input type='password' id='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}required />
                {/* <button className='credentials-page__submit'  to='/home'>
                    Log in
                </button> */}
                <Link className='credentials-page__swap-link' to='/signup'>
                    Not a member yet? Sign up here!
                </Link>
            </PopupWithForm>
        </>
    )
}

export default Login;