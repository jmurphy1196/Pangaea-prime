import { Product } from "../Product";
import "../../../styles/components/productList.css";

//eslint-disable-next-line
export function ProductList({ productIds }) {
  return (
    <>
      <div className='products__container'>
        {/* eslint-disable-next-line */}
        {productIds.map((pId) => (
          <Product productId={pId} key={pId} />
        ))}
      </div>
    </>
  );
}
