import "./Gallery.css";
import React, { useContext, useState } from "react";
import axios from "axios";
import { MyContext } from "../context/loginregister.js";

const Cards = (props) => {
  const { role } = useContext(MyContext);
  const { id, image, naziv, adminButtons, onDeleteSuccess } = props;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showHotelInfo, setShowHotelInfo] = useState(false);
  const [hotelInfo, setHotelInfo] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);


  const handleHotelDelete = async () => {
    try {
      console.log("Brisanje hotela sa ID:", localStorage.getItem("userId"));
      const response = await axios.delete(`http://aplikacijahost-001-site1.ltempurl.com/api/Hotel/${id}`, {
        params: { userId: localStorage.getItem("userId") }
      });

      console.log("Odgovor servera:", response);

      if (onDeleteSuccess) {
        onDeleteSuccess(id);
      }

      setShowDeleteModal(false);
      setShowSuccessMessage(true);
    } catch (error) {
      // ...
    }
  };

  const handleUpdateClick = async () => {
    try {
      const response = await axios.get(`https://localhost:7137/api/Hotel/${id}`);
      const hotelInfo = response.data;
  
      setHotelInfo({
        naziv: hotelInfo.naziv,
        zemlja: hotelInfo.zemlja,
        telefon: hotelInfo.telefon,
        aerodromi: hotelInfo.aerodromi,
        prijava: hotelInfo.prijava,
        odjava: hotelInfo.odjava,
        politika: hotelInfo.politika,
        parking: hotelInfo.parking,
        pogodnosti: hotelInfo.pogodnosti,
      });
  
      setShowHotelInfo(true);
    } catch (error) {
      console.error("Error fetching hotel information:", error);
    }
  };

  const handleHotelInfoChange = (e) => {
    setHotelInfo({ ...hotelInfo, [e.target.name]: e.target.value });
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    handleHotelDelete();
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleSuccessMessageClose = () => {
    setShowSuccessMessage(false);
  };

  const handleHotelInfoClose = () => {
    setShowHotelInfo(false);
  };

  const handleSaveChanges = async (event) => {
    try {
        event.preventDefault();
        console.log("HotelInfo before update:", hotelInfo);

        const userId = localStorage.getItem("userId");

        const response = await fetch(`https://localhost:7137/api/Hotel/${id}?userId=${userId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                naziv: hotelInfo.naziv,
                zemlja: hotelInfo.zemlja || "",
                telefon: hotelInfo.telefon || "",
                aerodromi: hotelInfo.aerodromi || "",
                prijava: hotelInfo.prijava || "",
                odjava: hotelInfo.odjava || "",
                politika: hotelInfo.politika || "",
            }),
        });

        console.log("Response status:", response.status);

        if (response.ok) {
            setUpdateSuccess(true);
            console.log("Hotel updated successfully!");
        } else {
            const errorText = await response.text();
            console.error("Error updating hotel:", errorText);
        }
    } catch (error) {
        console.error("Error updating hotel:", error.message);
    }
};




  
  
  
  
  
  

  return (
    <div className="items">
      <div className="img">
        <img src={image} alt={naziv} />
        <i className="fas fa-image"></i>
      </div>
      <div className="title">
        <h3>{naziv}</h3>
      </div>
      {adminButtons && role === "Administrator" && (
        <div className="admin-buttons">
          <button onClick={handleUpdateClick}>Ažuriraj</button>
          <button onClick={handleDeleteClick}>Obriši</button>
        </div>
      )}

      {showDeleteModal && (
        <div className="delete-modal">
          <p>Da li zaista želite da obrišete ovaj hotel?</p>
          <button onClick={handleConfirmDelete}>Potvrdi</button>
          <button onClick={handleCancelDelete}>Otkaži</button>
        </div>
      )}

      {showSuccessMessage && (
        <div className="delete-modal">
          <p>Hotel uspešno obrisan.</p>
          <button onClick={handleSuccessMessageClose}>Zatvori</button>
        </div>
      )}

{showHotelInfo && (
        <div className="hotel-info-modal">
          <form>
          <h3>Informacije o hotelu:</h3>
          <label>Naziv:</label>
          <input
            type="text"
            name="naziv"
            value={hotelInfo.naziv}
            onChange={handleHotelInfoChange}
          />

          <label>Zemlja:</label>
          <input
            type="text"
            name="zemlja"
            value={hotelInfo.zemlja || ""}
            onChange={handleHotelInfoChange}
          />

          <label>Telefon:</label>
          <input
            type="text"
            name="telefon"
            value={hotelInfo.telefon || ""}
            onChange={handleHotelInfoChange}
          />

          <label>Aerodromi:</label>
          <input
            type="text"
            name="aerodromi"
            value={hotelInfo.aerodromi || ""}
            onChange={handleHotelInfoChange}
          />

          <label>Prijava:</label>
          <input
            type="text"
            name="prijava"
            value={hotelInfo.prijava || ""}
            onChange={handleHotelInfoChange}
          />

          <label>Odjava:</label>
          <input
            type="text"
            name="odjava"
            value={hotelInfo.odjava || ""}
            onChange={handleHotelInfoChange}
          />

          <label>Politika:</label>
          <input
            type="text"
            name="politika"
            value={hotelInfo.politika || ""}
            onChange={handleHotelInfoChange}
          />

          <button onClick={handleSaveChanges}>Sačuvaj promene</button>
          <button onClick={handleHotelInfoClose}>Zatvori</button>
          </form>
          {updateSuccess && <p className="update-success-message">Informacije o hotelu uspešno ažurirane!</p>}
      </div>
    )}
  </div>
  );
};

export default Cards;
