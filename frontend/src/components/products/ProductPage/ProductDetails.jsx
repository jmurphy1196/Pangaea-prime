import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import { useHistory } from "react-router-dom";

import { useEffect, useState } from "react";
import "../../../styles/components/productDetails.css";
import { thunkAddProductToCart } from "../../../store/cart";
export function ProductDetails() {
  const product = useSelector((state) => state.singleProduct);
  const user = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [productInCart, setProductInCart] = useState(false);
  const history = useHistory();
  console.log("KLSDJFLKJDSFKLJFDSLKJFLKSDJ");
  if (cart) {
    console.log(cart.products.find((p) => p.id == product.id));
  }

  useEffect(() => {
    if (product.id && user && cart) {
      const prod = cart.products.find((p) => p.id == product.id);
      if (prod) setProductInCart(true);
    }
  }, [product, user, cart]);
  if (!product) return false;

  const handleAddProductToCart = async (e) => {
    const res = await dispatch(thunkAddProductToCart(product.id, 1));
  };
  return (
    <>
      <div className='product__details'>
        <header>
          <h1>{product.product_name}</h1>
          <Link className='product__details__brand'>
            visit {product.Brand?.name} store
          </Link>
          <div className='product__details__rating'>
            <span>{Number(product.avgRating).toFixed(2)}</span>
            {[1, 2, 3, 4, 5].map((val) => {
              if (!product.avgRating)
                return <FontAwesomeIcon className='star' icon={faStarEmpty} />;
              if (val <= product.avgRating)
                return (
                  <FontAwesomeIcon className='star' icon={faStar} key={val} />
                );
              return (
                <FontAwesomeIcon
                  className='star'
                  icon={faStarEmpty}
                  key={val}
                />
              );
            })}
            <span className='num_ratings'>
              {Number(product.numRatings)} ratings
            </span>
          </div>
        </header>
        <div className='product__details__body'>
          <div className='product__details__body__price'>
            <h3>${product.price}</h3>
            {productInCart ? (
              <button> In Cart</button>
            ) : (
              <button
                disabled={product.stock_quantity <= 0}
                onClick={handleAddProductToCart}
              >
                {product.stock_quantity <= 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            )}
            {user && user.id == product.seller_id && (
              <button
                className='edit'
                onClick={(e) => history.push(`/product/${product.id}/edit`)}
              >
                Edit
              </button>
            )}
          </div>
          <div className='product__details__body__info'>
            <div className='product__details__body__info__group'>
              <p>Brand</p>
              <span>{product.Brand?.name}</span>
            </div>
            <div className='product__details__body__info__group'>
              <p>Stock</p>
              <span>{product.stock_quantity}</span>
            </div>
            <div className='product__details__body__info__group'>
              <p>Description</p>
              <span>{product.description}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
