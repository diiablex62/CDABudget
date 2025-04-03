import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/_login.scss";
import Header from "./components/Header";

function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState({ email: "", password: "" });
  const [modalMessage, setModalMessage] = useState(""); // Nouveau state pour le message de modal
  const [modalType, setModalType] = useState(""); // Type de modal (success ou error)
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage({ email: "", password: "" });

    const email = event.target.email.value.trim();
    const password = event.target.password.value.trim();

    if (!email || !password) {
      setErrorMessage({
        email: !email ? "L'email est requis." : "",
        password: !password ? "Le mot de passe est requis." : "",
      });
      return;
    }

    if (!isLogin) {
      const username = event.target.username.value.trim();
      const confirmPassword = event.target.confirmPassword.value.trim();

      if (!username) {
        setErrorMessage({
          email: "",
          password: "",
          username: "Le nom d'utilisateur est requis.",
        });
        return;
      }

      if (password !== confirmPassword) {
        setErrorMessage({
          email: "",
          password: "Les mots de passe ne correspondent pas.",
        });
        return;
      }
    }

    const endpoint = isLogin ? "/login" : "/register";
    const payload = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    if (!isLogin) {
      payload.username = event.target.username.value;
      const confirmPassword = event.target.confirmPassword.value;

      if (payload.password !== confirmPassword) {
        setErrorMessage({
          ...errorMessage,
          password: "Les mots de passe ne correspondent pas.",
        });
        return;
      }
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        if (isLogin) {
          onLogin(data);
          navigate("/");
        } else {
          setModalType("success");
          setModalMessage(data.message); // Affiche le message de succès
          setTimeout(() => {
            setIsLogin(true); // Redirige vers le formulaire de connexion après un délai
            setModalMessage(""); // Réinitialise le message
          }, 2000);
        }
      } else {
        const errorData = await response.json();
        setModalType("error");
        setModalMessage(errorData.error); // Affiche le message d'erreur
      }
    } catch (err) {
      setModalType("error");
      setModalMessage("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage({ email: "", password: "" });
  };

  return (
    <div className='animated-gradient-background'>
      <Header isLoggedIn={false} onLogout={() => {}} />
      <main className='login-page animated-gradient-background'>
        {/* Modal pour afficher les messages */}
        {modalMessage && (
          <div className={`modal ${modalType}`}>
            <p>{modalMessage}</p>
          </div>
        )}

        <div className='form-container'>
          <h2 className='form-title'>
            {isLogin ? "Connexion" : "Inscription"}
          </h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className='form-group'>
                <label htmlFor='username'>
                  Nom d'utilisateur <span className='required'>*</span>
                </label>
                <input
                  type='text'
                  id='username'
                  name='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='TonyStark' // Ajout du placeholder
                  required
                />
              </div>
            )}
            <div className='form-group'>
              <label htmlFor='email'>
                Email <span className='required'>*</span>
              </label>
              <input
                type='email'
                id='email'
                name='email'
                placeholder='tony@stark.fr'
                required
              />
              {errorMessage.email && (
                <small className='error-text'>{errorMessage.email}</small>
              )}
            </div>
            <div className='form-group'>
              <label htmlFor='password'>
                Mot de passe <span className='required'>*</span>
              </label>
              <input
                type='password'
                id='password'
                name='password'
                placeholder='JeSuisIronM@n'
                required
              />
              {errorMessage.password && (
                <small className='error-text'>{errorMessage.password}</small>
              )}
            </div>
            {!isLogin && (
              <div className='form-group'>
                <label htmlFor='confirmPassword'>
                  Confirmer le mot de passe <span className='required'>*</span>
                </label>
                <input
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'
                  placeholder='JeSuisIronM@n' // Ajout du placeholder
                  required
                />
              </div>
            )}
            <button type='submit'>
              {isLogin ? "Se connecter" : "S'inscrire"}
            </button>
          </form>
          <p className='toggle-text'>
            {isLogin
              ? "Vous n'avez pas de compte ?"
              : "Vous avez déjà un compte ?"}
            <button className='toggle-btn' onClick={toggleForm}>
              {isLogin ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </div>

        <div className='back-button-container'>
          <a href='/' className='back-btn'>
            <span className='arrow-icon'>←</span> Retour
          </a>
        </div>
      </main>
    </div>
  );
}

export default Login;
