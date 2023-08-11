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
        <img src={product.main_image} alt='' />
      </div>
      <Link className='featured__product__caption' to=''>
        Shop {product.Brand.name}
      </Link>
    </div>
  );
}
