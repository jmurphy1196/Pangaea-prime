import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";

//eslint-disable-next-line
export function Product({ productId }) {
  const product = useSelector((state) => state.products[productId]);
  if (!product) return false;
  return (
    <>
      <div className='product__container'>
        <div className='product__image'>
          <img src={product.main_image} alt='' />
        </div>
        <div className='product__information'>
          <Link to={`/product/${product.id}`}>
            <h1 className='product__name'>{product.product_name}</h1>
          </Link>
          <Link
            to={`/products?brand=${product.Brand.name}`}
            className='product__brand'
          >
            {product.Brand.name}
          </Link>
          <div className='product__ratings'>
            <div className='product__stars'>
              {[1, 2, 3, 4, 5].map((val) => {
                if (!product.avgRating)
                  return (
                    <FontAwesomeIcon
                      className='stars'
                      icon={faStarEmpty}
                      key={val}
                    />
                  );
                if (product.avgRating >= val) {
                  return (
                    <FontAwesomeIcon
                      className='stars'
                      icon={faStar}
                      key={val}
                    />
                  );
                } else {
                  return (
                    <FontAwesomeIcon
                      className='stars'
                      icon={faStarEmpty}
                      key={val}
                    />
                  );
                }
              })}
              <span>
                {product.avgRating !== null
                  ? Number(product.avgRating).toFixed(2)
                  : 0.0}
              </span>
            </div>
          </div>
          <div className='product__price'>
            <h1>${product.price}</h1>
          </div>
          <div className='product__delivery'>
            <p>
              Free delivery <strong>Tue, Aug 15</strong>
            </p>
            <p>
              or fastest delivery <strong>Mon, Aug 15</strong>
            </p>
          </div>
          <div className='product__stock'>
            <p>{product.stock_quantity} left in stock</p>
          </div>
        </div>
      </div>
    </>
  );
}
