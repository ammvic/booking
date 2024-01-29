import React, { useState, useContext } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/loginregister";
import HotelData from "../Hoteli/GalleryData";

const Home = ({ slides }) => {
  const navigate = useNavigate();
  const length = slides.length;
  const [current, setCurrent] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    cityName: "",
    startDate: "",
    endDate: "",
    roomType: "Jednokrevetna",
  });
  const [searchResults, setSearchResults] = useState([]);
  
  const { selectedHotel, setSelectedHotel } = useContext(MyContext);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
  };

  // Funkcija za pretragu hotela
  const handleSearch = async () => {
    try {
      // Proveri da li su datumi validni
      if (!searchParams.startDate || isNaN(new Date(searchParams.startDate).getTime())) {
        console.error("Invalid start date");
        return;
      }

      if (!searchParams.endDate || isNaN(new Date(searchParams.endDate).getTime())) {
        console.error("Invalid end date");
        return;
      }

      const response = await axios.get(
        `https://localhost:7137/api/Hotel/search`,
        {
          params: {
            cityName: searchParams.cityName,
            startDate: searchParams.startDate,
            endDate: searchParams.endDate,
            roomType: searchParams.roomType,
          },
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      setSearchResults(response.data);
      setSearchOpen(true);
      console.log("Response data from server:", response.data);

    } catch (error) {
      console.error("Error searching hotels:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received. Request details:", error.request);
      } else {
        console.error("Error details:", error.message);
      }
    }
  };

  const handleHotelClick = (hotelId) => {
    const selectedHotel = searchResults.find((hotel) => hotel.id === hotelId);
    if (selectedHotel) {
      // Pronađi odgovarajuću sliku iz galerije hotela
      const hotelDataItem = HotelData.find((item) => item.id === hotelId);

      setSelectedHotel({
        id: selectedHotel.id,
        naziv: selectedHotel.naziv,
        image: hotelDataItem ? hotelDataItem.image : "", 
        zemlja: selectedHotel.zemlja,
        cena: selectedHotel.cenaJednosobneSobe,
        telefon: selectedHotel.telefon, 
        aerodromi: selectedHotel.aerodromi, 
        prijava: selectedHotel.prijava, 
        odjava: selectedHotel.odjava,
        politika: selectedHotel.politika,
        parking: selectedHotel.parking, 
        pogodnosti: selectedHotel.pogodnosti
      });
      navigate(`/HotelStranica`);
    }
  };


  return (
    <>
      <section className="slider">
        <div className="control-btn">
          <button className="prev" onClick={prevSlide}>
            <i className="fas fa-caret-left"></i>
          </button>
          <button className="next" onClick={nextSlide}>
            <i className="fas fa-caret-right"></i>
          </button>
        </div>

        {slides.map((slide, index) => (
          <div className={index === current ? "slide active" : "slide"} key={index}>
            {index === current && <img src={slide.image} alt="Home Image" />}
          </div>
        ))}
      </section>

      <section className="slide-form">
        <div className="container">
          <h2>Isplaniraj svoj odmor</h2>
          <span>Pretraži hotelski smeštaj</span>

          <form>
            <input
              type="text"
              placeholder="Pretraži grad"
              onChange={(e) => setSearchParams(prevParams => ({ ...prevParams, cityName: e.target.value }))}
            />
            <div className="flex_space">
              <input
                type="date"
                placeholder="Dolazak"
                onChange={(e) => setSearchParams(prevParams =>({ ...searchParams, startDate: e.target.value }))}
              />
              <input
                type="date"
                placeholder="Odlazak"
                onChange={(e) => setSearchParams(prevParams =>({ ...searchParams, endDate: e.target.value }))}
              />
            </div>
            <select
              value={searchParams.roomType}
              onChange={(e) => setSearchParams(prevParams =>({ ...searchParams, roomType: e.target.value }))}
            >
              <option value="Jednokrevetna">Jednokrevetna</option>
              <option value="Dvokrevetna">Dvokrevetna</option>
              <option value="Trokrevetna">Trokrevetna</option>
              <option value="Cetvorokrevetna">Cetvorokrevetna</option>
            </select>

            <button type="button" className="submit" onClick={handleSearch}>
              Pretraži
            </button>
          </form>
        </div>
      </section>

      {searchOpen && (
  <div className="popup">
    <div className="hide" onClick={handleSearchClose}></div>
    <div className="popup-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button className="close-button" onClick={handleSearchClose}>
        Zatvori
      </button>
      {searchResults.length > 0 ? (
        searchResults.map((hotel) => (
          <div key={hotel.id} style={{ marginBottom: '15px', textAlign: 'center' }}>
            <i><b><h3 onClick={() => handleHotelClick(hotel.id)}>{hotel.naziv}</h3></b></i>
            <b><p>{hotel.adresa}</p></b>
            <p>Zvezdice: <b>{hotel.zvezdice}</b></p>
          </div>
        ))
      ) : (
        <p>Trenutno nema raspoloživih hotela koji zadovoljavaju pretragu.</p>
      )}
    </div>
  </div>
)}

    </>
  );
}
export default Home;
