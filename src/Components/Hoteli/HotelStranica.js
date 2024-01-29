import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MyContext } from "../context/loginregister.js";
import "./Hoteli.css";

const HotelStranica = () => {
  const { selectedHotel, user, token } = useContext(MyContext);
  const [hotelInfo, setHotelInfo] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [showNoHotelMessage, setShowNoHotelMessage] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);
  const [recenzije, setRecenzije] = useState([]);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [reservationResponse, setReservationResponse] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [ukupanTrosakRezervacije, setUkupanTrosakRezervacije] = useState(null);
  const [errorMessages, setErrorMessages] = useState({ validDates: true, validRoomSelection: true });

  const RecenzijaKartica = ({ recenzija }) => (
    <div className="recenzija-kartica">
      <p><b><i>Ime:</i></b> {recenzija.korisnikIme}</p>
      <p><b><i>Ocena:</i></b> {recenzija.ocena}</p>
      <p><b><i>Komentar: </i></b>{recenzija.komentar}</p>
      <p><b><i>Datum recenzije: </i></b>{recenzija.datumRecenzije}</p>
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      if (selectedHotel) {
        setHotelInfo(selectedHotel);
        setShowNoHotelMessage(false);
        fetchRecenzije(selectedHotel.id);
        fetchAvailableRooms(selectedHotel.id);
      } else {
        console.error("Nije selektovan hotel.");
        setShowNoHotelMessage(true);
      }
    };

    fetchData();
  }, [selectedHotel]);

  useEffect(() => {
    console.log("User:", user);
    console.log("Token:", token);

    if (user) {
      setShowNoHotelMessage(false);
    }
  }, [user, token]);

  const fetchAvailableRooms = async (hotelId) => {
    try {
      const response = await axios.get(
        `http://aplikacijahost-001-site1.ltempurl.com/api/Reservations/FetchAvailableRooms/${hotelId}`
      );
      setAvailableRooms(response.data);
    } catch (error) {
      console.error("Greška pri dohvatanju dostupnih soba", error);
    }
  };

  const fetchRecenzije = async (hotelId) => {
    try {
      const response = await axios.get(
        `http://aplikacijahost-001-site1.ltempurl.com/api/hotel/${hotelId}/recenzije`
      );
      setRecenzije(response.data);
    } catch (error) {
      console.error("Greška pri dohvatanju recenzija", error);
    }
  };

  const handleRatingChange = (newRating) => setRating(newRating);

  const handleReviewChange = (event) => setReview(event.target.value);

  const submitReview = async () => {
    if (!user) {
      setServerResponse("Morate da se prijavite ili registrujete da biste ostavili recenziju!");
      setRating(0);
      setReview("");
      return;
    }

    try {
      const response = await axios.post(
        "http://aplikacijahost-001-site1.ltempurl.com/api/hotel/recenzija",
        {
          HotelId: selectedHotel.id,
          KorisnikId: user.id,
          Ocena: parseInt(rating),
          Komentar: review,
          DatumRecenzije: new Date().toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Odgovor sa servera:", response.data);
      setServerResponse(response.data);

      setRating(0);
      setReview("");
    } catch (error) {
      console.error("Greška pri slanju recenzije", error);
      console.log("Detalji o grešci:", error.response ? error.response.data : error.message);
    }
  };

  const handleReservationClick = () => {
    // Provera da li je korisnik prijavljen
    if (!user) {
      setServerResponse("Morate biti prijavljeni da biste napravili rezervaciju.");
      return;
    }

    setShowReservationForm(true);
  };

  const handleReservationClose = () => setShowReservationForm(false);


    const handleMakeReservation = async () => {
      setErrorMessages({ validDates: true, validRoomSelection: true }); 
    
      const formattedDatumPrijave = new Date(arrivalDate).toISOString();
      const formattedDatumOdjave = new Date(departureDate).toISOString();
    
      if (!arrivalDate || !departureDate || new Date(departureDate) <= new Date(arrivalDate)) {
        console.error("Molimo unesite validne datume dolaska i odlaska.");
        setErrorMessages((prevState) => ({ ...prevState, validDates: false }));
        return;
      }
    
      if (!selectedRoomId) {
        console.error("Molimo odaberite sobu za rezervaciju.");
        setErrorMessages((prevState) => ({ ...prevState, validRoomSelection: false }));
        return;
      }
    
      const requestData = {
        SobaId: selectedRoomId,
        DatumPrijave: formattedDatumPrijave,
        DatumOdjave: formattedDatumOdjave,
        KorisnikId: user.id,
        HotelId: selectedHotel.id,
      };

    try {
      // Postavljanje requestData objekta pre slanja zahteva
      const response = await axios.post("http://aplikacijahost-001-site1.ltempurl.com/api/Reservations/create", requestData);

      // Dobavljanje ukupnog troška rezervacije
      const reservationId = response.data.id;
      const ukupanTrosakRezervacije = await axios.get(`http://aplikacijahost-001-site1.ltempurl.com/api/Reservations/CalculateTotalPrice/${reservationId}`);
      setUkupanTrosakRezervacije(ukupanTrosakRezervacije.data);

      // Postavljanje odgovora o rezervaciji
      setReservationResponse(response.data);

      // Slanje potvrde putem email-a
      setShowEmailModal(true);

    } catch (error) {
      console.error("Greška prilikom kreiranja rezervacije:", error.response ? error.response.data : error.message);
    }
  };


  const handleEmailSubmit = async () => {
    try {

      const emailResponse = await axios.post(
        "http://aplikacijahost-001-site1.ltempurl.com/api/Email/send-reservation-confirmation-email",
        {
          Email: user.email,
          HotelName: selectedHotel.naziv,  
          CheckInDate: arrivalDate,         
          CheckOutDate: departureDate, 
          totalPrice: ukupanTrosakRezervacije
        }
      );

      if (emailResponse.status === 200) {
        console.log("E-pošta uspešno poslata");
        setShowEmailModal(false); // Zatvori modal za unos email-a
        setShowReservationForm(false); // Zatvori modal za rezervaciju

        // Dodajte poruku o uspešnoj potvrdi rezervacije
        setServerResponse("Uspešno ste potvrdili rezervaciju!");

      } else {
        console.error("Greška prilikom slanja e-pošte");
        // Dodajte poruku o grešci prilikom slanja e-pošte
        setServerResponse("Došlo je do greške prilikom slanja e-pošte.");
      }
    } catch (error) {
      console.error("Greška prilikom slanja e-pošte:", error.response ? error.response.data : error.message);
      // Dodajte poruku o opštoj grešci
      setServerResponse("Došlo je do greške prilikom obrade vaše rezervacije.");
    }
  };

  const handleEmailModalClose = () => setShowEmailModal(false);

  return (
    <div className="kartica">
      <div className="card">
        <div className="info">
          {showNoHotelMessage ? (
            <p>Niste odabrali hotel.</p>
          ) : (
            <>
              {hotelInfo && (
                <>
                  <img src={hotelInfo.image} alt={hotelInfo.naziv} />
                  <div className="text-info">
                    <h3><i>{hotelInfo.naziv}</i></h3>
                    <p><b>🌍 Zemlja:</b>{hotelInfo.zemlja}</p>
                    <p><b>💰 Cena: </b>Zavisi od tipa sobe kojom hotel raspolaže trenutno.</p>
                    <p><b>☎️ Telefon: </b>{hotelInfo.telefon}</p>
                    <p><b>🛫 Aerodromi:</b> {hotelInfo.aerodromi}</p>
                    <p><b>🕒 Prijava:</b> {hotelInfo.prijava} </p>
                    <p><b>🕛 Odjava:</b>{hotelInfo.odjava}</p>
                    <p><b>🐾 Politika za kućne ljubimce:</b> {hotelInfo.politika}</p>
                    <p><b>🅿️ Parking:</b> {hotelInfo.parking} </p>
                    <p><b>🌐 Pogodnosti:</b>{hotelInfo.pogodnosti}</p>
                    <div className="rating">
                      <b><p>Ocena:</p></b>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <span
                          key={value}
                          onClick={() => handleRatingChange(value)}
                          className={value <= rating ? "active" : ""}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>
                    <textarea
                      placeholder="Napišite recenziju..."
                      value={review}
                      onChange={handleReviewChange}
                    />
                    <button onClick={submitReview}>Pošalji recenziju</button>
                    <button onClick={handleReservationClick}>Rezerviši</button>
                    {serverResponse && (
                      <div className="server-response">
                        <p>{serverResponse}</p>
                      </div>
                    )}
                         
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      {recenzije.length > 0 && (
        <div className="recenzije-lista">
          <h4>Recenzije korisnika:</h4>
          <div className="recenzije-kartice">
            {recenzije.map((recenzija) => (
              <RecenzijaKartica key={recenzija.id} recenzija={recenzija} />
            ))}
          </div>
        </div>
      )}
      {showReservationForm && (
        <section className="slide-form1" style={{ zIndex: 1040}}>
          <div className="container">
            <h2>Isplaniraj svoj odmor</h2>
            <form>
              <div className="flex_space">
                <input
                  type="date"
                  placeholder="Dolazak"
                  value={arrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
                />
                <input
                  type="date"
                  placeholder="Odlazak"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                />
              </div>
              <select value={selectedRoomId} onChange={(e) => setSelectedRoomId(e.target.value)}>
                <option key="default" value="">
                  Izaberite sobu
                </option>
                {availableRooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.tipSobe}-{room.cenaPoNoci}$
                  </option>
                ))}
              </select>
              {(!errorMessages.validDates || !errorMessages.validRoomSelection) && (
              <div className="error-message">
                {!errorMessages.validDates && <p>Molimo unesite validne datume dolaska i odlaska.</p>}
                {!errorMessages.validRoomSelection && <p>Molimo odaberite sobu za rezervaciju.</p>}
              </div>
            )}
            </form>
            <button onClick={handleReservationClose}>Zatvori</button>
            <button onClick={handleMakeReservation}>Napravi rezervaciju</button>
          </div>
        </section>
      )}
      {showEmailModal && (
        <section className="slide-form2" style={{ zIndex: 1050 }}>
          <div className="container">
            <form>
              {!user ? (
                <p>Završni korak rezervacije</p>
              ) : (
                <p>Potvrda rezervacije će biti poslata na vaš email:</p>
              )}
              <input
                type="email"
                placeholder="Unesite svoj email"
                value={user ? user.email : userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                disabled={user ? true : false}
              />
            </form>
            {ukupanTrosakRezervacije && (
              <p><b>Ukupan trošak rezervacije:</b> {ukupanTrosakRezervacije}$</p>
            )}
            <button variant="secondary" onClick={handleEmailModalClose}>
              Zatvori
            </button>
            <button variant="primary" onClick={handleEmailSubmit}>
              Potvrdi
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default HotelStranica;
