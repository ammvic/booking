import React from "react";
import "./About.css";
import HeadTitle from "../../Common/HeadTitle/HeadTitle";
import { Link } from 'react-router-dom';

const O_nama = () => {
  return (
    <>
      <HeadTitle title="O nama" />

      <section className='features top'>
        <div className='container aboutCard flex_space'>
          <div className='row row1'>
            <h1>
              Naša <span> misija </span>
            </h1>
            <p>Naša misija je jednostavna - želimo vam omogućiti da istražite svet, otkrijete nove destinacije i stvarate nezaboravne uspomene, sve dok se osećate sigurno i udobno u svakom trenutku.</p>
            <p>Smatramo da je smeštaj ključna komponenta svakog putovanja, te stoga nudimo pažljivo odabrane hotele koji zadovoljavaju različite ukuse i potrebe.</p>
            <button className='secondary-btn'>
              <Link to='/Hoteli'>Započni pretraživanje <i className='fas fa-long-arrow-alt-right'></i></Link>
            </button>
          </div>
          <div className='row image'>
            <img src='/images/feature-img-1.jpg' alt='' />
          </div>
        </div>
      </section>

      <section className='additional-content'>
        <h2>Zašto Izabrati Nas?</h2>
        <p>Kada planirate svoje putovanje, želite pouzdan partner koji će vam pružiti vrhunski smeštaj i iskustvo. Evo nekoliko razloga zašto smo pravi izbor:</p>
        <ul>
          <li><span className='bullet'>✔</span> Širok izbor hotela prilagođen svim potrebama</li>
          <li><span className='bullet'>✔</span> Pregledne informacije o svakom smeštaju</li>
          <li><span className='bullet'>✔</span> Sigurno i jednostavno rezervisanje</li>
          <li><span className='bullet'>✔</span> Korisnička podrška dostupna 24/7</li>
        </ul>
      </section>

      <section className='testimonials'>
        <h2>Šta Naši Korisnici Kažu?</h2>
        <div className='testimonial-card'>
          <p>"Savršeno iskustvo sa rezervacijom hotela. Sve je bilo brzo i jednostavno. Definitivno ću koristiti ponovo!"</p>
          <span className='author'>- Ana Petrović</span>
        </div>
      </section>
    </>
  );
};

export default O_nama;
