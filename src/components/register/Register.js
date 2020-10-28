// // for user registration
import React, { useEffect, useState } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { PopupWithForm } from '../popupwithform/PopupWithForm';
import handleTooltip from '../App';
import * as auth from '../../utils/Auth';
// import { render } from '@testing-library/react';
import '../../blocks/credentials-page/credentials-page.css';

function Register({ handleLogin, handleTooltip }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const history = useHistory();

    const resetForm = (e) => {
        setEmail('')
        setPassword('')
        setMessage('')
    }

    const handleRegSubmit = (e) => {
        e.preventDefault();

        auth.register(email, password).then((res) => {
            if(!res || res.statusCode === 400) {
                throw new Error('Oh no, something went wrong!');
            }

            if (res.data) {
                handleTooltip('success');
            } else {
                handleTooltip('failure');
            }

            return res;
        })
        .then(resetForm)
        .then(() => history.push('/signin'))
        .catch(err => setMessage(err.message))
    }

    React.useEffect(() => {
        if(localStorage.getItem('jwt')) {
            history.push('/home');
        }
    }, [history])

    return (
        <>
            <PopupWithForm title='Sign up' name='credentials' text='Sign up' isOpen={true} onSubmit={handleRegSubmit}>
                <Link className='credentials-page__swap-btn' to='/signin'>
                    Log in
                </Link>
                <input className='modal__input modal__input_credentials' type='email' id='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required />
                <input className='modal__input modal__input_credentials' type='password' id='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required />
                <button className='modal__save-btn modal__save-btn_credentials' type="submit" handleLogin={handleRegSubmit} to="/home">Sign up</button> 
                <Link className='modal__background_credentials__swap-link' to='/signin'>
                    Already a member? Log in here!
                </Link>
            </PopupWithForm>
        </>
    )
}

export default Register;