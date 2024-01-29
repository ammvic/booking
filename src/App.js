import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Common/Navbar/Navbar';
import Home from './Components/pages/Home';
import Kontakt from './Components/Kontakt/Kontakt';
import Footer from './Common/footer/Footer';
import Login from './Components/login/Login';
import Register from './Components/login/Register';
import EmptyFile from './Common/Empty/EmptyFile';
import Hoteli from './Components/Hoteli/Hoteli';
import O_nama from './Components/O-nama/O_nama';
import MyContextProvider from './Components/context/loginregister';
import HotelStranica from './Components/Hoteli/HotelStranica';

function App() {
  return (
    <MyContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/O-nama' element={<O_nama />} />
          <Route path='/Hoteli' element={<Hoteli />} />
          <Route path='/Kontakt' element={<Kontakt />} />
          <Route path='/Prijava' element={<Login />} />
          <Route path='/Registracija' element={<Register />} />
          <Route path='/HotelStranica' element={<HotelStranica />} />
          <Route path="*" element={<EmptyFile />} />
        </Routes>
        <Footer />
      </Router>
    </MyContextProvider>
  );
}

export default App;
