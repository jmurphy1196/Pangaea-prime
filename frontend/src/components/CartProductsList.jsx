import { CartProduct } from "./CartProduct";

export function CartProductsList({ products }) {
  console.log("TEHISER ASRJELK JRKLESJKLFJSDKLJFKLDS", products);
  if (!products) return false;
  return (
    <>
      <div className='cart__products-container'>
        <h2>My Cart</h2>
        <div className='cart__products'>
          {products.map((prod) => (
            <CartProduct key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </>
  );
}
