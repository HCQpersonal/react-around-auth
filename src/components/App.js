import React from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory, Redirect, withRouter } from 'react-router-dom';
import { api } from '../utils/Api';
import { AddPlacePopup } from './addplacepopup/AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { EditAvatarPopup } from './editavatarpopup/EditAvatarPopup';
import { EditProfilePopup } from './editprofilepopup/EditProfilePopup';
import Footer from './footer/Footer';
import Header from './header/Header';
import InfoTooltip from './infotooltip/InfoTooltip';
import Login from './login/Login';
import Main from './main/Main';
import ProtectedRoute from './protectedroute/ProtectedRoute';
import Register from './register/Register';
import './../index.css';
import * as auth from '../utils/Auth';

function App(props) {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [tooltipFeedback, setTooltipFeedback] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [registered, setRegistered] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const history = useHistory();

  React.useEffect(() => {
    let jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth.getContent(jwt)
      .then((res) => {
        setLoggedIn(true);
        setUserEmail(res.data.email);
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      setLoggedIn(false);
    }
  }, [] );

  const onLogout = () => {
    let jwt = localStorage.getItem('jwt');

    localStorage.removeItem(jwt);
    setLoggedIn(false);
    history.push('/signin');
  }

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
      setIsTooltipOpen(false);
      setSelectedCard(null);
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleTooltip(feedback) {
      setTooltipFeedback(feedback);
      setIsTooltipOpen(true);
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
              <Router>
                <Header loggedIn={loggedIn} userEmail={userEmail} handleLogout={onLogout} />
                    <Switch>
                      <Route exact path='/'>
                        {loggedIn ? <Redirect to="/home" /> : <Redirect to="/signin" />}
                      </Route>
                      <ProtectedRoute path='/profile' loggedIn={loggedIn} component={EditProfilePopup} />
                      <Route path='/signin'>
                        <Login handleLogin={handleLogin} feedback={tooltipFeedback} handleLogout={onLogout} userEmail={userEmail} setUserEmail={setUserEmail} handleTooltip={handleTooltip} />
                      </Route>
                      <Route path='/signup'>
                        <Register handleLogin={handleLogin} userEmail={setUserEmail}
                          setUserEmail={setUserEmail} handleTooltip={handleTooltip} feedback={tooltipFeedback} handleLogout={onLogout} />
                        <InfoTooltip isOpen={isTooltipOpen} onClose={closeAllPopups} feedback={tooltipFeedback} loggedIn={loggedIn} />
                      </Route>
                      <Route path='/home'>
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
                      <ProtectedRoute path='/home' component={Main}
                          loggedIn={loggedIn}
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
                    </Route>
                    <Redirect from='*' to='/' />
                  </Switch>
                </Router>
              </div>
            </div>
        </CurrentUserContext.Provider>
    </>
  );
}

export default withRouter(App);