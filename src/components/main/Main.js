import React from 'react';
import Card from '../card/Card';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { PopupWithForm } from '../popupwithform/PopupWithForm';
import PopupWithImage from '../popupwithimage/PopupWithImage';

export default function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    // const [searchText, setSearchText] = React.useState('');
    // const [isLoading, setIsLoading] = React.useState(false);

    return(
        <>
            <section className="profile">
                <div className="profile__avatar-elements">
                    <img className="profile__avatar" alt="User's profile." src={currentUser && currentUser.avatar} onClick={props.onEditAvatar} />
                    <button className="profile__avatar-button" aria-label="Update profile photo" onClick={props.onEditAvatar} ></button>
                </div>
                <div className="profile__info-set">
                    <h1 className="profile__info profile__info_name">{currentUser && currentUser.name}</h1>
                    <p className="profile__info profile__info_description">{currentUser && currentUser.about}</p>
                </div>
                <button className="profile__edit-button" aria-label="Edit profile" onClick={props.onEditProfile}></button>
                <button className="profile__add-button" aria-label="Add new image" onClick={props.onAddPlace}></button>
            </section>
            <section className="grid">
                <ul className="grid__photos">
                </ul>
            </section>
            <div className="grid">
                <ul className="grid__photos">
                    {props.cards.map((card) => (
                        <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
                    ))}
                </ul>
            </div>
            <PopupWithForm name="delete" title="Are you sure?" isOpen={false} onClose={props.onClosePopups} text="Yes" />
            <PopupWithImage onClose={props.onClosePopups} card={props.selectedCard} />
        </>
        );
    }