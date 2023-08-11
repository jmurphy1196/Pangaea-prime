import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";
import {
  faLocationDot,
  faSearch,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/components/navbar.css";

export function Navigation() {
  const user = useSelector((state) => state.session.user);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
    error: null,
  });
  const history = useHistory();

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

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/products?name=${search}`);
  };

  return (
    <>
      <nav className='navbar'>
        <div className='navbar__container navbar__container__left'>
          <div className='navbar__image'>
            <Link to='/'>
              <img src='/images/pangaea-logo.png' alt='' />
            </Link>
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
            <input
              type='text'
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(e);
                }
              }}
            />
            <button className='navbar__search-icon' onClick={handleSearch}>
              <FontAwesomeIcon icon={faSearch} width={30} />
            </button>
          </div>
        </div>
        <div className='navbar__container navbar__container__right'>
          <div className='navbar__actions'>
            <div className='navbar__actions__item'>
              <Link to='/account'>
                {user ? `Hello, ${user.firstName}` : `Hello, sign in`}
                <br />
                <span>Account & Lists</span>
              </Link>
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
          <Link to='/sell'>Sell</Link>
        </div>
      </nav>
    </>
  );
}
