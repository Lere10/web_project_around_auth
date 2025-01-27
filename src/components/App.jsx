import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import InfoTooltip from "./Main/components/Popup/components/InfoTooltip/InfoTooltip.jsx";
import Popup from "./Main/components/Popup/Popup.jsx";

import * as auth from "../utils/auth.js";
import * as token from "../utils/token.js";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [infoState, setInfoState] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUser().then((res) => {
      setCurrentUser(res);
    });
  }, []);

  useEffect(() => {
    const jwt = token.getToken();

    if (!jwt) {
      return;
    }
    api
      .getUserInfo(jwt)
      .then(({ username, email }) => {
        setIsLoggedIn(true);
        setUserData({ username, email });
      })
      .catch(console.error);
  }, []);

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          token.setToken(data.token, email);
          setUserData({ email, password });
          setIsLoggedIn(true);
          const redirectPath = location.state?.from || "/";
          navigate(redirectPath);
        }
      })
      .catch((err) => {
        setPopup({
          title: "",
          children: <InfoTooltip state={false} />,
        });
        console.log("erro de login: ", err);
      });
  };

  const handleLogout = () => {
    token.removeToken();
    setIsLoggedIn(false);
  };

  const handleRegistration = ({ email, password }) => {
    auth
      .register(email, password)
      .then(() => {
        setInfoState(true);
        setPopup({
          title: "",
          children: <InfoTooltip state={true} />,
        });
        navigate("/signin", { replace: true });
      })
      .catch((err) => {
        console.log("erro de registro: ", err);
        setInfoState(false);
        setPopup({
          title: "",
          children: <InfoTooltip state={false} />,
        });
      });
  };

  const handleUpdateAvatar = async (data) => {
    await api.setNewAvatar(data);
    setCurrentUser((prevUser) => ({ ...prevUser, avatar: data.link }));

    handleClosePopup();
  };

  const handleUpdateUser = async (data) => {
    await api.setNewUser(data);
    setCurrentUser((prevUser) => ({
      ...prevUser,
      name: data.name,
      about: data.about,
    }));

    handleClosePopup();
  };

  useEffect(() => {
    api.getInitialCards().then((res) => {
      setCards(res);
    });
  }, []);

  const handleAddPlace = async (data) => {
    api.setNewCard(data).then((newCard) => {
      setCards([newCard, ...cards]);
    });

    handleClosePopup();
  };

  async function handleCardDelete(card) {
    api.deleteCard(card._id);
    setCards((prevCards) =>
      prevCards.filter((cardDelete) => cardDelete._id !== card._id)
    );
  }

  async function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    if (!isLiked) {
      await api
        .apiLike(card._id)
        .then((updatedCard) => {
          setCards((cardState) =>
            cardState.map((currentCard) =>
              currentCard._id === card._id ? updatedCard : currentCard
            )
          );
        })
        .catch((error) => console.error(error));
    } else {
      await api
        .apiDislike(card._id)
        .then((updatedCard) => {
          setCards((cardState) =>
            cardState.map((currentCard) =>
              currentCard._id === card._id ? updatedCard : currentCard
            )
          );
        })
        .catch((error) => console.error(error));
    }
  }

  function handleOpenPopup(popup) {
    setPopup(popup);
  }
  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          handleUpdateUser,
          handleUpdateAvatar,
          handleAddPlace,
        }}
      >
        {popup && (
          <Popup title={popup.title} onClose={handleClosePopup}>
            {popup.children}
          </Popup>
        )}
        <Routes>
          <Route
            path="*"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <div className="page__content-auth">
                  <p className="page__content-auth-email">{token.getEmail()}</p>
                  <NavLink
                    to="/signin"
                    onClick={handleLogout}
                    className="page__navlink-sign page__navlink-signout"
                  >
                    Sair
                  </NavLink>
                  <Header />
                  <Main
                    popup={popup}
                    cards={cards}
                    handleCardLike={handleCardLike}
                    handleCardDelete={handleCardDelete}
                    handleOpenPopup={handleOpenPopup}
                    handleClosePopup={handleClosePopup}
                  />
                  <Footer />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
                <Login
                  handleLogin={handleLogin}
                  handleOpenPopup={handleOpenPopup}
                  handleClosePopup={handleClosePopup}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
                <Register
                  popup={popup}
                  handleRegistration={handleRegistration}
                  infoState={infoState}
                  handleOpenPopup={handleOpenPopup}
                  handleClosePopup={handleClosePopup}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
