import React from 'react';
import { api } from '../utils/Api';
import { AddPlacePopup } from './addplacepopup/AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { EditAvatarPopup } from './editavatarpopup/EditAvatarPopup';
import { EditProfilePopup } from './editprofilepopup/EditProfilePopup';
import Footer from './footer/Footer';
import Header from './header/Header';
import Main from './main/Main';
import './../index.css';

export default function App(props) {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(null);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleUpdateUserInfo({ name, about }) {
        api.updateUserInfo({ name, about })
          .then((res) => {
            setCurrentUser(res)
          });
        closeAllPopups();
      }

    function handleUpdateAvatar({ avatar }) {
        api.setUserAvatar(avatar.current.value).then((res) => {
            setCurrentUser(res);
          });
        closeAllPopups();
    }

    function handleAddPlace({ caption, imageUrl }) {
        api.addCard({ caption, imageUrl }).then((newCard) => {
          setCards([...cards, newCard]);
        });
        closeAllPopups();
      }

      function handleCardLike(card) {
          const isLiked = card.likes.some((i) => i._id === currentUser._id);
          api.toggleLike(card._id, isLiked).then((newCard) => {
            const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
            setCards(newCards);
          });
      }
  
      function handleCardDelete(card) {
          api.deleteCard(card._id).then(() => {
              setCards(cards.filter((c) => c._id !== card._id));
          });
      }
    
      React.useEffect(() => {
        setCards(cards);
      }, [cards])
    

    function closeAllPopups() {
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(null);
    }
    
    React.useEffect(() => {
        api.getUserInfo()
          .then((res) => {
            setCurrentUser(res);
            // setCurrentUser(res.owner._id);
          }).catch((err) => {
            console.log(err);
          });
      }, []);

      React.useEffect(() => {
        // setIsLoading(true);
        api.getCardList()
            .then((res) => {
                setCards((cards) => [...cards, ...res]);
            }).catch((err) => {
                console.log(err);
            });
        }, []);  

  return (
    <>
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
              <div className="page__container">
                <Header />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUserInfo}
                />           
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddNewCard={handleAddPlace}
                />
                <Main 
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onClosePopups={closeAllPopups}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    isEditProfilePopupOpen={isEditProfilePopupOpen}
                    isAddPlacePopupOpen={isAddPlacePopupOpen}
                    isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                    selectedCard={selectedCard}
                    cards={cards}
                />
                <Footer />
              </div>
            </div>
        </CurrentUserContext.Provider>
    </>
  );
}

