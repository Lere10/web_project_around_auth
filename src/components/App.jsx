import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";

import * as auth from "../utils/auth.js";
import * as token from "../utils/token.js";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState({ username: "", email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
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

  const handleLogin = ({ username, password }) => {
    if (!username || !password) {
      return;
    }
    auth
      .authorize(username, password)
      .then((data) => {
        if (data.jwt) {
          token.setToken(data.jwt);
          setCurrentUser(data.user);
          setIsLoggedIn(true);
          const redirectPath = location.state?.from || "/";
          navigate(redirectPath);
        }
      })
      .catch(console.error);
  };

  const handleRegistration = ({ email, password }) => {
    auth
      .register(email, password)
      .then(() => {
        console.log("oi");
        navigate("/signin", { replace: true });
      })
      .catch(console.error);
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
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <CurrentUserContext.Provider
              value={{
                currentUser,
                handleUpdateUser,
                handleUpdateAvatar,
                handleAddPlace,
              }}
            >
              <div className="page__content">
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
            </CurrentUserContext.Provider>
          </ProtectedRoute>
        }
      />
      <Route
        path="/signin"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
            <Login handleLogin={handleLogin} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
            <Register handleRegistration={handleRegistration} />
          </ProtectedRoute>
        }
      />
    </Routes>

    //------------------------------
  );
}

export default App;
