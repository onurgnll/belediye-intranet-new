import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Header.css';
import logo from '../assets/icons/logo.png';
import logo2 from '../assets/icons/ataturk.png';
import { useEffect } from 'react';
import { useState } from 'react';

const Header = () => {


  const [ipm, setipm] = useState();



  const whoami = async () => {

    const ApiEndpoint = `${import.meta.env.VITE_APP_API_URL}`;
    const res = await
      fetch(ApiEndpoint + '/user/whoami', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

    const rfff = await res.json()
    setipm(rfff)
  }

  useEffect(() => {
    whoami()
  }, []);
  return (
    <header className="header">
      <h1>T.C. ATAKUM BELEDİYESİ</h1>
      <div className="header-icon2">

        {
          ipm &&

          <span className='fw-bold mx-3'>{ipm?.switchh?.name} - {ipm?.ip}</span>
        }
        <img src={logo2} alt="Atatürk Logo" className="logo-icon2" />
      </div>
      <Link to="/" className="header-icon"> {/* Wrap the logo with Link */}
        <img src={logo} alt="Main Logo" className="logo-icon" />
      </Link>
    </header>
  );
};

export default Header;
