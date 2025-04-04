import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/_login.scss";

function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);
  const navigate = useNavigate();

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!googleClientId) {
      console.error("Google Client ID is not defined. Check your .env file.");
      return;
    }
    console.log("Google Client ID:", googleClientId);

    const initializeGoogleSignIn = () => {
      console.log("Google Sign-In initialization started.");
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleGoogleSignIn,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        {
          theme: "outline",
          size: "large",
        }
      );
      console.log("Google Sign-In button rendered.");
    };

    const handleGoogleScriptLoad = () => {
      console.log("Google Sign-In script loaded successfully.");
      setGoogleScriptLoaded(true);
      initializeGoogleSignIn();
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = handleGoogleScriptLoad;
      document.body.appendChild(script);
    } else {
      handleGoogleScriptLoad();
    }

    return () => {
      console.log("Cleaning up Google Sign-In script...");
      // Clean up if necessary (e.g., remove event listeners)
    };
  }, [googleClientId]);

  const handleGoogleSignIn = async (response) => {
    console.log("Google Sign-In Response:", response);

    console.log("Sending token to backend:", response.credential);
    try {
      const res = await fetch(`${backendUrl}/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.credential }),
      });

      console.log("Réponse brute du backend :", res);
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Erreur reçue du backend :", errorData);
        throw new Error(errorData.error || `Erreur HTTP : ${res.status}`);
      }
      const data = await res.json();
      console.log("Données reçues du backend :", data);
      if (data.success) {
        console.log("Connexion réussie avec Google :", data.user);
        onLogin(data.user);
        navigate("/");
      } else {
        console.error("Erreur lors de la connexion Google :", data.error);
        setModalType("error");
        setModalMessage(data.error || "Une erreur est survenue.");
      }
    } catch (err) {
      console.error("Erreur lors de la connexion Google :", err.message || err);
      setModalType("error");
      setModalMessage(
        err.message || "Une erreur est survenue. Veuillez réessayer."
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage({});

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
          username: "Le nom d'utilisateur est requis.",
        });
        return;
      }

      if (password !== confirmPassword) {
        setErrorMessage({
          password: "Les mots de passe ne correspondent pas.",
        });
        return;
      }
    }

    const endpoint = isLogin ? `${backendUrl}/login` : `${backendUrl}/register`;
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
          onLogin(data || {});
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

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage({});
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className='animated-gradient-background'>
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
                {errorMessage.username && (
                  <small className='error-text'>{errorMessage.username}</small>
                )}
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
          <div id='google-signin-button'></div>
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
