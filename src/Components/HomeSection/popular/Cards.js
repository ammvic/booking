import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MyContext } from "../../context/loginregister";
import HotelData from "../../Hoteli/GalleryData";
import axios from "axios";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='next'>
        <i className='fa fa-long-arrow-alt-right'></i>
      </button>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='prev'>
        <i className='fa fa-long-arrow-alt-left'></i>
      </button>
    </div>
  );
};

const Cards = () => {
  const { setSelectedHotel } = useContext(MyContext);
  const [hotelDataFromDatabase, setHotelDataFromDatabase] = useState([]);

  useEffect(() => {
    const fetchAllHotelDataFromDatabase = async () => {
      try {
        const response = await axios.get("https://localhost:7137/api/Hotel");
        setHotelDataFromDatabase(response.data);
      } catch (error) {
        console.error("Greška pri dohvatanju podataka iz baze:", error);
        console.log(error.response);
      }
    };

    fetchAllHotelDataFromDatabase();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {hotelDataFromDatabase.map((hotelFromDatabase, index) => {
          const hotelDataItem = HotelData.find(
            (dataItem) => dataItem.id === hotelFromDatabase.id
          );

          if (hotelDataItem) {
            return (
              <div
                className='cards'
                key={index}
                onClick={() => {
                  setSelectedHotel({
                    id: hotelFromDatabase.id,
                    naziv: hotelFromDatabase.naziv,
                    image: hotelDataItem.image, // koristi sliku iz HotelData
                    zemlja: hotelFromDatabase.zemlja,
                    cena: hotelFromDatabase.sobe[1].cena,
                    telefon: hotelFromDatabase.telefon,
                    aerodromi: hotelFromDatabase.aerodromi,
                    prijava: hotelFromDatabase.prijava,
                    odjava: hotelFromDatabase.odjava,
                    politika: hotelFromDatabase.politika,
                    parking: hotelFromDatabase.parking,
                    pogodnosti: hotelFromDatabase.pogodnosti,
                    zvezdice:hotelFromDatabase.zvezdice,
                  });
                }}
              >
                <div className='item'>
                  <div className='imgae'>
                    <img src={hotelDataItem.image} alt='' />
                    <i className='fas fa-map-marker-alt'>
                      <label>{hotelFromDatabase.zemlja}</label>
                    </i>
                  </div>
                  <div className='rate'>
                    {Array.from({ length: hotelFromDatabase.zvezdice }, (_, i) => (
                      <i key={i} className='far fa-star' style={{ color: 'yellow' }}></i>
                    ))}
                    {Array.from({ length: 5 - hotelFromDatabase.zvezdice }, (_, i) => (
                      <i key={i} className='far fa-star'></i>
                    ))}
                    </div>
                  <div className='details'>
                    <h2>{hotelFromDatabase.naziv}</h2>
                    <div className='boarder'></div>
                  </div>
                </div>
              </div>
            );
          }

          return null;
        })}
      </Slider>
    </>
  );
};

export default Cards;
