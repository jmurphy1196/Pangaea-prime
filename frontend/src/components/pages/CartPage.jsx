import { useSelector } from "react-redux";
import "../../styles/pages/cartPage.css";
import { CartProductsList } from "../CartProductsList";
import { CartDetails } from "../CartDetails";
export function CartPage() {
  const cart = useSelector((state) => state.cart);
  if (!cart) return false;
  return (
    <>
      <div className='cart__page'>
        <CartProductsList products={cart.products} />
        <CartDetails />
      </div>
    </>
  );
}
