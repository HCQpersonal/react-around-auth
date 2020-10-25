// // for user registration
import React, { useEffect, useState } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { PopupWithForm } from '../popupwithform/PopupWithForm';
import handleTooltip from '../App';
import * as auth from '../../utils/Auth';
// import { render } from '@testing-library/react';
import '../../blocks/credentials-page/credentials-page.css';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const history = useHistory();

    const resetForm = (e) => {
        setEmail('')
        setPassword('')
        setMessage('')
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        auth.register(email, password).then((res) => {
            if(!res || res.statusCode === 400) {
                handleTooltip('failure');
                throw new Error('Oh no, something went wrong!');
            };

            handleTooltip('success');
            return res;
        })
        .then(resetForm)
        .then(() => history.push('/signin'))
        .catch(err => setMessage(err.message))
    }

    useEffect(() => {
        if(localStorage.getItem('jwt')) {
            history.push('/home');
        }
    }, [history])

    return (
        <>
            <Link className='credentials-page__swap-btn' to='/signin'>
                Log in
            </Link>
            <PopupWithForm title='Sign up' name='credentials' isOpen={true}>
                <input type='email' id='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required />
                <input type='password' id='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}required />
                <button to='/home'>Sign up</button>
                <Link className='credentials-page__swap-link' to='/signin'>
                    Already a member? Log in here!
                </Link>
            </PopupWithForm>
        </>
    )
}

export default Register;