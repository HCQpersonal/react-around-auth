// for user authorization
import React, { useState } from 'react';
import { BrowserRouter, Link, useHistory } from 'react-router-dom';
import { BASE_URL, authorize, register, getContent } from '../../utils/Auth';
import { PopupWithForm } from '../popupwithform/PopupWithForm';
import '../../blocks/credentials-page/credentials-page.css';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            password: '',
            email: '',
            message: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { input, value } = e.target;
        this.setState({
            [input]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        if (!this.state.email || !this.state.password){
            return;
        }
        authorize.authorize(this.state.email, this.state.password)
        .then((data) => {
            if (!data){
                return this.setState({
                    message: 'One of the fields was filled in incorrectly.'
                });
            }
            if (data.jwt){
                this.setState({email: '', password: '', message: ''}, () => {
                    this.props.handleLogin();
                    // this.props.history.push('/');
                })
            }
        })
    }

    // React.useEffect(() => {
    //     if (loggedIn) {
    //         history.push('/');
    //     }
    // });

    render(){
        return(
            <>
                <Link className='credentials-page__swap-btn' to='/signup'>
                    Sign up
                </Link>
                <PopupWithForm name='signin' title='Log in' isOpen={true} text="Log in" onSubmit={this.handleSubmit} to='/'>
                    <input className='credentials-page__input' type='email' id='email' placeholder='Email' required />
                    <input className='credentials-page__input' type='password' id='password' placeholder='Password' required />
                    {/* <button className='credentials-page__submit'  to='/'>
                        Log in
                    </button> */}
                    <Link className='credentials-page__swap-link' to='/signup'>
                        Not a member yet? Sign up here!
                    </Link>
                </PopupWithForm>
            </>
        )
    }
}

export default Login;