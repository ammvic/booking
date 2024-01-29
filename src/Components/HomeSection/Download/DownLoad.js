import React from "react"
import "./download.css"

const DownLoad = () => {
  return (
    <>
      <section className='download top'>
        <div className='container flex_space'>
          <div className='row'>
            <h3>Preuzmi našu aplikaciju</h3>
            <h1>Sada možeš da izvršiš rezervaciju i putem mobilne aplikacije</h1>
            <ul>
              <li>&#10003; Pronađite obližnji hotel u vašoj mreži sa predloškom</li>
              <li>&#10003; Dobijte potvrdu bez papira</li>
              <li>&#10003; Pravite promene kad god i gde god</li>
              <li>&#10003; Korisnička podrška 24/7 na više od 40 jezika</li>
              <li>&#10003; Nema dodatnih troškova za rezervaciju ili kreditnu karticu</li>
              <li>&#10003; Nema dodatnih troškova za rezervaciju ili kreditnu karticu</li>
              <li>&#10003; Dodajte svoje recenzije i fotografije</li>
            </ul>
            <div className='img flex'>
              <img src='/images/appstore-button.png' alt='' />
              <img src='/images/google-play-button.png' alt='' />
            </div>
          </div>
          <div className='row row2'>
            <img src='/images/app-image-1.png' alt='' className='image' />
          </div>
        </div>
      </section>
    </>
  )
}

export default DownLoad
