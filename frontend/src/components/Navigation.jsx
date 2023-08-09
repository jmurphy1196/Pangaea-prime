import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {
  faLocationDot,
  faAngleDown,
  faSearch,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/components/navbar.css";

export function Navigation() {
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
    error: null,
  });

  useEffect(() => {
    // Get the user's current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          error: null,
        });
      },
      // Handle errors
      (error) => {
        setLocation((prevState) => ({
          ...prevState,
          error: error.message,
        }));
      }
    );
  }, []);

  console.log("THis is the location", location);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar__container navbar__container__left'>
          <div className='navbar__image'>
            <img src='/images/logo.png' alt='' />
          </div>
          <div className='navbar__location'>
            <span>
              Delivering to{" "}
              {location.lat !== null ? location.lat.toFixed(2) : ""} ,{" "}
              {location.lng && location.lng.toFixed(2)}
            </span>
            <p>
              {" "}
              <FontAwesomeIcon icon={faLocationDot} /> Sign in to update your
              location
            </p>
          </div>
        </div>
        <div className='navbar__container navbar__container__middle'>
          <div className='navbar__search-container'>
            <input type='text' />
            <button className='navbar__search-icon'>
              <FontAwesomeIcon icon={faSearch} width={30} />
            </button>
          </div>
        </div>
        <div className='navbar__container navbar__container__right'>
          <div className='navbar__actions'>
            <div className='navbar__actions__item'>
              <button>
                Hello, sign in
                <br />
                <span>Account & Lists</span>
                <FontAwesomeIcon className='arrow' icon={faAngleDown} />
              </button>
            </div>
            <div className='navbar__actions__item'>
              <button>
                Returns
                <br />
                <span>& Orders</span>
              </button>
            </div>
            <div className='navbar__actions__item'>
              <button>
                <FontAwesomeIcon icon={faCartShopping} className='cart' />
                <span style={{ marginLeft: 5 }}>Cart</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <nav className='subbar'>
        {/* <div className='subbar__all'>
          <button>
            <FontAwesomeIcon icon={faBars} />
            All
          </button>
        </div> */}
        <div className='sublinks'>
          <Link>Electronics</Link>
          <Link>Books</Link>
          <Link>Music</Link>
          <Link>Registry</Link>
          <Link>Games</Link>
          <Link>Fashion</Link>
          <Link>Medical</Link>
          <Link>Automotive</Link>
          <Link>Sell</Link>
        </div>
      </nav>
    </>
  );
}
