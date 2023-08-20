import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";
import {
  faLocationDot,
  faSearch,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/components/navbar.css";
import { thunkGetCategories } from "../store/categories";
import { thunkRemoveSession } from "../store/session";

export function Navigation() {
  const user = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const categories = useSelector(
    (state) => state.categories.orderedCategories || []
  );
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
    (async () => {
      const res = await dispatch(thunkGetCategories());
      console.log("this is res", res);
    })();
  }, [dispatch]);

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
              <button onClick={() => history.push("/orders")}>
                Returns
                <br />
                <span>& Orders</span>
              </button>
            </div>
            <div className='navbar__actions__item'>
              <button
                onClick={() => {
                  history.push("/cart");
                }}
              >
                <FontAwesomeIcon icon={faCartShopping} className='cart' />
                <span style={{ marginLeft: 5 }}>{cart.numberOfProducts}</span>
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
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?categories=${category.name}`}
            >
              {category.name}
            </Link>
          ))}
          <Link to='/sell'>Sell</Link>
          {/* TODO temp */}
          {user && (
            <button onClick={async () => dispatch(thunkRemoveSession())}>
              Sign out
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
