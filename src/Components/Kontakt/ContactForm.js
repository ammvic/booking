import React, { useState } from "react";
import "./Contact.css";

const ContactFrom = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [serverMessage, setServerMessage] = useState(""); // Dodajte stanje za poruku sa servera

  const [allValue, setAllValue] = useState([]);

  const formSubmit = async (e) => {
    e.preventDefault();

    const contactForm = { firstName: fname, lastName: lname, phone, email, message };

    try {
      const response = await fetch("http://aplikacijahost-001-site1.ltempurl.com/api/Email/send-contact-form-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      const data = await response.json();

      console.log(data); // Logujte odgovor servera (za debagovanje)

      setServerMessage(data.message); // Postavite poruku sa servera
      // Nastavite sa vašom logikom (resetujte formu, itd.)
      setAllValue([...allValue, contactForm]);
      setFname("");
      setLname("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Greška prilikom slanja e-maila:", error);
      // Postavite rukovanje greškom (prikazivanje poruke o grešci, logovanje, itd.)
    }
  };

  return (
    <>
      <section className='contact mtop'>
        <div className='container flex'>
          <div className='main-content'>
            <h2>Kontakt</h2>
            <p>Popunite sledeći obrazac</p>

            <form onSubmit={formSubmit}>
              <div className='grid1'>
                <div className='input'>
                  <span>
                    Ime <label>*</label>
                  </span>
                  <input type='text' name='fname' value={fname} onChange={(e) => setFname(e.target.value)} required />
                </div>
                <div className='input'>
                  <span>
                    Prezime <label>*</label>
                  </span>
                  <input type='text' name='lname' value={lname} onChange={(e) => setLname(e.target.value)} required />
                </div>
                <div className='input'>
                  <span>
                    Broj telefona <label>*</label>
                  </span>
                  <input type='number' name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className='input'>
                  <span>
                    Email <label>*</label>
                  </span>
                  <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
              </div>
  
              <div className='input inputlast'>
                <span>
                  Napišite poruku <label>*</label>
                </span>
                <textarea cols='30' rows='10' name='message' value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
              </div>
              <button className='primary-btn'>Kontaktiraj nas sada</button>
            </form>
            {serverMessage && (
        <div className='server-message'>
          <p>{serverMessage}</p>
        </div>
      )}
          </div>

          <div className='side-content'>

            <h3>Kontaktirajte nas</h3>
            <span>roomrover11@gmail.com</span>
            <br />
            <span>+01 123 456 789</span>
            <br />

            <div className='icon'>
              <h3>Zapratite nas</h3>

          <div className='flex_space'>
        <a href='link_ka_facebook_profilu' target='_blank' rel='noopener noreferrer'>
          <i className='fab fa-facebook-f'></i>
        </a>
        <a href='link_ka_twitter_profilu' target='_blank' rel='noopener noreferrer'>
          <i className='fab fa-twitter'></i>
        </a>
        <a href='link_ka_linkedin_profilu' target='_blank' rel='noopener noreferrer'>
          <i className='fab fa-linkedin'></i>
        </a>
        <a href='link_ka_instagram_profilu' target='_blank' rel='noopener noreferrer'>
          <i className='fab fa-instagram'></i>
        </a>
        <a href='link_ka_pinterest_profilu' target='_blank' rel='noopener noreferrer'>
          <i className='fab fa-pinterest'></i>
        </a>
        <a href='link_ka_youtube_kanalu' target='_blank' rel='noopener noreferrer'>
          <i className='fab fa-youtube'></i>
        </a>
      </div>
            </div>
          </div>
        </div>
      </section>

      <section className='show-data'>
      {allValue.map((cureentValue, index) => { 
    const { firstName, lastName, phone, email, message } = cureentValue;
    return (
      <div key={index} className='sign-box'>
        <h1>Uspešno poslato</h1>
        <h3>
          Ime : <p>{firstName}</p>
        </h3>
        <h3>
          Prezime : <p>{lastName}</p>
        </h3>
        <h3>
          Broj telefona : <p>{phone}</p>
        </h3>
        <h3>
          Email : <p>{email}</p>
        </h3>
        <h3>
          Tvoja poruka : <p>{message}</p>
        </h3>
      </div>
    );
  })}
</section>
    </>
  )
}

export default ContactFrom
