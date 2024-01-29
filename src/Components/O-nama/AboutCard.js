import React from "react"
import "./About.css"
import { Link } from 'react-router-dom';

const AboutCard = () => {
  return (
    <>
      <div className='aboutCard mtop flex_space'>
        <div className='row row1'>
          <h4>O nama</h4>
          <h1>
            Mi <span>pronalazimo</span> Vaš smeštaj.
          </h1>
          <p>Dobrodošli u našu zajednicu putnika! Mi smo strastveni tim posvećen pružanju nezaboravnih iskustava kroz našu platformu za rezervaciju hotela.</p>
          <p>Naša priča počinje sa željom da transformišemo način putovanja i pružimo vam ne samo mesto za boravak, već i dom daleko od kuće.</p>
          <button className='secondary-btn'>
          <Link to='/O-nama'>
          Pročitaj više <i className='fas fa-long-arrow-alt-right'></i>
          </Link>
          </button>
        </div>
        <div className='row image'>
          <img src='/images/about-img-1.jpg' alt='' />
        </div>
      </div>
    </>
  )
}

export default AboutCard
