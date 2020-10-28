// for user authorization
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, useHistory } from 'react-router-dom';
import * as auth from '../../utils/Auth';
import { PopupWithForm } from '../popupwithform/PopupWithForm';
import '../../blocks/credentials-page/credentials-page.css';

function Login({ loggedIn, handleLogin }) {
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
            setEmail(email)
        }
    }, [history, email]);

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
                    if (data.jwt){
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
                <button className='modal__save-btn modal__save-btn_credentials' type="submit" to="home">Log in</button> 
                <Link className='modal__background_credentials__swap-link' to='/signup'>
                    Not a member yet? Sign up here!
                </Link>
            </PopupWithForm>
        </>
    )
}

export default Login;