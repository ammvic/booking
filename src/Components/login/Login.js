import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import HeadTitle from "../../Common/HeadTitle/HeadTitle";
import { MyContext } from "../context/loginregister.js";

const Login = () => {
  const { setUserFunction, setLoggedIn, setToken, setUserId } = useContext(MyContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [serverResponse, setServerResponse] = useState(null);

  useEffect(() => {
    const rememberedUsername = localStorage.getItem("rememberedUsername");

    if (rememberedUsername) {
      setUserName(rememberedUsername);
      setRememberMe(true);
    }
  }, []);

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);

    if (!rememberMe) {
      localStorage.setItem("rememberedUsername", userName);
    } else {
      localStorage.removeItem("rememberedUsername");
    }
  };

  const loginUserHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(
        "http://aplikacijahost-001-site1.ltempurl.com/api/KorisnikKontroler/login",
        {
          korisnickoIme: userName,
          lozinka: password,
        }
      );

      const responseData = response.data;

      if (responseData.korisnik && responseData.token) {
        const { korisnik, token } = responseData;

        setToken(token);
        setUserFunction(korisnik);
        setUserId(korisnik.id); // Postavljamo ID korisnika
        setLoggedIn(true);

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(korisnik));
        localStorage.setItem("role", korisnik.uloga);
        localStorage.setItem("userId", korisnik.id);

        console.log("Navigacija na početnu stranicu");
        navigate('/');
      } else {
        setServerResponse("Neispravni podaci pri prijavljivanju.");
      }
    } catch (e) {
      console.error("Greška pri prijavljivanju", e);
      setServerResponse("Pogrešno korisničko ime ili lozinka");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeadTitle />
      <section className="forms top">
        <div className="container">
          <div className="sign-box">
            <p>
              Unesi svoje korisničko ime i lozinku i iskoristi pogodnosti za rezervacije kao prijavljeni korisnik
            </p>
            <form onSubmit={loginUserHandler}>
              <input
                type="text"
                name="korisnickoime"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Korisničko ime"
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Lozinka"
              />

              <div className="flex_space">
                <div className="flex">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                  <label>Zapamti me</label>
                </div>
              </div>

              <button type="submit" className="primary-btn">
                Prijavi se
              </button>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {serverResponse && <p style={{ color: "green" }}>{serverResponse}</p>}
              <p>
                Nemaš nalog? <Link to="/Registracija">Registruj se!</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
