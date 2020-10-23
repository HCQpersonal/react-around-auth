import React from 'react';	
import headerLogo from '../../images/logoAroundUS.png';	


export default function Header() {	
    return (	
    <header className="header">	
        <img className="header__logo" alt="Around the U.S. logo." src={headerLogo} />	
    </header>	
)};