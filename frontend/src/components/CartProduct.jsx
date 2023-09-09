import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkRemoveProductCart, thunkUpdateProductQty } from "../store/cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSpinner } from "@fortawesome/free-solid-svg-icons";

export function CartProduct({ product }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(
    product.CartProduct.quantity || 1
  );
  if (!product) return false;

  const handleUpdateQty = async () => {
    setLoading(true);
    const res = await dispatch(
      thunkUpdateProductQty(product.id, selectedQuantity)
    );
    setLoading(false);
  };
  const handleDeleteProduct = async () => {
    const res = await dispatch(thunkRemoveProductCart(product.id));
  };
  return (
    <div className='cart__product'>
      <div className='cart__product-image'>
        <img src={product.main_image} alt='' />
      </div>
      <div className='cart__product-details'>
        <h2>{product.product_name}</h2>
        <div className='cart__product-brand'>
          <Link to={`/products?brand=${product.Brand.name}`}>
            {product.Brand.name}
          </Link>
        </div>
        <div className='cart__product-quantity'>
          <label>Qty (max {product.stock_quantity}) </label>
          <input
            type='number'
            value={selectedQuantity}
            onChange={(e) =>
              setSelectedQuantity(
                +e.target.value <= product.stock_quantity
                  ? +e.target.value
                  : selectedQuantity
              )
            }
            max={product.stock_quantity}
          />
          {selectedQuantity != product.CartProduct.quantity && (
            <button onClick={handleUpdateQty}>
              {!loading ? "Update" : <FontAwesomeIcon icon={faSpinner} spin />}
            </button>
          )}
        </div>
        <div className='cart__product-delete'>
          <button onClick={handleDeleteProduct}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
}
