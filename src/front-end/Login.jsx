import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/_login.scss";
import Header from "./components/Header";

function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isLogin) {
      onLogin();
      navigate("/");
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className='animated-gradient-background'>
      <Header isLoggedIn={false} onLogout={() => {}} />
      <main className='login-page animated-gradient-background'>
        <div className='form-container'>
          <h2 className='form-title'>
            {isLogin ? "Connexion" : "Inscription"}
          </h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className='form-group'>
                <label htmlFor='username'>Nom d'utilisateur</label>
                <input type='text' id='username' name='username' required />
              </div>
            )}
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input type='email' id='email' name='email' required />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Mot de passe</label>
              <input type='password' id='password' name='password' required />
            </div>
            {!isLogin && (
              <div className='form-group'>
                <label htmlFor='confirmPassword'>
                  Confirmer le mot de passe
                </label>
                <input
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'
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
