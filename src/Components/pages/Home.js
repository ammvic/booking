import React from "react";
import "../../App.css";
import Hero from "../HomeSection/Hero";
import HomeAbout from "../HomeSection/HomeAbout";
import MostPopular from "../HomeSection/popular/MostPopular";
import Download from "../HomeSection/Download/DownLoad";
import Works from "../HomeSection/Works/Works";
import Gallery from "../HomeSection/gallery/Gallery";
import Cards from "../Hoteli/Cards"; 

const Home = () => {
  // Primer podataka (prilagodite ovo vašim potrebama)
  const data = [
    { id: 1, title: "Hotel 1", image: "image1.jpg" },
    { id: 2, title: "Hotel 2", image: "image2.jpg" },
    // Dodajte ostale podatke
  ];

  return (
    <>
      <Hero />
      <HomeAbout />
      <MostPopular>
  {data.map(item => (
    <Cards key={item.id} {...item} />
  ))}
</MostPopular>
      <Download />
      <Works />
      <Gallery />
    </>
  );
};

export default Home;
