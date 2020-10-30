import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../nav/Nav';
import headerLogo from '../../images/logoAroundUS.png';	


export default function Header({ loggedIn, email, handleLogout }) {	
    return (	
    <header className="header">	
        <img className="header__logo" alt="Around the U.S. logo." src={headerLogo} />
        
      {loggedIn && (
        <ul className='header__nav'>
          <li className='header__nav-email'>{email}</li>
          <li>
            <Link className='header__nav-logout' onClick={handleLogout} to='/signin'>
              Log out
            </Link>
          </li>
        </ul>)}
    </header>
)};

    {/* </>
  ); */}
        {/* <Nav  />
        <ul>
            <li>{props.email}</li>
            <li>Log out</li>
        </ul>
        {/* {/* <Link className='credentials-page__swap-btn' to={'/signin' ? '/signup' : '/signin'} >
            {'/signin' ? 'Sign up' : 'Sign in'}
        </Link> 
        {props.loggedIn && <Nav email={props.email}/>} */}