import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../nav/Nav';
import headerLogo from '../../images/logoAroundUS.png';	


export default function Header({ email, loggedIn, handleLogout }) {	
    return (	
    <header className="header">	
        <img className="header__logo" alt="Around the U.S. logo." src={headerLogo} />
        <Nav email={email} loggedIn={loggedIn} handleLogout={handleLogout} />
        {/* <Link className='credentials-page__swap-btn' to={'/signin' ? '/signup' : '/signin'} >
            {'/signin' ? 'Sign up' : 'Sign in'}
        </Link> */}
    </header>
)};