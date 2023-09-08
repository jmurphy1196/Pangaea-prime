import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

//eslint-disable-next-line
export function FeaturedProductCard({ productId }) {
  const product = useSelector((state) => state.products[productId]);
  if (!product) return false;
  const category = product.Categories[0]?.name || "Pangaea";
  return (
    <div className='featured__product__container'>
      <div className='featured__product__image'>
        <h1 className='featured__product__heading'>{category}</h1>
        <Link to={`/product/${productId}`}>
          <img src={product.main_image} alt='' />
        </Link>
      </div>
      <Link
        className='featured__product__caption'
        to={`/products?brand=${product.Brand.name}`}
      >
        Shop {product.Brand.name}
      </Link>
    </div>
  );
}
