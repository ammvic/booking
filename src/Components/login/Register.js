import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import HeadTitle from "../../Common/HeadTitle/HeadTitle";
import axios from "axios";
import "./design.css";

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const resetForm = () => {
    setName("");
    setLastName("");
    setAddress("");
    setEmail("");
    setUserName("");
    setPassword("");
  };

  const handleRegistration = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://aplikacijahost-001-site1.ltempurl.com/api/KorisnikKontroler/register",
        {
          ime: name,
          prezime: lastName,
          adresa: address,
          email,
          korisnickoIme: userName,
          lozinka: password,
        }
      );

      setSuccessMessage("Uspešno kreiran nalog!");
      resetForm();

      const emailResponse = await axios.post(
        "http://aplikacijahost-001-site1.ltempurl.com/api/Email/send-registration-success-email",
        {
          userEmail: email,
        }
      );

      if (emailResponse.status === 200) {
        console.log("E-pošta uspešno poslata");
      } else {
        console.error("Greška prilikom slanja e-pošte");
      }

      navigate('/Prijava');
    } catch (error) {
      console.error("Greška prilikom registracije", error);
      console.log("Odgovor servera:", error.response?.data);
      setError(error.response?.data.message || "Greška prilikom kreiranja naloga");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    handleRegistration();
  };
  return (
    <>
      <HeadTitle />
      <section className="forms top">
        <div className="container">
          <div className="sign-box">
            <p>
              Nemate nalog? Kreirajte svoj nalog, traje manje od jednog minuta.
            </p>
            <form action="" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ime"
                required
              />
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Prezime"
                required
              />
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Adresa"
                required
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                type="text"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Korisničko ime"
                required
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Lozinka"
                required
              />

                <button type="submit" className="primary-btn" disabled={loading}>
                {loading ? "Kreiranje..." : "Kreiraj nalog"}
              </button>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            </form>
          </div>
        </div>
      </section>

    </>
  );
};

export default Register;
