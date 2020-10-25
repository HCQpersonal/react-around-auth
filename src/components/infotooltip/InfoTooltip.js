import React from 'react';
import { PopupWithForm } from '../popupwithform/PopupWithForm';
import successIcon from '../../images/successIcon.png';
import failIcon from '../../images/failIcon.png';
import '../../blocks/modal/__background/_tooltip/modal__background_tooltip.css';

function InfoTooltip(props) {
    return (
        <PopupWithForm className='modal__background_tooltip' isOpen={props.isOpen} onClose={props.onClose}>
            <img className='' src={props.mode === 'success' ? successIcon : failIcon} alt='success or failure feedback icon' />
            <h2 className=''>{props.mode ==='success' ? 'Success! You have now been registered.' : 'Oops, something went wrong! Please try again.'}</h2>
        </PopupWithForm>
    )
}

export default InfoTooltip;