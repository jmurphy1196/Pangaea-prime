import { US_STATES } from "../constants";
import "../styles/components/createOrder.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { thunkCreateOrder } from "../store/orders";
import { OrderProducts } from "./OrderProducts";
import { useHistory } from "react-router-dom";

export function CreateOrder() {
  const stripe = useStripe();
  const elements = useElements();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [address_1, setAddress_1] = useState("");
  const [address_2, setAddress_2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("CA");
  const [postalCode, setPostalCode] = useState("");
  const [formPage, setFormPage] = useState(1);
  const [formErrors, setFormErrors] = useState({});
  const [formTouched, setFormTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const cardElement = elements.getElement(CardElement);
  const history = useHistory();

  useEffect(() => {
    const errors = {};
    if (address_1.length < 1 || address_1.length > 200)
      errors.address_1 = "Address 1 must be between 1 and 200 characters";
    if (
      address_2.length > 0 &&
      (address_2.length < 1 || address_2.length > 200)
    )
      errors.address_2 = "Address 2 must be between 1 and 200 characters";
    if (city.length < 1 || city.length > 40)
      errors.city = "City must be between 1 and 40 characters";
    if (!postalCode.match(/(^\d{5}$)|(^\d{5}-\d{4}$)/))
      errors.postalCode = "Enter a valid postal code";
    setFormErrors(errors);
  }, [address_1, address_2, city, state, postalCode]);

  const handleCard = async () => {
    setFormTouched(true);
    if (!Object.values(formErrors).length) {
      setLoading(false);
      if (!stripe || !elements) {
        return;
      }
      console.log("I WAS CLICKED");

      const cardElement = elements.getElement(CardElement);

      setLoading(true);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });
      setLoading(false);

      if (error) {
        console.error(error);
      } else {
        console.log("[PaymentMethod]", paymentMethod);
        setFormPage((prev) => prev + 1);
      }
    }
  };

  const handleSubmit = async () => {
    const addressData = {
      address_1,
      city,
      state,
      postalCode,
    };
    if (address_2.length > 0) addressData.address_2 = address_2;
    setLoading(true);
    const res = await dispatch(thunkCreateOrder(addressData));
    setLoading(false);
    if (res.id) history.push(`/orders/${res.id}`);
  };
  if (!stripe || !cart) return false;

  const addressForm = (
    <form className='create__order-address'>
      <div className='create__order-address__group'>
        <label>Address 1:</label>
        <input type='text' onChange={(e) => setAddress_1(e.target.value)} />
      </div>
      <div className='create__order-address__group'>
        <label>Address 2:</label>
        <input type='text' onChange={(e) => setAddress_2(e.target.value)} />
      </div>
      <div className='create__order-address__group'>
        <label> City: </label>
        <input type='text' onChange={(e) => setCity(e.target.value)} />
      </div>
      <div className='create__order-address__group'>
        <label> Postal Code:</label>
        <input type='text' onChange={(e) => setPostalCode(e.target.value)} />
      </div>
      <div className='create__order-address__group'>
        <label> State: </label>
        <select name='state' id='' onChange={(e) => setState(e.target.value)}>
          {US_STATES.map((st) => (
            <option value={st} key={st}>
              {st}
            </option>
          ))}
        </select>
      </div>
      <div className='card-container'>
        <CardElement />
      </div>
      <div className='create__order-address__group f-end'>
        <button
          type='button'
          onClick={handleCard}
          disabled={Object.values(formErrors).length > 0 && formTouched}
        >
          {!loading ? (
            <FontAwesomeIcon icon={faArrowRight} />
          ) : (
            <FontAwesomeIcon icon={faSpinner} spin />
          )}
        </button>
      </div>
    </form>
  );

  const orderSummary = (
    <>
      <OrderProducts products={cart.products} />
      <div className='order__product-details-submit'>
        <button type='button' onClick={handleSubmit}>
          Place order
        </button>
      </div>
    </>
  );

  return (
    <>
      <div className='create__order'>
        <header>
          <h3>Order Details</h3>
          <span>
            {formPage === 1 ? "Address information" : "Order summary"}
          </span>
        </header>
        {Object.values(formErrors).length > 0 && formTouched && (
          <ul>
            {Object.values(formErrors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {formPage === 1 ? addressForm : orderSummary}
      </div>
    </>
  );
}
