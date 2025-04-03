import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/_login.scss";
import Header from "./components/Header";

function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState({ email: "", password: "" });
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  console.log("Google Client ID:", googleClientId);

  if (!googleClientId) {
    console.error("Google Client ID is not defined. Check your .env file.");
  }

  useEffect(() => {
    // Charger dynamiquement le script Google Sign-In
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log("Google Sign-In script loaded.");
    };
    document.body.appendChild(script);

    // Définir la fonction de rappel dans le contexte global
    window.handleGoogleSignIn = (response) => {
      console.log("Google Sign-In Response:", response);
      const backendUrl = import.meta.env.VITE_BACKEND_URL; // Assurez-vous que cette variable est définie
      console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);
      if (!backendUrl) {
        console.error("VITE_BACKEND_URL n'est pas défini dans le fichier .env");
        return;
      }

      fetch(`${backendUrl}/google-login`, {
        // Utilisez la variable correctement
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.credential }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Erreur lors de la connexion Google.");
          }
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            onLogin(data.user);
            navigate("/");
          } else {
            setModalType("error");
            setModalMessage(data.error);
          }
        })
        .catch((err) => {
          console.error("Erreur lors de la connexion Google :", err);
          setModalType("error");
          setModalMessage("Une erreur est survenue. Veuillez réessayer.");
        });
    };

    return () => {
      // Nettoyer le script si nécessaire
      const existingScript = document.querySelector(
        'script[src="https://accounts.google.com/gsi/client"]'
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [onLogin, navigate]);

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
      email,
      password,
    };

    if (!isLogin) {
      payload.username = event.target.username.value;
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
          setModalMessage(data.message);
          setTimeout(() => {
            setIsLogin(true);
            setModalMessage("");
          }, 2000);
        }
      } else {
        const errorData = await response.json();
        setModalType("error");
        setModalMessage(errorData.error);
      }
    } catch (err) {
      setModalType("error");
      setModalMessage("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const handleGoogleSignIn = (response) => {
    console.log("Google Sign-In Response:", response);
    fetch("/google-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: response.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          onLogin(data.user);
          navigate("/");
        } else {
          setModalType("error");
          setModalMessage(data.error);
        }
      })
      .catch((err) => {
        console.error("Erreur lors de la connexion Google :", err);
        setModalType("error");
        setModalMessage("Une erreur est survenue. Veuillez réessayer.");
      });
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage({ email: "", password: "" });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className='animated-gradient-background'>
      <Header isLoggedIn={false} onLogout={() => {}} />
      <main className='login-page animated-gradient-background'>
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
                  placeholder='TonyStark'
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
              <div className='password-container'>
                <input
                  type={showPassword ? "text" : "password"}
                  id='password'
                  name='password'
                  placeholder='JeSuisIronM@n'
                  required
                />
                <button
                  type='button'
                  className='toggle-password-btn'
                  onClick={togglePasswordVisibility}
                  aria-label={
                    showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }>
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errorMessage.password && (
                <small className='error-text'>{errorMessage.password}</small>
              )}
            </div>
            {!isLogin && (
              <div className='form-group'>
                <label htmlFor='confirmPassword'>
                  Confirmer le mot de passe <span className='required'>*</span>
                </label>
                <div className='password-container'>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id='confirmPassword'
                    name='confirmPassword'
                    placeholder='JeSuisIronM@n'
                    required
                  />
                  <button
                    type='button'
                    className='toggle-password-btn'
                    onClick={toggleConfirmPasswordVisibility}
                    aria-label={
                      showConfirmPassword
                        ? "Masquer le mot de passe"
                        : "Afficher le mot de passe"
                    }>
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                </div>
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
          <p className='or-text'>ou</p>
          <div
            id='g_id_onload'
            data-client_id={googleClientId}
            data-callback='handleGoogleSignIn'
            data-auto_prompt='false'></div>
          <div
            className='g_id_signin'
            data-type='standard'
            data-shape='rectangular'
            data-theme='outline'
            data-text='signin_with'
            data-size='large'
            data-logo_alignment='left'></div>
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
