import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
export function CartDetails() {
  const cart = useSelector((state) => state.cart);
  const history = useHistory();
  if (!cart.products.length) return false;
  return (
    <div className='cart__details-container'>
      <div className='cart__details'>
        <h3>
          Items:{" "}
          {cart.products.reduce(
            (acc, val) => val.CartProduct.quantity + acc,
            0
          )}
        </h3>
        <h3>
          Price: ${" "}
          {Number(
            cart.products.reduce(
              (acc, val) =>
                Number(
                  Number(val.price) * Number(val.CartProduct.quantity) + acc
                ),
              0.0
            )
          ).toFixed(2)}
        </h3>
      </div>
      <div className='cart__details-continue'>
        <button onClick={() => history.push("/order")}>
          Order <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
}
