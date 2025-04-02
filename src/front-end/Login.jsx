import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/_login.scss";
import Header from "./components/Header";

function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const endpoint = isLogin ? "/login" : "/register";
    const payload = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    if (!isLogin) {
      payload.username = event.target.username?.value;
      const confirmPassword = event.target.confirmPassword.value;

      // Vérifiez si les mots de passe correspondent
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

      console.log("Response status:", response.status); // Ajoutez ceci pour voir le statut de la réponse

      if (response.ok) {
        if (isLogin) {
          onLogin();
          navigate("/");
        } else {
          alert("Inscription réussie. Vous pouvez maintenant vous connecter.");
          setIsLogin(true);
        }
      } else {
        const errorMessage = await response.text();
        console.log("Error message from backend:", errorMessage); // Ajoutez ceci pour voir le message d'erreur du backend
        if (isLogin) {
          const emailError = errorMessage.includes("Email")
            ? "Cet email n'existe pas."
            : "";
          const passwordError =
            !emailError && errorMessage.includes("mot de passe")
              ? "Mot de passe incorrect."
              : "";

          setErrorMessage({
            email: emailError,
            password: passwordError,
          });
        } else {
          alert(`Erreur : ${errorMessage}`);
        }
      }
    } catch (err) {
      console.error("Erreur lors de la requête :", err);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage({ email: "", password: "" }); // Réinitialiser les messages d'erreur
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
                <label htmlFor='username'>
                  Nom d'utilisateur <span className='required'>*</span>
                </label>
                <input type='text' id='username' name='username' required />
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
