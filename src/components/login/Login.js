// for user authorization
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, useHistory } from 'react-router-dom';
import * as auth from '../../utils/Auth';
import { PopupWithForm } from '../popupwithform/PopupWithForm';
import '../../blocks/credentials-page/credentials-page.css';

function Login({ loggedIn, handleLogin, userEmail, setUserEmail }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const history = useHistory();

    const resetForm = (e) => {
        setEmail('')
        setPassword('')
        setMessage('')
    }

    React.useEffect(() => {
        if (localStorage.getItem('jwt')) {
            history.push('/home');
            setUserEmail(email || userEmail);
        }
    }, [history, email, userEmail, setUserEmail]);

    React.useEffect(() => {
        if (loggedIn) {
            history.push('/home');
            setUserEmail(email || userEmail);
        }
    });

    function handleSubmit(e) {
                e.preventDefault();
        
                if (!email || !password){
                    throw new Error('400 - uh oh, something is off with those credentials!');
                }

                auth.authorize(email, password)
                .then((data) => {
                    if (!data){
                        throw new Error('We cannot seem to find that user -- are you sure they exist?')
                    }
                    if (data.token && data){
                        handleLogin();
                    }
                })
                .then(resetForm)
                .then(() => history.push('/home'))
                .catch(err => setMessage(err.message));
            }

    return(
        <>
            <PopupWithForm name='credentials' title='Log in' isOpen={true} text="Log in" onSubmit={handleSubmit} to='/home'>
                <Link className='credentials-page__swap-btn' to='/signup'>
                    Sign up
                </Link>
                <input className='modal__input modal__input_credentials' type='email' id='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required />
                <input className='modal__input modal__input_credentials'  type='password' id='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required />
                <Link className='modal__background_credentials__swap-link' to='/signup'>
                    Not a member yet? Sign up here!
                </Link>
            </PopupWithForm>
        </>
    )
}

export default Login;