import { useSelector } from "react-redux";
export function CartDetails() {
  const cart = useSelector((state) => state.cart);
  if (!cart.products.length) return false;
  return (
    <div className='cart__details'>
      <h3>
        Items:{" "}
        {cart.products.reduce((acc, val) => val.CartProduct.quantity + acc, 0)}
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
  );
}
